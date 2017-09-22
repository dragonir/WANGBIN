<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<!-- <%@ page contentType="text/html;charset=utf-8" %> -->
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	// 如果未登录先登录 
	String user = "" + session.getAttribute("user");
	if(user.equals("null")){ 
		response.sendRedirect("./login.html");
		return;
	}
	if(!user.equals("admin@qq.com")){ 
		response.sendRedirect("./home.html");
		return;
	}
%>

<%
	SQL sql = new SQL();

	String exec_self = "select * from user where u_name='" + user + "'";
	String exec_users = "select u_name,u_nickname,u_state_user,u_state_thread from user where u_name!='" + user + "'";
	String exec_threads = "select threads.t_id,threads.t_state,threads.g_id,thread.t_title,thread.t_time,user.u_name from threads inner join thread on thread.t_id=threads.t_id inner join user on threads.u_id=user.u_id order by thread.t_time desc";
	ArrayList<String> list_u_name = new ArrayList<String>();
	ArrayList<String> list_u_state_user = new ArrayList<String>();
	ArrayList<String> list_u_state_thread = new ArrayList<String>();
	ArrayList<String> list_u_nickname = new ArrayList<String>();
	ArrayList<String> list__u_name = new ArrayList<String>();
	ArrayList<String> list_t_id = new ArrayList<String>();
	ArrayList<String> list_t_state = new ArrayList<String>();
	ArrayList<String> list_g_id = new ArrayList<String>();
	ArrayList<String> list_t_title = new ArrayList<String>();
	ArrayList<String> list_t_time = new ArrayList<String>();

	String img_self = "",
		name_self = "",
		nickname_self = "";
	if(sql.connect()){
		// 获取管理员个人信息，昵称等
			ResultSet rs = sql.executeQuery(exec_self);
			while(rs.next()){
				img_self = rs.getString("u_img");
				name_self = rs.getString("u_name");
				nickname_self = rs.getString("u_nickname");
			}
			// 获取用户列表
			rs = sql.executeQuery(exec_users);
			while(rs.next()){
				list_u_name.add(rs.getString("u_name"));
				list_u_state_user.add(rs.getString("u_state_user"));
				list_u_state_thread.add(rs.getString("u_state_thread"));
				list_u_nickname.add(rs.getString("u_nickname"));
			}
			// 获取主题列表
			// 获取用户列表
			rs = sql.executeQuery(exec_threads);
			while(rs.next()){
				list__u_name.add(rs.getString("u_name"));
				list_t_id.add("" + rs.getInt("t_id"));
				list_g_id.add("" + rs.getInt("g_id"));
				list_t_state.add(rs.getString("t_state"));
				list_t_title.add(rs.getString("t_title"));
				list_t_time.add("" + rs.getTimestamp("t_time"));
			}
	}
%>

<!DOCTYPE html>
<html>
<head>
	<title>TRICELL - 管理员</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./assets/styles/main.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/blog.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/mybootstrap.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/reset.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/header.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/footer.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/admin.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/getUsersInfo.css">
</head>
<body>

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="row1">
	<nav class="navbar-default" id="navBar">
		<div for="logo" id="logo" class="">
			<a href="home.html"><img src="./assets/images/myLogo.png" id="myLogo"></a>
		</div>
		<div for="nav" id="navigator">
			<ul>
				<li class=""><a href="index.html" style="color: white;">导航</a></li>
				<li class=""><a href="home.html" style="color: white;">主页</a></li>
				<li class=""><a href="services.html" style="color: white;">业务</a></li>
				<li class=""><a href="blog.jsp" style="color: white;">论坛</a></li>
				<li class=""><a href="pInfo.jsp" style="color: white;"><b>个人</b></a></li>
				<li class=""><a href="about.html" style="color: white;">关于</a></li>
				<li class=""><a href="login.html" style="color: silver;">登录/注册</a></li>
				<li class=""><a href="admin.jsp" style="color: silver;">管理员</a></li>
			</ul>
		</div>
	</nav>
