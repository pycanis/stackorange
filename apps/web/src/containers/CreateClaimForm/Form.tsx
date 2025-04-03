import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import { HISTORY_CLAIM_IDS_KEY, LAST_ACTIVE_CLAIM_ID_KEY } from "../../constants";
import { queryClient, trpc } from "../../trpc";
import type { ClaimChannel } from "../../types";
import { Amount } from "./Amount";
import { Receiver } from "./Receiver";

export type FormValues = {
	channel: ClaimChannel;
	sender: string;
	receiver: string;
	message: string;
	receiverSatsAmount: number;
	platformSatsAmount: number;
};

type Props = {
	currentStep: number;
	setStep: Dispatch<SetStateAction<number>>;
};

export const Form = ({ currentStep, setStep }: Props) => {
	const [__, setPastClaimIds] = useLocalStorageState<string[]>(HISTORY_CLAIM_IDS_KEY);
	const [_, setActiveClaimId] = useLocalStorageState<string>(LAST_ACTIVE_CLAIM_ID_KEY);

	const { mutate: createClaim } = useMutation(
		trpc.claims.createClaim.mutationOptions({
			onSuccess: (claim) => {
				if (!claim) {
					return alert("Something went wrong");
				}

				queryClient.setQueryData(trpc.claims.getClaimsByIds.queryKey([claim.id]), [claim]);

				setStep((step) => step + 1);
				setActiveClaimId(claim.id);
				setPastClaimIds((pastClaimIds) => [...(pastClaimIds || []), claim.id]);
			},
		}),
	);

	const methods = useForm<FormValues>({
		defaultValues: { channel: "EMAIL" },
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<FormValues> = (values) =>
		createClaim({
			...values,
			platformSatsAmount: Number.isNaN(values.platformSatsAmount)
				? null
				: values.platformSatsAmount,
		});

	return (
		<FormProvider {...methods}>
			<form>
				{currentStep === 1 && (
					<motion.div
						initial={{ x: -100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Receiver setStep={setStep} />
					</motion.div>
				)}

				{currentStep === 2 && (
					<motion.div
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Amount setStep={setStep} onSubmit={onSubmit} />
					</motion.div>
				)}
			</form>
		</FormProvider>
	);
};
