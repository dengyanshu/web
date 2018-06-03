var ck_runner = new Ext.util.TaskRunner();
var mainTime=60000;
var listTime=10000;

/* 总表线程任务 */
var ck_today_dip_bl_task=null;
var ck_today_smt_bl_task=null;
var ck_tomorrow_dip_bl_task=null;
var ck_tomorrow_smt_bl_task=null;
var ck_smt_ll_task=null;

/* 总表默认页面 */
var ck_today_dip_bl_p=1;
var ck_today_smt_bl_p=1;
var ck_tomorrow_dip_bl_p=1;
var ck_tomorrow_smt_bl_Truep=1;
var ck_smt_ll_p=1;

/* 子表线程任务及配置 */
var ck_bl_list_task = null;
var ck_smt_ll_list_task = null;
var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");
//var pageItems=27;	//默认每个List显示的条数
var pageSum=1;		//默认的页数
var isAlertSum=0;	//是否有警戒值
var ck_list_p;		//项目清单页面
var ck_smt_ll_list_p=1;		//项目清单页面

Ext.define("core.ck_kanban.controller.Controller", {
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
			'ck_kb_navigation' : {
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
						if(name=="ck_today_dip_bl_kb"){
							ck_today_dip_bl_task={
								run:function(){
									var ck_today_dip_bl_total=self.updateClock("ck","today_bl.dip",ck_today_dip_bl_p,mainPageItems);
									if(ck_today_dip_bl_total!=0){
										if(ck_today_dip_bl_p>=(ck_today_dip_bl_total/mainPageItems)){
											ck_today_dip_bl_p=1;
										}else{
											ck_today_dip_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(ck_today_dip_bl_task);
						}else if(name=="ck_today_smt_bl_kb"){
							ck_today_smt_bl_task={
								run:function(){
									var ck_today_smt_bl_total=self.updateClock("ck","today_bl.smt",ck_today_smt_bl_p,mainPageItems);
									if(ck_today_smt_bl_total!=0){
										if(ck_today_smt_bl_p>=(ck_today_smt_bl_total/mainPageItems)){
											ck_today_smt_bl_p=1;
										}else{
											ck_today_smt_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(ck_today_smt_bl_task);
						}else if(name=="ck_tomorrow_dip_bl_kb"){
							ck_tomorrow_dip_bl_task={
								run:function(){
									var ck_tomorrow_dip_bl_total=self.updateClock("ck","tomorrow_bl.dip",ck_tomorrow_dip_bl_p,mainPageItems);
									if(ck_tomorrow_dip_bl_total!=0){
										if(ck_tomorrow_dip_bl_p>=(ck_tomorrow_dip_bl_total/mainPageItems)){
											ck_tomorrow_dip_bl_p=1;
										}else{
											ck_tomorrow_dip_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(ck_tomorrow_dip_bl_task);							
						}else if(name=="ck_tomorrow_smt_bl_kb"){
							ck_tomorrow_smt_bl_task={
								run:function(){
									var ck_tomorrow_smt_bl_total=self.updateClock("ck","tomorrow_bl.smt",ck_tomorrow_smt_bl_p,mainPageItems);
									if(ck_tomorrow_smt_bl_total!=0){
										if(ck_tomorrow_smt_bl_p>=(ck_tomorrow_smt_bl_total/mainPageItems)){
											ck_tomorrow_smt_bl_p=1;
										}else{
											ck_tomorrow_smt_bl_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(ck_tomorrow_smt_bl_task);							
						}
						else if(name=="ck_smt_ll_kb"){
							ck_smt_ll_task={
								run:function(){
									var ck_smt_ll_total=self.updateClock("ck","smt.ll",ck_smt_ll_p,mainPageItems);
									if(ck_smt_ll_total!=0){
										if(ck_smt_ll_p>=(ck_smt_ll_total/mainPageItems)){
											ck_smt_ll_p=1;
										}else{
											ck_smt_ll_p++;
										}
									}
								},
								interval:mainTime
							};
							ck_runner.start(ck_smt_ll_task);							
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},
			
			
			
			
			/*********************************************************************************************************
			 								< 仓库今天DIP备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=ck_today_dip_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.today_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=ck_today_dip_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						ck_runner.stop(ck_today_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						ck_runner.start(ck_today_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="ck_today_dip_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.today_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面触发分页按钮
			'panel[xtype=ck_today_dip_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_today_dip_bl_p=params+1;
				}
			},
			
			'panel[xtype=ck_today_dip_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				}
			},
			
			'panel[xtype=ck_today_dip_bl_kb]':{
				itemclick:function(e,eOpts){
					ck_runner.stop(ck_today_dip_bl_task);						//点击停止总表翻页
					var mo=eOpts.data.MOName;									//得到点击的工单号
					ck_list_p=1;												//给列表清单赋值
					var win=Ext.create("core.ck_kanban.view.item.TodayDipBlList",{ //建立一个清单窗口
						title:'仓库今日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/ck_bl_list!getResult.action',params:{mo:mo}});
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
					ck_bl_list_task={
						run:function(){
							if(ck_list_p<=pageSum){
								store.loadPage(ck_list_p);
								ck_list_p++;
							}else{
								ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/next_mo!getResult.action','/web/kanban/ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate",'仓库今日DIP备料',pageItems,store);
							}
						},
						interval:listTime
					};
					ck_runner.start(ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					ck_runner.stop(ck_today_dip_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=ck_today_dip_bl_list_kb]':{
				beforeclose:function(){
					ck_list_p=1;
					isAlertSum=0;
					ck_runner.start(ck_today_dip_bl_task);
					ck_runner.stop(ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=ck_today_dip_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					ck_runner.stop(ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					ck_runner.start(ck_bl_list_task);
				}
			},
			

			/*********************************************************************************************************
			 								< 仓库今天SMT备料 >
			 ********************************************************************************************************/ 
		'panel[xtype=ck_today_smt_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.today_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=ck_today_smt_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						ck_runner.stop(ck_today_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						ck_runner.start(ck_today_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
		'panel[xtype="ck_today_smt_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.today_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面出发分页按钮
			'panel[xtype=ck_today_smt_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_today_smt_bl_p=params+1;
				}
			},
			
			'panel[xtype=ck_today_smt_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				}
			},
			
			'panel[xtype=ck_today_smt_bl_kb]':{
				itemclick:function(e,eOpts){
					ck_runner.stop(ck_today_smt_bl_task);						
					var mo=eOpts.data.MOName;									
					ck_list_p=1;										
					var win=Ext.create("core.ck_kanban.view.item.TodaySmtBlList",{ 
						title:'仓库今日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/ck_bl_list!getResult.action',params:{mo:mo}});
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
					ck_bl_list_task={
						run:function(){
							if(ck_list_p<=pageSum){
								store.loadPage(ck_list_p);
								ck_list_p++;
							}else{
								ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/next_mo!getResult.action','/web/kanban/ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate",'仓库今日SMT备料',pageItems,store);
							}
						},
						interval:listTime
					};
					ck_runner.start(ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					ck_runner.stop(ck_today_smt_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=ck_today_smt_bl_list_kb]':{
				beforeclose:function(){
					ck_list_p=1;
					isAlertSum=0;
					ck_runner.start(ck_today_smt_bl_task);
					ck_runner.stop(ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=ck_today_smt_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					ck_runner.stop(ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					ck_runner.start(ck_bl_list_task);
				}
			},
			
			
			
			/*********************************************************************************************************
			 								< 仓库明天DIP备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=ck_tomorrow_dip_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.tomorrow_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=ck_tomorrow_dip_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						ck_runner.stop(ck_today_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						ck_runner.start(ck_today_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
		'panel[xtype="ck_tomorrow_dip_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.tomorrow_bl.dip.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面出发分页按钮
			'panel[xtype=ck_tomorrow_dip_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_tomorrow_dip_bl_p=params+1;
				}
			},
			
			'panel[xtype=ck_tomorrow_dip_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				}
			},
			
			'panel[xtype=ck_tomorrow_dip_bl_kb]':{
				itemclick:function(e,eOpts){
					ck_runner.stop(ck_tomorrow_dip_bl_task);						
					var mo=eOpts.data.MOName;									
					ck_list_p=1;										
					var win=Ext.create("core.ck_kanban.view.item.TomorrowDipBlList",{ 
						title:'仓库明日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/ck_bl_list!getResult.action',params:{mo:mo}});
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
					ck_bl_list_task={
						run:function(){
							if(ck_list_p<=pageSum){
								store.loadPage(ck_list_p);
								ck_list_p++;
							}else{
								ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/next_mo!getResult.action','/web/kanban/ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate_plan",'仓库明日DIP备料',pageItems,store);
							}
						},
						interval:listTime
					};
					ck_runner.start(ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					ck_runner.stop(ck_today_smt_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=ck_tomorrow_dip_bl_list_kb]':{
				beforeclose:function(){
					ck_list_p=1;
					isAlertSum=0;
					ck_runner.start(ck_tomorrow_dip_bl_task);
					ck_runner.stop(ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=ck_tomorrow_dip_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					ck_runner.stop(ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					ck_runner.start(ck_bl_list_task);
				}
			},
			
			
			

			
			
			/*********************************************************************************************************
			 								< 仓库明天SMT备料 >
			 ********************************************************************************************************/ 
			'panel[xtype=ck_tomorrow_smt_bl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.tomorrow_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=ck_tomorrow_smt_bl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						ck_runner.stop(ck_today_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						ck_runner.start(ck_today_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
		'panel[xtype="ck_tomorrow_smt_bl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.tomorrow_bl.smt.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面出发分页按钮
			'panel[xtype=ck_tomorrow_smt_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_tomorrow_smt_bl_p=params+1;
				}
			},
			
			'panel[xtype=ck_tomorrow_smt_bl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				}
			},
			
			'panel[xtype=ck_tomorrow_smt_bl_kb]':{
				itemclick:function(e,eOpts){
					ck_runner.stop(ck_tomorrow_smt_bl_task);						
					var mo=eOpts.data.MOName;									
					ck_list_p=1;										
					var win=Ext.create("core.ck_kanban.view.item.TomorrowSmtBlList",{ 
						title:'仓库今日DIP备料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.ck_kanban.store.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/ck_bl_list!getResult.action',params:{mo:mo}});
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
					ck_bl_list_task={
						run:function(){
							if(ck_list_p<=pageSum){
								store.loadPage(ck_list_p);
								ck_list_p++;
							}else{
								ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/next_mo!getResult.action','/web/kanban/ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate_plan",'仓库明日SMT备料',pageItems,store);
							}
						},
						interval:listTime
					};
					ck_runner.start(ck_bl_list_task);	
				},
				beforedistory:function(e,Opts){
					ck_runner.stop(ck_today_smt_bl_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=ck_today_smt_bl_list_kb]':{
				beforeclose:function(){
					ck_list_p=1;
					isAlertSum=0;
					ck_runner.start(ck_today_smt_bl_task);
					ck_runner.stop(ck_bl_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=ck_today_smt_bl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					ck_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					ck_runner.stop(ck_bl_list_task);
				},			
				beforeitemmouseleave:function(){
					ck_runner.start(ck_bl_list_task);
				}
			},		
			
		/*********************************************************************************************************
			 								< SMT领料 >
			 ********************************************************************************************************/ 
			'panel[xtype=ck_smt_ll_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.smt.ll.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=ck_smt_ll_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						ck_runner.stop(ck_today_dip_bl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						ck_runner.start(ck_today_dip_bl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
		'panel[xtype="ck_smt_ll_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.ck_kanban.store.smt.ll.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
			//主界面出发分页按钮
			'panel[xtype=ck_smt_ll_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_smt_ll_p=params+1;
				}
			},
			
			'panel[xtype=ck_smt_ll_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_smt_ll_list_p=params+1;
				}
			},
			
			'panel[xtype=ck_smt_ll_kb]':{
				itemclick:function(e,eOpts){
					ck_runner.stop(ck_smt_ll_task);						
					var mo=eOpts.data.MOName;									
					smt_ll_list_p=1;										
					var win=Ext.create("core.ck_kanban.view.item.SmtLlList",{ 
						title:'SMT领料  ===> 物料清单信息[ 工单:'+mo+' ]'	
					}).show();
					var mask=self.msg(win);
/*					var store = Ext.data.StoreManager.map['core.ck_kanban.store.smt.ll.ListStore'];
					mask.show();
					store.load({params : {mo:mo,limit:pageItems,page:1}});				//第一次加载的页面为1
					//var result=self.ajax({url:'/web/kanban/ck_bl_list!getResult.action',params:{mo:mo}});
					mask.hide();*/
					
					ck_smt_ll_list_task={
								run:function(){
									var ck_smt_bl_list_total=self.updateClockList("ck","smt.ll.ListStore",ck_smt_ll_list_p,pageItems,mo);
									if(ck_smt_bl_list_total!=0){
										if(ck_smt_ll_list_p>=(ck_smt_bl_list_total/pageItems)){
											ck_smt_ll_list_p=1;
										}else{
											ck_smt_ll_list_p++;
										}
									}
								},
								interval:listTime
							};
							ck_runner.start(ck_smt_ll_list_task);	
	/*	
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
				ck_bl_list_task={
						run:function(){
							if(ck_list_p<=pageSum){
								store.loadPage(ck_list_p);
								ck_list_p++;
							}else{
								ck_list_p=1;
								pageSum=self.nextPage(win,isAlertSum,'/web/kanban/next_mo!getResult.action','/web/kanban/ck_bl_list!getResult.action',mo,"AbsoluteCompleteRate_plan",'仓库明日SMT备料',pageItems,store);
							}
						},
						interval:listTime
					};
					ck_runner.start(ck_bl_list_task);	*/
				},
				beforedistory:function(e,Opts){
					ck_runner.stop(ck_smt_ll_task);
				}
			},
			//列表清单关闭触发的事件
			'panel[xtype=ck_smt_ll_list_kb]':{
				beforeclose:function(){
					ck_smt_ll_list_p=1;
					isAlertSum=0;
					ck_runner.start(ck_smt_ll_task);
					ck_runner.stop(ck_smt_ll_list_task);
				}	
			},
			//列表清单表格出发的事件
			'panel[xtype=ck_smt_ll_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					ck_smt_ll_list_p=params+1;
				},
				beforeitemmouseenter:function(){
					ck_runner.stop(ck_smt_ll_list_task);
				},			
				beforeitemmouseleave:function(){
					ck_runner.start(ck_smt_ll_list_task);
				}
			},					
			
			/*********************************************************************************************************
			 								< Main Frame Hide Event >
			 ********************************************************************************************************/ 			
			'window[id=8a81830144e276020144e282161e0004_win]' : {
				beforehide : function(e, eOpts) {
					ck_runner.stopAll();

				}
			}

		});
	},

	views : ['core.ck_kanban.view.MainLayout',
			'core.ck_kanban.view.ItemTree',
			'core.ck_kanban.view.DisplayPanel', 
			'core.ck_kanban.view.BlList',
			'core.ck_kanban.view.item.TodayDipBl',
			'core.ck_kanban.view.item.TodaySmtBl',
			'core.ck_kanban.view.item.TodayDipBlList',
			'core.ck_kanban.view.item.TodaySmtBlList',
			'core.ck_kanban.view.item.TomorrowSmtBl',
			'core.ck_kanban.view.item.TomorrowDipBl',
			'core.ck_kanban.view.item.TomorrowSmtBlList',
			'core.ck_kanban.view.item.TomorrowDipBlList',
			'core.ck_kanban.view.item.SmtLl',
			'core.ck_kanban.view.item.SmtLlList'
			],

	stores : [
			'core.ck_kanban.store.Tree', 
			'core.ck_kanban.store.ListStore',
			'core.ck_kanban.store.today_bl.dip.Store',
			'core.ck_kanban.store.today_bl.smt.Store',
			'core.ck_kanban.store.tomorrow_bl.dip.Store',
			'core.ck_kanban.store.tomorrow_bl.smt.Store',
			'core.ck_kanban.store.smt.ll.Store',
			'core.ck_kanban.store.smt.ll.ListStore'
			],

	models : [
			'core.ck_kanban.model.bl.Model', 
			'core.ck_kanban.model.bl.ListModel',
			'core.ck_kanban.model.smt.ll.Model',
			'core.ck_kanban.model.smt.ll.Model'
			]
});