export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!, // Changed from PROJECT to PROJECT_ID
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY!, // Changed to PUBLIC and standardized naming
  buckets: {
    gallery: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET!,
    resources: process.env.NEXT_PUBLIC_APPWRITE_RESOURCES_BUCKET!, // Fixed typo
    news: process.env.NEXT_PUBLIC_APPWRITE_NEWS_BUCKET!, // Fixed typo
    universities: process.env.NEXT_PUBLIC_APPWRITE_UNIVERSITIES_BUCKET!, // Fixed typo
    stories: process.env.NEXT_PUBLIC_APPWRITE_STORIES_BUCKET!, // Fixed typo
    teams: process.env.NEXT_PUBLIC_APPWRITE_TEAMS_BUCKET!, // Fixed typo
  },
  collections: {
    resources: "686354520002fd9e6c37",
    stories: "68622a2b00394add092f",
    gallery: "68622cb6000612ca517e",
    forms: "6859912a0022520057f3",
    newsEvents: "68622af0000981b60e79",
    countries: "68622b8b002007f6d68a",
    universities: "68622c1b002c753f0fdd",
    teams: "6866562f003e1aca5dd3",
    visaRequirements: "686f314d001140b38b74",
    statistics: "687140af002107f06aa1",
  },
};
