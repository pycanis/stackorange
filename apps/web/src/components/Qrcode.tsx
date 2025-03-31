import qrcode from "qrcode";
import { useEffect } from "react";

type Props = {
	payload: string;
};

export const Qrcode = ({ payload }: Props) => {
	useEffect(() => {
		qrcode.toCanvas(document.getElementById("canvas"), payload, { width: 208 });
	});

	return (
		<a href={payload}>
			<canvas id="canvas" className="rounded-lg" />
		</a>
	);
};
