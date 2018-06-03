package com.data.kanban.tj_sc;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.connectsql.TjDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;



@Component("tj_sc_sh")
@Scope("prototype")
@SuppressWarnings("serial")
public class Sh extends Action{

	public void getResult(){
		setConn(new TjDatabase().getConn());
		try {
			
			//setCs(getConn().prepareCall("{call SmtWorkCenterYield(?,?,?)}"));
			setCs(getConn().prepareCall("{call NewHMSc_time(?,?,?,?)}"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().setString("time", request.getParameter("ShTime"));
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
		setConn(new TjDatabase().getConn());
		try {
			//setCs(getConn().prepareCall("{call SmtWorkCenterYield(?,?,?)}"));
			setCs(getConn().prepareCall("{call NewZmSc(?,?,?)}"));
			getCs().setInt("PageRowCount", 1);
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("PageIndex")));
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
