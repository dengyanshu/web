package com.data.kanban.tj_led;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.TjDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("tj_led_mx")
@Scope("prototype")
@SuppressWarnings("serial")
public class Mx extends Action{
	public void getResult(){
		setConn(new TjDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call MainBoard_DIP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
			getCs().setString("I_Sender", "");
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
			getCs().setString("I_LanguageId", "1");
			getCs().setString("I_PlugInCommand", "");
			getCs().setString("I_OrBitUserId", "");
			getCs().setString("I_OrBitUserName", "");
			getCs().setString("I_ResourceId", "");
			getCs().setString("I_ResourceName", "");
			getCs().setString("I_PKId", "");
			getCs().setString("I_ParentPKId", "");
			getCs().setString("I_Parameter", "");
			getCs().setString("MOName", "");
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
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
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));;
		}finally{
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}