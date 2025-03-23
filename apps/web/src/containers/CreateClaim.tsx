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
	const [unpaidClaim, setUnpaidClaim] = useState<Claims | null>(null);
	const [step, setStep] = useState(1);

	useEffect(() => {
		if (!unpaidClaimId) {
			return;
		}

		getClaimsByIds([unpaidClaimId]).then((claims) => {
			if (!claims[0] || claims[0].status !== ClaimStatus.AWAITING_PAYMENT) {
				return;
			}

			setUnpaidClaim(claims[0]);
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

			<div className="max-w-lg rounded-lg border border-[rgba(255,255,255,0.1)] bg-black p-6 shadow-2xl overflow-hidden">
				{(step === 1 || step === 2) && <Form currentStep={step} setStep={setStep} />}

				{step === 3 && unpaidClaim && (
					<motion.div
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Payment
							claim={unpaidClaim}
							onSuccess={handlePaymentSuccess}
							onCancel={handlePaymentCancel}
						/>
					</motion.div>
				)}

				{step === 4 && unpaidClaim && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<PaymentSuccess claim={unpaidClaim} onCancel={() => setStep(1)} />
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};
