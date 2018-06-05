
/**
* Animation object with default-values of all necessary properties and functions to
* 
*/
var Animation = {
	frame_width: 300, 		// width of animationWrap
	frame_height: 500, 		// height of animationWrap
	frame_unit: "px",		// unit of size of animationWrap. Usually no need to be changed.
	frame_number: 10,		// number of frames in this animation
	frame_duration: 0.1,	// duration of a single frame in seconds
	sprite_width: 3000,		// width of the complete spritesheet
	sprite_height: 1000,	// heigth of the complete spritesheet
	sprite_filename: "../prototyp/augmentation/assets/animations/waldemar_jump.png", //path to spritesheet
	sprite_row: 0, 			// which row in the spritesheet shall be animated?
	iterations: "infinite",	// number of times to run the animation
	animation_selector: ".animationWrap", // selector for element that holds the animation
	animation_name: "spriteanimation", // name of the keyframe-animation-rule. Usually no need to be changed.
	

	/**
	* Function sets up an animation into an html-element with class="animationWrap"(doesn't start the animation)
	* and builds keyframes for it.
	* Use this if no html elements have been set up yet (e.g. in Waldemar's AR animation).
	*/
	initAnimation: function(){
		
		var backgroundImg = "url('"+this.sprite_filename+"')";
		console.log("AnimationFilename: "+backgroundImg);

		$(this.animation_selector).css({
			"background-image": backgroundImg,
			"width": this.frame_width,
			"height": this.frame_height
		});

		this.buildKeyframes();
	},

	/**
	* Function starts the animation inside $(animationSelector) by assigning the css-animation-property.
	*/
	startAnimation: function(){
		var css_animation = this.animation_name + " " + this.frame_number*0.1 + "s steps("+this.frame_number+") "+this.iterations+"";
		console.log("CSS ANIMATION: "+css_animation);
		$(this.animation_selector).css({
			"animation": css_animation
		});
	},

	/**
	* Function stops the animation inside $(animationSelector) by removing the css-animation-property.
	*/
	stopAnimation: function(){
		$(this.animation_selector).css({
			"animation": "none"
		});
	},


	/**
	* Function builds css-keyframes rules dynamically depending on viewport width/height, spritesheet size etc.	
	* Those rules are then put inserted into the style-element that is added to the DOM during once the document is ready.
	*/
	buildKeyframes: function(){		

		// make sure height & width are numbers before calculation
		if(isNaN(this.frame_width)){
			console.log("Framewidth "+this.frame_width+" is NaN. Using default width of 300.");
			this.frame_width = 300;
		}	
		if(isNaN(this.frame_height)){
			console.log("Frameheight "+this.frame_height+" is NaN. Using default height of 500.");
			this.frame_height = 500;
		}	

		// calculate background positions of spritesheet
		var posX_0 = "0"+this.frame_unit; 										// X-Position at beginning of animation (always 0)
		var posX_100 = "-"+(this.frame_width*this.frame_number)+this.frame_unit;	// X-Position at end of animation
		var posY = (this.frame_height*this.sprite_row)+this.frame_unit;				// Y-Position (= which row of spritesheet)

		// build keyframe rules from the position-values
		var cssString_0 = "0% {background-position: "+posX_0+" "+posY+";}";
		var cssString_100 = "100% {background-position: "+posX_100+" "+posY+";}";


		//put new Keyframes into animation css
		var styleEl = document.getElementById("keyframeRules");
		var stylesheet = styleEl.sheet;
		stylesheet.insertRule("@keyframes "+this.animation_name+"{"
			+ cssString_0
			+ cssString_100
			+ "}", stylesheet.cssRules.length);
	}
}


// ==== ON DOCUMENT READY 

$(document).ready(function(){

	//get filename from URL's GET-params
	var url = new URL(window.location);
	var animation_path = url.searchParams.get("animationpath");

	// put an extra stylesheet into the doc (will hold dynamic keyframe-rules)
	var animationCss = document.createElement('style');
	animationCss.id= "keyframeRules";
	animationCss.type= "text/css";
	document.head.appendChild( animationCss );

	// if animation has been passed in the URL, prepare the Animation-Object and then play it.
	if(animation_path != undefined && animation_path != ""){
		Animation.sprite_filename = "../"+animation_path;
		Animation.initAnimation();
		Animation.startAnimation();
	}
	
});