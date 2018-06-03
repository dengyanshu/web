package com.desktop.core.dd.action;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.core.dd.model.Dictionary;
import com.desktop.core.dd.model.DictionaryItem;
import com.desktop.core.dd.service.DDCache;
import com.desktop.utils.StringUtil;
@Component("ddAction")
@Scope("prototype")
public class DDAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3754444737375829147L;
	private Dictionary dictionary=new Dictionary();
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return dictionary;
	}
	/**
	 * 
	 */
	@SuppressWarnings("unchecked")
	public void getDDItemByDDCode(){
		if(StringUtil.isNotEmpty(dictionary.getDdCode())){
			if(DDCache.get(dictionary.getDdCode())!=null){
				toWrite(DDCache.get(dictionary.getDdCode()));
			}else{
				//查询数据字典项
				Dictionary dict=(Dictionary) pcServiceTemplate.getEntityByHql(" from Dictionary where ddCode='"+dictionary.getDdCode()+"'");
				//List<DictionaryItem> items=(List<DictionaryItem>) pcServiceTemplate.queryByHql(" from DictionaryItem where dictionary='"+dict.getDdId()+"' order by orderIndex");
				List<DictionaryItem> items=(List<DictionaryItem>) pcServiceTemplate.queryByHql(" from DictionaryItem where DDId='"+dict.getDdId()+"'");
				strData=jsonBuilder.buildObjListToJson(new Long(items.size()), items, false);
				DDCache.push(dictionary.getDdCode(), strData);
				toWrite(strData);
			}
		}else{
			toWrite("[]");
		}
	}
	public void clearAll(){		
		DDCache.clearAll();
		toWrite(jsonBuilder.returnSuccessJson("'缓存已清理'"));
	}
}
