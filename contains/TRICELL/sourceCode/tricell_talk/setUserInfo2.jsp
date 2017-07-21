<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String passwLast = request.getParameter("passwLast");
	String passwNext = request.getParameter("passwNext");
	String user = "" + session.getAttribute("user");

	Map<String,Object> map = new HashMap<String,Object>();
	Boolean has = false;
	// 检查原密码是否正确
	String exec = "select * from user where u_name='" + user + "' and u_password='"+passwLast+"'";

	SQL sql = new SQL();
	// 更新密码
	String exec1 = "update user set u_password='"+passwNext+"' where u_name='"+user+"'";

		if(sql.connect()){
		
			ResultSet rs = sql.executeQuery(exec);
			if(rs.next()){
				has = true;
			}
			

			
			if(has != true){ 
				map.put("state",0);
			}
			else{ 
				if(sql.executeUpdate(exec1)){ 
					map.put("state",1);
				}else{ 
					map.put("state",-1);
				}

			}
		}
		else{ 
			System.out.println("Connect Error!");
		}

	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
%>


