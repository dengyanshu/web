package com.desktop.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.desktop.action.BaseAction;

/**
 * 系统初始化监听器
 * @author 陈永化
 *
 */
public class PcContextLintener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent sc) {
		// TODO Auto-generated method stub
		BaseAction.webrootAbsPath=sc.getServletContext().getRealPath("/");
		BaseAction.absClassPath=PcContextLintener.class.getResource("/").getPath().substring(1);
		
	}

}
