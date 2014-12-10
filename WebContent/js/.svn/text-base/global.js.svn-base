var table_names = [];//存放输入的表名
            var flow_mod = null;//存放输入的flow_mod
            var tache_mod_array=[];//存放根据输入的flow_mod查询返回的环节信息
            var Data_table_fields_array = [];
            var Data_tables_array = [];
            var Flow_form_element_right_array = [];
            var Form_element_right_array = [];
            var Form_element_array = [];
            var Form_tables_array = [];
            var Form_element_bind_array = [];
            var Table_reference_array = [];
            var Forms_array = [];
            var Tache_form_array = [];
            var xmlHead = '<?xml version="1.0" encoding="utf-8"?>';
            var table_fields_array=[];//表字段标识
            var form_element_id_array=[];//表单元素标识
            var form_element_right_id_array=[];
            /**
             * 关闭当前页面
             */
            function CloseRootWindow(){
                window.opener = null;
                window.open('', '_self');
                window.close();
            }
            
            /**
             * 生成完成的xml数据
             */
            function getXml(){
                var result = '<Root>';
                var Data_table_fields = '<Data_table_fields>';
                var Data_tables = '<Data_tables>';
                var Flow_form_element_right = '<Flow_form_element_right>';
                var Form_element_right = '<Form_element_right>';
                var Form_element = '<Form_element>';
                var Form_tables = '<Form_tables>';
                var Form_element_bind = '<Form_element_bind>';
                var Table_reference = '<Table_reference>';
                var Forms = '<Forms>';
                var Tache_form = '<Tache_form>';
                
                for (var i = 0; i < Forms_array.length; i++) {
                    var _forms = '<forms>';
                    var item = Forms_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _forms += str;
                    }
                    _forms += '</forms>';
                    Forms += _forms;
                }
                
                for (var i = 0; i < Data_tables_array.length; i++) {
                    var _data_tables = '<data_tables>';
                    var item = Data_tables_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _data_tables += str;
                    }
                    _data_tables += '</data_tables>';
                    Data_tables += _data_tables;
                }
                
                for (var i = 0; i < Form_tables_array.length; i++) {
                    var _form_tables = '<form_tables>';
                    var item = Form_tables_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _form_tables += str;
                    }
                    _form_tables += '</form_tables>';
                    Form_tables += _form_tables;
                }
                
                for (var i = 0; i < Table_reference_array.length; i++) {
                    var _table_reference = '<table_reference>';
                    var item = Table_reference_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _table_reference += str;
                    }
                    _table_reference += '</table_reference>';
                    Table_reference += _table_reference;
                }
                
                for (var i = 0; i < Data_table_fields_array.length; i++) {
                    var _data_table_fields = '<data_table_fields>';
                    var item = Data_table_fields_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _data_table_fields += str;
                    }
                    _data_table_fields += '</data_table_fields>';
                    Data_table_fields += _data_table_fields;
                }
                
                for (var i = 0; i < Form_element_array.length; i++) {
                    var _form_element = '<form_element>';
                    var item = Form_element_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _form_element += str;
                    }
                    _form_element += '</form_element>';
                    Form_element += _form_element;
                }
                
                for (var i = 0; i < Form_element_bind_array.length; i++) {
                    var _form_element_bind = '<form_element_bind>';
                    var item = Form_element_bind_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _form_element_bind += str;
                    }
                    _form_element_bind += '</form_element_bind>';
                    Form_element_bind += _form_element_bind;
                }
                
                for (var i = 0; i < Tache_form_array.length; i++) {
                    var _tache_form = '<tache_form>';
                    var item = Tache_form_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _tache_form += str;
                    }
                    _tache_form += '</tache_form>';
                    Tache_form += _tache_form;
                }
                
                for (var i = 0; i < Form_element_right_array.length; i++) {
                    var _form_element_right = '<form_element_right>';
                    var item = Form_element_right_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _form_element_right += str;
                    }
                    _form_element_right += '</form_element_right>';
                    Form_element_right += _form_element_right;
                }
                
                for (var i = 0; i < Flow_form_element_right_array.length; i++) {
                    var _flow_form_element_right = '<flow_form_element_right>';
                    var item = Flow_form_element_right_array[i];
                    for (var key in item.data) {
                        var str = '<' + key + '>' + item.data[key] + '</' + key + '>';
                        _flow_form_element_right += str;
                    }
                    _flow_form_element_right += '</flow_form_element_right>';
                    Flow_form_element_right += _flow_form_element_right;
                }
                
                Data_table_fields = Data_table_fields + '</Data_table_fields>';
                Data_tables = Data_tables + '</Data_tables>';
                Flow_form_element_right = Flow_form_element_right +'</Flow_form_element_right>';
                Form_element_right = Form_element_right + '</Form_element_right>';
                Form_element = Form_element + '</Form_element>';
                Form_tables = Form_tables + '</Form_tables>';
                Form_element_bind = Form_element_bind + '</Form_element_bind>';
                Table_reference = Table_reference + '</Table_reference>';
                Forms = Forms + '</Forms>';
                Tache_form = Tache_form + '</Tache_form>';
                
                
                result += Forms;
                result += Data_tables;
                result += Form_tables;
                result += Table_reference;
                result += Data_table_fields;
                result += Form_element;
                result += Form_element_bind;
                result += Tache_form;
                result += Form_element_right;
                result += Flow_form_element_right;
                
                result += '</Root>';
                return result;
            }
            
            /**
             * 对已提交的记录的更新.删除
             */
            function previous(btn, array,model){
            	
            	var grid=new Ext.ffcs.EasyGrid({
            		data:array,
            		Record:model
            	});
            	
            	var windows_grid=new Ext.Window({
            		title:'数据操作',
            		width:'100%',
            		modal:true,
            		autoScroll:true,
            		items:[grid],
            		layout:'fit',
            		animateTarget:btn.el.dom.id
            	});
            	
            	windows_grid.show();
            }
            
            /**
             * 数据处理完毕
             */
            function next(button, array, _item){
                if (button.ownerCt.ownerCt.getForm().isValid()) {
                	MsgTip.msg('消息', '数据配置完成,点击"删除修改"可进行操作',true,3);
                    button.ownerCt.ownerCt.getForm().items.each(function(item, index, length){
                        _item.set(item.getName(), item.getValue());
                    });
                    array.push(_item);
                    var _null = _item.copy();
                    for (var key in _null.data) {
                        if (key == 'form_id') 
                            _null.data[key] = Ext.getCmp('form_id_forms').el.dom.value;
                        else 
                            _null.data[key] = '';
                    }
                    button.ownerCt.ownerCt.getForm().loadRecord(_null);
                }
            }
            
            /**
             * 流程模版查询---项
             */
            var flow_mod_table_name_input = new Ext.FormPanel({
                header: false,
                id: 'flow_mod_table_names_formpanel',
                defaultType: 'textfield',
                bodyStyle: "padding:5px 5px 0",
                defaults: {
                    labelSeparator: ':',
                    labelWidth: 50,
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: 'FLOW_MOD',
                    name: 'flow_mod',
                    id: 'flow_mod',
                    allowBlank: false,
                    regex: /^[0-9]{1,6}$/,
                    regexText: '请输入数字'
                }, {
                    fieldLabel: 'TABLE_NAMES',
                    name: 'tns',
                    id: 'tns',
                    emptyText: '多表请用逗号隔开',
                    allowBlank: false
                }],
                tbar: [{
                    text: '点击验证FLOW_MOD',
                    handler: function(){
                        if (Ext.getCmp('flow_mod_table_names_formpanel').getForm().isValid()) {
                        	//插入查询flow_mod的结果
                        	Ext.Ajax.request({
                        		url:'/handler?tag=0',
                        		method:'post',
                        		xmlData:xmlHead+'<root>'+'<flow_mod>'+Ext.getCmp('flow_mod').el.dom.value+'</flow_mod>'+'</root>',
                        		success:function(response,opts){
									var doc=response.responseXML;
									var root=doc.documentElement||doc;
									var rows=Ext.query('row',root);
									if(rows==null||rows.length==0){
										Ext.MessageBox.alert('提示','对应的流程不存在!!!')
									}else{
										Ext.each(rows,function(item,index,length){
											var row=[];
											row.push(item.childNodes[0].firstChild.nodeValue);
											row.push(item.childNodes[1].firstChild.nodeValue);
											tache_mod_array.push(row);
										});
										Ext.getCmp('flow_mod').setDisabled(true);
										Ext.getCmp('start').setDisabled(false);
									}
                        		},
                        		failure:function(response ,opts){
                        			Ext.MessageBox.alert('提示','查询出错!!!')
                        		}
                        	});
                        }
                    }
                }]
            });
            
            /**
             * 进入首页弹出的流程模版定制和数据库表单表输入窗口
             */
            var win = new Ext.Window({
                layout: 'fit',
                height: 160,
                width: 400,
                title: '流程模版定制和表单表输入窗口',
                modal: true,
                plain: true,
                items: [flow_mod_table_name_input],
                buttonAlign: 'center',
                buttons: [{
                    text: '开始进行流程配置',
                    id: 'start',
                    disabled: true,
                    handler: function(){
                    	//绑定表名称
                        var table_namess = Ext.getCmp('tns').el.dom.value.split(',');
                        for (var i = 0; i < table_namess.length; i++) {
                            var temp = [];
                            temp.push(table_namess[i]);
                            temp.push(table_namess[i]);
                            table_names.push(temp);
                        }
                        
                        var tbs = Ext.query('input[name^=table_name],input[name$=main_table],input[name$=sub_table]');
                        tbs = Ext.DomQuery.filter(tbs, 'input[name^=table_name_cn]', true);//过滤掉
                        Ext.each(tbs, function(item, index){
                            Ext.getCmp(item.id).getStore().loadData(table_names);
                            //Ext.getCmp(item.id).setValue(table_names == null || table_names.length == 0 ? "" : table_names[0][0]);
                        });
                        
                        //绑定环节信息
                        var tache_mods = Ext.query('input[name^=tache_mod],input[name^=tch_mod]');
                        Ext.each(tache_mods, function(item, index){
                            Ext.getCmp(item.id).getStore().loadData(tache_mod_array);
                            Ext.getCmp(item.id).setValue(tache_mods == null || tache_mods.length == 0 ? "" : tache_mods[0][0]);
                        });
                        
                        //绑定流程模版信息
                        var flow_mod = Ext.query('input[name^=flow_mod]');
                        Ext.each(flow_mod, function(item, index){
                            Ext.getCmp(item.id).setValue(Ext.getCmp('flow_mod').getValue());
                            Ext.getCmp(item.id).setDisabled(true);
                        });
                        win.hide();
                    }
                }, {
                    text: '退出流程配置',
                    handler: function(){
                        window.opener = null;
                        window.open('', '_self');
                        window.close();
                    }
                }]
            });
            
            win.on('beforeclose', function(panel){
                CloseRootWindow();
            });