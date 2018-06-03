var task_runner=new Ext.util.TaskRunner();
var task=null;

Ext.define("core.hw_mo_chart.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil :'core.util.MessageUtil'
	},
	init:function(){
		var self = this;
		coreApp = self;				
		this.control(
		{
            'hw_mo_chart_search button[ref=submit]': {
				   click:function(e,Opts){
				   	    var search=e.ownerCt.ownerCt;
						var main=search.ownerCt;
						var chart=main.down('hw_mo_chart_listview');
			            var moname=search.getForm().findField('moname').getValue();
			            var zc=search.getForm().findField('zc').getValue();
		                //var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult5.action',params:{severname:severname}});
		                var store = Ext.data.StoreManager.map['core.hw_mo_chart.store.Store'];
		                store.removeAll();
		                store.getProxy().extraParams={moname:moname,zc:zc};
		                store.load();
		                var mychart=Ext.create('Ext.chart.Chart', {
								    width: 500,
								    height: 300, 
								    animate: true,
								    store: store,
								    legend : { 
							            display : "left",  
							            spacing : 2,  
							            padding : 5,  
							            font : {
							                  name : 'Tahoma',  color : '#3366FF', 
							                  size : 60,  bold : true 
							             }  
							               
						            },  
								    axes:[
								        {
								            type: 'Numeric',
								            minimum: 0,
				                			maximum: 600,
								            position: 'left',
								            fields: ['QTY1', 'QTY2'],
								            label: {
								                renderer: Ext.util.Format.numberRenderer('0,0')
								            },
								            title: '产出数：（QTY）',
								            grid: {
									            odd: {  
	                                            opacity: 1,  
	                                            fill: '#ddd',  
	                                            stroke: '#bbb',  
	                                            'stroke-width': 0.5  
	                                            },
	                                             even: {  
	                                            opacity: 1,  
	                                            fill: '#CCFFFF',  
	                                            stroke: '#bbb',  
	                                            'stroke-width': 0.5  
	                                            }
								            }
								        },
								        {
								            type: 'Category',
								            position: 'bottom',
								            fields: ['huaweitime'],
								            title: '时间',
								            grid:true
								        }
								    ],
								    series: [
								        {
								        	title:'实际产能',
								            type: 'line',
								            highlight: {
								                size: 7,
								                radius: 7
								            },
								            
								            xField: 'huaweitime',
								            yField: 'QTY1',
								            markerConfig: {
								                type: 'cross',
								                size: 4,
								                radius: 4,
								                'stroke-width': 0
								            },
								            tips: {
									          trackMouse: true,
									          width: 120,
									          height: 40,
									          renderer: function (storeItem, item) {
									               this.setTitle('时间：' + storeItem.get('huaweitime') + '<br />标产：'+storeItem.get('QTY1'));
									         }
									     	},
									     	  label: {
							                  display: 'over',
							                  'text-anchor': 'middle',
							                    field: 'QTY1',
							                    orientation: 'horizontal',
							                    fill: '#fff',
							                    font: '17px Arial'
							                }
								        },
								        {
								        	title:'标准产能',
								            type: 'line',
								            highlight: {
								                size: 7,
								                radius: 7
								            },
								           
								            fill: true,
								            xField: 'huaweitime',
								            yField: 'QTY2',
								            markerConfig: {
								                type: 'circle',
								                size: 4,
								                radius: 4,
								                'stroke-width': 0
								            }
								        }
								    ]
								}
								);
								chart.add(mychart);
		                
		                
				   }
             }
             
        });
	},	
	views: ['core.hw_mo_chart.view.Main',
		'core.hw_mo_chart.view.SearchView',
		'core.hw_mo_chart.view.ResultView'],
	stores: ['core.hw_mo_chart.store.Store',
	'core.hw_mo_chart.store.sl.Store'],
	models: ['core.hw_mo_chart.model.Model',
	'core.hw_mo_chart.model.sl.Model'
	]
});