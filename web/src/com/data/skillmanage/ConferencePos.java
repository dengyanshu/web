package com.data.skillmanage;

import java.sql.SQLException;
import java.util.Collection;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.HR_Datebase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;

@Component("skillmanage_conferencePos")
@Scope("prototype")
@SuppressWarnings("serial")
public class ConferencePos extends Action{

	
	/**
	 * 根据预约课程ID查找会议室，根据会议室查找刷卡机
	 * 根据刷卡机数据表中statu字段状态获取刷卡人工号
	 * --Where HRGWK.CardType=3 AND HRGWK.ifRead=0
	 */
	
	public void getNumber(){
		this.setConn(new HR_Datebase().getConn());
		String ReservationCourseId=request.getParameter("ReservationCourseId");
		String POS=null;
		String sql=null;
		try {
			this.setStmt(this.getConn().createStatement());
			 sql="select CP.POS from WorkprocedureReservationCourse AS RC " +
					"inner join WorkProcedureConferencePos AS CP ON CP.ConferenceRoot=RC.ReservationSite " +
					"where WorkprocedureReservationCourseId='"+ReservationCourseId+"'";
			 
System.out.println("获取POS"+sql);			 
			this.getStmt().executeQuery(sql);
			setRs(this.getStmt().getResultSet());
			
			while(this.getRs().next()){
				POS=this.getRs().getString("POS");
			}
			
System.out.println("POS"+POS);				
			
			//如果获取到POS数据则执行以下语句
			if(POS!=null){
				sql="SELECT DISTINCT HRE.Code,HRE.Name,HRGWK.CardNum,HRD.Name as HRD_name,HRGWK.fDateTime FROM WorkProcedureGangWeiKa HRGWK " +
				 		"inner join  ZWMES.OrBitX.dbo.HR_Att_Result as HRAR ON HRGWK.CardNum=HRAR.CardNo " +
				 		"inner join ZWMES.OrBitX.dbo.HR_Employee as HRE ON HRE.ID=HRAR.EmpID " +
				 		"inner join ZWMES.OrBitX.dbo.HR_Departs as HRD on HRD.Code=HRE.dept "+
				 		"Where ifRead=0 AND MatchAddr='"+POS+"'";
				 
System.out.println("获取工号"+sql);		
				this.getStmt().executeQuery(sql);
				setRs(this.getStmt().getResultSet());
				String StrData=jsonBuilder.buildSet(getRs());
	
				if(StrData.length()>2){
					toWrite("{success:true,POS:\""+POS+"\",data:"+StrData+"}");
				}else{
					toWrite("{success:false,"+StringVeriable.returnMsg+"}");
				}	
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * POS机内数据查找
	 */
	
	public void getPos(){
		setConn(new HR_Datebase().getConn());
		try {
			
			//setCs(getConn().prepareCall("{call SmtWorkCenterYield(?,?,?)}"));
			setCs(getConn().prepareCall("{call HR_PeiXunDaKa(?,?)}"));
			getCs().setString("WorkprocedureReservationCourseId", request.getParameter("ReservationCourseId"));
			getCs().setString("RefreshTime", request.getParameter("RefreshTime"));
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
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

	

	
	/**
	 * 课程查找
	 */
	
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="SELECT * FROM WorkProcedureConferencePos ORDER BY CreateTime DESC";
			
			this.getStmt().executeQuery(sql);
			
			setRs(this.getStmt().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				toWrite("{success:true,data:"+StrData+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}	
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 课程查找名
	 */
	
	public void getResult2(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="SELECT ConferenceRoot FROM WorkProcedureConferencePos ORDER BY CreateTime DESC";
			
			this.getStmt().executeQuery(sql);
			
			setRs(this.getStmt().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());
			if(StrData.length()>2){
				toWrite("{success:true,data:"+StrData+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}	
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	
	/**
	 * 课程插入
	 */
	
	public void insertRecord(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		this.setConn(new HR_Datebase().getConn());
		try {
			int ok=0;
			this.setStmt(this.getConn().createStatement());
			String sql="insert into  WorkProcedureConferencePos(CreateUserId,CreateTime) VALUES('"+currentUser.getUserCode().trim()+"',getdate())";
			ok=this.getStmt().executeUpdate(sql);
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.updateSucccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.updateFail+"}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
	}
	

	
	/**
	 * 课程更新
	 */
	@SuppressWarnings("rawtypes")
	public void updateRecord(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		this.setConn(new HR_Datebase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String modification=this.request.getParameter("modification");			
			JSONArray jsonR = JSONArray.fromObject(modification);  
			int size = jsonR.size();  
			int ok=0;
			for (int i = 0; i < size; i++) {
				JSONObject jsonMap = JSONObject.fromObject(jsonR.get(i));
				Collection values=jsonMap.values();
				Object[] arr=values.toArray();
				String sql="UPDATE WorkProcedureConferencePos SET ConferenceRoot='"+arr[1]+"',POS='"+arr[2]+"',ModifyUserId='"+currentUser.getUserCode().trim()+"',ModifyTime=getdate() WHERE CP_id='"+arr[0]+"'";
				ok=this.getStmt().executeUpdate(sql);
			}	
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.updateSucccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.updateFail+"}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 课程删除
	 */
	
	public void deleteRecord(){
		this.setConn(new HR_Datebase().getConn());
		int ok=0;
		String sql=null;
		try {
			this.setStmt(this.getConn().createStatement());
			String ids=this.request.getParameter("ids");			
			sql="DELETE WorkProcedureConferencePos FROM WorkProcedureConferencePos where CP_id='"+ids+"'";	
			ok=this.getStmt().executeUpdate(sql);
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.deleteSuccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.deleteFail+"}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
