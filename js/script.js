/**
 * TODO
 *
 * Quand on veut changer la valeur de l'input pendant que le chrono roule, le focus se barre
 *
 */
(function () {
	"use strict";
	/******************
	 * Global variables
	 ******************/
	/** DOM */
	var htmlGo = document.getElementById("btn_compute")
	var htmlStop = document.getElementById("btn_end");
	var htmlPauseResume = document.getElementById("btn_pauseResume");

	var htmlProgress = document.getElementById("progress");
	var htmlTime = document.getElementById("currentTime");
	var htmlRounds = document.getElementById("rounds");
	var htmlAbout = document.getElementById("about");

	/** Computing values*/
	var isPaused = false;
	var currentTime = 0;
	var occurences = 0;
	/** user values*/
	var time = document.getElementById("inp_time").value;
	/** Parallel tasks */
	var job;

	/**********
	 * Functions
	 **********/
	function beep() {
		var snd = new Audio("sounds/r2.wav");
		snd.play();
	}

	function stop(isPopupDisplayed) {
		if (isPopupDisplayed) {
			alert("Great job ! You have achieved " + occurences + " rounds of " + time + " seconds each !");
		}
		clearInterval(job);
		job = undefined;
	}

	function counter() {
		document.activeElement.blur();
		currentTime++;
		htmlTime.innerHTML = currentTime;
		htmlProgress.value = currentTime;
		// If we get to the user time
		if (currentTime == time) {
			// Restart the counter for a new round
			currentTime = 0;
			// Play sound
			beep();
			// Increment the round
			htmlRounds.innerHTML = ++occurences;
		}
	}

	function writeResume() {
		htmlPauseResume.innerHTML = "Resume";
	}

	function pause() {
		isPaused = true;
		writeResume();
		stop(false);

	}

	function writePause() {
		htmlPauseResume.innerHTML = "Pause";
	}

	function resume() {
		isPaused = false;
		writePause();
		initChrono(false);
	}

	function initChrono(isNew) {
		if (isNew === true) {
			currentTime = 0;
			occurences = 0;
			htmlTime.innerHTML = 0;
			htmlRounds.innerHTML = 0;
			htmlProgress.value = 0;
		}
		time = document.getElementById("inp_time").value;

		if (time > 0) {
			htmlProgress.max = time;
			// If a job already exists
			if (job !== undefined) {
				// Interruption
				stop(false);
			}
			job = setInterval(counter, 1000);
		} else {
			alert("You must choose a value greater than 0 !");
		}
	}

	/***********
	 * Listeners
	 ***********/
	htmlGo.addEventListener("click",
		function () {
			isPaused = false;
			writePause();
			initChrono(true);
		}, false);
	htmlStop.addEventListener("click",
		function () {
			stop(true);
		}, false);

	htmlPauseResume.addEventListener("click",
		function () {
			if (isPaused == true) {
				resume();
			} else {
				pause()
			}
		}, false);
	
	htmlAbout.addEventListener("click",
	    function() {
			
		}, false);
})();