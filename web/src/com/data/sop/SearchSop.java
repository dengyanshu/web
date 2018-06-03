package com.data.sop;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.data.connectsql.OfficialDatabase;
import com.data.connectsql.TestDatabase;
import com.opensymphony.xwork2.ActionSupport;

public class SearchSop extends ActionSupport{
	private String name;
	private String zcb;
	
	private List data;
	private boolean success;
	private String returnMes;
	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 的接口
		Statement stmt  = null; 

		//表示数据库结果集的数据表
		ResultSet rs=null;

		//用于执行 SQL 存储过程的接口
		try {
			conn=new TestDatabase().getConn();	
			
			stmt=conn.createStatement();
			
			String sql="";
			
			if(zcb.equals("请选择制程别")){
			//if(zcb==null){
				sql="select id,processing,name,date,type from SopData where name like '%"+this.name+"%'";			
			}else{
				sql="select id,processing,name,date,type from SopData where name like '%"+this.name+"%' AND processing='"+this.zcb+"'";
			}
						
			//得到结果集

			rs=stmt.executeQuery(sql);

			this.data = new ArrayList<JSONObject>();

			if(rs!=null||rs.next()){

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
	public String getName() {
		return name;
	}
	public String getReturnMes() {
		return returnMes;
	}
	public String getZcb() {
		return zcb;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setData(List data) {
		this.data = data;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}

	public void setZcb(String zcb) {
		this.zcb = zcb;
	}
}
