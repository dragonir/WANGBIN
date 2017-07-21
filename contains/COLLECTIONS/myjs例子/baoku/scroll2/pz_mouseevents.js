// MOUSEEVENTS LIB v1.0
// www.microbians.com / Gabriel Suchowolski power[z]one - powerz@microbians.com
//
// Distributed under the terms of the GNU Library General Public License
//
// This routins are modifications based on Steinman DynAPI,
// so please... better use the original one.
// http://www.dansteinman.com/dynduo/
// 
// - added mosue object
// - added checkOVER routins

function mouseSTATUS() {
	this.x       = null;
	this.y       = null;
	this.bt      = "up";
	this.oldx    = null;
	this.oldy    = null;
	this.dx      = null;
	this.dy      = null;
	this.screeny = null;
	this.screenx = null;

	this.element = null;
	this.event   = null;
}

var mouse = new mouseSTATUS();

function actualizateMouseSTATUS(e, x, y) {
	mouse.event   = e.type
	mouse.element = is.ns ? e.target : e.srcElement

	if ( mouse.x != null || mouse.y != null) { 
		mouse.oldx= mouse.x;
		mouse.oldy= mouse.y;
	}
	else {
		mouse.oldx = x;
		mouse.oldy = y;
	}
	mouse.x   = x;
	mouse.y   = y;
	mouse.dx  = mouse.x - mouse.oldx;
	mouse.dy  = mouse.y - mouse.oldy;

	     if ( e.type == "mousedown" ) mouse.bt = "down";
	else if ( e.type == "mouseup" )   mouse.bt = "up";

	if (window.event) {
		mouse.screenx=window.event.screenX;
		mouse.screeny=window.event.screenY;
	} else {
		mouse.screenx=-1;
		mouse.screeny=-1;
	}
}


function initMouseEvents() {
	document.onmousedown = mouseDown
	document.onmousemove = mouseMove
	document.onmouseup   = mouseUp

	if (is.ns) document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP)
	if (is.ie) { 
		document.onselectstart = selectstart
		document.ondragstart   = new Function("mouseMove(event); return false;")
	}
}
initMouseEvents()

function selectstart(){
	if ( event.srcElement.tagName != "INPUT" && event.srcElement.tagName != "TEXTAREA") { return false; } 
	else { mouse.bt="up"; return true; }
}

function mouseDown(e) {
	if (is.ie) { var e = event }
	if ((is.ns && e.which!=1) || (is.ie && event.button!=1)) return true
	var x = (is.ns)? e.pageX : event.x+document.body.scrollLeft
	var y = (is.ns)? e.pageY : event.y+document.body.scrollTop

	if (is.ns && e.target!=document) routeEvent(e)

	actualizateMouseSTATUS(e, x, y);

	if (Scroll && ScrollTestActive()) return false
	else if (Drag && drag.mouseDown(x,y)) return false
	else return DynMouseDown(e,x,y)
}
function mouseMove(e) {
	if (is.ie) { var e = event }
	var x = (is.ns)? e.pageX : event.x+document.body.scrollLeft
	var y = (is.ns)? e.pageY : event.y+document.body.scrollTop
	if (is.ns && e.target!=document) routeEvent(e)

	actualizateMouseSTATUS(e, x, y);

	if (Scroll && ScrollTestActive()) return false
	else if (Drag && drag.mouseMove(x,y)) return false
	else if (is.ns && mouse.bt == "down") return false; // TO run DRAG ok in NS
	else return DynMouseMove(e,x,y)
}
function mouseUp(e) {
	if (is.ie) { var e = event }
	var x = (is.ns)? e.pageX : event.x+document.body.scrollLeft
	var y = (is.ns)? e.pageY : event.y+document.body.scrollTop

	if (is.ns && e.target!=document) routeEvent(e)

	actualizateMouseSTATUS(e, x, y);

	if (Drag && drag.mouseUp(x,y)) return false
	else return DynMouseUp(e,x,y)
}

// overwrite these functions in your html source to do other mouse handling
function DynMouseDown(e,x,y) {return true}
function DynMouseMove(e,x,y) {return true}
function DynMouseUp(e,x,y)   {return true}

// include drag.js and/or scroll2.js after this file to overwrite these variables
Drag = null
Scroll = null

