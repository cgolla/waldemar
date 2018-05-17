var textScanning = "Suche Marker...";
var textFound = "Marker gefunden!";

var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		/*
			First an AR.ImageTracker needs to be created in order to start the recognition engine.
			It is initialized with a AR.TargetCollectionResource specific to the target collection
			that should be used. Optional parameters are passed as object in the last argument.
			In this case a callback function for the onTargetsLoaded trigger is set.
			Once the tracker loaded all its target images, the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target
			name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to
			respond to any or a certain group of targets.

			Adding multiple targets to a target collection is straightforward.
			Simply follow our Target Management Tool documentation. Each target in the target
			collection is identified by its target name. By using this target name, it is possible
			to create an AR.ImageTrackable for every target in the target collection.
		*/
		this.targetCollectionResource = new AR.TargetCollectionResource("assets/waldemar_targets.wtc", {
		});

		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/

		// Create overlay for page one

		var imgOne = new AR.ImageResource("assets/wimbledon1_overlay2.png");
        var overlayOne = new AR.ImageDrawable(imgOne, 1.0, {
        	translate: {
        		x: 0,
        		y: 0
        	}
        });

        // TODO: viewportWidth + Heigth dynamically?
        // animationpath in uri is relative to assets-root
        var animationHtml = new AR.HtmlDrawable({
        	uri: "file:///android_asset/basics/animation.html?animationpath=prototyp\/augmentation\/assets\/animations\/waldemar_jump\.png"
        }, 2.5 , {
        	viewportWidth: 300,
        	viewportHeight: 500,
        	backgroundColor: "#00000000",
        	translate: {
        		x:0.3,
        		y:-1.5
        	},
        	horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.CENTER,
        	verticalAnchor: AR.CONST.VERTICAL_ANCHOR.BOTTOM,
        	clickThroughEnabled: true,
        	allowDocumentLocationChanges: false,
        	onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
        		AR.context.openInBrowser(uri);
        	}
        });

		// add drawable to marker
		var pageOne = new AR.ImageTrackable(this.tracker, "Waldemar-Icon_v2", {
		    drawables: {
		        cam: [overlayOne, animationHtml]
		    },
		    onImageRecognized: this.setScanStatusFound,
			onImageLost: this.setScanStatusLost,
            onError: function(errorMessage) {
                alert(errorMessage);
            }
		});

		/*
			Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created.
		*/
		var imgTwo = new AR.ImageResource("assets/wimbledon2_overlay.png");
		var overlayTwo = new AR.ImageDrawable(imgTwo, 1.0, {
			translate: {
				x: 0,
				y: 0
			}
		});

		/*
			The AR.ImageTrackable for the second page uses the same tracker but with a different target name and the second overlay.
		*/
		var pageTwo = new AR.ImageTrackable(this.tracker, "EntenteichPreview", {
			drawables: {
				cam: overlayTwo
			},
			onImageRecognized: function(){
			    this.setScanStatusFound;
			    // sending info about desired game to the listener
			    AR.platform.sendJSONObject({parameter:"startGameHub(erna)"});
			},
			onImageLost: this.setScanStatusLost,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});
	},

	setScanStatusFound: function() {
		//if (!World.loaded) {
			$(".displayFrame").fadeIn("slow");
			$(".scanStatusWrap p").html(textFound);
			$(".scanStatusWrap").css({
				"background-color" : "rgba(95, 216, 149, .9)",
				"color" : "#ffffff"
			});

			setTimeout(function(){
	        	$(".scanStatusWrap").hide("slow");
	        }, 2000);

			World.loaded = true;
		//}
	},

	setScanStatusLost: function() {
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
	}
};

World.init();
