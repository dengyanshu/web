package com.data.kanban.tj_sc;

import java.sql.SQLException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.TjDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("tj_sc_zm_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class ZmList extends Action{
	public void getResult(){
		setConn(new TjDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call NewZmSc_detail(?,?)}"));
			getCs().setString("MOId", request.getParameter("MOId"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));
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