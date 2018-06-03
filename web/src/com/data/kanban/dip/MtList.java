package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_mt_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class MtList extends Action{
	public void getResult(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call ManufactureMonitorInfo_ForWeb(?,?,?)}"));
			getCs().setString("MoName", request.getParameter("MoName"));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().registerOutParameter("I_ReturnMessage", Types.NVARCHAR);
			getCs().execute(); 
			
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
		
			if(StrData.length()>2){	

				toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
			
			}else{
				toWrite("{success:false,"+getCs().getString("I_ReturnMessage") +"}");
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