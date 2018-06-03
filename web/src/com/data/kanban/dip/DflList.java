package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_dfl_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class DflList extends Action{

	public void getResult(){
		
		try {
			setConn(new New25_Report_Database().getConn());				
			setCs(getConn().prepareCall("{call Report_ProductQty(?)}"));			
			getCs().setString("PickingListId", request.getParameter("PickingListId"));		
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
			} catch (SQLException e){
				e.printStackTrace();
			}
		}	
		
	}
}
