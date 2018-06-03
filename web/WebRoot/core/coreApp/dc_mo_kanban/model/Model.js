Ext.define("core.dc_mo_kanban.model.Model",{
    extend: 'Ext.data.Model',
    fields: [
        { name:'Workcenterid', type:'string' },
        { name:'WorkcenterName', type:'string' },
        { name:'MoName', type:'string' },
        { name:'Site', type:'string' },
        { name:'flag', type:'int' },
        { name:'ProductName' },
        { name:'Qty', type:'int' },
        { name:'BeginTime' }
        
    ]
});