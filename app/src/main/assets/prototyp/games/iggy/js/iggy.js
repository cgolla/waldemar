$(document).ready(function(){

	var shakeCount = 0;
	var shakeHeight = 10;

		
	deviceMotionHandler = function(evt){
			
		// console.log("HELLO "+evt.acceleration.x);
		setTimeout(function(){
			if (evt.acceleration.x > shakeHeight) {
			  // jumpMax.x = evt.acceleration.x;
			  console.log("I AM SHOOKETH "+shakeCount+" "+evt.acceleration.x);
			  shakeCount = shakeCount+1;

			  if(shakeCount == 29){
					console.log("I WAS SHOOK AT LEAST 3 TIMES!");
					window.removeEventListener('devicemotion', deviceMotionHandler);
			  }
			}
			
		}, 500);

	}
	
	if (window.DeviceMotionEvent) {
	  // window.addEventListener('devicemotion', deviceMotionHandler);
	  window.addEventListener('devicemotion', deviceMotionHandler);

	  //setTimeout(stopJump, 3*1000);
	  
	}

});