</div>

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="adminRow2">
	<div id="showUserInfoTip" class="dn">
		<div class="content">
			<img src="" width="30px" height="30px" alt="头像" title="头像">
			<p>部门：<span class="group"> </span></p>
			<p>昵称：<span class="nickname"> </span></p>
			<p>主题数：<span class="threadNum"> </span></p>
			<p>性别：<span class="sex"> </span></p>
		</div>
		<div class="wrap2"></div>
		<div class="wrap1"></div>
	</div>
	<div id="msg-tip" class="dn">
		操作失败，请稍后再试！
	</div>
	<div id="header">
		<div id="self">
			<img src="<%=img_self%>" width="50px" height="50px" alt="头像" title="头像">
			<p><a href="./pInfo.jsp?u=<%=name_self%>"><%=nickname_self%></a></p>
		</div>
	</div>
</div>
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="adminRow3">
	<div id="users">
		<h3>用户管理&gt;&gt;</h3>
		<ul>
			<li class="top">
				<span class="u_name">账号</span>
				<span class="u_nickname">昵称</span>
				<span class="u_handle1">屏蔽</span>
				<span class="u_handle2">禁言</span>
				<span class="u_handle3">删除</span>
			</li>
			<%
				Iterator it_u_name = list_u_name.iterator();
				if(it_u_name.hasNext()){ 
					Iterator it_u_nickname = list_u_nickname.iterator();
					Iterator it_u_state_user = list_u_state_user.iterator();
					Iterator it_u_state_thread = list_u_state_thread.iterator();
					while(it_u_name.hasNext()){
						String handle1_text = it_u_state_thread.next().equals("1") ? "屏蔽" : "取消屏蔽";
						String handle2_text = it_u_state_user.next().equals("1") ? "禁言" : "取消禁言";
			%>
			<li class="item">
				<span class="u_name"><a href="#" class="username"><%=it_u_name.next()%></a></span>
				<span class="u_nickname"><%=it_u_nickname.next()%></span>
				<span class="u_handle1"><%=handle1_text%></span>
				<span class="u_handle2"><%=handle2_text%></span>
				<span class="u_handle3">删除</span>
			</li>
			<% } } %>
		</ul>
	</div>
	<div id="threads">
		<h3>主题管理&gt;&gt;</h3>
		<ul>
			<li class="top">
				<span class="t_name">主题</span>
				<span class="u_name">作者</span>
				<span class="t_time">发布时间</span>
				<span class="u_handle1">屏蔽</span>
				<span class="u_handle3">删除</span>
			</li>
			<%
				Iterator it__u_name = list__u_name.iterator();
				if(it__u_name.hasNext()){ 
					Iterator it_t_id = list_t_id.iterator();
					Iterator it_g_id = list_g_id.iterator();
					Iterator it_t_state = list_t_state.iterator();
					Iterator it_t_title = list_t_title.iterator();
					Iterator it_t_time = list_t_time.iterator();
					while(it__u_name.hasNext()){
					String _href = "./thread_info.jsp?g="+ it_g_id.next()+"&t="+it_t_id.next();
					String handle1_text = it_t_state.next().equals("1") ? "屏蔽" : "取消屏蔽";
			%>
			<li class="item">
				<span class="t_name"><a href="<%=_href%>" ><%=it_t_title.next()%></a></span>
				<span class="u_name"><a href="#" class="username"><%=it__u_name.next()%></a></span>
				<span class="t_time"><%=it_t_time.next()%></span>
				<span class="u_handle1"><%=handle1_text%></span>
				<span class="u_handle3">删除</span>
			</li>
			<% } } %>
		</ul>
	</div>
</div>

<!-- row5 -->
<div class="row" id="blogRow5">
	<div id=footerContainer>
		<div id="footerImg">
			<img src="./assets/images/banner.png">
		</div>
		<div id="footer">
			<p><b>TRICELL INC</b> &copy; 2017，Powered by Wangbin</p>
		</div>
	<div>
</div>

<script type="text/javascript" src="./assets/scripts/util.js"></script>
<script type="text/javascript" src="./assets/scripts/logout.js"></script>
<script type="text/javascript" src="./assets/scripts/admin.js"></script>
<script type="text/javascript" src="./assets/scripts/getUsersInfo.js"></script>
</body>
</html>