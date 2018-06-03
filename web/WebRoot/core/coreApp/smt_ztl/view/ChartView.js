Ext.define("core.smt_ztl.view.ChartView",{
		    extend:'Ext.panel.Panel',
		    alias:'widget.smt_ztl_chartview',
    		region:'south',
    		frame:true,
    		layout:'fit',
    		height:270,
    		items:[{
    		    xtype:'chart',
	    		animate:true,
				shadow:true,
				theme:'Category4',
    			store:'core.smt_ztl.store.sl.Store',
				legend:{position:'top'},
				axes:[
					{
						type:'Numeric',
						position:'left',
						fields:['DefectQty'],
						//title:'',
						grid:true,
						majorTickSteps:10,
						maximum:10
					},{
						type:'Category',
						position:'bottom',
						fields:['BadCode']
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
						title:['不良TOP5'],
						label: {
                            display: 'insideEnd',
                            'text-anchor': 'middle',
                            field: 'HG',
                            renderer: Ext.util.Format.numberRenderer('0'),
                           // orientation: 'vertical',
                            color: '#333'
                        },
						xField:'BadCode',
						yField:['DefectQty'],
						stacked:true
						//,
						/*tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								 this.setTitle(storeItem.get('StartTime')+"-"+storeItem.get('EndTime') + '合格率:'+ storeItem.get('HG') );
							}
						}*/
					}
			        
				]
	    	}]
    	})