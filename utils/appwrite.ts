// utils/appwrite.ts

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,

  // Named bucket IDs for different purposes
  buckets: {
    gallery: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET!,
    stories: process.env.NEXT_PUBLIC_APPWRITE_STORIES_BUCKET!,
    news: process.env.NEXT_PUBLIC_APPWRITE_NEWS_BUCKET!,
    universities: process.env.NEXT_PUBLIC_APPWRITE_UNIVERSITIES_BUCKET!,
  },
};

export function getImageUrl(
  imageId: string,
  bucketId: string,
  width: number = 800,
  height: number = 600
): string {
  return `${appwriteConfig.endpoint}/storage/buckets/${bucketId}/files/${imageId}/preview?project=${appwriteConfig.projectId}&width=${width}&height=${height}`;
}
