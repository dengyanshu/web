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

public class Gyswlxx extends ActionSupport{
	private String gyswlxx_gys;
	private String gyswlxx_pn;
	private String gyswlxx_begin;
	private String gyswlxx_end;
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
			String ProductNameEX="";
			if(this.gyswlxx_pn.equals("请输入料号")){
				ProductNameEX="";
			}else{
				ProductNameEX=this.gyswlxx_pn;
			}
			
			conn=new OfficialDatabase().getConn();	
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.prepareCall("{call Txn_MaterielQueryDateCode(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");

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
			
			stmt.setString("VendorId", this.gyswlxx_gys);
			stmt.setString("VendorName", "");
			stmt.setString("ProductionLotEX", this.gyswlxx_begin);
			stmt.setString("GRNLotEX", this.gyswlxx_end);
			stmt.setString("ProductNameEX", ProductNameEX);

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
	
	public String getGyswlxx_begin() {
		return gyswlxx_begin;
	}
	
	public String getGyswlxx_end() {
		return gyswlxx_end;
	}
	
	public String getGyswlxx_gys() {
		return gyswlxx_gys;
	}
	
	public String getGyswlxx_pn() {
		return gyswlxx_pn;
	}

	public String getReturnMes() {
		return returnMes;
	}

	public boolean isSuccess() {
		return success;
	}
	
	public void setData(List data) {
		this.data = data;
	}
	
	
	public void setGyswlxx_begin(String gyswlxx_begin) {
		this.gyswlxx_begin = gyswlxx_begin;
	}

	public void setGyswlxx_end(String gyswlxx_end) {
		this.gyswlxx_end = gyswlxx_end;
	}

	public void setGyswlxx_gys(String gyswlxx_gys) {
		this.gyswlxx_gys = gyswlxx_gys;
	}

	public void setGyswlxx_pn(String gyswlxx_pn) {
		this.gyswlxx_pn = gyswlxx_pn;
	}	


	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
