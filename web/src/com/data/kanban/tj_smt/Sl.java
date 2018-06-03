package com.data.kanban.tj_smt;


import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.TjDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("tj_smt_sl")
@Scope("prototype")
@SuppressWarnings("serial")
public class Sl extends Action{
	public void getResult(){
		setConn(new TjDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call TJ_SMT_Mnitor(?,?,?,?)}"));
			getCs().setString("QMOName", request.getParameter("mo"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
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