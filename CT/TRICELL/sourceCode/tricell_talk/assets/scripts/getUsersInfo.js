//鼠标悬停某用户则显示其账户信息
var users = Util.getElement('.username'),
	showUserInfoTip = Util.getElement('#showUserInfoTip'),
	infoImg = Util.getElement('#showUserInfoTip','img')[0],
	infoNickname = Util.getElement('#showUserInfoTip','.nickname')[0],
	infoSex = Util.getElement('#showUserInfoTip','.sex')[0],
	infoGroup = Util.getElement('#showUserInfoTip','.group')[0],
	infoThreadNum = Util.getElement('#showUserInfoTip','.threadNum')[0];

for(var i=0,j=users.length; i<j; ++i){ 
	(function(_i){ 
		var userName = Util.getText(users[_i]);
		// 鼠标滑入则显示该用户信息
		Util.addEvent(users[_i],'mouseenter',function(e){ 
			var coords = Util.getCoords(Util.getEvent(e));
			showUserInfo(userName,coords);
		});
		// 鼠标划出三秒后隐藏
		Util.addEvent(users[_i],'mouseleave',function(e){ 
			setTimeout(function(){ 
				Util.addClass(showUserInfoTip,'dn');
			},3000);
		});
	})(i)
}

// 显示用户信息
function showUserInfo(username,coords){ 

	if(!username || username === '无'){ 
		return;
	}
	var info = { 
		username: username
	};
	Util.ajax('post','./getUsersInfo.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		if(data.state == 1){ 

			infoImg.setAttribute('src',data.UserInfo.img);
			Util.setText(infoNickname,data.UserInfo.nickname);
			var sex = data.UserInfo.sex == 'male' ? '男' : '女';
			Util.setText(infoSex,sex);
			Util.setText(infoGroup,data.UserInfo.group);
			Util.setText(infoThreadNum,data.UserInfo.threadNum || 0);

			showUserInfoTip.style.left = (coords.x - 50) + 'px';
			showUserInfoTip.style.top = (coords.y - 140) + 'px';
			Util.removeClass(showUserInfoTip,'dn');
		}
		else if(data.state == 0){ 

		}
	});
}