import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/server/appwrite'
import { appwriteConfig } from '@/lib/appwrite/config'
import { ID } from 'node-appwrite'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const { databases, storage } = await createAdminClient()

    if (id) {
      // Get single document
      const document = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collections.gallery,
          id
      )

      // Get file preview URL
      const imageUrl = storage.getFilePreview(
          appwriteConfig.buckets.gallery,
          document.imageId,
          800,
          600
      )

      return NextResponse.json({
        ...document,
        imageUrl: imageUrl.href
      })
    } else {
      // Get all documents
      const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.collections.gallery
      )

      // Enhance with image URLs
      const enhancedDocuments = await Promise.all(
          response.documents.map(async (doc: any) => {
            const imageUrl = storage.getFilePreview(
                appwriteConfig.buckets.gallery,
                doc.imageId,
                800,
                600
            )
            return {
              ...doc,
              imageUrl: imageUrl.href
            }
          })
      )

      return NextResponse.json(enhancedDocuments)
    }
  } catch (error: any) {
    console.error('Gallery API Error:', error)
    return NextResponse.json(
        { error: error.message || 'Failed to fetch gallery items' },
        { status: error.code || 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { databases, storage } = await createAdminClient()
    const formData = await request.formData()

    // Extract form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const tags = formData.getAll('tags') as string[]
    const file = formData.get('file') as File

    if (!file || !title || !category) {
      throw new Error('Missing required fields')
    }

    // Upload file to storage
    const fileId = ID.unique()
    await storage.createFile(
        appwriteConfig.buckets.gallery,
        fileId,
        file
    )

    // Create document in database
    const document = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.gallery,
        ID.unique(),
        {
          title,
          description,
          category,
          tags,
          imageId: fileId
        }
    )

    return NextResponse.json(document)

  } catch (error: any) {
    console.error('Gallery Upload Error:', error)
    return NextResponse.json(
        { error: error.message || 'Failed to upload gallery item' },
        { status: error.code || 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      throw new Error('Document ID is required')
    }

    const { databases, storage } = await createAdminClient()
    const formData = await request.formData()

    // Get existing document
    const existingDoc = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.gallery,
        id
    )

    // Prepare update data
    const updateData: any = {
      title: formData.get('title') || existingDoc.title,
      description: formData.get('description') || existingDoc.description,
      category: formData.get('category') || existingDoc.category,
      tags: formData.getAll('tags') as string[] || existingDoc.tags
    }

    // Handle file update if provided
    const file = formData.get('file') as File | null
    if (file) {
      // Delete old file
      await storage.deleteFile(
          appwriteConfig.buckets.gallery,
          existingDoc.imageId
      )

      // Upload new file
      const newFileId = ID.unique()
      await storage.createFile(
          appwriteConfig.buckets.gallery,
          newFileId,
          file
      )
      updateData.imageId = newFileId
    }

    // Update document
    const updatedDoc = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.gallery,
        id,
        updateData
    )

    return NextResponse.json(updatedDoc)

  } catch (error: any) {
    console.error('Gallery Update Error:', error)
    return NextResponse.json(
        { error: error.message || 'Failed to update gallery item' },
        { status: error.code || 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      throw new Error('Document ID is required')
    }

    const { databases, storage } = await createAdminClient()

    // Get document first to delete associated file
    const document = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.gallery,
        id
    )

    // Delete file from storage
    await storage.deleteFile(
        appwriteConfig.buckets.gallery,
        document.imageId
    )

    // Delete document
    await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.gallery,
        id
    )

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Gallery Delete Error:', error)
    return NextResponse.json(
        { error: error.message || 'Failed to delete gallery item' },
        { status: error.code || 500 }
    )
  }
}