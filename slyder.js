// detect the correct transition event
function whichAnimationEvent(){
  const t,
      el = document.createElement("fakeelement");

  const animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

const button = document.querySelector(".button"),
    transitionEvent = whichTransitionEvent();

button.addEventListener("click", function() {
  if (button.classList) {
    button.classList.add("animate");
  } else {
    button.className += " " + "animate";
  }

  button.addEventListener(transitionEvent, customFunction);
});

function customFunction(event) {
  button.removeEventListener(transitionEvent, customFunction);

  // Do something when the transition ends
}

