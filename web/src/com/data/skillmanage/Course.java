package com.data.skillmanage;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Date;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.HR_Datebase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;

@Component("skillmanage_course")
@Scope("prototype")
@SuppressWarnings("serial")
public class Course extends Action{
	
	/**
	 * 课程查找
	 */
	
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="SELECT * FROM WorkprocedureCourse ORDER BY CreateTime DESC";
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
			String sql="insert into  WorkprocedureCourse(CreateUserId,CreateTime) VALUES('"+currentUser.getUserCode().trim()+"',getdate())";
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
				String sql="UPDATE WorkprocedureCourse SET CourseCode='"+arr[1]+"',CourseTitle='"+arr[2]+"',ModifyUserId='"+currentUser.getUserCode().trim()+"',ModifyTime=getdate() WHERE WorkprocedureCourseId='"+arr[0]+"'";
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
			
			sql="DELETE WorkprocedureCourse FROM WorkprocedureCourse where WorkprocedureCourseId='"+ids+"'";	
			this.getStmt().executeUpdate(sql);
			sql="DELETE WorkprocedureCourseSkill FROM WorkprocedureCourseSkill where WorkprocedureCourseId='"+ids+"'";	
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
