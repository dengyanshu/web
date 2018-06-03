Ext.define("core.smt_xbckc.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.smt_xbckc_search',
			region : 'west',
			width : 180,
			bodyPadding : 5,
			defaultType : 'textfield',
			fieldDefaults:{labelAlign:'top'},
			collapsible:true,
			items : [ {
				xtype:'textfield',
			    fieldLabel: '总数量预警',
			    name: 'sumqty',
			    id: 'sumqty',
			    x:0,y:5,
			    allowBlank: false,
			   value:30000
			    },
			{
				xtype:'textfield',
			    fieldLabel: '总盘数预警',
			    name: 'mzqty',
			    id: 'mzqty',
			    x:0,y:5,
			    allowBlank: false,
			    value:5
			    }
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});




//  collection available to it as you are binding a event to it in the Initialize method of the view.