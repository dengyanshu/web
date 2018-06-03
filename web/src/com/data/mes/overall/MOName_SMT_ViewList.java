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
import com.data.mes.action.BaseAction;
import com.opensymphony.xwork2.ActionSupport;

public class MOName_SMT_ViewList extends ActionSupport{
	private List data;
	private boolean success;
	private String returnMes;
	
	private String mo;
	private String pn;
	private String type;
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
			stmt=conn.prepareCall("{call MOName_SMT_ViewList(?,?,?,?,?,?,?)}");
			stmt.setInt("index", page);
			stmt.setInt("PageRowCount", limit);
			stmt.registerOutParameter("DataCount", Types.INTEGER);
			stmt.setString("MoName", this.mo);
			stmt.setString("ProductName", this.pn);
			stmt.setString("QueryParameter", "");
			stmt.setString("MOSTDType", this.type);   //S D P

			stmt.execute();  
		
			//得到结果集
			rs=stmt.getResultSet();
			
			if(rs!=null&&rs.next()){
				BaseAction ba=new BaseAction(rs);
				this.data=ba.ResultData();			
				this.success=true;
			}else{
				this.returnMes="没有你要查找的结果!";
				this.success=false;
			}
			this.total=stmt.getInt("DataCount");

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
	
	public String getMo() {
		return mo;
	}

	public int getPage() {
		return page;
	}

	public String getPn() {
		return pn;
	}

	public String getReturnMes() {
		return returnMes;
	}

	public int getTotal() {
		return total;
	}

	public String getType() {
		return type;
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

	public void setMo(String mo) {
		this.mo = mo;
	}	

	public void setPage(int page) {
		this.page = page;
	}

	public void setPn(String pn) {
		this.pn = pn;
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

	public void setType(String type) {
		this.type = type;
	}
}
