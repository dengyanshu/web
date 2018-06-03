var colors=new Array("0000FF","00FF33","9900CC","FF0000","336600","FFFF00","FF0099","CCFF00","990066","90EE90","CC00FF","33FFFF");

Ext.define("core.plan_kanban.view.PlanLinesManufacture",{
			extend:'Ext.grid.Panel',
			alias:'widget.planlinesmanufacture',
			store: Ext.create('Ext.data.Store', {
				    fields:['name', 'number','timeInterval'],
				    data:{'items':[
				        { 'name': 'A线',  "number":"1","timeInterval":"MO12345678910# ( 02:30 ~ 05:00),MO12345678910# ( 08:30 ~ 10:00)" },
				        { 'name': 'B线',   "number":"2","timeInterval":"MO12345678910#( 02:30 ~ 05:00),MO12345678910#( 08:30 ~ 10:00)"},
				        { 'name': 'C线',   "number":"3","timeInterval":"MO12345678910# ( 02:30 ~ 05:00),MO12345678910# ( 15:30 ~ 18:00),MO12345678910 #( 20:30 ~ 23:00)" },
				        { 'name': 'D线',   "number":"4","timeInterval":"MO12345678910#( 02:30 ~ 05:00),MO12345678910#( 05:30 ~ 08:00),MO12345678910 #( 10:30 ~ 15:00),MO12345678910 #( 18:30 ~ 22:00)" },
				         { 'name': 'E线',   "number":"7","timeInterval":"MO12345678910#( 02:30 ~ 05:00),MO12345678910#( 05:30 ~ 08:00),MO12345678910 #( 10:30 ~ 15:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00),MO12345678910 #( 18:30 ~ 22:00)" }
				    ]},
				    proxy: {
				        type: 'memory',
				        reader: {
				            type: 'json',
				            root: 'items'
				        }
				    }
				}),
			title: '明日计划排程安排 ( 三楼 )',
		    columns: [
		        { text: '线别',  dataIndex: 'name', width:80},
		        { text: '工单生产安排',xtype: 'templatecolumn',
		        			tpl: new Ext.XTemplate(
		        				'<section class="container">' +
										'{[this.check(values)]}'+
								'</section>',{
								defaultFormats : true,
								check : function(values) {
									var number = values.number;
									var timeInterval=values.timeInterval.split(",");
									var str="<div class=\"plan-progress\">";
									for(var i=0;i<number;i++){
										str=str+ '<div class="plan-progress-bar" style="width:'+100/number+'%; background-color:#'+colors[i]+'"><span class="plan-progress-val'+i%2+'">'+timeInterval[i].split("#")[0]+'</span><span class="plan-progress-val'+i%2+i%2+'">'+timeInterval[i].split("#")[1]+'</span></div>';
									}
									return str+"</div>";
								}
							}),
							flex:1 }
		   		 ],
		   	viewConfig:{
				forceFit:true,
				enableRowBody:true,
				getRowClass:function(record,rowIndex,p,store){
					if(rowIndex%2!=0){
						var cls="row-qianhui  .x-grid-cell";
						return cls;
					}
				}
			},
			tbar:[{
				xtype:'combo',
				fieldLabel:'楼层',
				store:Ext.create("Ext.data.Store",{
					fields:['key','floor'],
					data:[
						{"key":"1","floor":"一楼"},
						{"key":"2","floor":"二楼"},
						{"key":"3","floor":"三楼"},
						{"key":"4","floor":"四楼"},
						{"key":"5","floor":"五楼"},
						{"key":"6","floor":"六楼"}
					]
				}),
				labelAlign:'right',
				queryModel:'local',
				displayField:'floor',
				valueField:'key'		
			}]				
	});