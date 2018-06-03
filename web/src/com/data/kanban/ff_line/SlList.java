package com.data.kanban.ff_line;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.data.connectsql.New25_Report_Database;
import com.data.connectsql.OfficialDatabase;
import com.data.mes.action.Action;
import com.desktop.constant.StringVeriable;

@Component("ff_sl_list")
@Scope("prototype")
@SuppressWarnings("serial")
public class SlList extends Action{
	public void getResult(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call DIP_board_new(?,?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("Workcenterid"));
			//getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().execute(); 
			setRs(getCs().getResultSet());
			//String StrData=jsonBuilder.build2Set(getRs());
			String AllData=jsonBuilder.build2Set(getRs());
			String StrData=AllData.split("&separate&")[0];
			String isAlertSum=AllData.split("&separate&")[1];
			
			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",data:"+StrData+",isAlertSum:"+isAlertSum+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}	
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}	
	}
    
	/**
	 * 工单产能看板
	 * 
	 * **/
	public void getResult4(){
		//setConn(new OfficialDatabase().getConn());
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call DIP_Board_Bridgeward(?,?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("Workcenterid"));
			//getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().execute(); 
			setRs(getCs().getResultSet());
			//String StrData=jsonBuilder.build2Set(getRs());
			String AllData=jsonBuilder.build2Set(getRs());
			String StrData=AllData.split("&separate&")[0];
			String isAlertSum=AllData.split("&separate&")[1];
			
			if(StrData.length()>2){
				toWrite("{success:true,returnMes:\"\",data:"+StrData+",isAlertSum:"+isAlertSum+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}	
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}	
	}
    
	
	
	/***
	 * 4F车间看板action
	 * */
	public void getResult2() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Report_DIP_WorkShopForWeb(?)}"));
			getCs().setString("MOName", request.getParameter("moname"));
			System.out.println( request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/***
	 * 4F工单看板action
	 * */
	public void getResult3() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call DIP_Board_Monitor()}"));
			//getCs().setString("MOName", request.getParameter("moname"));
			//System.out.println( request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * test line update
	 * **/
	public void getResult5() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_PerformanceMonitor(?)}"));
			getCs().setString("serverName", request.getParameter("serverName"));
			//System.out.println(request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			ResultSet rs=getRs();
			String StrData = jsonBuilder.buildSet(rs);
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
			   ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	/**
	 * test line update
	 * **/
	public void getResult6() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call get_server_listview()}"));
			//getCs().setString("serverName", request.getParameter("serverName"));
			//System.out.println(request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			ResultSet rs=getRs();
			String StrData = jsonBuilder.buildSet(rs);
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
			   ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	
	/**
	 * 三星自动化
	 * **/
	public void getResult7() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_AutoLine()}"));
			//getCs().setString("serverName", request.getParameter("serverName"));
			//System.out.println(request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			ResultSet rs=getRs();
			String StrData = jsonBuilder.buildSet(rs);
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
			   ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
   
	
	
	/**
	 * dacang pmc
	 * **/
	public void getResult8() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call PMCKanBan_Report_4d()}"));
			//getCs().setString("serverName", request.getParameter("serverName"));
			//System.out.println(request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			ResultSet rs=getRs();
			String StrData = jsonBuilder.buildSet(rs);
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
			   ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * dacang mo
	 * **/
	public void getResult9() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call DCMoName_KanBan_Report()}"));
			//getCs().setString("serverName", request.getParameter("serverName"));
			//System.out.println(request.getParameter("moname"));
			getCs().execute();
			setRs(getCs().getResultSet());
			ResultSet rs=getRs();
			String StrData = jsonBuilder.buildSet(rs);
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
			   ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	/***
	 * 大仓看板第3层
	 * */
	public void getResult10() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call DCMaterialPlan_KanBan_Report(?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	//获取第2层
	public void getResult11(){
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call pmc_second_4d(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"));
			getCs().setString("I_Sender", "");
			getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
			getCs().registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
			getCs().setString("I_LanguageId", "1");
			getCs().setString("I_PlugInCommand", "");
			getCs().setString("I_OrBitUserId", "");
			getCs().setString("I_OrBitUserName", "");
			getCs().setString("I_ResourceId", "");
			getCs().setString("I_ResourceName", "");
			getCs().setString("I_PKId", "");
			getCs().setString("I_ParentPKId", "");
			getCs().setString("I_Parameter", "");
			getCs().setString("QMOName", request.getParameter("mo"));
			getCs().setString("WorkcenterId", request.getParameter("WorkcenterId"));
			getCs().setInt("PageRowCount", Integer.valueOf(request.getParameter("limit")));
			getCs().setInt("PageIndex", Integer.valueOf(request.getParameter("page")));
			getCs().registerOutParameter("DataCount", Types.INTEGER);
			getCs().execute(); 
			setRs(getCs().getResultSet());
			String StrData=jsonBuilder.buildSet(getRs());

			if(StrData.length()>2){
				toWrite("{success:true,total:"+getCs().getInt("DataCount")+",data:"+StrData+"}");
			}else{
				toWrite("{success:false,"+StringVeriable.returnMsg+"}");
			}	
		} catch (SQLException e) {
			toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
		}finally{
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}	
	}
	
	
	
	
	/***
	 * 大仓PMC  SECOND
	 * */
	public void getResult12() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call DCMaterialFirstPlan_KanBan_Report(?)}"));
			getCs().setString("MOName", request.getParameter("mo"));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	
	/***
	 * 自动化line
	 * */
	public void getResult13() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_ASB_GetQuery_Simple()}"));
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	/***
	 * 自动化line
	 * */
	public void getResult14() {
		setConn(new New25_Report_Database().getConn());
		try {
			setCs(getConn().prepareCall("{call Txn_Board_GetQuery_DayItem(?,?,?,?,?)}"));
			getCs().setString("chaxunrq", request.getParameter("chaxunrq"));
			getCs().setString("chaxunrq2", request.getParameter("chaxunrq2"));
			getCs().setString("time1", request.getParameter("time1"));
			getCs().setString("time2", request.getParameter("time2"));
			getCs().setString("line", request.getParameter("line"));
		
			getCs().execute();
			setRs(getCs().getResultSet());
			String StrData = jsonBuilder.buildSet(getRs());
			if (StrData.length() > 2) {
				toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
			} else {
				toWrite("{success:false," + StringVeriable.returnMsg + "}");
			}
		} catch (SQLException e) {
			toWrite(("{{success:false," + StringVeriable.exceptionMsg + e
					.getMessage()));
		} finally {
			try {
				ColseCS();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	
	//获取钢网信息
		public void getResult15(){
			setConn(new New25_Report_Database().getConn());
			try {
				setCs(getConn().prepareCall("{call Txn_smt_steelmesh_4d(?,?,?,?,?,?,?,?,?,?,?,?)}"));
				getCs().setString("I_Sender", "");
				getCs().registerOutParameter("I_ReturnMessage", Types.VARCHAR);
				getCs().registerOutParameter("I_ExceptionFieldName", Types.VARCHAR);
				getCs().setString("I_LanguageId", "1");
				getCs().setString("I_PlugInCommand", "");
				getCs().setString("I_OrBitUserId", "");
				getCs().setString("I_OrBitUserName", "");
				getCs().setString("I_ResourceId", "");
				getCs().setString("I_ResourceName", "");
				getCs().setString("I_PKId", "");
				getCs().setString("I_ParentPKId", "");
				getCs().setString("I_Parameter", "");
				
				getCs().execute(); 
				setRs(getCs().getResultSet());
				String StrData=jsonBuilder.buildSet(getRs());

				if (StrData.length() > 2) {
					toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
				} else {
					toWrite("{success:false," + StringVeriable.returnMsg + "}");
				}
			} catch (SQLException e) {
				toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
			}finally{
				try {
					ColseCS();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}	
		}
		
	  
		
		//小米直通率线体获取
				public void getResult17(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call XaomiWorkcenterName_ViewList()}"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
	
				//小米直通率
				public void getResult16(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call Query_XiaoMiFirstPassYieldkanban(?)}"));
						getCs().setString("WorkcenterName", request.getParameter("line"));
						
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				
				//小米OBA
				public void getResult18(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call TXN_OBARportQuerykanban()}"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
	        
				
				
				
				
				//小米smt 品质直通率
				public void getResult19(){
					setConn(new New25_Report_Database().getConn());
					try {
						

						setCs(getConn().prepareCall("{call FurnaceRear_FPY_ForWeb(?,?,?,?,?,?)}"));
						getCs().setString("BeginTime", request.getParameter("chaxunrq")+" "+request.getParameter("time1")+":00");
						getCs().setString("EndTime", request.getParameter("chaxunrq2")+" "+request.getParameter("time2")+":00");
						getCs().setString("WorkCenterName", request.getParameter("line"));
						getCs().setString("ResourceName", "");
						getCs().setString("mesage", "");		
						getCs().setString("ischa", "FPY");
						//chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,time1:time1,time2:time2
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());
						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
		
				
				//小米smt 品质  不良top5
				public void getResult20(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call FurnaceRear_FPY_ForWeb(?,?,?,?,?,?)}"));
						getCs().setString("BeginTime", request.getParameter("chaxunrq")+" "+request.getParameter("time1"));
						getCs().setString("EndTime", request.getParameter("chaxunrq2")+" "+request.getParameter("time2"));
						getCs().setString("WorkCenterName", request.getParameter("line"));
						getCs().setString("ResourceName", "");
						getCs().setString("mesage", "");		
						getCs().setString("ischa", "TOP5");
						//chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,time1:time1,time2:time2
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				

				//贴片机 设备看板 获取2楼所有线体
				public void getResult21(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call [secondFloor_4d]()}"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				
				//贴片机 设备看板 生产枚数获取
				public void getResult22_1(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call [Xiaomi_Machine_ForWeb](?,?)}"));
						getCs().setString("Type", "2");
						getCs().setString("SelectPara", request.getParameter("line"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				//贴片机 设备看板 生产枚数运转率
				public void getResult22_2(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call [Xiaomi_Machine_ForWeb](?,?)}"));
						getCs().setString("Type", "3");
						getCs().setString("SelectPara", request.getParameter("line"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				//贴片机 设备看板 生产枚数损坏率
				public void getResult22_3(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call [Xiaomi_Machine_ForWeb](?,?)}"));
						getCs().setString("Type", "1");
						getCs().setString("SelectPara", request.getParameter("line"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				//贴片机 设备看板 生产枚数运转率
				public void getResult22_4(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call [Xiaomi_Machine_ForWeb](?,?)}"));
						getCs().setString("Type", "4");
						getCs().setString("SelectPara", request.getParameter("line"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				//松岗小米自动化线 产能看板
				public void getResult23(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call Txn_Board_GetQueryXM_DayItem(?,?,?,?,?)}"));
						getCs().setString("chaxunrq", request.getParameter("chaxunrq"));
						getCs().setString("chaxunrq2", request.getParameter("chaxunrq2"));
						getCs().setString("time1", request.getParameter("time1"));
						getCs().setString("time2", request.getParameter("time2"));
						getCs().setString("line", request.getParameter("line"));
					
						//chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,time1:time1,time2:time2
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
            
				
				
				//获取小米生产看板第一层所有线体
				public void getResult24(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call [xmline_4d]()}"));
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				

				//小米生产看板中图
				public void getResult25(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call Txn_MIUIProductionKanbanCenter_DoMethod(?)}"));
						getCs().setString("line", request.getParameter("line"));
						
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				
				//小米生产看板上图
				public void getResult26(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call Txn_MIUIProductionKanbanHead_DoMethod(?)}"));
						getCs().setString("line", request.getParameter("line"));
						
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
				
				
				
				//小米生产看板下图
				public void getResult27(){
					setConn(new New25_Report_Database().getConn());
					try {
						setCs(getConn().prepareCall("{call Txn_MIUIProductionKanbanDown_DoMethod(?)}"));
						getCs().setString("line", request.getParameter("line"));
						
						getCs().execute(); 
						setRs(getCs().getResultSet());
						String StrData=jsonBuilder.buildSet(getRs());

						if (StrData.length() > 2) {
							toWrite("{success:true,returnMes:\"\",data:" + StrData + "}");
						} else {
							toWrite("{success:false," + StringVeriable.returnMsg + "}");
						}
					} catch (SQLException e) {
						toWrite(("{{success:false,"+StringVeriable.exceptionMsg+e.getMessage()));
					}finally{
						try {
							ColseCS();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}	
				}
}