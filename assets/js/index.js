
$(document).ready(function(){
	// 锚点平滑滚动
  	$("a").on('click', function(event) {
	    if (this.hash !== "") {
	      	// 方式默认点击事件
	      	event.preventDefault();
	      	// 存储hash
	      	var hash = this.hash;
	      	// Using jQuery's animate() method to add smooth page scroll
	      	// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	      	$('html, body').animate({
	        	scrollTop: $(hash).offset().top
	      	}, 800, function(){
	   
	        	// Add hash (#) to URL when done scrolling (default click behavior)
	        	window.location.hash = hash;
	      	});
	    }
  	});


	// 导航栏
	$(function(){
		$("#dropdown1").on("click",function(){
			$("#menu1").toggle('slow');
		})
		$("#dropdown2").on("click",function(){
			$("#menu2").toggle('slow');
		})
		$("#dropdown3").on("click",function(){
			$("#menu3").toggle('slow');
		})
		$("#dropdown4").on("click",function(){
			$("#menu4").toggle('slow');
		})
		$("#dropdown5").on("click",function(){
			$("#menu5").toggle('slow');
		})
	});


	// 滚动时导航栏特效
	$(function(){
		$(window).scroll(function(event) {
			
			// 回顶部锚点在屏幕滚动时显示
			$("#toTop").css('visibility', 'visible');
			
			// 导航栏特效
			$("#nav").css({
				background: '#fff',
				boxShadow: '0px 1px 5px #000'
			});
			$("#nav li a").css('color', '#000');
			if($(window).scrollTop() == 0){
				$("#nav").css({
					background: 'transparent',
					boxShadow: 'none',
				});
				$("#toTop").css('visibility', 'hidden');
				$("#nav li a").css('color', '#fff');
			}
		});
	})

	
	//提示标签
	$(function(){
		var img = $("#selfile");
		var tooltip = $("#tooltip");
		img.hover(function() {
			tooltip.fadeIn('slow');
		}, function() {
			tooltip.fadeOut('slow');
		});
	});


	// banner 高度查询
	$(function(){
		var windowHeight = $(window).height()+10;
		$("#banner").height(windowHeight);
	});
	
})


function showTime(){
	var day = new Date();
	var h = day.getHours();
	var m = day.getMinutes();
	var s = day.getSeconds();
	var d = day.getDay();
	var year = day.getFullYear();
	var month = day.getMonth();
	var today = day.getDate()
	var weeks = ["日","一", "二", "三", "四", "五", "六"];

	m = timeFormat(m);
	s = timeFormat(s);
	
	var clock = document.getElementById("clock");
	clock.innerHTML = h + ":" + m + ":" + s;
	setTime = setTimeout(function(){showTime()},1000);

	var week = document.getElementById("week");
	week.innerHTML = "星期" + weeks[d];

	var date = document.getElementById("date");
	month = month + 1;
	date.innerHTML = year +"-"+ month + "-" + today;
	
}

function timeFormat(i){
	if(i<10){
		i = '0' + i;
	}
	return i;
}


// slider
$(function(){
	$('.bxslider').bxSlider();
})

// $(document).ready(function(){
// 		$('.bxslider').bxSlider({
// 			mode: 'horizontal',
// 			moveSlides: 1,
// 			slideMargin: 0,
// 			infiniteLoop: true,
// 			slideWidth: 100,
// 			minSlides: 3,
// 			maxSlides: 3,
// 			speed: 800,
// 		});
// 	});