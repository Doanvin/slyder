// match page base with github pages subdomain
page.base('/slyder');
page('/', index);
page('/usage', usage);
page('/docs', docs);
// page('/docs/:page', docs);
page('/example', example);
page('*', notfound);
page({
    hashbang:true
});

// Set the metadata for the new page
// meta is an object with title and description keys
function setMetadata(meta) {
    let title = document.getElementsByTagName('title')[0],
        description = document.querySelector('meta[description]');

    title.setAttribute('title', meta.title);
    description.setAttribute('description', meta.description);
}

// replace the content of the of the element with id arg
function replaceContent(id) {
    if ('content' in document.createElement('template')){

        // $content is the element who's content you would like to replace
        let $content = document.getElementById('main-content');

        // seleclt the template used to replace $content
        const template = document.getElementById(id);

        // clone it, clear the $content, insert your cloned template to $content
        const clone = document.importNode(template.content, true);
        $content.innerHTML = '';
        $content.appendChild(clone);
    } else {
        alert('HTML template tags are not supported by your browser. Please upgrade to the latest version of Firefox or Chrome.')
    }
}

function index() {
    const metadata = {
        title: 'Slyder | Modern Page Transitions',
        description: 'A simple page transition component for single page applications.'
    }
    setMetadata(metadata);
    replaceContent('index');
}

function usage() {
    const metadata = {
        title: 'Slyder | Usage',
        description: 'How to use Slyder page transitions for single page applications. When to use Slyder.'
    }
    setMetadata(metadata);
    replaceContent('usage');
}

function docs() {
    const metadata = {
        title: 'Slyder | Documentation',
        description: 'Learn about Slyder page transitions for single page applicaitons. Use Slyder for a superior UX.'
    }
    setMetadata(metadata);
    replaceContent('docs');
}

function example() {
    const metadata = {
        title: 'Slyder | Examples',
        description: 'A walk through of Slyder page transitions being used. Look at the code.'
    }
    setMetadata(metadata);
    replaceContent('example');
}

function notfound() {
    const metadata = {
        title: 'Slyder | 404 Page Not Found',
        description: 'Slyder page transitions for single page applications 404 page.'
    }
    setMetadata(metadata);
    replaceContent('notfound');
}

//   function contact(ctx) {
//     document.querySelector('p')
//       .textContent = 'viewing contact ' + (ctx.params.contactName || '');
//   }