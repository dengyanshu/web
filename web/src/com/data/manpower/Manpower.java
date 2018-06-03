package com.data.manpower;

import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_XM_Database;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;



@Component("manpower")
@Scope("prototype")
@SuppressWarnings("serial")
public class Manpower extends Action{

	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call WEB_WorkprocedureChain(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
			
			getCs().setString("I_Sender", "");
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
			getCs().setString("I_LanguageId", "1");
			getCs().setString("I_PlugInCommand", "");
			getCs().setString("I_OrBitUserId", "");
			getCs().setString("I_OrBitUserName", "");
			getCs().setString("I_ResourceId", "");
			getCs().setString("I_ResourceName", "");
			getCs().setString("I_PKid", "");
			getCs().setString("I_ParentPKId", "");
			getCs().setString("I_Parameter", "");
			
			//getCs().setString("WorkprocedureFlowId", "");
			getCs().setString("WorkprocedureFlowName",request.getParameter("val"));
			getCs().setString("ProductName",request.getParameter("valpn"));
			//getCs().setString("QueryParameter","");
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				//toWrite("{success:true,returnMes:\"\",total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
				toWrite("{success:true,returnMes:\"\",data:"+StrData+"}");
				System.out.println("here exec Manpower:"+StrData);
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
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call WEB_WorkprocedureChainIdirect(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
			
			getCs().setString("I_Sender", "");
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
			getCs().setString("I_LanguageId", "1");
			getCs().setString("I_PlugInCommand", "");
			getCs().setString("I_OrBitUserId", "");
			getCs().setString("I_OrBitUserName", "");
			getCs().setString("I_ResourceId", "");
			getCs().setString("I_ResourceName", "");
			getCs().setString("I_PKid", "");
			getCs().setString("I_ParentPKId", "");
			getCs().setString("I_Parameter", "");
			
			//getCs().setString("WorkprocedureFlowId", "");
			getCs().setString("WorkprocedureFlowName",request.getParameter("val"));
			getCs().setString("ProductName",request.getParameter("valpn"));
			//getCs().setString("QueryParameter","");
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			System.out.println(StrData);
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
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Workprocudureflowname_ViewList(?)}"));
			
			getCs().setString("Productname",request.getParameter("vals"));
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
	
}