package com.data.kanban.shebei;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.data.connectsql.*;

@Component("sb_kanban")
@Scope("prototype")
@SuppressWarnings("serial")
public class SheBei extends Action {
	/**
	 * 设备状态搜索
	 */
	public void getResult() {
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall(
					"{call Txn_QueryInstrumentItem(?,?,?,?,?,?,?)}"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			try {
				getCs().setString("BelongDivision",new String(request.getParameter("BelongDivision").getBytes("ISO-8859-1"),"utf-8"));
				getCs().setString("InstrumentType", new String(request.getParameter("InstrumentType").getBytes("ISO-8859-1"),"utf-8"));
				getCs().setString("UserDepartments",new String(request.getParameter("UserDepartments").getBytes("ISO-8859-1"),"utf-8"));
				getCs().setString("Status", request.getParameter("status"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 所属部门列表
	 */
	public void getBU_ViewList() {
		setConn(new New25_XM_Database().getConn());
		try {
			String sql = "SELECT DISTINCT UserDepartments FROM dbo.Instrument";
			setCs(getConn().prepareCall(sql));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 设备保养/维修记录
	 */
	public void getMaintenanceList() {
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall(
					"{call Txn_getMaintenanceList(?)}"));
			getCs().setString("InstrumentId",request.getParameter("InstrumentId"));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 各事业部设备总看板
	 */
	public void getInstrumentList() {
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall(
					"{call Manufacture_Instrument_Domethod(?,?,?,?,?,?,?)}"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			try {
				getCs().setString("BelongDivision",new String(request.getParameter("BelongDivision").getBytes("ISO-8859-1"),"utf-8"));
				getCs().setString("InstrumentType", new String(request.getParameter("InstrumentType").getBytes("ISO-8859-1"),"utf-8"));
				getCs().setString("UserDepartments",new String(request.getParameter("UserDepartments").getBytes("ISO-8859-1"),"utf-8"));
				getCs().setString("Status", request.getParameter("status"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
