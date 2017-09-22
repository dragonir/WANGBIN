<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*,java.util.Date,java.text.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String name = "" + session.getAttribute("user");
	String content = request.getParameter("content");
	String title = request.getParameter("title");
	String group = request.getParameter("group");

	SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	String time = formater.format(new Date());
	Map<String,Object> map = new HashMap<String,Object>();

	SQL sql = new SQL();
	String userId = "",
		threadId = "";
	String exec_getUserId = "select u_id from user where u_name='" + name + "'";
	
		if(sql.connect()){
		//out.println("Connect Ok!");
			ResultSet rs = sql.executeQuery(exec_getUserId);
			while(rs.next()){
				userId = "" + rs.getInt("u_id");
			}
			String exec_addThread = "insert into thread(t_title,t_description,t_time) values('"+title+"','"+content+"','"+time+"')";
			sql.executeUpdate(exec_addThread);
			
			String exec_getThreadId = "select t_id from thread where t_title='"+title+"' and t_description='"+content+"' and t_time='"+time+"'";
			rs = sql.executeQuery(exec_getThreadId);
			while(rs.next()){
				threadId = "" + rs.getInt("t_id");
			}

			String exec_addThreads = "insert into threads(u_id,t_id,g_id) values('"+userId+"','"+threadId+"','"+group+"')";
			if(sql.executeUpdate(exec_addThreads)){ 
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