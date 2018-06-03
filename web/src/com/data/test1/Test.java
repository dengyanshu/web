package com.data.test1;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Date;

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

@Component("testdata")
@Scope("prototype")
@SuppressWarnings("serial")
public class Test extends Action{
	
	/**
	 * 课程查找
	 */
	
	public void getResult(){
		this.setConn(new TestDatabase().getConn());
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select userId,userCode,username from EndUser";
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
	
	public void getResult2(){
		this.setConn(new TestDatabase().getConn());
		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select menuId,menuName,moduleCode from Menu";
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
	
	
	public void getResult3(){
		this.setConn(new TestDatabase().getConn());
		//接收
		String val=request.getParameter("val");

		try {
			this.setStmt(this.getConn().createStatement());
			String sql="select userId,userCode,username from EndUser where userId like '%"+val+"%'";
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
