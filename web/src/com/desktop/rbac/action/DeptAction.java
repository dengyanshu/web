package com.desktop.rbac.action;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.constant.NodeType;
import com.desktop.model.BaseEntity;
import com.desktop.rbac.model.Department;
import com.desktop.utils.StringUtil;
/**
 * 部门Action
 * @author 陈永化
 *
 */
@Component("deptAction")
@Scope("prototype")
public class DeptAction extends BaseAction {
	private static Logger logger=Logger.getLogger(DeptAction.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = -7000507770386894691L;
	private Department department=new Department();
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		String parentId=request.getParameter("parentId");
		if(StringUtil.isEmpty(parentId)){
			parentId=NodeType.ROOT;
		}
		Department parent=new Department();
		parent.setDeptId(parentId);
		department.setParent(parent);
		return department;
	}
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
			Department dept=(Department) entity;
			Department parent=(Department) pcServiceTemplate.findById(Department.class, dept.getParent().getDeptId());
			if(!parent.getDeptId().equals(NodeType.ROOT)){
				parent.setNodeType(NodeType.GENERAL);
				pcServiceTemplate.update(parent);
			}
			toWrite(jsonBuilder.returnSuccessJson(jsonBuilder.toJson(entity)));
		}catch(Exception e){
			logger.error("保存方法出错，错误信息"+e.getMessage());
			toWrite(jsonBuilder.returnFailureJson("'保存方法出错，错误信息"+e.getMessage()+"'"));
		}
	}
}
