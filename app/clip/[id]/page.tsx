import ClipPage from "@/components/clip-page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClipPage clipId={id} />;
}
