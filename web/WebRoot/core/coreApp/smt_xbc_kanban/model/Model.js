Ext.define("core.smt_xbc_kanban.model.Model",{
    extend: 'Ext.data.Model',
    fields: [
        { name:'Workcenterid', type:'string' },
        { name:'WorkcenterName', type:'string' },
        { name:'MoName', type:'string' },
        { name:'TaskName', type:'string' }, 
        { name:'isAlert', type:'int' },         
        { name:'value1', type:'string' },
        { name:'value2', type:'string' },
        { name:'value3', type:'string' },       
        { name:'DoneRequired', type:'string' },
        { name:'hasNext', type:'string' }
    ]
});