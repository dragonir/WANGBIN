<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*,java.util.Date,java.text.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String name = "" + session.getAttribute("user");
	String remark = request.getParameter("remark");
	String tId = request.getParameter("tId");

	SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	String time = formater.format(new Date());
	Map<String,Object> map = new HashMap<String,Object>();

	SQL sql = new SQL();
	String userId = "",
		remarkId = "";
	String exec_getUserId = "select u_id from user where u_name='" + name + "'";
	
	
		if(sql.connect()){
		//out.println("Connect Ok!");
			ResultSet rs = sql.executeQuery(exec_getUserId);
			while(rs.next()){
				userId = "" + rs.getInt("u_id");
			}
			String exec_addRemark = "insert into remark(u_id,r_description,r_time) values('"+userId+"','"+remark+"','"+time+"')";
			sql.executeUpdate(exec_addRemark);
			
			String exec_getRemarkId = "select r_id from remark where u_id='"+userId+"' and r_description='"+remark+"' and r_time='"+time+"'";
			rs = sql.executeQuery(exec_getRemarkId);
			while(rs.next()){
				remarkId = "" + rs.getInt("r_id");
			}

			String exec_addRemarks = "insert into remarks(r_id,t_id) values('"+remarkId+"','"+tId+"')";
			if(sql.executeUpdate(exec_addRemarks)){ 
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