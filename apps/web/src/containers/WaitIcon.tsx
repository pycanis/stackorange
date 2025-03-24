import { Hourglass } from "lucide-react";

export const WaitIcon = () => {
	return (
		<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-200">
			<Hourglass size={28} strokeWidth={3} className="text-orange" />
		</div>
	);
};
