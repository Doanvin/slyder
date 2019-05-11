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
        let $content = document.getElementById('main-content');
        const template = document.getElementById(id);
        const clone = document.importNode(template.content, true);
        $content.innerHTML = '';
        $content.appendChild(clone);
    } else {
        alert('HTML template tags are not supported by your browser. Please upgrade to Firefox or Chrome.')
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