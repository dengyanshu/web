package com.desktop.action;

import java.lang.reflect.Field;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.utils.EntityUtil; 
import com.desktop.utils.ModelUtil;	
import com.desktop.utils.StringUtil;
/**
 * 模型类
 * @author 陈永化
 *
 */
@Component("modelAction")
@Scope("prototype")
public class ModelAction extends BaseAction {

	private static final long serialVersionUID = 2620877474695177774L;

	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return null;
	}
	public void getModelFields(){
		//如果模型集中存在该模型则执行
		if(!StringUtil.isNotEmpty(ModelUtil.modelJson.get(modelName))){
			//得到该模型对应的类
			Class<?> c=EntityUtil.getClassByName(modelName);
			//得到该类的所有字段
			Field[] fields=ModelUtil.getClassFields(c, false);
			strData=jsonBuilder.getModelFileds(modelName, fields, excludes);
		}else{
			strData=ModelUtil.modelJson.get(modelName);
		}
		toWrite(strData);
	}

}
