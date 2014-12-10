package com.ffcs.itm.qd.commons;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import org.dom4j.Element;

public class ReflectHelper {
	@SuppressWarnings("unchecked")
	public static <E>  List<E> ObjectFromDocument(Element root,Class<E> clazz) throws InstantiationException, IllegalAccessException, SecurityException, NoSuchFieldException{
		List<E> returns=null;
		E e=null;
		Field field=null;
		//获得类名
		String className=clazz.getName().substring(clazz.getName().lastIndexOf(".")==-1?0:clazz.getName().lastIndexOf(".")+1);
		//获得类名对应的XML
		Element cls=root.element(className);
		//获得各个xml数据
		List<Element> lists=cls.elements();
		if(lists!=null&&!lists.isEmpty()){
			returns=new ArrayList<E>();
			for(int i=0;i<lists.size();i++){
				Element ele=lists.get(i);
				e=(E)clazz.newInstance();
				List<Element> items=ele.elements();
				for(int j=0;j<items.size();j++){
					Element item=items.get(j);
					field=clazz.getDeclaredField(item.getName());
					field.set(e, item.getText());
				}
				returns.add(e);
			}
		}
		return returns;
	}
	
	public static <E> List<String> insertStringFromModel(List<E> lists,Class<E> clazz) throws IllegalArgumentException, IllegalAccessException{
		//获得类名
		String className=clazz.getName().substring(clazz.getName().lastIndexOf(".")==-1?0:clazz.getName().lastIndexOf(".")+1);
		List<String> strings=null;
		StringBuffer sb=null;
		List<String> values=null;
		E e=null;
		if(lists!=null&&!lists.isEmpty()){
			strings=new ArrayList<String>();
			System.out.println("--开始-"+clazz.getName()+"-------------------------------------------------");
			for(int i=0;i<lists.size();i++){
				e=(E)lists.get(i);
				sb=new StringBuffer();
				values=new ArrayList<String>();
				sb.append("insert into ")
					.append(className).append("(");
				Field[] fields=clazz.getDeclaredFields();
				for(Field field:fields){
					sb.append(field.getName().substring(field.getName().lastIndexOf(" ")+1)).append(",");
					values.add("'"+field.get(e).toString()+"'");
				}
				sb=new StringBuffer(sb.toString().subSequence(0, sb.toString().length()-1));
				sb.append(") values(");
				String[] array=new String[values.size()];
				sb.append(StringUtils.join(values.toArray(array),","));
				sb.append(")");
				System.out.println(sb.toString());
				strings.add(sb.toString());
			}
			System.out.println("--结束--------------------------------------------------");
			System.out.println("\n\n");
		}		
		return strings;
	}
}
