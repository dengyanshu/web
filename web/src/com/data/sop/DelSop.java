package com.data.sop;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.data.connectsql.TestDatabase;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class DelSop extends ActionSupport{
	private String ids;
	private boolean success;
	private String returnMes;

	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 的接口
		Statement stmt  = null; 

		//用于执行 SQL 存储过程的接口
		try {
			conn=new TestDatabase().getConn();	
			
			stmt=conn.createStatement();
			
			int ok=0;
			String sql="DELETE SopData FROM SopData inner join (SELECT id FROM  SQL_split('"+ids+"',','))oo ON SopData.id=OO.id";					
			ok=stmt.executeUpdate(sql);

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
	public String getIds() {
		return ids;
	}

	public String getReturnMes() {
		return returnMes;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}


	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
