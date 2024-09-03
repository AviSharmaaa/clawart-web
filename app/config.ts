import * as dotenv from 'dotenv';

dotenv.config();

export default {
    APPWRITE_ENDPOINT: process.env.VITE_APPWRITE_ENDPOINT ?? '',
    PROJECT_ID: process.env.VITE_PROJECT_ID ?? '',
    GITHUB_BASE_URL: process.env.VITE_GITHUB_BASE_URL ?? '',
    GOOGLE_BASE_URL: process.env.VITE_GOOGLE_BASE_URL ?? '',
    APPWRITE_DATABASE_ID: process.env.VITE_APPWRITE_DATABASE_ID ?? '',
    APPWRITE_CANVASES_COLLECTION_ID: process.env.VITE_APPWRITE_CANVASES_COLLECTION_ID ?? '',
    APPWRITE_PATHS_COLLECTION_ID: process.env.VITE_APPWRITE_PATHS_COLLECTION_ID ?? '',
}