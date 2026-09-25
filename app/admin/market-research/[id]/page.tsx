import BlogFormPage from "../../blogs/BlogForm";

export default async function EditMarketResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogFormPage section="market-research" postId={parseInt(id, 10)} />;
}
