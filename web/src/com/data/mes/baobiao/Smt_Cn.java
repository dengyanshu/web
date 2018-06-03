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

public class Smt_Cn extends ActionSupport{
	private String smt_cn_mo;
	private String smt_cn_ddh;
	private String smt_cn_begin;
	private String smt_cn_end;
	private String smt_cn_workcenter;
	private String smt_cn_pn;
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
		try {
			conn=new OfficialDatabase().getConn();	
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.prepareCall("{call Txn_QCAPACITYDoMethod(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			
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
			stmt.setString("I_SourcePKId", "");
			stmt.setString("I_ParentPKId", "");
			stmt.setString("I_Parameter", "");
			
			stmt.setString("UserComment", "");
			stmt.setString("ProductName", "");
			stmt.setString("MOName", this.smt_cn_mo);
			stmt.setString("SoName", "");
			stmt.setString("QASSYNGTYPE", this.smt_cn_ddh);
			stmt.setString("StartDate", this.smt_cn_begin);
			stmt.setString("EndDate", this.smt_cn_end);
			stmt.setString("WorkcenterName", this.smt_cn_workcenter);

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

	public String getSmt_cn_begin() {
		return smt_cn_begin;
	}
	public String getSmt_cn_ddh() {
		return smt_cn_ddh;
	}
	public String getSmt_cn_end() {
		return smt_cn_end;
	}
	public String getSmt_cn_mo() {
		return smt_cn_mo;
	}
	public String getSmt_cn_pn() {
		return smt_cn_pn;
	}
	
	public String getSmt_cn_workcenter() {
		return smt_cn_workcenter;
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

	public void setSmt_cn_begin(String smt_cn_begin) {
		this.smt_cn_begin = smt_cn_begin;
	}

	public void setSmt_cn_ddh(String smt_cn_ddh) {
		this.smt_cn_ddh = smt_cn_ddh;
	}

	public void setSmt_cn_end(String smt_cn_end) {
		this.smt_cn_end = smt_cn_end;
	}
	public void setSmt_cn_mo(String smt_cn_mo) {
		this.smt_cn_mo = smt_cn_mo;
	}
	public void setSmt_cn_pn(String smt_cn_pn) {
		this.smt_cn_pn = smt_cn_pn;
	}	


	public void setSmt_cn_workcenter(String smt_cn_workcenter) {
		this.smt_cn_workcenter = smt_cn_workcenter;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
