package com.data.kanban.dip;

import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;


@Component("dip_zc_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class ZcList extends Action{
	public void getResult(){
		setConn(new OfficialDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call saround_campin_bap(?)}"));	
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
