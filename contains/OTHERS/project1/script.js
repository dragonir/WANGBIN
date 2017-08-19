//时间事件
function startTime(){
	var day = new Date();
	var h = day.getHours();
	var m = day.getMinutes();
	var s = day.getSeconds();
	
	m = timeFormat(m);
	s = timeFormat(s)
	
	document.getElementById("time").innerHTML = h + " : " + m + " : " + s;
			t = setTimeout(function(){startTime(),1000});
}
function timeFormat(i){
	if(i<10){
		i = "0" + i;
	}
	return i;
}