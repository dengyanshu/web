Ext.define("core.xm_ztl.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.xm_ztl_search',
			region : 'west',
			width : 180,
			bodyPadding : 5,
			defaultType : 'textfield',
			fieldDefaults:{labelAlign:'top'},
			collapsible:true,
			items : [ {
	        	xtype:'combo',
				displayField:'WorkcenterName',
	        	valueField:'WorkcenterName',
	        	name:'line',
	        	fieldLabel:'线体',
				store : 'core.xm_ztl.store.sl.Store',
				forceSelection :true
				
	        }
			
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});




//  collection available to it as you are binding a event to it in the Initialize method of the view.