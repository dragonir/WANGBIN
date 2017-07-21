// DIV-Scroll LIB 2000.08.30
// www.microbians.com / Gabriel Suchowolski power[z]one - powerz@microbians.com
//
// Distributed under the terms of the GNU Library General Public License
//
// This routins are modifications based on Steinman DynAPI,
// so please... better use the original one.
// http://www.dansteinman.com/dynduo/
// 中文化 51JS.COM

function scrolltxtclickhanddler(e) {
	if (is.ie) self.focus(); // To no show the horrible focus border in links...[-_-]
	if (is.ie) var e = event
	if (is.ie) var eventEl = e.srcElement
	else       var eventEl = e.target

	if (is.ie) { 
		if (eventEl.tagName=="IMG" || eventEl.tagName=="FONT") {
			if ( eventEl.parentElement && eventEl.parentElement.tagName == "A") {
				eventEl=eventEl.parentElement
			} else { return true }
		}
		if (eventEl.tagName!="A") return true
	}

	if (eventEl.href) {
		if (eventEl.target=="" || eventEl.target==null || eventEl.target=="_self") { 
			if ( eventEl.href.toString().indexOf("javascript:") != -1 || eventEl.href.toString().indexOf("mailto:") != -1 ) {
				location.href=eventEl.href
			} else {
				var El = eval( this.id.substring(0, this.id.lastIndexOf("Div")) )
				El.SCROLLobj.load(eventEl.href);
			}
		} else {
			if (eventEl.target != "_top" && eventEl.target != "_blank" && eventEl.target != "_parent") {
				var Elframe = eval("parent."+eventEl.target)
				if (Elframe) Elframe.location.href=eventEl.href
				else         open(eventEl.href)
			} else {
				if ( eventEl.target == "_top"    ) top.location.href=eventEl.href
				if ( eventEl.target == "_parent" ) parent.location.href=eventEl.href
				if ( eventEl.target == "_blank"  ) window.open(eventEl.href, "_blank", "width=, height=,fullscreen=0,toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=auto,resizable=1", true)
			}
		}
		return false
	}
}

function scrolltxtclickhanddleranulado(e) {
	return false
}

function defineSCROLLcss(objname, x, y, w, h, Zindex) {
var html="";
html += '<style type="text/css">																								'+'\n'
html += '#'+objname+'txtDiv{ position: absolute; left: '+ x     +'px; top: '+y+'px; width: '+w+'px; height: '+h+'px; z-index: '+Zindex+0+'; clip:rect(0,'+w+','+h+',0);}							'+'\n'
html += '#'+objname+'barDiv{ position: absolute; left: '+(x+w+9)+'px; top: '+y+'px; width:     1px; height: '+h+'px; z-index: '+Zindex+1+'; background-color: #8D8D8A; layer-background-color:#8D8D8A; clip:rect(0,1,'+h+',0);}	'+'\n'
html += '#'+objname+'movDiv{ position: absolute; left: '+(x+w+4)+'px; top: '+y+'px; width:    11px; height:     6px; z-index: '+Zindex+2+'; background-color: #000000; layer-background-color:#000000; clip:rect(0,11,6,0);}	'+'\n'
html += '#'+objname+'upDiv { position: absolute; left:        -100px; top:  -100px; width:    11px; height:    11px; z-index: '+Zindex+3+'; clip:rect(0,11,11,0); visibility: hidden;}						'+'\n'
html += '#'+objname+'dwDiv { position: absolute; left:        -100px; top:  -100px; width:    11px; height:    11px; z-index: '+Zindex+4+'; clip:rect(0,11,11,0); visibility: hidden;}						'+'\n'
html += '<\/style>'+'\n'
document.write(html)
}

function defineSCROLLhtml(objname,imgup,imgdw) {
var html="";
html += '<div id='+objname+'txtDiv><img border=0 width=1 height=1></div>			'+'\n'
html += '<div id='+objname+'barDiv><img border=0 width=1 height=1></div>			'+'\n'
html += '<div id='+objname+'movDiv><img border=0 width=1 height=1></div>			'+'\n'
html += '<div id='+objname+'upDiv><img src="'+imgup+'" border=0 width=11 height=11></div>	'+'\n'
html += '<div id='+objname+'dwDiv><img src="'+imgdw+'" border=0 width=11 height=11></div>	'+'\n'
document.write(html)
}

function defineSCROLLobj(objname, checkOVERindex, imgup, imgdw, addicional_eventfn) {
	this.name      = objname
	this.obj       = this

	var SCROLLtxt  = eval(objname+"txt")
	var SCROLLbar  = eval(objname+"bar")
	var SCROLLmov  = eval(objname+"mov")
	var SCROLLup   = eval(objname+"up" )
	var SCROLLdw   = eval(objname+"dw" )

	this.SCROLLtxt = SCROLLtxt
	this.SCROLLtxt.SCROLLobj = this

	this.SCROLLbar = SCROLLbar
	this.SCROLLmov = SCROLLmov
	this.SCROLLmovpy = 0;

	this.SCROLLup  = SCROLLup
	this.SCROLLdw  = SCROLLdw

	this.x = SCROLLtxt.x
	this.y = SCROLLtxt.y
	this.w = SCROLLtxt.w
	this.h = SCROLLtxt.h

	if (is.ns) this.SCROLLtxt.elm.captureEvents(Event.MOUSEUP | Event.CLICK)
	           this.SCROLLtxt.elm.onmouseup = scrolltxtclickhanddler
	           this.SCROLLtxt.elm.onclick   = scrolltxtclickhanddleranulado
	this.scrolltxtclickhanddler = scrolltxtclickhanddler; // Backup para NS

	this.addicional_eventfn = addicional_eventfn

	this.SCROLLmov_eventfn  = defineSCROLLmov_eventfn
	this.SCROLLarea_eventfn = defineSCROLLarea_eventfn

	this.SCROLLupdate = defineSCROLLupdate;

	this.checkOVERmov  = new onmouseSENSOR( this.SCROLLmov  , this.SCROLLmov_eventfn, this);
	this.SCROLLarea    = new sensibleAREA ( "SCROLLarea"+SCROLLtxt.name, this.SCROLLmov.x, this.SCROLLmov.y - 11, this.SCROLLmov.w, this.SCROLLbar.h + 11*2);
	this.SCROLLareacount = 0
	this.checkOVERarea = new onmouseSENSOR( this.SCROLLarea , this.SCROLLarea_eventfn, this);

	this.checkOVER = checkOVERindex
	checkOVER[checkOVERindex+1]=this.checkOVERmov
	checkOVER[checkOVERindex+0]=this.checkOVERarea

	this.isloading = false
	this.load = defineSCROLLload
}

