package com.data.skillmanage;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;


import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.HR_Datebase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;
import com.desktop.utils.StringUtil;
import com.opensymphony.xwork2.ActionContext;

@Component("skillmanage_userskill")
@Scope("prototype")
@SuppressWarnings("serial")
public class UserSkill extends Action{	
	
	/**
	 * 插入人员技能
	 */
	public void insertRecord(){
			this.setConn(new HR_Datebase().getConn());
			String exist="1";
			String sql=null;
			try {
				String ids=this.request.getParameter("ids");
				String workNums=this.request.getParameter("workNums");
				String reservationCourseIds=this.request.getParameter("reservationCourseIds");
				String[] idss=ids.split(",");
				String[] workNumss=workNums.split(",");
				this.setStmt(this.getConn().createStatement());
				for(int i=0;i<workNumss.length;i++)
				{
					for(int j=0;j<idss.length;j++){
				int ok=0;
				sql="SELECT COUNT(*) FROM WorkprocedureUserSkill WHERE WorkprocedureSkillId='"+idss[j]+"' AND UserNumber='"+workNumss[i]+"'";					

				getStmt().execute(sql);
				setRs(getStmt().getResultSet());
				while(this.getRs().next()){
					exist=getRs().getString(1);
				}

				if(exist.equals("0")){
				sql="INSERT INTO WorkprocedureUserSkill(WorkprocedureSkillId,UserNumber,WorkprocedureReservationCourseId,CreateTime) " +
						"SELECT SK_ID.id AS WorkprocedureSkillId,US_WN.id AS UserNumber,RC_ID.id AS WorkprocedureReservationCourseId,DT.CreateTime FROM " +
						"(SELECT id FROM  SQL_split('"+idss[j]+"',',')) AS SK_ID inner JOIN(SELECT id FROM  SQL_split('"+workNumss[i]+"',',')) " +
						"AS US_WN on SK_ID.id=SK_ID.id inner Join(SELECT id FROM SQL_split('"+reservationCourseIds+"',','))AS RC_ID " +
						"on SK_ID.id=SK_ID.id inner Join(SELECT GETDATE() AS CreateTime)as DT "+
						"ON SK_ID.id=SK_ID.id  order by SK_ID.id";
					
//					sql="insert into WorkprocedureUserSkill (UserNumber,WorkprocedureReservationCourseId,WorkprocedureSkillId,CreateTime) " +
//							"values('"+workNumss[i]+"','"+reservationCourseIds+"','"+idss[j]+"',GETDATE()) " ;
				ok=this.getStmt().executeUpdate(sql);
				}
				if(ok>0){
					toWrite("{success:true,"+StringVeriable.insertSuccess+"}");
				}else{
					toWrite("{success:false,"+StringVeriable.insertFail+"}");
				}
					}
				}
				//*********************
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
	 * 批量插入人员技能
	 * @throws IOException
	 */
	public void batchInsert() throws IOException{
		//获取参数集
		Map<String,Object> params=ActionContext.getContext().getParameters();
		//从参数集中获取指定的参数信息
		File[] files=(File[]) params.get("path");
		//得到上传数据的哈希数据
		HashMap hm=this.getExcel(new FileInputStream(files[0]));
		//得到当前所持有的用户
		EndUser currentUser=SecurityUserHolder.getCurrentUser();

		String exist="1";		//技能是否在
		String exist2="1";	//人员是否已拥有该技能
		String id=null;			//技能ID
		
		String[] Staffids=(String[])hm.get("Staffids");
		String[] codes=(String[])hm.get("codes");
		String[] names=(String[])hm.get("names");
		String[] categorys=(String[])hm.get("categorys");
		String[] remarks=(String[])hm.get("remarks");
		String[] description=(String[])hm.get("description");
		
		//链接数据集
		this.setConn(new HR_Datebase().getConn());
		
		try {
			int sum=names.length;
			String sql=null;
			this.setStmt(this.getConn().createStatement());
			
			  //判断批量插入的条数，循环每条记录
			for(int i=0;i<sum;i++){
				
				//判断导入的技能是否存在
				sql="SELECT COUNT(*) FROM WorkprocedureSkill WHERE SkillName='"+names[i]+"'";
				this.getStmt().execute(sql);
				this.setRs(getStmt().getResultSet());
				
				while(this.getRs().next()){
					exist=getRs().getString(1);
				}		
				//如果技能不存在则插入一条新的技能
				if(exist.equals("0")){
					sql="INSERT INTO WorkprocedureSkill(SkillCode,SkillName,SkillDescription,SkillCategory,CreateUserId,CreateTime,SkillRemark) " +
							"VALUES('"+codes[i]+"','"+names[i]+"','"+description[i]+"','"+categorys[i]+"','"+currentUser.getUserCode().trim()+"',getdate(),'"+remarks[i]+"')";		
					getStmt().executeUpdate(sql);
				}
				//查询出该技能的ID
				sql="SELECT WorkprocedureSkillId FROM WorkprocedureSkill WHERE SkillName='"+names[i]+"'";					
				getStmt().execute(sql);
				setRs(getStmt().getResultSet());
				while(getRs().next()){
					id=getRs().getString(1);
				}
				
				//判断该人员是否拥有该技能
				sql="SELECT COUNT(*) FROM WorkprocedureUserSkill WHERE WorkprocedureSkillId='"+id+"' AND UserNumber='"+Staffids[i]+"'";					
				getStmt().execute(sql);
				setRs(getStmt().getResultSet());
				
				while(getRs().next()){
					exist2=getRs().getString(1);
				}
				
				//如果该人员之前没有该技能则添加技能
				if(exist2.equals("0")){			
					sql="INSERT INTO WorkprocedureUserSkill(UserNumber,WorkprocedureSkillId,GetTime) VALUES('"+Staffids[i]+"','"+id+"',getdate())";						
					getStmt().executeUpdate(sql);
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
	 * 解析EXCEL表
	 * @param fis 
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public HashMap getExcel(FileInputStream fis){
		StringBuffer workNums=new StringBuffer();
		//StringBuffer userName=new StringBuffer();
		StringBuffer skillCategory=new StringBuffer();
		StringBuffer skillName=new StringBuffer();
		StringBuffer skillDescription=new StringBuffer();
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
			Cell[] cells=sheet.getColumn(0);				
			//获取表格内容
			for(int i=2;i<cells.length;i++){
				workNums.append(sheet.getCell(1,i).getContents()+",");
				//userName.append(sheet.getCell(2,i).getContents()+",");
				skillCategory.append(sheet.getCell(3,i).getContents()+",");
				skillName.append(sheet.getCell(4,i).getContents()+",");
				skillDescription.append(sheet.getCell(5,i).getContents()+",");
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
				skillCategory=skillCategory.deleteCharAt(skillCategory.length()-1);
				skillName=skillName.deleteCharAt(skillName.length()-1);
				skillDescription=skillName.deleteCharAt(skillName.length()-1);
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
		str.put("skillCategory", skillCategory.toString().split(","));
		str.put("skillName", skillName.toString().split(","));
		str.put("skillDescription", skillDescription.toString().split(","));
		str.put("reservationTime", reservationTime.toString().split(","));
		str.put("reservationSite", reservationSite.toString().split(","));
		str.put("lecturer", lecturer.toString().split(","));
		str.put("ClockinginStatus", ClockinginStatus.toString().split(","));
		str.put("TestScore", TestScore.toString().split(","));
		str.put("WhetherExamination", WhetherExamination.toString().split(","));
		str.put("reservationRemark", reservationRemark.toString().split(","));
		return str;
	}
	
	
	//获取用户技能
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			String workNumber=this.request.getParameter("workNumber");
			this.setStmt(this.getConn().createStatement());
			String sql="select WorkprocedureUserInfo.UserNumber,WorkprocedureUserInfo.UserName,WorkprocedureUserInfo.UserDuty," +
					"WorkprocedureSkill.SkillName,WorkprocedureSkill.SkillCategory,WorkprocedureSkill.SkillRemark " +
					"from WorkprocedureUserInfo inner join WorkprocedureUserSkill AS US ON WorkprocedureUserInfo.UserNumber=US.UserNumber " +
					"inner join WorkprocedureSkill ON US.WorkprocedureSkillId=WorkprocedureSkill.WorkprocedureSkillId " +
					"where WorkprocedureUserInfo.UserNumber='"+workNumber+"'";
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

	
	
	public void userSkillBatchInsert() throws IOException{
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
		String[] skillCategory=(String[])hm.get("skillCategory");
		String[] skillName=(String[])hm.get("skillName");
		String[] skillDescription=(String[])hm.get("skillDescription");
		String[] reservationTime=(String[])hm.get("reservationTime");
		String[] reservationSite=(String[])hm.get("reservationSite");
		String[] lecturer=(String[])hm.get("lecturer");
		String[] ClockinginStatus=(String[])hm.get("ClockinginStatus");
		String[] TestScore=(String[])hm.get("TestScore");
		String[] WhetherExamination=(String[])hm.get("WhetherExamination");
		String[] reservationRemark=(String[])hm.get("reservationRemark");
		
		//链接数据集
		this.setConn(new HR_Datebase().getConn());
		String courseId="80E872458C7E";
		String sql=null;
		String reservationId=StringUtil.getRandomString(12);
		String skillId=StringUtil.getRandomString(12);
		
		try {
			setStmt(this.getConn().createStatement());			
			//插入技能
			sql="insert into WorkprocedureSkill(WorkprocedureSkillId,SkillName,SkillDescription,SkillCategory" +
					",CreateUserId,CreateTime) VALUES('"+skillId+"','"+skillName[0]+"','"+skillDescription[0]+"','"+skillCategory[0]+"','"+currentUser.getUserCode().trim()+"',getdate())";		
			getStmt().executeUpdate(sql);
			
			//插入预约课程
			sql="insert into WorkprocedureReservationCourse(WorkprocedureReservationCourseId,WorkprocedureCourseId,ReservationTime,ReservationSite" +
					",Lecturer,WhetherExamination,ReservationRemark,CreateUserId,CreateTime,ReservationStatus) VALUES" +
					"('"+reservationId+"','"+courseId+"','"+reservationTime[0]+"','"+reservationSite[0]+"','"+lecturer[0]+"','"+WhetherExamination[0]+"','"+reservationRemark[0]+"','"+currentUser.getUserCode().trim()+"',getdate(),1)";			
			getStmt().executeUpdate(sql);
			
			//循环插入数据
			for(int i=0;i<workNums.length;i++){				
				//人员关联技能
				sql="insert into WorkprocedureUserSkill(UserNumber,WorkprocedureSkillId,WorkprocedureReservationCourseId,CreateTime)" +
						" VALUES('"+workNums[i]+"','"+skillId+"','"+reservationId+"',getdate())";		
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
}
