package com.data.kanban.silou_site;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("silou_site")
@Scope("prototype")
@SuppressWarnings("serial")
public class Silou_site extends Action {
	public void getResult() {
		setConn(new com.data.connectsql.New25_Database(). getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call Txn_WorkshopBoard_4d(?,?)}"));
			getCs().setString("Siteid", request.getParameter("site"));	
			getCs().setString("Shift", request.getParameter("shiftname"));
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
   
	
	
	public void getResult_new() {
		setConn(new com.data.connectsql.New25_Report_Database().getConn());// 10.2.0.8
		try {
//			@Chejian VARCHAR(50),       
//			@WorkcenterId char(12)='',
//			@fDate DATE=NULL,
//			@Banbie VARCHAR(50)=NUL
			setCs(getConn().prepareCall("{call DIP_Board_Monitor_New(?,?,?,?,?)}"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));
			getCs().setString("Chejian", request.getParameter("status"));
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
}
