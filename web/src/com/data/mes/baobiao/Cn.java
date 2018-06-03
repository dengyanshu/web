package com.data.mes.baobiao;

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
import com.data.mes.action.CloseConn;
import com.opensymphony.xwork2.ActionSupport;

public class Cn extends ActionSupport{

	private String cn_mo;
	private String cn_pn;
	private String cn_begin;
	private String cn_end;
	
	private List data;
	private boolean success;
	private String returnMes;
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
			
			String sql="";
			if(!this.cn_mo.equals("")&&!this.cn_pn.equals("")){		
				sql=""+
						"select MO.MOName ,Productroot.productname, product.ProductDescription,WorkcenterName,SpecificationRoot.SpecificationName, "+
						"COUNT(0)as '总产量' ,convert(varchar(100), MIN(DataChain.CreateDate),20) as '开始事件',CONVERT(varchar(100), MAX(DataChain.CreateDate),20) as '结束事件'  "+
						"from MO inner join ProductRoot on MO.ProductId = PRoductRoot.DefaultProductId  "+
						"inner join DataChain on MO.MOId = DataChain.MOId "+ 
						"Inner join Product on Product.ProductId = Mo.ProductId "+
						"inner join Workcenter on mo.WorkCenterID = Workcenter.WorkcenterId "+
						"inner join SpecificationRoot on DataChain.SpecificationId = SpecificationRoot.DefaultSpecificationId "+
						"where MO.MOName='"+this.cn_mo+"' and DataChain.TxnCode ='MOVE' AND "+
						"DataChain.CreateDate between '"+this.cn_begin+"' and '"+this.cn_end+"' "+
						"group by MO.MOName,Productroot.productname, product.ProductDescription,WorkcenterName,SpecificationRoot.SpecificationName "+
						"";
			}else if(!this.cn_pn.equals("")&&this.cn_mo.equals("")){			
				sql=""+
						"select MO.MOName ,Productroot.productname, product.ProductDescription,WorkcenterName,SpecificationRoot.SpecificationName, "+
						"COUNT(0)as '总产量' ,convert(varchar(100), MIN(DataChain.CreateDate),20) as '开始事件',CONVERT(varchar(100), MAX(DataChain.CreateDate),20) as '结束事件' "+
						"from MO inner join ProductRoot on MO.ProductId = PRoductRoot.DefaultProductId "+
						"inner join DataChain on MO.MOId = DataChain.MOId "+ 
						"Inner join Product on Product.ProductId = Mo.ProductId "+
						"inner join Workcenter on mo.WorkCenterID = Workcenter.WorkcenterId "+
						"inner join SpecificationRoot on DataChain.SpecificationId = SpecificationRoot.DefaultSpecificationId "+
						"where ProductRoot.ProductName='"+this.cn_pn+"' and "+
						" DataChain.TxnCode ='MOVE' "+ 
						"AND DataChain.CreateDate between '"+this.cn_begin+"' and '"+this.cn_end+"' "+
						"group by MO.MOName,Productroot.productname, product.ProductDescription,WorkcenterName,SpecificationRoot.SpecificationName "+
						"order by mo.MOName "+ 	
						"";
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

	public String getCn_begin() {
		return cn_begin;
	}

	public String getCn_end() {
		return cn_end;
	} 

	public String getCn_mo() {
		return cn_mo;
	}

	public String getCn_pn() {
		return cn_pn;
	}

	public List getData() {
		return data;
	}

	public String getReturnMes() {
		return returnMes;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setCn_begin(String cn_begin) {
		this.cn_begin = cn_begin;
	}

	public void setCn_end(String cn_end) {
		this.cn_end = cn_end;
	}

	public void setCn_mo(String cn_mo) {
		this.cn_mo = cn_mo;
	}

	public void setCn_pn(String cn_pn) {
		this.cn_pn = cn_pn;
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
}
