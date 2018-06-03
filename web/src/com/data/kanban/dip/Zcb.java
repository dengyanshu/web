package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;



@Component("dip_zcb")
@Scope("prototype")
@SuppressWarnings("serial")
public class Zcb extends Action{

	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			//setCs(getConn().prepareCall("{call SmtWorkCenterYield(?,?,?)}"));
			setCs(getConn().prepareCall("{call NewZcb_Dip_time(?,?,?,?)}"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().setString("time", request.getParameter("ZcbTime"));
			//getCs().setString("time", "2015-5-15 11:00:00.000");
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
	
	
	public void getResult2(){
		setConn(new New25_Report_Database().getConn());
		try {
			//setCs(getConn().prepareCall("{call SmtWorkCenterYield(?,?,?)}"));
			setCs(getConn().prepareCall("{call NewZcb_Dip_time(?,?,?,?)}"));
			getCs().setInt("PageRowCount", 1);
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().setString("time", request.getParameter("ZcbTime"));
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
