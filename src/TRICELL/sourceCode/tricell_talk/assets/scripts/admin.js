
var users = Util.getElement('#users'),
	threads = Util.getElement('#threads'),
	msgTip = Util.getElement('#msg-tip');

function showMsgTip(msg){ 
	Util.setText(msgTip,msg);
	Util.removeClass(msgTip,'dn');
	setTimeout(function(){ 
		Util.addClass(msgTip,'dn');
	},3000);
}

Util.addEvent(users,'click',function(e){  
	var node = Util.getTarget(Util.getEvent(e));
	var clazz = node.className;
	// 屏蔽
	if(clazz == 'u_handle1' || clazz == 'u_handle2' || clazz == 'u_handle3'){ 
		var info = { 
			area: 'users',
			item: Util.getText(node.parentNode.children[0].children[0]),
			type: clazz,
			type_state: Util.getText(node).indexOf('取消') ? '0' : '1'
		};
		Util.ajax('post','./admin_handle.jsp',true,info,function(data){ 
			data = JSON.parse(data);
			if(data.state == 0){ 
				showMsgTip('操作失败，请稍后再试!');
			}else if(data.state == 1){ 
				showMsgTip('操作成功,请刷新查看');
				setTimeout(function(){ 
					location.reload();
				},3000);
			}
		});
	}
});

Util.addEvent(threads,'click',function(e){  
	var node = Util.getTarget(Util.getEvent(e));
	var clazz = node.className;
	// 屏蔽
	if(clazz == 'u_handle1' || clazz == 'u_handle3'){ 
		
		var info = { 
			area: 'threads',
			item: node.parentNode.children[0].children[0].getAttribute('href').match(/&t=(\d+)/)[1],
			type: clazz,
			type_state: Util.getText(node).indexOf('取消') ? '0' : '1'
		};
		Util.ajax('post','./admin_handle.jsp',true,info,function(data){ 
			data = JSON.parse(data);
			if(data.state == 0){ 
				showMsgTip('操作失败，请稍后再试!');
			}else if(data.state == 1){ 
				showMsgTip('操作成功,请刷新查看');
				setTimeout(function(){ 
					location.reload();
				},3000);
			}
		});
	}
});
