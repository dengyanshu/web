Ext.define("core.smt_xbc_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [


         {name: 'RowNum',type:'int' ,sortable:true},
         {name: 'WorkcenterName'},
         {name: 'ProductName'},
	 {name: 'StationNo'},
	 {name:'LStorePlusMount' ,type:'int'},
	 {name:'AlreadyQty'},
	 {name:'UnitQty'},
	 {name:'PCBAQty'},
	 {name:'RequiredMount'},
         {name: 'LinePlusMount'},//LineplusMount 
	 {name: 'InsteadProduct'},
         {name:'isAlert'}
    ]
});