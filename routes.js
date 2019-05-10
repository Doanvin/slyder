const router = () => {
  page('/', index);
  page('/Usage', usage);
  page('/Docs', docs);
  page('/Example', example);
  page('*', notfound);


  function replaceContent(id) {
    let $content = document.getElementById('main-content');
    const template = document.getElementById(id);
    const clone = document.importNode(template.content, true);
    $content.innerHTML = '';
    $content.appendChild(clone);
  }

  function index() {
    replaceContent('home');
  }

  function usage() {
  replaceContent('Usage');
  console.log('I made it though usage')
  }

  function docs() {
    replaceContent('Docs');
  }

  function example() {
    replaceContent('Example');
  }

  function notfound() {
    replaceContent('NotFound');
  }
};