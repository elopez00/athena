import invariant from "ts-invariant";

interface IServerEnvironment {
    /** Token to be used by YNAB API */
    ynabToken: string;
}

interface IClientEnvironment {
    /** Used to initialize pocket base auth */
    pbEndpoint: string;
}

type IEnvironment = IClientEnvironment & IServerEnvironment;

export default class Environment {
    /**
     * Gets all available variables. Useful for serverside operations that need
     * clientside variables. Warning though, if tried to get in the client, this
     * will throw.
     */
    public static get(): IEnvironment {
        const server = this.getServer();
        const client = this.getClient();
        
        return {
            ...client,
            ...server,
        }
    }
    
    /**
     * Gets a value from the general environment. If used in client, it will
     * throw.
     */
    public static getValue(key: keyof IEnvironment): string {
        const env = this.get();
        return env[key];
    }
    
    /**
     * Fetches environment object 
     */
    public static getServer(): IServerEnvironment {
        invariant(process.env.YNAB_TOKEN, "YNAB Token is not defined")
        
        return {
            ynabToken: process.env.YNAB_TOKEN!,
        };
    }
    
    /**
     * Fetches a value of the server environment
     *
     * @param key this is any expected env variable
     * @returns value of environment
     */
    public static getServerValue(key: keyof IServerEnvironment): string {
        const env = this.getServer();
        return env[key];
    }
    
    /**
     * Fetches the public environment
     */
    public static getClient(): IClientEnvironment {
        invariant(process.env.NEXT_PUBLIC_POCKETBASE_ENDPOINT, "PocketBase endpoint is not defined")

        return {
            pbEndpoint: process.env.NEXT_PUBLIC_POCKETBASE_ENDPOINT!,
        }
    }
    
    /**
     * Fetches a value of the client environment
     *
     * @param key this is any expected env variable
     * @returns value of environment
     */
    public static getClientValue(key: keyof IClientEnvironment): string {
        const env = this.getClient();
        return env[key];
    }
}
