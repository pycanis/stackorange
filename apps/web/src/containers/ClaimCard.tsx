import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
	delay: number;
};

export const ClaimCard = ({ children, delay }: Props) => {
	return (
		<motion.div
			style={{ visibility: "hidden" }}
			initial={{ opacity: 0, y: 100, visibility: "visible" }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay, duration: 0.5 }}
		>
			<div className="bg-white-muted/10 rounded-lg border border-white-muted/50 px-2 py-4 mb-4">
				{children}
			</div>
		</motion.div>
	);
};
