package com.desktop.rbac.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.constant.AuthorType;
import com.desktop.constant.TreeVeriable;
import com.desktop.model.extjs.JSONTreeNode;
import com.desktop.rbac.model.EndUser;
import com.desktop.rbac.model.Permission;
import com.desktop.rbac.service.PermissionService;
import com.desktop.security.SecurityUserHolder;
import com.desktop.utils.StringUtil;
@Component("permAction")
@Scope("prototype")
public class PermAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4279080516723515643L;
	private Permission permission=new Permission();
	private String roleId;
	private PermissionService permissionService;
	private Boolean isSee;
	private String addIds;
	private String delIds;
	/**
	 * 得到授权树形
	 */
	public void getPermTree(){
		if(StringUtil.isEmpty(roleId)){
			toWrite(jsonBuilder.returnFailureJson("'传入角色失败'"));
			return;
		}
		if(StringUtil.isEmpty(node) || TreeVeriable.ROOT.equalsIgnoreCase(node)){
			node=TreeVeriable.ROOT;
		}
		if(StringUtil.isNotEmpty(nodeId)){
			node=nodeId;
		}
		if(isSee==null){
			isSee=false;
		}
		//得到当前的树形
		List<JSONTreeNode> lists=permissionService.getPermTree(node, roleId,AuthorType.ROLE, isSee,expanded);
		JSONTreeNode root=pcServiceTemplate.buildJSONTreeNode(lists, node);
		if(node.equalsIgnoreCase(TreeVeriable.ROOT)){
			strData=jsonBuilder.buildList(root.getChildren(), excludes);
		}else{
			List<JSONTreeNode> alist=new ArrayList<JSONTreeNode>();
			alist.add(root);
			strData=jsonBuilder.buildList(alist, excludes);	
		}
		toWrite(strData);
	}
	/**
	 * 修改权限
	 */
	public void updatePerm(){
		try{
			permissionService.doUpdatePerm(roleId, addIds, delIds);
			toWrite(jsonBuilder.returnSuccessJson("'授权成功！'"));
		}catch(Exception e){
			toWrite(jsonBuilder.returnFailureJson("'授权出错,错误信息："+e.getMessage()+"'"));
		}
	}
	/**
	 * 得到登录用户的权限树
	 */
	public void getAuthorMenuTree(){
		if(StringUtil.isEmpty(node) || TreeVeriable.ROOT.equalsIgnoreCase(node)){
			node=TreeVeriable.ROOT;
		}
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		List<JSONTreeNode> lists=permissionService.getPermTree(node, currentUser.getUserId(),AuthorType.USER, true,false);
System.out.println("构建树形对象:pcServiceTemplate.buildJSONTreeNode");		
		JSONTreeNode root=pcServiceTemplate.buildJSONTreeNode(lists, node);
System.out.println("把获取到的JSONTreeNode解析为json字符串");				
		strData=jsonBuilder.buildList(root.getChildren(), excludes);
System.out.println("json字符串为："+strData);					
		toWrite(strData);
	}
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return permission;
	}
	@Resource(name="permissionService")
	public void setPermissionService(PermissionService permissionService) {
		this.permissionService = permissionService;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public Boolean getIsSee() {
		return isSee;
	}
	public void setIsSee(Boolean isSee) {
		this.isSee = isSee;
	}
	public String getAddIds() {
		return addIds;
	}
	public void setAddIds(String addIds) {
		this.addIds = addIds;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
}
