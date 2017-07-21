// 提交评论时间绑定
var remarkItContent = Util.getElement('#remarkIt','.remarkIt-content')[0],
	remarkItBtn = Util.getElement('#remarkIt','.remarkIt-btn')[0],
	remarkItTip = Util.getElement('#remarkIt-tip');

function showTip(msg){ 
	Util.setText(remarkItTip,msg);
	Util.removeClass(remarkItTip,'dn');
	setTimeout(function(){ 
		Util.addClass(remarkItTip,'dn');
	},3000);
}
//  数据输入换行处理
Util.addEvent(remarkItContent,'keypress',function(e){ 
	if(Util.getEvent(e).keyCode === 13){ 
		//console.log(Util.getText(remarkItContent));
		//Util.setText(remarkItContent,Util.getText(remarkItContent) + '\n\r');
	}
});
Util.addEvent(remarkItBtn,'click',function(e){ 
	var content = '';
	try{ 
		content = remarkItContent.innerHTML;
	}catch(e){ 
		content = Util.getText(remarkItContent);
	}
	 
	if(!content){ 
		showTip('评论内容不能为空');
		return;
	}
	//console.log(content.replace(/<br>/g,'\r\n'));
	var info = { 
		remark: content,
		tId: Util.getArgs('t')
	};
	Util.ajax('post','./addRemark.jsp',true,info,function(data){ 
		data = JSON.parse(data);
		//评论成功
		if(data.state == 1){ 
			showTip('评论成功，请刷新查看');
			setTimeout(function(){ 
				location.reload();
			},5000);
		}
		//评论失败
		else if(data.state == 0){ 
			showTip('评论失败，请稍后再试');
		}
	});
});

Util.addScript('./asserts/scripts/getUsersInfo.js');