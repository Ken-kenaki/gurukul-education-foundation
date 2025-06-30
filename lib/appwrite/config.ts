export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  apiKey: process.env.NEXT_APPWRITE_KEY!,
  buckets: {
    gallery: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET!,
    news: process.env.NEXT_PUBLIC_APPWRITE_NEWS_BUCKET!,
    universities: process.env.NEXT_PUBLIC_APPWRITE_UNIVERSITIES_BUCKET!,
    stories: process.env.NEXT_PUBLIC_APPWRITE_STORIES_BUCKET!,
  },
  collections: {
    stories: "68622a2b00394add092f", // This will now handle testimonials
    gallery: "68622cb6000612ca517e",
    forms: "6859912a0022520057f3",
    newsEvents: "68622af0000981b60e79",
    countries: "68622b8b002007f6d68a",
    universities: "68622c1b002c753f0fdd",
  },
};
