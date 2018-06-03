package com.data.kanban.hw_line;


import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("hw_sl_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class SlList extends Action{
	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		//link  25
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_MOEfficiencyDetail (?,?,?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("Workcenterid"));
			getCs().setString("FlowName", request.getParameter("FlowName"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			//String StrData=jsonBuilder.build2Set(getRs());
			String AllData=jsonBuilder.build2Set(getRs());
			String StrData=AllData.split("&separate&")[0];
			StrData=StrData.replace("[", "").replace("]", "");
			String isAlertSum=AllData.split("&separate&")[1];
			
			if(StrData.length()>2){
				String data="{success:true,data:"+StrData+"}";
				toWrite(data);
				System.out.println(data);
				
				//success:true,data:{"WorkcenterName":"1B-3FA-L06","MoName":"MO060216080480","ProductName":"910004-2537","WOSN":"TPZAE68B16L","MOQtyRequired":"2501","TimeSlice1":"9","Productivity1":"282","TimeSlice2":"10"}}
			}else{
				//toWrite("{success:false,"+StringVeriable.returnMsg+"}");
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
     
	/***
	 * 获取线体信息
	 * */
	public void getResult2(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_MOEfficiencyList()}"));	
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildProgressSet(getRs());
			if(StrData.length()>2){
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
	
	
	public void getResult3(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_MOEfficiency(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
			getCs().setString("I_Sender", "");
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
			getCs().setString("I_LanguageId", "1");
			getCs().setString("I_PlugInCommand", "");
			getCs().setString("I_OrBitUserId", "");
			getCs().setString("I_OrBitUserName", "");
			getCs().setString("I_ResourceId", "");
			getCs().setString("I_ResourceName", "");
			getCs().setString("I_PKId", "");
			getCs().setString("I_ParentPKId", "");
			getCs().setString("I_Parameter", "");
			getCs().setString("QMOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));
			getCs().setString("FlowName", request.getParameter("FlowName"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
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
	/**
	 * 图表数据获取
	 * 
	 * */
	
	public void getResult_chart(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_WorkcenterNameFlowName_Query (?,?)}"));
			getCs().setString("MOName", request.getParameter("moname"));
			//getCs().setString("WorkcenterName", "");
			getCs().setString("FlowName", request.getParameter("zc"));
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
	
	
	
	/***
	 * 获取图表combox工单信息
	 * */
	public void getResult_chart2(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_MOEfficiencyListForQuery()}"));	
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildProgressSet(getRs());
			if(StrData.length()>2){
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