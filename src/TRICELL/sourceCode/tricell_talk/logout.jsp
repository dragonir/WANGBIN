<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>

<%
	request.setCharacterEncoding("utf-8");
	String type = request.getParameter("type");
	Map<String,Object> map = new HashMap<String,Object>();

	if(type.equals("logout")){ 
		session.removeAttribute("user");
		map.put("state",1);
	}else{ 
		map.put("state",0);
	}

	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
	
%>