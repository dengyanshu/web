package com.data.mes.overall;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.BaseAction;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class Cn_MO extends ActionSupport{
	
	private String pn;
	@SuppressWarnings("rawtypes")
	private List data;
	private boolean success;
	private String returnMes;
	private String sl_sn;
	private long results;
	
	
	@SuppressWarnings("unchecked")
	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 的接口
		Statement stmt  = null; 

		//表示数据库结果集的数据表
		ResultSet rs=null;

		//用于执行 SQL 存储过程的接口
		try {
			conn=new OfficialDatabase().getConn();	
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.createStatement();
			String sql="SELECT MO.MOName,Product.ProductDescription,MOId FROM dbo.MO INNER JOIN ProductRoot ON MO.ProductId = ProductRoot.DefaultProductId "+
					"INNER JOIN Product ON dbo.ProductRoot.ProductRootId = dbo.Product.ProductRootId "+
					"where ProductRoot.ProductName='"+this.pn+"'";
			//得到结果集
			rs=stmt.executeQuery(sql);

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

	public List getData() {
		return data;
	}

	public String getPn() {
		return pn;
	}

	public long getResults() {
		return results;
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

	public void setPn(String pn) {
		this.pn = pn;
	}

	public void setResults(long results) {
		this.results = results;
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
