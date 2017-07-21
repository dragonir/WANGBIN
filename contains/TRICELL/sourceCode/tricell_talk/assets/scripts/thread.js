
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

Util.ajax('post','./infos_thread.jsp',true,info,function(data){ 
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
			try{
				Util.addClass(Util.getElement('#addThread-wrap','h4')[0],'dn');
				Util.addClass(Util.getElement('#newThread-btn'),'dn');
			}catch(e){ 
				console.log(e.message);
				Util.addClass(Util.getElement('#remarkIt'),'dn');
			}
		}

		// 获取公共区最新主题部分
		var threadsInfo = data.threadsInfo;
		var threadsLi = Util.getElement('#thread-list','li');
		for(var i=0,j=threadsInfo.length; i<j; ++i){ 

			var threadTitle = Util.getElement('.thread-title','**',threadsLi[i+1]),
				threadUser = Util.getElement('.thread-user','**',threadsLi[i+1]),
				threadUserTime = Util.getElement('.thread-user-time','**',threadsLi[i+1]),
				remarkNums = Util.getElement('.remark-nums','**',threadsLi[i+1]);
				remarkUser = Util.getElement('.remark-user','**',threadsLi[i+1]);
				remarkUserTime = Util.getElement('.remark-user-time','**',threadsLi[i+1]);
			
			Util.setText(threadTitle,threadsInfo[i].threadTitle);
			Util.setText(threadUser,threadsInfo[i].threadUser);
			Util.setText(threadUserTime,threadsInfo[i].threadUserTime);
			Util.setText(remarkNums,threadsInfo[i].remarkNums);
			Util.setText(remarkUser,threadsInfo[i].remarkUser);
			Util.setText(remarkUserTime,threadsInfo[i].remarkUserTime);
		}
	}

});

// 发布主题点击
var addThread = Util.getElement('#addThread-wrap'),
	newThreadBg = Util.getElement('#newThread_bg'),
	newThreadWrap = Util.getElement('#newThread-wrap'),
	newThreadBtn = Util.getElement('#newThread-btn'),
	newThreadTip = Util.getElement('#newThread-tip'),
	newThreadClose = Util.getElement('#newThread-wrap','.close')[0],
	newTitle = Util.getElement('#new_title'),
	newContent = Util.getElement('#new_content'),
	group1 = Util.getElement('#group1'),
	group2 = Util.getElement('#group2');

// 弹出层新主题
Util.addEvent(addThread,'click',function(e){　
	Util.removeClass(newThreadBg,'dn');
	Util.removeClass(newThreadWrap,'dn');
});
Util.addEvent(newThreadClose,'click',function(e){　
	Util.addClass(newThreadBg,'dn');
	Util.addClass(newThreadWrap,'dn');
});
function showTip(msg){ 
	Util.setText(newThreadTip,msg);
	Util.removeClass(newThreadTip,'dn');
	setTimeout(function(){ 
		Util.addClass(newThreadTip,'dn');
	},3000);
}
Util.addEvent(newThreadBtn,'click',function(e){　
	var title = '',
		content = '';
	try{ 
		title = Util.getText(newTitle);
		content = newContent.innerHTML;
	}catch(e){ 
		content = Util.getText(newContent);
	}
	var group = group1.checked ? group1.value : group2.value;
	if(!title || !content){ 
		showTip('主题项不能为空');
		return;
	}
	var info = { 
		group: group,
		title: title,
		content: content
	};
	// 发布新主题
	Util.ajax('post','./addThread.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		//发布成功
		if(data.state == 1){ 
			showTip('发布成功，请刷新查看');
			setTimeout(function(){ 
				newThreadClose.click();
				location.reload();
			},5000);

		}
		//发布失败
		else if(data.state == 0){ 
			showTip('评论失败，请稍后再试');
		}
	});
});

// 分页点击事件处理
var page = Util.getElement('#page'),
	spans = Util.getElement('#page','span'),
	first = Util.getElement('#page','.first')[0],
	pre = Util.getElement('#page','.pre')[0],
	one = Util.getElement('#page','.one')[0],
	two = Util.getElement('#page','.two')[0],
	three = Util.getElement('#page','.three')[0],
	four = Util.getElement('#page','.four')[0],
	five = Util.getElement('#page','.five')[0],
	next = Util.getElement('#page','.next')[0],
	last = Util.getElement('#page','.last')[0],
	total = Util.getElement('#page','.total')[0],
	toPage = Util.getElement('#toPage'),
	goPage = Util.getElement('#goPage');

// 加上当前页激活样式
for(var i=0,j=spans.length; i<j; ++i){ 
	if(Util.getText(spans[i]) == (Util.getArgs('pn') || '1')){ 
		Util.addClass(spans[i],'active');
	}if(parseInt(Util.getArgs('pn')) <= 0){ 
		Util.addClass(spans[2],'active');
	}
}
Util.addEvent(page,'click',function(e){ 
	var node = Util.getTarget(Util.getEvent(e));
	var index = location.href.lastIndexOf('&pn=');
	if(node == total || node == toPage){ 
		return;
	}
	// 跳页
	if(node == goPage){ 
		if(!toPage.value){ 
			return;
		}else{ 
			location.href = index === -1 ? location.href.replace(/#$/,'') + '&pn=' + toPage.value
				: location.href.slice(0,index+4) + toPage.value;
		}
	}else{
	// 
	location.href = index === -1 ? location.href.replace(/#$/,'') + '&pn=' + node.getAttribute('data-pn')
				: location.href.slice(0,index+4) + node.getAttribute('data-pn');
	}
});