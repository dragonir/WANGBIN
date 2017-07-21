var fenable = new Array();
var fstatement = new Array();
var filter_statement="";
var mapping = new Array();
for (i=0; i<15; i++) {
	fenable[i] = -1;
	fstatement[i] = "";
	mapping[i] = 0;
}

function set_enable() {
	obj = myfilter.filters;
	filter_statement = "style=\"filter:";
	for (i=0; i<obj.length; i++) {
		if (fenable[i]==false) {
			obj[i].enabled = false;
			fstatement[i] = "";
		} else filter_statement+=fstatement[i];
	}
	filter_statement += "\"";
}
	
function filter(){
	switch (cur) {
		case '0':	//alpha
			if (!myfilter.filters.alpha) {
				myfilter.style.filter+="alpha()";
				fenable[myfilter.filters.length] = true;
				mapping[0] = myfilter.filters.length-1;
			} else {
				fenable[mapping[0]] = (myfilter.filters.alpha.enabled = !myfilter.filters.alpha.enabled);
			}
			myfilter.filters.alpha.finishOpacity = Number(document.form.alpha_finishOpacity.value);
			myfilter.filters.alpha.finishX = Number(document.form.alpha_finishX.value);
			myfilter.filters.alpha.finishY = Number(document.form.alpha_finishY.value);
			myfilter.filters.alpha.opacity = Number(document.form.alpha_opacity.value);
			myfilter.filters.alpha.startX = Number(document.form.alpha_startX.value);
			myfilter.filters.alpha.startY = Number(document.form.alpha_startY.value);
			myfilter.filters.alpha.style = Number(document.form.alpha_style.value);
			obj = myfilter.filters.alpha;
			if (myfilter.filters.alpha.style==0) 
				fstatement[mapping[0]] = "alpha(opacity="+obj.opacity+") ";
			else fstatement[mapping[0]] = "alpha(style="+obj.style+
												" opacity="+obj.opacity+
												" finishOpacity="+obj.finishOpacity+
												" startx="+obj.startX+
												" starty="+obj.startY+
												" finishX="+obj.finishX+
												" finishY="+obj.finishY+") ";

			break;
		case '1':	//blur
			if (!myfilter.filters.blur) {
				myfilter.style.filter+=" blur()";
				fenable[myfilter.filters.length] = true;
				mapping[1] = myfilter.filters.length-1;
			} else {
				fenable[mapping[1]] = (myfilter.filters.blur.enabled = !myfilter.filters.blur.enabled);
			}
			myfilter.filters.blur.add = Number(document.form.blur_add.value);
			myfilter.filters.blur.direction = document.form.blur_direction.value;
			myfilter.filters.blur.strength = Number(document.form.blur_strength.value);
			obj = myfilter.filters.blur;
			fstatement[mapping[1]] = "blur(add="+obj.add+" direction="+obj.direction+" strength="+obj.strength+") ";
			break;
		case '2':	//chroma
			chroma_color="0x"+document.form.chroma_color.value;
			if (!myfilter.filters.chroma) {
				myfilter.style.filter+=" chroma()";
				fenable[myfilter.filters.length] = true;
				mapping[2]=myfilter.filters.length-1;
			} else {
				fenable[mapping[2]] = (myfilter.filters.chroma.enabled = !myfilter.filters.chroma.enabled);
			}
			myfilter.filters.chroma.color = +(chroma_color);
			fstatement[mapping[2]] = "chroma(color=#"+chroma_color+") ";
			break;
		case '3':	//dropshadow
			dropshadow_color=document.form.dropShadow_color.value;
			if (!myfilter.filters.dropShadow) {
				myfilter.style.filter+=" dropShadow()";
				fenable[myfilter.filters.length] = true;
				mapping[3]=myfilter.filters.length-1;
			} else {
				fenable[mapping[3]] = (myfilter.filters.dropShadow.enabled = !myfilter.filters.dropShadow.enabled);
			}
			myfilter.filters.dropShadow.color = +("0x"+dropshadow_color);
			myfilter.filters.dropShadow.offX = Number(document.form.dropShadow_offX.value);
			myfilter.filters.dropShadow.offY = Number(document.form.dropShadow_offY.value);
			myfilter.filters.dropShadow.positive = Number(document.form.dropShadow_positive.value);
			obj = myfilter.filters.dropShadow;
			fstatement[mapping[3]] = "dropShadow(color=#"+dropshadow_color+
												" offX="+obj.offX+
												" offY="+obj.offY+
												" positive="+obj.positive+") ";
			break;
		case '4':	//flipH
			if (!myfilter.filters.flipH) {
				myfilter.style.filter+=" flipH()";
				fenable[myfilter.filters.length] = true;
				mapping[4]=myfilter.filters.length-1;
			} else {
				fenable[mapping[4]] = (myfilter.filters.flipH.enabled = !myfilter.filters.flipH.enabled);
			}
			fstatement[mapping[4]] = "flipH() ";
			break;
		case '5':	//flipV
			if (!myfilter.filters.flipV) {
				myfilter.style.filter+=" flipV()";
				fenable[myfilter.filters.length] = true;
				mapping[5]=myfilter.filters.length-1;
			} else {
				fenable[mapping[5]] = (myfilter.filters.flipV.enabled = !myfilter.filters.flipV.enabled);
			}
			fstatement[mapping[5]] = "flipV() ";
			break;
		case '6':	//glow
			glow_color=document.form.glow_color.value;
			if (!myfilter.filters.glow) {
				myfilter.style.filter+=" glow()";
				fenable[myfilter.filters.length] = true;
				mapping[6]=myfilter.filters.length-1;
			} else {
				fenable[mapping[6]] = (myfilter.filters.glow.enabled = !myfilter.filters.glow.enabled);
			}
			myfilter.filters.glow.color = +("0x"+glow_color);
			myfilter.filters.glow.strength = Number(document.form.glow_strength.value);
			obj = myfilter.filters.glow;
			fstatement[mapping[6]] = "glow(color=#"+glow_color+
									" strength="+obj.strength+") ";
			break;
		case '7':	//gray
			if (!myfilter.filters.gray) {
				myfilter.style.filter+=" gray()";
				fenable[myfilter.filters.length] = true;
				mapping[7]=myfilter.filters.length-1;
			} else {
				fenable[mapping[7]]=myfilter.filters.gray.enabled = !myfilter.filters.gray.enabled;
			}
			fstatement[mapping[7]] = "gray() ";
			break;
		case '8':	//invert
			if (!myfilter.filters.invert) {
				myfilter.style.filter+=" invert()";
				fenable[myfilter.filters.length] = true;
				mapping[8]=myfilter.filters.length-1;
			} else {
				fenable[mapping[8]] = (myfilter.filters.invert.enabled = !myfilter.filters.invert.enabled);
			}
			fstatement[mapping[8]] = "invert() ";
			break;
		case '9':	//light
			if (!myfilter.filters.light) {
				myfilter.style.filter+=" light()";
				var iX2=myfilter.offsetWidth/2;   
				var iY2=myfilter.offsetHeight;
   				myfilter.filters.light.addCone(0,0,1,iX2,iY2,255,0,0,20,60);
				fenable[myfilter.filters.length] = true;
				mapping[9]=myfilter.filters.length-1;
			} else {
				fenable[mapping[9]] = (myfilter.filters.light.enabled = !myfilter.filters.light.enabled);
				fstatement[mapping[9]] = "light() ";
			}
			break;
		case '10':	//mask
			mask_color=document.form.mask_color.value;
			if (!myfilter.filters.mask) {
				myfilter.style.filter+=" mask()";
				fenable[myfilter.filters.length] = true;
				mapping[10]=myfilter.filters.length-1;
			} else {
				fenable[mapping[10]] = (myfilter.filters.mask.enabled = !myfilter.filters.mask.enabled);
			}
			myfilter.filters.mask.color = +("0x"+mask_color);
			fstatement[mapping[10]] = "mask(color=#"+mask_color+") ";
			break;
		case '11':	//redirect
			if (!myfilter.filters.redirect) {
				myfilter.style.filter+=" redirect()";
				fenable[myfilter.filters.length] = true;
				mapping[11]=myfilter.filters.length-1;
			} else {
				fenable[mapping[11]] = (myfilter.filters.redirect.enabled = !myfilter.filters.redirect.enabled);
			}
			fstatement[mapping[11]] = "redirect() ";
			break;
		case '12':	//shadow
			shadow_color=document.form.shadow_color.value;
			if (!myfilter.filters.shadow) {
				myfilter.style.filter+=" shadow()";
				fenable[myfilter.filters.length] = true;
				mapping[12]=myfilter.filters.length-1;
			} else {
				fenable[mapping[12]] = (myfilter.filters.shadow.enabled = !myfilter.filters.shadow.enabled);
			}
			myfilter.filters.shadow.color = +("0x"+shadow_color);
			myfilter.filters.shadow.direction = document.form.shadow_direction.value;
			obj = myfilter.filters.shadow;
			fstatement[mapping[12]] = "shadow(color=#"+shadow_color+
									" direction="+obj.direction+") ";
			break;
		case '13':	//wave
			if (!myfilter.filters.wave) {
				myfilter.style.filter+=" wave();";
				fenable[myfilter.filters.length] = true;
				mapping[13]=myfilter.filters.length-1;
			} else {
				fenable[mapping[13]] = (myfilter.filters.wave.enabled = !myfilter.filters.wave.enabled);
			}
			myfilter.filters.wave.add = Number(document.form.wave_add.value);
			myfilter.filters.wave.freq = Number(document.form.wave_freq.value);
			myfilter.filters.wave.lightStrength = Number(document.form.wave_lightStrength.value);
			myfilter.filters.wave.phase = Number(document.form.wave_phase.value);
			myfilter.filters.wave.strength = Number(document.form.wave_strength.value);
			obj = myfilter.filters.wave
			fstatement[mapping[13]] = "wave(add="+obj.add+
									" freq="+obj.freq+
									" lightStrength="+obj.lightStrength+
									" phase="+obj.phase+
									" strength="+obj.strength+") ";
			break;
		case '14':	//xray
			if (!myfilter.filters.xray) {
				myfilter.style.filter+=" xray()";
				fenable[myfilter.filters.length] = true;
				mapping[14] = myfilter.filters.length-1;
			} else {
				fenable[mapping[14]] = (myfilter.filters.xray.enabled = !myfilter.filters.xray.enabled);
			}
			fstatement[mapping[14]] = "xray() ";
			break;
	}
	set_enable();
}
