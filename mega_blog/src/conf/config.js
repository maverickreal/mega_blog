const config = {
    appwriteUrl: (import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: (import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId: (import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseId: (import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId: (import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMceApiKey: (import.meta.env.VITE_TINY_MCE_API_KEY),
};

export default config;
