
/**
*	Animation object with default-values of all necessary properties.
*/
var Animation = {
	frame_width: 300, 		// width of animationWrap
	frame_height: 500, 		// height of animationWrap
	frame_unit: "px",		// unit of size of animationWrap
	frame_number: 10,		// number of frames in this animation
	frame_duration: 0.1,	// duration of a single frame in seconds
	sprite_width: 3000,		// width of the complete spritesheet
	sprite_height: 1000,	// heigth of the complete spritesheet
	sprite_filename: "../prototyp/augmentation/assets/animations/waldemar_jump.png", //path to spritesheet
	iterations: "infinite",	// number of times to run the animation
	animation_name: "sprite_3000_row0", //TODO: REMOVE; BUILD KEYFRAMES DYNAMICALLY
	

	/**
	* Function sets up the animation into an html-element with class="animationWrap"(doesn't start the animation).
	*/
	initAnimation: function(){
		
		var backgroundImg = "url('"+this.sprite_filename+"')";
		console.log("AnimationFilename: "+backgroundImg);

		$(".animationWrap").css({
			"background-image": backgroundImg,
			"width": this.frame_width,
			"height": this.frame_height
		});
	},

	/**
	* Function starts the animation inside .animationWrap by assigning the css-animation-property.
	* TODO: animation_name isn't passed anymore -> build @keyframes dynamically
	*/
	startAnimation: function(){
		var css_animation = this.animation_name + " " + this.frame_number*0.1 + "s steps("+this.frame_number+") "+this.iterations+"";
		console.log("CSS ANIMATION: "+css_animation);
		$(".animationWrap").css({
			"animation": css_animation
		});
	}
}



/**
* Function sets up the animation into an html-element with class="animationWrap"(doesn't start the animation).
* @param animation_filename: String containing path to a sprite-animation (e.g. a png)
* @param animation_width: int containing the width of the animation. Default is 300 (px)
* @param animation_height: int containing the height of the animation. Default is 500 (px)
// TODO: change all those params into an options-object
*/
// function initAnimation(animation_filename, animation_width=300, animation_height=500){
	
// 	var backgroundImg = "url('"+animation_filename+"')";
// 	console.log("AnimationFilename: "+backgroundImg);

// 	$(".animationWrap").css({
// 		"background-image": backgroundImg,
// 		"width": animation_width,
// 		"height": animation_height
// 	});
// }

/**
* Function starts the animation inside .animationWrap
* @param animation_name: Name of the @keyframes-Animation to be used. Usually declared in animation.css.
* @param frames_number: int containing the number of frames the animation has.
* @param iterations: either int containing number of times animation has to run or the string "infinite" for a loop animation.
*/
// function startAnimation(animation_name, frames_number=7, iterations="infinite"){
// 	var css_animation = animation_name + " " + frames_number*0.1 + "s steps("+frames_number+") "+iterations+"";

// 	$(".animationWrap").css({
// 		"animation": css_animation
// 	});
// }




$(document).ready(function(){

	//get filename from URL's GET-params
	var url = new URL(window.location);
	var animation_path = url.searchParams.get("animationpath");

	// if animation has been passed in the URL, play it
	if(animation_path != undefined && animation_path != ""){
		var animation = Object.create(Animation);
		animation.sprite_filename = "../"+animation_path;
		animation.initAnimation();
		animation.startAnimation();

		// initAnimation("../"+animation_path);
		// startAnimation("sprite_3000_row0", 10);
	}
	
});