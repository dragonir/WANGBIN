<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	// 如果未登录先登录 
	String user = "" + session.getAttribute("user");
	if(user.equals("null")){ 
		response.sendRedirect("./login.html");
		return;
	}
%>

<!DOCTYPE html>
<html>
<head>
	<title>TRICELL - 论坛</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="./assets/jquery/jquery-1.3.3.min.js"></script>
	<script type="text/javascript" src="./assets/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="./assets/scripts/main.js"></script>
	<script type="text/javascript" src="./assets/scripts/util.js"></script>
	<script type="text/javascript" src="./assets/scripts/infos.js"></script>
	<link rel="stylesheet" type="text/css" href="./assets/styles/mybootstrap.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/main.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/blog.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/reset.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/getUsersInfo.css">
</head>
<body>

<!-- navigator -->
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
				<li class=""><a href="blog.jsp" style="color: white;"><b>论坛</b></a></li>
				<li class=""><a href="pInfo.jsp" style="color: white;">个人</a></li>
				<li class=""><a href="about.html" style="color: white;">关于</a></li>
				<li class=""><a href="login.html" style="color: silver;">登录/注册</a></li>
				<li class=""><a href="admin.jsp" style="color: silver;">管理员</a></li>
			</ul>
		</div>
	</nav>
</div>


<!-- blog banner -->
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="blogRow2">
	<div id="blogBanner">
		<img src="./assets/images/spaceBanner.jpg">
	</div>
	<div id="bannerTitle">
		<p>欢迎访问TRICELL论坛</p>
	</div>
</div>


<!-- to top -->
<div class="row">
	<div class="col-lg-1" id="toTop">
		<a href="#" target="_top">T<br>O<br>P</a>
	</div>
</div>


<!-- blog header -->
<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row" id="blogHeader">
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

<!-- blog main -->
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="blogRow3">
	<div id="group-list">
		<p class="title">部门区列表&gt;&gt;</p>
		<div id="group-global">
			<div class="global-wrapr"></div>
			<div class="global-wrapl"></div>
			<a href="./thread.jsp?g=9">
			<a href="thread.jsp">
				<div class="group-content">
					<span class="tag">公共区</span>
					<img src="" width="80px" height="80px" alt="公共区" title="公共区">
					<p>会员数：<span class="p-num"> </span>
						&nbsp;&nbsp;主题数：<span class="t-num">	
						</span></p>
					<p><span class="t-time"> </span></p>
				</div>
			</a>
		</div>
		<div id="group-ect">
			<div class="group-ect-wrap">
			<a href="./thread.jsp?g=1">
				<div class="group-content">
					<img src="" width="100px" height="100px" alt="部门区" title="部门区">
					<span class="tag">商务投资</span>
					<p>会员数：<span class="p-num"> </span>
					&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
					<p><span class="t-time"> </span></p>
				</div>
				</a>
				<a href="./thread.jsp?g=2">
				<div class="group-content">
				<img src="" width="100px" height="100px" alt="部门区" title="部门区">
				<span class="tag">无线通信</span>
					<p>会员数：<span class="p-num"> </span>
					&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
				<p><span class="t-time"> </span></p>
				</div>
				</a>
				<a href="./thread.jsp?g=3">
				<div class="group-content">
					<img src="" width="100px" height="100px" alt="部门区" title="部门区">
					<span class="tag">科技研究</span>
					<p>会员数：<span class="p-num"> </span>
					&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
					<p><span class="t-time"> </span> </p>
				</div>
				</a>
				<a href="./thread.jsp?g=4">
				<div class="group-content">
					<img src="" width="100px" height="100px" alt="部门区" title="部门区">
					<span class="tag">生物制药</span>
					<p>会员数：<span class="p-num"> </span>
					&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
					<p><span class="t-time"> </span> </p>
				</div>
				</a>
			</div>

			<div class="group-ect-wrap dn">
				<a href="./thread.jsp?g=5">
					<div class="group-content">
						<span class="tag">销售部</span>
						<img src="" width="100px" height="100px" alt="部门区" title="部门区">
						<p>会员数：<span class="p-num"> </span>
						&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
						<p><span class="t-time"> </span></p>
					</div>
				</a>

				<a href="./thread.jsp?g=6">
					<div class="group-content">
						<span class="tag">人事部</span>
						<img src="" width="100px" height="100px" alt="部门区" title="部门区">
						<p>会员数：<span class="p-num"> </span>
						&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
						<p><span class="t-time"> </span></p>
					</div>
				</a>

				<a href="./thread.jsp?g=7">
					<div class="group-content">
						<span class="tag">财务部</span>
						<img src="" width="100px" height="100px" alt="部门区" title="部门区">
						<p>会员数：<span class="p-num"> </span>
						&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
						<p><span class="t-time"> </span> </p>
					</div>
				</a>

				<a href="./thread.jsp?g=8">
					<div class="group-content">
						<span class="tag">后勤部</span>
						<img src="" width="100px" height="100px" alt="部门区" title="部门区">
						<p>会员数：<span class="p-num"> </span>
						&nbsp;&nbsp;主题数：<span class="t-num"> </span></p>
						<p><span class="t-time"> </span></p>
					</div>
				</a>

			</div>
			<div id="group-ect-btn">
				<span class="btn-active"></span>
				<span></span>
			</div>
		</div>
	</div>
