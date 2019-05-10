(()=> {
  page('/', index);
  page('/usage', usage);
  page('/docs', docs);
  page('/example', example);
  page('*', notfound);


  function replaceContent(id) {
    $content = document.getElementById('main-content');
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
})();