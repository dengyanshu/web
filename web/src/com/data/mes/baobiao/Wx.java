package com.data.mes.baobiao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.BaseAction;
import com.opensymphony.xwork2.ActionSupport;

public class Wx extends ActionSupport{

	private String wx_type;
	private String wx_mo;
	private String wx_begin;
	private String wx_end;
	private List data;
	private boolean success;
	private String returnMes;

	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 存储过程的接口
		CallableStatement stmt  = null; 
		Statement stmt2=null;

		//表示数据库结果集的数据表
		ResultSet rs=null;
		ResultSet rs2=null;



		//用于执行 SQL 存储过程的接口
		try {
			conn=new OfficialDatabase().getConn();


				stmt2=conn.createStatement();			
				String sql="select MOId from MO where MOName ='"+this.wx_mo+"'";
				stmt2.executeQuery(sql);	
				rs2=stmt2.getResultSet();	
				String MOID="";	
				while(rs2.next()){
					MOID=rs2.getString("MOId");
				}		

				// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
				stmt=conn.prepareCall("{call Txn_QDIPRepair(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");

				stmt.setString("I_Sender", "");
				stmt.registerOutParameter("I_ReturnMessage", Types.VARCHAR);
				stmt.registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
				stmt.setString("I_LanguageId", "1");
				stmt.setString("I_PlugInCommand", "DIPF");
				stmt.setString("I_OrBitUserId", "");
				stmt.setString("I_OrBitUserName", "");
				stmt.setString("I_ResourceId", "");
				stmt.setString("I_ResourceName", "");
				stmt.setString("I_PKId", "");
				stmt.setString("I_ParentPKId", "");
				stmt.setString("I_Parameter", "");

				stmt.setString("MOID", MOID);
				stmt.setString("MOName", this.wx_mo);
				stmt.setString("StartTime", this.wx_begin);
				stmt.setString("EndTime", this.wx_end);

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
			if(null!=rs){
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

			if(null!=rs2){
				try {
					rs2.close();
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
			if(null!=stmt2 ){
				try {
					stmt2 .close();
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
	public String getReturnMes() {
		return returnMes;
	}
	public String getWx_begin() {
		return wx_begin;
	}
	public String getWx_end() {
		return wx_end;
	}
	public String getWx_mo() {
		return wx_mo;
	}
	public String getWx_type() {
		return wx_type;
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
	public void setWx_begin(String wx_begin) {
		this.wx_begin = wx_begin;
	}
	public void setWx_end(String wx_end) {
		this.wx_end = wx_end;
	}	


	public void setWx_mo(String wx_mo) {
		this.wx_mo = wx_mo;
	}

	public void setWx_type(String wx_type) {
		this.wx_type = wx_type;
	}
}
