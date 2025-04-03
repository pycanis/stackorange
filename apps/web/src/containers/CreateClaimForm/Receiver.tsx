import { ArrowRight, Mail, Smartphone } from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { CLAIM_CHANNELS } from "../../constants";
import type { ClaimChannel } from "../../types";
import type { FormValues } from "./Form";

const channelIcons: Record<ClaimChannel, { icon: JSX.Element; text: string }> = {
	EMAIL: { icon: <Mail width={16} />, text: "Email" },
	SMS: {
		icon: <Smartphone width={16} />,
		text: "SMS (coming soon)",
	},
};

type Props = {
	setStep: Dispatch<SetStateAction<number>>;
};

export const Receiver = ({ setStep }: Props) => {
	const {
		register,
		watch,
		setValue,
		trigger,
		formState: { errors },
	} = useFormContext<FormValues>();

	const selectedChannel = watch("channel");

	const onNext = async () => {
		if ((await trigger("receiver")) && (await trigger("message"))) {
			setStep((step) => step + 1);
		}
	};

	return (
		<>
			<p className="mb-2 text-center font-bold text-2xl">Who's receiving sats?</p>

			<p className="mb-4 text-center text-lg text-white-muted">
				Fill out the receiver details. We'll send them your message and the withdrawal link with
				some onboarding resources.
			</p>

			<div className="mb-2 flex w-full rounded-lg bg-white-muted/50 p-1">
				{Object.values(CLAIM_CHANNELS).map((channel) => (
					<Button
						key={channel}
						type="button"
						onClick={() => setValue("channel", channel)}
						className={"flex-1 items-center text-sm".concat(
							" ",
							selectedChannel === channel ? "bg-background font-bold" : "text-white/70",
						)}
						variant="group"
						disabled={channel !== "EMAIL"}
					>
						<span className="mr-2">{channelIcons[channel].icon}</span>
						<span>{channelIcons[channel].text}</span>
					</Button>
				))}
			</div>

			<div className="mb-2">
				<label htmlFor="sender" className="font-bold">
					Sender's name
				</label>

				<Input
					{...register("sender", {
						maxLength: { value: 50, message: "Max 50 characters" },
					})}
					id="sender"
					placeholder="Who are you?"
					className="mt-1"
					error={errors.sender?.message}
				/>
			</div>

			{selectedChannel === "EMAIL" && (
				<div className="mb-2">
					<label htmlFor="receiver" className="font-bold">
						Receiver's email
					</label>

					<Input
						{...register("receiver", {
							required: { value: true, message: "Email is required" },
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Enter valid email",
							},
						})}
						id="receiver"
						type="email"
						placeholder="name@proton.me"
						className="mt-1"
						error={errors.receiver?.message}
					/>
				</div>
			)}

			<div className="mb-4">
				<label htmlFor="message" className="font-bold">
					Message for receiver
				</label>

				<Textarea
					{...register("message", {
						maxLength: { value: 500, message: "Max 500 characters" },
					})}
					id="message"
					rows={3}
					placeholder="Enter your message..."
					className="mt-1"
					error={errors.message?.message}
				/>
			</div>

			<Button type="button" className="group w-full items-center" onClick={onNext}>
				<span>Continue</span>
				<span className="ml-2 transition-transform group-hover:translate-x-1">
					<ArrowRight size={18} className="mt-1" />
				</span>
			</Button>
		</>
	);
};
