package com.data.mes.overall;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import net.sf.json.JSONObject;
import com.data.connectsql.OfficialDatabase;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class Gccxsjscap_Sum extends ActionSupport{

	@SuppressWarnings("rawtypes")
	private List data;
	private String str;
	private boolean success;
	private String returnMes;
	private String sl_sn;
	private long results;
	@SuppressWarnings("unchecked")
	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 的接口
		Statement stmt=null; 
		Statement stmt2=null; 
		Statement stmt3=null; 
		Statement stmt4=null; 
		Statement stmt5=null; 

		//表示数据库结果集的数据表
		ResultSet rs1=null,rs2=null,rs3=null,rs4=null,rs5=null;

		//用于执行 SQL 存储过程的接口
		try {
			
			String sql=""+
					"SELECT COUNT(0) "+
					"FROM MO "+ 
					"INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId "+
					"INNER JOIN dbo.Product ON MO.ProductId = Product.ProductId "+
					"WHERE ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL ";

					//3F 
			String sql3=""+
					"SELECT COUNT(0) "+
					"FROM MO INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId "+
					"WHERE workcentername LIKE '%3F%' OR workcentername LIKE '%F3%' AND "+ 
					"ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL ";
					//4F
			String sql4=""+
					"SELECT COUNT(0) "+
					"FROM MO INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId "+
					"WHERE workcentername LIKE '%4F%' OR workcentername LIKE '%F4%' AND "+ 
					"ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL";  


					//2F
			String sql2=""+
					"SELECT COUNT(0) "+
					"FROM MO INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId "+
					"WHERE workcentername LIKE '%S%' AND workcentername NOT LIKE '%TS%' AND workcentername NOT LIKE '%-%' AND "+
					"ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL";  

					//6F
			String sql6=""+
					"SELECT COUNT(0) "+
					"FROM MO INNER JOIN dbo.Workcenter ON dbo.MO.WorkCenterID = dbo.Workcenter.WorkcenterId "+
					"WHERE workcentername LIKE '%6F%' OR workcentername LIKE '%F6%' OR workcentername LIKE '%MOBILE%' AND "+
					"ExecuteDateFrom IS NOT NULL AND ExecuteDateTo IS NULL";  
			
			
			
			
			conn=new OfficialDatabase().getConn();	
			// 存储过程 TEST_MICHAEL_NOOUT 其实是向数据库插入一条数据  
			stmt=conn.createStatement();
			stmt2=conn.createStatement();
			stmt3=conn.createStatement();
			stmt4=conn.createStatement();
			stmt5=conn.createStatement();

			rs1=stmt.executeQuery(sql);
			rs2=stmt2.executeQuery(sql2);
			rs3=stmt3.executeQuery(sql3);
			rs4=stmt4.executeQuery(sql4);
			rs5=stmt5.executeQuery(sql6);

			
			int value=0;
			int value2=0;
			int value3=0;
			int value4=0;
			int value5=0;
			
/*			String value2="";
			String value3="";
			String value4="";
			String value5="";*/
			
			this.data = new ArrayList();
			
			ArrayList arr1=new ArrayList();
			ArrayList arr2=new ArrayList();
			ArrayList arr3=new ArrayList();
			ArrayList arr4=new ArrayList();
			ArrayList arr5=new ArrayList();
			
			while(rs1.next()){
				value = Integer.valueOf(rs1.getString(1)); 
				arr1.add(0, "总数");
				arr1.add(1,Integer.valueOf(value));
				this.data.add(arr1);
			}
			while(rs2.next()){
				value2 = Integer.valueOf(rs2.getString(1));
				arr2.add(0,"二楼");
				arr2.add(1,value2);
				this.data.add(arr2);
			}
			while(rs3.next()){
				value3 = Integer.valueOf(rs3.getString(1));
				arr3.add(0,"三楼");
				arr3.add(1,value3);
				this.data.add(arr3);
			}
			while(rs4.next()){
				value4 = Integer.valueOf(rs4.getString(1));   
				arr4.add(0,"四楼");
				arr4.add(1,value4);
				this.data.add(arr4);
			}
			while(rs5.next()){
				value5 = Integer.valueOf(rs5.getString(1));
				arr5.add(0,"六楼");
				arr5.add(1,value5);
				this.data.add(arr5);
			}
			this.success=true;

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(null!=rs1){
				try {
					rs1.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(null!=rs2){
				try {
					rs2.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(null!=rs3){
				try {
					rs3.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(null!=rs4){
				try {
					rs4.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(null!=rs5){
				try {
					rs5.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

			if(null!=stmt ){
				try {
					stmt .close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(null!=conn){
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return SUCCESS;
	}
	public List getData() {
		return data;
	}

	public long getResults() {
		return results;
	}

	public String getReturnMes() {
		return returnMes;
	}


	public String getSl_sn() {
		return sl_sn;
	}


	public String getStr() {
		return str;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setData(List data) {
		this.data = data;
	}

	public void setResults(long results) {
		this.results = results;
	}


	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}


	public void setSl_sn(String sl_sn) {
		this.sl_sn = sl_sn;
	}

	public void setStr(String str) {
		this.str = str;
	}


	public void setSuccess(boolean success) {
		this.success = success;
	}

}
