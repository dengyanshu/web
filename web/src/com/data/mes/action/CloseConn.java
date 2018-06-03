package com.data.mes.action;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class CloseConn {
	private CallableStatement cs=null;
	private ResultSet rs=null;
	private Connection conn=null;
	private Statement stmt=null;
	
	public CloseConn(CallableStatement cs,ResultSet rs,Connection conn){
		this.conn=conn;
		this.rs=rs;
		this.cs=cs;
	}
	
	public CloseConn(Statement stmt,ResultSet rs,Connection conn){
		this.conn=conn;
		this.rs=rs;
		this.stmt=stmt;
	}
	
	public void ColseCS() throws SQLException{
		if(this.rs!=null){
			rs.close();
		}
		if(this.cs!=null){
			cs.close();
		}
		if(this.conn!=null){
			this.conn.close();
		}
	}
	
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
