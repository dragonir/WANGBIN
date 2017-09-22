// 退出登录处理
var logout = Util.getElement('#logout');

Util.addEvent(logout,'click',function(e){ 
	Util.stopPropagation(Util.getEvent(e));
	// 退出登录处理
	var info = { 
		type: 'logout'
	};
	Util.ajax('post','./logout.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		// 如果注销不成功
		if(data.state == 0){ 
			return;
		}
		// 注销成功
		else if(data.state == 1){ 
			location = './login.html';
		}
	});
});

// 获取个人信息
var pImg = Util.getElement('#self','img')[0],
	pName = Util.getElement('#self','a')[0];

var info = { 
	user: Util.getText(pName)
};
// 右侧信息框展示切换
var changeInfoBtn = Util.getElement('#content-left','.changeInfo')[0],
	changeUserBtn = Util.getElement('#content-left','.changeUser')[0],
	changethread = Util.getElement('#content-right-threads'),
	changeInfo = Util.getElement('#content-right-changeInfo'),
	changeUser = Util.getElement('#content-right-changeUser');

Util.addEvent(changeInfoBtn,'click',function(){ 
	Util.addClass(changethread,'dn');
	Util.addClass(changeUser,'dn');
	Util.removeClass(changeInfo,'dn');
});
Util.addEvent(changeUserBtn,'click',function(){ 
	Util.addClass(changethread,'dn');
	Util.addClass(changeInfo,'dn');
	Util.removeClass(changeUser,'dn');
});



// 获取左侧基本信息
var limg = Util.getElement('#content-left','img')[0],
	lnickname = Util.getElement('#content-left','.nickname')[0],
	lsex = Util.getElement('#content-left','.sex')[0],
	lage = Util.getElement('#content-left','.age')[0],
	lgroup = Util.getElement('#content-left','.group')[0],
	laddress = Util.getElement('#content-left','.address')[0],
	ldescription = Util.getElement('#content-left','.description')[0],
	ltime = Util.getElement('#content-left','.time')[0],
	lthreadNum = Util.getElement('#content-left','.threadNum')[0],

	rnickname = Util.getElement('#nickname'),
	rsex1 = Util.getElement('#sex1'),
	rsex2 = Util.getElement('#sex2'),
	rage = Util.getElement('#age'),
	rgroup = Util.getElement('#group'),
	raddress = Util.getElement('#address'),
	rdescription = Util.getElement('#description'),
	rtime = Util.getElement('#time'),
	submit_changeInfo = Util.getElement('#submit_changeInfo'),

	userLast = Util.getElement('#user-last'),
	userNext = Util.getElement('#user-next'),
	submit_changeUser_1 = Util.getElement('#submit_changeUser_1'),

	passwLast = Util.getElement('#passw-last'),
	passwNext1 = Util.getElement('#passw-next1'),
	passwNext2 = Util.getElement('#passw-next2'),
	submit_changeUser_2 = Util.getElement('#submit_changeUser_2'),

	tip = Util.getElement('#tip'),
	tipP = Util.getElement('#tip','p')[0];

// 初始获取账户信息
	Util.ajax('get','./getUserInfo.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		if(data.state == 0){ 
			return;
		}
		else if(data.state == 1){ 
			// 获取个人信息头部部分
			var selfInfo = data.selfInfo;
			pImg.setAttribute('src',selfInfo.img);
			Util.setText(pName,selfInfo.nickname);
			pName.setAttribute("href","./pInfo.jsp?u=" + selfInfo.name);
			
			var headerTip = Util.getElement('#header_tip');			
		if(selfInfo.u_state_thread == '0'){ 
			Util.setText(headerTip,'您发布的主题已被管理员屏蔽！');
			Util.removeClass(headerTip,'dn');
		}
		if(selfInfo.u_state_user == '0'){ 
			Util.setText(headerTip,'您已被管理员禁言，主题被屏蔽，且无法发布主题、回复主题！');
			Util.removeClass(headerTip,'dn');
		}
		console.log(selfInfo.name);
		if(selfInfo.name == 'admin@qq.com'){ 
			headerTip.innerHTML = '欢迎您，<a href="./admin.jsp">管理员！</a>';
			Util.removeClass(headerTip,'dn');
		}
			// 获取个人信息其余部分
			var ssex = selfInfo.sex == 'male' ? '男' : '女';
			limg.setAttribute('src',selfInfo.img);
			Util.setText(lnickname,selfInfo.nickname);
			Util.setText(lsex,ssex);
			Util.setText(lage,selfInfo.age);
			Util.setText(lgroup,selfInfo.group);
			Util.setText(laddress,selfInfo.address);
			Util.setText(ldescription,selfInfo.description);
			Util.setText(ltime,selfInfo.time);
			Util.setText(lthreadNum,selfInfo.threadNum || 0);

			rnickname.value = selfInfo.nickname;
			var rsex = selfInfo.sex == 'male' ? rsex1 : rsex2;
			rsex.setAttribute('checked','checked');
			rage.value = selfInfo.age;
			Util.setText(rgroup,selfInfo.group);
			raddress.value = selfInfo.address;
			rdescription.value = selfInfo.description;
			Util.setText(rtime,selfInfo.time);

			Util.setText(userLast,selfInfo.name);

		}
	});

