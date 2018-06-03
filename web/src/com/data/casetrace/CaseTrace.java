package com.data.casetrace;

import java.sql.SQLException;
import java.util.Collection;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.connectsql.TestDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;

@Component("case_trace_manage")
@Scope("prototype")
@SuppressWarnings("serial")
public class CaseTrace extends Action{

	/**
	 * 获取全部人员案件信息
	 */

	public void queryAllResult(){
		this.setConn(new OfficialDatabase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select * from CaseTrace  ORDER BY status ASC";	
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
	 * 精确获取人员案件信息
	 */
	public void queryResult(){
		this.setConn(new OfficialDatabase().getConn());
		String userCode=request.getParameter("userCode");
		String updateStartTime=request.getParameter("updateStartTime");
		String updateEndTime=request.getParameter("updateEndTime");
		String status=request.getParameter("status");
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql=null;
			if((userCode=="" || userCode.equals("")) && (updateStartTime==null && updateEndTime==null ) && status==null){
				sql="select * from CaseTrace  ORDER BY status ASC";	
			}else if((updateStartTime!=null && !updateStartTime.equals(""))&&(updateEndTime!=null && !updateEndTime.equals(""))){
				sql="SELECT * from CaseTrace where disposeStaffid like '%"+userCode+"%' and status like '%"+status+"%' " +
						"and updateTime between '"+updateStartTime+"' and '"+updateEndTime+"' ORDER BY  status ASC";	
			}else{
				sql="SELECT * from CaseTrace where disposeStaffid like '%"+userCode+"%' and status like '%"+status+"%'  ORDER BY  status ASC";
			}
			System.out.println(sql);
			System.out.println(request.getRemoteAddr());
			System.out.println(request.getRemoteHost());
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
	 * 获取装备部门人员
	 */
	public void getDepUser(){
		this.setConn(new TestDatabase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select userCode,username from EndUser where deptId='8a82809147f284b30147fb51e2840001'";
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
	 * 课程查找
	 */
	
	public void getResult(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		this.setConn(new OfficialDatabase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select * from CaseTrace WHERE disposeStaffid='"+currentUser.getUserCode()+"' ORDER BY createTime DESC";		
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
		this.setConn(new OfficialDatabase().getConn());
		try {
			int ok=0;
			this.setStmt(this.getConn().createStatement());
			String sql="insert into  CaseTrace(disposeStaffid,disposeUser,createTime) VALUES('"+currentUser.getUserCode().trim()+"','"+currentUser.getUsername().trim()+"',getdate())";
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
		this.setConn(new OfficialDatabase().getConn());
		
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
				String sql="UPDATE CaseTrace SET " +
						"caseNumber='"+arr[3]+
						"',caseName='"+arr[4]+
						"',caseTask='"+arr[5]+
						"',caseType='"+arr[6]+
						"',applyTime='"+arr[7]+
						"',demandTime='"+arr[8]+
						"',predictAccomplishTime='"+arr[9]+
						"',realityAccomplishTime='"+arr[10]+
						"',status='"+arr[11]+
						"',expatiation=expatiation+'<br>"+arr[12]+
						"',updateTime=getdate()" +
						",applicant='"+arr[14]+
						"' WHERE caseTraceId='"+arr[0]+"'";
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
		this.setConn(new OfficialDatabase().getConn());
		int ok=0;
		try {
			this.setStmt(this.getConn().createStatement());
			String ids=this.request.getParameter("ids");			
			String sql="DELETE CaseTrace FROM CaseTrace inner join (SELECT id FROM  SQL_split('"+ids+"',','))AS OO  ON CaseTrace.caseTraceId=OO.id";	
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
