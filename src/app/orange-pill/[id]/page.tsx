import { OrangePill } from "../../../containers/OrangePill";

export const dynamic = "force-static";

export default async function OrangePillPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <div>
      <p className="mb-4 text-2xl font-bold">Ready to take the orange pill?</p>
      <OrangePill id={params.id} />
    </div>
  );
}
