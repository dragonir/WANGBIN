<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String name = request.getParameter("user");
	String password = request.getParameter("passw");

	Map<String,Object> map = new HashMap<String,Object>();
	Boolean has = false;

	SQL sql = new SQL();
	String exec = "select groups.g_id,groups.g_name from user inner join groups on user.g_id=groups.g_id where u_name='" + name + "' and u_password='" + password + "'";
	String groupId = "";
	String groupName = "";
		if(sql.connect()){
		//out.println("Connect Ok!");
			ResultSet rs = sql.executeQuery(exec);
			if(rs.next()){
				has = true;
				groupId = rs.getString("g_id");
				groupName = rs.getString("g_name");
			}
			// 如果匹配到记录
			if(has == true){ 
				// 如果是超级管理员
				if(name.equals("admin@qq.com")){ 
					map.put("state",100);
				}else{
				 	map.put("state",1);
				 }
				session.setAttribute("user",name);
				session.setAttribute("groupId",groupId);
				session.setAttribute("groupName",groupName);
			}else{ 
				map.put("state",0);
			}
		}else{ 
			System.out.println("Connect Error!");
		}

	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
%>