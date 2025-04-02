import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { Steps } from "../components/Steps";
import { LAST_ACTIVE_CLAIM_ID_KEY } from "../constants";
import { queryClient, trpc } from "../trpc";
import { Form } from "./CreateClaimForm/Form";
import { Payment } from "./Payment";
import { PaymentSuccess } from "./PaymentSuccess";

export const CreateClaim = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CreateClaimComponent />
		</QueryClientProvider>
	);
};

export const CreateClaimComponent = () => {
	const [activeClaimId, setActiveClaimId] = useLocalStorageState<string>(LAST_ACTIVE_CLAIM_ID_KEY);

	const { data: claims = [] } = useQuery(
		trpc.claims.getClaimsByIds.queryOptions([activeClaimId as string], {
			enabled: !!activeClaimId,
			refetchOnWindowFocus: true,
		}),
	);

	const [step, setStep] = useState(1);

	const claim = useMemo(() => claims[0], [claims]);

	useEffect(() => {
		if (!claim) {
			return;
		}

		if (claim.status !== "AWAITING_PAYMENT") {
			setStep(4);

			return;
		}

		setStep(3);
	}, [claim]);

	const handlePaymentSuccess = () => {
		setStep(4);
	};

	const handlePaymentCancel = () => {
		setActiveClaimId("");
		setStep(1);
	};

	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.5, duration: 1 }}
		>
			{step < 4 && <Steps currentStep={step} />}

			<div className="max-w-lg overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-black p-6 shadow-2xl">
				{(step === 1 || step === 2) && <Form currentStep={step} setStep={setStep} />}

				{step === 3 && claim && (
					<motion.div
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Payment
							claim={claim}
							onSuccess={handlePaymentSuccess}
							onCancel={handlePaymentCancel}
						/>
					</motion.div>
				)}

				{step === 4 && claim && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<PaymentSuccess claim={claim} onCancel={handlePaymentCancel} />
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};
