package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_lts")
@Scope("prototype")
@SuppressWarnings("serial")
public class Lts extends Action{
	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call LaborTimeSummaryReport_ForWeb(?,?,?,?,?)}"));
			getCs().setString("date1","" );
			getCs().setString("date2", "");
			getCs().setInt("level", 0);
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().setString("OrgName",request.getParameter("OrgName") );
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
	public void getResult2(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call LaborTimeSummaryReport_ForWeb(?,?,?,?)}"));
			getCs().setString("date1","" );
			getCs().setString("date2", "");
			getCs().setInt("level", Integer.valueOf(request.getParameter("level")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().execute(); 	
			
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
		
			if(StrData.length()>2){	
				toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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