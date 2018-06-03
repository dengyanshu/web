package com.data.mes.xigao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.data.connectsql.OfficialDatabase;
import com.opensymphony.xwork2.ActionSupport;

public class Xgsxsm extends ActionSupport{
	private String sn;
	private String mo;
	private String usernumber;
	private String smtline;

	private List data;
	private boolean success;
	private String returnMes;
	
	public String execute()throws Exception{
		Connection conn=null;
		CallableStatement stmt=null;
		ResultSet rs=null;

		try{
			conn=new OfficialDatabase().getConn();	
			stmt=conn.prepareCall("{call Txn_TinolOnLine(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			//系统平台默认的参数：
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
			//处理参数：
			stmt.setString("TinolinfoID", "");
			stmt.setString("TinolID", "");
			stmt.setString("TinolSN", this.sn);
			stmt.setString("MOID", "");
			stmt.setString("MOname", this.mo);
			stmt.setString("SMTLineNO", this.smtline);
			stmt.setString("LineUser", this.usernumber);
			//执行存储过程
			stmt.execute();  

			//得到结果集
			rs=stmt.getResultSet();
			this.data = new ArrayList<JSONObject>();

			this.returnMes=stmt.getString("I_ReturnMessage");
			this.success=true;
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
	public String getMo() {
		return mo;
	}
	
	public String getReturnMes() {
		return returnMes;
	}
	public String getSmtline() {
		return smtline;
	}
	public String getSn() {
		return sn;
	}


	public String getUsernumber() {
		return usernumber;
	}

	public boolean isSuccess() {
		return success;
	}
	public void setData(List data) {
		this.data = data;
	}
	public void setMo(String mo) {
		this.mo = mo;
	}
	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}
	public void setSmtline(String smtline) {
		this.smtline = smtline;
	}
	public void setSn(String sn) {
		this.sn = sn;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public void setUsernumber(String usernumber) {
		this.usernumber = usernumber;
	}

}
