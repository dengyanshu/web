Ext.define("core.iqc_kanban.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.iqc_kanban_search',
			region : 'north',
			bodyPadding : 5,
			bodyStyle: 'background:#006699; ',
			layout : 'column',
			fieldDefaults:{labelAlign:'left',labelWidth:60},
			tbar : [ 
			     '->','日期(起):',{
			    	 
     		        	xtype: 'datefield',
  			        	width:150,
  			        	editable:false,	//不可填写
  			        	emptyText:'请选择查询日期',
  			        	applyTo : 'txtDate', 
  			        	format: 'Y-m-d',
  			        	id:'dayBegin',
  			        	name : 'dayBegin',
  			        	maxValue: new Date(new Date()-1*24*60*60*1000),
  			        	value: new Date(new Date()-1*24*60*60*1000)
  			        },
  			      '日期(止):',{
     		        	xtype: 'datefield',
  			        	width:150,
  			        	editable:false,	//不可填写
  			        	emptyText:'请选择查询日期',
  			        	applyTo : 'txtDate', 
  			        	format: 'Y-m-d',
  			        	id:'dayEnd',
  			        	name : 'dayEnd',
  			        	maxValue: new Date(new Date()),
  			        	value: new Date(new Date())
  			        },
//  			      {
//  						xtype:'button',
//  					    text:'查询',
//  					    action: 'button_scxid',
//  					    disabled:false,
//  					    handler:function(){
//  					   
//				    	var dayBegin= Ext.getCmp("dayBegin").getValue();
//				    	var dayEnd=Ext.getCmp("dayEnd").getValue();
//				    	var timeBegin=Ext.Date.format(new Date(dayBegin),'Y-m-d');
//				    	var timeEnd=Ext.Date.format(new Date(dayEnd),'Y-m-d');
//				    	
//				    	var store=Ext.data.StoreManager.map['core.iqc_kanban.store.Store'];
//  					    	Ext.Ajax.request({
//  					    		url :'/web/kanban/iqc_kanban!getResult.action',
//  					    		params:{limit:100,page:1,timeBegin:timeBegin,timeEnd:timeEnd},
//  					    		success : function(response,opts){
//  					    			var obj = Ext.decode(response.responseText);
//  					    			var total=obj.total;
//  					    			var data=obj.data;
//  					    			store.removeAll();
//  					    			if(data[0].ErrorMsg!=null){
//  					    				Ext.Msg.alert("系统提示",data[0].ErrorMsg);
//  					    			}else{
//  					    			store.proxy.data=data;
//  					    			store.load();
//  					    			}
//  					    		}
//  					    	});
//  					    
//  					 }}
  					  
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});