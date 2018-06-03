
var dc_mo_runner=new Ext.util.TaskRunner();


var dc_mo_list_task=null;
var dc_mo_list_p;

var  title_mo="";

Ext.define("core.dc_mo_kanban.controller.Controller",{
	extend:"Ext.app.Controller",
	
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},

	init:function(){
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=dc_mo_kb_lines] dataview':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.Workcenterid;
					mo=record.data.MoName;
					var layout=view.up('dc_mo_kb_main').getLayout();	
					var store = Ext.data.StoreManager.map['core.dc_mo_kanban.store.sl.Store'];
					store.removeAll();
					store.getProxy().extraParams={mo:mo,limit : 4,page:1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(1);
					//layout.getNext();
				}
			},
			'panel[xtype=dc_mo_kb_moview] ':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo=record.data.MOName;
					title_mo=mo;
					var ProductName=record.data.ProductName;
					var Qty=record.data.MOQtyRequired;
					var BeginTime=record.data.BeginTime;
					//ProductName":"900000-5032","Qty":"5000","BeginTime":"2016-12-10 08:00"}
					dc_mo_list_p=1;
					var window=Ext.create('Ext.Window',{
						width:500,
						maximized:true,
						//layout:'fit',
						//autoScroll:true,
						//overflowY : "scroll",
						overflowY : "scroll",
						overflowY : "scroll",
						//title:'信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][工单批量：'+qty+']',
						tbar:[
						//{xtype:'checkboxfield',boxLabel:'隐藏不欠料部分', name:'display', id: 'checkbox1',inputValue: '1'},
						{xtype:'button',text:'停止刷新',id:'stopPage3'},
						{xtype:'button',text:'开启刷新',id:'beginPage3',disabled : true},
						{xtype:'button',text:'复制工单',id:'copymoname'}
					    ],
						listeners:{
							beforehide:function(e,Opts){
								dc_mo_runner.stop(dc_mo_list_task);
								dc_mo_list_p=1;
							}
						}
					}).show();
				
					dc_mo_list_task={
					   run:function(){
								window.removeAll();
								window.setTitle('信息[工单:'+mo+' ][产品料号：'+ProductName+'][需求数量：'+Qty+'][计划开始时间：'+BeginTime+']');
								window.add({xtype:'dc_mo_sl_list_kb'});
								var store = Ext.data.StoreManager.map['core.dc_mo_kanban.store.sl.ListStore'];					
								var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult10.action',params:{mo:mo}});	
								if(result.success){
									dc_mo_list_p=1;
									store.proxy.data=result.data;
									var data=result.data;
									store.load();
									//store.loadPage(smt_line_list_p);
									layout.setActiveItem(2);
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);
									dc_mo_runner.stop(dc_mo_list_task);
								}
						},
						interval:60000
					};
					dc_mo_runner.start(dc_mo_list_task);
				}
			},
			
			
			'panel[xtype=dc_mo_kb_moview] button[action=return]':{
				click:function( but, e, eOpts ){
					var layout=but.up('dc_mo_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.dc_mo_kanban.store.Store'];
					//store.getProxy().params={limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(0);
				}
			},
			
			'window button[id=stopPage3]':{
				click:function( but, e, eOpts ){
					dc_mo_runner.stopAll();
					but.disable();
					Ext.getCmp('beginPage3').enable();
				}
			},
			
			'window button[id=beginPage3]':{
				click:function( but, e, eOpts ){
					dc_mo_runner.start(dc_mo_list_task);
					but.disable();
					Ext.getCmp('stopPage3').enable();
				}
			},
			
			'window button[id=copymoname]':{
				click:function( but, e, eOpts ){
					 try {  
            			 window.clipboardData.setData("Text",title_mo);  
            			 alert('已复制工单'+title_mo+'到粘贴板');
		        	} catch (e) {  
		           		 alert("请使用IE浏览器！被浏览器拒绝！");  
		       		 }  
					
				}
			},
			
			
			'window[id=8a82809158e7bf700158e7ef16790004_win]':{
				beforehide:function(e,Opts){
					dc_mo_runner.stopAll();
				}
			},
			'window[id=8a82809158e7bf700158e7ef16790004_win] button[id=minimize]':{
				
			},
			'window[id=8a82809158e7bf700158e7ef16790004_win] button[id=maximize]':{
				
			}
		});
	},
	views:[
		'core.dc_mo_kanban.view.Main',
		'core.dc_mo_kanban.view.Lines',
		'core.dc_mo_kanban.view.List',
		'core.dc_mo_kanban.view.SlList',
		'core.dc_mo_kanban.view.MoView'
		
	],
	stores:[
		'core.dc_mo_kanban.store.Store',
		'core.dc_mo_kanban.store.sl.ListStore',
		'core.dc_mo_kanban.store.sl.Store'
	],
	models:[
		 'core.dc_mo_kanban.model.Model',
		'core.dc_mo_kanban.model.sl.ListModel',
		'core.dc_mo_kanban.model.sl.Model'
	]
	
});






function copyToClipboard(txt) {  
    if (window.clipboardData) {  
        window.clipboardData.clearData();  
        window.clipboardData.setData("Text", txt);  
        alert("复制成功！")  
    } else if (navigator.userAgent.indexOf("Opera") != -1) {  
        window.location = txt;  
        alert("复制成功！");  
    } else if (window.netscape) {  
        try {  
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
        } catch (e) {  
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");  
        }  
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
        if (!clip)  
            return;  
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
        if (!trans)  
            return;  
        trans.addDataFlavor('text/unicode');  
        var str = new Object();  
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
        var copytext = txt;  
        str.data = copytext;  
        trans.setTransferData("text/unicode", str, copytext.length * 2);  
        var clipid = Components.interfaces.nsIClipboard;  
        if (!clip)  
            return false;  
        clip.setData(trans, null, clipid.kGlobalClipboard);  
        alert("复制成功！")  
    }else if(copy){  
        copy(txt);  
        alert("复制成功！")  
    }  
}  