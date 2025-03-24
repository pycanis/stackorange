import { Check } from "lucide-react";

export const SuccessIcon = () => {
	return (
		<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-200">
			<Check color="green" size={28} strokeWidth={3} />
		</div>
	);
};
