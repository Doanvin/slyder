'use strict';

// Set the metadata for the new page
// meta is an object with title and description properties
function setMetadata(meta) {
    let title = document.getElementsByTagName('title')[0],
        description = document.querySelector('meta[description]');

    title.setAttribute('title', meta.title);
    description.setAttribute('description', meta.description);
}

// function Slyder(current, next, options = {
//     animate: 'moveToLeft'
// }) {
//     this.sly = options;
//     this.current = current;
//     this.next = next;
//     this.animationEndEvent = whichAnimationEvent();
//     this.currentAnimationEnded = false;
//     this.nextAnimationEnded = false;
//     this.isAnimating = true;
//     var outClass = '',
//         inClass = '';

//     if (!this.sly) {
//         console.error('You need to setup a variable named "sly" on the window.\nvar sly = {animate: "moveToLeft"};  or \nwindow.sly = {animate: "moveToLeft"};');
//     }

//     switch (this.sly.animate) {
//         case 'moveToLeft':
//             outClass = 'sly-moveToLeft sly-page--current';
//             inClass = 'sly-moveFromRight';
//             break;
//         case 'moveToRight':
//             outClass = 'sly-moveToRight sly-page--current';
//             inClass = 'sly-moveFromLeft';
//             break;
//         case 'moveToTop':
//             outClass = 'sly-moveToTop sly-page--current';
//             inClass = 'sly-moveFromBottom';
//             break;
//         case 'moveToBottom':
//             outClass = 'sly-moveToBottom sly-page--current';
//             inClass = 'sly-moveFromTop';
//             break;
//         case 'fadeInLeft':
//             outClass = 'sly-fade sly-page--current';
//             inClass = 'sly-moveFromRight sly-ontop';
//             break;
//         case 'faseInRight':
//             outClass = 'sly-fade sly-page--current';
//             inClass = 'sly-moveFromLeft sly-ontop';
//             break;
//         case 'fadeInTop':
//             outClass = 'sly-fade sly-page--current';
//             inClass = 'sly-moveFromBottom sly-ontop';
//             break;
//         case 'fadeInBottom':
//             outClass = 'sly-fade sly-page--current';
//             inClass = 'sly-moveFromTop sly-ontop';
//             break;
//         case 'moveToLeftFade':
//             outClass = 'sly-moveToLeftFade sly-page--current';
//             inClass = 'sly-moveFromRightFade';
//             break;
//         case 'moveToRightFade':
//             outClass = 'sly-moveToRightFade sly-page--current';
//             inClass = 'sly-moveFromLeftFade';
//             break;
//         case 'moveToTopFade':
//             outClass = 'sly-moveToTopFade sly-page--current';
//             inClass = 'sly-moveFromBottomFade';
//             break;
//         case 'moveToBottomFade':
//             outClass = 'sly-moveToBottomFade sly-page--current';
//             inClass = 'sly-moveFromTopFade';
//             break;
//     }

//     this.current.classList = outClass;
//     this.next.classList = inClass;
//     this.current.addEventListener(this.animationEndEvent, () => {
//         this.current.removeEventListener(this.animationEndEvent);
//         this.currentAnimationEnded = true;
//         if (this.nextAnimationEnded === true) this.handleEndAnimation.bind(this);
//     });
//     this.next.addEventListener(this.animataionEndEvent, () => {
//         this.next.removeEventListener(this.animataionEndEvent);
//         this.nextAnimationEnded = true;
//         if (this.currentAnimationEnded === true) this.handleEndAnimation.bind(this);

//     });

// }

// Slyder.prototype.handleEndAnimation = function () {
//     this.currentAnimationEnded = false;
//     this.nextAnimationEnded = false;
//     this.next.classList = 'sly-page';
//     this.current.remove();
// }

var store = (function Store() {
    function getKey(key) {
        JSON.parse(localStorage.getItem(key));
    }
    function setKey(key, value) {
        localStorage.setItem(key, value);
    }
    return {
        getKey,
        setKey
    };
})();




