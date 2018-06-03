package com.data.sop;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.data.connectsql.TestDatabase;
import com.desktop.utils.JsonBuilder;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class UpdateSop extends ActionSupport{
	private String modification;
	private boolean success;
	private String returnMes;
	
	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 的接口
		Statement stmt  = null; 
		

		//表示数据库结果集的数据表
		ResultSet rs=null;


		List<Map> list=new JsonBuilder().fromJsonArray(modification);
		
		//用于执行 SQL 存储过程的接口
		try {
			conn=new TestDatabase().getConn();	
			
			stmt=conn.createStatement();
			
			String sql="";	
			
			JSONArray jsonR = JSONArray.fromObject(modification);  

			int size = jsonR.size();  
			
			int ok=0;
			
			for (int i = 0; i < size; i++) {
				JSONObject jsonMap = JSONObject.fromObject(jsonR.get(i));
				Collection values=jsonMap.values();
				Object[] arr=values.toArray();
				sql="UPDATE SopData SET processing='"+arr[1]+"',name='"+arr[2]+"',date='"+arr[3]+"',type='"+arr[4]+"' WHERE id='"+arr[0]+"'";
				ok=stmt.executeUpdate(sql);
			}	
			if(ok==1){
				this.success=true;
				this.returnMes="更新完成!";
			}else{
				this.success=false;
				this.returnMes="更新失败!";
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
		return SUCCESS;
	}
	
	public String getModification() {
		return modification;
	}
	public String getReturnMes() {
		return returnMes;
	}	
	public boolean isSuccess() {
		return success;
	}
	public void setModification(String modification) {
		this.modification = modification;
	}


	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
