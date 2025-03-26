import { ClaimStatus, type Claims, LAST_UNPAID_CLAIM_ID_KEY } from "@repo/shared";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getClaimsByIds } from "../api/claims";
import { Steps } from "../components/Steps";
import { Form } from "./CreateClaimForm/Form";
import { Payment } from "./Payment";
import { PaymentSuccess } from "./PaymentSuccess";

export const CreateClaim = () => {
	const [unpaidClaimId, setUnpaidClaimId] = useLocalStorageState<string>(LAST_UNPAID_CLAIM_ID_KEY);
	const [claim, setClaim] = useState<Claims | null>(null);
	const [step, setStep] = useState(1);

	useEffect(() => {
		if (!unpaidClaimId) {
			return;
		}

		getClaimsByIds([unpaidClaimId]).then((claims) => {
			const claim = claims[0];

			if (!claim) {
				return;
			}

			if (claim.status !== ClaimStatus.AWAITING_PAYMENT) {
				setClaim(claim);
				setStep(4);

				return;
			}

			setClaim(claim);
			setStep(3);
		});
	}, [unpaidClaimId]);

	const handlePaymentSuccess = () => {
		setUnpaidClaimId("");
		setStep(4);
	};

	const handlePaymentCancel = () => {
		setUnpaidClaimId("");
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
