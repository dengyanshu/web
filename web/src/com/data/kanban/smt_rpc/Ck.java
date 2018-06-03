package com.data.kanban.smt_rpc;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;


@Component("smt_rpc_ck")
@Scope("prototype")
@SuppressWarnings("serial")
public class Ck extends Action{

	public void getResult(){
		setConn(new New25_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call MaterialOfCangku(?,?,?,?)}"));
			
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().setString("ProductName", request.getParameter("ProductName"));
			
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

