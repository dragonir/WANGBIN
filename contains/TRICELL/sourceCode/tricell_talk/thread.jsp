<!-- <%@ page contentType="text/html;charset=utf-8" %> -->

<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>
<%
	// 如果未登录先登录 
	String user = "" + session.getAttribute("user");
	String groupId = "" + session.getAttribute("groupId");
	String groupName = "" + session.getAttribute("groupName");
	if(user.equals("null") || groupId.equals("null")){ 
		response.sendRedirect("./login.html");
		return;
	}


	// 如果不是该部门的员工
	String _groupId = "" + request.getParameter("g");
	if(!_groupId.equals("9") && !_groupId.equals(groupId) && !user.equals("admin@qq.com")){ 
		response.sendRedirect("./home.html");
		return;
	}

	// 页号
	int pn = 1;
	int pSize = 5;
	double _total = 0;
	int total = 0;
	String _pn = "" + request.getParameter("pn");
	if(!_pn.equals("null")){ 
		pn = Integer.parseInt(_pn);
		pn = pn <= 0 ? 1 : pn;
	}

	// 连接数据库获取信息
	SQL sql = new SQL();

	// 部门信息
	String exec_group_1 = "create or replace view infos_group1 as select groups.g_img,groups.g_id,count(u_id) as pNum from user right join groups on user.g_id=groups.g_id group by groups.g_id";
	String exec_group_2 = "create or replace view infos_group2 as select max(thread.t_time) as tTime,threads.t_id,groups.g_id,groups.g_name,count(threads.t_id) as tNum from threads right join groups on threads.g_id=groups.g_id left join thread on threads.t_id=thread.t_id group by groups.g_id";
	String exec_group_3 = "select * from infos_group1 inner join infos_group2 on infos_group1.g_id=infos_group2.g_id where infos_group1.g_id='"+_groupId+"'";
	String g_name = "",
		g_img = "",
		pNum = "",
		tNum = "",
		tTime = "";

	// 部门主题列表信息
	String exec_thread1 = "create or replace view infosThread1 as select threads.g_id,threads.u_id,threads.t_id,count(r_id) as remarkNums from threads left join remarks on threads.t_id=remarks.t_id  where threads.t_state='1' group by t_id having g_id='" + _groupId + "'";
	String exec_thread2_all = "create or replace view infosThread2 as select user.u_id,user.u_name as ut_name,thread.t_title,thread.t_time,infosThread1.g_id,infosThread1.t_id,infosThread1.remarkNums from thread inner join infosThread1 on thread.t_id=infosThread1.t_id inner join user on user.u_id=infosThread1.u_id";
	String exec_thread2_getAll = "select * from infosThread2";
	String exec_thread2 = "create or replace view infosThread2 as select user.u_id,user.u_name as ut_name,thread.t_title,thread.t_time,infosThread1.g_id,infosThread1.t_id,infosThread1.remarkNums from thread inner join infosThread1 on thread.t_id=infosThread1.t_id inner join user on user.u_id=infosThread1.u_id where user.u_state_thread='1' and user.u_state_user='1' order by t_time desc limit " + (pn-1)*pSize+","+pSize;
	String exec_thread3 = "select ut_name,t_title,t_time,infosThread2.g_id,infosThread2.t_id,remarkNums,user.u_name as ur_name,r_time from infosThread2 left join remarks on infosThread2.t_id=remarks.t_id left join remark on remark.r_id=remarks.r_id left join user on remark.u_id=user.u_id group by infosThread2.t_id order by r_time desc,remarkNums desc,t_time desc";
	
	List<String> list_t_id = new ArrayList<String>();
	List<String> list_t_title = new ArrayList<String>();
	List<String> list_ut_name = new ArrayList<String>();
	List<String> list_t_time = new ArrayList<String>();
	List<String> list_remarkNums = new ArrayList<String>();
	List<String> list_ur_name = new ArrayList<String>();
	List<String> list_r_time = new ArrayList<String>();
	if(sql.connect()){
		
		// 获取部门信息
		sql.executeUpdate(exec_group_1);
		sql.executeUpdate(exec_group_2);
		ResultSet rs = sql.executeQuery(exec_group_3);
		while(rs.next()){
			g_img = rs.getString("g_img");
			g_name = rs.getString("g_name");
			pNum = rs.getString("pNum");
			tNum = rs.getString("tNum");
			tTime = "" + rs.getTimestamp("tTime");
		}
		if(tTime.equals("null")){ 
			tTime = "1970-01-01 00:00:00";
		}

		// 获取部门主题信息
		sql.executeUpdate(exec_thread1);
		
		// 先求总记录
		sql.executeUpdate(exec_thread2_all);
		rs = sql.executeQuery(exec_thread2_getAll);
		while(rs.next()){ 
			_total = rs.getRow();
		}
		total = (int)(Math.ceil(_total/pSize));
		if(pn > total && total!= 0){ 
			response.sendRedirect("./thread.jsp?g="+_groupId+"&pn="+total);
			return;
		}
		sql.executeUpdate(exec_thread2);
		rs = sql.executeQuery(exec_thread3);	
		while(rs.next()){
		
			list_t_id.add("" + rs.getInt("t_id"));
			list_t_title.add(rs.getString("t_title"));
			list_ut_name.add(rs.getString("ut_name"));
			list_t_time.add("" + rs.getTimestamp("t_time"));
			list_remarkNums.add(rs.getString("remarkNums"));
			String _ur_name = "" + rs.getString("ur_name");
			if(_ur_name.equals("null")){ 
				_ur_name = "无";
			}
			
			String _r_time = "" + rs.getTimestamp("r_time");
			if(_r_time.equals("null")){ 
				_r_time = "1970-01-01 00:00:00";
			}
			list_ur_name.add(_ur_name);
			list_r_time.add(_r_time);
		}
	}else{ 
		System.out.println("Connect Error!");
	}
