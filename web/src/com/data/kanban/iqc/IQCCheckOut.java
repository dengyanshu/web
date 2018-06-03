package com.data.kanban.iqc;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.data.connectsql.New25_Report_Database;
@Component("iqc_kanban")
@Scope("prototype")
@SuppressWarnings("serial")
/**
 * IQC及时率看板
 * @author zhougs
 *
 */
public class IQCCheckOut extends Action<New25_Report_Database> {
	public void getResult() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall(
					"{call Txn_TimeLinessRatioBoard_domethod(?,?,?,?,?)}"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			
			getCs().setString("dayBegin",request.getParameter("dayBegin"));
			getCs().setString("dayEnd",  request.getParameter("dayEnd"));
			
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			System.out.println(StrData.length());
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
	 * 根据异常批次号，查找异常批次信息
	 */
	public void getErrorLotList() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall(
					"{call Txn_TimeLinessBatchDetail_Domethod(?,?)}"));
			getCs().setString("TimeLinessRatioId",request.getParameter("TimeLinessRatioId"));
			getCs().setInt("flag", Integer.valueOf(request.getParameter("flag")));
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
