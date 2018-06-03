package com.data.mes.baobiao;

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
import com.data.mes.action.CloseConn;
import com.opensymphony.xwork2.ActionSupport;

public class Ckwl extends ActionSupport{

	private String ckwl_type;
	private String ckwl_pn;
	private List data;
	private boolean success;
	private String returnMes;

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

			if(this.ckwl_type.equals("a")){		
				stmt=conn.prepareCall("{call QueryOnM(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
				
				stmt.setString("I_Sender", "");
				stmt.registerOutParameter("I_ReturnMessage", Types.VARCHAR);
				stmt.registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
				stmt.setString("I_LanguageId", "1");
				stmt.setString("I_PlugInCommand", "");
				stmt.setString("I_OrBitUserId", "");
				stmt.setString("I_OrBitUserName", "");
				stmt.setString("I_ResourceId", "");
				stmt.setString("I_ResourceName", "");
				stmt.setString("I_PKId", "");
				stmt.setString("I_ParentPKId", "");
				stmt.setString("I_Parameter", "");
				
				stmt.setString("ProductName11", this.ckwl_pn);
						
				
			}else if(this.ckwl_type.equals("b")){
				stmt=conn.prepareCall("{call StockLocationDOMethod(?,?,?,?,?,?,?,?,?,?,?,?,?)}");

				stmt.setString("I_Sender", "");
				stmt.registerOutParameter("I_ReturnMessage", Types.VARCHAR);
				stmt.registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
				stmt.setString("I_LanguageId", "1");
				stmt.setString("I_PlugInCommand", "");
				stmt.setString("I_OrBitUserId", "");
				stmt.setString("I_OrBitUserName", "");
				stmt.setString("I_ResourceId", "");
				stmt.setString("I_ResourceName", "");
				stmt.setString("I_PKId", "");
				stmt.setString("I_ParentPKId", "");
				stmt.setString("I_Parameter", "");

				stmt.setString("ProductName", this.ckwl_pn);
				
			}
			stmt.execute();	
			 

			//得到结果集
			rs=stmt.getResultSet();
			BaseAction ba=new BaseAction(rs);
			this.data=ba.ResultData();	
			
			if(this.data.size()>0){
				this.success=true;
			}else{
				this.returnMes="没有你要查找的结果!";
				this.success=false;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			new CloseConn(stmt,rs,conn).ColseCS();
		}
		return SUCCESS;
	}

	public String getCkwl_pn() {
		return ckwl_pn;
	}

	public String getCkwl_type() {
		return ckwl_type;
	}

	public List getData() {
		return data;
	}

	public String getReturnMes() {
		return returnMes;
	}

	public boolean isSuccess() {
		return success;
	}
	public void setCkwl_pn(String ckwl_pn) {
		this.ckwl_pn = ckwl_pn;
	}

	public void setCkwl_type(String ckwl_type) {
		this.ckwl_type = ckwl_type;
	}
	public void setData(List data) {
		this.data = data;
	}
	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
