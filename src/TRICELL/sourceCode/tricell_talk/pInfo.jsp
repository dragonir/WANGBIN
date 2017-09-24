<!-- <%@ page contentType="text/html;charset=utf-8" %> -->
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
		//out.println("Connect Ok!");
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
	<title>TRICELL - 个人</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="./assets/scripts/util.js"></script>
	<script type="text/javascript" src="./assets/scripts/thread.js"></script>
	<script type="text/javascript" src="./assets/scripts/info_thread.js"></script>
	<script type="text/javascript" src="./assets/jquery/jquery-1.3.3.min.js"></script>
	<script type="text/javascript" src="./assets/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="./assets/scripts/main.js"></script>
	<link rel="stylesheet" type="text/css" href="./assets/styles/reset.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/header.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/info_thread.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/getUsersInfo.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/main.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/blog.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/pInfo.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/mybootstrap.css">
</head>

<body>
<!-- row1 -->
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


<div class="row">
	<div class="col-lg-1" id="toTop">
		<a href="#" target="_top">T<br>O<br>P</a>
	</div>
</div>


<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="pinfoRow2">
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


<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="pinfoRow3">
	<!-- row2 头像部分 -->
	<div class="proContainer" id="proContainer1">
		<div id="selfile">
			<img src="./assets/images/profile.jpg">
			<h3 style="text-shadow: 1px 1px 1px black;">TRICELL</h3>
			<!-- <h4>our business is life itself</h4> -->
		</div>
		<div id="selfileAppend">
			<h4>桃花影落飞神剑,<br>碧海潮生按玉箫</h4>
		</div>
	</div>
	
	<!-- 具体个人信息 -->
	<div class="proContainer" id="proContainer2">
		<div id="selfInfo">
			<div id="info1">
				<h2>TRICELL INC</h2>
				<h3>部门 : 生物制药</h3>
			</div>
			<div id="info2">
				<h3>详细信息</h3>
				<p><label>性别</label> <span>男</span></p>
				<p><label>生日</label> <span>1999-10-25</span></p>
				<p><label>电话</label> <span>1882600000</span></p>
				<p><label>地址</label> <span>广东省，广州市，番禺区，中山大学</span></p>
				<p><label>邮箱</label> <span><a>wangbin@sina.com</a></span></p>
				<p><label>主页</label> <span><a>www.tricell.com</a></span></p>
			</div>

			<!-- button -->
			<div id="info3">
				<a href="profileSetting.html"><button class="btn">修改信息</button></a>
			</div>

			
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

</body>
</html>