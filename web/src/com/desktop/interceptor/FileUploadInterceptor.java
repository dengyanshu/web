package com.desktop.interceptor;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.desktop.action.BaseAction;
import com.desktop.constant.StringVeriable;
import com.desktop.utils.DateUtil;
import com.desktop.utils.EntityUtil;
import com.desktop.utils.PropUtil;
import com.desktop.utils.StringUtil;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

public class FileUploadInterceptor implements Interceptor {
	private static Logger logger=Logger.getLogger(FileUploadInterceptor.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = -5982604361681730537L;
	private static final Integer BUFFER_SIZE=16*1024;
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String intercept(ActionInvocation ai) throws Exception {
		// TODO Auto-generated method stub
		//得到servlet API的对象
		HttpServletResponse response=(HttpServletResponse) ai.getInvocationContext().get(ServletActionContext.HTTP_RESPONSE);
		HttpServletRequest request=(HttpServletRequest) ai.getInvocationContext().get(ServletActionContext.HTTP_REQUEST);
		String method=ai.getProxy().getMethod();
		
		if(!"load".equals(method) && !"getTree".equals(method)){
			ActionContext ac=ai.getInvocationContext();	
			Map<String,Object> params=ac.getParameters();			
			Object actionObj=ai.getProxy().getAction();			
			if(actionObj instanceof BaseAction){
				BaseAction action=(BaseAction) actionObj;			
				Object model=action.getModel();				
				processFieldsUpload(request, params, model);
			}
		}
		return ai.invoke();
	}
	//上传文件处理
	public void processFieldsUpload(HttpServletRequest request, Map<String, Object> params, Object model){
		String uploadFields=request.getParameter("uploadFields");		
		if(StringUtil.isNotEmpty(uploadFields)){
			String[] fieldArray=uploadFields.split(StringVeriable.STR_SPLIT);				
			//前台会穿三个参数
			/**
			 * 1.字段名：得到文件流对象
			 * 2.字段名FileName  文件名称
			 * 3.字段名ContextType 文件类型
			 * 注意：如果图片不显示则要对图片路径进行重写  如:(D:/tomcat7/webapps)
			 */
			for(String field:fieldArray){
				//从参数集中获取指定的参数信息
				File[] files=(File[]) params.get(field);
				if(files!=null && files.length>0){
					//获取到web目录下文件存储路径
					String toUploadDir=PropUtil.get("struts.upload.path")+"/"+DateUtil.formatDate(new Date());
					//服务器的相对路径
					//File dir=new File(BaseAction.webrootAbsPath+toUploadDir);
					//服务器的绝对路径
					File dir=new File("D:/tomcat7/webapps"+toUploadDir);					
					if(!dir.exists()){
						logger.info("创建文件目录"+toUploadDir);
						dir.mkdirs();
					}
					//获取到上传文件的文件名集
					String[] fileNames=(String[]) params.get(field+PropUtil.get("struts.upload.fieldNamePost"));
					//获取到上传文件的文件类型集	
					String[] fileTypes=(String[])params.get(field+PropUtil.get("struts.upload.contentTypePost"));
					for(int i=0;i<files.length;i++){
						//得到上传文件的文件名（87aa5eba-9414-4909-beb1-67438ae2d4ec.xls）
						String fileName=UUID.randomUUID()+fileNames[i].substring(fileNames[i].lastIndexOf("."));
						//得到文件的在服务器中该存放的位置(/web/upload/2014-08-16/87aa5eba-9414-4909-beb1-67438ae2d4ec.xls)
						String rootPath=toUploadDir+"/"+fileName;
						//File dst=new File(BaseAction.webrootAbsPath+rootPath);
						File dst=new File("D:/tomcat7/webapps"+rootPath);
						copy(files[i], dst, false);
						EntityUtil.invokeSetMethod(model, field, new Object[]{rootPath});
					}
				}
				
			}
			
		}
	}
	/**
	 * 写出文件的方法
	 * @param src 前台传的file对象
	 * @param dst 目标的文件对象
	 * @param overwrite 是否覆盖
	 */
	private void copy(File src, File dst, boolean overwrite)  {
		 try  {
	            if(dst.exists() && overwrite) {
	                dst.delete();
	            }
	           InputStream in = null ;
	           OutputStream out = null ;
	            try  {                
	               in = new BufferedInputStream( new FileInputStream(src), BUFFER_SIZE);
	               out = new BufferedOutputStream(new FileOutputStream(dst),BUFFER_SIZE);
	                byte [] buffer = new byte [BUFFER_SIZE];
	                while (in.read(buffer) > 0 )  {
	                   out.write(buffer);
	               } 
	            } finally  {
	                if ( null != in)  {
	                   in.close();
	               } 
	                if ( null != out)  {
	                   out.close();
	               } 
	            } 
	         } catch (Exception e)  {
	            e.printStackTrace();
	        } 
	}

}
