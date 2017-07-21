<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*,java.util.Date,java.text.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String name = "" + session.getAttribute("user");
	String tId = request.getParameter("tId");

	Map<String,Object> map = new HashMap<String,Object>();

	SQL sql = new SQL();
	String userId = "",
		threadId = "";
	String exec_thread = "delete from thread where t_id='" + tId + "'";
	String exec_threads = "delete from threads where t_id='" + tId + "'";
	
		if(sql.connect()){
			if(sql.executeUpdate(exec_thread) && sql.executeUpdate(exec_threads)){ 
				map.put("state",1);
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