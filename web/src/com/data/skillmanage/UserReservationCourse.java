package com.data.skillmanage;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.HR_Datebase;
import com.data.connectsql.HR_Datebase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;
import com.desktop.utils.StringUtil;
import com.opensymphony.xwork2.ActionContext;

@Component("skillmanage_userReservationCourse")
@Scope("prototype")
@SuppressWarnings("serial")
public class UserReservationCourse extends Action{

	
	
	//update HR_WorkProcedureGangWeiKa set ifRead=0 where MatchAddr='1B-4F-1L-01' and CardNum='37130'
	
	//DELETE WorkprocedureSkill FROM WorkprocedureSkill 
	//inner join (SELECT id FROM  SQL_split('"+ids+"',','))AS OO  ON WorkprocedureSkill.WorkprocedureSkillId=OO.id	
	
	
	
	/**
	 * 批量插入人员课程预约表
	 */
	public void UserBatchInsert(){
		this.setConn(new HR_Datebase().getConn());
		String ReservationCourseId=this.request.getParameter("ReservationCourseId");
		String CardNum=this.request.getParameter("CardNum");	
		String UserNum=this.request.getParameter("UserNum");
		String pos=this.request.getParameter("pos");
		
		String[] CardNums=CardNum.split(",");
		String[] UserNums=UserNum.split(",");

		try {
		setStmt(this.getConn().createStatement());
		
		String sql=null;
						
		//循环插入数据
		for(int i=0;i<CardNums.length;i++){				
			//人员关联预约课程	
			int ok=0;
			sql="INSERT INTO WorkprocedureUserReservationCourse(WorkprocedureReservationCourseId,UserNumber,CheckStatus,CreateTime) VALUES('"+ReservationCourseId+"','"+UserNums[i]+"',0,GETDATE())";
			this.getStmt().executeUpdate(sql);
			//更改刷卡数据状态ifRead
			sql="update WorkProcedureGangWeiKa set ifRead=1 where MatchAddr='"+pos+"' and CardNum='"+CardNums[i]+"'";
			
			ok=this.getStmt().executeUpdate(sql);		
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.updateSucccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.updateFail+"}");
			}
		
		}			
		toWrite("{success:true,"+StringVeriable.insertSuccess+"}");

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
	 * 增加实际刷卡人数
	 */
	public void updateWRC(){
		this.setConn(new HR_Datebase().getConn());
		int sum=Integer.valueOf(request.getParameter("sum"));
		String ReservationCourseId=request.getParameter("ReservationCourseId");
		try {
		setStmt(this.getConn().createStatement());
		String sql=null;
			sql="UPDATE WorkprocedureReservationCourse SET NumOfActual="+sum+" WHERE WorkprocedureReservationCourseId='"+ReservationCourseId+"'";
			this.getStmt().executeUpdate(sql);		
				toWrite("{success:true,"+StringVeriable.updateSucccess+"}");
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
	 * 插入人员课程预约表
	 */
	public void insertRecord(){
		this.setConn(new HR_Datebase().getConn());
		try {
			setCs(getConn().prepareCall("{call CourseAddActualNum(?,?,?)}"));
			getCs().setString("WorkprocedureReservationCourseId", request.getParameter("ReservationCourseId"));
			getCs().setString("UserNumber",request.getParameter("workNumber"));
			getCs().registerOutParameter("returnMsg", Types.VARCHAR);
			
			getCs().execute();
			String msg=this.getCs().getString("returnMsg");
			if(msg.equals("")||msg==null){
				toWrite("{success:true,Repetition:false,"+StringVeriable.insertSuccess+"}");
			}else{
				toWrite("{success:true,Repetition:true,returnMsg:\""+this.getCs().getString("returnMsg")+"\"}");
			}

		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				this.ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	
	/**
	 * 通过预约课程ID获取数据
	 */
	public void getCheck(){
		this.setConn(new HR_Datebase().getConn());

		try {
			this.setStmt(this.getConn().createStatement());
			String workprocedureReservationCourseId=this.request.getParameter("reservationCourseId");
			String sql="select WorkprocedureReservationCourse.WorkprocedureReservationCourseId,CourseClockin.code,  " +
					"CourseClockin.name,WorkprocedureCourse.WorkprocedureCourseId,WorkprocedureCourse.CourseTitle,WorkprocedureReservationCourse.ReservationTime,WorkprocedureReservationCourse.ReservationSite,WorkprocedureReservationCourse.Lecturer,CourseClockin.isCheck " +   
					"from CourseClockin inner join WorkprocedureReservationCourse ON CourseClockin.ReservationCourseid=WorkprocedureReservationCourse.WorkprocedureReservationCourseId " +
					"inner join WorkprocedureCourse ON WorkprocedureCourse.WorkprocedureCourseId=WorkprocedureReservationCourse.WorkprocedureCourseId " + 
					//"inner join WorkprocedureUserInfo ON WorkprocedureUserInfo.UserNumber=CourseClockin.code " +
					"WHERE  CourseClockin.ReservationCourseid='"+workprocedureReservationCourseId+"'" + 
					"and CourseClockin.CardType=3 and CourseClockin.isCheck=0";
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
	 * 批量更新人员预约课程审核状态
	 */
	public void updateRecord(){
		this.setConn(new HR_Datebase().getConn());
		String nums=this.request.getParameter("workNums");
		String ids=this.request.getParameter("reservationCourseIds");

		String[] workNums=nums.split(",");
		String[] reservationCourseIds=ids.split(",");

		StringBuffer workNumsB=new StringBuffer();
		StringBuffer reservationCourseIdsB=new StringBuffer();
		for(int i=0;i<workNums.length;i++){
			workNumsB.append("'"+workNums[i].toString()+"',");
			reservationCourseIdsB.append("'"+reservationCourseIds[i].toString()+"',");
		}

		if(workNumsB.length()>1){
			workNumsB.deleteCharAt(workNumsB.length()-1);
			reservationCourseIdsB.deleteCharAt(reservationCourseIdsB.length()-1);
		}

		try {
			int ok=0;
			this.setStmt(this.getConn().createStatement());
			String sql="update CourseClockin set CourseClockin.isCheck=1 FROM CourseClockin " +
					"inner join (SELECT * FROM CourseClockin where code in ("+workNumsB.toString()+") " +
					"and ReservationCourseid in("+reservationCourseIdsB.toString()+"))AS C " +
					"ON CourseClockin.ReservationCourseid=C.ReservationCourseid AND CourseClockin.code=C.code";
			ok=this.getStmt().executeUpdate(sql);
			if(ok>0){
				toWrite("{success:true,"+StringVeriable.updateSucccess+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.updateFail+"}");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				this.CloseS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	
	
	/**
	 * 通过工号得到相关信息
	 */
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());

		try {
			String workNumber=this.request.getParameter("workNumber");
			this.setStmt(this.getConn().createStatement());
			String sql="select WorkprocedureUserInfo.UserNumber,WorkprocedureUserInfo.UserName,WorkprocedureUserInfo.UserStatus," +
					"WorkprocedureSkill.SkillName,WorkprocedureSkill.SkillCategory,WorkprocedureSkill.SkillRemark " +
					"from WorkprocedureUserInfo inner join WorkprocedureUserSkill AS US " +
					"ON WorkprocedureUserInfo.UserNumber=US.UserNumber inner join WorkprocedureSkill " +
					"ON US.WorkprocedureSkillId=WorkprocedureSkill.WorkprocedureSkillId " +
					"where WorkprocedureUserInfo.UserNumber='"+workNumber+"'";
/*			String sql="select StaffRecord.StaffNumber,StaffRecord.StaffName,StaffRecord.StaffStatus,StaffItemSkill.StaffSkillsName,StaffItemSkill.Category,StaffItemSkill.Remark " +
					"from StaffRecord inner join StaffItemSkills AS US ON StaffRecord.StaffNumber=US.StaffNumber " +
					"inner join StaffItemSkill ON US.StaffSkillsId=StaffItemSkill.StaffSkillsId where StaffRecord.StaffNumber='"+workNumber+"'";*/
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
	 * 得到需要审核的预约课程
	 */
	public void getReservationCourse(){
		this.setConn(new HR_Datebase().getConn());
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select DISTINCT WRC.WorkprocedureReservationCourseId,WC.CourseTitle from CourseClockin "+
					"inner join WorkprocedureReservationCourse AS WRC on WRC.WorkprocedureReservationCourseId=CourseClockin.ReservationCourseid "+
					"inner join WorkprocedureCourse AS WC on WC.WorkprocedureCourseId=WRC.WorkprocedureCourseId  where isCheck=0";
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
	 * 人员与课程批量导入
	 * @throws IOException
	 */
	
	public void userCourseBatchInsert() throws IOException{
		//获取参数集
		Map<String,Object> params=ActionContext.getContext().getParameters();
		//从参数集中获取指定的参数信息
		File[] files=(File[]) params.get("path");
		//得到上传数据的哈希数据
		HashMap hm=this.getExcel(new FileInputStream(files[0]));
		//得到当前所持有的用户
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		//解析获取excel表中的数据并分开放在数据中
		String[] workNums=(String[])hm.get("workNums");
		//String[] userName=((String)hm.get("userName")).split(",");
		String[] courseType=(String[])hm.get("courseType");
		String[] courseTitle=(String[])hm.get("courseTitle");
		String[] courseDescription=(String[])hm.get("courseDescription");
		String[] reservationTime=(String[])hm.get("reservationTime");
		String[] reservationSite=(String[])hm.get("reservationSite");
		String[] lecturer=(String[])hm.get("lecturer");
		String[] ClockinginStatus=(String[])hm.get("ClockinginStatus");
		String[] TestScore=(String[])hm.get("TestScore");
		String[] WhetherExamination=(String[])hm.get("WhetherExamination");
		String[] reservationRemark=(String[])hm.get("reservationRemark");
		
		//链接数据集
		this.setConn(new HR_Datebase().getConn());
		//String courseId="80E872458C7E";
		String courseId=StringUtil.getRandomString(12);
		String reservationId=StringUtil.getRandomString(12);
		String sql=null;
		try {
			setStmt(this.getConn().createStatement());
			//插入课程
			sql="insert into WorkprocedureCourse(WorkprocedureCourseId,CourseTitle,CourseDescription,CourseType,CreateUserId,CreateTime) VALUES('"+courseId+"','"+courseTitle[0]+"','"+courseDescription[0]+"','"+courseType[0]+"','"+currentUser.getUserCode().trim()+"',getdate())";		
			getStmt().executeUpdate(sql);
			//插入预约课程
			sql="insert into WorkprocedureReservationCourse(WorkprocedureReservationCourseId,WorkprocedureCourseId,ReservationTime,ReservationSite" +
					",Lecturer,WhetherExamination,ReservationRemark,CreateUserId,CreateTime,ReservationStatus) VALUES" +
					"('"+reservationId+"','"+courseId+"','"+reservationTime[0]+"','"+reservationSite[0]+"','"+lecturer[0]+"','"+WhetherExamination[0]+"','"+reservationRemark[0]+"','"+currentUser.getUserCode().trim()+"',getdate(),1)";						
			getStmt().executeUpdate(sql);
						
			//循环插入数据
			for(int i=0;i<workNums.length;i++){				
				//人员关联预约课程
				sql="insert into WorkprocedureUserReservationCourse(UserNumber,WorkprocedureReservationCourseId,CheckStatus,ClockinginStatus,TestScore,CreateTime)" +
						" VALUES('"+workNums[i]+"','"+reservationId+"',1,'"+ClockinginStatus[i]+"','"+TestScore[i]+"',getdate())";		
				getStmt().executeUpdate(sql);
				
			}			
			toWrite("{success:true,"+StringVeriable.insertSuccess+"}");
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
	 * 解析EXCEL表
	 * @param fis 
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public HashMap getExcel(FileInputStream fis){
		StringBuffer workNums=new StringBuffer();
		//StringBuffer userName=new StringBuffer();
		StringBuffer courseType=new StringBuffer();
		StringBuffer courseTitle=new StringBuffer();
		StringBuffer courseDescription=new StringBuffer();
		StringBuffer reservationTime=new StringBuffer();
		StringBuffer reservationSite=new StringBuffer();
		StringBuffer lecturer=new StringBuffer();
		StringBuffer ClockinginStatus=new StringBuffer();
		StringBuffer TestScore=new StringBuffer();
		StringBuffer WhetherExamination=new StringBuffer();
		StringBuffer reservationRemark=new StringBuffer();
		
		try {
			InputStream is=fis;
			Workbook rwb=Workbook.getWorkbook(is);
			//得到一个工作表
			Sheet sheet=rwb.getSheet(0);			
			//获取表格内容
			for(int i=2;i<sheet.getRows();i++){
				workNums.append(sheet.getCell(1,i).getContents()+",");
				//userName.append(sheet.getCell(2,i).getContents()+",");
				courseType.append(sheet.getCell(3,i).getContents()+",");
				courseTitle.append(sheet.getCell(4,i).getContents()+",");
				courseDescription.append(sheet.getCell(5,i).getContents()+",");
				reservationTime.append(sheet.getCell(6,i).getContents()+",");
				reservationSite.append(sheet.getCell(7,i).getContents()+",");
				lecturer.append(sheet.getCell(8,i).getContents()+",");
				if(sheet.getCell(9,i).getContents()!=""){
					ClockinginStatus.append(sheet.getCell(9,i).getContents()+",");
				}else{
					ClockinginStatus.append("null,");
				}
				if(sheet.getCell(10,i).getContents()!=""){
					WhetherExamination.append(sheet.getCell(10,i).getContents()+",");
				}else{
					WhetherExamination.append("null,");
				}
				if(sheet.getCell(11,i).getContents()!=""){
					TestScore.append(sheet.getCell(11,i).getContents()+",");
				}else{
					TestScore.append("null,");
				}
				
				if(sheet.getCell(12,i).getContents()!=""){
					reservationRemark.append(sheet.getCell(12,i).getContents()+",");
				}else{
					reservationRemark.append("null,");
				}
				
			}
			//释放占用的内存空间
			rwb.close();
			
			if(workNums.length()>0){
				workNums=workNums.deleteCharAt(workNums.length()-1);
				//userName=userName.deleteCharAt(userName.length()-1);
				courseType=courseType.deleteCharAt(courseType.length()-1);
				courseTitle=courseTitle.deleteCharAt(courseTitle.length()-1);
				courseDescription=courseDescription.deleteCharAt(courseDescription.length()-1);
				reservationTime=reservationTime.deleteCharAt(reservationTime.length()-1);
				reservationSite=reservationSite.deleteCharAt(reservationSite.length()-1);
				lecturer=lecturer.deleteCharAt(lecturer.length()-1);
				ClockinginStatus=ClockinginStatus.deleteCharAt(ClockinginStatus.length()-1);
				TestScore=TestScore.deleteCharAt(TestScore.length()-1);
				WhetherExamination=WhetherExamination.deleteCharAt(WhetherExamination.length()-1);
				reservationRemark=reservationRemark.deleteCharAt(reservationRemark.length()-1);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		HashMap str=new HashMap();
		str.put("workNums", workNums.toString().split(","));
		//str.put("userName", userName);
		str.put("courseType", courseType.toString().split(","));
		str.put("courseTitle", courseTitle.toString().split(","));
		str.put("courseDescription", courseDescription.toString().split(","));
		str.put("reservationTime", reservationTime.toString().split(","));
		str.put("reservationSite", reservationSite.toString().split(","));
		str.put("lecturer", lecturer.toString().split(","));
		str.put("ClockinginStatus", ClockinginStatus.toString().split(","));
		str.put("TestScore", TestScore.toString().split(","));
		str.put("WhetherExamination", WhetherExamination.toString().split(","));
		str.put("reservationRemark", reservationRemark.toString().split(","));
		return str;
	}

}
