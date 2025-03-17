import { Background } from "../components/Background";
import { Hero } from "../components/Hero";
import { History } from "../containers/History";
import { SendOrangePill } from "../containers/SendOrangePill";

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />

      <Background />

      <SendOrangePill />

      <History />
    </div>
  );
}
