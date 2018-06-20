// ============ VARS

var animal_food_prefix = "essen_"; // prefix for animal-food-class (excl. ".")
var animal_icon_prefix = "icon_";  // prefix for animal-icon-class (excl. ".")


// ============ DOCUMENT READY
$(document).ready(function(){
	
	// initialize drag'n'drop
	$(".essen").draggable({
		revert: "invalid"
	});

	$(".icon").droppable();

	$(".icon").on("drop", function(evt, ui){

		var animal = $(this).attr("id");
		 alert("Tier: "+animal+" "+animal_food_prefix+animal);
		if(ui.draggable.hasClass(animal_food_prefix+animal)){
			alert("Ding Ding Ding!!");
		}else{
			alert("Möp möp möööp...");
		}

	});
	

});


// ============== FUNCTIONS



