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

public class Wlsldhc extends ActionSupport{
	
	private String wlsldhc_po;
	private String wlsldhc_code;
	private String wlsldhc_sn;
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
			stmt=conn.prepareCall("{call QMaterRewind_DoMethod(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");

			stmt.registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			stmt.setString("I_LanguageId", "1");
			stmt.setString("I_PlugInCommand", "");
			stmt.setString("I_FiltCondition", "");
			stmt.setString("I_OrBitUserId", "");
			stmt.setString("I_OrBitUserName", "");
			stmt.setString("I_ResourceId", "");
			stmt.setString("I_ResourceName", "");
			stmt.setString("I_PKId", "");
			stmt.setString("I_ParentPKId", "");
			stmt.setString("I_Parameter", "");
			stmt.setString("I_Sender", "");
			
			stmt.setString("POName", this.wlsldhc_po);
			stmt.setString("MDocCode", this.wlsldhc_code);
			stmt.setString("LotSN", this.wlsldhc_sn);

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

	public String getWlsldhc_code() {
		return wlsldhc_code;
	}

	public String getWlsldhc_po() {
		return wlsldhc_po;
	}
	
	
	
	public String getWlsldhc_sn() {
		return wlsldhc_sn;
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
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public void setWlsldhc_code(String wlsldhc_code) {
		this.wlsldhc_code = wlsldhc_code;
	}	


	public void setWlsldhc_po(String wlsldhc_po) {
		this.wlsldhc_po = wlsldhc_po;
	}

	public void setWlsldhc_sn(String wlsldhc_sn) {
		this.wlsldhc_sn = wlsldhc_sn;
	}
}
