import { OrangePill } from "../../../containers/OrangePill";

export default async function OrangePillPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <div>
      <p>orange pill page</p>
      <OrangePill id={params.id} />
    </div>
  );
}
