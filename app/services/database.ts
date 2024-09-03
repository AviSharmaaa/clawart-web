import { Client, Databases } from "appwrite";
import config from '../config';

const APPWRITE_ENDPOINT = config.APPWRITE_ENDPOINT;
const PROJECT_ID = config.PROJECT_ID;
const APPWRITE_DATABASE_ID = config.APPWRITE_DATABASE_ID;
const APPWRITE_CANVASES_COLLECTION_ID = config.APPWRITE_CANVASES_COLLECTION_ID;

class Database {
    private client: Client;
    private database: Databases;

    constructor() {
        this.client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
        this.database = new Databases(this.client);
    }

    async getCanvases() {
        try {
            let response = await this.database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_CANVASES_COLLECTION_ID);
            console.log(response);
        } catch (error) {
            console.error("Error fetching canvases:", error);
        }
    }
}

const database = new Database();

export default database;