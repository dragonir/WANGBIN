function startTime(){
	var day = new Date();
	var h = day.getHours();
	var m = day.getMinutes();
	var s = day.getSeconds();

	m = checkTime(m);
	s = checkTime(s);

	document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
	t = setTimeout(function(){startTime(),500});
}

function checkTime(i){
	if(i<10){
		i = "0"+i;
	}
	return i;
}

function Hello(){
	alert("hello");
}
