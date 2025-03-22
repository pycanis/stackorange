import logo from "../assets/logo.svg";

export const Hero = () => {
	return (
		<>
			<img className="mb-4 w-24" src={logo.src} alt="The orange." />

			<div className="mb-4 rounded-full bg-[rgba(255,184,77,0.2)] px-3 py-1 font-bold text-orange text-xs uppercase">
				They won’t get it until they get some
			</div>

			<h1 className="mb-4 font-bold text-5xl">
				Stack <span className="text-orange">Orange</span>
			</h1>

			<div className="mb-12 max-w-xl text-white-muted text-xl">
				The easiest way to orange-pill nocoiners by getting their hands dirty with their first sats.
				Plant the seeds of financial revolution.
			</div>
		</>
	);
};
