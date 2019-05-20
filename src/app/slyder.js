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


// var store = (function Store() {
//     function get(key) {
//         JSON.parse(localStorage.getItem(key));
//     }

//     function set(key, value) {
//         localStorage.setItem(key, value);
//     }
//     return {
//         get,
//         set
//     };
// })();




export function Slyder() {
    // const current = document.querySelector('.sly-page');
    // const next = document.querySelector('.sly-page--next');
    let isAnimating = false;
    const animationEndEventName = whichAnimationEvent();
    let outClass = ['sly-moveToLeft'];
    let inClass = ['sly-moveFromRight'];
    let paths = [];

    async function animation(currentPage, nextPage) {
        const current = document.querySelector(currentPage);
        const next = document.querySelector(nextPage);

        const updateClasses = (current, next) => {
            next.classList.remove('sly-page--next');
            next.classList.add(...inClass, 'sly-page--current');
            current.classList.remove('sly-page--current');
            current.classList.add(...outClass);
        }

        // Functions to handle animationEndEvent

        const handleNextAnimationEnd = () => {
            next.classList.remove(...inClass);
            next.removeEventListener(animationEndEventName, handleNextAnimationEnd);
        }

        const handleCurrentAnimationEnd = () => {
            current.removeEventListener(animationEndEventName, handleCurrentAnimationEnd);
            current.remove();
            isAnimating = false;
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
        ]).then(updateClasses(current, next));
    }

    function addLinkIndexes(container, linkSelector = 'a') {
        if (!container instanceof HTMLElement) return console.error('container argument passed to Slyder.addLinkIndexes must be of type HTMLElement');
        let linkTags = container.querySelectorAll(linkSelector);
        let links = Array.prototype.slice.call(linkTags);

        // function handleClick() {
        //     event.target.dataset[slyIdx]
        // }

        
        for (let i = 0; i < links.length; i++) {
            links[i].dataset.slyIdx = i;
            // links[i].addEventListener('click', handleClick);
            // only add indexes to links within this website
            if (links[i]['hostname'] === window.location.hostname) {
                paths.push(links[i]['pathname']);
            }
        }

        console.log(paths)

    }

    function compareIndexes(nextPath = '') {
        try {
            let currentIdx = paths.findIndex((element) => {
                return element == window.location.hash.slice(2);
            });
            if (currentIdx === -1 || currentIdx == undefined) {currentIdx = 0}
            console.log('curr: ' + currentIdx);
            let nextIdx = paths.findIndex((element) => {
                return element == nextPath;
            });
            console.log('next: ' + nextIdx);
            // slyder.setAnimation();
        }
        catch (error) {console.error(error)}
    }

    // replace the content of the of the element with id arg
    function replaceContent(id) {
        if (isAnimating) {
            return false;
        }
        isAnimating = true;

        try {
            const template = document.getElementById(id);
        } catch (error) {
             console.error(error);
             
        }

        // check for <template> support
        if ('content' in document.createElement('template')) {
            // $content is the element who's content you would like to append to
            const $content = document.getElementById('sly-container');

            // select the template used to replace $content
            const template = document.getElementById(id);

            // clone it, clear the $content, insert your cloned template to $content
            const clone = document.importNode(template.content, true);
            // $content.innerHTML = '';
            $content.appendChild(clone);

            return true;

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

        // returns the first key that matches an animation property
        // of the HMTLElement for users browser
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

    const _isAnimating = () => isAnimating;
    const _paths = () => paths;

    // Public Api for Slyder instances
    return {
        animate: animation,
        addLinkIndexes,
        replaceContent,
        isAnimating: _isAnimating,
        paths: _paths,
        compareIndexes
    }
};