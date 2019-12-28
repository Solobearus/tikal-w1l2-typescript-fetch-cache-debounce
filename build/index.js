var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ShowsAPI {
    constructor(url) {
        this.cache = {};
        this.debounceFlag = false;
        this.url = url;
    }
    fetchData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debounceFlag) {
                return null;
            }
            this.debounceFlag = true;
            setTimeout(() => {
                this.debounceFlag = false;
            }, 600);
            if (this.cache[query]) {
                console.log('got from ram');
                return this.cache[query];
            }
            if (localStorage.getItem(query)) {
                console.log('got from localstorage');
                this.cache[query] = JSON.parse(localStorage.getItem(query));
                return this.cache[query];
            }
            const result = yield fetch(this.url + "/" + query);
            const resultParsed = yield result.json();
            const transformed = resultParsed.map(item => {
                return {
                    id: item.show.id,
                    title: item.show.name,
                    description: item.show.summary,
                    score: item.score
                };
            });
            this.cache[query] = transformed;
            localStorage.setItem(query, JSON.stringify(transformed));
            return transformed;
        });
    }
}
