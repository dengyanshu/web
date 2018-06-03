package com.data.kanban.ff_line;

import java.sql.CallableStatement;
import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;


@Component("ff_line_lines")
@Scope("prototype")
@SuppressWarnings("serial")
public class Lines extends Action{

	public void getResult(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Productivity_4F_Report_bak2()}"));	
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildProgressSet(getRs());
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

