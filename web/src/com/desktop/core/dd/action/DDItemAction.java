package com.desktop.core.dd.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.core.dd.model.Dictionary;
import com.desktop.core.dd.model.DictionaryItem;
import com.desktop.utils.StringUtil;

@Component("ddItemAction")
@Scope("prototype")
public class DDItemAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122016368318960397L;
	private DictionaryItem dictionaryItem=new DictionaryItem();
	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		if(StringUtil.isNotEmpty(foreignKey)){
			Dictionary dictionary=new Dictionary();
			dictionary.setDdId(foreignKey);
			dictionaryItem.setDictionary(dictionary);
		}
		return dictionaryItem;
	}

}
