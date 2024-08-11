import Base from "@/models/Base";

interface IUser {
    id: string;
    username?: string;
    email?: string;
    name?: string;
    avatar?: string;
    created?: Date;
    updated?: Date;
}

export default class User extends Base<IUser> {
    private static readonly _collectionName = "users"
    protected static _refObj = {
        id: "", username: "", email: "", avatar: "", name: "", created: new Date(), updated: new Date()
    } as IUser;
    
    /**
     * Creates a user from any object
     * 
     * @param obj object wanting to parse
     * @param mapping mapping to compensate for differences in property names
     * @returns User
     */
    public static fromObject(obj: unknown, mapping?: Record<string, keyof IUser> | undefined): User | null {
        return super.fromBaseObject(obj, User._collectionName, this._refObj, mapping);
    }

    constructor(user: IUser) {
        super(user, User._collectionName);
    }
}