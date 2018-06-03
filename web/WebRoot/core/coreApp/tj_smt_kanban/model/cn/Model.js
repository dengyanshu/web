Ext.define("core.tj_smt_kanban.model.cn.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name:'RowNum'},
    	 {name:'WorkCenterName'},
         {name: 'MOName'},
         {name: 'WorkcenterName'},
         {name: 'MOQtyRequired'},
         {name: 'InputDone'},
         {name: 'ProductName'},   
         {name: 'ProductSpecification'}
    ]
});