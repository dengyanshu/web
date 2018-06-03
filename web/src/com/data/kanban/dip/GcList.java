package com.data.kanban.dip;

import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_gc_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class GcList extends Action{
	public void getResult(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Specification_Dip_detail(?,?,?,?)}"));
			getCs().setString("MoName", request.getParameter("MoName"));
			getCs().setString("WorkcenterName", request.getParameter("WorkcenterName"));
			getCs().setString("Time1", request.getParameter("Time1"));
			getCs().setString("Time2", request.getParameter("Time2"));
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