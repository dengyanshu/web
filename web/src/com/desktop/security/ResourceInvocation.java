package com.desktop.security;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.ConfigAttributeDefinition;
import org.springframework.security.ConfigAttributeEditor;
import org.springframework.security.intercept.web.FilterInvocation;
import org.springframework.security.intercept.web.FilterInvocationDefinitionSource;
import org.springframework.security.util.AntUrlPathMatcher;
import org.springframework.security.util.RegexUrlPathMatcher;
import org.springframework.security.util.UrlMatcher;

import com.desktop.rbac.model.EndUser;

/**
 * url权限过滤
 * @author 陈永化
 *
 */
public class ResourceInvocation implements FilterInvocationDefinitionSource,InitializingBean { 
	//URL适配器
	private UrlMatcher urlMatcher;
	//用户权限地址
	private boolean useAntPath = true;
	//小写比较
	private boolean lowercaseComparisons = true;
	 @SuppressWarnings("unused")
	private String paramFlag = "?";

	public void setUseAntPath(boolean useAntPath) {
	     this.useAntPath = useAntPath;
	}
	    
    public void setLowercaseComparisons(boolean lowercaseComparisons) {
	        this.lowercaseComparisons = lowercaseComparisons;
	}
	@Override
	public ConfigAttributeDefinition getAttributes(Object filter)
			throws IllegalArgumentException {
		//得到通用的用户信息
		EndUser user=SecurityUserHolder.getCurrentUser();
		String username=user.getUsername();
		//如果该用户的username不等于GUEST则不过滤，反之则过滤
		if(!"GUEST".equals(username)){
			return null;
		}
		ConfigAttributeEditor caEditor = new ConfigAttributeEditor();
        caEditor.setAsText("grantedAuthorities");
        
        /*********************************URL权限过滤END******************************************/        
        return (ConfigAttributeDefinition)caEditor.getValue();
	}

	@Override
	public Collection getConfigAttributeDefinitions() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean supports(Class arg0) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub
		this.urlMatcher = new RegexUrlPathMatcher();	
        if (useAntPath) {
            this.urlMatcher = new AntUrlPathMatcher();
        }
        if ("true".equals(lowercaseComparisons)) {
            if (!this.useAntPath) {
                ((RegexUrlPathMatcher) this.urlMatcher).setRequiresLowerCaseUrl(true);
            }
        } else if ("false".equals(lowercaseComparisons)) {
            if (this.useAntPath) {
                ((AntUrlPathMatcher) this.urlMatcher).setRequiresLowerCaseUrl(false);
            }
        }

	}
}
