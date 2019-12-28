import { ShowsAPI } from './index.js';
const api = new ShowsAPI("https://api.tvmaze.com/search/shows?q=");
api.fetchData('lost')
    .then(e => {
    console.log(e);
});
setTimeout(() => {
    api.fetchData('lost')
        .then(e => {
        console.log(e);
    });
}, 500);
setTimeout(() => {
    api.fetchData('walking')
        .then(console.log);
}, 1000);
