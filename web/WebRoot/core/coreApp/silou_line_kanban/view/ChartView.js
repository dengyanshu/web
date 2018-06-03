Ext.define("core.silou_line_kanban.view.ChartView",{
		    extend:'Ext.panel.Panel',
		    alias:'widget.silou_line_kanban_chartview',
    		region:'south',
    		frame:true,
    		layout:'fit',
    		height:270,
    		items:[{
    		    xtype:'chart',
	    		animate:true,
				shadow:true,
				theme:'Category4',
    			store:'core.silou_line_kanban.store.Store',
				legend:{position:'top'},
				axes:[
					{
						type:'Numeric',
						position:'left',
						fields:['累计'],
						//title:'',
						grid:true,
						majorTickSteps:10,
						maximum:10
					},{
						type:'Category',
						position:'bottom',
						fields:['SpecificationName']
						//title:''
					}
				],
				series:[
					{
						type:'column',
						axis:'left',
						gutter:80,
						highlight:true,
						//style: {width: 30},
						title:['实际数量'],
						label: {
                            display: 'insideEnd',
                            'text-anchor': 'middle',
                            field: '累计',
                            renderer: Ext.util.Format.numberRenderer('0'),
                           // orientation: 'vertical',
                            color: '#333'
                        },
						xField:'SpecificationName',
						yField:['累计'],
						stacked:true,
						tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								//this.setTitle('该工站累计：'+String(item.value[1]));
								 this.setTitle(storeItem.get('fDate') + '-' +storeItem.get('SpecificationName') +"累计产出:"+ storeItem.get('累计') );
							}
						}
					}
			        
				]
	    	}]
    	})