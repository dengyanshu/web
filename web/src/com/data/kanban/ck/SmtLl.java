package com.data.kanban.ck;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("ck_smt_ll")
@Scope("prototype")
@SuppressWarnings("serial")
public class SmtLl extends Action{

	public void getResult(){
		setConn(new OfficialDatabase().getConn());
		try {
			setCs(getConn().prepareCall("{call WB_TradMaterial(?,?,?,?)}"));
			getCs().setString("QMOName", request.getParameter("mo"));
			getCs().setInt("ItemsCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageNum", Integer.valueOf(request.getParameter("page")));
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