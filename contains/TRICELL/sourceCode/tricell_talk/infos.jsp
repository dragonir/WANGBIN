<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*,net.sf.json.*" %>
<%@ include file="SQL.jsp" %>

<%
	request.setCharacterEncoding("utf-8");
	String user = request.getParameter("user");

	Map<String,Object> map = new HashMap<String,Object>();
	Map<String,Object> map1 = new HashMap<String,Object>(); // selfInfo
	HashMap<String,List<String>> map2 = new HashMap<String,List<String>>();
	HashMap<String,List<String>> map3 = new HashMap<String,List<String>>();

	String name = "" + session.getAttribute("user");

	// 未登录 请求无效
	if(name.equals("null")){ 
		map.put("state",0);
	}
	
	else{ 
		map.put("state",1);
		SQL sql = new SQL();

		String exec_self = "select * from user where u_name='" + name + "'";
		
		String exec_group_1 = "create or replace view infos_group1 as select groups.g_img,groups.g_id,count(u_id) as pNum from user right join groups on user.g_id=groups.g_id group by groups.g_id";
		
		String exec_group_2 = "create or replace view infos_group2 as select max(thread.t_time) as tTime,threads.t_id,groups.g_id,groups.g_name,count(threads.t_id) as tNum from threads right join groups on threads.g_id=groups.g_id left join thread on threads.t_id=thread.t_id  group by groups.g_id";
		
		String exec_group_3 = "select * from infos_group1 inner join infos_group2 on infos_group1.g_id=infos_group2.g_id";

		String exec_thread1 = "create or replace view infosThread1 as select threads.g_id,threads.u_id,threads.t_id,count(r_id) as remarkNums from threads left join remarks on threads.t_id=remarks.t_id  where threads.t_state='1' group by t_id having g_id=9";
		
		String exec_thread2 = "create or replace view infosThread2 as select user.u_id,user.u_name as ut_name,thread.t_title,thread.t_time,infosThread1.g_id,infosThread1.t_id,infosThread1.remarkNums from thread inner join infosThread1 on thread.t_id=infosThread1.t_id inner join user on user.u_id=infosThread1.u_id where user.u_state_thread='1' and user.u_state_user='1' order by t_time desc limit 5";
		
		String exec_thread3 = "select ut_name,t_title,t_time,infosThread2.g_id,infosThread2.t_id,remarkNums,user.u_name as ur_name,r_time from infosThread2 left join remarks on infosThread2.t_id=remarks.t_id left join remark on remark.r_id=remarks.r_id left join user on remark.u_id=user.u_id group by infosThread2.t_id order by r_time desc,remarkNums desc,t_time desc";

		if(sql.connect()){
		
		// 获取该账号个人信息，昵称等
			ResultSet rs = sql.executeQuery(exec_self);
			while(rs.next()){
				map1.put("img",rs.getString("u_img"));
				map1.put("name",rs.getString("u_name"));
				map1.put("nickname",rs.getString("u_nickname"));
				map1.put("u_state_thread",rs.getString("u_state_thread"));
				map1.put("u_state_user",rs.getString("u_state_user"));
			}
		
		// 获取部门信息
			sql.executeUpdate(exec_group_1);
			sql.executeUpdate(exec_group_2);
			 rs = sql.executeQuery(exec_group_3);
			 
			 List<String> list_g_img = new ArrayList<String>();
			 List<String> list_g_name = new ArrayList<String>();
			 List<String> list_g_pNum = new ArrayList<String>();
			 List<String> list_g_tNum = new ArrayList<String>();
			 List<String> list_g_tTime = new ArrayList<String>();
			while(rs.next()){
				list_g_img.add(rs.getString("g_img"));
				list_g_name.add(rs.getString("g_name"));
				list_g_pNum.add(rs.getString("pNum"));
				list_g_tNum.add(rs.getString("tNum"));
				list_g_tTime.add("" + rs.getTimestamp("tTime"));
			}
			
			map2.put("img",list_g_img);
			map2.put("name",list_g_name);
			map2.put("pNum",list_g_pNum);
			map2.put("tNum",list_g_tNum);
			map2.put("tTime",list_g_tTime);
		
		// 获取公共区最新回复
			sql.executeUpdate(exec_thread1);
			sql.executeUpdate(exec_thread2);
			rs = sql.executeQuery(exec_thread3);
			
			 List<String> list_t_id = new ArrayList<String>();
			 List<String> list_t_title = new ArrayList<String>();
			 List<String> list_ut_name = new ArrayList<String>();
			 List<String> list_t_time = new ArrayList<String>();
			 List<String> list_remarkNums = new ArrayList<String>();
			 List<String> list_ur_name = new ArrayList<String>();
			 List<String> list_r_time = new ArrayList<String>();
			while(rs.next()){
				list_t_id.add("" + rs.getInt("t_id"));
				list_t_title.add(rs.getString("t_title"));
				list_ut_name.add(rs.getString("ut_name"));
				list_t_time.add("" + rs.getTimestamp("t_time"));
				list_remarkNums.add(rs.getString("remarkNums"));
				list_ur_name.add(rs.getString("ur_name"));
				list_r_time.add("" + rs.getTimestamp("r_time"));
			}
			map3.put("threadId",list_t_id);
			map3.put("threadTitle",list_t_title);
			map3.put("threadUser",list_ut_name);
			map3.put("threadUserTime",list_t_time);
			map3.put("remarkNums",list_remarkNums);
			map3.put("remarkUser",list_ur_name);
			map3.put("remarkUserTime",list_r_time);
		}
		else{ 
			System.out.println("Connect Error!");
		}
	}
	
	// 存储各项
	map.put("selfInfo",map1);
	map.put("groupsInfo",map2);
	map.put("threadsInfo",map3);
	
	// 数据返回
	JSONObject json = JSONObject.fromObject(map);
	response.getWriter().print(json);
%>