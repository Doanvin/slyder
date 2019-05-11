// match page base with github pages subdomain
page.base('/slyder');
page('/', index);
page('/usage', usage);
page('/docs', docs);
// page('/docs/:page', docs);
page('/example', example);
page('*', notfound);
page({
    hashbang:true,
    dipatch:false
});


function replaceContent(id) {
    if ('content' in document.createElement('template')){

        // $content is the element who's content you would like to replace
        let $content = document.getElementById('main-content');

        // access the link import
        const link = document.querySelector('link[rel=import]').import;

        // select the template from inside the imported html
        const template = link.getElementById(id);

        // clone it, clear the $content, insert your cloned template to $content
        const clone = document.importNode(template.content, true);
        $content.innerHTML = '';
        $content.appendChild(clone);
    } else {
        alert('HTML template tags are not supported by your browser. Please upgrade to the latest version of Firefox or Chrome.')
    }
}

function index() {
    replaceContent('index');
}

function usage() {
    replaceContent('usage');
}

function docs() {
    replaceContent('docs');
}

function example() {
    replaceContent('example');
}

function notfound() {
    replaceContent('notfound');
}

//   function contact(ctx) {
//     document.querySelector('p')
//       .textContent = 'viewing contact ' + (ctx.params.contactName || '');
//   }