</div>

<!-- blog theam -->
<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row" id="blogRow4">
	<div id="threadList">
		<p class="title">公共区最新主题&gt;&gt;</p>
		<ul>
			<li id="listTitle">
				<span>主题</span>
				<span>作者</span>
				<span>回复</span>
				<span>最后回复</span>
			</li>
			<li>
				<span class="title"><a href="./thread_info.jsp?g=9&t=" class="thread-title"> </a></span>
				<span class="thread-user-wrap"><a href="#" class="thread_user username"> </a></span>
				<span class="thread-user-time"> </span>
				<span class="remark-nums-wrap"><a href="./thread_info.jsp?g=9&t=" class="remark_nums"> </a></span>
				<span class="remark-user-wrap"><a href="#" class="remark_user username"> </a></span>
				<span class="remark-user-time"> </span>
			</li>
			<li>
				<span class="title"><a href="./thread_info.jsp?g=9&t=" class="thread-title"> </a></span>
				<span class="thread-user-wrap"><a href="#" class="thread_user username"> </a></span>
				<span class="thread-user-time"> </span>
				<span class="remark-nums-wrap"><a href="./thread_info.jsp?g=9&t=" class="remark_nums"> </a></span>
				<span class="remark-user-wrap"><a href="#" class="remark_user username"> </a></span>
				<span class="remark-user-time"> </span>
			</li>
			<li>
				<span class="title"><a href="./thread_info.jsp?g=9&t=" class="thread-title"> </a></span>
				<span class="thread-user-wrap"><a href="#" class="thread_user username"> </a></span>
				<span class="thread-user-time"> </span>
				<span class="remark-nums-wrap"><a href="./thread_info.jsp?g=9&t=" class="remark_nums"> </a></span>
				<span class="remark-user-wrap"><a href="#" class="remark_user username"> </a></span>
				<span class="remark-user-time"> </span>
			</li>
			<li>
				<span class="title"><a href="./thread_info.jsp?g=9&t=" class="thread-title"> </a></span>
				<span class="thread-user-wrap"><a href="#" class="thread_user username"> </a></span>
				<span class="thread-user-time"> </span>
				<span class="remark-nums-wrap"><a href="./thread_info.jsp?g=9&t=" class="remark_nums"> </a></span>
				<span class="remark-user-wrap"><a href="#" class="remark_user username"> </a></span>
				<span class="remark-user-time"> </span>
			</li>
			<li>
				<span class="title"><a href="./thread_info.jsp?g=9&t=" class="thread-title"> </a></span>
				<span class="thread-user-wrap"><a href="#" class="thread_user username"> </a></span>
				<span class="thread-user-time"> </span>
				<span class="remark-nums-wrap"><a href="./thread_info.jsp?g=9&t=" class="remark_nums"> </a></span>
				<span class="remark-user-wrap"><a href="#" class="remark_user username"> </a></span>
				<span class="remark-user-time"> </span>
			</li>
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
<script type="text/javascript" src="./assets/scripts/infos.js"></script>
</body>
</html>