package com.data.kanban.tj_led;

import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.TjDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("tj_led_zc")
@Scope("prototype")
@SuppressWarnings("serial")
public class Zc extends Action{
	public void getResult(){
		setConn(new TjDatabase().getConn());
		try {
			//setCs(getConn().prepareCall("{call TJBB_LEDProductiveView(?,?,?)}"));
			setCs(getConn().prepareCall("{call Txn_StatisticsLED(?,?)}"));
			getCs().setString("WorkcenterId","");
			getCs().setInt("Flag",0);
			
			//getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			//getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			//getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().execute(); 		
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
				toWrite("{success:true,data:"+StrData+"}");
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