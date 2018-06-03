package com.data.mes.overall;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.data.connectsql.OfficialDatabase;
import com.opensymphony.xwork2.ActionSupport;

public class page extends ActionSupport{
	private List data;
	private boolean success;
	private String returnMes;
	
	public String getMo() {
		return mo;
	}

	public void setMo(String mo) {
		this.mo = mo;
	}

	public String getPn() {
		return pn;
	}

	public void setPn(String pn) {
		this.pn = pn;
	}

	private String mo;
	
	private String pn;
	
	private int page;

	private int limit;

	private int total;

	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 存储过程的接口
		CallableStatement stmt  = null; 

		//表示数据库结果集的数据表
		ResultSet rs=null;

		//用于执行 SQL 存储过程的接口
		try {
			conn=new OfficialDatabase().getConn();	
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.prepareCall("{call MOName_SMT_ViewList(?,?,?,?,?,?)}");
			stmt.setInt("index", page);
			stmt.setInt("PageRowCount", limit);
			stmt.registerOutParameter("DataCount", Types.INTEGER);
			stmt.setString("MoName", this.mo);
			stmt.setString("ProductName", this.pn);
			stmt.setString("QueryParameter", "");

			stmt.execute();  
		
			//得到结果集
			rs=stmt.getResultSet();
			
			
			this.data = new ArrayList<JSONObject>();
			
			if(rs!=null){

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
					JSONObject jsonObj = new JSONObject();
					//System.out.println(rs.getString("name"));
					for (int i = 1; i <= colunmCount; i++) {
						//属性名称
						String columnName =metaData.getColumnLabel(i);
						//属性值
						String value = rs.getString(columnName);       
						//添加到JSONObject数据中
						jsonObj.put(columnName, value);
					} 
					//把所指定查询的数据放到LIST数组中
					this.data.add(jsonObj);
					//this.array.add(jsonObj);
				}
				this.success=true;
			}else{
				this.returnMes="没有你要查找的结果!";
				this.success=false;
			}
			this.total=stmt.getInt("DataCount");
			//this.data="{success:true, data:'"+this.data+"'}";
			//获取到数据总数量
			//this.results=stmt.getLong("DataCount");

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(null!=rs){
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

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
		return SUCCESS;
	}

	public List getData() {
		return data;
	}

	public int getLimit() {
		return limit;
	}

	public int getPage() {
		return page;
	}
	public String getReturnMes() {
		return returnMes;
	}
	public int getTotal() {
		return total;
	}

	public boolean isSuccess() {
		return success;
	}	

	public void setData(List data) {
		this.data = data;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}	


	public void setSuccess(boolean success) {
		this.success = success;
	}

	public void setTotal(int total) {
		this.total = total;
	}
}
