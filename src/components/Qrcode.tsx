import qrcode from "qrcode";
import { useEffect } from "react";

type Props = {
  payload: string;
};

export const Qrcode = ({ payload }: Props) => {
  useEffect(() => {
    qrcode.toCanvas(document.getElementById("canvas"), payload);
  });

  return <canvas id="canvas" />;
};
