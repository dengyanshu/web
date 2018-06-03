Ext.define("core.dip_kanban.store.lts.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.dip_kanban.model.lts.ListModel',
	proxy:{
		url:'/web/kanban/dip_lts!getResult.action',
		type:'ajax',
		actionMethods:{
			read:'POST'			
		},
		reader:{
			type:'json',
			root:'data'
		}
	}

});