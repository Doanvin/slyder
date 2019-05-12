function handleRouteChange() {
    setMetadata();
    
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

