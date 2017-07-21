<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String nickname = request.getParameter("nickname");
	String sex = request.getParameter("sex");
	String age = request.getParameter("age");
	String address = request.getParameter("address");
	String description = request.getParameter("description");
	String user = "" + session.getAttribute("user");

	Map<String,Object> map = new HashMap<String,Object>();

	SQL sql = new SQL();
	// 更新资料
	String exec = "update user set u_nickname='"+nickname+"',u_sex='"+sex+"',u_age='"+age+"',u_address='"+address+"',u_description='"+description+"' where u_name='"+user+"'";

		if(sql.connect()){
			if(sql.executeUpdate(exec)){ 
				map.put("state",1);
			}else{ 
				map.put("state",-1);
			}
		}else{ 
			System.out.println("Connect Error!");
		}

	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
%>