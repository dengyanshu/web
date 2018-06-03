package com.desktop.constant;
/**
 * 树形字段类型枚举
 * @author 陈永化
 *
 */
public enum TreeNodeType {
	   ID,
       TEXT, 
       CODE, 
       CLS,
       HREF,
       HREFTARGET,  
       EXPANDABLE,
       EXPANDED,
       DESCRIPTION, 
       ICON,
       CHECKED,   
       PARENT,
       LEAF,
       NODEINFO,    
       NODEINFOTYPE, 
       ORDERINDEX,
       LAYER,
       BIGICON,
       DISABLED;
	   public Boolean equalsType(TreeNodeType other){
		   int i=this.compareTo(other);
		   if(i!=0){
			   return false;
		   }
		   return true;
	   }
}
