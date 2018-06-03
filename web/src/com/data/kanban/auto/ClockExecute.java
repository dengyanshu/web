package com.data.kanban.auto;

import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ClockExecute implements ServletContextListener{
	private Timer timer = null;
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {		
		// TODO Auto-generated method stub
		timer.cancel();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		Calendar calendar = Calendar.getInstance();
		int year =calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		
		calendar.set(year, month,day,0,9,00);
		Date date = calendar.getTime();
		timer = new Timer(true);
		System.out.println(date);
		int period = 11*60*1000;
		timer.schedule(new ClockExecuteTask(),date,period);		
	}
}
