Ext.define("core.dip_kanban.model.xstore.Model",{
	extend:"Ext.data.Model",
    fields: [
         {name: 'ProductName'},   
         {name: 'StockName'},   
         {name: 'StockLocationName'},
         {name: 'QTY'},
         {name: 'Remark'}        
   ]
});
