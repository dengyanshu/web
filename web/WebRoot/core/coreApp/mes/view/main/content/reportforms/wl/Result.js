 /***************************************************************************
  								<物料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.wl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.wl.result',
	store:'core.mes.store.reportforms.wl.Store',
	/*
    viewConfig : {
          getRowClass: function(record, rowIndex, rowParams, store){
              var cls;
              var num=this.ownerCt.ownerCt.items.items[0].items.items[7].value;
              if(record.get('6')*num<record.get('5')){
                  cls =  'blue-row';
              }
              return cls;
         }
    },
    */      
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",dataIndex:'MOName',sortable:true},
		{header:"线别",dataIndex:'WorkcenterName',sortable:true},
		{header:"机台",dataIndex:'StationNo',sortable:true},
		{header:"槽位号",dataIndex:'SLotNO',sortable:true},
		{header:"A/B面",dataIndex:'Side',sortable:true},
		{header:"单位用量",dataIndex:'BaseQty',sortable:true},
		{header:"数量",dataIndex:'Qty',sortable:true,
			renderer:function(value){
				if(value){
					/*if(value==0){
						return "<font color='red'><b>"+value+"</b></font>";
					}else{
						return "<font color='green'>"+value+"</font>";
					}*/
				}
			}}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.wl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 