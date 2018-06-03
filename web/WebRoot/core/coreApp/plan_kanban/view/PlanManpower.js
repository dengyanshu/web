
  var columnStore6 =  Ext.create('Ext.data.JsonStore', {
    	fields: ['day', 'data'],
	    data: [
	    	{day:"星期一",data:122},
	    	{day:"星期二",data:163},
	    	{day:"星期三",data:234},
	    	{day:"星期四",data:737},
	    	{day:"星期五",data:453},
	    	{day:"星期六",data:540},
	    	{day:"星期日",data:140}
	    ]
	});
	
Ext.define("core.plan_kanban.view.PlanManpower",{
		extend:'Ext.Panel',
		alias:'widget.planmanpower',
        title: '下周人力需求',
        layout: 'fit',
        items: {
            xtype: 'chart',
            animate: true,
            style: 'background:#fff',
            shadow: false,//阴影
            store: columnStore6,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data'],
                label: {
                   renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: '人数',
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['day']
              //  title: '分布'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                label: {
                    display: 'insideEnd',
                    field: 'data',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle',
                    contrast: true
                },
                xField: 'day',
                yField: ['data'],
                renderer: function(sprite, record, attr, index, store) {
                    var fieldValue = Math.random() * 20 + 10;
                    var value = (record.get('data') >> 0) % 5;
                    var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'][value];
                    return Ext.apply(attr, {
                        fill: color
                    });
                }
            }]
        }
    });