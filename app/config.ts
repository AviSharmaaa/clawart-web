import * as dotenv from 'dotenv';

dotenv.config();

export default {
    APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT ?? '',
    PROJECT_ID: process.env.PROJECT_ID ?? '',
    GITHUB_BASE_URL: process.env.GITHUB_BASE_URL ?? '',
    GOOGLE_BASE_URL: process.env.GOOGLE_BASE_URL ?? '',
}