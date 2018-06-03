Ext.define("core.smt_xbc_kanban.view.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.smt_xbc_sl_list_kb',
		columns:[
			{text:'序号',dataIndex:'RowNum',width:50,sortable:true},
			//{text:'站位号',dataIndex:'StationNo',width:100},
			{text:'料号',dataIndex:'ProductName',width:200},			
			{text:'总需求数',dataIndex:'RequiredMount',width:80},
			{text:'待需求数',dataIndex:'LStorePlusMount',width:80},   // 线别仓看板剩余数量
			{text:'已备料数',dataIndex:'AlreadyQty',width:80},
			{text:'产线剩余数',dataIndex:'LinePlusMount',width:100},
	 	 	{text:'可生产板数',dataIndex:'PCBAQty',width:100},
	 	 	{text:'BOM用量',dataIndex:'UnitQty',width:70}
	 	 	
	 	 
			//{text:'替代料',dataIndex:'InsteadProduct',width :100}
			// {text:'基准用量',dataIndex:'UPH',width:100},AlertQty
			// {text:'用量比例',dataIndex:'LineplusMount',flex : 1},
			// {text:'A/B面',dataIndex:'Side',width:100},
			// {text:'可生产板数',dataIndex:'CanUsePCBQty',flex:1}
		],
		store:'core.smt_xbc_kanban.store.sl.ListStore',
		/*dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.smt_xbc_kanban.store.sl.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}],*/
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			getRowClass:function(record,rowIndex,p,store){
				var cls='';
				    //alert(record.data.LStorePlusMount);
					//cls="row-red .x-grid-cell row-none-display";
				if(record.data.isAlert=="1"){ // 等同于record.get('isAlert')
					if(Ext.getCmp('checkbox1').getValue()==false){
						if(record.data.LStorePlusMount<=0){
						   cls="row-red .x-grid-cell row-none-display";
						}
						else{
							cls="row-red .x-grid-cell";
						}
					}
					else{
						cls="row-red .x-grid-cell";
					}
				}else if(record.data.isAlert=="2"){
					if(Ext.getCmp('checkbox1').getValue()==false){
						if(record.data.LStorePlusMount>0){
							cls="row-orange .x-grid-cell";
						}
						else{
						   cls="row-orange .x-grid-cell row-none-display";
						}
					}
					else{
						cls="row-orange .x-grid-cell";
					}
				}
				else {
					if(Ext.getCmp('checkbox1').getValue()==false){
						if(record.data.LStorePlusMount>0){
							cls="row-green .x-grid-cell";
						}
						else{
						   cls="row-green .x-grid-cell row-none-display";
						}
					}
					else{
						cls="row-green .x-grid-cell";
					}
				}
				return cls;
			}
		}
		
		


			
});