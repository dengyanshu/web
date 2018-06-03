package com.data.skillmanage;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;


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
import com.opensymphony.xwork2.ActionContext;

@Component("skillmanage_reservationSkill")
@Scope("prototype")
@SuppressWarnings("serial")
public class ReservationSkill extends Action{	
	
	/**
	 * 插入人员技能
	 */
	public void insertRecord(){
			this.setConn(new HR_Datebase().getConn());
			try {
				String ids=this.request.getParameter("ids");
				String workNums=this.request.getParameter("workNums");
				int ok=0;
				this.setStmt(this.getConn().createStatement());
				String sql="INSERT INTO WorkprocedureUserSkill(WorkprocedureSkillId,UserNumber) " +
						"SELECT SK_ID.id AS WorkprocedureSkillId,US_WN.id AS UserNumber FROM " +
						"(SELECT id FROM  SQL_split('"+ids+"',',')) AS SK_ID inner JOIN(SELECT id FROM  SQL_split('"+workNums+"',','))" +
						" AS US_WN on SK_ID.id=SK_ID.id  order by SK_ID.id";
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
	//public HashMap getExcel(String path){
		StringBuffer workNums=new StringBuffer();
		StringBuffer skillName=new StringBuffer();
		StringBuffer skillDescription=new StringBuffer();
		StringBuffer Category=new StringBuffer();
		StringBuffer Remark=new StringBuffer();
		StringBuffer Code=new StringBuffer();
		
		try {
			InputStream is=fis;
			Workbook rwb=Workbook.getWorkbook(is);
			//得到一个工作表
			Sheet sheet=rwb.getSheet(0);			
			//获取表格内容
			for(int i=1;i<sheet.getRows();i++){
				workNums.append(sheet.getCell(0,i).getContents()+",");
				Code.append(sheet.getCell(1,i).getContents()+",");
				skillName.append(sheet.getCell(2,i).getContents()+",");
				skillDescription.append(sheet.getCell(3,i).getContents()+",");
				Category.append(sheet.getCell(4,i).getContents()+",");
				Remark.append(sheet.getCell(5,i).getContents()+",");
			}
			//释放占用的内存空间
			rwb.close();
			
			if(workNums.length()>0){
				workNums=workNums.deleteCharAt(workNums.length()-1);
			}
			if(skillName.length()>0){
				skillName=skillName.deleteCharAt(skillName.length()-1);
			}
			if(skillDescription.length()>0){
				skillDescription=skillDescription.deleteCharAt(skillDescription.length()-1);
			}
			if(Category.length()>0){
				Category=Category.deleteCharAt(Category.length()-1);
			}
			if(Remark.length()>0){
				Remark=Remark.deleteCharAt(Remark.length()-1);
			}
			if(Code.length()>0){
				Code=Code.deleteCharAt(Code.length()-1);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		String[] Staffids=workNums.toString().split(",");
		String[] codes=Code.toString().split(",");
		String[] names=skillName.toString().split(",");
		String[] categorys=Category.toString().split(",");
		String[] remarks=Remark.toString().split(",");
		String[] description=skillDescription.toString().split(",");
		
		HashMap str=new HashMap();
		str.put("Staffids", Staffids);
		str.put("codes", codes);
		str.put("names", names);
		str.put("categorys", categorys);
		str.put("description", description);
		str.put("remarks", remarks);
		return str;
	}
	
	
	//获取用户技能
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			String workNumber=this.request.getParameter("workNumber");
			this.setStmt(this.getConn().createStatement());
			String sql="select WorkprocedureUserInfo.UserNumber,WorkprocedureUserInfo.UserName,WorkprocedureUserInfo.UserStatus," +
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

}
