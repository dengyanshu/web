package com.data.skillmanage;

import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.HR_Datebase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("skillmanage_courseskill")
@Scope("prototype")
@SuppressWarnings("serial")
public class CourseSkill extends Action{

	/**
	 * 插入课程技能
	 */
	public void insertRecord(){
		this.setConn(new HR_Datebase().getConn());
		String exist="1";
		String sql=null;
		try {
			this.setStmt(this.getConn().createStatement());
			String StaffCourseId=request.getParameter("StaffCourseId");
			String StaffSkillsId=request.getParameter("StaffSkillsId");
			String[] StaffCourseIds=StaffCourseId.split(",");
			String[] StaffSkillsIds=StaffSkillsId.split(",");
			
			this.setStmt(this.getConn().createStatement());
			for(int i=0;i<StaffCourseIds.length;i++)
			{
				for(int j=0;j<StaffSkillsIds.length;j++)
				{
			int ok=0;
			sql="select count(*) from WorkprocedureCourseSkill where WorkprocedureSkillId='"+StaffSkillsIds[j]+"' and WorkprocedureCourseId='"+StaffCourseIds[i]+"'";
			
			getStmt().execute(sql);
			setRs(getStmt().getResultSet());
			while(this.getRs().next()){
				exist=getRs().getString(1);
			}
			if(exist.equals("0")){
			sql="INSERT INTO WorkprocedureCourseSkill(WorkprocedureSkillId,WorkprocedureCourseId) " +
					"SELECT SK_ID.id AS WorkprocedureSkillId,CO_ID.id AS WorkprocedureCourseId FROM " +
					"(SELECT id FROM  SQL_split('"+StaffSkillsIds[j]+"',',')) AS SK_ID " +
					"inner JOIN(SELECT id FROM  SQL_split('"+StaffCourseIds[i]+"',',')) AS CO_ID " +
					"on SK_ID.id=SK_ID.id  order by SK_ID.id";
			ok=this.getStmt().executeUpdate(sql);
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.insertSuccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.insertFail+"}");
			}
			}
				}
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
	 * 根据课程获取技能
	 */
	public void getCourseSkill(){
		this.setConn(new HR_Datebase().getConn());

		try {
			this.setStmt(this.getConn().createStatement());
			String courseId=this.request.getParameter("courseId");
			String sql="SELECT WorkprocedureCourseSkill.WorkprocedureSkillId,WorkprocedureSkill.SkillName FROM WorkprocedureCourseSkill " +
					"inner join WorkprocedureSkill on WorkprocedureSkill.WorkprocedureSkillId=WorkprocedureCourseSkill.WorkprocedureSkillId " +
					"WHERE WorkprocedureCourseId='"+courseId+"'";
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
	 * 课程和技能关系
	 */
	
	public void getCourseAndSkill(){
		this.setConn(new HR_Datebase().getConn());

		try {
			this.setStmt(this.getConn().createStatement());
			String kecheng=this.request.getParameter("kecheng");
			String sql=null;
			if(kecheng!=null)
			{
			sql="select kecheng.CourseTitle,jineng.SkillName from WorkprocedureCourse kecheng " +
						"inner join WorkprocedureCourseSkill guanxi " +
						"on kecheng.WorkprocedureCourseId=guanxi.WorkprocedureCourseId " +
						"inner join WorkprocedureSkill jineng "+
						"on guanxi.WorkprocedureSkillId=jineng.WorkprocedureSkillId " +
						"WHERE kecheng.CourseTitle like '%"+kecheng+"%' " +
						"order by kecheng.CourseTitle";
			}else{
			sql="select kecheng.CourseTitle,jineng.SkillName from WorkprocedureCourse kecheng " +
						"inner join WorkprocedureCourseSkill guanxi " +
						"on kecheng.WorkprocedureCourseId=guanxi.WorkprocedureCourseId " +
						"inner join WorkprocedureSkill jineng "+
						"on guanxi.WorkprocedureSkillId=jineng.WorkprocedureSkillId " +
						"order by kecheng.CourseTitle";
			}
			
			this.getStmt().executeQuery(sql);
			//执行SQL语句
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
	 * 查询一节课程里的相关人员技能信息
	 */

	public void getCourseUserSkill(){
		this.setConn(new HR_Datebase().getConn());

		try {
			this.setStmt(this.getConn().createStatement());
			String kecheng=this.request.getParameter("kecheng");
			String CourseId=this.request.getParameter("WorkprocedureReservationCourseId");
			String sql=null;
			if(!CourseId.equals(""))
			{
			sql="select a2.code,a2.name,a3.CourseTitle,a6.SkillName,a1.FinishTime,a2.shangke,a2.xiake " +
					"FROM WorkprocedureReservationCourse a1 " +
		"INNER  JOIN CourseClockin a2 ON a1.WorkprocedureReservationCourseId=a2.ReservationCourseid " + 
		"INNER JOIN WorkprocedureCourse a3 ON a3.WorkprocedureCourseId = a1.WorkprocedureCourseId " +
		"LEFT  JOIN dbo.WorkprocedureCourseSkill a5 ON  a5.WorkprocedureCourseId=a1.WorkprocedureCourseId " +
		"LEFT   JOIN WorkprocedureSkill a6 ON a6.WorkprocedureSkillId=a5.WorkprocedureSkillId " +
		"WHERE a1.WorkprocedureReservationCourseId ='"+CourseId+"'";
			}else{
				sql="select a2.code,a2.name,a3.CourseTitle,a6.SkillName,a1.FinishTime,a2.shangke,a2.xiake " +
						"FROM WorkprocedureReservationCourse a1 " +
						"INNER  JOIN CourseClockin a2 ON a1.WorkprocedureReservationCourseId=a2.ReservationCourseid " + 
						"INNER JOIN WorkprocedureCourse a3 ON a3.WorkprocedureCourseId = a1.WorkprocedureCourseId " +
						"LEFT  JOIN dbo.WorkprocedureCourseSkill a5 ON  a5.WorkprocedureCourseId=a1.WorkprocedureCourseId " +
						"LEFT   JOIN WorkprocedureSkill a6 ON a6.WorkprocedureSkillId=a5.WorkprocedureSkillId " +
						"WHERE a3.CourseTitle='"+kecheng+"'  AND a1.ReservationStatus=1 ";
			}
			
			this.getStmt().executeQuery(sql);
			//执行SQL语句
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
 * 查询相同课程的不同时间
 */

public void getCourseUserSkill2(){
	this.setConn(new HR_Datebase().getConn());

	try {
		this.setStmt(this.getConn().createStatement());
		String kecheng=this.request.getParameter("kecheng");
		String sql=null;
		sql="select DISTINCT (SELECT CONVERT(NVARCHAR(50),a1.FinishTime,120)) as FinishTime ,a1.WorkprocedureReservationCourseId " +
				"from WorkprocedureReservationCourse a1 " +
				" inner join WorkprocedureCourse a2 on a1.WorkprocedureCourseId=a2.WorkprocedureCourseId " +
				" where a2.CourseTitle='"+kecheng+"' AND a1.ReservationStatus=1 ";
		
		this.getStmt().executeQuery(sql);
		//执行SQL语句
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
public void getCourseUserSkill3(){
	this.setConn(new HR_Datebase().getConn());
	try {
		this.setStmt(this.getConn().createStatement());
		String sql=null;
		sql="select distinct a1.CourseTitle  from  WorkprocedureCourse a1 " +
				" inner join WorkprocedureReservationCourse a2 " +
				" on a2.WorkprocedureCourseId=a1.WorkprocedureCourseId " +
				" where a2.ReservationStatus=1" ;
		
		this.getStmt().executeQuery(sql);
		//执行SQL语句
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
}
