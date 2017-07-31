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

$(function(){
	$(window).scroll(function(event) {
		$("#nav").css({
			background: '#fff',
			boxShadow: '0px 1px 5px #000'
		});
		// $("#resume").css('borderRadius', '0 0 0 0');
		// console.log($(window).scrollTop());
		if($(window).scrollTop() == 0){
			$("#nav").css({
				background: '#fffc00',
				boxShadow: 'none'
			});
			// $("#resume").css('borderRadius', '0 0 25 25');
		}
	});

})

//提示标签
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


// 访问次数
function getCookieVal(offset){
var endstr=document.cookie.indexOf(";",offset);
if(endstr==-1)
endstr=document.cookie.length;
return unescape(document.cookie.substring(offset,endstr));
}
 
function GetCookie(name){
var arg=name+"=";
var alen=arg.length;
var clen=document.cookie.length;var i=0;
while(i<clen){
var j=i+alen;
if(document.cookie.substring(i,j)==arg)
return getCookieVal(j);
i=document.cookie.indexOf(" ",i)+1;if(i==0)
break;
}
return null;
}
 
function SetCookie(name,value){
var argv=SetCookie.arguments;
var argc=SetCookie.arguments.length;
var expires=(2<argc)?argv[2]:null;
var path=(3<argc)?argv[3]:null;
var domain=(4<argc)?argv[4]:null;
var secure=(5<argc)?argv[5]:false;
document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
}
 
function ResetCounts(name){
visits=0;SetCookie("visits",visits,expdate,"/",null,false);
location.reload();
}