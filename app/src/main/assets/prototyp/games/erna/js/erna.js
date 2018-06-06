// ======= VARS

var ducklings = ["#karl", "#karl-heinz", "#karlotta"]; //selectors for duckling-elements
var hideout_base_selector = "#hideout-"; //baseselector for hideouts, will be completed with ints (hideout_number)
var hideout_number = 7; // number of hideouts. Is automatically counted once document is readey.
var duckling_counter = 0; //number of ducklings that have already been discovered
var help_timer = 5000; //amount of miliseconds after which ducklings should hint at where they are
var help_counter = 0;  //counter for helper

// ========= ON DOCUMENT READY
$(document).ready(function(){

	hideout_number = $(".hideout-wrap").length; //counting hideouts
	hideDucklings();


	//----- CLICKS ON HIDEOUTS
	$(".hideout-wrap").click(function(){	

		// if there's a duckling, remove it and ++ the counter
		if($(this).hasClass("hasDuckling")){

			duckling_counter++;
			$(this).removeClass("hasDuckling");
			$(this).find(".kueken").css("z-index", "10").delay(1500).hide("slow");

			animateDuckling($(this).find(".kueken"));

			//show found duckling in statusbar
			var duckling_id = $(this).find(".kueken").attr("id");
			$(".status-bar ."+duckling_id).removeClass("missing").addClass("found");

		}

		// if all ducklings have been found, YAY!
		if(duckling_counter == ducklings.length){
			$(".notification-wrap").delay(1200).show("fast");
		}
	});

	// ---- ANIMATE DUCKLINGS TO GIVE HINTS
	setInterval(function(){
		animateDuckling($(ducklings[help_counter]));
		help_counter ++;
		if(help_counter >= ducklings.length){
			help_counter = 0;
		}
	}, help_timer);



});


// ====== FUNCTIONS
/**
* Functions puts the duckling-divs (.kueken / var ducklings) into random hiding places 
* (.hideout / var hideout_base_selector + var hideout_number).
*/
function hideDucklings(){

	// remove hasDuckling-class from all old divs
	$(".hideout-wrap").removeClass("hasDuckling");

	// generate a random hideout for each duckling and put it into an array
	var hideout_ids = [];
	for(i=0; i<ducklings.length; i++){

		var hideout = Math.floor(Math.random() * (hideout_number))+1;

		// make sure no hideout is added twice
		while(hideout_ids.includes(hideout)){
			console.log("Hideout "+hideout+" was already in hideout_ids. Trying again.");
			hideout = Math.floor(Math.random() * (hideout_number))+1;
		}

		hideout_ids.push(hideout);
	}
	console.log("Generated random hideouts: "+hideout_ids.toString());


	// move the kueken-divs into their random hideouts, give hideouts extra class
	for(i=0; i<ducklings.length; i++){

		console.log("Hiding duckling: "+ducklings[i]+" "+$(hideout_base_selector+hideout_ids[i]).attr("notfor"));
		if($(hideout_base_selector+hideout_ids[i]).attr("notfor") != ducklings[i]){
			$(ducklings[i]).insertBefore(hideout_base_selector+hideout_ids[i]+" .hideout-front");
			$(hideout_base_selector+hideout_ids[i]).addClass("hasDuckling");
		}else{
			console.log("Combination of ducklings and hideouts didn't work. Retrying.");
			hideDucklings();
		}
		
	}

}

/**
* Function initiates an Animation based on any element that can be selected with ducklingselector.
* Stops the animation that ran before.
* @param ducklingEl DOM-element with a spritesheet attached as its background-image. Default is $(".kueken").
* @param iterations int; how often should the animation play? Default is 3. Put "infinite" for loop.
* @param sprite_row int; which row of the spritesheet is to be used? Default is 1.
*/
function animateDuckling(ducklingEl=$(".kueken"), iterations = 3, sprite_row=1){

	// try to get correct amount of frames from HTML
	if(ducklingEl.attr("frames")){
		var frame_number_arr = ducklingEl.attr("frames").split(","); //turn the "frames" attr into an array
		var frame_number = frame_number_arr[sprite_row]; //get the number of frames in the spriterow
	}else{
		var frame_number = 7; //fallback if not specified in HTML
	}
	
	// stop previous animations
	Animation.stopAnimation();

	// setup + play animation from start
	Animation.frame_number = frame_number;
	Animation.frame_width = ducklingEl.width();
	Animation.frame_height = ducklingEl.height();
	Animation.sprite_row = sprite_row;
	Animation.iterations = iterations;
	Animation.animation_selector = "#"+ ducklingEl.attr("id");
	Animation.buildKeyframes();
	Animation.startAnimation(); 
}