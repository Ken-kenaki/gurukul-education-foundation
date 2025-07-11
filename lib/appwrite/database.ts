// lib/appwrite/database.ts
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "./config";
import { ID, Query } from "node-appwrite";

export interface Story {
  $id?: string;
  name: string; // Changed from title to name
  program: string; // Changed from author to program
  university: string; // New field
  content: string;
  rating: number; // New field (1-5)
  status: "pending" | "approved" | "rejected"; // Changed from draft/published
  imageId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsEvent {
  $id?: string;
  title: string;
  type: "news" | "event";
  content: string;
  date: string;
  status: "draft" | "published";
  imageId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VisaRequirement {
  $id?: string;
  countryName: string;
  title: string;
  requirements: string[];
  ctaText: string;
  ctaLink: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Resource {
  $id?: string;
  name: string;
  description?: string;
  type: string;
  size?: number;
  fileId?: string; // Added to store reference to the actual file
  createdAt?: string;
}

export interface TeamMember {
  $id?: string;
  name: string;
  position: string;
  description: string;
  bio?: string;
  imageId?: string;
  socialLinks?: string; // Stored as JSON string
  skills?: string; // Stored as JSON string
  createdAt?: string;
}

export interface FormSubmission {
  $id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "pending" | "responded";
  createdAt?: string;
}

export interface Country {
  $id?: string;
  name: string;
  flag: string;
  imageId?: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  createdAt?: string;
}

export interface Statistic {
  $id?: string;
  name: string; // 'students', 'universities', 'countries'
  count: number;
  suffix: string;
  updatedAt?: string;
}

export interface University {
  $id?: string;
  name: string;
  country: string;
  imageId?: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  createdAt?: string;
}

export class DatabaseService {
  private static async getClient() {
    return await createAdminClient();
  }

  // Student Success Stories (Testimonials) CRUD
  static async createStory(
    data: Omit<Story, "$id" | "createdAt" | "updatedAt">
  ) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      ID.unique(),
      {
        ...data,
        status: "pending", // Default status for new submissions
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async getStories(limit = 50, offset = 0, status?: string) {
    const { databases } = await this.getClient();
    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("createdAt"),
    ];

    if (status) {
      queries.push(Query.equal("status", status));
    }

    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      queries
    );
  }

  static async getStory(id: string) {
    const { databases } = await this.getClient();
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      id
    );
  }

  static async updateStory(id: string, data: Partial<Story>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      id,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async deleteStory(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      id
    );
  }

  // News & Events CRUD
  static async createNewsEvent(
    data: Omit<NewsEvent, "$id" | "createdAt" | "updatedAt">
  ) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async getNewsEvents(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
    );
  }

  static async updateNewsEvent(id: string, data: Partial<NewsEvent>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      id,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async deleteNewsEvent(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      id
    );
  }

  // Form Submissions CRUD
  static async createFormSubmission(
    data: Omit<FormSubmission, "$id" | "createdAt">
  ) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getFormSubmissions(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
    );
  }

  static async updateFormSubmission(id: string, data: Partial<FormSubmission>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      id,
      data
    );
  }

  static async deleteFormSubmission(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      id
    );
  }

  // Countries CRUD
  static async createCountry(data: Omit<Country, "$id" | "createdAt">) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getCountries(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
    );
  }

  static async updateCountry(id: string, data: Partial<Country>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      id,
      data
    );
  }

  static async deleteCountry(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      id
    );
  }

  // Universities CRUD
  static async createUniversity(data: Omit<University, "$id" | "createdAt">) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getUniversities(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
    );
  }

  static async updateUniversity(id: string, data: Partial<University>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      id,
      data
    );
  }

  static async deleteUniversity(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      id
    );
  }

  // Resources CRUD
  static async createResource(data: Omit<Resource, "$id" | "createdAt">) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.resources,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getResources(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.resources,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
    );
  }

  static async getResource(id: string) {
    const { databases } = await this.getClient();
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.resources,
      id
    );
  }

  static async updateResource(id: string, data: Partial<Resource>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.resources,
      id,
      data
    );
  }

  static async deleteResource(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.resources,
      id
    );
  }

  static async getResourceByFileId(fileId: string) {
    const { databases } = await this.getClient();
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.resources,
      [Query.equal("fileId", fileId)]
    );

    return res.documents[0] || null;
  }

  // Add to DatabaseService class
  static async createVisaRequirement(
    data: Omit<VisaRequirement, "$id" | "createdAt" | "updatedAt">
  ) {
    const { databases } = await this.getClient();

    try {
      // Create the document with explicit ID generation
      const result = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.visaRequirements,
        ID.unique(), // This is the crucial fix - generates a new unique ID
        {
          countryName: data.countryName,
          title: data.title,
          requirements: JSON.stringify(data.requirements),
          ctaText: data.ctaText,
          ctaLink: data.ctaLink,
        }
      );

      return {
        ...result,
        requirements: JSON.parse(result.requirements),
      };
    } catch (error: any) {
      console.error("Error creating visa requirement:", {
        error: error.message,
        type: error.type,
        code: error.code,
        response: error.response,
      });
      throw error;
    }
  }

  static async getVisaRequirementsByCountryName(countryName: string) {
    const { databases } = await this.getClient();
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.visaRequirements,
      [Query.equal("countryName", countryName)]
    );

    return {
      ...result,
      documents: result.documents.map((doc) => ({
        ...doc,
        requirements: JSON.parse(doc.requirements),
      })),
    };
  }

  static async getAllVisaRequirements() {
    const { databases } = await this.getClient();
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.visaRequirements,
      [Query.orderDesc("createdAt")]
    );

    return {
      ...result,
      documents: result.documents.map((doc) => ({
        ...doc,
        requirements: JSON.parse(doc.requirements),
      })),
    };
  }

  static async getVisaRequirement(id: string) {
    const { databases } = await this.getClient();
    const doc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.visaRequirements,
      id
    );

    return {
      ...doc,
      requirements: JSON.parse(doc.requirements),
    };
  }

  /**
   * Update a visa requirement
   */
  static async updateVisaRequirement(
    id: string,
    data: Partial<VisaRequirement>
  ) {
    const { databases } = await this.getClient();
    const updateData: any = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    if (data.requirements) {
      updateData.requirements = JSON.stringify(data.requirements);
    }

    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.visaRequirements,
      id,
      updateData
    );
  }

  /**
   * Delete a visa requirement
   */
  static async deleteVisaRequirement(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.visaRequirements,
      id
    );
  }

  /**
   * Get all unique country names with visa requirements
   */
  static async getCountriesWithVisaRequirements() {
    const { databases } = await this.getClient();
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.visaRequirements,
      [Query.select(["countryName"]), Query.limit(100)]
    );

    // Extract unique country names
    const countries = new Set<string>();
    result.documents.forEach((doc) => {
      countries.add(doc.countryName);
    });

    return Array.from(countries);
  }

  // Statistics CRUD
  static async getStatistic(name: string) {
    const { databases } = await this.getClient();
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.statistics,
      [Query.equal("name", name), Query.limit(1)]
    );
    return result.documents[0] as Statistic | null;
  }

  static async updateStatistic(id: string, count: number) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.statistics,
      id,
      { count } // Only include attributes that exist in your schema
    );
  }

  static async getAllStatistics() {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.statistics
    );
  }
}
