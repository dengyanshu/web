package com.data.sop;

import java.io.File;

import com.opensymphony.xwork2.ActionSupport;

public class Del_Temp_Sop extends ActionSupport{
	private String name;
	
	public String execute() throws Exception{
		String basePath=this.getClass().getClassLoader().getResource(".").getPath();
		File file=new File(basePath);
		String sopPath=file.getParent()+"\\webapps\\web\\core\\data\\sop\\master\\temp_sop\\"+name+".pdf";
		File temp=new File(sopPath);
		if(temp.exists()){
			temp.delete();
		}	
		return SUCCESS;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
