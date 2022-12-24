import config from "../config";
import { Account, Client } from "appwrite"

const client = new Client()
    .setEndpoint(config.APPWRITE_PROJECT_ENDPOINT)
    .setProject(config.APPWRITE_PROJECT_ID);

const appwriteAccount = new Account(client);
export default appwriteAccount;