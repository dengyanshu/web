Ext.define("core.xm_oba.view.ChartView",{
		    extend:'Ext.panel.Panel',
		    alias:'widget.xm_oba_chartview',
    		region:'south',
    		frame:true,
    		layout:'fit',
    		height:270,
    		items:[{
    		    xtype:'chart',
	    		animate:true,
				shadow:true,
				theme:'Category4',
    			store:'core.xm_oba.store.Store',
				//legend:{position:'top'},
				axes:[
					{
						type:'Numeric',
						position:'left',
						fields:['SMTOQCBN','RemarkOK'],
						//title:'',
						//grid:true,
						majorTickSteps:10,
						maximum:10
					},
					{
						type:'Numeric',
						position:'right',
						fields:['HG'],
						//title:'',
						grid:true,
						majorTickSteps:10,
						maximum:10
					},
					{
						type:'Category',
						position:'bottom',
						fields:['product_starttime']
						//title:''
					}
				],
				series:[
					{
						type:'line',
						axis:'right',
						gutter:80,
						highlight:true,
						//style: {width: 30},
						//title:['合格率'],
						label: {
                            display: 'top',
                            'text-anchor': 'middle',
                            field: 'HG',
                            renderer: Ext.util.Format.numberRenderer('0'),
                           // orientation: 'vertical',
                            //color: '#333'
                        },
						xField:'product_starttime',// StartTime ProductFamilyName
						yField:['HG'],
						stacked:true,
						tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								 this.setTitle(storeItem.get('StartTime')+"-"+storeItem.get('EndTime') + '合格率:'+ storeItem.get('HG') );
							}
						}
					}
					,
					{
						type:'column',
						axis:'left',
						gutter:80,
						highlight:true,
						//style: {width: 30},
						title:['送检批数','合格批数'],
						label: {
                            display: 'insideEnd',
                            'text-anchor': 'middle',
                            field: ['SMTOQCBN','RemarkOK'],
                            renderer: Ext.util.Format.numberRenderer('0'),
                           // orientation: 'vertical',
                            color: '#333'
                        },
						
						xField:'product_starttime',
						yField:['SMTOQCBN','RemarkOK'],
						stacked:true
						/*,tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								 this.setTitle(storeItem.get('StartTime')+"-"+storeItem.get('EndTime') + '送检批数:'+ item );
							}
						}
						*/
					}
			        
				]
	    	}]
    	})