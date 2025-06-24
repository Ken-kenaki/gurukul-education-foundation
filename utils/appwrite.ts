// utils/appwrite.ts
export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET!,
};

export function getImageUrl(
    imageId: string,
    width: number = 800,
    height: number = 600
): string {
    return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${imageId}/preview?project=${appwriteConfig.projectId}&width=${width}&height=${height}`;
}