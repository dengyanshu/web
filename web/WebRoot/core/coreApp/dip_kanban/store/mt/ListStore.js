Ext.define("core.dip_kanban.store.mt.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.dip_kanban.model.mt.ListModel',
	proxy:{
		url:'/web/kanban/dip_mt_list!getResult.action',
		type:'ajax',
		reader:{			
			type:'json',
			root:'data',
			totalProperty: 'total'
		}
	}
	
});