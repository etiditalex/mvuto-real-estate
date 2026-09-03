import PropertyFormPage from "../PropertyForm";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyFormPage propertyId={parseInt(id, 10)} />;
}
