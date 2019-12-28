interface ICache {
    id: number;
    title: string;
    description: string;
    score: number;
}
export declare class ShowsAPI {
    private url;
    private cache;
    private debounceFlag;
    constructor(url: string);
    fetchData(query: string): Promise<ICache[] | null>;
}
export {};
