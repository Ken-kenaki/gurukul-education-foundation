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
    stories: "6859905b001b1d6fd179", // This will now handle testimonials
    gallery: "6859941e001999cd38d3",
    forms: "6859912a0022520057f3",
    newsEvents: "685991f10024124ede1c",
    countries: "685992c4001bd5a33472",
    universities: "68599372003c5d2c7c20",
  },
};
