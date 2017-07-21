TableColor='#0072BC';
function DrawMouseMenu(){
	DivH=2;
	oSelection = document.selection;
	var HrStr="<tr><td align=center valign=middle height=2><TABLE border=0 cellpadding=0 cellspacing=0 width=128 height=2><tr><td height=1 bgcolor=buttonshadow><\/td><\/tr><tr><td height=1 bgcolor=buttonhighlight><\/td><\/tr><\/TABLE><\/td><\/tr>";
	var MenuStr1="<tr><td align=center valign=middle height=20><TABLE border=0 cellpadding=0 cellspacing=0 width=132><tr><td valign=middle height=16 class=Mout onMouseOver=this.className='Mover'; onMouseOut=this.className='Mout'; onclick=\"";
	var MenuStr2="<\/td><\/tr><\/TABLE><\/td><\/tr>";
	var XiciMenu=["window.history.back()\">后退","window.history.forward()\">前进"];
	var SysMenu=["document.execCommand('SelectAll')\">全选","MouseMenu.style.visibility='hidden';document.execCommand('SaveAs','true')\">另存为…","location.replace('view-source:'+location.href)\">查看源文件","window.print()\">打印","window.location.reload()\">刷新"];
	var MenuStr="";
	for(i=0;i<XiciMenu.length;i++){
		MenuStr+=MenuStr1+XiciMenu[i]+MenuStr2;
		DivH+=20;
	}
	MenuStr+=HrStr;
	for(i=0;i<arguments.length;i++){
		MenuStr+=MenuStr1+arguments[i]+MenuStr2;
		DivH+=20;
	}
	if(arguments.length>0){
		MenuStr+=HrStr;
		DivH+=2;
	}
	for(i=0;i<SysMenu.length;i++){
		MenuStr+=MenuStr1+SysMenu[i]+MenuStr2;
		DivH+=20;
	}
	var DivStr1="<DIV id=MouseMenu class=div1 style=\"position:absolute; left:0px; top:0px; width=150;height="+DivH+"; z-index:1; visibility:hidden;\"><TABLE border=0 cellpadding=0 cellspacing=0 class=div2><tr><td bgcolor="+TableColor+" width=10 valign=bottom align=center  bgcolor=buttonface><img id=menugif src=menu.gif width=18 height=160><\/td><td bgcolor=buttonface><TABLE border=0 cellpadding=0 cellspacing=0>";
	var DivStr2="<\/TABLE><\/td><\/tr><\/TABLE><\/DIV>";
	document.write(DivStr1+MenuStr+DivStr2);
	document.body.oncontextmenu=new Function("return ShowMouseMenu();");
	document.body.onclick=new Function("MouseMenu.style.visibility='hidden';");
	document.body.onscroll=new Function("MouseMenu.style.visibility='hidden';");
	document.body.onselectstart=new Function("MouseMenu.style.visibility='hidden';");
	window.onresizestart=new Function("MouseMenu.style.visibility='hidden';");
}