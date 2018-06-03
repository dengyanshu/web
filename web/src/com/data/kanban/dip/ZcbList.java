package com.data.kanban.dip;

import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_zcb_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class ZcbList extends Action{
	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call NewZcb_Dip_detail(?,?,?,?,?)}"));
			getCs().setString("MOId", request.getParameter("MOId"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));
			getCs().setString("outtime", request.getParameter("Outtime"));
			getCs().setString("Specificationid", request.getParameter("Specificationid"));
			getCs().setInt("Flag", 1);
			getCs().execute(); 	
		setRs(getCs().getResultSet());
		String StrData=jsonBuilder.buildSet(getRs());
		
			if(StrData.length()>2){
				toWrite("{success:true,data:"+StrData+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}	
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}