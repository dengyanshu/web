package com.data.kanban.smt_cn;

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



@Component("smt_cn_kanban")
@Scope("prototype")
@SuppressWarnings("serial")
public class CNkanban extends Action {
	public void getResult() {
		String remoteIP = "";// 客户IP
		String remoteName = "";// 客户计算机名(=产线名)
		remoteIP = getIpAddr(request);
		remoteName = getRemoteName(remoteIP);
		//System.out.println("remoteIP="+remoteIP+",remoteName="+remoteName+"time="+new Date().toString());

		EndUser currentUser = SecurityUserHolder.getCurrentUser();
		String curUserName = currentUser.getUsername();
		setConn(new New25_XM_Database().getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call Query_SMTLine_Detail(?,?)}"));
			getCs().setString("userName", curUserName);
			getCs().setString("remoteName", remoteName);			
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
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
   
	/**
	 * 根据线体获取所有的查询信息
	 * 直接用于生产原始HTML  
	 * */
	public void getResult2() {
		
		setConn(new New25_XM_Database().getConn());// 10.2.0.8
		try {
			setCs(getConn().prepareCall("{call Query_SMTLine_all_new(?)}"));
			getCs().setString("userName", request.getParameter("line"));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			System.out.println("StrData="+StrData+",para="+request.getParameter("line"));
			
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

	
	
	/**
	 * 
	 */
	public void getResultHeader() {
		String remoteIP = "";// 客户IP
		String remoteName = "";// 客户计算机名(=产线名)
		remoteIP = getIpAddr(request);
		remoteName = getRemoteName(remoteIP);

		setConn(new New25_XM_Database().getConn());
		try {
			EndUser currentUser = SecurityUserHolder.getCurrentUser();
			String curUserName = currentUser.getUsername();

			setCs(getConn().prepareCall("{call Query_SMTLine_Header(?,?)}"));
			getCs().setString("userName", curUserName);
			getCs().setString("remoteName", remoteName);
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
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
	
	
	public void getResultHeader2() {
		setConn(new New25_XM_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Query_SMTLine_Header(?,?)}"));
			getCs().setString("userName", request.getParameter("line"));
			getCs().setString("remoteName", "");
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
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

	// 1.真实客户IP
	/**
	 * @param request
	 * @return IP
	 */
	public String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	// 2.获取客户端mac地址
	/**
	 * @param ip
	 * @return Mac
	 */
	public String getMACAddress(String ip) {
		String str = "";
		String macAddress = "";
		try {
			Process p = Runtime.getRuntime().exec("nbtstat -A " + ip);
			InputStreamReader ir = new InputStreamReader(p.getInputStream());
			LineNumberReader input = new LineNumberReader(ir);

			while ((str = input.readLine()) != null) {
				if (str.indexOf("MAC") > 1) {
					// 使用substring函数截出mac地址
					macAddress = str.substring(str.indexOf("MAC") + 9,
							str.length());
					// macAddress = str.substring(str.indexOf("=") + 1,
					// str.length());
					break;
				}
			}
		} catch (IOException e) {
			e.printStackTrace(System.out);
		}
		return macAddress;
	}

	/**
	 * @param ip
	 * @return RemoteName
	 */
	public String getRemoteName(String ip) {
		String str = "";
		String RemoteName = "";
		if (request.getAttribute("RemoteName") == null || request.getAttribute("RemoteName") == "") {
			try {
				Process p = Runtime.getRuntime().exec("nbtstat -A " + ip);
				InputStreamReader ir = new InputStreamReader(p.getInputStream());
				LineNumberReader input = new LineNumberReader(ir);
				String f = "<20>";
				while ((str = input.readLine()) != null) {
					if (str.indexOf(f) > 1) {
						RemoteName = str.substring(4, 19).trim();
						request.setAttribute("RemoteName", RemoteName);
						break;
					}
				}
			} catch (IOException e) {
				e.printStackTrace(System.out);
			}
		} else {
			RemoteName = request.getAttribute("RemoteName").toString();
		}
		return RemoteName;
	}
}