<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.IOException"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.io.BufferedWriter"%>
<%@ page import="java.io.FileWriter"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.sql.Statement"%>
<%@ page import="com.data.connectsql.TestDatabase"%>
<%@ page import="java.sql.ResultSet"%>


<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
System.out.println(request.getScheme());
System.out.println(request.getScheme()+"://"+request.getServerName());
System.out.println(request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort());
System.out.println(basePath);
%>

<%
Connection conn=null;
Statement stmt=null;
ResultSet rs=null;
String id=request.getParameter("id");

//用于执行 SQL 存储过程的接口
try {
	conn=new TestDatabase().getConn();
	stmt=conn.createStatement();

	String sql="SELECT * FROM SopData WHERE id='"+id+"'";

	stmt.executeQuery(sql);

	rs=stmt.getResultSet();
	
	//master/web/SopTemp/".$row["name"].".pdf","w+"
	if(rs.next()){
		
		String b=rs.getString("source");
		System.out.println(b);
		System.out.println(basePath+"ss.txt");
		
		
		File sop=new File(basePath+"ss.txt");
		    if (sop.exists()) {
                System.out.print("文件存在");
            } else {
                System.out.print("文件不存在");
                sop.createNewFile();// 不存在则创建
            }
		try {
			BufferedWriter output=new BufferedWriter(new FileWriter(sop));
	         output.write("sdfasfasd");
	         output.close();
		} catch (IOException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}

		
/* 		try {
			BufferedWriter output=new BufferedWriter(new FileWriter(file));
	         output.write(b);
	         output.close();
		} catch (IOException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} */
		
/* 		//master/web/SopTemp/".$row["name"].".pdf","w+";
		response.setContentType("application/pdf");
		OutputStream outs=response.getOutputStream();
		outs.write(bs);
		out.flush();
		rs.close(); */
	}
} catch (SQLException e) {
		e.printStackTrace();
}finally{
	if(null!=stmt ){
		try {
			stmt .close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	if(null!=conn){
		try {
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}


 %>
