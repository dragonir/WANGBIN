<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String user = request.getParameter("user");
	Map<String,Object> map = new HashMap<String,Object>();
	Map<String,Object> map1 = new HashMap<String,Object>(); // selfInfo
	Map<String,Object> map3 = new HashMap<String,Object>(); // threadsInfo
	String name = "" + session.getAttribute("user");
	String groupId = "" + session.getAttribute("groupId");
	
	// 未登录 请求无效
	if(name.equals("null") || !name.equals("admin@qq.com")){ 
		map.put("state",0);
	}
	
	else{ 
		map.put("state",1);
		SQL sql = new SQL();

		String exec_self = "select * from user where u_name='" + name + "'";

		String exec_thread1 = "create or replace view infosThread1 as select threads.g_id,threads.u_id,threads.t_id,count(r_id) as remarkNums from threads inner join remarks on threads.t_id=remarks.t_id group by t_id having g_id='"+groupId+"'";
		String exec_thread2 = "select infosThread1.g_id,user.u_id,u_name,thread.t_id,thread.t_title,remarkNums,t_time,r_time from infosThread1 right join thread on infosThread1.t_id=thread.t_id inner join user on infosThread1.u_id=user.u_id inner join remarks on thread.t_id=remarks.t_id inner join remark on remarks.r_id=remark.r_id";

		if(sql.connect()){
		// 获取该账号个人信息，昵称等
			ResultSet rs = sql.executeQuery(exec_self);
			while(rs.next()){
				map1.put("img",rs.getString("u_img"));
				map1.put("name",rs.getString("u_name"));
				map1.put("nickname",rs.getString("u_nickname"));
			}
		
		// 获取各部门区回复
			sql.executeUpdate(exec_thread1);
			rs = sql.executeQuery(exec_thread2);
			while(rs.next()){
				map3.put("threadTitle",rs.getString("t_title"));
				map3.put("threadUser",rs.getString("u_name"));
				map3.put("threadUserTime","2015-09-09");
				map3.put("remarkNums",rs.getString("remarkNums"));
				map3.put("remarkUser",rs.getString("u_name"));
				map3.put("remarkUserTime","2015-09-09");
			}
		}
		else{ 
			System.out.println("Connect Error!");
		}
	}
	
	// 存储各项
	map.put("selfInfo",map1);
	map.put("threadsInfo",map3);
	
	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
	
%>