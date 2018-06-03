package com.data.kanban.auto;

import java.util.TimerTask;



public class ClockExecuteTask extends TimerTask {
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		SendMoStatusErr sendMoStatusErr = new SendMoStatusErr()  ;
		sendMoStatusErr.sendTips(); 		
	}
	
}
