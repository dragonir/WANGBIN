function ShowMouseMenu(){
	if(MouseMenu.style.visibility=='visible')MouseMenu.style.visibility='hidden';
	if(event.srcElement.tagName=="IMG"&&event.srcElement.id!="menugif"||event.srcElement.tagName=="A"||event.srcElement.tagName=="TEXTAREA"||event.srcElement.tagName=="INPUT"||oSelection.type!="None")
		return true;
	else{
		if(event.clientX+150 > document.body.clientWidth)MouseMenu.style.left=event.clientX+document.body.scrollLeft-150;
		else MouseMenu.style.left=event.clientX+document.body.scrollLeft;
		if(event.clientY+DivH > document.body.clientHeight)MouseMenu.style.top=event.clientY+document.body.scrollTop-DivH;
		else MouseMenu.style.top=event.clientY+document.body.scrollTop;
		MouseMenu.style.visibility='visible';
	}
	return false;
}