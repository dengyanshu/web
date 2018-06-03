package com.desktop.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.desktop.constant.NodeType;
import com.desktop.dao.PcDaoTemplate;
import com.desktop.model.extjs.JSONTreeNode;
import com.desktop.utils.EntityUtil;
import com.desktop.utils.JsonBuilder;
import com.desktop.utils.ModelUtil;
import com.desktop.utils.StringUtil;
@Component("pcServiceTemplate")
public class PcServiceTemplateImpl implements PcServiceTemplate {
	private PcDaoTemplate pcDaoTemplate;
	@Override
	public Object findById(Class<?> clazz, String id) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.findById(clazz, id);
	}

	@Override
	public List<?> findAll(Class<?> clazz) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.findAll(clazz);
	}

	@Override
	public Integer getCount(String hql) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.getCount(hql);
	}

	@Override
	public List<?> findByPage(Class<?> clazz, String whereSql, int from,
			int size) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.findByPage(clazz, whereSql, from, size);
	}

	@Override
	public Object save(Object entity) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.save(entity);
	}

	@Override
	public Object update(Object entity) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.update(entity);
	}

	@Override
	public void delete(Object entity) {
		// TODO Auto-generated method stub
		pcDaoTemplate.delete(entity);
	}

	@Override
	public void deleteBatchById(Class<?> clazz, String idName, String ids) {
		// TODO Auto-generated method stub
		List<?> models=pcDaoTemplate.queryByHql(" from "+clazz.getName()+" where "+idName+" in ("+ids+")");
		for(Object obj:models){
			pcDaoTemplate.delete(obj);
		}
	}
	@Override
	public Object getEntityByHql(String hql) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.getEntityByHql(hql);
	}

	@Override
	public Long executeSql(String sql) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.executeSql(sql);
	}

	@Override
	public List<?> queryByHql(String hql) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.queryByHql(hql);
	}

	@Override
	public List<?> queryBySql(String sql) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.queryBySql(sql);
	}

	@Override
	public List<?> queryBySql(String sql, Class<?> c) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.queryBySql(sql, c);
	}
	@Resource(name="pcDaoTemplate")
	public void setPcDaoTemplate(PcDaoTemplate pcDaoTemplate) {
		this.pcDaoTemplate = pcDaoTemplate;
	}

	@Override
	public List<?> queryByHql(String hql, Integer start, Integer limit) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.queryByHql(hql, start, limit);
	}

	@Override
	public Long executeHql(String hql) {
		// TODO Auto-generated method stub
		return pcDaoTemplate.executeHql(hql);
	}

	@Override
	public void executeBatchHql(String[] updateSqls) {
		// TODO Auto-generated method stub
		for(String sql:updateSqls){
			pcDaoTemplate.executeHql(sql);
		}
	}

	@Override
	public JSONTreeNode buildJSONTreeNode(List<JSONTreeNode> list, String rootId) {
		// TODO Auto-generated method stub
		JSONTreeNode root=new JSONTreeNode();
		for(JSONTreeNode node:list){
			if(!(StringUtil.isNotEmpty(node.getParent()) && !node.getId().equals(rootId))){
				root=node;
				list.remove(node);
				break;
			}
		}
		createTreeChildren(list, root);
		return root;
	}
	private void createTreeChildren(List<JSONTreeNode> childrens,JSONTreeNode root){
		String parentId=root.getId();
		for(int i=0;i<childrens.size();i++){
			JSONTreeNode node=childrens.get(i);
			if(StringUtil.isNotEmpty(node.getParent()) && node.getParent().equals(parentId)){
				root.getChildren().add(node);
				createTreeChildren(childrens, node);
			}
			if(i==childrens.size()-1){
				if(root.getChildren().size()<1){
					root.setLeaf(true);
				}
				return;
			}
		}
	}

	@Override
	public List<JSONTreeNode> getTreeList(String rootId, String tableName,
			String whereSql, JSONTreeNode template,Boolean expanded) {
		// TODO Auto-generated method stub
		List<JSONTreeNode> chilrens=new ArrayList<JSONTreeNode>();
		StringBuffer sql=new StringBuffer("select ");
		sql.append("t."+template.getId()+",");
		sql.append("t."+template.getText()+",");
		sql.append("t."+template.getCode()+",");
		sql.append("t."+template.getNodeType()+",");
		sql.append("t."+template.getNodeInfo()+",");
		sql.append("t."+template.getNodeInfoType()+",");
		sql.append("t."+template.getParent()+",");
		sql.append("t.orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(",t."+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(",t."+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(",t."+template.getBigIcon());
		}
		sql.append(" from "+tableName+" t where 1=1");
		if(StringUtil.isNotEmpty(whereSql)){
			sql.append(whereSql);
		}
		//sql.append(" start with t."+template.getId()+"='"+rootId+"' CONNECT BY t."+template.getParent()+"= PRIOR t."+template.getId()+" ");
		//sql.append(" order by t."+template.getParent()+",t.orderIndex");
		
System.out.println("第一个SQL语句:"+sql.toString());		
		List<?> alist=pcDaoTemplate.queryBySql(sql.toString());
		for(int i=0;i<alist.size();i++){
			Object[] obj=(Object[]) alist.get(i);
			JSONTreeNode node=new JSONTreeNode();
			node.setId((String)obj[0]);
			node.setText((String)obj[1]);
			node.setCode((String)obj[2]);
			if(NodeType.LEAF.equalsIgnoreCase((String)obj[3])){
				node.setLeaf(true);
			}else{
				node.setLeaf(false);
			}
			node.setNodeInfo((String)obj[4]);
			node.setNodeInfoType((String)obj[5]);
			node.setParent((String)obj[6]);
			if(StringUtil.isNotEmpty((obj[7])+"")){
				node.setOrderIndex(Integer.parseInt(obj[7]+""));
			}
			if(StringUtil.isNotEmpty(template.getIcon())){
				node.setIcon((String)obj[8]);
				if(StringUtil.isNotEmpty(template.getHref())){
					node.setDisabled(Boolean.parseBoolean(obj[9].toString()));
					if(StringUtil.isNotEmpty(template.getBigIcon())){
						node.setBigIcon((String)obj[10]);
					}
				}else if(StringUtil.isNotEmpty(template.getBigIcon())){
					node.setBigIcon((String)obj[9]);
				}
			}else{
				if(StringUtil.isNotEmpty(template.getIcon())){
					node.setDisabled(Boolean.parseBoolean(obj[8].toString()));
					if(StringUtil.isNotEmpty(template.getBigIcon())){
						node.setBigIcon((String)obj[9]);
					}
				}else if(StringUtil.isNotEmpty(template.getBigIcon())){
					node.setBigIcon((String)obj[8]);
				}
			}
			if(expanded!=null){
				node.setExpanded(expanded);
			}
			chilrens.add(node);			
		}
		
System.out.println("返回获取到的子数据："+chilrens);				
		return chilrens;

	}

	@Override
	public Object formUpdate(Object obj) {
		// TODO Auto-generated method stub
		String pkName=ModelUtil.getClassPkName(obj.getClass());
		String pkValue=(String) EntityUtil.getPropertyValue(obj, pkName);
		//查询当前更新的实体
		Object entity=pcDaoTemplate.findById(obj.getClass(), pkValue);
		entity=EntityUtil.copyNewField(entity, obj);	
		entity=pcDaoTemplate.update(entity);
		return entity;
	} 
	
}
