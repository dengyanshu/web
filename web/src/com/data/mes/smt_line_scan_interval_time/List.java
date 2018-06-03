package com.data.mes.smt_line_scan_interval_time;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("mes_smt_line_scan_interval_time_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class List extends Action{
	
	public void getResult(){
			setConn(new OfficialDatabase().getConn());
			try {
				setCs(getConn().prepareCall("{call Txn_IntervalStaticTPDetail(?,?,?,?,?,?,?,?,?)}"));
				getCs().setString("ResourceName", request.getParameter("IntervalResourceName"));
				getCs().setString("StartTime", request.getParameter("IntervalStartTime"));
				getCs().setString("EndTime", request.getParameter("IntervalEndTime"));
				getCs().setString("StartInterval", request.getParameter("StartInterval"));
				getCs().setString("EndInterval", request.getParameter("EndInterval"));
				getCs().setString("IntervalMinutes", request.getParameter("IntervalMinutes"));
				getCs().setInt("ItemsCount", Integer.valueOf(request.getParameter("limit")));
				getCs().setInt("PageNum", Integer.valueOf(request.getParameter("page")));
				getCs().registerOutParameter("DataCount", Types.INTEGER);
				getCs().execute(); 
				setRs(getCs().getResultSet());
				String StrData=jsonBuilder.buildSet(getRs());

				if(StrData.length()>2){
					toWrite("{success:true,total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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
