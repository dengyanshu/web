package com.data.kanban.ck;


import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("ck_bl_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class BlList extends Action{

	public void getResult(){
		setConn(new OfficialDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call rubs_rubs(?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			//String StrData=jsonBuilder.buildSet(getRs());
			
			String AllData=jsonBuilder.build2Set(getRs());
			String StrData=AllData.split("&separate&")[0];
			String isAlertSum=AllData.split("&separate&")[1];

			if(StrData.length()>2){
				//toWrite("{success:true,data:"+StrData+"}");
				toWrite("{success:true,data:"+StrData+",isAlertSum:"+isAlertSum+"}");
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