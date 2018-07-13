// ============ VARS
	var shakeCount = 0;   // counter for shakes
	var shakeCountTarget = 29; // targeted amount of shakes (roughly x 10)
	var shakeAcc = 10; // which acceleration-value counts as a "shake"?
	var shakeDuration = 0.5; // duration of shaking-animation in seconds

	var rustlingAudio = new Audio('file:///android_asset/prototyp/games/iggy/assets/audio/rustling.mp3'); // Audiofile for tree-rustling-sound
	var dropAudio = new Audio('assets/audio/drop.mp3');	// Audiofile for apple-dropping-sound

// ============ DOCUMENT READY
$(document).ready(function(){
	
	deviceMotionHandler = function(evt){
			
		
		setTimeout(function(){

			// if notification with manual isn't visible anymore...
			if(!($(".notification-wrap").is(":visible"))){

				// ... check if acceleration was high enough to count as a shake
				if (evt.acceleration.x > shakeAcc || evt.acceleration.y > shakeAcc || evt.acceleration.z > shakeAcc) {
				  // jumpMax.x = evt.acceleration.x;
				  console.log("I AM SHOOKETH "+shakeCount+" "+evt.acceleration.x);
				  shakeCount = shakeCount+1;
				  shakeApple();

				  // WINNING
				  if(shakeCount == shakeCountTarget){
						gameWon();
				  }
				}
			}

			
			
		}, 500);

	}
	
	// falls DeviceMotion unterstützt ist:
	if (window.DeviceMotionEvent) {
	  console.log("Device motion is supported.");
	  window.addEventListener('devicemotion', deviceMotionHandler);
	}
	// falls nicht, reagier mal auf Klick
	else {
		console.log("Device motion not supported.");
		$("body").on("click",function(){
			shakeApple();
		});
	}

});


// ============== FUNCTIONS
/**
* Funktion bringt $(".apfel") zum Wackeln.
*/
function shakeApple(){

	rustlingAudio.play();

	$(".apfel").css("animation","shake "+shakeDuration+"s linear 0s 2 alternate");

	setTimeout(function() {
		$(".apfel").css("animation","none");
	}, shakeDuration*2000);
}


/**
* Funktion bringt $(".apfel") zum "Herunterfallen".
* Dazu wird das Original-Div ausgeblendet und ein anderes eingeblendet, dass
* in der HTML-Struktur besser zur Animation geeignet ist.
*/
function dropApple(){
	$(".apfel").hide();
	$(".apfel-falling").show();

	var appleHeight = $(".apfel").height();
	console.log("ApfelHöhe: "+appleHeight);
	var appleTop = "calc(100% - "+appleHeight+"px)";

	dropAudio.play();

	$(".apfel-falling").css({
		top: appleTop
	});
}


/**
* Function is called when game was won.
*/
function gameWon(){
	console.log("I WAS SHOOK AT LEAST 3 TIMES!");
	window.removeEventListener('devicemotion', deviceMotionHandler);
	dropApple();
	$(".end").delay(1000).show("fast");
}