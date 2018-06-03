package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;

import javax.swing.Spring;
	
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Database;
import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("dip_xstore_list")
@Scope("prototype")
@SuppressWarnings("serial")

public class XStoreList extends Action {
	public void getResult(){
		setConn(new New25_Report_Database().getConn());
		try{		
			setCs(getConn().prepareCall("{call PickingListQty_ForWeb(?,?,?,?)}"));
			getCs().setString("ProductName",request.getParameter("ProductName"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());	
			System.out.println(StrData);	
			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
			 
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}			
		}catch(SQLException e){	
			toWrite("success:false,"+StringVeriable.exceptionMsg+e.getMessage());			
		}finally{
			try{
				ColseCS();
			}catch(SQLException e){
				e.printStackTrace();			
			}
			
		}

	}

}
