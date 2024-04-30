/***************************************************************************
 *             PROPERTY OF PINELLAS COUNTY EMERGENCY MANAGEMENT             *
 *            WRITTEN BY: KYLE J CONDREN - APPLICATION DEVELOPER            *
 ***************************************************************************/
/* <script type="text/javascript" boardresource="pcem-confetti.js"></script> */

// Need to add the following to the HTML: <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"/>

// Get all radio buttons with the confettiToss class
let confettiObjects = document.querySelectorAll(".confettiToss");
confettiObjects.forEach(function (element) {
  element.addEventListener("click", function () {
    confettiToss();
  });
});
// Get all table rows and add the confettiToss event listener
let confettiRows = document.querySelectorAll("tr");
confettiRows.forEach(function (row) {
  row.addEventListener("click", function () {
    confettiToss();
  });
});

// Function to generate a random angle value between 0-360 degrees (mainly for confetti toss/explosion)
function randomAngle() {
  let min = 0; // Minimum value of the X range
  let max = 360; // Maximum value of the X range
  let randAngle = Math.random() * (max - min) + min;
  let randSpread = Math.random() * (max - min) + min;
  console.log("angle: " + randAngle + "\n spread: " + randSpread);
  return [randAngle, randSpread];
}

// onClick function to create confetti toss/explosion
function confettiToss() {
  let [randSpread] = randomAngle();
  let xPos = parseFloat(
    (Math.round((window.clientX / window.innerWidth) * 1000) / 1000).toFixed(3)
  );
  let yPos = parseFloat(
    (Math.round((window.clientY / window.innerHeight) * 1000) / 1000).toFixed(3)
  );
  console.log("X: " + xPos + "; Y: " + yPos);
  confetti({
    spread: randSpread,
    particleCount: 100,
    origin: {
      x: xPos,
      y: yPos,
    },
    angle: 90,
    shapes: ["circle", , "circle", "square"],
  });
}
