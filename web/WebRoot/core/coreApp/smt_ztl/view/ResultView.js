/**
 * 中间部分 
 * */
Ext.define("core.smt_ztl.view.ResultView",{
		extend:'Ext.panel.Panel',
	    alias:'widget.smt_ztl_listview',
		region:'center',
		frame:true,
		layout:'fit',
		height:270,
		items:[{
		    xtype:'chart',
    		animate:true,
			shadow:true,
			theme:'Category4',
			store:'core.smt_ztl.store.Store',
			legend:{position:'top'},
			axes:[
				{
					type:'Numeric',
					position:'left',
					fields:['YieldRate','BasicLine'],
					//title:'',
					grid:true,
					majorTickSteps:10,
					maximum:10
				},{
					type:'Category',
					position:'bottom',
					fields:['TimeInterval']
					//title:''
				}
			],
			series:[
				{
					type:'line',
					axis:'left',
					gutter:80,
					highlight:true,
					//style: {width: 30},
					title:['良品比例'],
					label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'YieldRate',
                        //renderer: Ext.util.Format.numberRenderer('0'),
                       // orientation: 'vertical',
                        color: '#333'
                    },
					xField:'TimeInterval',
					yField:['YieldRate'],
					stacked:true,
					tips:{
						trackMouse:true,
						width:465,
						height:28,
						renderer:function(storeItem,item){
							 this.setTitle(storeItem.get('TimeInterval')+"良品率为:"+storeItem.get('YieldRate') );
						}
					}
				},
				{
					type:'line',
					axis:'left',
					gutter:80,
					highlight:true,
					//style: {width: 30},
					title:['目标基线'],
					label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'BasicLine',
                        renderer: Ext.util.Format.numberRenderer('0'),
                       // orientation: 'vertical',
                        color: '#333'
                    },
					xField:'TimeInterval',
					yField:['BasicLine'],
					stacked:true
					/*tips:{
						trackMouse:true,
						width:365,
						height:28,
						renderer:function(storeItem,item){
							 this.setTitle(storeItem.get('StartTime')+"-"+storeItem.get('EndTime') + '合格率:'+ storeItem.get('HG') );
						}
					}*/
				},
		        
			]
    	}]
	});




