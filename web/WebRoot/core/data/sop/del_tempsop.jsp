<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.io.File"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
String name=request.getParameter("name");
File temp=new File(basePath+name+".pdf");
if(temp.exists()){
temp.delete();
}
 %>

