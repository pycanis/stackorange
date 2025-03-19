import { ClaimChannel } from "@repo/database";
import { ArrowRight, Mail, Smartphone } from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import type { FormValues } from "./Form";

const channelIcons: Record<ClaimChannel, { icon: JSX.Element; text: string }> =
	{
		[ClaimChannel.EMAIL]: { icon: <Mail width={16} />, text: "Email" },
		[ClaimChannel.SMS]: {
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
			<p className="text-center font-bold text-2xl mb-2">
				Who's receiving sats?
			</p>

			<p className="text-center text-white-muted text-lg mb-4">
				Fill out the receiver details. We'll send them your message and the
				withdrawal link with some onboarding resources.
			</p>

			<div className="w-full bg-white-muted/50 p-1 rounded-lg mb-2 flex">
				{Object.values(ClaimChannel).map((channel) => (
					<Button
						key={channel}
						type="button"
						onClick={() => setValue("channel", channel)}
						className={"text-sm flex-1 flex justify-center items-center".concat(
							" ",
							selectedChannel === channel
								? "bg-background font-bold"
								: "text-white/70",
						)}
						variant="group"
						disabled={channel !== ClaimChannel.EMAIL}
					>
						<span className="mr-2">{channelIcons[channel].icon}</span>
						<span>{channelIcons[channel].text}</span>
					</Button>
				))}
			</div>

			{selectedChannel === ClaimChannel.EMAIL && (
				<div className="mb-2">
					<label htmlFor="receiver" className="font-bold">
						Email
					</label>

					<Input
						{...register("receiver", { required: "Enter valid email" })} // todo: proper email validation
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
					Message
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

			<Button type="button" className="group items-center" onClick={onNext}>
				<span>Continue</span>
				<span className="ml-2 group-hover:translate-x-1 transition-transform">
					<ArrowRight size={18} className="mt-1" />
				</span>
			</Button>
		</>
	);
};
