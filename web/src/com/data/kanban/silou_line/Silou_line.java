package com.data.kanban.silou_line;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("silou_line_kanban")
@Scope("prototype")
@SuppressWarnings("serial")
public class Silou_line extends Action {
	public void getResult() {
		setConn(new com.data.connectsql.New25_Database(). getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call Txn_ProductionMainBoardItem(?,?,?,?,?,?)}"));
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().setString("MOName", request.getParameter("moname"));	
			getCs().setString("WorkcenterName", request.getParameter("line"));
			getCs().setString("WorkprocedureFlowName", request.getParameter("status"));
			getCs().setString("Date", request.getParameter("chaxunrq"));
			getCs().setString("Time", "");
			getCs().execute();
			System.out.println(request.getParameter("status"));
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
	
//	setConn(new New25_Report_Database().getConn());
//	try {
//		setCs(getConn().prepareCall("{call Txn_PerformanceMonitor(?)}"));
//		getCs().setString("serverName", request.getParameter("serverName"));
    
	public void getResult_new() {
		setConn(new com.data.connectsql.New25_Report_Database().getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call DIP_Board_Bridgeward_New(?,?,?,?,?)}"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));	
			getCs().setString("WorkFlowName", request.getParameter("status"));
			getCs().setString("fDate", request.getParameter("chaxunrq"));
			getCs().setString("fDate2", request.getParameter("chaxunrq2"));
			getCs().setString("Banbie", request.getParameter("banci"));
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
	
	public void getResult_mo() {
		setConn(new  com.data.connectsql.New25_Report_Database(). getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call threeFloor_4d(?)}"));
			getCs().setString("site", request.getParameter("site"));
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
	
}
