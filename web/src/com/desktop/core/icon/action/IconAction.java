package com.desktop.core.icon.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.core.icon.model.SysIcon;
import com.desktop.core.icon.service.IconService;
@Component("iconAction")
@Scope("prototype")
public class IconAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2661195139084497987L;
	private SysIcon sysIcon=new SysIcon();
	private IconService iconService;
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return sysIcon;
	}
	public void doSave(){
		super.doSave();
		iconService.syncIconCss();
	}
	public void doRemove(){
		super.doRemove();
		iconService.syncIconCss();
	}
	public void doUpdate(){
		super.doUpdate();
		iconService.syncIconCss();
	}
	@Resource(name="iconService")
	public void setIconService(IconService iconService) {
		this.iconService = iconService;
	}

}
