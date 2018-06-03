Ext.define("core.dip_kanban.model.gc.ListModel",{
	extend:"Ext.data.Model",
    fields: [
    	 {name:'SpecificationDescription'},
         {name: 'Qty',type:'int'},
         {name: 'FirtTime'},
         {name: 'LastTime'}
    ]
});