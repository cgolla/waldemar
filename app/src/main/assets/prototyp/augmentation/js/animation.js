/**
* Function sets up the animation into an html-element with class="animationWrap"(doesn't start the animation).
* @param animation_filename: String containing path to a sprite-animation (e.g. a png)
* @param animation_width: int containing the width of the animation. Default is 300 (px)
* @param animation_height: int containing the height of the animation. Default is 500 (px)
*/
function initAnimation(animation_filename, animation_width=300, animation_height=500){
	
	var backgroundImg = "url('"+animation_filename+"')";
	console.log("AnimationFilename: "+backgroundImg);

	$(".animationWrap").css({
		"background-image": backgroundImg,
		"width": animation_width,
		"height": animation_height
	});
}

/**
* Function starts the animation inside .animationWrap
* @param animation_name: Name of the @keyframes-Animation to be used. Usually declared in animation.css.
* @param frames_number: int containing the number of frames the animation has.
*/
function startAnimation(animation_name, frames_number){

	var css_animation = animation_name + " " + frames_number*0.1 + "s steps("+frames_number+") infinite";

	$(".animationWrap").css({
		"animation": css_animation
	});
}


$(document).ready(function(){
	initAnimation("assets/animations/waldemar_jump.png");
	startAnimation("sprite_waldemar_jump", 7);
});