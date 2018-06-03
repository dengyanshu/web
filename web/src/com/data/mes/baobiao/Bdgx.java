package com.data.mes.baobiao;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.io.Writer;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.BaseAction;
import com.data.mes.action.CloseConn;
import com.desktop.utils.ModelUtil;
import com.opensymphony.xwork2.ActionSupport;


//@Component("bdgx")
//@Scope("prototype")
public class Bdgx extends ActionSupport{

	private String mo;
	private String num;
	private List data;
	private boolean success;
	private String returnMes;
	
	public String execute() throws Exception{
		Connection conn=null;
		CallableStatement stmt  = null; 
		ResultSet rs=null;
		try {
			conn=new OfficialDatabase().getConn();	
			stmt=conn.prepareCall("{call SP_QUERY_SN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
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
			
			stmt.setString("MONAME", this.mo);
			stmt.setString("SNTYPE", "");
			stmt.setString("RobertSN", "");

			stmt.execute();  
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

	public String getMo() {
		return mo;
	}
	
	public String getNum() {
		return num;
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

	public void setMo(String mo) {
		this.mo = mo;
	}

	public void setNum(String num) {
		this.num = num;
	}


	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
