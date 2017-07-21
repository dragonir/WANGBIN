<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String area = "" + request.getParameter("area");
	String item =  "" + request.getParameter("item");
	String type =  "" + request.getParameter("type");
	String type_state = "" +  request.getParameter("type_state");

	Map<String,Object> map = new HashMap<String,Object>();
	SQL sql = new SQL();
	String exec = "";
	String exec1 = "";
	// 如果是管理用户
	if(area.equals("users")){ 
		// 删除用户
		if(type.equals("u_handle3")){ 
			exec = "delete from user where u_name='"+item+"'";
		}
		// 设置屏蔽
		if(type.equals("u_handle1")){ 
			exec = "update user set u_state_thread='"+type_state+"' where u_name='"+item+"'";
		}
		// 设置禁言
		if(type.equals("u_handle2")){ 
			exec = "update user set u_state_user='"+type_state+"' where u_name='"+item+"'";
		}
	}
	// 如果是管理主题
	else if(area.equals("threads")){ 
		// 删除主题
		if(type.equals("u_handle3")){ 
			exec = "delete from threads where t_id='"+item+"'";
			exec1 = "delete from thread where t_id='"+item+"'";
		}
		// 设置屏蔽
		if(type.equals("u_handle1")){ 
			exec = "update threads set t_state='"+type_state+"' where t_id='"+item+"'";
		}
	}
	if(sql.connect()){
		//out.println("Connect Ok!");
		if(exec1.equals("")){ 
			if(sql.executeUpdate(exec)){ 
				map.put("state",1);
			}else{ 
				map.put("state",0);
			}
		}else{ 
			if(sql.executeUpdate(exec) && sql.executeUpdate(exec1)){ 
				map.put("state",1);
			}else{ 
				map.put("state",0);
			}
		}

	}else{ 
		System.out.println("Connect Error!");
	}

	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
%>