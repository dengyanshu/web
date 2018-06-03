package com.desktop.rbac.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.rbac.model.Department;
import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;
@Component("userAction")
@Scope("prototype")
public class UserAction extends BaseAction {

	/**
	 * MD5加密
	 */
	private static final long serialVersionUID = -6447415593724534456L;
	private EndUser endUser=new EndUser();
	
	public void getCheckOk(){
		toWrite("{\"success\":true}");		
	}
	
	public void getCheckError(){
		toWrite("{\"success\":false}");		
	}
	
	public void doSave(){
		endUser.setPassword("e10adc3949ba59abbe56e057f20f883e");
		super.doSave();
	}
	public void getCurrentUser(){
		EndUser user=SecurityUserHolder.getCurrentUser();
		if(user!=null){
			toWrite(jsonBuilder.returnSuccessJson(jsonBuilder.toJson(user)));
		}else{
			toWrite(jsonBuilder.returnFailureJson("'没有得到登录用户'"));
		}
	}
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		String deptId=request.getParameter("foreignKey");
		Department dept=new Department();
		dept.setDeptId(deptId);
		endUser.setDepartment(dept);
		return endUser;
	}
}
