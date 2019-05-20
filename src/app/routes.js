'use strict';
import 'page';
import {
    Slyder
} from "./slyder";

const slyder = new Slyder('move', 'horizontal');
const  header = document.getElementsByTagName('header')[0];
slyder.addLinkIndexes(header, 'a');
let firstLoad = true;

function route(
    slyder,
    data = {
        path: '',
        id: 'index',
        type: 'page',
        title: '',
        description: ''
    }
) {
    slyder.compareIndexes(data.path);
    

    // Set the metadata for the new page
    // meta is an object with title and description properties
    function setMetadata(meta) {
        let title = document.getElementsByTagName('title')[0],
            description = document.querySelector('meta[name="description"]');

        title.setAttribute('title', meta.title);
        description.setAttribute('content', meta.description);
    }

    function transition(cb) {
        let contentReplaced = slyder.replaceContent(data.id);
        if (contentReplaced) {
            cb();
        }
    }
    setMetadata(data);
    transition(() => slyder.animate('.sly-page', '.sly-page--next'));

    firstLoad = false;
}


const indexData = {
    path: '/',
    id: 'index',
    type: 'page',
    title: 'Slyder | Modern Page Transitions',
    description: 'A simple page transition component for single page applications.'
}

function index(ctx, next) {
    let h = window.location.hash.slice(2);
    if(h == "") {h = "/";}
    if (h === indexData.path) {
        if (firstLoad) {}
        else {return;}
    }
    route(slyder, indexData)
}

const usageData = {
    path: '/usage',
    id: 'usage',
    type: 'page',
    title: 'Slyder | Usage',
    description: 'How to use Slyder page transitions for single page applications. When to use Slyder.'
}

function usage(ctx, next) {
    route(slyder, usageData)
}


const docsData = {
    path: '/docs',
    id: 'docs',
    type: 'page',
    title: 'Slyder | Documentation',
    description: 'Learn about Slyder page transitions for single page applicaitons. Use Slyder for a superior UX.'
}

function docs(ctx, next) {
    route(slyder, docsData)
}

const exampleData = {
    path: '/example',
    id: 'example',
    type: 'page',
    title: 'Slyder | Examples',
    description: 'A walk through of Slyder page transitions being used. Look at the code.'
}

function example(ctx, next) {
    route(slyder, exampleData)
}

const notfoundData = {
    path: '*',
    id: 'notfound',
    type: 'page',
    title: 'Slyder | 404 Page Not Found',
    description: 'Slyder page transitions for single page applications 404 page.'
}

function notfound(ctx, next) {
    route(slyder, notfoundData)
}


// match page base with github pages subdomain
// page.base('/slyder');
page('/', index);
page('/usage', usage);
page('/docs', docs);
page('/docs/:page', docs);
page('/example', example);
page('*', notfound);
page({
    hashbang: true
});