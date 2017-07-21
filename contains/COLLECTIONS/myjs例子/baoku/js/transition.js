function fadein(){
mytransition.innerHTML=''
if (cur!='x'){
mytransition.filters.revealTrans.Transition=cur
mytransition.filters.revealTrans.apply()
mytransition.innerHTML='<p align="center"><big><big><font face="Verdana">这是一个简单的例子</font></big></big></p><p align="center"><img src="img/a01.gif"></p><p align="center"><big><big><font face="Verdana">这是一个简单的例子</font></big></big></p>'
mytransition.filters.revealTrans.play()
}
else{
mytransition.filters.blendTrans.apply()
mytransition.innerHTML='<p align="center"><big><big><font face="Verdana">这是一个简单的例子</font></big></big></p><p align="center"><img src="img/a01.gif"></p><p align="center"><big><big><font face="Verdana">这是一个简单的例子</font></big></big></p>'
mytransition.filters.blendTrans.play()
}
}