// Mouse sensors... it execute a function that takes the event.. to define it checkOVER array
// like: checkOVER[1]  = new onmouseSENSOR( mywindowclose     , mywindowclose_eventfn);
// this will check an DynLayer: if the mouse are:
// none > the mouse is not over
// over > the mouse go inside
// in   > the mouse stay in over
// down > the mouse is down over
// up   > the mouse up over
// drag > the mouse drag the object
// drop > the mouse drop the object

function onmouseSENSOR(obj, eventfn, forEl) {
	this.obj    = obj;
	this.eventfn = eventfn;
	this.status = "none";
	this.timestart = 0;
	this.timein    = 0;
	if (forEl) this.forEl  = forEl
	else       this.forEl  = null
}

// A sensible area defines an object to manage as an area that the mouse is sensible in
function sensibleAREA(n, x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.name = n
}

var checkOVER = new Array();
var checkOVEREl = null;

function initMouseCheck() { 
	if (DynLayer && DynLayer.set && checkOVER.length > 0) {
		var d = new Date();
		for ( var buc=1; buc < checkOVER.length; buc++ ) {
			if (checkOVER[buc]) {
				var el       = checkOVER[buc].obj;
				if ( mouse.x >= el.x && mouse.x < el.x+el.w && mouse.y >= el.y && mouse.y < el.y+el.h ) {
					     if ( mouse.bt=="down" && checkOVER[buc].status=="drag" ) 							 									{ checkOVER[buc].status="drag"; checkOVER[buc].eventfn("DRAG"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="down" && checkOVER[buc].status=="down" && ( Math.abs(mouse.dx) > 1 || Math.abs(mouse.dy) > 1 ) )			 						{ checkOVER[buc].status="drag"; checkOVER[buc].eventfn("DRAG"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="down" && checkOVER[buc].status == "none" ) 							      				 				{ checkOVER[buc].status="none";                                 checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="down" ) 							      				 									{ checkOVER[buc].status="down"; checkOVER[buc].eventfn("DOWN"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="up"   && checkOVER[buc].status == "down" ) 			      			 									{ checkOVER[buc].status="up";   checkOVER[buc].eventfn("UP");   checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="up"   && checkOVER[buc].status == "drag" ) 			      			 									{ checkOVER[buc].status="drop"; checkOVER[buc].eventfn("DROP"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( checkOVER[buc].status == "none" || checkOVER[buc].status == "out") 					 				   					{ checkOVER[buc].status="over"; checkOVER[buc].eventfn("OVER"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( checkOVER[buc].status == "up"   || checkOVER[buc].status == "over" || checkOVER[buc].status == "in" || checkOVER[buc].status == "drop" ) 					{ checkOVER[buc].status="in";   checkOVER[buc].eventfn("IN");   checkOVER[buc].timein    = d.getTime() - checkOVER[buc].timestart; }
					checkOVEREl=checkOVER[buc]
					continue;
				}
				else {
					     if ( mouse.bt=="down" && checkOVER[buc].status=="drag" ) 							 									{ checkOVER[buc].status="drag"; checkOVER[buc].eventfn("DRAG"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="up"   && checkOVER[buc].status== "drag" ) 			      			 				 						{ checkOVER[buc].status="drop"; checkOVER[buc].eventfn("DROP"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="down" && checkOVER[buc].status=="down" && ( Math.abs(mouse.dx) > 1 || Math.abs(mouse.dy) > 1 ) )     			 					{ checkOVER[buc].status="drag"; checkOVER[buc].eventfn("DRAG"); checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( mouse.bt=="down" && checkOVER[buc].status=="down" )    			 												{ checkOVER[buc].status="down";                                 checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( checkOVER[buc].status == "over" || checkOVER[buc].status == "in" || checkOVER[buc].status == "down" || checkOVER[buc].status == "up" ||  checkOVER[buc].status == "drop"  )  	{ checkOVER[buc].status="out";  checkOVER[buc].eventfn("OUT");  checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					else if ( checkOVER[buc].status == "out") 																		{ checkOVER[buc].status="none";                                 checkOVER[buc].timestart = d.getTime(); checkOVER[buc].timein = 0; }
					if (checkOVEREl!=null && checkOVEREl.obj.name == checkOVER[buc].obj.name) {
						checkOVEREl=null
					}
				}
			}
		}
	}
	setTimeout('initMouseCheck()',20);
}
initMouseCheck();