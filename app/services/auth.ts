import { Client, Account, OAuthProvider } from 'appwrite';
import axios from 'axios';
import config from '../config';

const APPWRITE_ENDPOINT = config.APPWRITE_ENDPOINT;
const PROJECT_ID = config.PROJECT_ID;
const GITHUB_BASE_URL = config.GITHUB_BASE_URL;
const GOOGLE_BASE_URL = config.GOOGLE_BASE_URL;

class Auth {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
        this.account = new Account(this.client);
    }

    async loginViaGithub(): Promise<void> {
        try {
            this.account.createOAuth2Session(
                OAuthProvider.Github,
                'http://localhost:3000/success',
                'http://localhost:3000/',
                ['user', 'account']
            );
        } catch (error) {
            console.error('Error logging in via GitHub:', error);
            throw error;
        }
    }

    async loginViaGoogle(): Promise<void> {
        try {
            this.account.createOAuth2Session(
                OAuthProvider.Google,
                'http://localhost:3000/success',
                'http://localhost:3000/',
                ['email', 'profile']
            );
        } catch (error) {
            console.error('Error logging in via Google:', error);
            throw error;
        }
    }

    async getUserSession(): Promise<any> {
        try {
            const session = await this.account.getSession('current');
            const { provider, providerAccessToken } = session;

            let user;
            if (provider === 'github') {
                user = await axios.get(`${GITHUB_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${providerAccessToken}`,
                        Accept: 'application/vnd.github+json'
                    }
                });
            } else if (provider === 'google') {
                user = await axios.get(`${GOOGLE_BASE_URL}?access_token=${providerAccessToken}`, {
                    headers: {
                        Authorization: `Bearer ${providerAccessToken}`,
                        Accept: 'application/json'
                    }
                });
            } else {
                throw new Error('Invalid Login Provider.');
            }

            return user.data;
        } catch (error) {
            console.error('Error getting user session');
            return null;
        }
    }
}

const authService = new Auth();

export default authService;