%>


<!DOCTYPE html>
<html>
<head>
	<title>TRICELL - 论坛公共区</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;">
	<script type="text/javascript" src="./assets/jquery/jquery-1.3.3.min.js"></script>
	<script type="text/javascript" src="./assets/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="./assets/scripts/main.js"></script>
	<script type="text/javascript" src="./assets/scripts/util.js"></script>
	<script type="text/javascript" src="./assets/scripts/infos.js"></script>
	<link rel="stylesheet" type="text/css" href="./assets/styles/thread.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/mybootstrap.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/infos.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/main.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/blog.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/reset.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/getUsersInfo.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles/header.css">
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
				<li class=""><a href="login.jsp" style="color: silver;">登录/注册</a></li>
				<li class=""><a href="admin.jsp" style="color: silver;">管理员</a></li>

			</ul>
		</div>
	</nav>
</div>

<!-- to top -->
<div class="row">
	<div class="col-lg-1" id="toTop">
		<a href="#" target="_top">T<br>O<br>P</a>
	</div>
</div>
<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row" id="threadRow1">
	<div id="showUserInfoTip" class="dn">
		<div class="content">
			<img src="./assets/images/depart_public.png" width="30px" height="30px" alt="头像" title="头像">
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

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="threadRow3">
	<div id="group-content">
		<span class="tag"><%=g_name%></span>
		<img src="<%=g_img%>" width="100px" height="100px" alt="部门区" title="部门区">
		<p>会员数：<span class="p-num"><%=pNum%></span>
		&nbsp;&nbsp;主题数：<span class="t-num"><%=tNum%></span></p>
		<p><span class="t-time"><%=tTime%></span></p>
	</div>

	<div id="addThread-wrap">
		<h4 id="addThread">发布主题</h4>
	</div>

	<div id="newThread_bg" class="dn"></div>
	<div id="newThread-wrap" class="dn">
		<h3>发布新主题&gt;&gt; <span class="close">&times;</span></h3>
		<p class="choose-group">请选择部门区：
		<input type="radio" name="group" value="9" id="group1" checked="checked">公共区
		<input type="radio" name="group" value="<%=groupId%>" id="group2"><%=groupName%></p>
		<p>请输入主题:</p>
		<div id="new_title" contentEditable="true"></div>
		<p>请输入主题描述:</p>
		<div id="new_content" contentEditable="true"></div>
		<p>
		<span id="newThread-btn">发布</span>
		<span id="newThread-tip" class="dn">发布成功，请刷新查看</span></p>
	</div>
</div>

