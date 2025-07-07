// app/about/[id]/page.tsx
import { getImageUrl } from "@/utils/appwrite";
import Image from "next/image";
import { notFound } from "next/navigation";

interface TeamMember {
  $id: string;
  name: string;
  position: string;
  description: string;
  imageId?: string;
  socialLinks?: string;
  skills?: string[];
}

async function getTeamMember(id: string): Promise<TeamMember | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/team/${id}`
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching team member:", error);
    return null;
  }
}

export default async function TeamMemberPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getTeamMember(params.id);

  if (!member) {
    return notFound();
  }

  const imageUrl = member.imageId
    ? getImageUrl(
        member.imageId,
        process.env.NEXT_PUBLIC_APPWRITE_TEAMS_BUCKET!,
        500,
        500
      )
    : "/default-avatar.jpg";

  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative w-64 h-64 rounded-full overflow-hidden mx-auto mb-6">
              <Image
                src={imageUrl}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.jpg";
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-[#2C3C81] mb-2">
              {member.name}
            </h1>
            <p className="text-xl text-[#C73D43] font-semibold mb-6">
              {member.position}
            </p>

            <div className="prose text-[#2C3C81] mb-8">
              <p>{member.description}</p>
            </div>

            {member.skills && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#2C3C81] mb-2">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#2C3C81]/10 text-[#2C3C81] px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.socialLinks && (
              <div>
                <h3 className="text-lg font-semibold text-[#2C3C81] mb-2">
                  Connect
                </h3>
                {/* Add your social links component here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
