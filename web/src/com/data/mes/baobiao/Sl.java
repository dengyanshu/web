package com.data.mes.baobiao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import java.util.List;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.BaseAction;
import com.data.mes.action.CloseConn;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class Sl extends ActionSupport{


	private String sl_sn;
	private String returnMes;
	private boolean success;
	private List data;


	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 存储过程的接口
		CallableStatement stmt  = null; 
		
		ResultSet rs=null;

		//用于执行 SQL 存储过程的接口
		try {
			conn=new OfficialDatabase().getConn();	
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.prepareCall("{call QReceiveMaterialDoMethod(?,?,?,?,?,?,?,?,?,?,?,?,?)}");

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
			stmt.setString("I_Sender", "");
			stmt.setString("LotSN", this.sl_sn);
			
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

	public List getData() {
		return data;
	}

	public String getReturnMes() {
		return returnMes;
	}

	public String getSl_sn() {
		return sl_sn;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setData(List data) {
		this.data = data;
	}
	
	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSl_sn(String sl_sn) {
		this.sl_sn = sl_sn;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
