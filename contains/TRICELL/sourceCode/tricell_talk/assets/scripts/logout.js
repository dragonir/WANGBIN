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
