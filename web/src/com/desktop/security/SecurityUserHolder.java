package com.desktop.security;

import org.springframework.security.context.SecurityContextHolder;

import com.desktop.rbac.model.Department;
import com.desktop.rbac.model.EndUser;

public class SecurityUserHolder {
	public static EndUser getCurrentUser(){
		Object o = SecurityContextHolder.getContext().getAuthentication();
        if(null != o) {
            EndUser user = (EndUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return user;
        } else {
            EndUser u = new EndUser();
            u.setUsername("GUEST");
            return u;
        }

	}
	public static Department getCurrentDept(){
		Object o = SecurityContextHolder.getContext().getAuthentication();
        if(null != o) {
            EndUser user = (EndUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return user.getDepartment();
        } else {
        	Department d=new Department();
            return d;
        }
	}
}
