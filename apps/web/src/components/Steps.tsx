import { Check } from "lucide-react";

type Props = {
	currentStep: number;
	totalSteps?: number;
};

const Circle = ({
	stepNumber,
	isActive,
	isPast,
}: { stepNumber: number; isActive: boolean; isPast: boolean }) => (
	<div
		className={"mr-2 flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold".concat(
			isActive
				? " border-orange bg-orange"
				: isPast
					? " border-orange bg-white text-orange"
					: " border-white-muted bg-white text-white-muted",
		)}
	>
		{isPast ? <Check size={18} /> : stepNumber}
	</div>
);

const Line = ({ isPast }: { isPast: boolean }) => (
	<div className={"mr-2 h-0.5 w-12".concat(isPast ? " bg-orange" : " bg-white-muted")} />
);

export const Steps = ({ currentStep, totalSteps = 3 }: Props) => {
	return (
		<div className="mb-6 flex justify-center">
			{Array.from({ length: totalSteps }).map((_, index) => {
				const stepNumber = index + 1;
				const isActive = stepNumber === currentStep;
				const isPast = stepNumber < currentStep;

				return (
					<div key={stepNumber} className="flex items-center justify-between">
						<Circle stepNumber={stepNumber} isActive={isActive} isPast={isPast} />

						{index < totalSteps - 1 && <Line isPast={isPast} />}
					</div>
				);
			})}
		</div>
	);
};
