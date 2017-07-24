$(function(){
	var img = $("#img");
	var tooltip = $("#tooltip");
	img.on("mouseenter",function(){
		tooltip.fadeIn('slow');
	});
	img.on("mouseleave", function(){
		tooltip.fadeOut('slow');
	});
});

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