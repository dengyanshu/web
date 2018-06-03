package com.data.sop;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;
import com.data.connectsql.TestDatabase;
import com.opensymphony.xwork2.ActionSupport;


  
public class AddSop extends ActionSupport{
	private String name;
	private String type;
	private String zcb;
	private String path;
	
	private List data;
	private boolean success;
	private String returnMes;

	public String execute() throws Exception{

		///与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 存储过程的接口
		PreparedStatement stmt  = null; 

		JSONObject jsonObj = new JSONObject();
		
		this.data = new ArrayList<JSONObject>();
		
		//用于执行 SQL 存储过程的接口
		try {
			conn=new TestDatabase().getConn();	
			
			File upfile=new File(this.path);	
			
			if(upfile.exists()){
				FileInputStream fis=new FileInputStream(upfile);			
				String sql="INSERT INTO SopData (processing,name,date,source,type,size) VALUES ('"+this.zcb+"','"+this.name+"','2013-10-15',?,'"+this.type+"',?)";	
				stmt=conn.prepareStatement(sql);				
				stmt.setBinaryStream(1,fis,fis.available());
				stmt.setInt(2,fis.available());				
				stmt.execute();				
				fis.close();		
				

				this.setSuccess(true);
				this.setReturnMes("添加成功");
			}else{
				this.returnMes="没有你要查找的结果!";
				this.success=false;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
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
	public String getName() {
		return name;
	}
	public String getPath() {
		return path;
	}
	public String getReturnMes() {
		return returnMes;
	}
	
	
	public String getType() {
		return type;
	}
	public String getZcb() {
		return zcb;
	}
	public boolean isSuccess() {
		return success;
	}

	public void setData(List data) {
		this.data = data;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	

	public void setPath(String path) {
		this.path = path;
	}

	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


	public void setType(String type) {
		this.type = type;
	}

	public void setZcb(String zcb) {
		this.zcb = zcb;
	}
}
