<!-- <%@ page contentType="text/html;charset=utf-8" %> -->
<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
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
	<title>TRICELL- 论坛</title>
	<link rel="stylesheet" type="text/css" href="./assets/styles/reset.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/header.css">
</head>
<body>
	<div id="header">
		<h1><a href="">TRICELL</a></h1>
		<div id="self">
			<img src="" width="50px" height="50px" alt="头像" title="头像">
			<p><a href=""></a></p>
		</div>
		<h5><a href="../index.html">返回主页</a></h5>
		<h6><a href="#" id="logout">退出登录</a></h6>
	</div>

<script type="text/javascript" src="./assets/scripts/util.js"></script>
<script type="text/javascript" src="./assets/scripts/infos.js"></script>
</body>
</html>