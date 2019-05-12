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

// override style variables
// s is an object with 4 keys: 
// headerShadow: box-shadow, background: background-image, title:color, content:color
function setColorVars(s) {
    let root = document.documentElement;

    Object.keys(s).forEach(function(key) {
        // prevent from setting var to an empty string
        if (s[key] === '' || s[key] === null || s[key] === undefined) {
            return;
        }

        console.log(key, i, arr);

        switch (key) {
            case 'headerShadow':
                root.style.setProperty('--header-shadow', s[key]);
                console.log(s[key]);
            case 'background':
                root.style.setProperty('--background-image', s[key]);
                console.log(s[key]);
            case 'titleColor':
                root.style.setProperty('--title-color', s[key]);
                console.log(s[key]);
            case 'contentColor':
                root.style.setProperty('--content-color', s[key]);
                console.log(s[key]);
        }
    });
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
        description: 'A simple page transition component for single page applications.',
        headerShadow: 'rgba(89, 146, 120, 0.8)',
        background: '#7DF5BE',
        titleColor: '#8934b4',
        contentColor: '#00572F'
    };
    setMetadata(metadata);
    replaceContent('index');
    setColorVars(metadata);
}

function usage() {
    const metadata = {
        title: 'Slyder | Usage',
        description: 'How to use Slyder page transitions for single page applications. When to use Slyder.',
        headerShadow: '',
        background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
        titleColor: '',
        contentColor:'#fff'
    }
    setMetadata(metadata);
    replaceContent('usage');
}

function docs() {
    const metadata = {
        title: 'Slyder | Documentation',
        description: 'Learn about Slyder page transitions for single page applicaitons. Use Slyder for a superior UX.',
        headerShadow: '0 0 3px 3px rgba(176, 134, 104, 0.8)',
        background: 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)',
        titleColor: '#9e5428',
        contentColor: 'rgb(135, 61, 0)'
    }
    setMetadata(metadata);
    replaceContent('docs');
}

function example() {
    const metadata = {
        title: 'Slyder | Examples',
        description: 'A walk through of Slyder page transitions being used. Look at the code.',
        headerShadow: '0 0 3px 3px rgba(99,201,187,0.8)',
        background: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
        titleColor: '#8019b5',
        contentColor:'#9f40e0'
    }
    setMetadata(metadata);
    replaceContent('example');
}

function notfound() {
    const metadata = {
        title: 'Slyder | 404 Page Not Found',
        description: 'Slyder page transitions for single page applications 404 page.',
        headerShadow: '',
        background: '',
        titleColor: '',
        contentColor:''
    }
    setMetadata(metadata);
    replaceContent('notfound');
}

//   function contact(ctx) {
//     document.querySelector('p')
//       .textContent = 'viewing contact ' + (ctx.params.contactName || '');
//   }