package com.desktop.utils;

import java.io.StringWriter;
import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.tools.ant.types.Mapper;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;


import com.desktop.constant.ExtFieldType;
import com.desktop.constant.StringVeriable;
import com.desktop.model.vo.ExtFieldVo;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Json数据 工具类
 *
 */
public class JsonBuilder {
	/**
	 * 得到JsonBuilder实例化对象
	 * @return
	 */
	public static JsonBuilder getInstance(){
		return JsonHolder.JSON_BUILDER;
	}
	/**
	 * 静态内部类
	 * @author 
	 *
	 */
	private static class JsonHolder{
		private static final JsonBuilder JSON_BUILDER=new JsonBuilder();
		private static ObjectMapper mapper=new ObjectMapper();
	}
	/**
	 * 将一个数据实体解析成Json数据格式
	 * @param obj
	 * @return
	 */
	public String toJson(Object obj){
		try {
			return JsonHolder.mapper.writeValueAsString(obj);
		} catch (Exception e) {
			return "";
		}
	}
	/**
	 * 将一个Json字符串封装为指定类型对象
	 * @param json
	 * @param c
	 * @return
	 */
	public Object fromJson(String json, Class<?> c){
		json = cleanJson(json);
		try {
			Object obj = JsonHolder.mapper.readValue(json, c);
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 将一个JsonArray数据转换成一个List的键值对   [{name:'zsp',value:1},{name:'zsp',value:2}]
	 * @param json
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Map> fromJsonArray(String json){
		json = cleanJson(json);
		List<Map> dataList = (List<Map>) fromJson(json, ArrayList.class);
		
		return dataList;
	}
	/**
	 * 为操作成功返回Json
	 * @param strData
	 * @return
	 */
	public String returnSuccessJson(String strData){
		StringBuffer returnJson = new StringBuffer("{ success : true, obj : ");
		returnJson.append(strData);
		returnJson.append("}");
		return returnJson.toString();
	}
	/**
	 * 为操作失败返回Json
	 * @param strData
	 * @return
	 */
	public String returnFailureJson(String strData){
		StringBuffer returnJson = new StringBuffer("{ success : false, obj : ");
		returnJson.append(strData);
		returnJson.append("}");
		return returnJson.toString();
	}
	/**
	 * 为分页列表提供Json封装
	 * 
	 * @param count
	 *            记录总数
	 * @param entities
	 *            实体列表
	 * @param excludes
	 *            在json生成时需要排除的属性名称
	 * @return
	 */
	public String  buildObjListToJson(Long count, Collection<? extends Object> records, boolean listJson){
		try {
			StringBuffer pageJson = null;
			//判断是否展示list的数据
			if (listJson) {
				pageJson = new StringBuffer("{totalCount:" + count + ","
						+ "rows" + ":");
			} else {
				pageJson = new StringBuffer("");
			}
			//构建集合的json数据
			StringWriter w = new StringWriter();
			JsonHolder.mapper.writeValue(w, records);
			pageJson.append(w);
			w.close();
			
			if (listJson) {
				pageJson.append("}");
			} else {
				pageJson.append("");
			}
			return pageJson.toString();
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	/**
	 * 格式化Json
	 * @param json
	 * @return
	 */
	public String cleanJson(String json){
		if(StringUtil.isNotEmpty(json)){
			return json.replaceAll("\n", "");
		}else{
			return "";
		}
	}
	/**
	 * 
	 * @param jsonSql [{sql:''},{}]     ["asd","asdas"]
	 * @return
	 */
	public String[] jsonSqlToString(String jsonSql){
		//得到对象数据
		Object[] os = JSONArray.fromObject(jsonSql).toArray();
		String[] sqls = new String[os.length];
		for (int i = 0; i < os.length; i++) {
			//使用JSONObject和sql键取出值
			JSONObject k = (JSONObject) os[i];
			String kk = (String) k.get("sql");
			sqls[i] = kk;
		}
		return sqls;
	}
	/**
	 * 构建对象json数据[{},{},{}]
	 * @param values
	 * @param excludes
	 * @return
	 */
	public String buildList(List<?> values,String excludes){
		StringBuffer returnJson = new StringBuffer("[");
		for(Object obj:values){
			//声明json配置对象
			JsonConfig cfg = new JsonConfig();
			String[] excluds=excludes.split(",");
			if(excluds.length>0){
				//增加排除属性数组
				cfg.setExcludes(excluds);
			}
			//设置循环策略为忽略，避免死循环
			cfg.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
			JSONObject jsonObject = JSONObject.fromObject(obj, cfg);
			returnJson.append(jsonObject.toString()+StringVeriable.STR_SPLIT);
		}
		if(values.size()>0){
			returnJson.deleteCharAt(returnJson.length()-1);
		}
		returnJson.append("]");
		return returnJson.toString();
	}
	/**
	 * 构建类的ExtJs的fields字段数据
	 * @param modelName
	 * @param fields
	 * @param excludes
	 * @return
	 */
	public String getModelFileds(String modelName,Field[] fields,String excludes){
		List<ExtFieldVo> lists=new ArrayList<ExtFieldVo>();
		for(Field f:fields){
			String[] excludeArray=excludes.split(StringVeriable.STR_SPLIT);
			Boolean flag=false;
			for(String exclude:excludeArray){
				if(f.equals(exclude)){
					flag=true;
					break;
				}
			}
			if(flag){
				continue;
			}
			String fieldType=f.getType().getSimpleName().toLowerCase();
			Boolean excludeFlag=false;
			if(fieldType.equals("double")){
				fieldType=ExtFieldType.FLOAT;
			}else if(fieldType.equals("long")){
				fieldType=ExtFieldType.INT;				
			}else if(fieldType.equals("bigdecimal")){
				fieldType=ExtFieldType.INT;				
			}else if(fieldType.equals("timestamp")){
				fieldType=ExtFieldType.STRING;				
			}else if(fieldType.equals("date")){
				fieldType=ExtFieldType.STRING;				
			}else if(fieldType.equals("integer")){
				fieldType=ExtFieldType.INT;				
			}else if(fieldType.equals("string")){
				fieldType=ExtFieldType.STRING;
			}else{
				excludeFlag=true;
			}
			ExtFieldVo vo=new ExtFieldVo(f.getName(), fieldType);
			if(!excludeFlag){
				lists.add(vo);
			}
		}
		JSONArray jsonArray=JSONArray.fromObject(lists);
		String strData=jsonArray.toString();
		ModelUtil.modelJson.put(modelName, strData);
		return strData;
	}
	
	/**
	 * ResultSet转换json字符
	 * 没有预警的处理
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public String buildSet(ResultSet rs) throws SQLException{
		ResultSetMetaData metaData = rs.getMetaData();
		int colunmCount = metaData.getColumnCount();
		System.out.println("colunmCount="+colunmCount);
		String[] colNameArr = new String[colunmCount]; 
		for (int i = 0; i < colunmCount; i++) {  
			colNameArr[i] = rs.getMetaData().getColumnName(i + 1); 
		}
		StringBuffer StrData=new StringBuffer();
		StrData.append("[");
		while(rs.next()){	
			JSONObject jsonObj = new JSONObject();
			for (int i = 1; i <= colunmCount; i++) {
				String columnName =metaData.getColumnLabel(i);
				String value = rs.getString(columnName);
				jsonObj.put(columnName, value);		
			} 
			StrData.append(jsonObj.toString()+",");
		}
		if(StrData.length()>1){
			StrData.deleteCharAt(StrData.length()-1);
		}
		StrData.append("]");
		
		return StrData.toString();
		
	}
	
	/*
	 * 重写rs结果集向json字符串的转化
	 * */
	public String buildSet4d(ResultSet rs) throws SQLException{
		ResultSetMetaData metaData = rs.getMetaData();
		
		int colunmCount = metaData.getColumnCount();
		System.out.println("colunmCount="+colunmCount);
		String[] colNameArr = new String[colunmCount]; 
		for (int i = 0; i < colunmCount; i++) {  
			colNameArr[i] = rs.getMetaData().getColumnName(i + 1); 
		}
		StringBuffer StrData=new StringBuffer();
		StrData.append("[");
		while(rs.next()){	
			JSONObject jsonObj = new JSONObject();
			for (int i = 1; i <= colunmCount; i++) {
				String columnName =metaData.getColumnLabel(i);
				String value = rs.getString(columnName);
				jsonObj.put(columnName, value);		
			} 
			StrData.append(jsonObj.toString()+",");
		}
		if(StrData.length()>1){
			StrData.deleteCharAt(StrData.length()-1);
		}
		StrData.append("]");
		
		return StrData.toString();
		
	}
	
	
	/**
	 * 对有预警的处理
	 * isAlert
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public String build2Set(ResultSet rs) throws SQLException{
		ResultSetMetaData metaData = rs.getMetaData();

		int colunmCount = metaData.getColumnCount();	

		String[] colNameArr = new String[colunmCount]; 

		for (int i = 0; i < colunmCount; i++) {  
			colNameArr[i] = rs.getMetaData().getColumnName(i + 1); 
		}
		StringBuffer StrData=new StringBuffer();
		StrData.append("[");
		int isAlert=0;
		while(rs.next()){	
			JSONObject jsonObj = new JSONObject();
			for (int i = 1; i <= colunmCount; i++) {
				String columnName =metaData.getColumnLabel(i);
				if(columnName.equals("isAlert")){
					if(rs.getString(columnName).equals("1")||rs.getString(columnName).equals("2")){
						isAlert++;
					}
				}
				String value = rs.getString(columnName);
				jsonObj.put(columnName, value);		
			} 
			StrData.append(jsonObj.toString()+",");
		}
		if(StrData.length()>1){
			StrData.deleteCharAt(StrData.length()-1);
		}
		StrData.append("]");
		StrData.append("&separate&"+String.valueOf(isAlert));	
		return StrData.toString();
		
	}
	
	
	
	/**
	 * ResultSet转换进度条所需要json字符
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public String buildProgressSet(ResultSet rs) throws SQLException{
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
		StringBuffer StrData=new StringBuffer();
		StrData.append("[");
		while(rs.next()){	
			JSONObject jsonObj = new JSONObject();
			for (int i = 1; i <= colunmCount; i++) {
				//属性名称
				String columnName =metaData.getColumnLabel(i);
				//属性值
				String value = rs.getString(columnName);
				if(columnName.equals("DoneRequired")){
					if(value==null){
						jsonObj.put(columnName, "0");
						jsonObj.put("value1", 0);
						jsonObj.put("value2", 0);
					}else{
						String[] values=value.split("/");
						String value2="";
						double value1=(Double.valueOf(values[0])/Double.valueOf(values[1]))*100;
						int val1=(int)value1;
						if(val1<1||val1==0){
							val1=1;
						}else if(val1>100){
							val1=100;
						}
						if (val1 <= 5) {
							value2 = "#ff0000";
						} else if (val1 > 5 && val1 <= 25) {
							value2 = "#f27011";
						} else if (val1 > 25 && val1 <= 50) {
							value2 = "#f2b01e";
						} else if (val1 > 50 && val1 <= 75) {
							value2 = "#f2d31b";
						} else if (val1 > 75 && val1 <= 100) {
							value2 = "#86e01e";
						}
						
						jsonObj.put(columnName, value);
						jsonObj.put("value1", String.valueOf(val1));
						jsonObj.put("value2", value2);
					}
				}else{
					//添加到JSONObject数据中
					jsonObj.put(columnName, value);							
				}

			} 
			StrData.append(jsonObj.toString()+",");
		}
		if(StrData.length()>1){
			StrData.deleteCharAt(StrData.length()-1);
		}
		StrData.append("]");
		
		return StrData.toString();
		
	}

}
