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

public class Sjl extends ActionSupport{
	
	private String sjl_sn;
	private List data;
	private boolean success;
	private String returnMes;

	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL的接口
		Statement stmt  = null,stmt2=null; 

		//表示数据库结果集的数据表
		ResultSet rs=null,rs2=null;

		//用于执行 SQL 存储过程的接口
		try {
			conn=new OfficialDatabase().getConn();	
			
			stmt=conn.createStatement();
			stmt2=conn.createStatement();
			
			String sql="" +
					"SELECT     dbo.Lot.LotId, dbo.Lot.LotSN, dbo.Lot.CustomerLotSN, dbo.ProductRoot.ProductName +'.'+ProductRevision as ProductName  , dbo.Product.ProductDescription, dbo.Lot.Qty, dbo.Lot.LotStatus, "+ 
                    "dbo.WorkflowRoot.WorkflowName, dbo.WorkflowStep.WorkflowStepName, WorkflowStep_1.WorkflowStepName AS NextWorkflowStepName, dbo.MO.MOName "+ 
                    "FROM         dbo.Lot  LEFT OUTER JOIN "+ 
                    "dbo.WorkflowRoot INNER JOIN "+ 
                    "dbo.Workflow ON dbo.WorkflowRoot.WorkflowRootId = dbo.Workflow.WorkflowRootId ON dbo.Lot.WorkflowId = dbo.Workflow.WorkflowId LEFT OUTER JOIN "+ 
                    "dbo.MO ON dbo.Lot.MOId = dbo.MO.MOId LEFT OUTER JOIN "+ 
                    "dbo.ProductRoot INNER JOIN "+ 
                    "dbo.Product ON dbo.ProductRoot.ProductRootId = dbo.Product.ProductRootId ON dbo.Lot.ProductId = dbo.Product.ProductId LEFT OUTER JOIN "+ 
                    "dbo.WorkflowStep AS WorkflowStep_1 ON dbo.Lot.NextWorkflowStepId = WorkflowStep_1.WorkflowStepId LEFT OUTER JOIN "+ 
                    "dbo.WorkflowStep ON dbo.Lot.WorkflowStepId = dbo.WorkflowStep.WorkflowStepId "+ 
                    "WHERE     (dbo.Lot.LotSN = '"+this.sjl_sn+"') OR "+ 
                    "(dbo.Lot.VendorLotSN = '"+this.sjl_sn+"') OR "+ 
                    "(dbo.Lot.MAC = '"+this.sjl_sn+"') OR "+ 
                    "(dbo.Lot.PrimaryIMEI ='"+this.sjl_sn+"')";
			

			//得到结果集
			rs2=stmt.executeQuery(sql);
			
			//得到ID
			String LotId="";
			while(rs2.next()){
				LotId = rs2.getString(1); 
			}
			
			String sql2="" +
					"SELECT    dbo.DataChain.CreateDate AS EVENTDATE, dbo.DataChain.LotId, dbo.DataChain.DataChainId, dbo.DataChain.TxnCode, "+
					"  convert(varchar(100),dbo.WorkflowStep.WorkflowStepName)AS WorkflowStepName, "+ 
                    "convert(varchar(100),dbo.SysUser.UserName)as UserName, "+ 
                    "convert(varchar(50),dbo.Workcenter.WorkcenterName)WorkcenterName, "+ 
                    "convert(varchar(50),dbo.Resource.ResourceName)ResourceName, "+ 
                    "convert(varchar(255),dbo.DataChainUserComment.UserComment)as UserComment "+
                    "FROM         dbo.WorkflowStep RIGHT OUTER JOIN "+
                    "dbo.DataChain  LEFT OUTER JOIN "+
                    "dbo.DataChainUserComment ON dbo.DataChain.DataChainId = dbo.DataChainUserComment.DataChainId ON "+ 
                    "dbo.WorkflowStep.WorkflowStepId = dbo.DataChain.WorkflowStepId LEFT OUTER JOIN "+
                    "dbo.SpecificationRoot INNER JOIN "+
                    "dbo.Specification ON dbo.SpecificationRoot.SpecificationRootId = dbo.Specification.SpecificationRootId ON "+ 
                    "dbo.DataChain.SpecificationId = dbo.Specification.SpecificationId LEFT OUTER JOIN "+
                    "dbo.Shift ON dbo.DataChain.ShiftId = dbo.Shift.ShiftId LEFT OUTER JOIN "+
                    "dbo.Resource ON dbo.DataChain.ResourceId = dbo.Resource.ResourceId LEFT OUTER JOIN "+
                    "dbo.Workcenter ON dbo.DataChain.WorkcenterId = dbo.Workcenter.WorkcenterId LEFT OUTER JOIN "+
                    "dbo.SysUser ON dbo.DataChain.UserId = dbo.SysUser.UserId "+
                    "WHERE     (dbo.DataChain.LotId = '"+LotId+"')";
                  // "WHERE     (dbo.DataChain.LotId = 'LOT10001JTPC')";
			
			
			rs=stmt2.executeQuery(sql2);
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

	
	public String getSjl_sn() {
		return sjl_sn;
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
	public void setSjl_sn(String sjl_sn) {
		this.sjl_sn = sjl_sn;
	}	




	public void setSuccess(boolean success) {
		this.success = success;
	}
}
