// lib/appwrite/storage.ts
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "./config";
import { ID } from "node-appwrite";

export class StorageService {
  private static async getClient() {
    return await createAdminClient();
  }

  static async uploadFile(bucketId: string, file: File) {
    const { storage } = await this.getClient();
    return await storage.createFile(bucketId, ID.unique(), file);
  }

  static async deleteFile(bucketId: string, fileId: string) {
    const { storage } = await this.getClient();
    return await storage.deleteFile(bucketId, fileId);
  }

  static async getFile(bucketId: string, fileId: string) {
    const { storage } = await this.getClient();
    return await storage.getFile(bucketId, fileId);
  }

  static async getFileDownload(bucketId: string, fileId: string) {
    const { storage } = await this.getClient();
    return await storage.getFileDownload(bucketId, fileId);
  }

  static async getFileView(bucketId: string, fileId: string) {
    const { storage } = await this.getClient();
    return storage.getFileView(bucketId, fileId);
  }

  static async getFilePreview(
    bucketId: string,
    fileId: string,
    width = 500,
    height = 300
  ) {
    const { storage } = await this.getClient();
    return storage.getFilePreview(bucketId, fileId, width, height);
  }
}
