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

    private url: string;
    private cache: ICacheData = {};
    private debounceFlag: boolean = false;

    constructor(url: string) {
        this.url = url;
    }

    async fetchData(query: string): Promise<ICache[] | null> {

        if (this.debounceFlag) {
            return null
        }

        this.debounceFlag = true;

        setTimeout(() => {
            this.debounceFlag = false;
        }, 600);

        if (this.cache[query]) {
            console.log('got from ram');
            return this.cache[query]
        }

        if (localStorage.getItem(query)) {
            console.log('got from localstorage');
            this.cache[query] = JSON.parse(localStorage.getItem(query));
            return this.cache[query];
        }

        const result = await fetch(this.url + "/" + query);
        const resultParsed: IResponse[] = await result.json();

        const transformed = resultParsed.map(item => {
            return {
                id: item.show.id,
                title: item.show.name,
                description: item.show.summary,
                score: item.score
            }
        })

        this.cache[query] = transformed;

        localStorage.setItem(query, JSON.stringify(transformed));
        return transformed;
    }

}

