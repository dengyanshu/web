package com.data.mes.action;

import java.io.IOException;
import java.io.Writer;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.data.connectsql.New25_Database;
import com.data.connectsql.New25_Report_Database;
import com.data.connectsql.New25_XM_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.connectsql.TestDatabase;
import com.data.connectsql.TjDatabase;
import com.desktop.action.BaseAction;
import com.desktop.utils.JsonBuilder;
import com.desktop.utils.ModelUtil;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class Action<HR_Datebase> extends ActionSupport implements ServletResponseAware, ServletRequestAware{
	/**日志输出对象*/
	@SuppressWarnings("unused")
	private static Logger logger=Logger.getLogger(BaseAction.class);
	/**请求对象*/
	protected HttpServletRequest request;
	/**返回对象*/
	protected HttpServletResponse response;
	private String data;
	/**处理结果*/
	private boolean success;
	/**返回信息*/
	private String returnMes;
	/**数据链接*/
	private Connection conn;
	/**存储过程接口*/
	private CallableStatement cs;
	/**结果集*/
	private ResultSet rs;
	/**SQL语句接口*/
	private Statement stmt;
	/**正式库链接10.2.0.56*/
	private OfficialDatabase officialDatabase;
	/**人资培训打卡链接10.2.0.8*/
	private HR_Datebase HR_Datebase;
	/**天津正式库链接 10.16.0.108*/
	private New25_Database New25_Database;
	/**新库链接10.2.0.25_XE*/
	private New25_Report_Database New25_Report_Database;
	/**新库链接10.2.0.25_Report*/
	private New25_XM_Database New25_XM_Database;
	/**新库链接10.2.0.25_XM*/
	private TjDatabase tjDatabase;
	/**测试库链接10.2.0.17*/
	private TestDatabase testDatabase;
	/**Json工具类*/
	protected static JsonBuilder jsonBuilder;
	
	static{
		jsonBuilder=JsonBuilder.getInstance();
	}



	public Connection getConn() {
		return conn;
	}
	public CallableStatement getCs() {
		return cs;
	}
	public String getData() {
		return data;
	}
	public OfficialDatabase getOfficialDatabase() {
		return officialDatabase;
	}
	public HR_Datebase HR_Datebase() {
		return HR_Datebase;
	}
	
	public HttpServletRequest getRequest() {
		return request;
	}
	
	public HttpServletResponse getResponse() {
		return response;
	}
	
	public String getReturnMes() {
		return returnMes;
	}
	
	public ResultSet getRs() {
		return rs;
	}
	
	public Statement getStmt() {
		return stmt;
	}
	public TestDatabase getTestDatabase() {
		return testDatabase;
	}
	public TjDatabase getTjDatabase() {
		return tjDatabase;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setConn(Connection conn) {
		this.conn = conn;
	}
	public void setCs(CallableStatement cs) {
		this.cs = cs;
	}
	public void setData(String data) {
		this.data = data;
	}
	public void setOfficialDatabase(OfficialDatabase officialDatabase) {
		this.officialDatabase = officialDatabase;
	}
	public void HR_Datebase(HR_Datebase HR_Datebase) {
		this.HR_Datebase = HR_Datebase;
	}
	
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}
	public void setRs(ResultSet rs) {
		this.rs = rs;
	}
	@Override
	public void setServletRequest(HttpServletRequest reqeust) {
		this.request=reqeust;
		
	}
	
	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response=response;
		
	}
	public void setStmt(Statement stmt) {
		this.stmt = stmt;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	public void setTestDatabase(TestDatabase testDatabase) {
		this.testDatabase = testDatabase;
	}
	public void setTjDatabase(TjDatabase tjDatabase) {
		this.tjDatabase = tjDatabase;
	}

	public New25_Database getNew25_Database() {
		return New25_Database;
	}
	public void setNew25_Database(New25_Database new25_Database) {
		New25_Database = new25_Database;
	}
	public New25_Report_Database getNew25_Report_Database() {
		return New25_Report_Database;
	}
	public void setNew25_Report_Database(New25_Report_Database new25_Report_Database) {
		New25_Report_Database = new25_Report_Database;
	}
	public New25_XM_Database getNew25_XM_Database() {
		return New25_XM_Database;
	}
	public void setNew25_XM_Database(New25_XM_Database new25_XM_Database) {
		New25_XM_Database = new25_XM_Database;
	}
	
	/**
	 * 向前台写入返回字符串
	 * @param contents
	 */
	protected void toWrite(String contents){
		if(ModelUtil.isNotNull(response)){
			response.setContentType("text/html;charset=UTF-8;");
			Writer writer=null;
			try {
				response.setCharacterEncoding("UTF-8");
				writer=response.getWriter();
				writer.write(contents);
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				try {
					writer.flush();
					writer.close();
					response.flushBuffer();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**关闭存储过程链接释放空间*/
	public void ColseCS() throws SQLException{
		if(this.rs!=null){
			rs.close();
		}
		if(this.cs!= null){
			cs.close();
		}
		if(this.conn!=null){
			this.conn.close();
//			System.out.println("关闭连接"+this.conn.toString());
		}
	}
	/**关闭存储过程链接释放空间*/
	public void CloseS() throws SQLException{
		if(this.rs!=null){
			this.rs.close();
		}
		if(this.stmt!=null){
			this.stmt.close();
		}
		if(this.conn!=null){
			this.conn.close();
		}
		
	}

}
