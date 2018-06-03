/**
 * 模型工厂类
 */
Ext.define("factory.ModelFactory",{
	statics:{
		//定义两个键值对像models fields
		models:new Ext.util.MixedCollection(),	//key-value
		fields:new Ext.util.MixedCollection(),
		/**
		 * 根据类名获取Model
		 * @param {} modelName	
		 * @param {} excludes	排除
		 * @return {}
		 */
		getModelByName:function(modelName,excludes){
			//将类名做为参数
			var params={modelName:modelName};
			//排除参数
			if(!Ext.isEmpty(excludes)){
				params.excludes=excludes;
			}
			//如果模型名称不为空或是models键里面不包括此模型名则执行
			if(!Ext.isEmpty(modelName) && !this.models.containsKey(modelName)){
				//初始化fields为空
				var fields=[];
				//如果这个字段集中包括键名为modelName的参数则执行
				if(this.fields.containsKey(modelName)){
					fields=this.fields.get(modelName);
				}else{	//否则执行
					Ext.Ajax.request({
						url:'/web/pc/modelAction!getModelFields.action',
						method:'POST',
						params:params,
						timeout:4000,
						async:false,//很关键 我不需要异步操作
						success:function(response,opts){
							fields = Ext.decode(response.responseText);
						}
					});
					//把获取到的字段值保存以键值的形式保存到字段工厂中
					this.fields.add(modelName,fields);	
				}
				//定义一个模型类，设置该模型类的字段集
				var newModel=Ext.define(modelName,{
					extend:"Ext.data.Model",
					fields:fields
				});
				//把名称为modelName的模型添加到模型工厂中
				this.models.add(modelName,newModel);
			}
			return {modelName:modelName,model:this.models.get(modelName)};
		},
		/**
		 * 获取字段类型
		 * @param {} config
		 */
		getFields:function(config){
			var params={
				modelName:Ext.value(config.modelName,""),
				excludes:Ext.value(config.excludes,"")
			};
			var modelName=params.modelName;
			var fields=[];
			if(this.fields.containsKey(modelName)){
				fields=this.fields.get(modelName);
			}else{
				Ext.Ajax.request({
						url:'/web/pc/modelAction!getModelFields.action',
						method:'POST',
						params:params,
						timeout:4000,
						async:false,//很关键 我不需要异步操作
						success:function(response,opts){
							fields = Ext.decode(response.responseText);
						}
				});
				this.fields.add(modelName,fields);	
			}
			return fields;
		},
		/**
		 * 得到模型
		 * @param {} config
		 * @return {}
		 */
		getModel:function(config){
			var modelName=config.modelName;
			if(!this.models.containsKey(modelName)){
				var config=Ext.value(config,{});
				var fields=config.fields;
				if(Ext.isEmpty(fields)){
					fields=getFields(config);
				}
				var newModel=Ext.define(modelName,{
					extend:"Ext.data.Model",
					fields:fields
				});
				this.models.add(modelName,newModel);
			}
			return modelName;
		}
	}
});