'use strict';

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




function slyder(current, next) {
    const animationEndEventName = whichAnimationEvent();
    let outClass = ['sly-moveToLeft'];
    let inClass = ['sly-moveFromRight'];

    const slyderAnimation = async (current, next) => {
        function addClasses(current, next) {
            next.classList.add(...outClass, 'sly-page--current');
            current.classList.add(...inClass);
        }

        const addNextListener = (next) => {
            next.addEventListener(animationEndEventName, () => {
                next.removeEventListener(animationEndEventName);
                next.classList.remove(...outClass);
            });
        }

        const addCurrentListener = (current) => {
            current.addEventListener(animationEndEventName, () => {
                current.removeEventListener(animationEndEventName);
                current.remove();
            });
        }
        
        await addClasses(current, next);
        
        return Promise.all([
            addNextListener(next),
            addCurrentListener(current)
        ]);
    }
    slyderAnimation(current, next);
}



// detect the correct transition event
function whichAnimationEvent() {
    const el = document.createElement("div");

    const animations = {
        "animation": "animationend",
        "OAnimation": "oAnimationEnd",
        "MozAnimation": "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    }

    Object.keys(animations).forEach((key) => {
        if (el.style[key] !== undefined) {
            return animations[key];
        }
    })
}

// replace the content of the of the element with id arg
function replaceContent(id) {
    // check for <template> support
    if ('content' in document.createElement('template')) {
        // current page before navigating
        const $currentPage = document.querySelector('.sly-page');

        // $content is the element who's content you would like to replace
        const $content = document.getElementById('main-content');

        // select the template used to replace $content
        const template = document.getElementById(id);

        // clone it, clear the $content, insert your cloned template to $content
        const clone = document.importNode(template.content, true);
        // $content.innerHTML = '';
        $content.appendChild(clone);
        const $nextPage = document.querySelector('.sly-page--next');

        slyder($currentPage, $nextPage);
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