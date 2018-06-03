Ext.define("core.ff_line_kanban.model.Model",{
    extend: 'Ext.data.Model',
    fields: [
        { name:'Workcenterid', type:'string' },
        { name:'WorkcenterName', type:'string' },
        { name:'MoName', type:'string' },
        { name:'value1', type:'string' },
        { name:'value2', type:'string' },
        { name:'DoneRequired', type:'string' },
        { name:'isAlert', type:'string' },
        { name:'hasNext', type:'string' }
    ]
});