<%@ page contentType="text/html; charset=UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>卓翼科技Web Mes系统</title>
<style type="text/css">
<!--
body {
	/*background-color: #dfffff; */
	background:url(/web/platform/login/image/bg.png); 
	BACKGROUND-POSITION: 1% top; BACKGROUND-REPEAT: repeat-x;
 
}

.input_user{ width:122px; height:24px; background:url(/web/platform/login/image/log_03.png);}
.input_pw { width:122px; height:24px; background:url(/web/platform/login/image/log_05.png);}
.button_login { background:url(/web/platform/login/image/log_07.png); width:62px;height:24px; }
.button_reset { background:url(/web/platform/login/image/log_09.png); width:62px;height:24px;}
#table_1 {border-collapse:collapse;border-spacing:0;cellpadding:0}
-->
</style>

<%
	// 读取cookie
	String loginUserCode = "";
	javax.servlet.http.Cookie userCode = org.springframework.web.util.WebUtils.getCookie(request, "loginUserCode");
	if(null != userCode) {
		loginUserCode = userCode.getValue();
	}
%>

</head>

<body>
<table  border=0  cellpadding=0  cellspacing=0  width=100%  height=100%>  
  <tr>
    <td align=center  valign=center>  
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="606">
        <tr>
	  <td><img src="/web/platform/login/image/log_01.png"></td>
	</tr>
	  <tr>
	    <td>
	      <form id="loginForm" name="userform" method="post" action="/web/j_spring_security_check">
	      <table border="0" align="center" cellpadding="0" cellspacing="0" border-cllapse:collapse>
       	     <% if(null != request.getParameter("error")) { %>
		<script type="text/javascript">
			alert("用户名或密码错误!")
		</script>
       	     <%} else {%>
   
             <%} %>
	         <tr>
		<!-- 用户名-->
		   <td><img src="/web/platform/login/image/log_02.png" width="102" height="47" border="0"></td>
		<!-- 用户名输入框-->
		   <td>
		     <table border="0" cellspacing="0" cellpadding="0">
		       <tr>
		         <td><input type="text" name="j_username" id="j_username" value="user" class="input_user" /></td>
		       </tr>
		       <tr>
			 <td><img src="/web/platform/login/image/log_11.png" width="122" height="23" border="0"></td>
		       </tr>
		     </table>
		    </td>
		<!-- 密码-->
		    <td><img src="/web/platform/login/image/log_04.png" width="78" height="47" border="0"></td>
		<!-- 密码输入框-->  
		    <td>
		      <table border="0" cellspacing="0" cellpadding="0">
		        <tr>
			  <td><input type="password" name="j_password" id="j_password" class="input_pw" value=""/></td>
			</tr>
			<tr>
			  <td><img src="/web/platform/login/image/log_12.png" width="122" height="23" border="0"></td>
			</tr>
		     </table>
		    </td>
		<!-- 间隔-->
		    <td><img src="/web/platform/login/image/log_06.png" width="12" height="47" border="0"></td>
		<!-- 登录按钮-->
		    <td>
		      <table border="0" cellspacing="0" cellpadding="0">
		        <tr>
			  <td><input name="" type="submit"  class="button_login" id="btnSearch" value="" /></td>
			</tr>
			<tr>
			<td><img src="/web/platform/login/image/log_13.png" width="62" height="23" border="0"></td>
			</tr>
		      </table>
		    </td>
		<!-- 间隔-->
		    <td><img src="/web/platform/login/image/log_08.png" width="10" height="47" border="0"></td>
		<!-- 重置按钮-->
		    <td>
		      <table border="0" cellspacing="0" cellpadding="0">
		        <tr>
			  <td><input name="" type="reset" class="button_reset" id="btnSearch" value="" /></td>
			</tr>
			<tr>
			  <td><img src="/web/platform/login/image/log_14.png" width="62" height="23" border="0"></td>
			</tr>
		      </table>
		     </td>
		    <td><img src="/web/platform/login/image/log_10.png" width="36" height="47" border="0"></td>
 		  <tr>
 		</table>
		</form>	    
	      </td>
            <tr>
          </table>
	<td>
      </tr>  
</table>

<script type="text/javascript">
document.getElementById("j_username").focus();
</script>

</body>
</html>