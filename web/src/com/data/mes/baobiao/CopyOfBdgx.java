package com.data.mes.baobiao;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.io.Writer;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.BaseAction;
import com.data.mes.action.CloseConn;
import com.desktop.utils.ModelUtil;
import com.opensymphony.xwork2.ActionSupport;


@Component("bdgx")
@Scope("prototype")
public class CopyOfBdgx extends ActionSupport implements Serializable,ServletRequestAware,ServletResponseAware{
	private static final long serialVersionUID = -660965937227955611L;
	
	protected HttpServletRequest request;
	protected HttpServletResponse response;

	private String mo;
	private String num;
	private List data;
	private boolean success;
	private String returnMes;
	
	public HttpServletResponse Excel() throws IOException, RowsExceededException, WriteException{
		String title[]={"title1","title2","title3","title4"};
		 
		 // 创建Excel工作薄   
		 WritableWorkbook wwb;   
		// 设置弹出对话框
		 response.setContentType("application/DOWLOAD");
		 
		// 设置工作表的标题
		 response.setHeader("Content-Disposition","attachment; filename=d.xls");
		// 新建立一个jxl文件,即在e盘下生成testJXL.xls   
		 //OutputStream os = new FileOutputStream(filePath);
		 OutputStream os = response.getOutputStream();
		 
		 wwb=Workbook.createWorkbook(os);    
		 // 添加第一个工作表并设置第一个Sheet的名字   
		 WritableSheet sheet = wwb.createSheet("测试", 1);   
		 Label label; 
		/*        for(int i=0;i<title.length;i++){   
		     // Label(x,y,z) 代表单元格的第x+1列，第y+1行, 内容z   
		   // 在Label对象的子对象中指明单元格的位置和内容   
		    label = new Label(i,0,title[i]); 
		    sheet.addCell(label);
		    for(int j=1;j<10;j++){
		 	   label = new Label(i,j,String.valueOf(j)); 
		 	   sheet.addCell(label);
		    }
		    // 将定义好的单元格添加到工作表中   
		   //sheet.addCell(label);   
		}*/  
		 for(int i=0;i<title.length;i++){
		     label = new Label(i,0,title[i]); 
		     sheet.addCell(label);
		 }
		/* 
		 for(int i=0;i<10;i++){
		 	sheet.addCell(new Label(1,i,String.valueOf(i)));
		 	sheet.addCell(new Label(2,i,String.valueOf(i)));
		 	sheet.addCell(new Label(3,i,String.valueOf(i)));
		 	sheet.addCell(new Label(4,i,String.valueOf(i)));  	
		 }
		 */
		 
		 // 写入数据   
		 wwb.write();   
		  // 关闭文件   
		 wwb.close();
		 System.out.println("dddddd");
		return response;	
	}
	
	
	protected void toWrite(String contents){
		if(ModelUtil.isNotNull(response)){
			response.setContentType("text/html;charset=UTF-8;");
			Writer writer=null;
			try {
				response.setCharacterEncoding("UTF-8");
				writer=response.getWriter();
				writer.write(contents);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally{
				try {
					writer.flush();
					writer.close();
					response.flushBuffer();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
	public String execute() throws Exception{
		Connection conn=null;
		CallableStatement stmt  = null; 
		ResultSet rs=null;
		try {
			conn=new OfficialDatabase().getConn();	
			stmt=conn.prepareCall("{call SP_QUERY_SN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			stmt.setString("I_Sender", "");
			stmt.registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			stmt.registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
			stmt.setString("I_LanguageId", "1");
			stmt.setString("I_PlugInCommand", "");
			stmt.setString("I_OrBitUserId", "");
			stmt.setString("I_OrBitUserName", "");
			stmt.setString("I_ResourceId", "");
			stmt.setString("I_ResourceName", "");
			stmt.setString("I_PKId", "");
			stmt.setString("I_ParentPKId", "");
			stmt.setString("I_Parameter", "");
			
			stmt.setString("MONAME", this.mo);
			stmt.setString("SNTYPE", "");
			stmt.setString("RobertSN", "");

			stmt.execute();  
			rs=stmt.getResultSet();
			BaseAction ba=new BaseAction(rs);
			
			this.data=ba.ResultData();
			if(this.data.size()>0){
				this.success=true;
			}else{
				this.returnMes="没有你要查找的结果!";
				this.success=false;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			new CloseConn(stmt,rs,conn).ColseCS();
		}
		return SUCCESS;
	}
	public List getData() {
		return data;
	}

	public String getMo() {
		return mo;
	}
	
	public String getNum() {
		return num;
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
	public boolean isSuccess() {
		return success;
	}

	public void setData(List data) {
		this.data = data;
	}

	public void setMo(String mo) {
		this.mo = mo;
	}

	public void setNum(String num) {
		this.num = num;
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

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request=request;	
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response=response;	
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
