<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.Connection"%>
<%@ page language="java" import="java.sql.SQLException"%>
<%@ page language="java" import="java.sql.ResultSet"%>
<%@ page language="java" import="com.data.connectsql.OfficialDatabase"%>
<%@ page language="java" import="java.sql.CallableStatement"%>
<%@ page language="java" import="java.util.List"%>
<%@ page language="java" import="net.sf.json.JSONObject"%>
<%@ page language="java" import="java.sql.ResultSetMetaData"%>
<%@ page language="java" import="java.util.ArrayList"%>

<html>
<head>
<title>items</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link rel="stylesheet" type="text/css" href="css/style.css"	/>
<script type="text/javascript" src="js/FusionCharts.js"></script>
<link rel="stylesheet" type="text/css" href="../../../MyDesktop/js/core/resources/css/ext-all-neptune.css" />
<script type="text/javascript" src="../../../MyDesktop/js/core/ext-all-debug.js"></script>
<style>
/*
#position{position:absolute;top:50%;left:50%;
		width:150px;height:40px;margin:-20px 0 0 -75px;
		padding:0 10px;background:#eee;line-height:2.4;}
*/

</style>
	<%
	String mo = request.getParameter("mo");
	String width = request.getParameter("width");
	String height = request.getParameter("height");

	List colors=new ArrayList();
	colors.add("FF0000");
	colors.add("1E90FF");
	colors.add("D19275");
	colors.add("B22222");
	colors.add("228B22");
	colors.add("FF00FF");
	colors.add("FFD700");
	colors.add("FF1493");
	colors.add("FF8C00");
	colors.add("4B0082");
	colors.add("ADFF2F");
	colors.add("008080");
	colors.add("0000FF");
	colors.add("000000");
	colors.add("8A2BE2");
	colors.add("D2691E");
	
	
	//用于执行 SQL 存储过程的接口
	Connection conn = null;
	CallableStatement stmt = null;
	ResultSet rs = null;
	List data = null;
	StringBuffer result=new StringBuffer("<chart caption='工单:"+mo+"' subCaption='各站别每小时产出状况' numdivlines='15' lineThickness='2' showValues='0' anchorRadius='3' anchorBgAlpha='50' xAxisName='时间' yAxisName='数量' showAlternateVGridColor='1' numVisiblePlot='12' animation='0'>");
	try {
		// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
		conn = new OfficialDatabase().getConn();
		stmt=conn.prepareCall("{call smt_productive_zh(?)}");		
		//stmt.setString("MOName", "MO010414040013");
		stmt.setString("MOName", mo);
		stmt.execute();  
		//得到结果集
		rs = stmt.getResultSet();
		
		data = new ArrayList<JSONObject>();
		
		//getMetaData();获取此 ResultSet 对象的列的编号、类型和属性。
		ResultSetMetaData metaData = rs.getMetaData();

		//getColumnCount();返回此 ResultSet 对象中的列数。
		int colunmCount = metaData.getColumnCount();	
		
		//所有结果集的名称属性
		String[] colNameArr = new String[colunmCount]; 

		//循环把结果集中的所有的名称属性放到数组中
		for (int i = 0; i < colunmCount; i++) {  
			colNameArr[i] = rs.getMetaData().getColumnName(i + 1); 
		}	

		// 遍历ResultSet中的每条数据
		while(rs.next()){			
			JSONObject map=new JSONObject();
			for (int i = 1; i <= colunmCount; i++) {
				//属性名称
				String columnName =metaData.getColumnLabel(i);
				//属性值
				String value = rs.getString(columnName);
				//添加到JSONObject数据中
				map.put(columnName, value);	
				//System.out.println(columnName+" :"+value);
			} 
			data.add(map);
		}	
		int sum=data.size();
		
		

		result.append("<categories >");
		
		for(int i=0;i<colNameArr.length;i++){
			if(i==0){
				for(int j=0;j<sum;j++){
					JSONObject title=(JSONObject)data.get(j);
					result.append("<category label='"+title.get(colNameArr[0])+"(h)' />");
				}
				result.append("</categories>");
			}else{
					result.append("<dataset seriesName='"+colNameArr[i]+"' color='"+colors.get(i)+"' anchorBorderColor='"+colors.get(i)+"'>");
					for(int x=0;x<sum;x++){
						JSONObject content=(JSONObject)data.get(x);
						result.append("<set value='"+content.get(colNameArr[i])+"' />");
					}
					result.append("</dataset>");

			}
		}
		result.append("</chart>");
		
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (null != rs) {
				try {
				rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

			if (null != stmt) {
				try {
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (null != conn) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	%>

</head>
<body>

      <%
      
      	if(data.size()<1){
    		out.print("Ext.onReady(function(){Ext.example.msg(\"系统提示\",\"没有查找到产能数据!\");})");
      	}else{
      %>

<table width="98%" border="0" cellspacing="0" cellpadding="30" align="center" >
  <tr> 
    <td valign="top" class="text" align="center"> <div id="chartdiv" align="center"> 
    </div>
      <script type="text/javascript">

	   		var chart = new FusionCharts("js/ScrollLine2D.swf", "CharasdftId", "1200", "600", "0", "0");
		    chart.setDataXML("<%=result%>");		   
		    chart.render("chartdiv");
      <%
      	}
      %>
      

		</script> </td>
  </tr>
</table>	
</body>
</html>
