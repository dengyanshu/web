package com.data.skillmanage;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.HR_Datebase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;

@Component("skillmanage_reservationCourse")
@Scope("prototype")
@SuppressWarnings("serial")
public class ReservationCourse extends Action{
	
	/**
	 * 当天预约课程查找
	 */
	
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());

		try {
			this.setStmt(this.getConn().createStatement());
			SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd");
			Date curDate = new Date(System.currentTimeMillis());
			String str = formatter.format(curDate);
			String sql="SELECT WorkprocedureReservationCourse.WorkprocedureReservationCourseId," +
					"WorkprocedureReservationCourse.WorkprocedureCourseId,WorkprocedureReservationCourse.ReservationTime," +
					"WorkprocedureReservationCourse.ReservationSite,WorkprocedureReservationCourse.Lecturer," +
					"WorkprocedureReservationCourse.NumOfExpected,WorkprocedureReservationCourse.NumOfActual," +
					"WorkprocedureReservationCourse.ReservationRemark,WorkprocedureReservationCourse.CreateUserId," +
					"WorkprocedureReservationCourse.CreateTime,WorkprocedureReservationCourse.ModifyUserId," +
					"WorkprocedureReservationCourse.ModifyTime,WorkprocedureReservationCourse.FinishTime,WorkprocedureReservationCourse.WhetherExamination,WorkprocedureCourse.CourseTitle " +
					"FROM WorkprocedureReservationCourse inner join WorkprocedureCourse " +
					"ON WorkprocedureReservationCourse.WorkprocedureCourseId=WorkprocedureCourse.WorkprocedureCourseId " +
					"WHERE WorkprocedureReservationCourse.ReservationStatus=0 AND DateDiff(DAY,WorkprocedureReservationCourse.CreateTime,'"+str+"')=0 ORDER BY CreateTime DESC";
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
	 * 未审核预约课程查找
	 */
	
	public void getResult2(){
		this.setConn(new HR_Datebase().getConn());

		try {
			this.setStmt(this.getConn().createStatement());
			String sql="SELECT WorkprocedureReservationCourse.WorkprocedureReservationCourseId," +
					"WorkprocedureReservationCourse.WorkprocedureCourseId,WorkprocedureReservationCourse.ReservationTime," +
					"WorkprocedureReservationCourse.ReservationSite,WorkprocedureReservationCourse.Lecturer," +
					"WorkprocedureReservationCourse.NumOfExpected,WorkprocedureReservationCourse.NumOfActual," +
					"WorkprocedureReservationCourse.ReservationRemark,WorkprocedureReservationCourse.CreateUserId," +
					"WorkprocedureReservationCourse.CreateTime,WorkprocedureReservationCourse.ModifyUserId," +
					"WorkprocedureReservationCourse.ModifyTime,WorkprocedureReservationCourse.FinishTime,WorkprocedureReservationCourse.WhetherExamination,WorkprocedureCourse.CourseTitle " +
					"FROM WorkprocedureReservationCourse inner join WorkprocedureCourse " +
					"ON WorkprocedureReservationCourse.WorkprocedureCourseId=WorkprocedureCourse.WorkprocedureCourseId " +
					"WHERE WorkprocedureReservationCourse.ReservationStatus=0 ORDER BY CreateTime DESC";
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
	 * 预约课程插入
	 */
	
	public void insertRecord(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		this.setConn(new HR_Datebase().getConn());
		try {
			String workprocedureCourseId=request.getParameter("CourseId");
			String reservationTime=request.getParameter("reservationTime");
			String reservationSite=request.getParameter("reservationSite");
			String lecturer=request.getParameter("lecturer");
			String NumOfExpected=request.getParameter("NumOfExpected");
			String reservationRemark=request.getParameter("reservationRemark");
			String WhetherExamination=request.getParameter("WhetherExamination");
			String FinishTime=request.getParameter("FinishTime");
				
			int ok=0;
			this.setStmt(this.getConn().createStatement());
			String sql="INSERT INTO  WorkprocedureReservationCourse(WorkprocedureCourseId,ReservationTime,FinishTime,ReservationSite,Lecturer,NumOfExpected,NumOfActual,ReservationRemark," +
					"CreateUserId,CreateTime,ReservationStatus,WhetherExamination) VALUES('"+workprocedureCourseId+"','"+reservationTime+"','"+FinishTime+"','"+reservationSite+"','"+lecturer+"','"+NumOfExpected+
					"','0','"+reservationRemark+"','"+currentUser.getUserCode().trim()+"',getdate(),0,'"+WhetherExamination+"')";
			ok=this.getStmt().executeUpdate(sql);
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.insertSuccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.insertFail+"}");
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
	 * 预约课程更新
	 */
	public void updateRecord(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		this.setConn(new HR_Datebase().getConn());
		
		try {
			String workprocedureReservationCourseId=request.getParameter("reservationCourseId");
			String workprocedureCourseId=request.getParameter("CourseId");
			String reservationTime=request.getParameter("reservationTime");
			String reservationSite=request.getParameter("reservationSite");
			String lecturer=request.getParameter("lecturer");
			String NumOfExpected=request.getParameter("NumOfExpected");
			String reservationRemark=request.getParameter("reservationRemark");
			String WhetherExamination=request.getParameter("WhetherExamination");
			String FinishTime=request.getParameter("FinishTime");
			
			this.setStmt(this.getConn().createStatement());
			int ok=0;
			
			String sql="UPDATE WorkprocedureReservationCourse SET " +
					"WorkprocedureCourseId='"+workprocedureCourseId+
					"',ReservationTime='"+reservationTime+
					"',FinishTime='"+FinishTime+
					"',ReservationSite='"+reservationSite+
					"',Lecturer='"+lecturer+
					"',WhetherExamination='"+WhetherExamination+
					"',NumOfExpected='"+NumOfExpected+
					"',ModifyUserId='"+currentUser.getUserCode().trim()+
					"',ModifyTime=getdate(),ReservationRemark='"+reservationRemark+"' WHERE WorkprocedureReservationCourseId='"+workprocedureReservationCourseId+"'";
			
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
	 * 预约课程结案
	 */
	public void updateRecordClose(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		this.setConn(new HR_Datebase().getConn());
			try {
				setCs(getConn().prepareCall("{call ReservationCourseClose(?,?)}"));
				getCs().setString("WorkprocedureReservationCourseId", request.getParameter("reservationCourseId"));
				getCs().setString("ModifyUser",currentUser.getUserCode().trim());

				getCs().execute(); 
				
				toWrite("{success:true,Repetition:false,"+StringVeriable.updateSucccess+"}");

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
	 * 预约课程删除
	 */
	
	public void deleteRecord(){
		this.setConn(new HR_Datebase().getConn());
		int ok=0;
		try {
			this.setStmt(this.getConn().createStatement());
			String ids=this.request.getParameter("ids");
			String sql="DELETE FROM WorkprocedureReservationCourse where WorkprocedureReservationCourseId='"+ids+"'";	
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
	
	
	
	
	/**
	 * 查询已审核过的预约课程清单
	 */
	public void getReservationCourseResult(){
		this.setConn(new HR_Datebase().getConn());

		String name=request.getParameter("courseName");
		String startTime=request.getParameter("reservationTime");
		String endTime=request.getParameter("FinishTime");
		String site=request.getParameter("reservationSite");
		
		String sql=null;
		try {
			this.setStmt(this.getConn().createStatement());
			
			if((startTime==null || startTime.equals("")) && (endTime==null || endTime.equals(""))){
				sql="SELECT R.WorkprocedureReservationCourseId,C.CourseTitle,c.CourseDescription,C.CourseType,R.ReservationTime,R.FinishTime," +
						"R.ReservationSite,R.Lecturer,R.NumOfExpected,R.NumOfActual,R.ReservationRemark " +
						"From WorkprocedureReservationCourse AS R " +
						"INNER JOIN WorkprocedureCourse AS C ON C.WorkprocedureCourseId=R.WorkprocedureCourseId " +
						"WHERE R.ReservationStatus=1 and C.CourseTitle LIKE '%"+name+"%' and R.ReservationSite LIKE '%"+site+"%'";
			}else{
				sql="SELECT R.WorkprocedureReservationCourseId,C.CourseTitle,c.CourseDescription,C.CourseType,R.ReservationTime,R.FinishTime," +
						"R.ReservationSite,R.Lecturer,R.NumOfExpected,R.NumOfActual,R.ReservationRemark " +
						"From WorkprocedureReservationCourse AS R " +
						"INNER JOIN WorkprocedureCourse AS C ON C.WorkprocedureCourseId=R.WorkprocedureCourseId " +
						"WHERE R.ReservationStatus=1 and C.CourseTitle LIKE '%"+name+"%' and R.ReservationSite LIKE '%"+site+"%' " +
						"and R.ReservationTime >='"+startTime+"' and R.FinishTime <='"+endTime+"'";
			}
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
	 * 查询选定的预约课程人员信息清单,并导出Excel
	 */
	public void getReservationCourseInfo(){
		this.setConn(new HR_Datebase().getConn());
		String reservationCourseId=request.getParameter("reservationCourseId");

		try {
			this.setStmt(this.getConn().createStatement());
			String sql="SELECT U.UserName as 姓名,U.UserNumber as 工号,C.CourseTitle as 课题名称,C.CourseDescription as 课题描述,C.CourseType as 课题类型," +
					"RC.ReservationTime as 开始时间 ,RC.FinishTime as 结束时间,RC.ReservationSite as 授课地点,RC.Lecturer as 课师,RC.WhetherExamination as 是否考试," +
					"URC.ClockinginStatus as 考勤,URC.TestScore as 成绩 " +
					"FROM WorkprocedureUserReservationCourse AS URC " +
					"INNER WorkprocedureUserInfo AS U ON U.UserNumber=URC.UserNumber " +
					"INNER JOIN WorkprocedureReservationCourse AS RC ON RC.WorkprocedureReservationCourseId=URC.WorkprocedureReservationCourseId " +
					"INNER JOIN WorkprocedureCourse AS C ON C.WorkprocedureCourseId=RC.WorkprocedureCourseId " +
					"WHERE URC.WorkprocedureReservationCourseId='"+reservationCourseId+"'";
			this.getStmt().executeQuery(sql);
			this.setRs(this.getStmt().getResultSet());
			
			DateFormat format=new SimpleDateFormat("yyyyMMddHHmmss");
			String timeFileName=format.format(new Date());
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/octet-stream");
			response.setContentType("application/download");
			response.setHeader("Content-Disposition", "attachment; filename="+timeFileName+"_sys.xls");

	        //建立一个输入流
			OutputStream os = response.getOutputStream();
	        //创建工作薄
	        WritableWorkbook wwb=Workbook.createWorkbook(os);    
	        // 设置单元表的名称   
	        WritableSheet sheet = wwb.createSheet("授课人员信息", 0);   
	        Label label; 
	        
			//获取ResultSet类型和属性信息的对象
			ResultSetMetaData metaData = this.getRs().getMetaData();
			//返回此ResultSet对像中的列数
			int colunmCount = metaData.getColumnCount();	
			//得出每个列的字段名
			//String[] colNameArr = new String[colunmCount]; 
			for (int i = 0; i < colunmCount; i++) {  
				//colNameArr[i] = getRs().getMetaData().getColumnName(i + 1); 
		          label = new Label(i,0,getRs().getMetaData().getColumnName(i + 1)); 
		          sheet.addCell(label);
			}
			int j=1;
			while(getRs().next()){	
				//循环列数
				for (int i = 0; i < colunmCount; i++) {
					String columnName =metaData.getColumnLabel(i+1);
					String value = getRs().getString(columnName);
		        	label = new Label(i,j,String.valueOf(value)); 
		        	sheet.addCell(label);
				} 
				j++;
			}
	        wwb.write();   
	        wwb.close();
	        os.close();
	        response.flushBuffer();
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		} catch (RowsExceededException e) {
			e.printStackTrace();
		} catch (WriteException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}	
}
