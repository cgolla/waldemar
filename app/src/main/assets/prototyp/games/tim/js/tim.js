// ============ VARS

var animal_food_prefix = "essen_"; // prefix for animal-food-class (excl. ".")
var animal_icon_prefix = "icon_";  // prefix for animal-icon-class (excl. ".")
var animal_counter = 0; // number of animals that got the correct food
var animal_number; // total number of animals (gets counted on document ready)

// ============ DOCUMENT READY
$(document).ready(function(){

	// init drag'n'drop for touch-devices AFTER anleitung has been confirmed.
	$(".mainview-close-btn").click(function(){
    	initTouch();
    });
		
	
	// initialize drag'n'drop
	$(".essen").draggable({
		revert: true
	});
	$(".icon_wrap").droppable();


	// count animals
	animal_number = $(".icon").length;


	// evaluate drops
	$(".icon_wrap").on("drop", function(evt, ui){

		var animal = $(this).attr("id");

		// food on right icon:
		if(ui.draggable.hasClass(animal_food_prefix+animal)){
			$(this).find(".essen_mini").show("fast");
			$(ui.draggable).hide("fast");
			$(this).find(".icon").css("background-color", "#009F6E");
			animal_counter++;


			// when all animals have food:
			if(animal_counter == animal_number){
				endTouch();
				gameWon();
			}

		}
		// food on wrong icon:
		else{

			// turn icon red and then yellow again
			$(this).find(".icon").css("background-color", "#f06172");
			setTimeout(function(){
			 	$("#"+animal).find(".icon").css("background-color","#ffbd3f");
			}, 1500);

		}

	});
	

});


// ============== FUNCTIONS

// Called when all animals have got their favourite food.
function gameWon(){
	$(".notification-wrap.end").delay(1000).show("fast");
}

// Converting touch events to mouse events so drag'n'drop works
function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

/**
*	Initialize touch events for drag & drop by adding necessary event handlers to document.
*/
function initTouch()
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);    
}

/**
* 	End touch events for drag & drop by removing event handlers from document.
*/
function endTouch()
{
	document.removeEventListener("touchstart", touchHandler, true);
    document.removeEventListener("touchmove", touchHandler, true);
    document.removeEventListener("touchend", touchHandler, true);
    document.removeEventListener("touchcancel", touchHandler, true);
}

