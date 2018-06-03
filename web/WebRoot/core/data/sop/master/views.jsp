<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String name=request.getParameter("name");
 %>
<html>
  <head>
    <title><%=name %></title>
    <script type="text/javascript" src="pdfobject.js"></script>
    <script type="text/javascript">
      window.onload = function (){
        var success = new PDFObject({ url: "temp_sop/<%=name%>.pdf" }).embed();
      };
    </script>
  </head> 
  <body>

  </body>
</html>
