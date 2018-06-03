package com.data.test1;

import java.sql.SQLException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.TestDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("testdata2")
@Scope("prototype")
@SuppressWarnings("serial")
public class Test2 extends Action{

	public void getResult(){
		this.setConn(new TestDatabase().getConn());
		//request.getParameter("");
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
	
}