package com.desktop.rbac.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.desktop.constant.AuthorType;
import com.desktop.constant.PermType;
import com.desktop.constant.StringVeriable;
import com.desktop.constant.TreeVeriable;
import com.desktop.menu.model.Menu;
import com.desktop.model.extjs.JSONTreeNode;
import com.desktop.rbac.model.EndUser;
import com.desktop.rbac.model.Permission;
import com.desktop.rbac.model.Role;
import com.desktop.service.PcServiceTemplate;
import com.desktop.utils.ModelUtil;
import com.desktop.utils.StringUtil;
@Component("permissionService")
public class PermissionServiceImpl implements PermissionService {
	/**
	 * @param rooId
	 * @param roleId
	 * @param isSee
	 * @return
	 */
	private PcServiceTemplate pcServiceTemplate;
	@Override
	public List<JSONTreeNode> getPermTree(String roodId, String author,String authorType,Boolean isSee,Boolean expanded) {
		// TODO Auto-generated method stub
		JSONTreeNode template=ModelUtil.getJSONTreeNodeTemplate(Menu.class);
		//递归查询出集合<JSONTreeNode>
		List<JSONTreeNode> lists=pcServiceTemplate.getTreeList(roodId, "Menu", "", template,expanded);
		//得到当前角色的权限
		Map<String,Permission> maps=buildPermMap(author,authorType);
		if(maps==null){
			return null;
		}
		List<JSONTreeNode> removeLists=new ArrayList<JSONTreeNode>(); 
		for(JSONTreeNode node:lists){
			if(isSee){
				if(maps.get(node.getId())==null && !node.getId().equalsIgnoreCase(TreeVeriable.ROOT)){
					removeLists.add(node);
				}
			}else{
				if(maps.get(node.getId())==null){
					node.setChecked(false);
				}else{
					node.setChecked(true);
				}
			}
		}
		if(isSee){
			for(JSONTreeNode node:removeLists){
				lists.remove(node);
			}
		}
		return lists;
	}
	//构建权限map
	private Map<String,Permission> buildPermMap( String author,String authorType){
		Map<String,Permission> maps=new HashMap<String,Permission>();
		if(AuthorType.ROLE.equalsIgnoreCase(authorType)){
			Role role=(Role) pcServiceTemplate.findById(Role.class, author);
			if(role!=null){
				Set<Permission> perms=role.getPermissions();
				for(Permission perm:perms){
					maps.put(perm.getPerCode(), perm);
				}
			}
		}else{
			EndUser user=(EndUser) pcServiceTemplate.findById(EndUser.class, author);
			if(user!=null){
				//得到角色
				Set<Role> roles=user.getRoles();
				for(Role role:roles){
					//得到指定角色的权限
					Set<Permission> perms=role.getPermissions();
					for(Permission perm:perms){
						maps.put(perm.getPerCode(), perm);
					}
				}
			}			
		}
		return maps;
	}
	@Resource(name="pcServiceTemplate")
	public void setPcServiceTemplate(PcServiceTemplate pcServiceTemplate) {
		this.pcServiceTemplate = pcServiceTemplate;
	}
	@Override
	public void doUpdatePerm(String roleId, String addIds, String delIds) throws Exception {
		//通过角色ID找到该角色role
		Role role=(Role) pcServiceTemplate.findById(Role.class, roleId);
		if(role==null){
			throw new Exception("角色未找到");
		}
		//分解addIds成一个数组addIdsArray
		String[] addIdsArray=addIds.split(StringVeriable.STR_SPLIT);
		
		/**增加权限的操作*/
		for(String addId:addIdsArray){
			//如果addId为空,则退出
			if(StringUtil.isEmpty(addId)){
				continue;
			}
			Permission perm=(Permission) pcServiceTemplate.getEntityByHql(" from Permission where perCode='"+addId+"' and perType='"+PermType.TYPE_MENU+"'");
			//权限已经存在，直接建立关系
			if(perm!=null){
				String insertSql="insert into ROLE_PERM(roleId,perId) values('"+role.getRoleId()+"','"+perm.getPerId()+"')";
				pcServiceTemplate.executeSql(insertSql);
			}else{
				//如果权限不存在，则在权限中插入新的记录
				perm=new Permission();
				perm.setPerCode(addId);				//设置权限代码为addId
				perm.setPerType(PermType.TYPE_MENU);//设置权限类型为MENU
				Set<Role> roles=new HashSet<Role>();
				role.getPermissions().add(perm);
				roles.add(role);
				perm.setRoles(roles);
				pcServiceTemplate.save(perm);				
			}
		}
		/**删除权限的操作*/
		String[] delIdsArray=delIds.split(StringVeriable.STR_SPLIT);
		for(String delId:delIdsArray){
			if(StringUtil.isEmpty(delId)){
				continue;
			}
			Permission perm=(Permission) pcServiceTemplate.getEntityByHql(" from Permission where perCode='"+delId+"' and perType='"+PermType.TYPE_MENU+"'");
			if(perm!=null){
				//解除关系
				String delSql="delete ROLE_PERM where perId='"+perm.getPerId()+"' and roleId='"+role.getRoleId()+"'";
				pcServiceTemplate.executeSql(delSql);
			}
		}
	}
	
}
