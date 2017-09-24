<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*,java.util.Date,java.text.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String value = request.getParameter("join");
	String name = request.getParameter("user");
	String password = request.getParameter("passw");
	String group = request.getParameter("group");

	SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	String time = formater.format(new Date());

	Map<String,Object> map = new HashMap<String,Object>();
	Boolean has = false;
	Boolean has1 = false;

	SQL sql = new SQL();
	// 检查邀请码匹配
	String exec = "select * from joinCode where j_value='" + value + "'";
	// 检查账号是否被注册
	String exec1 = "select * from user where u_name='" + name + "'";
	// 注册
	String exec2 = "insert into user(u_name,u_password,u_nickname,g_id,u_time,u_img) values('"+name+"','"+password+"','"+name+"','"+group+"','"+time+"','./assets/imgs/static.jpg')";
		if(sql.connect()){
		//out.println("Connect Ok!");
			ResultSet rs = sql.executeQuery(exec);
			if(rs.next()){
				has = true;
			}
			// 如果匹配不到邀请码
			if(has == false){ 
				map.put("state",0);
			}else{ 
				// 判断该账号是否被注册
				ResultSet rs1 = sql.executeQuery(exec1);
				if(rs1.next()){
					has1 = true;
				}
				// 如果账号已经被注册
				if(has1 == true){ 
					map.put("state",2);
				}else if(sql.executeUpdate(exec2) == true){
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