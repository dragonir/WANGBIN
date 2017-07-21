/*Window script - Copyrighted 2001 Thomas Brattli. This script will come as a stand-alone script in a while*/
var oWin=new Array; oWin.zIndex=10; oWin.dragobj=-1; oWin.resizeobj=-1; oWin.zIndex=100
var isFront;
function winit(w,is,w1,h1,x1,y1){
	wins=w
	win_init()
	winpage=lib_doc_size()
	for(i=0;i<wins;i++){
		create_window(i,0,0,1)
	}
	oWin.currwins=i
	if(is){
		isFront=1
		setWindows()
	}
	if(w1){
		j=0
		for(i=2;i<arguments.length;i+=4){
			oWin[j].resize(arguments[i],arguments[i+1])
			oWin[j].origw=arguments[i]; oWin[0].origh=arguments[i+1]
			oWin[j].moveIt(eval(arguments[i+2]),arguments[i+3])
			oWin[j].checkscroll()
			oWin[j].showIt()
			j++
		}
	}
}
function create_window(i,link,heading,SYSTEM){
	oWin[i]=new lib_obj('divWin'+i,'','','',i)
	oWin[i].oWindow=new lib_obj('divWindow'+i,'divWin'+i)
	oWin[i].oText=new lib_obj('divWinText'+i,'divWin'+i,'divWindow'+i)
	oWin[i].oHead=new lib_obj('divWinHead'+i,'divWin'+i)
	oWin[i].oButtons=new lib_obj('divWinButtons'+i,'divWin'+i)
	oWin[i].oResize=new lib_obj('divWinResize'+i,'divWin'+i)
	//Events
	oWin[i].oHead.evnt.onmouseover=new Function("w_mmover("+i+")")
	oWin[i].oHead.evnt.onmouseout=new Function("w_mmout()")
	if(!bw.ns4) oWin[i].oHead.evnt.ondblclick=new Function("mdblclick(0,"+i+")")
	oWin[i].oResize.evnt.onmouseover=new Function("w_mmover("+i+",1)")
	oWin[i].oResize.evnt.onmouseout=new Function("w_mmout()")	
	//Styles
	if(!bw.ns4){
		oWin[i].oHead.css.cursor="move"
		oWin[i].oResize.css.cursor="w-resize"
		if(!bw.opera5){
			oWin[i].oWindow.css.overflow="hidden"
			oWin[i].css.overflow="hidden"
		}
	}

	//Scroll
	oWin[i].oUp=new lib_obj('divWinUp'+i,'divWin'+i)
	oWin[i].oDown=new lib_obj('divWinDown'+i,'divWin'+i)
	
	//If loader
	if(link){
		//Loader
		if(!bw.ns4) oWin[i].oLoader=new lib_obj('ifrWin'+i,'divWin'+i)
		if(!bw.ns6&&!bw.ns4) oWin[i].oIfr=document.frames['ifrWin'+i]
	}
	
	oWin[i].lastx=oWin[i].x
	oWin[i].lasty=oWin[i].y
	oWin[i].origw=250
	oWin[i].origh=250
	
	//Functions
	oWin[i].resize=win_resize;
	oWin[i].close=win_close;
	oWin[i].maximize=win_maximize;
	oWin[i].minimize=win_minimize;
	oWin[i].regwin=win_regwin
	oWin[i].checkscroll=win_checkscroll;
	oWin[i].up=win_up;
	oWin[i].load=win_load;
	oWin[i].down=win_down;
	oWin[i].addZ=win_addZ;
	oWin[i].state="reg"
	oWin[i].heading=heading?heading:""
	if(link){
		oWin[i].resize(250,250)
		oWin[i].load(link)
		oWin[i].moveIt(20,150)
	}
	if(!SYSTEM){
		oWin[i].showIt()
	}
}
//Window functions 
function win_regwin(){
	this.oResize.css.visibility="inherit"
	this.resize(this.origw,this.origh)
	this.slideIt(this.lastx,this.lasty,30,10)
	this.state="reg"
	if(bw.ns4) this.load(this.url)
	this.addZ()
	this.checkscroll()
}
function win_maximize(){
	if(this.state!="max"){
		if(this.state!="min"){this.lastx=this.x; this.lasty=this.y}
		mw=winpage.x2 - 10
		mh=winpage.y2 - 10 - 140
		this.slideIt(5,143,30,10,this.obj+'.resize('+mw+','+mh+'); if(bw.ns4) this.load(this.url)')
		this.state="max"
		this.addZ()
	}else this.regwin()
}
function win_minimize(){
	if(this.state!="min"){
		couns=0
		if(this.state!="max"){this.lastx=this.x; this.lasty=this.y}
		y=winpage.y2-16; ox=winpage.x2-126
		a=0
		for(i=0;i<wins;i++){
			x=i*125; ok=a
			if(a*125>ox){
				if(ox>126) i=0
				a=0; y-=15; x=0
			}
			for(j=0;j<wins;j++){
				couns++
				//self.status=oWin[j].x + "=" + x + "   -    " + oWin[j].y + "=" + y
				if(oWin[j].x==x && oWin[j].y==y) a++
			}		
			if(a==ok) break;
		}
		x=a*125;
		this.slideIt(x,y,30,10)
		this.oResize.hideIt()
		this.state="min"
		this.resize(125,14)
	}else this.regwin()
}
function win_close(){
	this.hideIt()
	this.oUp.hideIt()
	this.oDown.hideIt()
}
function win_resize(w,h){
	this.oButtons.moveIt(w-39,0)
	this.oResize.moveIt(w-13,h-9)
	this.oWindow.clipTo(0,w-2,h-23,0,1)
	this.clipTo(0,w,h,0,1)
	this.oHead.clipTo(0,w,14,0,1)
	this.oText.moveIt(2,3)
	this.oUp.hideIt()
	this.oDown.hideIt()
}
function win_checkscroll(w,h){
	this.oText.height=this.oText.evnt.offsetHeight||this.oText.css.pixelHeight||this.oText.ref.height||0
	w=this.cr
	h=this.cb
	if(this.oText.height>h-28 && this.state!="min"){
		this.oWindow.clipTo(0,w-14,h-23,0,1)
		this.oUp.moveIt(w-12,14)
		this.oUp.clipTo(0,11,h-30,0,1)
		this.oDown.moveIt(w-12,h-21)
		this.oDown.clipTo(0,11,12,0,1)
		this.oUp.showIt()
		this.oDown.showIt()
	}else{
		this.oUp.hideIt()
		this.oDown.hideIt()
	}
}
var sctim=100;
var winScroll;
function win_up(){
	clearTimeout(sctim);
	if(this.oText.y>=this.oWindow.cb-this.oText.height-10 && winScroll){
		this.oText.moveBy(0,-8); 
		setTimeout(this.obj+".up()",30)
	}
}
function win_down(){
	clearTimeout(sctim);
	if(this.oText.y<=0 && winScroll){
		this.oText.moveBy(0,8);
		setTimeout(this.obj+".down()",30)
	}
}
function noScroll(){clearTimeout(sctim);winScroll=false}
//Loading functions
function win_load(url,heading){
	if(!url) return
	if(!heading) heading=this.heading
	if(!bw.ns4) this.oHead.writeIt("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+heading,"<span class='clHeadTxt'>","</span>")
	this.heading=heading
	if(bw.ns4){
		url+="?addtop=1"
		this.oText.css.load(url,this.oWindow.cr-4)
	}else{
		this.oLoader.evnt.src=url
	}
	setTimeout("checkloaded("+this.num+")",500)
	this.url=url
	if(bw.opera) return true
	return false
}
function checkloaded(id){
	if(bw.ns4) oWin[id].checkscroll()
	else if(bw.opera) alert('Sorry but Opera doesn\'t support this feature at this time.')
	else if(bw.ns6){
		oWin[id].oText.evnt.innerHTML=parent.frames[oWin[id].num].document.getElementsByTagName("body")[0].innerHTML
	}else{
		oWin[id].oText.evnt.innerHTML=oWin[id].oIfr.document.body.innerHTML
	}
}
function win_addZ(){
	oWin.zIndex++
	this.css.zIndex=oWin.zIndex
}
//Initiating winpage
function win_init(){
	if(document.layers){
		document.captureEvents(Event.MOUSEMOVE | Event.MOUSEDOWN | Event.MOUSEUP | Event.DBLCLICK)
		document.ondblclick=mdblclick;
	}
	document.onmousemove=mmove;
	document.onmousedown=mdown
	document.onmouseup=mup;
}
//Event functions
function w_mmover(num,resize){ //Mouseover on elements
	if(!resize) oWin.dragover=num
	else oWin.resizeover=num
}
function w_mmout(){ //Mouseout on elements
	oWin.dragover=-1
	oWin.resizeover=-1
}
function mup(e){ //Mouseup
	if(oWin.dragobj!=-1){oWin[oWin.dragobj].lastx=oWin[oWin.dragobj].x; oWin[oWin.dragobj].lasty=oWin[oWin.dragobj].y}
	oWin.dragobj=-1	
	if(oWin.resizeobj!=-1){
		oWin[oWin.resizeobj].checkscroll()
		oWin[oWin.resizeobj].origw=oWin[oWin.resizeobj].cr
		oWin[oWin.resizeobj].origh=oWin[oWin.resizeobj].cb
		if(bw.ns4) oWin[oWin.resizeobj].load(oWin[oWin.resizeobj].url)
		
	}else if(bw.ns4) routeEvent(e)		
	oWin.resizeobj=-1
}
function mdown(e){ //Mousedown
	x=(bw.ns4 || bw.ns6)?e.pageX:event.x||event.clientX
    y=(bw.ns4 || bw.ns6)?e.pageY:event.y||event.clientY
	if(bw.ie5 || bw.ie6) y+=document.body.scrollTop
	id1=oWin.dragover
	id2=oWin.resizeover
	if(id1>-1 || id2>-1){
		if(id2>-1){ id=id2; oWin.resizeobj=id;
		}else{ 
			id=id1; oWin.dragobj=id
			oWin.clickedX=x-oWin[id].x; 
			oWin.clickedY=y-oWin[id].y
		}
		oWin[id].addZ()
		//Setting background-colors	
		for(i=0;i<wins;i++){
			if(i!=id1&&i!=id2){
				oWin[i].oWindow.bg("white")
			}else oWin[i].oWindow.bg("#EEF3F9")
		}
	}else if(bw.ns4) routeEvent(e)
}
function mmove(e,y,rresize){ //Mousemove
	x=(bw.ns4 || bw.ns6)?e.pageX:event.x||event.clientX
    y=(bw.ns4 || bw.ns6)?e.pageY:event.y||event.clientY
	if(bw.ie5 || bw.ie6) y+=document.body.scrollTop
	id1=oWin.dragobj
	id2=oWin.resizeobj
	if(id2>-1){ //Resize
		nx=x; ny=y
		oldw=oWin[id2].cr
		oldh=oWin[id2].cb
		cw= nx -oWin[id2].x
		ch= ny - oWin[id2].y
		if(cw<120) cw=120
		if(ch<70) ch=70
		oWin[id2].resize(cw,ch)
	}else if(id1>-1){ //Move
		nx=x-oWin.clickedX; ny=y-oWin.clickedY
		if(ny<140) ny=140
		oWin[id1].moveIt(nx,ny)
		if(oWin[id].state==0){oWin[id].lastx=nx; oWin[id].lasty=ny}
	}
	if(!bw.ns4) return false      
}
function mdblclick(e,num){ //Doubleclick
	if(num>-1) oWin[num].maximize()
	else if(oWin.dragover>-1) oWin[oWin.dragover].maximize()
}
function setWindows(placeit,rez){
	between=10
	oWin.rows=Math.round((oWin.currwins/3)+0.2)
	oWin.columns=1
	j=0;a=0;c=0;
	for(i=0;i<wins;i++){
		if(j==oWin.columns-1){
			oWin.columns=oWin.currwins-a<3?oWin.currwins-a:oWin.currwins-a==4?2:3
			if(oWin.currwins!=1 && a!=0) c++
			j=0
		}else if(a!=0) j++
		oWin[i].origw=(winpage.x2-3-(between*oWin.columns))/oWin.columns 
		oWin[i].origh=(winpage.y2-137-(between*oWin.rows))/oWin.rows
		oWin[i].origx=oWin[i].origw*(j)+(between*j+1) +5
		oWin[i].origy=oWin[i].origh*c+140+(between*c)  + 3
		if(!placeit){oWin[i].lasty=oWin[i].origy; oWin[i].lastx=oWin[i].origx
		}else{
			oWin[i].lasty=((page.avail)*parseFloat(oWin[i].yy)/100)+130 ; 
			oWin[i].lastx=page.x2*parseFloat(oWin[i].xx)/100
		}
		oWin[i].resize(oWin[i].origw,oWin[i].origh)
		st=oWin[i].state; oWin[i].regwin()
		if(st==1) oWin[i].minimize(1); else if(st==2) oWin[i].maximize(1)
		else if(st==3) oWin[i].close(); 
		else oWin[i].moveIt(oWin[i].lastx,oWin[i].lasty); if(!placeit)oWin[i].showIt()
		a++;
	}
}

var mDebugging=2; oDCMenu=new makeCoolMenu("oDCMenu"); oDCMenu.useframes=0 
oDCMenu.frame="frmMain"; oDCMenu.offlineUrl=""; oDCMenu.onlineUrl="http://192.168.1.31/";oDCMenu.NS4padding="2px";oDCMenu.useNS4links=1 ;oDCMenu.checkselect=1 ;oDCMenu.pagecheck=1;oDCMenu.checkscroll=2;oDCMenu.resizecheck=1 ;oDCMenu.wait=1000 ;oDCMenu.usebar=1 ;oDCMenu.barcolor="#336699" ;oDCMenu.barwidth="100%" ;oDCMenu.barheight="menu" ;oDCMenu.barx=0 ;oDCMenu.bary="menu";oDCMenu.barinheritborder=0 ;oDCMenu.rows=1;oDCMenu.fromleft=170 ;oDCMenu.fromtop=118 ;oDCMenu.pxbetween=0;avail="190+((toppage.x2-210)/6)" 
oDCMenu.menuplacement=new Array(190,avail,avail+"*2",avail+"*3",avail+"*4",avail+"*5")
oDCMenu.level[0]=new Array() 
oDCMenu.level[0].width=90 
oDCMenu.level[0].height=19 
oDCMenu.level[0].bgcoloroff="transparent"
oDCMenu.level[0].bgcoloron="transparent" 
oDCMenu.level[0].textcolor="white"
oDCMenu.level[0].hovercolor="#FCCE55"  
oDCMenu.level[0].style="font-family:arial,helvetica; font-size:12px; font-weight:bold"
oDCMenu.level[0].border=0 
oDCMenu.level[0].bordercolor="" 
oDCMenu.level[0].offsetX=0 
oDCMenu.level[0].offsetY=-1 
oDCMenu.level[0].NS4font="arial,helvetica"
oDCMenu.level[0].NS4fontSize="2"
oDCMenu.level[0].align="bottom" 
oDCMenu.level[1]=new Array() 
oDCMenu.level[1].width=110
oDCMenu.level[1].height=22
oDCMenu.level[1].bgcoloroff="#CDDBEB"
oDCMenu.level[1].bgcoloron="#006699"
oDCMenu.level[1].textcolor="#006699"
oDCMenu.level[1].hovercolor="#FCCE55"
oDCMenu.level[1].style="padding:2px; font-family:arial,helvetica; font-size:11px; font-weight:bold"
oDCMenu.level[1].align="bottom" 
oDCMenu.level[1].offsetX=0
oDCMenu.level[1].offsetY=0
oDCMenu.level[1].border=1 
oDCMenu.level[1].bordercolor="#006699"
oDCMenu.level[1].NS4font="arial,helvetica"
oDCMenu.level[1].NS4fontSize="2"
oDCMenu.level[2]=new Array()
oDCMenu.level[2].width=150
oDCMenu.level[2].height=20
oDCMenu.level[2].style="padding:2px; font-family: arial,helvetica; font-size:10px; font-weight:bold"
oDCMenu.level[2].align="bottom" 
oDCMenu.level[2].offsetX=0
oDCMenu.level[2].offsetY=0
oDCMenu.level[2].border=1 
oDCMenu.level[2].bordercolor="#006699"
oDCMenu.level[2].NS4fontSize="1"
oDCMenu.level[2].bgcoloroff="#CDDBEB"
oDCMenu.level[2].bgcoloron="#006699"
oDCMenu.level[2].textcolor="#006699"
oDCMenu.level[2].hovercolor="#CDDBEB"
oDCMenu.makeMenu('top0','','<b>News</b>','news/index.asp','')
	oDCMenu.makeMenu('sub00','top0','Newest news','news/index.asp')
		oDCMenu.makeMenu('sub001','sub00','- Welcome to this beta version','news/index.asp','',160,0)
	oDCMenu.makeMenu('sub01','top0','News archive','news/archive.asp')
oDCMenu.makeMenu('top1','','<b>Scripts</b>','script/index.asp')
	oDCMenu.makeMenu('sub10','top1','New scripts','script/index.asp?show=new')
	oDCMenu.makeMenu('sub11','top1','All scripts','script/index.asp?show=all')
	oDCMenu.makeMenu('sub12','top1','Popular scripts','script/index.asp?show=pop')
oDCMenu.makeMenu('top2','','<b>Tutorials</b>','tutorials/index.asp')
	oDCMenu.makeMenu('sub21','top2','Tutorials','tutorials/index.asp')
		oDCMenu.makeMenu('sub210','sub21','New tutorials','tutorials/index.asp')
		oDCMenu.makeMenu('sub211','sub21','Tutorials archive','tutorials/archive.asp')
	oDCMenu.makeMenu('sub22','top2','Other articles','articles/index.asp')
oDCMenu.makeMenu('top3','','<b>Forums</b>','forums/')
	oDCMenu.makeMenu('sub30','top3','General','forums/forum.asp?FORUM_ID=6&CAT_ID=1&Forum_Title=General+DHTML+issues')
	oDCMenu.makeMenu('sub31','top3','Scripts','forums/forum.asp?FORUM_ID=4&CAT_ID=1&Forum_Title=DHTML+Scripts')
	oDCMenu.makeMenu('sub32','top3','Crossbrowser','forums/forum.asp?FORUM_ID=3&CAT_ID=1&Forum_Title=Crossbrowser+DHTML')
	oDCMenu.makeMenu('sub33','top3','CoolMenus','forums/forum.asp?FORUM_ID=2&CAT_ID=1&Forum_Title=CoolMenus')
	oDCMenu.makeMenu('sub34','top3','dhtmlcentral.com','forums/forum.asp?FORUM_ID=5&CAT_ID=1&Forum_Title=dhtmlcentral%2Ecom')
	oDCMenu.makeMenu('sub35','top3','Cool sites','forums/forum.asp?FORUM_ID=1&CAT_ID=1&Forum_Title=Cool+sites')
	oDCMenu.makeMenu('sub36','top3','Active topics','forums/active.asp')
oDCMenu.makeMenu('top5','','<b>CoolMenus</b>','coolmenus/index.asp')
	oDCMenu.makeMenu('sub50','top5','Examples','coolmenus/examples/')
	oDCMenu.makeMenu('sub51','top5','Download','coolmenus/download.asp')
		oDCMenu.makeMenu('sub510','sub51','Download the source code to this menu','coolmenus/download.asp','',150,40)
	oDCMenu.makeMenu('sub52','top5','Tutorial','coolmenus/tutorial.asp')
		oDCMenu.makeMenu('sub520','sub52','Learn how to set up the menu','coolmenus/tutorial.asp','',150,40)
	oDCMenu.makeMenu('sub53','top5','MenuMaker','','_blank',0,0,'','','','','','','if(!bw.ns4)window.open("/coolmenus/maker/","","width=800,height=600")')
		oDCMenu.makeMenu('sub530','sub53','Use the menuMaker to make the menu code for you<br>(the menumaker does not work in Netscap4)','','_blank',150,50,'','','','','','','if(!bw.ns4)window.open("/coolmenus/maker/","","width=800,height=600")')
	oDCMenu.makeMenu('sub54','top5','FAQ','faq/index.asp')
		oDCMenu.makeMenu('sub540','sub54','Frequently asked questions','faq/index.asp','',150,40)
	oDCMenu.makeMenu('sub55','top5','Help forum','forums/forum.asp?FORUM_ID=2&CAT_ID=1&Forum_Title=CoolMenus')
		oDCMenu.makeMenu('sub550','sub55','Go to this forum and post you problems or suggestions regarding the CoolMenus','forums/forum.asp?FORUM_ID=2&CAT_ID=1&Forum_Title=CoolMenus','',150,40)
oDCMenu.makeMenu('top6','','<b>dhtmlcentral</b>','dhtmlcentral/index.asp')
	oDCMenu.makeMenu('sub060','top6','This site is made by Thomas Brattli from www.bratta.com. The site is still in beta, info will come here when it\'s ready','http://www.bratta.com/','',0,130)
oDCMenu.makeStyle(); oDCMenu.construct()
oDCMenu.resizecode="placeA(n)"
	
function placeA(n){	
	oSimple=new lib_obj("divMode")
	var xxx=toppage.x2-70
	if(bw.ns6) xxx-=15
	oSimple.moveIt(xxx,67)
	oSimple.css.width="70"
	oSimple.showIt()
	if(isFront){winpage=new makePageCoords(); setWindows()}
}
placeA(); var isFront
function cm_checkScrolled(obj){
	if(bw.mac) return
	if(bw.ns4 || bw.ns6) obj.scrolledY=obj.win.pageYOffset
	else obj.scrolledY=obj.win.document.body.scrollTop
	if(obj.scrolledY!=obj.lastScrolled){
		if(!obj.useframes){
			if(obj.scrolledY>119){
				for(i=0;i<obj.l[0].num;i++){var sobj=obj.l[0].o[i].oBorder; sobj.moveY(obj.scrolledY)}
				if(obj.usebar) obj.oBar.moveY(obj.scrolledY)
			}else{
				for(i=0;i<obj.l[0].num;i++){var sobj=obj.l[0].o[i].oBorder; sobj.moveY(obj.fromtop)}
				if(obj.usebar) obj.oBar.moveY(obj.fromtop)
			}
		}
		obj.lastScrolled=obj.scrolledY; page.y=obj.scrolledY; page.y2=page.y2orig+obj.scrolledY
		if(!obj.useframes || bw.ie){ clearTimeout(obj.tim); obj.isover=0; obj.hideSubs(1,0)}
	}
	if((bw.ns4 || bw.ns6) && !obj.useframes) setTimeout("cm_checkScrolled("+obj.name+")",200)
}