package com.data.connectsql;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;

public class upload extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	@SuppressWarnings("deprecation")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String hello = request.getParameter("savePath");
		String nttame = request.getParameter("name");
		HttpSession session = request.getSession();//通过session传参
		System.out.println("接收参数，hello="+hello+",name="+nttame);
		
		String name="";
		try {
			DiskFileUpload fu = new DiskFileUpload();
			// 设置允许用户上传文件大小,单位:字节，这里设为2m
			fu.setSizeMax(5 * 1024 * 1024 * 1024);
			// 设置最多只允许在内存中存储的数据,单位:字节
			fu.setSizeThreshold(10 * 1024 * 1024);
			// 设置一旦文件大小超过getSizeThreshold()的值时数据存放在硬盘的目录
			fu.setRepositoryPath(System.getProperty("java.io.tmpdir"));
			fu.setHeaderEncoding("UTF-8");//解决中文文件名乱码。
			// 开始读取上传信息
			List fileItems = fu.parseRequest(request);
			// 依次处理每个上传的文件
			Iterator iter = fileItems.iterator();
			System.out.println(fileItems.size());
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {//表单域的值
					System.out.println("表单域名" + item.getFieldName());
					System.out.println("表单值" + item);//如果不是文件表单域
					System.out.println("名字："+item.getString());
				} else {
					name = item.getName();
					System.out.println("文件名:"+name);
					long size = item.getSize();
					if (name != null && !name.equals("") && size == 0) {
						continue;
					}
					String path = request.getRealPath("");
					File uploadFolder = new File(path + "/upload");
					if (!uploadFolder.exists())
						uploadFolder.mkdirs();
					File file=new File(path + "/upload/" + name);
					item.write(file);
				}
			}
			response.setContentType("text/html");// 必须设置返回类型为text，否则ext无法正确解析json字符串
			response.setCharacterEncoding("UTF-8");//设置编码字符集为utf-8，否则ext无法正确解析
			PrintWriter outs = response.getWriter();
			outs.write("{success:true}");
			outs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}

