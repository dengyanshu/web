package com.data.kanban.auto;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;



public class SendMoStatusErr extends Action {

	public void sendTips(){
		setConn(new New25_Report_Database().getConn());
	
		try {
			setCs(getConn().prepareCall("{call ManufactureMonitorStatus_ForMail(?)}"));
			
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().execute(); 
				
			System.out.println("发送成功"+getCs().getString("I_ReturnMessage"));
			
		} catch (SQLException e) {				
				System.out.println("状态提醒发送失败："+e.getMessage());
		}finally{
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}			
	}	
	
}
