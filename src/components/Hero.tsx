import Image from "next/image";
import logo from "../../public/logo.svg";

export const Hero = () => {
  return (
    <>
      <Image className="mb-4" src={logo} width={100} alt="The orange." />

      <div className="px-3 py-1 text-xs font-bold text-orange bg-[rgba(255,184,77,0.2)] rounded-full uppercase mb-4">
        They won’t get it until they get some
      </div>

      <h1 className="text-5xl font-bold mb-4">
        Stack <span className="text-orange">Orange</span>
      </h1>

      <div className="mb-12 text-white-muted text-xl">
        The easiest way to orange-pill nocoiners by getting their hands dirty with their first sats. Plant the seeds of
        financial revolution.
      </div>
    </>
  );
};
