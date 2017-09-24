<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String userNext = request.getParameter("userNext");
	String user = "" + session.getAttribute("user");

	Map<String,Object> map = new HashMap<String,Object>();
	Boolean has = false;
	// 检查账号是否被注册
	String exec = "select * from user where u_name='" + userNext + "'";

	SQL sql = new SQL();
	// 更新账号
	String exec1 = "update user set u_name='"+userNext+"' where u_name='"+user+"'";
		if(sql.connect()){
		
			ResultSet rs = sql.executeQuery(exec);
			if(rs.next()){
				has = true;
			}
			// 如果匹配到记录
			if(has == true){ 
				map.put("state",0);
			}
			else{ 
				if(!user.equals("admin@qq.com") && sql.executeUpdate(exec1)){ 
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