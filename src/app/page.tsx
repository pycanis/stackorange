import { Background } from "../components/Background";
import { Hero } from "../components/Hero";
import { SendOrangePill } from "../containers/SendOrangePill";

export const dynamic = "force-static";

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />

      <Background />

      <SendOrangePill />
    </div>
  );
}
