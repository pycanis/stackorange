import { Button } from "./ui/Button";

type Props = {
  link: string;
  name: string;
  description: string;
};

export const WalletLink = ({ description, link, name }: Props) => {
  return (
    <Button variant="secondary" className="flex-col items-start" onClick={() => window.open(link, "_blank")}>
      <span className="font-bold">{name}</span>
      <span className="text-white-muted text-sm">{description}</span>
    </Button>
  );
};
