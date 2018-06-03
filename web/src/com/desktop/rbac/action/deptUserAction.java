package com.desktop.rbac.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.rbac.model.view.VDeptUser;
@Component("deptUserAction")
@Scope("prototype")
public class deptUserAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1404112623143565475L;
	private VDeptUser vdeptUser=new VDeptUser();
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return vdeptUser;
	}

}
