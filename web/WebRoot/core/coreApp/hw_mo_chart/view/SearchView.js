Ext.define("core.hw_mo_chart.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.hw_mo_chart_search',
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
					displayField:'MoName',
		        	valueField:'MoName',
		        	name:'moname',
		        	fieldLabel:'工单',
					store : 'core.hw_mo_chart.store.sl.Store',
					forceSelection :true
					
		        },
		        {
					xtype:'combo',
					displayField:'zhicheng',
		        	valueField:'zhicheng',
		        	name:'zc',
		        	fieldLabel:'制程',
		        	queryMode:'local',
		        	editable:false,
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['zhicheng'],//DIP,Test,ASSY,PACKING
		        		data:[
		        		    {"zhicheng":'DIP'},
		        		    {"zhicheng":'Test'},
		        		    {"zhicheng":'ASSY'},
		        		    {"zhicheng":'PACKING'}
		        		]
		        	})
		        }
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});