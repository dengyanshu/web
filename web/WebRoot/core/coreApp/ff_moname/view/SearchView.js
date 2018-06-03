Ext.define("core.ff_moname.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.ff_moname_search',
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
			items : [ {
				xtype:'textfield',
			    fieldLabel: '工单',
			    name: 'moname',
			    id: 'moname',
			    x:0,y:5,
			    allowBlank: false
			   
			    }
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});