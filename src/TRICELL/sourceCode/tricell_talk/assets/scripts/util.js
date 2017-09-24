
	var Util = { 
		// 事件绑定
		addEvent: function(element,type,handler){ 
			if(!element) return;
			if(element.addEventListener){ 
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){ 
				element.attachEvent('on' + type,function(){ 
					handler.call(element);
				});
			}else{ 
				element['on' + type] = handler;
			}
		},

		//事件移除
		removeEvent: function(element,type,handler){ 
			if(element.removeEventListener){ 
				element.removeEventListener(type,handler,false);
			}else if(element.detachEvent){ 
				element.detachEvent('on' + type,function(){ 
					handler.call(element);
				});
			}else{ 
				element['on' + type] = null;
			}
		},

		// 事件冒泡阻止
		stopPropagation: function(ev){ 
			if(ev.preventDefault){ 
				ev.preventDefault();
			}else{ 
				ev.returnValue = false;
			}
		},

		// 获取event对象
		getEvent: function(e){ 
			return e || window.event;
		},

		// 获取事件目标
		getTarget: function(e){ 
			return e.target || e.srcElement;
		},

		// 获取当前鼠标坐标
		getCoords: function(e){ 
			if(e.pageX || e.pageY){ 
				return { 
					x: e.pageX,
					y: e.pageY
				};
			}else if(e.x || e.y){ 
				return { 
					x: e.x,
					y: e.y
				};
			}
			return { 
				x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
				y: e.clientY + document.body.scrollTop - document.body.clientTop
			};
		},

		// ajax 操作封装
		ajax: function(method,url,async,info,callback){ 
			ajaxHandle();
			// 创建xmlHttp对象
			function createXMLHttp(){ 
				if(window.XMLHttpRequest){ 
					xmlhttp = new window.XMLHttpRequest();
				}else if(window.ActiveXObject){ 
					xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
				}
				return xmlhttp;
			}
			// ajax操作数据返回
			function ajaxHandle(){ 
				var xmlhttp;
				xmlhttp = createXMLHttp();
				if(xmlhttp){ 
					xmlhttp.open(method,url,async);
					xmlhttp.onreadystatechange = function(){ 
						if(xmlhttp.readyState === 4){ 
							if(xmlhttp.status === 200){ 
								callback(xmlhttp.responseText);
							}
						}
					}
					if(method.toUpperCase() === 'POST'){
						xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
					}
					xmlhttp.send(Util.serialize(info));
				}
			} 
		},

		// 序列化参数 
		serialize: function(data){ 
			var str = '';
			for(var item in data){ 
				if(data.hasOwnProperty(item)){ 
					str += (item + '=' + data[item] + '&');
				}
			}
			return str.substring(0,str.length-1);
		},

		// Dom获取Element封装
		// 选择器1  选择器2 
		getElement: function(selector1,selector2,contt){ 
			// 如果第一个选择符不符合直接返回
			if(!selector1 || typeof selector1 !== 'string'){ 
				return;
			}
			// 通过class获取元素
			function getByClass(clazz,context){ 
				context = context ? context : document;
				var tags = getByTagName('*',context),
					reg = new RegExp('\\b' + clazz + '\\b'),
					clazzObj = [];
				for(var i=0,j=tags.length; i<j; ++i){ 
					if(tags[i].nodeType === 1){ 
						var className = tags[i].getAttribute('class');
						if(reg.test(className)){ 
							clazzObj.push(tags[i]);
						}
					}
				}
				return clazzObj;
			}
			// 通过tagName获取元素
			function getByTagName(tagName,context){ 
				context = context ? context : document;
				return context.getElementsByTagName(tagName);
			}
			
			//如果只第一个选择器为id
			if(selector1[0] === '#'){ 
				// cont变为selector1
				var cont = document.getElementById(selector1.slice(1));
				if(selector2){ 
					return selector2[0] === '#' ? document.getElementById(selector2.slice(1))
						: selector2[0] === '.' ? getByClass(selector2.slice(1),cont)
						: getByTagName(selector2,cont);
				}
				return cont;
			}

			//如果只第一个选择器为class
			if(selector1[0] === '.'){ 
				return getByClass(selector1.slice(1),contt);
			}

			// 否则如果第一个选择器为tagName
			return getByTagName(selector1,contt);
		},

		// 对Dom的一些class操作
		hasClass: function(obj,cls){ 
			var reg = new RegExp('\\b' + cls + '\\b');
			return reg.test(obj.className);
		},
		addClass: function(obj,cls){ 
			if(!Util.hasClass(obj,cls)){ 
				// 如果原本无class则不加空格
				var str = obj.className ? ' ' + cls : cls;
				obj.className += str;
			}
		},
		removeClass: function(obj,cls){ 
			if(obj.className){ 
				var reg = new RegExp('\\b' + cls + '\\b');
				// 去除该class后清除前后&中间多余空格
				obj.className = obj.className.replace(reg,'')
					.replace(/\s\s/g,' ').replace(/^\s*|\s*$/g,'');
			}
			return;
		},
		toggleClass: function(obj,cls){ 
			if(Util.hasClass(obj,cls)){ 
				Util.removeClass(obj,cls);
			}else{ 
				Util.addClass(obj,cls);
			}
		},

		// 获取text
		getText: function(element){ 
			return element.textContent || element.innerText;
		},
		// 设置text
		setText: function(element,text){ 
			if(element.textContent){ 
				element.textContent = text;
			}else{ 
				element.innerText = text;
			}
		},

		// 动态加载脚本
		addScript: function(src){ 
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = src;
			document.body.appendChild(script);
		},

		// 获取url参数对应值
		getArgs: function(arg){ 
			var search = location.href.slice(location.href.indexOf('?'));
			if(!search){ 
				return;
			}
			var items = search.split('&');
			for(var i=0,j=items.length; i<j; ++i){ 
				var item = items[i].split('=');
				if(item[0] === arg){ 
					return item[1];
				}
			}
			return;
		}
	};