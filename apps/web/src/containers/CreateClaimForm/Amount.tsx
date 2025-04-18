import { ROUTING_FEE_PERCENT, getRoutingFee } from "@repo/shared";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useBitcoinExchangeRate } from "../../hooks/useBitcoinExchangeRate";
import { getBitcoinFiatValue } from "../../utils/getBitcoinFiatValue";
import { formatCurrency, formatNumber } from "../../utils/numbers";
import type { FormValues } from "./Form";

type Props = {
	setStep: Dispatch<SetStateAction<number>>;
	onSubmit: SubmitHandler<FormValues>;
};

export const Amount = ({ setStep, onSubmit }: Props) => {
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useFormContext<FormValues>();

	const { usdExchangeRate, fetchExchangeRate } = useBitcoinExchangeRate();

	useEffect(() => {
		fetchExchangeRate();
	}, [fetchExchangeRate]);

	const receiverSatsAmount = watch("receiverSatsAmount") || 0;
	const platformSatsAmount = watch("platformSatsAmount") || 0;

	const routingFee = getRoutingFee(receiverSatsAmount);
	const total = receiverSatsAmount + platformSatsAmount + routingFee;

	return (
		<>
			<p className="mb-2 text-center font-bold text-2xl">How many sats?</p>

			<p className="mb-4 text-center text-lg text-white-muted">
				Choose the amount of satoshis to send.
			</p>

			<div className="mb-4 flex flex-wrap gap-2">
				{[5000, 10000, 21000, 50000, 100000].map((amount) => (
					<Button
						key={amount}
						type="button"
						variant={receiverSatsAmount === amount ? "primary" : "secondary"}
						onClick={() => setValue("receiverSatsAmount", amount)}
					>
						{formatNumber(amount)}
					</Button>
				))}
			</div>

			<div className="mb-4 flex gap-2">
				<div className="flex-1">
					<label htmlFor="receiverSatsAmount" className="font-bold">
						Receiver amount
					</label>

					<Input
						{...register("receiverSatsAmount", {
							min: { value: 1, message: "Minimum amount is 1 sat" },
							required: "Enter a valid amount",
							valueAsNumber: true,
						})}
						type="number"
						placeholder="10000 sats"
						inputMode="numeric"
						pattern="[0-9]*"
						className="mt-1"
						error={errors.receiverSatsAmount?.message}
					/>
				</div>

				<div className="flex-1">
					<label htmlFor="platformSatsAmount" className="font-bold">
						Project support
					</label>

					<Input
						{...register("platformSatsAmount", {
							min: {
								value: 1,
								message: "Leave empty or minimum amount is 1 sat",
							},
							valueAsNumber: true,
						})}
						type="number"
						placeholder="5000 sats"
						inputMode="numeric"
						pattern="[0-9]*"
						className="mt-1"
						error={errors.platformSatsAmount?.message}
					/>

					<p className="text-xs">
						Helps cover server costs and motivates further development. Thank you!
					</p>
				</div>
			</div>

			<div className="mb-4 flex items-center justify-between rounded-lg border border-white-muted/50 bg-background px-2 py-4 text-lg">
				<div className="flex flex-col">
					<span className="font-bold">Total amount:</span>

					{routingFee > 0 && (
						<span className="text-xs">
							including {formatNumber(routingFee)} sats ({ROUTING_FEE_PERCENT}%) routing fee
						</span>
					)}
				</div>

				<div className="flex flex-col">
					<span className="font-bold">{formatNumber(total)} sats</span>

					{usdExchangeRate && total > 0 && (
						<span className="text-xs">
							≈ {formatCurrency(getBitcoinFiatValue(total, usdExchangeRate))}
						</span>
					)}
				</div>
			</div>

			<div className="flex gap-2">
				<Button
					className="group flex-1 items-center"
					variant="secondary"
					onClick={() => setStep((step) => step - 1)}
				>
					<span className="group-hover:-translate-x-1 mr-2 transition-transform">
						<ArrowLeft size={18} className="mt-1" />
					</span>
					<span>Back</span>
				</Button>

				<Button
					type="button"
					className="group flex-3 items-center"
					onClick={() => handleSubmit(onSubmit)()}
				>
					<span>Continue</span>
					<span className="ml-2 transition-transform group-hover:translate-x-1">
						<ArrowRight size={18} className="mt-1" />
					</span>
				</Button>
			</div>
		</>
	);
};
