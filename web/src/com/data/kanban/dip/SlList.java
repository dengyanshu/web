package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_sl_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class SlList extends Action{
	public void getResult(){
		setConn(new OfficialDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_DipLoadPartLookPanel(?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
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
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());

			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",data:"+StrData+"}");
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