// 删除主题
var deleteThreadBtns = Util.getElement('#content-right-threads');
Util.addEvent(deleteThreadBtns,'click',function(e){ 
	var node = Util.getTarget(Util.getEvent(e));
	if(node.className !== 'delete'){ 
		return;
	}
	//console.log(node.parentNode.f);
	var aTitle = node.parentNode.children[0].children[0];
	
	var info = { 
		tId: aTitle.getAttribute('href').match(/t=(\d+)/)[1]
	};
	console.log(info);
	Util.ajax('post','./deleteThread.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		if(data.state == 0){ 
			showTip('删除失败，请稍后再试');
			return;
		}else if(data.state == 1){ 
			showTip('删除成功，请刷新查看');
			setTimeout(function(){ 
				location.reload();
			},5000);
		}

	});
});


// 绑定事件 -- 处理账户信息修改
function showTip(msg){ 
	Util.setText(tipP,msg);
	Util.removeClass(tip,'dn');
	setTimeout(function(){ 
		Util.addClass(tip,'dn');
	},3000);
}
// 提交基本信息
Util.addEvent(submit_changeInfo,'click',function(e){ 
	Util.stopPropagation(Util.getEvent(e));

	if(!rnickname.value){ 
		showTip('昵称不能为空哦');
		return;
	}
	// 提交修改

	var info = { 
		nickname: rnickname.value,
		sex: rsex1.checked ? 'male' : 'female',
		age: rage.value,
		address: raddress.value,
		description: rdescription.value
	};
	Util.ajax('post','./setUserInfo.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		if(data.state == 1){ 
			showTip('资料修改成功，请刷新查看');
		}
		if(data.state == -1){ 
			showTip('未知错误，请稍后再试');
		}
	});

});

// 提交1
Util.addEvent(submit_changeUser_1,'click',function(e){ 
	Util.stopPropagation(Util.getEvent(e));
	// 新(邮箱)账户格式不正确
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!(userNext.value)){ 
		showTip('请输入新账号');
		return;
	}
	else if(!reg.test(userNext.value)){ 
		showTip('邮箱格式不正确');
		return;
	}
	// 提交修改
	var info = { 
		userNext: userNext.value
	};
	Util.ajax('post','./setUserInfo1.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		if(data.state == 1){ 
			showTip('账户修改成功，请刷新查看');
		}
		if(data.state == 0){ 
			showTip('账户已存在');
		}
		if(data.state == -1){ 
			showTip('未知错误，请稍后再试');
		}
	});

});

// 提交2
Util.addEvent(submit_changeUser_2,'click',function(e){ 
	Util.stopPropagation(Util.getEvent(e));

	if(!passwLast.value || !passwNext1.value|| !passwNext2.value){ 
		showTip('密码项不能为空');
		return;
	}
	else if(passwNext1.value !== passwNext2.value){ 
		showTip('两次密码不一致');
		return;
	}
	// 提交修改
	var info = { 
		passwLast: passwLast.value,
		passwNext: passwNext1.value
	};
	Util.ajax('post','./setUserInfo2.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		if(data.state == 1){ 
			showTip('密码修改成功，请重新登录...');
			setTimeout(function(){ 
				logout.click();
			},2000);
		}
		if(data.state == 0){ 
			showTip('原密码不正确');
		}
		if(data.state == -1){ 
			showTip('未知错误，请稍后再试');
		}
	});

});