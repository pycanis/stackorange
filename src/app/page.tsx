import { History } from "../containers/History";
import { Landing } from "../containers/Landing";

export default function IndexPage() {
  return (
    <div>
      <div className="h-fit bg-amber-100 p-4 max-w-lg min-w-xs rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] shadow-secondary">
        <Landing />
      </div>

      <History />
    </div>
  );
}
