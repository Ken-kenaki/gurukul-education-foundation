// app/resources/page.tsx
import { DatabaseService } from "@/lib/appwrite/database";
import ResourceCard from "@/Components/ResourcesCard";

export default async function ResourcesPage() {
  const resources = await DatabaseService.getResources();

  return (
    <div className="container pt-55 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-red-500">Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.documents.map((resource) => (
          <ResourceCard key={resource.$id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
