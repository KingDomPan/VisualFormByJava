Ext.onReady(function(){
                Ext.QuickTips.init();
                Ext.BLANK_IMAGE_URL = '../resources/images/default/s.gif';
                var detailEl = null;
                var contentPanel = {
                    xtype: 'panel',
                    id: 'content_panel',
                    region: 'center',
                    layout: 'card',
                    activeItem: 0,
                    width: 100,
                    margins: '2 5 5 0',
                    border: true,
                    items: [
                    	four_panel,
                    	data_table_fields_panel,
                    	form_element_panel,
                    	form_element_bind_panel,
                    	tache_form_panel,
                    	form_element_right_panel,
                    	flow_form_element_right_panel
                    ]
                };
                
                var detailsPanel = {
                    id: 'details_panel',
                    title: '配置说明',
                    bodyStyle: 'padding-bottom:10px;background:#eee;',
                    autoScroll: true,
                    html: '<p>点击配置项的子节点查看配置说明</p>',
                    bbar:[{
                    	text:'配置完成',
                    	icon:'../images/ruby.png',
                    	id:'finish',
                    	handler:function(){
                    		if(Forms_array.length==0) {Ext.MessageBox.alert('提示','表单页面表配置(forms)无数据!!!!');return;}
                    		if(Data_table_fields_array.length==0) {Ext.MessageBox.alert('提示','数据表字段信息配置(data_table_fields)无数据!!!!');return;}
                    		if(Form_element_array.length==0) {Ext.MessageBox.alert('提示','表单元素配置(form_element)无数据!!!!');return;}
                    		if(Form_element_bind_array.length==0) {Ext.MessageBox.alert('提示','表单元素字段绑定表(form_element_bind)无数据!!!!');return;}
                    		if(Tache_form_array.length==0) {Ext.MessageBox.alert('提示','环节表单关联流程配置(tache_form)无数据!!!!');return;}
                    		if(Form_tables_array.length==0) {Ext.MessageBox.alert('提示','表单页面与数据存储表关联配置(form_tables)无数据!!!!');return;}
                    		if(table_names.length>2){
                    			if(Table_reference_array.length==0){
						           Ext.MessageBox.alert('提示','存在主从表-主从表关系配置(table_reference)无数据!!!!');
						           return;         			
                    			}
                    		}
                    		
                    		Ext.Ajax.request({
									url : '/handler?tag=10',
									method:'post',
									success : function(response,options) {
										var doc = response.responseXML;
	      								var root=doc.documentElement||doc;
										var rows=Ext.query('error_code',root);
										var code=rows[0].nodeValue;
										var i_code='';
										try{
											i_code=parseInt(code);
										}catch(err){
										}
										if(typeof(i_code)=='number'){
											sql=i_code;
											Ext.getCmp('download_file').setDisabled(false);
											Ext.getCmp('finish').setDisabled(true);
											MsgTip.msg('消息', '配置完成,现在可以导出配置数据的insert语句,重新配置请刷新页面');
											Ext.MessageBox.alert('提示','数据后台执行成功!!!!');
										}else{
											Ext.MessageBox.alert('提示','表单流程配置出错!!!!\n'+code);
										}
									},
									failure:function(){
										Ext.MessageBox.alert('提示','数据后台执行出错!!!!');
									},
									xmlData : getXml()
								});
                    	}
                    },' ',{
                    	text:'导入sql文件',
                    	icon:'../images/up.png',
                    	handler:function(btn,e){
                    		//创建窗口进行文件选择输入
                    		var filewin=new Ext.Window({
                    			title:"文件上传",
                    			layout: 'fit',
                    			width:550,
                    			id:'filewin',
                    			height:130,
                    			modal: true,
                				plain: true,
                				items:[
                					p=new Ext.ffcs.LocalPanel({
                						fileUpload: true,
                						header:false,
                						id:'fileupload',
                						items:[{
                							xtype: 'fileuploadfield',
								            id: 'form_file',
								            name:'form_file',
								            vtype:'fileType',
								            vtypeText:'上传文件必须是.sql类型!!!',  
								            fileTypes:['sql'],
								            emptyText: 'Select an Sql file (not bigger than 2M)',
								            fieldLabel: 'Sql File',
								            allowBlank:false,
								            buttonText:'',
								            buttonCfg: {
								                iconCls: 'upload-icon'
								            }
                						}],
                						buttonAlign:'center',
                						buttons: [{
								            text: '上传',
								            handler: function(btn,e){
								                if(p.getForm().isValid()){
									                p.getForm().submit({
									                	method:'post',
									                    url: '/upload',
									                    waitTitle: '请稍后',
									                    waitMsg: '上传中...',
									                    success: function(form, action) {
									                        Ext.MessageBox.alert('提示',action.result.message,function(){
									                        	Ext.getCmp('filewin').close();
									                        });
									                    },
									                    failure: function(form, action) {
									                    	Ext.MessageBox.alert('提示', action.result.errors);
									                    }
									                });
								                }
								            }
								        },{
								            text: '重置',
								            handler: function(btn,e){
								                p.getForm().reset();
								            }
								        }]
                					})
                				]
                    		});
                    		filewin.show(this);
                    	}
                    },' ',{
                    	text:'导出sql文件',
                    	icon:'../images/down.png',
                    	disabled:true,
                    	id:'download_file',
                    	handler:function(){
							window.open('/downloadservlet?filename='+sql+'.sql','文件下载');								
                    	}
                    }]
                };
                
                var treePanel = new Ext.tree.TreePanel({
                    id: 'tree_panel',
                    title: '配置导航',
                    split: true,
                    minSize: 250,
                    autoScroll: true,
                    rootVisible: false,
                    lines: false,
                    singleExpand: true,
                    useArrows: true,
                    root: new Ext.tree.AsyncTreeNode({
							text:'配置项',
							expanded:true
						}),
                        loader: new Ext.ux.tree.XmlTreeLoader({
                            dataUrl: 'data/tree-data.xml',
							processAttributes: function(attr){
								if (attr.id) {
									attr.text = attr.title;
									attr.leaf=true;
								}
							}
                        }),
                    listeners: {
                            'render': function(tp){
                                tp.getSelectionModel().on('selectionchange', function(tree, n){
                                    if (n && n.leaf) {
                                       if (n.id == 'forms' || n.id == 'data_tables' ||
                        n.id == 'form_tables' ||
                        n.id == 'table_reference'){ 
                            Ext.getCmp('content_panel').layout.setActiveItem(0);
                            if(n.id=='forms') MsgTip.msg('消息', '配置左上方表单',true,2);
                            if(n.id=='data_tables') MsgTip.msg('消息', '配置左下方表单',true,2);
                            if(n.id=='table_reference') MsgTip.msg('消息', '配置右上方表单',true,2);
                            if(n.id=='form_tables') MsgTip.msg('消息', '配置右下方表单',true,2);
                        }
                        else{
                            Ext.getCmp('content_panel').layout.setActiveItem(n.id + '_panel');
                        }
                        if (!detailEl) {
                            var bd = Ext.getCmp('details_panel').body;
                            bd.update('').setStyle('background', '#fff');
                            detailEl = bd.createChild();
                        }
                        detailEl.hide().update(Ext.getDom(n.id + '_details').innerHTML).slideIn('l', {
                            stopFx: true,
                            duration: .2
                        });
                                    }
                                })
                            }
                        }
                });
                
              /*  treePanel.on('click', function(n){
                    var sn = this.selModel.selNode || {};
                    if (n.leaf && n.id != sn.id) {
                        if (n.id == 'forms' || n.id == 'data_tables' ||
                        n.id == 'form_tables' ||
                        n.id == 'table_reference'){ 
                            Ext.getCmp('content_panel').layout.setActiveItem(0);
                            if(n.id=='forms') MsgTip.msg('消息', '配置左上方表单',true,2);
                            if(n.id=='data_tables') MsgTip.msg('消息', '配置左下方表单',true,2);
                            if(n.id=='table_reference') MsgTip.msg('消息', '配置右上方表单',true,2);
                            if(n.id=='form_tables') MsgTip.msg('消息', '配置右下方表单',true,2);
                        }
                        else{
                            Ext.getCmp('content_panel').layout.setActiveItem(n.id + '_panel');
                        }
                        if (!detailEl) {
                            var bd = Ext.getCmp('details_panel').body;
                            bd.update('').setStyle('background', '#fff');
                            detailEl = bd.createChild();
                        }
                        detailEl.hide().update(Ext.getDom(n.id + '_details').innerHTML).slideIn('l', {
                            stopFx: true,
                            duration: .2
                        });
                    }
                });*/
                
                new Ext.Viewport({
                    layout: "border",
                    title: "表单流程可视化界面配置",
                    items: [{
                        xtype: 'box',
                        region: 'north',
                        applyTo: 'header',
                        height: 30
                    }, {
                        id: 'layout-browser',
                        region: 'west',
                        collapsible: true,
                        width: 300,
                        border: false,
                        split: true,
                        margins: '2 0 5 5',
                        minSize: 300,
                        maxSize: 500,
                        items: [treePanel, detailsPanel]
                    }, contentPanel]
                });
                win.show(this);
            });