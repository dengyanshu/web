package com.data.mes.baobiao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
//import java.util.Date;

import net.sf.json.JSONObject;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.BaseAction;
import com.data.mes.action.CloseConn;
import com.opensymphony.xwork2.ActionSupport;

public class Smt_Zxwx extends ActionSupport{
	private String smt_zxwx_moId;
	private String smt_zxwx_sn;
	private String smt_zxwx_mo;
	private String smt_zxwx_begin;
	private String smt_zxwx_end;
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
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.prepareCall("{call Txn_SMTRepairOnLineQueryDoMethod(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");

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
			
			stmt.setString("MOID", this.smt_zxwx_moId);
			stmt.setString("MOName", this.smt_zxwx_mo);
			stmt.setString("LotSN", this.smt_zxwx_sn);
			
			stmt.setString("BeginDate", this.smt_zxwx_begin);
			stmt.setString("EndDate", this.smt_zxwx_end);

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
	
	public String getSmt_zxwx_begin() {
		return smt_zxwx_begin;
	}
	
	public String getSmt_zxwx_end() {
		return smt_zxwx_end;
	}
	
	public String getSmt_zxwx_mo() {
		return smt_zxwx_mo;
	}
	
	public String getSmt_zxwx_moId() {
		return smt_zxwx_moId;
	}
	
	public String getSmt_zxwx_sn() {
		return smt_zxwx_sn;
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
	
	

	public void setSmt_zxwx_begin(String smt_zxwx_begin) {
		this.smt_zxwx_begin = smt_zxwx_begin;
	}

	public void setSmt_zxwx_end(String smt_zxwx_end) {
		this.smt_zxwx_end = smt_zxwx_end;
	}

	public void setSmt_zxwx_mo(String smt_zxwx_mo) {
		this.smt_zxwx_mo = smt_zxwx_mo;
	}

	public void setSmt_zxwx_moId(String smt_zxwx_moId) {
		this.smt_zxwx_moId = smt_zxwx_moId;
	}	


	public void setSmt_zxwx_sn(String smt_zxwx_sn) {
		this.smt_zxwx_sn = smt_zxwx_sn;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}