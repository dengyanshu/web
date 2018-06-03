package com.desktop.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.desktop.constant.TreeNodeType;

/**
 * 描述树形实体字段的注解
 * @author 陈永化
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)  
public @interface NodeType {
	public TreeNodeType type(); //树形字段类型
}
