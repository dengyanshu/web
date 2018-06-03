package com.data.kanban.dip;

import java.sql.SQLException;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;



@Component("dip_scx")
@Scope("prototype")
@SuppressWarnings("serial")
public class Scx extends Action{

	public void getResult(){
		setConn(new New25_Report_Database().getConn());
		
		//获取当前时间
		/*SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd");
		Date curDate = new Date(System.currentTimeMillis());
		String str = formatter.format(curDate);
		System.out.println(str);
		//************************************************
		Map<String, String> map = System.getenv();
	    String userName = map.get("USERNAME");// 获取用户名
	    String computerName = map.get("COMPUTERNAME");// 获取计算机名
	    String userDomain = map.get("USERDOMAIN");// 获取计算机域名
	    System.out.println(userName);
	    System.out.println(computerName);
	    System.out.println(userDomain);*/
		try {
			setCs(getConn().prepareCall("{call workcenter_productnum(?,?,?,?)}"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().setString("time", request.getParameter("time"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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
