package com.desktop.action;

import javax.servlet.http.Cookie;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.desktop.rbac.model.EndUser;
import com.desktop.security.SecurityUserHolder;
@Component("index")
@Scope("prototype")
public class AppAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8190489607865633517L;

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		EndUser currentUser=SecurityUserHolder.getCurrentUser();
		if(currentUser!=null){
			 Cookie userCodeCookie = new Cookie("loginUserCode", currentUser.getUserCode()); 
	         userCodeCookie.setMaxAge(Integer.MAX_VALUE);
	         userCodeCookie.setPath("/");
	         response.addCookie(userCodeCookie);
		}
		return SUCCESS;
	}

	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
