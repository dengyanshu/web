package com.desktop.rbac.service;

import java.util.List;

import com.desktop.model.extjs.JSONTreeNode;

public interface PermissionService {
	/**
	 * 得到权限树形
	 * @param rooId
	 * @param roleId
	 * @param isSee
	 * @return
	 */
	public List<JSONTreeNode> getPermTree(String roodId,String author,String authorType,Boolean isSee,Boolean expanded);
	/**
	 * 更新权限
	 * @param roleId
	 * @param addIds
	 * @param delIds
	 */
	public void doUpdatePerm(String roleId,String addIds,String delIds) throws Exception ;
}
