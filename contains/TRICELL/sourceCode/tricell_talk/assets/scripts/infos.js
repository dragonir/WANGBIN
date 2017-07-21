
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

Util.ajax('post','./infos.jsp',true,info,function(data){ 
	data = JSON.parse(data);
	// 请求错误
	if(data.state == 0){ 
		return;
	}
	else if(data.state == 1){ 
		// 获取个人信息部分
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
		// 获取各部门数据部分
		var groupsInfo = data.groupsInfo;
		var groupsContent = Util.getElement('#group-list','.group-content');
		for(var i=0,j=groupsContent.length; i<j; ++i){ 
			var index = i === 0 ? 8  : i-1;
			var img = Util.getElement('img','**',groupsContent[i])[0],
				pNum = Util.getElement('.p-num','**',groupsContent[i])[0],
				tNum = Util.getElement('.t-num','**',groupsContent[i])[0],
				tTime = Util.getElement('.t-time','**',groupsContent[i])[0];
			img.setAttribute('src',groupsInfo.img[index]);
			Util.setText(pNum,groupsInfo.pNum[index] || 0);
			Util.setText(tNum,groupsInfo.tNum[index] || 0);
			Util.setText(tTime,groupsInfo.tTime[index] || '1970-01-01 00:00:00');
		}

		// 获取公共区最新主题部分
		var threadsInfo = data.threadsInfo;
		
		var threadsLi = Util.getElement('#thread-list','li');
		for(var i=0,j=threadsLi.length - 1; i<j; ++i){ 
			var threadTitle = Util.getElement('.thread-title','**',threadsLi[i+1])[0],
				threadUser = Util.getElement('.thread_user','**',threadsLi[i+1])[0],
				threadUserTime = Util.getElement('.thread-user-time','**',threadsLi[i+1])[0],
				remarkNums = Util.getElement('.remark_nums','**',threadsLi[i+1])[0],
				remarkUser = Util.getElement('.remark_user','**',threadsLi[i+1])[0],
				remarkUserTime = Util.getElement('.remark-user-time','**',threadsLi[i+1])[0];

			threadTitle.setAttribute('href',threadTitle.getAttribute('href')+threadsInfo.threadId[i]);
			remarkNums.setAttribute('href',remarkNums.getAttribute('href')+threadsInfo.threadId[i]);
			Util.setText(threadTitle,threadsInfo.threadTitle[i]);
			Util.setText(threadUser,threadsInfo.threadUser[i]);
			Util.setText(threadUserTime,threadsInfo.threadUserTime[i]);
			Util.setText(remarkNums,threadsInfo.remarkNums[i] || 0);
			Util.setText(remarkUser,threadsInfo.remarkUser[i] || '无');
			Util.setText(remarkUserTime,threadsInfo.remarkUserTime[i] || '1970-01-01 00:00:00');
		}
	}

	Util.addScript('./asserts/scripts/getUsersInfo.js');
});


// 部门列表事件绑定
var groupEctWrap = Util.getElement('#group-ect','.group-ect-wrap'),
	groupGlobalWrapl = Util.getElement('#group-global','.global-wrapl'),
	groupGlobalContent = Util.getElement('#group-global','.group-content'),
	groupEctBtn = Util.getElement('#group-ect-btn','span'),
	groupEctContent = Util.getElement('#group-ect','.group-content');

// 每4秒钟自动触发切换
var t1 = setInterval(function(){ 
	groupEctBtn[1].click();
},4*1000);
var t0 = setInterval(function(){ 
	groupEctBtn[0].click();
},8*1000);

// 左右切换开关事件绑定
Util.addEvent(groupEctBtn[0],'click',function(e){ 
	Util.addClass(groupEctBtn[0],'btn-active');
	Util.removeClass(groupEctBtn[1],'btn-active')
	Util.removeClass(groupEctWrap[0],'dn');
	Util.addClass(groupEctWrap[1],'dn');
});
Util.addEvent(groupEctBtn[1],'click',function(e){ 
	Util.addClass(groupEctBtn[1],'btn-active');
	Util.removeClass(groupEctBtn[0],'btn-active')
	Util.removeClass(groupEctWrap[1],'dn');
	Util.addClass(groupEctWrap[0],'dn');
});

// 公共区鼠标滑入事件绑定
Util.addEvent(groupGlobalContent[0],'mouseenter',function(e){ 
	Util.addClass(groupGlobalWrapl[0],'hover');
});
Util.addEvent(groupGlobalContent[0],'mouseleave',function(e){ 
	Util.removeClass(groupGlobalWrapl[0],'hover');
});