function defineSCROLLload( file ) {
	this.isloading = true
	this.SCROLLupdate(0)
	this.SCROLLmov.setbg("#a0a0a0")
	if (is.ns) this.SCROLLtxt.elm.onmouseup = scrolltxtclickhanddleranulado
	this.SCROLLtxt.load( file, "defineSCROLLmov_color("+this.name+")");
}

function defineSCROLLmov_color(nofscr) {
	nofscr.SCROLLupdate(0)
	if ( nofscr.SCROLLbar.h < nofscr.SCROLLtxt.h) { nofscr.SCROLLmov.setbg("#000000") }
	else                                          { nofscr.SCROLLmov.setbg("#a0a0a0") }
	if (is.ns) nofscr.SCROLLtxt.elm.onmouseup = nofscr.scrolltxtclickhanddler
	this.isloading = false
}

function defineSCROLLmov_eventfn(e) {
	if ( this.forEl.SCROLLbar.h < this.forEl.SCROLLtxt.h || this.isloading == true) {
		switch (e) {
		   	case "OVER":
				this.forEl.SCROLLmov.setbg("#FF8A00") //设置方块的颜色 onmouserover 状态
			break
		   	case "DOWN":
				this.forEl.SCROLLmov.setbg("#00cc00") //设置方块的颜色 onmouserdown 状态
				this.forEl.SCROLLmovpy = mouse.y-this.forEl.SCROLLmov.y
			break
			case "OUT":
				this.forEl.SCROLLmov.setbg("#000000") //设置方块的颜色 onmouseout 状态
			break
		   	case "DRAG":
					this.forEl.SCROLLupdate(mouse.y - this.forEl.SCROLLmovpy);
					this.forEl.SCROLLmov.setbg("#00cc00") ////设置方块的颜色 拖动时 
					this.forEl.SCROLLareacount=0;
					this.forEl.SCROLLup.hide();
					this.forEl.SCROLLdw.hide();
			break
		}
	}
	if (this.forEl.addicional_eventfn) this.forEl.addicional_eventfn(e);
}

function defineSCROLLarea_eventfn(e) {
	if ( this.forEl.SCROLLbar.h < this.forEl.SCROLLtxt.h || this.isloading == true) {
		switch (e) {
	   		case "IN":
				if ( this.forEl.SCROLLareacount <= 20 ) this.forEl.SCROLLareacount++;
				if ( this.forEl.SCROLLareacount > 20 ) { 
					if ( mouse.y > this.forEl.SCROLLmov.y+this.forEl.SCROLLmov.h-1 ) {
						var ySCROLLmov=this.forEl.SCROLLmov.y+(this.forEl.SCROLLbar.h/this.forEl.SCROLLtxt.h)
						this.forEl.SCROLLup.hide();
						this.forEl.SCROLLdw.show();
					}
					if ( mouse.y < this.forEl.SCROLLmov.y ) {
						var ySCROLLmov=this.forEl.SCROLLmov.y-(this.forEl.SCROLLbar.h/this.forEl.SCROLLtxt.h)
						this.forEl.SCROLLup.show();
						this.forEl.SCROLLdw.hide();
					}
					this.forEl.SCROLLupdate(ySCROLLmov)
				}
			return
		   	case "DOWN":
				this.forEl.SCROLLareacount=10;
			return
			case "OUT":
				this.forEl.SCROLLareacount=0;
				this.forEl.SCROLLup.hide();
				this.forEl.SCROLLdw.hide();
			return
		} 
	}
}

function defineSCROLLupdate(ySCROLLmov) {
	this.SCROLLtxt.updateHeight()
	     if ( ySCROLLmov <  this.SCROLLbar.y					) ySCROLLmov = this.SCROLLbar.y
	else if ( ySCROLLmov >= this.SCROLLbar.y+this.SCROLLbar.h-this.SCROLLmov.h 	) ySCROLLmov = this.SCROLLbar.y+this.SCROLLbar.h-this.SCROLLmov.h;
	this.SCROLLmov.moveTo( null, ySCROLLmov )
	var SCROLLCROP = ( (this.SCROLLmov.y-this.SCROLLbar.y) / (this.SCROLLbar.h-this.SCROLLmov.h) ) * (this.SCROLLtxt.h-this.h);
	this.SCROLLtxt.moveTo( this.x , this.y -  SCROLLCROP);
	this.SCROLLtxt.clipTo( SCROLLCROP, this.w, SCROLLCROP + this.h, 0)
	this.SCROLLup.moveTo( this.SCROLLmov.x , this.SCROLLmov.y - 12 )
	this.SCROLLdw.moveTo( this.SCROLLmov.x , this.SCROLLmov.y + this.SCROLLmov.h + 1 )
}
