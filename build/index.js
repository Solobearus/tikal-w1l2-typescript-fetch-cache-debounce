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
    constructor(url, debounceTime = 600) {
        this.url = url;
        this.debounceTime = debounceTime;
        this.cache = {};
        this.debounceFlag = false;
        this.url = url;
    }
    fetchData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debounceFlag) {
                return null;
            }
            this.startDebounce();
            this.cache[query] = this.getRamCache(query)
                || this.getLocalStorageCache(query)
                || (yield this.getData(query));
            localStorage.setItem(query, JSON.stringify(this.cache[query]));
            return this.cache[query];
        });
    }
    getData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield fetch(this.url + "/" + query);
                const resultParsed = yield result.json();
                return resultParsed.map(item => ({
                    id: item.show.id,
                    title: item.show.name,
                    description: item.show.summary,
                    score: item.score
                }));
            }
            catch (e) {
                return null;
            }
        });
    }
    getLocalStorageCache(query) {
        if (!localStorage.getItem(query)) {
            return null;
        }
        try {
            this.cache[query] = JSON.parse(localStorage.getItem(query));
            console.log('got from localstorage');
            return this.cache[query];
        }
        catch (e) {
            return null;
        }
    }
    getRamCache(query) {
        if (this.cache[query]) {
            console.log('got from ram');
            return this.cache[query];
        }
        return null;
    }
    startDebounce() {
        this.debounceFlag = true;
        setTimeout(() => {
            this.debounceFlag = false;
        }, this.debounceTime);
    }
}
