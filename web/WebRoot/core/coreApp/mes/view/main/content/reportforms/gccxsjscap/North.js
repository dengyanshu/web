Ext.define("core.mes.view.main.content.reportforms.gccxsjscap.North",{
	extend:'Ext.chart.Chart',
	alias:'widget.result.north',
	height:200,
	animate:true,//动画效果
	bodyStyle:'padding:5px 5px 0',
	frame:true,
	style: 'background:#cacaca',  //背景颜色
    animate: true,			   //启动动画
    shadow: true,			   //阴影效果	
    store: "core.mes.store.reportforms.gccxsjscap.StoreSum",			   //数据集
    axes: [						//用来配置坐标，可以配置多个坐标。
    	{
    	   type: 'Numeric',	    //类型数字
    	   position: 'left',    //位置
     	   fields: ['1'],		//字段值
     	   title: '数量',
     	   label: {
              renderer: Ext.util.Format.numberRenderer('0,0')
            },
      	   grid: true,			//有网格
      	   grid:{
      	   		odd:{
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
      	   		}
      	   	
      	   },
     	   minimum: 0			//最小值
       },  	
       {
           type: 'Category',	//配置坐标的类型。一般用到的是Numeric、Category
           position: 'bottom',	//position：配置坐标的位置，比如：上下左右
           fields: ['0'],
   //        fields: ['0'],
           title: '工厂产线实际生产安排'
        }
     ],
     series: [				//序列  用来配置图表
     	{
           type: 'column',		//图表类型
           axis: 'left',		//相对于哪个坐标。因为坐标有多个，图表的高度，总的有个参照。
           highlight: true, 	//高亮显示
           tips: {				//设置鼠标移动到图表上时的提示信息
               trackMouse: true,
               width: 140,
               height: 28,
               renderer: function(storeItem,item) {
                   this.setTitle(storeItem.get('0') + ': ' 
                   + storeItem.get('1'));                  	
               }
           },
          //格式化
           renderer: function(sprite, record, attr, index, store) {//格式化重要函数         	
               var value = (record.get('1') >> 0) % 9;
               var color = [ "#94ae0a", "#115fa6","#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"][value];
               return Ext.apply(attr, {
                   fill: color
               });
           },               
		   label: { //设置图表上显示的文字。可以设置文字的位置、样式。但不是每个图表都有这个配置项。
		   		display: 'insideEnd',
				'text-anchor': 'middle',
				field: '1',
				renderer: Ext.util.Format.numberRenderer('0'),
				orientation: 'horizontal',  //文字方向   vertical
				fill: '#000',
                font: '14px Arial'
			},
			xField: '0', //图表x、y轴对应的字段
			yField: '1',
			style: {
           		 opacity: 0.93
      	    }
		}

	]
  
  });

  