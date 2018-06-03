package com.data.resource;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Database;
import com.data.connectsql.New25_XM_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;



@Component("resource")
@Scope("prototype")
@SuppressWarnings("serial")
public class Resource extends Action{

	public void getResult(){
		setConn(new New25_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call WorkprocedureflowMoWorkcenter_ViewList(?)}"));
			
			getCs().setString("QueryParameter", "");
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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
	
	
	
	public void getResult2(){
		setConn(new New25_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call WorkprocedureflowMo_WKMO_ViewList_Web(?)}"));

			getCs().setString("QueryParameter",request.getParameter("QueryParameter"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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
	
	
	public void getResult3(){
		setConn(new New25_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call WorkprocedureflowMo_WKMO_ViewList_WebList(?,?)}"));
			
			getCs().setString("QueryParameter",request.getParameter("QueryParameter"));
			getCs().setString("WorkprocedureFlow",request.getParameter("WorkprocedureFlow"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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
	
	public void getResult4(){
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Get_GWK_Name(?,?)}"));
			
			getCs().setString("WorkcenterName",request.getParameter("WorkcenterName"));
			getCs().setString("Option", "1");
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
//			System.out.println(StrData);
			
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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
	public void getResult5(){
		setConn(new New25_XM_Database().getConn());
		try {
			EndUser currentUser=SecurityUserHolder.getCurrentUser();
			setCs(getConn().prepareCall("{call GetLineProcedure_Header_DoMethod(?,?,?,?,?,?,?,?)}"));
			
			getCs().registerOutParameter("I_ReturnMessage", Types.INTEGER);
			getCs().setString("shift",request.getParameter("shift"));
			getCs().setString("workcenterName",request.getParameter("workcenterName"));
			getCs().setString("moName",request.getParameter("moName"));
			getCs().setString("WorkprocedureFlowList",request.getParameter("WorkprocedureFlowList"));
			getCs().setString("UserName",currentUser.getUserCode().trim());
			getCs().setInt("option",Integer.valueOf(request.getParameter("option")));
			getCs().registerOutParameter("LineProcedureId", Types.INTEGER);
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
//			System.out.println(StrData);
			
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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

	
	public void getResult6(){
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call LineProcedure_StaffRecord_DoMethod(?,?,?,?)}"));
			
			getCs().registerOutParameter("I_ReturnMessage", Types.INTEGER);
			getCs().setString("LineProcedureId",request.getParameter("LineProcedureId"));
			getCs().setString("MatchAddr",request.getParameter("MatchAddr"));
			getCs().setString("Option",request.getParameter("Option"));
			
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
//			System.out.println(StrData);
			
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
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