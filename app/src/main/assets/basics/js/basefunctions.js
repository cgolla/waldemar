$(document).ready(function(){

	$(".mainview-return-btn").click(function(){
		GameHub.finishGameHub();
	});

	$(".mainview-close-btn").click(function(){
    		$(".notification-wrap.manual").hide("fast");
    	});

});
