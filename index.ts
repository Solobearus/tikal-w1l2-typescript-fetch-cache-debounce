// interface ICache {
interface ICache {
    id: number,
    title: string,
    description: string,
    score: number
}

interface ICacheData {
    [key: string]: ICache[];
}

interface IResponse {
    show: {
        id: number,
        name: string,
        summary: string
    }
    score: number
}

export class ShowsAPI {
    private cache: ICacheData = {};
    private debounceFlag: boolean = false;

    constructor(private readonly url: string, private debounceTime = 600) {
        this.url = url;
    }

    async fetchData(query: string): Promise<ICache[] | null> {
        if (this.debounceFlag) {
            return null;
        }

        this.startDebounce()

        this.cache[query] = this.getRamCache(query)
            || this.getLocalStorageCache(query)
            || await this.getData(query);

        localStorage.setItem(query, JSON.stringify(this.cache[query]));
        return this.cache[query]
    }

    private async getData(query: string): Promise<ICache[]> {
        try {
            const result = await fetch(this.url + "/" + query);
            const resultParsed: IResponse[] = await result.json();

            return resultParsed.map(item => ({
                id: item.show.id,
                title: item.show.name,
                description: item.show.summary,
                score: item.score
            }))
        } catch (e) {
            return null
        }
    }

    private getLocalStorageCache(query: string): ICache[] {
        if(!localStorage.getItem(query)){
            return null
        }
        try {
            this.cache[query] = JSON.parse(localStorage.getItem(query));
            console.log('got from localstorage');
            return this.cache[query];
        } catch (e) {
            return null
        }
    }

    private getRamCache(query: string): ICache[] {
        if (this.cache[query]) {
            console.log('got from ram');
            return this.cache[query]
        }
        return null
    }


    private startDebounce() {
        this.debounceFlag = true;

        setTimeout(() => {
            this.debounceFlag = false;
        }, this.debounceTime);
    }
}