var slyder = (function Slyder() {
    // const current = document.querySelector('.sly-page');
    // const next = document.querySelector('.sly-page--next');
    let isAnimating = false;
    const animationEndEventName = whichAnimationEvent();
    let outClass = ['sly-moveToLeft'];
    let inClass = ['sly-moveFromRight'];

    async function animation(currentPage, nextPage) {
        const current = document.querySelector(currentPage);
        const next = document.querySelector(nextPage);

        const updateClasses = (current, next, cb) => {
            next.classList.remove('sly-page--next');
            next.classList.add(...inClass, 'sly-page--current');
            current.classList.remove('sly-page--current');
            current.classList.add(...outClass);
            cb();
        }

        // Functions to handle animationEndEvent

        function handleNextAnimationEnd() {
            next.classList.remove(...inClass);
            next.removeEventListener(animationEndEventName, handleNextAnimationEnd);
        }

        function handleCurrentAnimationEnd() {
            current.removeEventListener(animationEndEventName, handleCurrentAnimationEnd);
            current.remove();
        }

        // Functions to add animationend event listeners
        const addNextListener = async (next) => {
            next.addEventListener(animationEndEventName, handleNextAnimationEnd);
        }

        const addCurrentListener = async (current) => {
            current.addEventListener(animationEndEventName, handleCurrentAnimationEnd);
        }

        // Add animation end listeners in parallel, then update animation classes
        await Promise.all([
            await addNextListener(next),
            await addCurrentListener(current)
        ]).then(updateClasses(current, next, () => isAnimating = false));
    }

    function addLinkListeners(options = {
        containerSelector: 'header',
        linkSelector: 'a'
    }) {
        let header = document.querySelector(options.containerSelector);
        let linkTags = header.querySelectorAll(options.linkSelector);
        let links = Array.prototype.slice.call(linkTags);
        links.forEach((link, i) => {
            let listenerObj = {
                idx: i,
                handleEvent: event => {
                    event.target.dataset['slyIdx'] = this.idx;
                }
            }
            link.addEventListener('click', listenerObj, listenerObj);
        });
    }

    // replace the content of the of the element with id arg
    function replaceContent(id) {
        if (isAnimating) {
            return;
        }
        isAnimating = true;

        // check for <template> support
        if ('content' in document.createElement('template')) {
            // $content is the element who's content you would like to append to
            const $content = document.getElementById('main-container');

            // select the template used to replace $content
            const template = document.getElementById(id);

            // clone it, clear the $content, insert your cloned template to $content
            const clone = document.importNode(template.content, true);
            // $content.innerHTML = '';
            $content.appendChild(clone);

        } else {
            alert('HTML template tags are not supported by your browser. Please upgrade to the latest version of Firefox or Chrome.')
        }
    }

    // detect the correct transition event
    function whichAnimationEvent() {
        const el = document.createElement("div");

        const animations = {
            "onanimationend": "animationend",
            "onoanimationend": "oanimationend",
            "onmozanimationend": "animationend",
            "onwebkitanimationend": "webkitanimationend"
        }

        const animationKeys = Object.keys(animations);

        function getKey(myKeys) {
            let keys = [];
            myKeys.forEach((key) => {
                if (el[key] !== undefined) {
                    keys.push(animations[key]);
                }
            });
            return keys[0];
        }

        return getKey(animationKeys);

    }

    // Public Api for Slyder instances
    return {
        animate: animation,
        addLinkListeners,
        replaceContent
    }
})();






// function index() {
//     const metadata = {
//         title: 'Slyder | Modern Page Transitions',
//         description: 'A simple page transition component for single page applications.'
//     }
//     setMetadata(metadata);
//     replaceContent('index');
//     slyder.animate({
//         current: 'page-index'
//     })
// }



function route(data = {
        id: 'index',
        type: 'page',
        title: '',
        description: ''
    }) {
    const selector = getSelector(data.type, data.id);

    function getSelector(type, id) {
        return `.${type}-${id}`;
    }

    setMetadata(data);
    function transition(cb) {
        slyder.replaceContent(data.id);
        cb();
    }
    
    transition(() => slyder.animate('.sly-page', selector));
}


const indexData = {
    id: 'index',
    type: 'page',
    title: 'Slyder | Modern Page Transitions',
    description: 'A simple page transition component for single page applications.'
}
function index () {route(indexData)}

const usageData = {
    id: 'usage',
    type: 'page',
    title: 'Slyder | Usage',
    description: 'How to use Slyder page transitions for single page applications. When to use Slyder.'
}
function usage () {route(usageData)}


const docsData = {
    id: 'docs',
    type: 'page',
    title: 'Slyder | Documentation',
    description: 'Learn about Slyder page transitions for single page applicaitons. Use Slyder for a superior UX.'
}
function docs() {route(docsData)}

const exampleData = {
    id: 'example',
    type: 'page',
    title: 'Slyder | Examples',
    description: 'A walk through of Slyder page transitions being used. Look at the code.'
}
function example() {route(exampleData)}

const notfoundData = {
    id: 'notfound',
    type: 'page',
    title: 'Slyder | 404 Page Not Found',
    description: 'Slyder page transitions for single page applications 404 page.'
}
function notfound(){route(notfoundData)}


// match page base with github pages subdomain
page.base('/slyder');
page('/', index);
page('/usage', usage);
page('/docs', docs);
// page('/docs/:page', docs);
page('/example', example);
page('*', notfound);
page({
    hashbang: true
});



// function usage() {
//     const metadata = {
//         title: 'Slyder | Usage',
//         description: 'How to use Slyder page transitions for single page applications. When to use Slyder.'
//     }
//     setMetadata(metadata);
//     slyder.replaceContent('usage');
//     slyder.animate('.sly-page', '.sly-page--next');
// }

// function docs() {
//     const metadata = {
//         title: 'Slyder | Documentation',
//         description: 'Learn about Slyder page transitions for single page applicaitons. Use Slyder for a superior UX.'
//     }
//     setMetadata(metadata);
//     slyder.replaceContent('docs');
//     slyder.animate('.sly-page', '.sly-page--next');
// }

// function example() {
//     const metadata = {
//         title: 'Slyder | Examples',
//         description: 'A walk through of Slyder page transitions being used. Look at the code.'
//     }
//     setMetadata(metadata);
//     slyder.replaceContent('example');
//     slyder.animate('.sly-page', '.sly-page--next');
// }

// function notfound() {
//     const metadata = {
//         title: 'Slyder | 404 Page Not Found',
//         description: 'Slyder page transitions for single page applications 404 page.'
//     }
//     setMetadata(metadata);
//     slyder.replaceContent('notfound');
//     slyder.animate('.sly-page', '.sly-page--next');
// }

//   function contact(ctx) {
//     document.querySelector('p')
//       .textContent = 'viewing contact ' + (ctx.params.contactName || '');
//   }