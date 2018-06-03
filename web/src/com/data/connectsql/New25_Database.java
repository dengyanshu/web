package com.data.connectsql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class New25_Database {
	private String SQLServerDriver="com.microsoft.sqlserver.jdbc.SQLServerDriver";
	private String DatabaseIP="10.2.0.25";
	private String DatabaseUserName="mesweb";
	private String DatabasePassword="web123";
	private String DatabaseName="OrBitXE";
	private String DatabaseUrl="jdbc:sqlserver://"+DatabaseIP+":1433;DatabaseName="+DatabaseName;
	private Connection conn=null;
	
	public Connection getConn() {
		try {
			Class.forName(SQLServerDriver);
		} catch (ClassNotFoundException e) {
			System.out.println("驱动出错!");
			e.printStackTrace();
		}
		
		try {
			this.conn=DriverManager.getConnection(DatabaseUrl,DatabaseUserName,DatabasePassword);
		} catch (SQLException e) {
			System.out.println("链接数据库出错!");	
			try{
				this.conn=DriverManager.getConnection(DatabaseUrl,DatabaseUserName,DatabasePassword);
			}catch(SQLException f)
			{
				f.printStackTrace();
			}	
		}
		
		return conn;
	}
	public String getDatabaseIP() {
		return DatabaseIP;
	}
	public String getDatabaseName() {
		return DatabaseName;
	}
	public String getDatabasePassword() {
		return DatabasePassword;
	}
	public String getDatabaseUrl() {
		this.DatabaseUrl="jdbc:sqlserver://"+DatabaseIP+":1433;DatabaseName="+DatabaseName;
		return DatabaseUrl;
	} 
	public String getDatabaseUserName() {
		return DatabaseUserName;
	}

	public String getSQLServerDriver() {
		return SQLServerDriver;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}
	public void setDatabaseIP(String databaseIP) {
		DatabaseIP = databaseIP;
	}
	public void setDatabaseName(String databaseName) {
		DatabaseName = databaseName;
	}
	public void setDatabasePassword(String databasePassword) {
		DatabasePassword = databasePassword;
	}
	public void setDatabaseUrl(String databaseUrl) {
		DatabaseUrl = databaseUrl;
	}
	public void setDatabaseUserName(String databaseUserName) {
		DatabaseUserName = databaseUserName;
	}
	public void setSQLServerDriver(String sQLServerDriver) {
		SQLServerDriver = sQLServerDriver;
	}

}