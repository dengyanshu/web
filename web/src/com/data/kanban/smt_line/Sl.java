package com.data.kanban.smt_line;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;


@Component("smt_line_sl")
@Scope("prototype")
@SuppressWarnings("serial")
public class Sl extends Action{

	public void getResult(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call MainBoard_SMT_WorkcenterToDay_bak2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
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
			getCs().setString("QMOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));
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

