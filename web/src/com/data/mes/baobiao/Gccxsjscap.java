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
import com.data.mes.action.CloseConn;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class Gccxsjscap extends ActionSupport{

	private String gccxsjscap_pn;
	private String gccxsjscap_mo;

	@SuppressWarnings("rawtypes")
	private List data;

	private boolean success;

	private String returnMes;
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
			
			stmt=conn.createStatement();
			
/*			String pn="",mo="";
			if(this.gccxsjscap_mo.equals("请输入工单")){		
				mo="";
			}else{			
				mo=this.gccxsjscap_mo;
			}
			if(this.gccxsjscap_pn.equals("请输入料号")){
				pn="";
			}else{
				pn=this.gccxsjscap_pn;
			}*/
			
			String sql="";
			if(!this.gccxsjscap_mo.equals("")&&this.gccxsjscap_pn.equals("")){
				sql="SELECT WorkcenterName AS '工作中心',mo.MOName AS '工单',MO.MOQtyRequired as '工单数量',product.ProductSpecification AS '产品描述', "+ 
				"CONVERT(varchar(100),ExecuteDateFrom , 20) AS '生产开始时间',CONVERT(varchar(100),ExecuteDateTo , 20) AS '生产结束时间',CONVERT(varchar(100),PlannedDateFrom , 20) AS '计划生产开始时间' , "+ 
				"CONVERT(varchar(100),PlannedDateTo , 20) AS '计划生产结束时间'FROM MO INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId INNER JOIN dbo.Product ON MO.ProductId = Product.ProductId "+
				"WHERE  MO.MOName = '"+this.gccxsjscap_mo+"' AND ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL";	
			}else if(this.gccxsjscap_mo.equals("")&&!this.gccxsjscap_pn.equals("")){			
				sql=""+
				"SELECT WorkcenterName AS '工作中心',mo.MOName AS '工单',MO.MOQtyRequired as '工单数量',product.ProductSpecification AS '产品描述', "+ 
				"CONVERT(varchar(100),ExecuteDateFrom , 20) AS '生产开始时间', "+
				"CONVERT(varchar(100),ExecuteDateTo , 20) AS '生产结束时间', "+
				"CONVERT(varchar(100),PlannedDateFrom , 20) AS '计划生产开始时间' , "+ 
				"CONVERT(varchar(100),PlannedDateTo , 20) AS '计划生产结束时间' "+
				"FROM MO "+  
				"INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId "+
				"INNER JOIN dbo.Product ON MO.ProductId = Product.ProductId "+
				"inner join ProductRoot on MO.ProductId = ProductRoot.DefaultProductId "+
				"WHERE  ProductRoot.ProductName = '"+this.gccxsjscap_pn+"' AND "+ 
				"ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL";
				}

			//得到结果集
			rs=stmt.executeQuery(sql);
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
			new CloseConn(stmt,rs,conn).CloseS();
		}
		return SUCCESS;
	}
	
	public List getData() {
		return data;
	}
	public String getGccxsjscap_mo() {
		return gccxsjscap_mo;
	}
	public String getGccxsjscap_pn() {
		return gccxsjscap_pn;
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


	public void setGccxsjscap_mo(String gccxsjscap_mo) {
		this.gccxsjscap_mo = gccxsjscap_mo;
	}

	public void setGccxsjscap_pn(String gccxsjscap_pn) {
		this.gccxsjscap_pn = gccxsjscap_pn;
	}



	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}


	public void setSuccess(boolean success) {
		this.success = success;
	}

}
