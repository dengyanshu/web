package com.desktop.menu.action;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.constant.NodeType;
import com.desktop.menu.model.Menu;
import com.desktop.model.BaseEntity;
import com.desktop.utils.StringUtil;
@Component("menuAction")
@Scope("prototype")
public class MenuAction extends BaseAction {
	private static Logger logger=Logger.getLogger(MenuAction.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = 1068248932464085946L;
	private Menu menu=new Menu();
	public void doSave(){
		Object entity=getModel();
		try{
			if(entity instanceof BaseEntity){
				buildModelCreateInfo((BaseEntity)entity);
			}else{
				logger.error("实体信息获取错误");
				toWrite(jsonBuilder.returnFailureJson("'传入的实体信息错误'"));
				return;
			}
			//构建创建信息
			
			//保存实体
			entity=pcServiceTemplate.save(entity);
			Menu m=(Menu) entity;
			Menu parent=(Menu) pcServiceTemplate.findById(Menu.class, m.getParent().getMenuId());
			if(!parent.getMenuId().equals(NodeType.ROOT)){
				parent.setNodeType(NodeType.GENERAL);
				pcServiceTemplate.update(parent);
			}
			toWrite(jsonBuilder.returnSuccessJson(jsonBuilder.toJson(entity)));
		}catch(Exception e){
			logger.error("保存方法出错，错误信息"+e.getMessage());
			toWrite(jsonBuilder.returnFailureJson("'保存方法出错，错误信息"+e.getMessage()+"'"));
		}
	}
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		String parentId=request.getParameter("parentId");
		if(StringUtil.isEmpty(parentId)){
			parentId=NodeType.ROOT;
		}
		Menu parent=new Menu();
		parent.setMenuId(parentId);
		menu.setParent(parent);
		return menu;
	}
}
