Ext.define("core.tj_led_kanban.view.item.ZcList",{
	extend : "Ext.window.Window",
	alias : 'widget.tj_led_zc_list_kb',
	width:300,
	maximized:true,
	layout:'border',
	items:[
		{
			xtype:'grid',
			region:'south',
			collapsible:true,
			height:400,
			columns:[
				{xtype:'rownumberer',text:'序号',width:100,align:'center'},
				{text:'工作中心',dataIndex:'WorkcenterName',width:300},
				{text:'时间段',dataIndex:'Times',width:250},
				{text:'投入数量',dataIndex:'InputQty',width:250},
				{text:'产出数量',dataIndex:'CompleteQty',width:250},
				{text:'维修数量',dataIndex:'RepairQty',flex:1}
			],
			store:'core.tj_led_kanban.store.zc.ListStore'
	},
	{
		xtype:'chart',
		region:'center',
        style: 'background:#fff',
        animate: true,
        shadow: true,
        store:'core.tj_led_kanban.store.zc.ListStore',
        legend:{position:'top'},
        axes: [{//轴
            type: 'Numeric',
            position: 'left',
            //fields: ['InputQty','CompleteQty','RepairQty'],
            fields: ['CompleteQty'],
            title: '数量',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['Times'],
            title: '时间段'
        }],//序列
        series: [{
            type: 'column', //column
            axis: 'left',
            highlight: true,
            xField: 'Times',
            title: ['产出数量'],
          //title: ['投入数量','产出数量','维修数量'],
           // yField: ['InputQty','CompleteQty','RepairQty'],
            yField:['CompleteQty'],
              
            tips: {//提示
              trackMouse: true,
              width: 250,
              height: 28,
              renderer: function(storeItem,item) {
              	this.setTitle(storeItem.get('Times')+'的产出数量为: '+storeItem.get('CompleteQty'));
/*              	if(item.yField=="InputQty"){
                	this.setTitle(storeItem.get('Times')+'的投入数量为: '+storeItem.get('InputQty'));
               	}else if(item.yField=="CompleteQty"){
                 	this.setTitle(storeItem.get('Times')+'的产出数量为: '+storeItem.get('CompleteQty'));
                }else if(item.yField=="RepairQty"){
                	this.setTitle(storeItem.get('Times')+'的维修数量为: '+storeItem.get('RepairQty'));
                }    */            	
              }
             }
                //格式化
                /*
	            renderer: function(sprite, record, attr, index, store){
	                    var fieldValue = Math.random() * 20 + 10;
	                    console.log(record);
	                    var value = (record.get('data') >> 0) % 3;
	                    var color = ['rgb(213, 70, 121)', 
	                                 'rgb(44, 153, 201)', 
	                                 'rgb(146, 6, 157)', 
	                                 'rgb(49, 149, 0)', 
	                                 'rgb(249, 153, 0)'][value];
	                    return Ext.apply(attr, {
	                        fill: color
	                    });
	            } ,   
	             */           
			/* label: { 		//控制柱形图label
                 	 display: 'insideEnd',
                  	'text-anchor': 'middle',
                    field: ['data','data2','data3'],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#f33'
                }*/
                 
         }]		
	}]
});


