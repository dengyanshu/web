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

@Component("skillmanage_user")
@Scope("prototype")
@SuppressWarnings("serial")
public class UserInfo extends Action{
	
	/**
	 * 用户查找
	 */
	
	public void getResult(){
		this.setConn(new HR_Datebase().getConn());
		
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select * from userInfo ORDER BY createTime DESC";
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
	 * 用户插入
	 */
	
	public void insertRecord(){
		this.setConn(new HR_Datebase().getConn());
		try {
			int ok=0;
			this.setStmt(this.getConn().createStatement());
			String sql="insert into  userInfo(createTime) VALUES(getdate())";
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
	 * 用户更新
	 */
	@SuppressWarnings("rawtypes")
	public void updateRecord(){
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
				String sql="UPDATE userInfo SET workNumber='"+arr[1]+"',name='"+arr[2]+"',position='"+arr[3]+"',status='"+arr[4]+
						"',availableDate='"+arr[5]+"',modifyTime=getdate(),department='"+arr[8]+"' WHERE userinfo_id='"+arr[0]+"'";
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
	 * 用户删除
	 */
	
	public void deleteRecord(){
		this.setConn(new HR_Datebase().getConn());
		int ok=0;
		try {
			this.setStmt(this.getConn().createStatement());
			String ids=this.request.getParameter("ids");			

			String sql="DELETE userInfo FROM userInfo inner join (SELECT id FROM  SQL_split('"+ids+"',','))AS OO  ON userInfo.userinfo_id=OO.id";	
			System.out.println("sql:"+sql);
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
