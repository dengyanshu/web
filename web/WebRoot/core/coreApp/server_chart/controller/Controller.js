var task_runner=new Ext.util.TaskRunner();
var task=null;

Ext.define("core.server_chart.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil :'core.util.MessageUtil'
	},
	init:function(){
		var self = this;
		coreApp = self;				
		this.control(
		{
            'server_chart_search button[ref=submit]': {
				   click:function(e,Opts){
				   	    var search=e.ownerCt.ownerCt;
						var main=search.ownerCt;
						var chart=main.down('server_chart_listview');
			            var serverName=search.getForm().findField('severname').getValue();
		                //var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult5.action',params:{severname:severname}});
		                var store = Ext.data.StoreManager.map['core.server_chart.store.Store'];
		                store.getProxy().extraParams={serverName:serverName};
		                var mychart=Ext.create('Ext.chart.Chart', {
								    width: 500,
								    height: 300, 
								    animate: true,
								    store: store,
								    legend : { 
							            display : "bottom",  spacing : 2,  
							            padding : 5,  
							            font : {
							                  name : 'Tahoma',  color : '#3366FF', 
							                  size : 20,  bold : true 
							                   }  
							               
						            },  
								    axes:[
								        {
								            type: 'Numeric',
								            minimum: 0,
				                			maximum: 100,
								            position: 'left',
								            fields: ['CPU', 'Memory','Disk','Cnt'],
								            label: {
								                renderer: Ext.util.Format.numberRenderer('0,0')
								            },
								            title: '当前值（百分比显示）',
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
								            fields: ['TIME'],
								            title: '时间',
								            grid:true
								        }
								    ],
								    series: [
								        {
								            type: 'line',
								            highlight: {
								                size: 7,
								                radius: 7
								            },
								            
								            xField: 'TIME',
								            yField: 'CPU',
								            markerConfig: {
								                type: 'cross',
								                size: 4,
								                radius: 4,
								                'stroke-width': 0
								            },
								            smooth: 3  
								        },
								        {
								            type: 'line',
								            highlight: {
								                size: 7,
								                radius: 7
								            },
								           
								            fill: true,
								            xField: 'TIME',
								            yField: 'Memory',
								            markerConfig: {
								                type: 'circle',
								                size: 4,
								                radius: 4,
								                'stroke-width': 0
								            },
								            smooth: 3  
								        },
								         {
								            type: 'line',
								            highlight: {
								                size: 7,
								                radius: 7
								            },
								           
								            fill: true,
								            xField: 'TIME',
								            yField: 'Disk',
								            markerConfig: {
								                type: 'cross',
								                size: 4,
								                radius: 4,
								                'stroke-width': 0
								            },
								            smooth: 3  
								        },
								         {
								            type: 'line',
								            highlight: {
								                size: 7,
								                radius: 7
								            },
								           
								            fill: true,
								            xField: 'TIME',
								            yField: 'Cnt',
								            markerConfig: {
								                type: 'circle',
								                size: 4,
								                radius: 4,
								                'stroke-width': 0
								            },
								            smooth: 3  
								        }
								    ]
								}
								);
								chart.add(mychart);
		                
		                var fresh = function () {
					       	store.load();
					        
            
				       
				               
				                 var sound=soundManager.createSound({
								      id: 'sound_id', 
								      url: 'MyDesktop/images/tjfail.wav'
								 });
								 soundManager.play('sound_id');
					    };
					    task_runner.start({
						     run: fresh,
						     interval: 5000
					    });
				   }
             },
             'window[id=8a81a0f05616420b0156165264340001_win]':{
				beforehide:function(e,Opts){
					task_runner.stopAll();
				}
			}
             
        });
	},	
	views: ['core.server_chart.view.Main',
		'core.server_chart.view.SearchView',
		'core.server_chart.view.ResultView'],
	stores: ['core.server_chart.store.Store'
	,'core.server_chart.store.ls.Store'],
	models: ['core.server_chart.model.Model']
});