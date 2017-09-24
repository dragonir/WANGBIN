<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	// 如果未登录先登录 
	String user = "" + session.getAttribute("user");
	String groupId = "" + session.getAttribute("groupId");
	if(user.equals("null") || groupId.equals("null")){ 
		response.sendRedirect("./login.html");
		return;
	}
	
	// 如果不是该部门的员工
	String _groupId = "" + request.getParameter("g");
	String _tId = "" + request.getParameter("t");
	if(!_groupId.equals("9") && !_groupId.equals(groupId)){ 
		response.sendRedirect("./home.html");
		return;
	}
	
	// 如果不是某个主题请求
	if(_tId.equals("null")){ 
		response.sendRedirect("./thread.jsp?g="+ _groupId);
		return;
	}

	SQL sql = new SQL();
	
	// 查询主题信息
	String thread_exec = "select u_name,t_title,t_description,t_time from threads inner join thread on threads.t_id=thread.t_id inner join user on threads.u_id=user.u_id where threads.t_id='"+_tId+"'";
	
	// 查询评论信息
	String remark_exec = "select u_name,r_description,r_time from remarks inner join threads on threads.t_id=remarks.t_id inner join remark on remarks.r_id=remark.r_id inner join user on remark.u_id=user.u_id where threads.t_id='"+_tId+"'";
	String u_name = "",
		t_description = "",
		t_title = "",
		t_time = "";

	ArrayList<String> r_user = new ArrayList<String>();
	ArrayList<String> r_desc = new ArrayList<String>();
	ArrayList<String> r_time = new ArrayList<String>();
	if(sql.connect()){
		ResultSet rs = sql.executeQuery(thread_exec);
		while(rs.next()){
			u_name = rs.getString("u_name");
			t_title = rs.getString("t_title");
			t_description = rs.getString("t_description");
			t_time = "" + rs.getTimestamp("t_time");
		}
		
		// 如果不是有效的主题
		if(t_title.equals("")){ 
			response.sendRedirect("./thread.jsp?g="+ _groupId);
			return;
		}

		rs = sql.executeQuery(remark_exec);
		while(rs.next()){
			r_user.add(rs.getString("u_name"));
			r_desc.add(rs.getString("r_description"));
			r_time.add(""+ rs.getString("r_time"));
		}
	}
%>

<!DOCTYPE html>
<html>
<head>
	<title>TRICELL- 论坛</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./assets/styles/reset.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/header.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/info_thread.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/getUsersInfo.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/blog.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/pInfo.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/infos.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/main.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/mybootstrap.css">
</head>
<body>

<!-- row1 -->
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="row1">
	<nav class="navbar-default" role="navigation" type="navigator" id="nav-bar">
		<div for="logo" id="logo" class="">
			<a href="index.html"><img src="./assets/images/myLogo.png" id="myLogo"></a>
		</div>

		<div for="nav" id="navigator">
			<ul>
				<li class=""><a href="index.html" style="color: white;">导航</a></li>
				<li class=""><a href="home.html" style="color: white;">主页</a></li>
				<li class=""><a href="services.html" style="color: white;"><b>业务</b></a></li>
				<li class=""><a href="blog.html" style="color: white;">论坛</a></li>
				<li class=""><a href="profileShow.html" style="color: white;">个人</a></li>
				<li class=""><a href="about.html" style="color: white;">关于</a></li>
				<li class=""><a href="login.html" style="color: silver;">登录/注册</a></li>
				<li class=""><a href="admin.html" style="color: silver;">管理员</a></li>
			</ul>
		</div>
	</nav>
</div>

<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row" id="threadInfoRow2">
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
	<div id="header">
		<div id="self">
			<img src="" width="50px" height="50px" alt="头像" title="头像">
			<p><a href=""> </a></p>
		</div>
		<h6 id="header_tip" class="header-tip dn"> </h6>
	</div>
</div>

<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row" id="threadInfoRow3">
	<div id="thread-content">
		<img src="./assets/images/paperclip.png" width="80px" height="80px" alt="回形针" title="回形针" class="paperclip">
		<div id="title">
			<h1><a href=""><%=t_title%></a></h1>
			<p>
			<span class="username"><%=u_name%></span>
			<span class="time"><%=t_time%></span>
			</p>
			<div class="title-desc">
				<%=t_description%>
			</div>
		</div>
		<% 
		Iterator it_user = r_user.iterator();
		if(it_user.hasNext()) { 
		%>
		<div id="remarks">
			<p class="remarks-title">评论列表：</p>
			<% 
				Iterator it_desc = r_desc.iterator();
				Iterator it_time = r_time.iterator();
				while(it_user.hasNext()){
			 %>
			<div class="remark">
				<div class="remark-content">
					<%=it_desc.next()%>
				</div>
				<p class="title">
					<span class="username"><%=it_user.next()%></span>
					<span class="time"><%=it_time.next()%></span>
				</p>
			</div>
		
		<% } %>
		</div><% } %>
		<div id="remarkIt">
			<div class="remarkIt-content" contentEditable="true"></div>
			<p class="btn">
				<span>提交评论</span>
				<span id="remarkIt-tip" class="dn">提交成功</span>
			</p>
		</div>
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

<script type="text/javascript" src="./asserts/scripts/util.js"></script>
<script type="text/javascript" src="./asserts/scripts/thread.js"></script>
<script type="text/javascript" src="./asserts/scripts/info_thread.js"></script>
</body>
</html>