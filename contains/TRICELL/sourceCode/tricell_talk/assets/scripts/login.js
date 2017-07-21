// 绑定注册/登录切换事件
var mainTop = Util.getElement('#main-top','span'),
	login = Util.getElement('#login'),
	register = Util.getElement('#register');

// 切换登录
Util.addEvent(mainTop[0],'click',function(e){ 
	Util.addClass(mainTop[0],'active');
	Util.removeClass(mainTop[1],'active');
	Util.addClass(register,'dn');
	Util.removeClass(login,'dn');
});

// 切换注册
Util.addEvent(mainTop[1],'click',function(e){ 
	Util.addClass(mainTop[1],'active');
	Util.removeClass(mainTop[0],'active');
	Util.addClass(login,'dn');
	Util.removeClass(register,'dn');
});

// 表单提交事件
// 登录
var luser = Util.getElement('#luser'),
	lpassw = Util.getElement('#lpassw'),
	lremenber = Util.getElement('#lremenber'),
	lsubmit = Util.getElement('#lsubmit'),
	lTips = Util.getElement('#login','.login-tip'),
// 注册
	ruser = Util.getElement('#ruser'),
	rpassw = Util.getElement('#rpassw'),
	rpassw1 = Util.getElement('#rpassw1'),
	rjoin = Util.getElement('#rjoin'),
	rgroup = Util.getElement('#rgroup'),
	rsubmit = Util.getElement('#rsubmit'),
	rTips = Util.getElement('#register','.register-tip');

Util.addEvent(luser,'focus',function(){ 
	var username = document.cookie.split(';')[0].split('=')[1];
	this.value = this.value || username || '';
});

// 登录 提交
Util.addEvent(lsubmit,'click',function(e){ 
	Util.stopPropagation(Util.getEvent(e));
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	var luser_ok = false,
		lpassw_ok = false;
	if(!luser.value){ 
		Util.setText(lTips[0],'请输入邮箱');
		Util.removeClass(lTips[0],'hidden');
	}else if(!reg.test(luser.value)){ 
		Util.setText(lTips[0],'邮箱格式不正确');
		Util.removeClass(lTips[0],'hidden');
	}else{ 
		Util.addClass(lTips[0],'hidden');
		luser_ok = true;
	}

	if(!lpassw.value){ 
		Util.setText(lTips[1],'请输入密码');
		Util.removeClass(lTips[1],'hidden');
	}else{ 
		Util.addClass(lTips[1],'hidden');
		lpassw_ok = true;
	}

	if(!luser_ok || !lpassw_ok){ 
		return;
	}
	// 提交数据检查
	var info = { 
		user: luser.value,
		passw: lpassw.value
	};
	Util.ajax('post','./checkLogin.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		// 登录失败
		if(data.state == 0){ 
			Util.setText(lTips[2],'用户名或密码不正确');
			Util.removeClass(lTips[2],'hidden');
		}
		// 登录成功
		else if(data.state == 1){ 
			Util.addClass(lTips[2],'hidden');
			//保存用户名
			document.cookie = 'name='+info.user;
			location = './index.jsp';
		}else if(data.state == 100){ 
			Util.addClass(lTips[2],'hidden');
			location = './admin.jsp';
		}
	});
});
// 显示邀请码提示
var joinCode = Util.getElement('#joinCode');
Util.addEvent(joinCode,'mouseenter',function(e){ 
	Util.setText(rTips[3],'身份证明式的邀请码，暂时可先使用 12abc');
	Util.removeClass(rTips[3],'hidden');
});
Util.addEvent(joinCode,'click',function(e){ 
	Util.setText(rTips[3],'身份证明式的邀请码，暂时可先使用 12abc');
	Util.removeClass(rTips[3],'hidden');
});
// 注册 提交
Util.addEvent(rsubmit,'click',function(e){ 
	Util.stopPropagation(Util.getEvent(e));
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	var ruser_ok = false,
		rpassw_ok = false,
		rjoin_ok = false;
	if(!ruser.value){ 
		Util.removeClass(rTips[0],'hidden');
	}else if(!reg.test(ruser.value)){ 
		Util.setText(rTips[0],'邮箱格式不正确');
		Util.removeClass(rTips[0],'hidden');
	}else{ 
		Util.addClass(rTips[0],'hidden');
		ruser_ok = true;
	}

	if(!rpassw.value){ 
		Util.removeClass(rTips[1],'hidden');
	}else{ 
		Util.addClass(rTips[1],'hidden');
	}

	if(!rpassw1.value){ 
		Util.removeClass(rTips[2],'hidden');
	}else if(rpassw.value !== rpassw1.value){ 
		Util.setText(rTips[2],'两次密码不匹配');
		Util.removeClass(rTips[2],'hidden');
	}else{ 
		Util.addClass(rTips[2],'hidden');
		rpassw_ok = true;
	}

	if(!rjoin.value){ 
		Util.removeClass(rTips[3],'hidden');
	}else{ 
		Util.addClass(rTips[3],'hidden');
		rjoin_ok = true;
	}

	if(!ruser_ok || !rpassw_ok || !rjoin_ok){ 
		return;
	}
	// 提交数据检查
	var info = { 
		user: ruser.value,
		passw: rpassw.value,
		join: rjoin.value,
		group: rgroup.value
	};

	Util.ajax('post','./checkRegister.jsp',true,info,function(data){ 
		data = JSON.parse(data);

		// 注册失败 -- 邀请码错误
		if(data.state == 0){ 
			Util.setText(rTips[3],'无效的邀请码');
			Util.removeClass(rTips[3],'hidden');
		}
		// 注册成功
		else if(data.state == 1){ 
			Util.setText(rTips[4],'注册成功，去登录吧');
			Util.removeClass(rTips[4],'hidden');
			//保存用户名
			document.cookie = 'name='+info.user;
			setTimeout(function(){ 
				location.reload();
			},3000)
		}
		// 账号已经被注册
		else if(data.state == 2){ 
			Util.setText(rTips[4],'该账号已经有人使用了哦');
			Util.removeClass(rTips[4],'hidden');
		}
		// 注册失败 -- 未知错误
		else if(data.state == -1){ 
			Util.setText(rTips[4],'注册失败，请稍后再试');
			Util.removeClass(rTips[4],'hidden');
		}
	});
});