Ext.define("core.server_chart.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.server_chart_search',
			region : 'west',
			width : 180,
			bodyPadding : 5,
			defaults : {
				anchor : '90%'
			},
			defaultType : 'textfield',
			layout : 'anchor',
			fieldDefaults:{labelAlign:'top'},
			collapsible:true,
			items : [
			    {
					xtype:'combo',
					displayField:'cServer',
		        	valueField:'cServer',
		        	name:'severname',
		        	fieldLabel:'服务器',
		        	queryMode:'local',
		        	store : 'core.server_chart.store.ls.Store'
		        	
		        }
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});