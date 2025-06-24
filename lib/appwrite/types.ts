export interface GalleryItem {
    $id: string
    $collectionId: string
    $databaseId: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    title: string
    description?: string
    category: string
    tags: string[]
    imageId: string
    imageUrl?: string
}