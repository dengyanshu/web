package com.data.kanban.xbckc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.SQLException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_XM_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;

@Component("smt_xbckc_kanban")
@Scope("prototype")
@SuppressWarnings("serial")
public class Smtxbckc extends Action {
	public void getResult() {
		setConn(new com.data.connectsql.New25_Database(). getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call Txn_smtxbckc_4d_DoMethod(?,?)}"));
			getCs().setString("sumqty", request.getParameter("sumqty"));
			getCs().setString("mzqty", request.getParameter("mzqty"));
			
			getCs().execute();
			setRs(getCs().getResultSet());
			System.out.println(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			System.out.println(StrData);
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}