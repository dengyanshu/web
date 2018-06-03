Ext.define("core.sb_kanban.store.sb.Store",{
	extend:'Ext.data.Store',
	//autoLoad:true,
	fields:[
		{name:'UserDepartments'}
		],
	proxy:{
		url:'/web/kanban/sb_kanban!getBU_ViewList.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});