var textScanning = "Suche Marker...";
var textFound = "Marker gefunden!";


var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		this.targetCollectionResource = new AR.TargetCollectionResource("assets/waldemar_targets.wtc", {
		});

		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		/*===========================================
		=            OVERLAYS / DRAWABLES           =
		============================================*/		
		
		// -------- html animation overlay
        // animationpath in uri/param is relative to assets-root
        var getparam ="?animationpath=prototyp\/augmentation\/assets\/animations\/waldemar_jump\.png";
        //var getparam ="";
        var animationHtml = new AR.HtmlDrawable({
        	uri: "file:///android_asset/basics/animation.html"+getparam,
        }, 1.0 , {
        	viewportWidth: 300,
        	viewportHeight: 500,
        	backgroundColor: "#00000000",
        	translate: {
        		x:0.2,
        		y:-1.0
        	},
        	horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.CENTER,
        	verticalAnchor: AR.CONST.VERTICAL_ANCHOR.BOTTOM,
        	clickThroughEnabled: true,
        	allowDocumentLocationChanges: true,
        	onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
        		console.log("ANIMATIONHTML: Document Location changed "+uri);
        		AR.context.openInBrowser(uri);
        	}
        });

        
        // ------- "glitter" overlay
		var imgTwo = new AR.ImageResource("assets/wimbledon2_overlay.png");
		var overlayTwo = new AR.ImageDrawable(imgTwo, 1.0, {
			translate: {
				x: 0,
				y: 0
			}
		});


		// ------- video overlay
		var illustrationVid = new AR.VideoDrawable(
			"file:///android_asset/prototyp/augmentation/assets/animations/01_Waldemar_Bach.mp4", 1.0, {
				translate: {
					x: 0,
					y: 0,
					z: 0
				},
				isTransparent : false,
				onPlaybackStarted : function () {
					console.log("Started play_video 01_Waldemar_Bach.mp4");
				},
				onFinishedPlaying : function () {
					console.log("Finished play_video 01_Waldemar_Bach.mp4");
				},
				onError : function (msg) {
					console.log("An error occured. Message: "+msg);
				}
			}
		);


		/*================================
		=            TRACKERS            =
		================================*/		

		// add drawable to marker
		var pageOne = new AR.ImageTrackable(this.tracker, "01_WaldemarBach", {
		    drawables: {
		        cam: [illustrationVid]
		    },
		    onImageRecognized: function(){
		    	World.setScanStatusFound;
		    	if (this.hasVideoStarted) {
            		illustrationVid.resume();
		        }
		        else {
		            this.hasVideoStarted = true;
		            illustrationVid.play(1);
		        }
		        World.removeLoadingBar();   
		    },
			onImageLost: this.setScanStatusLost,
            onError: function(errorMessage) {
                console.log("An error occured: "+errorMessage);
            }
		});

		
		/*
			The AR.ImageTrackable for the second page uses the same tracker but with a different target name and the second overlay.
		*/
		var pageTwo = new AR.ImageTrackable(this.tracker, "02_ErnaTeich", {
			drawables: {
				cam: overlayTwo
			},
			onImageRecognized: function(){
				console.log("Recognized Erna's pond :D");
			    World.setScanStatusFound();
			    // sending info about desired game to the listener
			    AR.platform.sendJSONObject({parameter:"startGameHub(erna)"});
			},
			onImageLost: this.setScanStatusLost,
            onError: function(errorMessage) {
            	alert("Fehler bei Marker Erna: "+errorMessage);
            	console.log("Fehler bei Marker Erna: "+errorMessage);
            }
		});

		var pageThree = new AR.ImageTrackable(this.tracker, "03_IggyApfelbaum", {
			drawables: {
				cam: overlayTwo
			},
			onImageRecognized: function(){
				console.log("Recognized Iggy's tree :D");
			    World.setScanStatusFound();
			    // sending info about desired game to the listener
			    AR.platform.sendJSONObject({parameter:"startGameHub(iggy)"});
			},
			onImageLost: this.setScanStatusLost,
            onError: function(errorMessage) {
            	alert("Fehler bei Marker Iggy: "+errorMessage);
            	console.log("Fehler bei Marker Iggy: "+errorMessage);
            }
		});

		var pageFour = new AR.ImageTrackable(this.tracker, "Waldemar-Icon_v2", {
			drawables: {
				cam: overlayTwo
			},
			onImageRecognized: function(){
				console.log("Recognized Waldemar :D");
			    World.setScanStatusFound();
			    // sending info about desired game to the listener
			    AR.platform.sendJSONObject({parameter:"startGameHub(tim)"});
			},
			onImageLost: this.setScanStatusLost,
            onError: function(errorMessage) {
            	alert("Fehler bei Marker Waldemar Icon: "+errorMessage);
            	console.log("Fehler bei Marker Waldemar Icon: "+errorMessage);
            }
		});

	},

	setScanStatusFound: function() {
		//if (!World.loaded) {
			console.log("FOUND MARKER :D");
			$(".displayFrame").fadeIn("slow");
			$(".scanStatusWrap p").html(textFound);
			$(".scanStatusWrap").css({
				"background-color" : "rgba(95, 216, 149, .9)",
				"color" : "#ffffff"
			});

			setTimeout(function(){
	        	$(".scanStatusWrap").hide("slow");
	        }, 2000);
            $(".helpButton").hide("fast");
			World.loaded = true;
		//}
	},

	setScanStatusLost: function() {
			console.log("LOST MARKER :(");
			$(".displayFrame").fadeOut("fast");
			$(".scanStatusWrap").css({
				"background-color" : "rgba(255, 255, 255, .5)",
				"color" : "#0064a8"
			});
			$(".scanStatusWrap p").html(textScanning);
			$(".scanStatusWrap").show("slow");
	},

    //Once the tracker loaded all its target images, the function worldLoaded() is called.
	worldLoaded: function worldLoadedFn() {
        $(".scanStatusWrap").show("slow");

        //show help text, when the help button is clicked
	    $("body").on("click", ".helpButton", function(){
		    $(".notification-wrap").fadeIn("fast");
		    //hide scan button while that view is shown
		    AR.platform.sendJSONObject({parameter:"hideScanButton"});
	    });

	    // close help text, when the OK-button is clicked
	    // ! Really slow on Samsung Tablet !
	    $("body").on("click", ".button-basic", function(){
	    $(".notification-wrap").fadeOut("fast");
	    // show scan button again
	    AR.platform.sendJSONObject({parameter:"showScanButton"});
	    });

    	// show help icon after 5 seconds (if no marker is found)
    	setTimeout(function(){
    		$(".helpButton").fadeIn("slow");}, 5000
    	);
	},
	
	/** function to close everyting. Destroys all trackers to avoid problems 
	* with drawables on close (seem to block UI-thread sometimes).
	* Hides other html overlays as well.
	*/
	close: function closeFn() {

		// hiding/removing UI elements
		$(".scanStatusWrap").hide("fast");
		$(".scanStatusWrap").remove();
	    $(".helpButton").hide("fast");
	    $(".helpButton").remove();
	    $(".notification-wrap").fadeOut("fast");
	    $(".displayFrame").fadeOut("fast");

	    // make sure no drawables bring down system when replacing architectView's loaded HTML
	    World.loaded = false;
		this.tracker.destroy();
	}
};

World.init();


