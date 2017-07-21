<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>
<%
	request.setCharacterEncoding("utf-8");
	String username = "" + request.getParameter("username");
	Map<String,Object> map = new HashMap<String,Object>();
	Map<String,Object> map1 = new HashMap<String,Object>();
	String name = "" + session.getAttribute("user");
	String groupId = "";
	
	// 未登录 请求无效
	if(name.equals("null")){ 
		map.put("state",0);
	}
	else{ 
		map.put("state",1);
		SQL sql = new SQL();

		String exec_user = "select * from user where u_name='" + username + "'";
		String exec_threadNum = "select user.u_name,count(t_id) as threadNum from threads inner join user on threads.u_id=user.u_id group by user.u_id having user.u_name='"+username+"'";
		if(sql.connect()){
		// 获取该账号个人信息，昵称等
			ResultSet rs = sql.executeQuery(exec_user);
			while(rs.next()){
				map1.put("img",rs.getString("u_img"));
				map1.put("nickname",rs.getString("u_nickname"));
				map1.put("sex",rs.getString("u_sex"));
				groupId = "" + rs.getInt("g_id");
			}
			String exec_group = "select * from groups where g_id='" + groupId + "'";
			rs = sql.executeQuery(exec_group);
			while(rs.next()){
				map1.put("group",rs.getString("g_name"));
			}
			 rs = sql.executeQuery(exec_threadNum);
			while(rs.next()){
				map1.put("threadNum",rs.getString("threadNum"));
			}
		}
	}
	
	// 存储各项
	map.put("UserInfo",map1);
	
	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
%>