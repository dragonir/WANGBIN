$(function(){
	$(".summaryBar span").on('click',function(){
		$(this).css({
			background: '#fff',
			color: '#34b091'
		});
		$(this).parent().siblings().slideToggle(800);
		$(this).parent().css({
			background: '#3b3e4a',
			border: '1px dotted #fff'
		});
		// $(".summaryBar .summary p").css('color', '#fff');
		$(this).siblings().css('color', '#fff');
	});

	// slider
  	$('.bxslider').bxSlider();
});