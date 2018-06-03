Ext.create("core.plan_kanban.view.PlanFloor",{
		extend:'Ext.Panel',
		alias:'widget.planfloor',
        title: '楼层计划生产状况表',
        layout: 'fit',
        closeAction:'hide',
        tbar: [{
            enableToggle: true,
            pressed: false,
            text: 'Donut(设置内圆)',
            toggleHandler: function(btn, pressed) {
                var chart = Ext.getCmp('chartCmp');
                //设置图标序列的模式
                chart.series.first().donut = pressed ? 35 : false;//内弧度
                chart.refresh();
            }
        }],
        items: {
            xtype: 'chart',
            id: 'chartCmp',
            animate: true,
            store: Ext.create('Ext.data.JsonStore', {
		    	fields: ['floor', 'data'],
			    data: [
			    	{floor:"二楼",data:20},
			    	{floor:"三楼",data:60},
			    	{floor:"四楼",data:60},
			    	{floor:"五楼",data:60},
			    	{floor:"六楼",data:30}
			    ]
			}),
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data',
                listeners:{
                itemclick:function(e,Otps){
                	console.log(e.storeItem.data.data);
                	console.log(e.storeItem.data.floor);
                }
                },
                showInLegend: true,
                donut: false,//内环状线圈
                tips: {//提示
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    var total = 0;
                    columnStore5.each(function(rec) {
                        total += rec.get('data');
                    });
                    this.setTitle(storeItem.get('floor') + ': ' 
                    	+ Math.round(storeItem.get('data')/total*100)
                    	+ '%');
                  }
                },
                highlight: {//高亮
                  segment: {
                    margin: 20
                  }
                },
                label: {
                    field: 'floor',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }
            }]
        }
    });