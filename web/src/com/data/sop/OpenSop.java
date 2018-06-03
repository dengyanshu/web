package com.data.sop;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import com.data.connectsql.TestDatabase;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class OpenSop extends ActionSupport{
	private String id;
	private boolean success;
	private String returnMes;

	public String execute() throws Exception{

		//与特定数据库的连接（会话）。在连接上下文中执行 SQL 语句并返回结果。
		Connection conn=null;

		//用于执行 SQL 的接口
		PreparedStatement stmt  = null; 

		//表示数据库结果集的数据表
		ResultSet rs=null;

		//FileOutputStream fos=null;

		InputStream in=null;
		
		FileInputStream fis=null;

		String name=null;
		
		int size;

		String sql="SELECT * FROM SopData WHERE id='"+id+"'";

		try {
			conn=new TestDatabase().getConn();	
			stmt=conn.prepareStatement(sql);
			rs=stmt.executeQuery();
			while(rs.next()){
				name=rs.getString("name");
				size=rs.getInt("size");
				in=rs.getBinaryStream("source"); 
				String basePath=this.getClass().getClassLoader().getResource(".").getPath();
				File file=new File(basePath);
				String sopPath=file.getParent()+"\\webapps\\web\\core\\data\\sop\\master\\temp_sop\\"+name+".pdf";
				File sop=new File(sopPath);
				
				if(!sop.exists()){
					FileOutputStream fos=new FileOutputStream(sop);
					byte[] buff=new byte[size];
					int i;
					while((in.read(buff))!=-1){
						fos.write(buff);	
					}
					fos.flush();
					fos.close();
					in.close();					
				}
				
			}
			this.success=true;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} catch (IOException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			if(null!=rs){
				try {
					rs.close();
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
	public String getId() {
		return id;
	}
	public String getReturnMes() {
		return returnMes;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
}
