var tj_ck_runner = new Ext.util.TaskRunner();
var mainTime=60000;
var listTime=8000;

/* 总表线程任务 */
var tj_ck_today_dip_bl_task=null;
var tj_ck_today_smt_bl_task=null;
var tj_ck_tomorrow_dip_bl_task=null;
var tj_ck_tomorrow_smt_bl_task=null;

/* 总表默认页面 */
var tj_ck_today_dip_bl_p=1;
var tj_ck_today_smt_bl_p=1;
var tj_ck_tomorrow_dip_bl_p=1;
var tj_ck_tomorrow_smt_bl_p=1;

/* 子表线程任务及配置 */
var tj_ck_bl_list_task = null;
var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");
var pageSum=1;		//默认的页数
var isAlertSum=0;	//是否有警戒值
var tj_ck_list_p;		//项目清单页面

Ext.define("core.tj_ck_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		ClockAction:'core.util.model.ClockAction',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		KanBanItemListUtil:'core.util.model.KanBanItemListUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'tj_ck_kb_navigation' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var name = record.raw.name;
					var text = record.get("text");
					var id = record.get("id");
					var tab = tabpanel.getComponent(id);	
					if (!tab) {
						var t = tabpanel.add({
							title : text,id : id,
							closable : true,layout : 'border',
							closeAction : 'hide',
							items : [{xtype : name,region : 'center'}]
						});
						tabpanel.setActiveTab(t);
			/*********************************************************************************************************
			 								< 判断点击的项目并启动对应的任务 >
			 ********************************************************************************************************/ 						
						if(name=="tj_ck_today_dip_bl_kb"){
							tj_ck_today_dip_bl_task={
								run:function(){
									var tj_ck_today_dip_bl_total=self.updateClock("tj_ck","today_bl.dip",tj_ck_today_dip_bl_p,mainPageItems);
									if(tj_ck_today_dip_bl_total!=0){
										if(tj_ck_today_dip_bl_p>=(tj_ck_today_dip_bl_total/mainPageItems)){
											tj_ck_today_dip_bl_p=1;
										}else{
											tj_ck_today_dip_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							tj_ck_runner.start(tj_ck_today_dip_bl_task);
						}else if(name=="tj_ck_today_smt_bl_kb"){
							tj_ck_today_smt_bl_task={
								run:function(){
									var tj_ck_today_dip_smt_total=self.updateClock("tj_ck","today_bl.smt",tj_ck_today_smt_bl_p,mainPageItems);
									if(tj_ck_today_dip_smt_total!=0){
										if(tj_ck_today_smt_bl_p>=(tj_ck_today_dip_smt_total/mainPageItems)){
											tj_ck_today_smt_bl_p=1;
										}else{
											tj_ck_today_smt_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							tj_ck_runner.start(tj_ck_today_smt_bl_task);
						}else if(name=="tj_ck_tomorrow_dip_bl_kb"){
							tj_ck_tomorrow_dip_bl_task={
								run:function(){
									var tj_ck_tomorrow_dip_dip_total=self.updateClock("tj_ck","tomorrow_bl.dip",tj_ck_tomorrow_dip_bl_p,mainPageItems);
									if(tj_ck_tomorrow_dip_dip_total!=0){
										if(tj_ck_tomorrow_dip_bl_p>=(tj_ck_tomorrow_dip_dip_total/mainPageItems)){
											tj_ck_tomorrow_dip_bl_p=1;
										}else{
											tj_ck_tomorrow_dip_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(tj_ck_tomorrow_dip_bl_task);							
						}else if(name=="tj_ck_tomorrow_smt_bl_kb"){
							tj_ck_tomorrow_smt_bl_task={
								run:function(){
									var tj_ck_tomorrow_dip_smt_total=self.updateClock("tj_ck","tomorrow_bl.smt",tj_ck_tomorrow_smt_bl_p,mainPageItems);
									if(tj_ck_tomorrow_dip_smt_total!=0){
										if(tj_ck_tomorrow_smt_bl_p>=(tj_ck_tomorrow_dip_smt_total/mainPageItems)){
											tj_ck_tomorrow_smt_bl_p=1;
										}else{
											tj_ck_tomorrow_smt_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(tj_ck_tomorrow_smt_bl_task);							
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},
			
			
			
			
			/*********************************************************************************************************
			 								< 天津仓库今天DIP备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=tj_ck_today_dip_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.today_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_ck_today_dip_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_ck_runner.stop(tj_ck_today_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_ck_runner.start(tj_ck_today_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="tj_ck_today_dip_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.today_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面触发分页按钮
			'panel[xtype=tj_ck_today_dip_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_today_dip_bl_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_today_dip_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_today_dip_bl_kb]':{
				itemclick:function(e,eOpts){
					tj_ck_runner.stop(tj_ck_today_dip_bl_task);						//点击停止总表翻页
					var mo=eOpts.data.MOName;									//得到点击的工单号	
					tj_ck_list_p=1;												//给列表清单赋值
					var win=Ext.create("core.tj_ck_kanban.view.item.TodayDipBlList",{ //建立一个清单窗口
						title:'天津仓库今日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/tj_ck_bl_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						isAlertSum=result.isAlertSum;
						if(result.isAlertSum=="0"){
							pageSum=Math.ceil(result.data.length/pageItems);		//总条数/每页显示的记录数得到记录总页数
						}else{
							var sum=result.isAlertSum;
							pageSum=Math.ceil(sum/pageItems);						
						}
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					//列表清单任务
					tj_ck_bl_list_task={
						run:function(){
							if(tj_ck_list_p<=pageSum){
								store.loadPage(tj_ck_list_p);
								tj_ck_list_p++;
							}else{
								tj_ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/tj_next_mo!getResult.action','/web/kanban/tj_ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate",'天津仓库今日DIP备料',pageItems,store);
							}
						},
						interval:listTime
					};
					tj_ck_runner.start(tj_ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					tj_ck_runner.stop(tj_ck_today_dip_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=tj_ck_today_dip_bl_list_kb]':{
				beforeclose:function(){
					tj_ck_list_p=1;
					isAlertSum=0;
					tj_ck_runner.start(tj_ck_today_dip_bl_task);
					tj_ck_runner.stop(tj_ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=tj_ck_today_dip_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					tj_ck_runner.stop(tj_ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					tj_ck_runner.start(tj_ck_bl_list_task);
				}
			},
			

			/*********************************************************************************************************
			 								< 天津仓库今天SMT备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=tj_ck_today_smt_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.today_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_ck_today_smt_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_ck_runner.stop(tj_ck_today_smt_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_ck_runner.start(tj_ck_today_smt_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},			
			'panel[xtype="tj_ck_today_smt_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.today_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},			
			
			//主界面出发分页按钮
			'panel[xtype=tj_ck_today_smt_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_today_smt_bl_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_today_smt_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_today_smt_bl_kb]':{
				itemclick:function(e,eOpts){
					tj_ck_runner.stop(tj_ck_today_smt_bl_task);						
					var mo=eOpts.data.MOName;									
					tj_ck_list_p=1;										
					var win=Ext.create("core.tj_ck_kanban.view.item.TodaySmtBlList",{ 
						title:'天津仓库今日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/tj_ck_bl_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						isAlertSum=result.isAlertSum;
						if(result.isAlertSum=="0"){
							pageSum=Math.ceil(result.data.length/pageItems);		
						}else{
							var sum=result.isAlertSum;
							pageSum=Math.ceil(sum/pageItems);						
						}
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					//列表清单任务
					tj_ck_bl_list_task={
						run:function(){
							if(tj_ck_list_p<=pageSum){
								store.loadPage(tj_ck_list_p);
								tj_ck_list_p++;
							}else{
								tj_ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/tj_next_mo!getResult.action','/web/kanban/tj_ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate",'天津仓库今日SMT备料',pageItems,store);
							}
						},
						interval:listTime
					};
					tj_ck_runner.start(tj_ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					tj_ck_runner.stop(tj_ck_today_smt_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=tj_ck_today_smt_bl_list_kb]':{
				beforeclose:function(){
					tj_ck_list_p=1;
					isAlertSum=0;
					tj_ck_runner.start(tj_ck_today_smt_bl_task);
					tj_ck_runner.stop(tj_ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=tj_ck_today_smt_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					tj_ck_runner.stop(tj_ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					tj_ck_runner.start(tj_ck_bl_list_task);
				}
			},
			
			
			
			/*********************************************************************************************************
			 								< 天津仓库明天DIP备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=tj_ck_tomorrow_dip_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.tomorrow_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_ck_tomorrow_dip_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_ck_runner.stop(tj_ck_tomorrow_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_ck_runner.start(tj_ck_tomorrow_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},			
			'panel[xtype="tj_ck_tomorrow_dip_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.tomorrow_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},			
			
			//主界面出发分页按钮
			'panel[xtype=tj_ck_tomorrow_dip_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_tomorrow_dip_bl_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_tomorrow_dip_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_tomorrow_dip_bl_kb]':{
				itemclick:function(e,eOpts){
					tj_ck_runner.stop(tj_ck_tomorrow_dip_bl_task);						
					var mo=eOpts.data.MOName;									
					tj_ck_list_p=1;										
					var win=Ext.create("core.tj_ck_kanban.view.item.TomorrowDipBlList",{ 
						title:'天津仓库明日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/tj_ck_bl_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						isAlertSum=result.isAlertSum;
						if(result.isAlertSum=="0"){
							pageSum=Math.ceil(result.data.length/pageItems);		
						}else{
							var sum=result.isAlertSum;
							pageSum=Math.ceil(sum/pageItems);						
						}
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					//列表清单任务
					tj_ck_bl_list_task={
						run:function(){
							if(tj_ck_list_p<=pageSum){
								store.loadPage(tj_ck_list_p);
								tj_ck_list_p++;
							}else{
								tj_ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/tj_next_mo!getResult.action','/web/kanban/tj_ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate_plan",'天津仓库明日DIP备料',pageItems,store);
							}
						},
						interval:listTime
					};
					tj_ck_runner.start(tj_ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					tj_ck_runner.stop(tj_ck_today_smt_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=tj_ck_tomorrow_dip_bl_list_kb]':{
				beforeclose:function(){
					tj_ck_list_p=1;
					isAlertSum=0;
					tj_ck_runner.start(tj_ck_tomorrow_dip_bl_task);
					tj_ck_runner.stop(tj_ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=tj_ck_tomorrow_dip_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					tj_ck_runner.stop(tj_ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					tj_ck_runner.start(tj_ck_bl_list_task);
				}
			},
			
			
			

			
			
			/*********************************************************************************************************
			 								< 天津仓库明天SMT备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=tj_ck_tomorrow_smt_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.tomorrow_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_ck_tomorrow_smt_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_ck_runner.stop(tj_ck_tomorrow_smt_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_ck_runner.start(tj_ck_tomorrow_smt_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},			
			'panel[xtype="tj_ck_tomorrow_smt_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_ck_kanban.store.tomorrow_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面出发分页按钮
			'panel[xtype=tj_ck_tomorrow_smt_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_tomorrow_smt_bl_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_tomorrow_smt_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				}
			},
			
			'panel[xtype=tj_ck_tomorrow_smt_bl_kb]':{
				itemclick:function(e,eOpts){
					tj_ck_runner.stop(tj_ck_tomorrow_smt_bl_task);						
					var mo=eOpts.data.MOName;									
					tj_ck_list_p=1;										
					var win=Ext.create("core.tj_ck_kanban.view.item.TomorrowSmtBlList",{ 
						title:'天津仓库今日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/tj_ck_bl_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						isAlertSum=result.isAlertSum;
						if(result.isAlertSum=="0"){
							pageSum=Math.ceil(result.data.length/pageItems);		
						}else{
							var sum=result.isAlertSum;
							pageSum=Math.ceil(sum/pageItems);						
						}
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					//列表清单任务
					tj_ck_bl_list_task={
						run:function(){
							if(tj_ck_list_p<=pageSum){
								store.loadPage(tj_ck_list_p);
								tj_ck_list_p++;
							}else{
								tj_ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/tj_next_mo!getResult.action','/web/kanban/tj_ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate_plan",'天津仓库明日SMT备料',pageItems,store);
							}
						},
						interval:listTime
					};
					tj_ck_runner.start(tj_ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					tj_ck_runner.stop(tj_ck_today_smt_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=ck_today_smt_bl_list_kb]':{
				beforeclose:function(){
					tj_ck_list_p=1;
					isAlertSum=0;
					tj_ck_runner.start(tj_ck_today_smt_bl_task);
					tj_ck_runner.stop(tj_ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=tj_ck_today_smt_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					tj_ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					tj_ck_runner.stop(tj_ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					tj_ck_runner.start(tj_ck_bl_list_task);
				}
			},		
			
			/*********************************************************************************************************
			 								< Main Frame Hide Event >
			 ********************************************************************************************************/ 			
			'window[id=8a81830144e276020144e282161e0004_win]' : {
				beforehide : function(e, eOpts) {
					tj_ck_runner.stopAll();

				}
			}

		});
	},

	views : ['core.tj_ck_kanban.view.MainLayout',
			'core.tj_ck_kanban.view.ItemTree',
			'core.tj_ck_kanban.view.DisplayPanel', 
			'core.tj_ck_kanban.view.BlList',
			'core.tj_ck_kanban.view.item.TodayDipBl',
			'core.tj_ck_kanban.view.item.TodaySmtBl',
			'core.tj_ck_kanban.view.item.TodayDipBlList',
			'core.tj_ck_kanban.view.item.TodaySmtBlList',
			'core.tj_ck_kanban.view.item.TomorrowSmtBl',
			'core.tj_ck_kanban.view.item.TomorrowDipBl',
			'core.tj_ck_kanban.view.item.TomorrowSmtBlList',
			'core.tj_ck_kanban.view.item.TomorrowDipBlList'
			],

	stores : [
			'core.tj_ck_kanban.store.Tree', 
			'core.tj_ck_kanban.store.ListStore',
			'core.tj_ck_kanban.store.today_bl.dip.Store',
			'core.tj_ck_kanban.store.today_bl.smt.Store',
			'core.tj_ck_kanban.store.tomorrow_bl.dip.Store',
			'core.tj_ck_kanban.store.tomorrow_bl.smt.Store'
			],

	models : [
			'core.tj_ck_kanban.model.bl.Model', 
			'core.tj_ck_kanban.model.bl.ListModel'
			]
});