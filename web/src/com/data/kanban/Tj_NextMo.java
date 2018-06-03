package com.data.kanban;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.TjDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("tj_next_mo")
@Scope("prototype")
@SuppressWarnings("serial")
public class Tj_NextMo extends Action{
	public void getResult(){
		setConn(new TjDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call GetNexMoName_rubs_rubs(?,?,?)}"));				
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().setString("CommandType",  request.getParameter("name"));
			getCs().registerOutParameter("NextMoName", Types.VARCHAR);		
			getCs().execute(); 
			String StrData=getCs().getString("NextMoName");

			if(StrData.length()>1){
				toWrite("{success:true,returnMo:'"+StrData+"'}");
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