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

@Component("skillmanage_skill")
@Scope("prototype")
@SuppressWarnings("serial")
public class Skill extends Action{
		
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="SELECT * FROM WorkprocedureSkill ORDER BY CreateTime DESC";
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
	
	public void insertRecord(){
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		
		this.setConn(new HR_Datebase().getConn());
		try {
			int ok=0;
			this.setStmt(this.getConn().createStatement());
			String sql="INSERT INTO  WorkprocedureSkill(CreateUserId,CreateTime) VALUES('"+currentUser.getUserCode().trim()+"',getdate())";
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

				String sql="UPDATE WorkprocedureSkill SET SkillCode='"+arr[1]+"',SkillName='"+arr[2]+"',SkillDescription='"+arr[3]+
						"',SkillCategory='"+arr[4]+"',ModifyUserId='"+currentUser.getUserCode().trim()+
						"',ModifyTime=getdate(),SkillRemark='"+arr[9]+"' WHERE WorkprocedureSkillId='"+arr[0]+"'";																																																		
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

	
	public void deleteRecord(){
		this.setConn(new HR_Datebase().getConn());
		int ok=0;
		try {
			this.setStmt(this.getConn().createStatement());
			String ids=this.request.getParameter("ids");			
			String sql="DELETE WorkprocedureSkill FROM WorkprocedureSkill where WorkprocedureSkillId='"+ids+"'";	
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
