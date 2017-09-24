<%@ page import="java.util.*,java.sql.*" %>
<%
class SQL {
	private Connection conn;
	int cnt = 0;
	
	private boolean connect(){
		// String connectString = "jdbc:mysql://172.18.187.234:3306/TRICELL" + "?autoReconnect=true&useUnicode=true&characterEncodeing=UTF-8";
		String connectString = "jdbc:mysql://localhost:3306/xiyuan(structure&data)" + "?autoReconnect=true&useUnicode=true&characterEncodeing=UTF-8";

			// String user = "user";
			// String password = "123";

			String user = "root";
			String password = "stillalive";
		try{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(connectString,user,password);
			return true;
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return false;
	}
	
	 private ResultSet executeQuery(String sqlSentence){
		Statement stat;
		ResultSet rs = null;
		
		try{
			stat = conn.createStatement();
			rs = stat.executeQuery(sqlSentence);
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return rs;
	}
	
	private  boolean executeUpdate(String sqlSentence){
		Statement stat;
		try{
			stat = conn.createStatement();
			cnt = stat.executeUpdate(sqlSentence);
		}catch(Exception e){
			System.out.print(e.getMessage());
		}
		return (cnt >= 0);
	}
	
	private  void updateItems(String sqlSentence){
		if(executeUpdate(sqlSentence)){
			System.out.print("" + cnt + " records are updated");
		}
	}
	
}

%>