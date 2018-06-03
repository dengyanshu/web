package com.data.kanban.smt_xbc;


import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("smt_xbc_sl_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class SlList extends Action{
/*
	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call smt_board_new(?,?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("Workcenterid"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			//String StrData=jsonBuilder.build2Set(getRs());
			String AllData=jsonBuilder.build2Set(getRs());
			String StrData=AllData.split("&separate&")[0];
			String isAlertSum=AllData.split("&separate&")[1];
			
			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",data:"+StrData+",isAlertSum:"+isAlertSum+"}");
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
	*/
	
	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Report_SMT_LineStore4d(?,?,?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("Workcenterid"));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().execute(); 
			setRs(getCs().getResultSet());
			//String StrData=jsonBuilder.build2Set(getRs());
			String AllData=jsonBuilder.build2Set(getRs());
			String StrData=AllData.split("&separate&")[0];
			String isAlertSum=AllData.split("&separate&")[1];
			
			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",data:"+StrData+",isAlertSum:"+isAlertSum+",total:"+getCs().getInt("DataCount")+"}");
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

	
	
//	public void getResult2(){
//		//setConn(new OfficialDatabase().getConn());
//		setConn(new New25_Report_Database().getConn());
//		try {
//			setCs(getConn().prepareCall("{call Report_SMT_LineStore_bak(?,?,?)}"));
//			getCs().setString("MOName", request.getParameter("mo"));
//			getCs().setString("WorkcenterId", request.getParameter("Workcenterid"));
//			getCs().registerOutParameter("DataCount", Types.INTEGER);
//			getCs().execute(); 
//			setRs(getCs().getResultSet());
//			//String StrData=jsonBuilder.build2Set(getRs());
//			String AllData=jsonBuilder.build2Set(getRs());
//			String StrData=AllData.split("&separate&")[0];
//			System.out.println(request.getParameter("mo"));
//			System.out.println(request.getParameter("Workcenterid"));
//			System.out.println(getCs().getInt("DataCount"));
//			if(StrData.length()>2){
//				toWrite("{success:true,returnMes:\"\",data:"+StrData+",total:"+getCs().getInt("DataCount")+"}");
//			}else{
//				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
//			}	
//		} catch (SQLException e) {
//			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
//		}finally{
//			try {
//				ColseCS();
//			} catch (SQLException e) {
//				e.printStackTrace();
//			}
//		}	
//	}
}