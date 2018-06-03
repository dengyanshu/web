package com.data.mes.xigao;

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

public class Xgsyjlcx extends ActionSupport{
	
	private String sn;
	private String mo;
	private String begin_date;
	private String end_date;

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
			stmt=conn.prepareCall("{call Txn_TinolRecordQueryDoMethod(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");

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
			
			stmt.setString("TinolSN", this.sn);	
			stmt.setString("MOname", this.mo);
			stmt.setString("TinolDateBegin", this.begin_date);
			stmt.setString("TinolDateEnd", this.end_date);

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

	public String getBegin_date() {
		return begin_date;
	}
	public List getData() {
		return data;
	}
	public String getEnd_date() {
		return end_date;
	}
	public String getMo() {
		return mo;
	}
	
	public String getReturnMes() {
		return returnMes;
	}
	public String getSn() {
		return sn;
	}
	public boolean isSuccess() {
		return success;
	}

	public void setBegin_date(String begin_date) {
		this.begin_date = begin_date;
	}

	public void setData(List data) {
		this.data = data;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public void setMo(String mo) {
		this.mo = mo;
	}

	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}	


	public void setSn(String sn) {
		this.sn = sn;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
