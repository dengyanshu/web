package com.data.mes.action;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

public class BaseAction {

	private ResultSet rs=null;
	private List data;
	

	public BaseAction(ResultSet rs){
		this.rs=rs;
	}

	public List getData() {
		return data;
	}
	public ResultSet getRs() {
		return rs;
	}

	public List ResultData(){
		try {
			this.data = new ArrayList<JSONObject>();
			//getMetaData();获取此 ResultSet 对象的列的编号、类型和属性。
			ResultSetMetaData metaData = rs.getMetaData();

			//getColumnCount();返回此 ResultSet 对象中的列数。
			int colunmCount = metaData.getColumnCount();	

			//所有结果集的名称属性
			String[] colNameArr = new String[colunmCount]; 

			//循环把结果集中的所有的名称属性放到数组中
			for (int i = 0; i < colunmCount; i++) {  
				colNameArr[i] = rs.getMetaData().getColumnName(i + 1); 
			}	
			
			// 遍历ResultSet中的每条数据
			while(rs.next()){			
				JSONObject jsonObj = new JSONObject();
				for (int i = 1; i <= colunmCount; i++) {
					//属性名称
					String columnName =metaData.getColumnLabel(i);
					//属性值
					String value = rs.getString(columnName);
					//添加到JSONObject数据中
					jsonObj.put(columnName, value);		
				} 
				this.data.add(jsonObj);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(null!=rs){
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}		
		return this.data;
	}
	
	public void setData(List data) {
		this.data = data;
	}

	public void setRs(ResultSet rs) {
		this.rs = rs;
	} 
}
