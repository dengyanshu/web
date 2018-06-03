package com.data.kanban.dc;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.data.connectsql.*;

@Component("dc_sh_kanban")
@Scope("prototype")
@SuppressWarnings("serial")
public class ShouHuo extends Action {
	/**
	 * 大仓收货
	 */
	public void getResult() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall(
					"{call Txn_QueryDeliveryRecordInfo(?,?,?)}"));
			System.out.println();
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
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
