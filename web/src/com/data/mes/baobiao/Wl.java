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

public class Wl extends ActionSupport{
	private String wl_ab;
	private String wl_host;
	private String wl_mo;
	private String wl_multiple;
	private List data;
	private boolean success;
	private String returnMes;

	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL的接口
		Statement stmt  = null; 

		//表示数据库结果集的数据表
		ResultSet rs=null;

		//用于执行 SQL 存储过程的接口
		try {
			conn=new OfficialDatabase().getConn();	
	
			stmt=conn.createStatement();
			String sql="" +
					"DECLARE @MachineName NVARCHAR(50)='"+this.wl_host+"' " +
					"DECLARE @MOName NVARCHAR(50)='"+this.wl_mo+"' " +
					"DECLARE @ABSide NVARCHAR(50)='"+this.wl_ab+"' " +
					"DECLARE @WorkcenterId CHAR(12) " +
					"DECLARE @WorkcenterName NVARCHAR(50) " +
					"DECLARE @DeviceTypeId CHAR(12) " +
					"SELECT @WorkcenterId=Resource.WorkcenterId ," +
					"@WorkcenterName=Workcenter.WorkcenterName, " +
					"@DeviceTypeId=dbo.Resource.DeviceTypeId " +
					"FROM dbo.Resource WITH(NOLOCK) " +
					"LEFT JOIN dbo.Workcenter WITH(NOLOCK) ON dbo.Resource.WorkcenterId = dbo.Workcenter.WorkcenterId " +
					"WHERE Resource.ResourceName=@MachineName " +
					"IF @WorkcenterId IS NULL " +
					"BEGIN " +
					"RETURN " +
					"END " +
					"SELECT A.MOName,@WorkcenterName WorkcenterName ,A.StationNo,A.SLotNO,A.Side,A.BaseQty,ISNULL(B.Qty,0) Qty " +
					"FROM " +
					"( " +
					"SELECT MO.MOId,MO.MOName,dbo.SMTMount.Side,SMTMountItem.StationNo AS StationNo,SMTMountItem.SLotNO,MIN(SMTMountItem.BaseQty) as BaseQty " +
					"FROM dbo.MO WITH(NOLOCK)  " +
					"LEFT JOIN dbo.MO_SMTMount WITH(NOLOCK) ON dbo.MO.MOId = dbo.MO_SMTMount.MOId " +
					"LEFT JOIN dbo.SMTMount WITH(NOLOCK) ON dbo.MO_SMTMount.SMTMountName = dbo.SMTMount.SMTMountName " +
					"LEFT JOIN dbo.SMTMountItem WITH(NOLOCK) ON dbo.SMTMount.SMTMountId = dbo.SMTMountItem.SMTMountId " +
					"WHERE dbo.SMTMount.DeviceTypeId=@DeviceTypeId AND MO.MOName=@MOName and SMTMount.Side=@ABSide " +
					"GROUP BY MO.MOId,MO.MOName,dbo.SMTMount.Side,SMTMountItem.StationNo,SMTMountItem.SLotNO " +
					")A " +
					"LEFT JOIN" +
					"( " +
					"SELECT LotOnSMT.MOId,SUBSTRING(LotOnSMT.StationNO,4,1) AS StationNO,LotOnSMT.SLotNO ,SUM(dbo.Lot.Qty) AS Qty " +
					"FROM dbo.LotOnSMT WITH(NOLOCK) " +
					"LEFT JOIN dbo.Lot WITH(NOLOCK) ON dbo.LotOnSMT.LotId = dbo.Lot.LotId " +
					"WHERE LotOnSMT.SMTLineNO=@WorkcenterName " +
					"GROUP BY LotOnSMT.MOId,LotOnSMT.StationNO,LotOnSMT.SLotNO " +
					")B ON A.MOId=B.MOId AND A.StationNo=B.StationNO AND A.SLotNO=B.SLotNO " +
					"ORDER BY A.Side,A.MOName,A.StationNo,A.SLotNO";
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
	
	public String getReturnMes() {
		return returnMes;
	}
	
	public String getWl_ab() {
		return wl_ab;
	}
	
	public String getWl_host() {
		return wl_host;
	}

	public String getWl_mo() {
		return wl_mo;
	}

	public String getWl_multiple() {
		return wl_multiple;
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
	public void setWl_ab(String wl_ab) {
		this.wl_ab = wl_ab;
	}
	public void setWl_host(String wl_host) {
		this.wl_host = wl_host;
	}	


	public void setWl_mo(String wl_mo) {
		this.wl_mo = wl_mo;
	}

	public void setWl_multiple(String wl_multiple) {
		this.wl_multiple = wl_multiple;
	}
}
