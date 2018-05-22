// ======= VARS

var ducklings = ["#karl", "#karl-heinz", "#karlotta"]; //selectors for duckling-elements
var hideout_base_selector = "#hideout-"; //baseselector for hideouts, will be completed with numbers
var hideout_number = 7; // number of hideouts. Is automatically counted once document is readey.
var duckling_counter = 0; //number of ducklings that have already been discovered


// ========= DINGE TUN
$(document).ready(function(){

	hideout_number = $(".hideout-wrap").length; //counting hideouts
	hideDucklings();


	//handle click on hideouts 
	$(".hideout-wrap").click(function(){

		// if there's a duckling, remove it and ++ the counter
		if($(this).hasClass("hasDuckling")){
			duckling_counter++;
			$(this).removeClass("hasDuckling");
			$(this).find(".kueken").hide("slow");
		}

		// if all ducklings have been found, YAY!
		if(duckling_counter == ducklings.length){
			alert("Gewonnen!");
		}
	});

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
		$(ducklings[i]).insertBefore(hideout_base_selector+hideout_ids[i]+" .hideout-front");
		$(hideout_base_selector+hideout_ids[i]).addClass("hasDuckling");
	}

}