<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row" id="threadRow4">
	<div id="threadList">
		<p class="title"><span><%=g_name%></span>最新主题&gt;&gt;</p>
		<ul>
			<li id="listTitle">
				<span>主题</span>
				<span>作者</span>
				<span>回复</span>
				<span>最后回复</span>
			</li>
			
			<% 
			Iterator it_t_id = list_t_id.iterator();
			if(it_t_id.hasNext()) { 
				Iterator it_desc = list_t_title.iterator();
				Iterator it_ut_name = list_ut_name.iterator();
				Iterator it_t_time = list_t_time.iterator();
				Iterator it_remarkNums = list_remarkNums.iterator();
				Iterator it_ur_name = list_ur_name.iterator();
				Iterator it_r_time = list_r_time.iterator();
				String _href = "";
				while(it_t_id.hasNext()){ 
					_href = "./thread_info.jsp?g="+ _groupId+"&t="+it_t_id.next();
			%>
				<li>
					<span class="title"><a href="<%=_href%>" class="thread-title"><%=it_desc.next()%></a></span>
					<span class="thread-user-wrap"><a href="#" class="thread_user username"><%=it_ut_name.next()%></a></span>
					<span class="thread-user-time"><%=it_t_time.next()%></span>
					<span class="remark-nums-wrap"><a href="<%=_href%>" class="remark_nums"><%=it_remarkNums.next()%></a></span>
					<span class="remark-user-wrap"><a href="#" class="remark_user username"><%=it_ur_name.next()%></a></span>
					<span class="remark-user-time"><%=it_r_time.next()%></span>
				</li>

			<% } 
			} %>
		</ul>
	</div>
</div>

<%
		// 页数逻辑  .dn 为 display:none  
		String pre_dn = "dn",
			one_dn = "dn",
			two_dn = "dn",
			three_dn = "dn",
			four_dn = "dn",
			five_dn = "dn",
			next_dn = "dn";
		int first_pn = 0,
			pre_pn = 0,
			one_pn = 1,
			two_pn = 2,
			three_pn = 3,
			four_pn = 4,
			five_pn = 5,
			next_pn = total,
			last_pn = total;
		
		// 5个页数显隐
		one_dn = total >= 1 ? "" : "dn";
		two_dn = total >= 2 ? "" : "dn";
		three_dn = total >= 3 ? "" : "dn";
		four_dn = total >= 4 ? "" : "dn";
		five_dn = total >= 5 ? "" : "dn";
		
		// 上一页下一页显隐
		if(total >=2){ 
			if(pn > 1){ 
				pre_dn = "";
			}else{ 
				pre_dn = "dn";
			}
			if(pn < total){ 
				next_dn = "";
			}else{ 
				next_dn = "dn";
			}
		}

		// 页数值
		pre_pn = pn - 1;
		next_pn = pn + 1;
		first_pn = 1;
		last_pn = total;
		
		//如果超过5页就去中间(符合取中间)
		if(total > 5 && pn <= total && pn - 2 > 0 && pn + 2 < total){ 
			one_pn = pn - 2;
			two_pn = pn - 1;
			three_pn = pn;
			four_pn = pn + 1;
			five_pn = pn + 2;
		}

		// 后方不符合
		else if(total > 5 && pn <= total && pn - 2 > 0){ 
			int posR = pn + 1 < total ? 1 : 0;
			one_pn = pn + posR - 4;
			two_pn = pn + posR - 3;
			three_pn = pn + posR - 2;
			four_pn = pn + posR - 1;
			five_pn = pn + posR;
		}

		// 前方不符合
		else if(total > 5 && pn <= total && pn + 2 < total){ 
			int posL = pn - 1 > 0 ? 1 : 0;
			one_pn = pn - posL;
			two_pn = pn - posL + 1;
			three_pn = pn - posL + 2;
			four_pn = pn - posL + 3;
			five_pn = pn - posL + 4;
		}
	%>

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="threadRow5">
	<div id="threadPage">
		<span class="first" data-pn="<%=first_pn%>">首页</span>
		<span class="pre <%=pre_dn%>" data-pn="<%=pre_pn%>">上一页</span>
		<span class="one <%=one_dn%>" data-pn="<%=one_pn%>"><%=one_pn%></span>
		<span class="two <%=two_dn%>" data-pn="<%=two_pn%>"><%=two_pn%></span>
		<span class="three <%=three_dn%>" data-pn="<%=three_pn%>"><%=three_pn%></span>
		<span class="four <%=four_dn%>" data-pn="<%=four_pn%>"><%=four_pn%></span>
		<span class="five <%=five_dn%>" data-pn="<%=five_pn%>"><%=five_pn%></span>
		<span class="next <%=next_dn%>" data-pn="<%=next_pn%>">下一页</span>
		<span class="last" data-pn="<%=last_pn%>">末页</span>
		<span class="total">总页数：<%=total%></span>
		<input type="text" name="toPage" id="toPage">
		<span id="goPage">跳页</span>
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
			<p><b>TRICELL INC</b> &copy; 2017，Powered by WANGBIN</p>
		</div>
	<div>
</div>

<script type="text/javascript" src="./assets/scripts/util.js"></script>
<script type="text/javascript" src="./assets/scripts/thread.js"></script>
<script type="text/javascript" src="./assets/scripts/getUsersInfo.js"></script>
</body>
</html>