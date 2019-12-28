interface ICache {
    id: number;
    title: string;
    description: string;
    score: number;
}
export declare class ShowsAPI {
    private readonly url;
    private debounceTime;
    private cache;
    private debounceFlag;
    constructor(url: string, debounceTime?: number);
    fetchData(query: string): Promise<ICache[] | null>;
    private getData;
    private getLocalStorageCache;
    private getRamCache;
    private startDebounce;
}
export {};
