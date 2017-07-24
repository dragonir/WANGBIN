$(function(){
	var img = $("#img");
	var tooltip = $("#tooltip");
	tooltip.hide();
	img.on("mouseenter",function(){
		tooltip.fadeIn('slow');
	});
	img.on("mouseleave", function(){
		tooltip.fadeOut('slow');
	});
});