import PocketBase from "pocketbase";
import Environment from "@/util/Environment";

export default class Base<T> {
    private static readonly _pbClient = new PocketBase(Environment.getClientValue("pbEndpoint"));

    // member variables d s
    public data: T;
    public id: string;
    protected readonly _collectionName: string;
    
    constructor(data: T, collectionName: string) {
        this.data = data;
        this.id = (data as any).id;
        this._collectionName = collectionName;
    }

    protected static fromBaseObject<T>(obj: unknown, collectionName: string, refObject: T, mapping?: Record<string, keyof T>): Base<T> | null {
        // return null if it is null
        if (obj === null) return null;
        
        // define the unknown object as read/any
        const read = obj as Record<string, any>;
        const keyList = Object.keys(refObject as Record<string, any>);

        // remap the keys if in mapping
        for (const key in mapping) {
            if (!(key in read)) continue;

            read[mapping[key] as string] = read[key];
            delete read[key];
        }

        // gets all properties that could belong to user
        const baseObject = Object.fromEntries(
                Object.entries(read).filter(([key]) => keyList.includes((key) as string))
        ) as T;
        
        // returns user or null depending on found values
        return Object.keys(baseObject as Record<string, any>).length ? new Base(baseObject as T, collectionName) : null;
    }
    
    
    protected generateRequestBody() {
        const reqBody = new FormData();
        
        // populate reqBody with necessary values
        Object.entries(this.data as Record<string, any>).forEach(([key, value]) => {
            reqBody.set(key, value);
        });
        
        return reqBody;
    }
    
    /**
     * Saves the current diff of object
     */
    public async save() {
        const reqBody = this.generateRequestBody();
        console.log(reqBody.entries())
        
        await Base._pbClient.collection(this._collectionName).update(this.id, reqBody)
    }
    
    /**
     * Saves the difference the current and the comparator object. Only takes into
     * account the properties that exist on both
     */
    public async saveDifference(otherBase: Base<T> | null) {
        if (otherBase === null) return;

        // get the keys
        let otherKeys = Object.keys(otherBase.data as Record<string, any>);
        let theseKeys = Object.keys(this.data as Record<string, any>);
        let comparisonKeys = theseKeys.filter((key) => otherKeys.includes(key));
        
        // compare all the keys
        let newData: T = {} as T;
        for (const key of comparisonKeys) {
            const thisData = this.data as Record<string, any>;
            const otherData = otherBase.data as Record<string, any>;

            if (thisData[key] === otherData[key]) {
                continue;
            };
            
            (newData as Record<string, any>)[key] = (otherBase.data as Record<string, any>)[key];
        }
        
        // if there is no new data, skip
        if (!Object.keys(newData as Record<string, any>)) return;
        
        // define new base and call save
        (newData as Record<string, any>).id = this.id;
        const newBase = new Base(newData, this._collectionName);
        await newBase.save();
    }
}