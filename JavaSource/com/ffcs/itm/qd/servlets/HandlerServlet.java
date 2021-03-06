package com.ffcs.itm.qd.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import com.ffcs.itm.qd.commons.Constants;
import com.ffcs.itm.qd.commons.FileHelper;
import com.ffcs.itm.qd.commons.ReflectHelper;
import com.ffcs.itm.qd.commons.XmlHelper;
import com.ffcs.itm.qd.dao.HandlerDao;
import com.ffcs.itm.qd.exception.ApplicationException;
import com.ffcs.itm.qd.exception.ErrorCenter;
import com.ffcs.itm.qd.exception.SystemException;
import com.ffcs.itm.qd.model.*;

@SuppressWarnings("serial")
public class HandlerServlet extends HttpServlet {
	public final static int GET_FLOW_MOD = 0;
	public final static int GET_TABLE_FIELDS = 1;
	public final static int GET_FORM_ID = 2;
	public final static int PUSH_INTO_TABLE=10;
	
	public final static int GET_SYS_CONFIG=3;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		int tag = Integer.parseInt(request.getParameter("tag"));
		response.setContentType(Constants.XML_CONTENT_TYPE);
		PrintWriter out = response.getWriter();
		StringBuffer xmlReturn = new StringBuffer(XmlHelper.XML_HEAD);
		Document doc = null;
		Element root=null;
		SAXReader reader = new SAXReader();
		try {
			switch (tag) {
			case GET_FLOW_MOD:
				doc=reader.read(request.getInputStream());
				xmlReturn.append(HandlerDao.get_flow_mod(doc));
				break;
			case GET_TABLE_FIELDS:
				doc=reader.read(request.getInputStream());
				xmlReturn.append(HandlerDao.get_table_fields(doc));
				break;
			case GET_FORM_ID:
				xmlReturn.append(HandlerDao.get_form_id());
				break;
			case GET_SYS_CONFIG:
				xmlReturn.append(HandlerDao.get_sys_config());
				break;
			case PUSH_INTO_TABLE:
					doc=reader.read(request.getInputStream());
					root=doc.getRootElement();
					List<Forms> forms=ReflectHelper.ObjectFromDocument(root,Forms.class);
					List<Data_tables> data_tables=ReflectHelper.ObjectFromDocument(root,Data_tables.class);
					List<Table_reference> table_reference=ReflectHelper.ObjectFromDocument(root,Table_reference.class);
					List<Form_tables> form_tables=ReflectHelper.ObjectFromDocument(root,Form_tables.class);
					List<Data_table_fields> data_table_fields=ReflectHelper.ObjectFromDocument(root,Data_table_fields.class);
					List<Form_element> form_element=ReflectHelper.ObjectFromDocument(root,Form_element.class);
					List<Form_element_bind> form_element_bind=ReflectHelper.ObjectFromDocument(root,Form_element_bind.class);
					List<Tache_form> tache_form=ReflectHelper.ObjectFromDocument(root,Tache_form.class);
					List<Form_element_right> form_element_right=ReflectHelper.ObjectFromDocument(root,Form_element_right.class);
					List<Flow_form_element_right> flow_form_element_right=ReflectHelper.ObjectFromDocument(root,Flow_form_element_right.class);
					
					List<String> forms_insert_string=ReflectHelper.insertStringFromModel(forms, Forms.class);
					List<String> data_tables_insert_string=ReflectHelper.insertStringFromModel(data_tables, Data_tables.class);
					List<String> table_reference_string=ReflectHelper.insertStringFromModel(table_reference, Table_reference.class);
					List<String> form_tables_string=ReflectHelper.insertStringFromModel(form_tables, Form_tables.class);
					List<String> data_table_fields_string=ReflectHelper.insertStringFromModel(data_table_fields, Data_table_fields.class);
					List<String> form_element_string=ReflectHelper.insertStringFromModel(form_element, Form_element.class);
					List<String> form_element_bind_string=ReflectHelper.insertStringFromModel(form_element_bind, Form_element_bind.class);
					List<String> form_element_right_string=ReflectHelper.insertStringFromModel(form_element_right, Form_element_right.class);
					List<String> tache_form_string=ReflectHelper.insertStringFromModel(tache_form, Tache_form.class);
					List<String> flow_form_element_right_string=ReflectHelper.insertStringFromModel(flow_form_element_right, Flow_form_element_right.class);
					
					///////////////////////////
					System.out.println(forms_insert_string);
					System.out.println(data_tables_insert_string);
					System.out.println(table_reference_string);
					System.out.println(form_tables_string);
					System.out.println(data_table_fields_string);
					System.out.println(form_element_string);
					System.out.println(form_element_bind_string);
					System.out.println(form_element_right_string);
					System.out.println(tache_form_string);
					System.out.println(flow_form_element_right_string);
					//////////////////////////
					
					
					List<List<String>> inserts=new ArrayList<List<String>>();
					if(null!=forms_insert_string) inserts.add(forms_insert_string);
					if(null!=data_tables_insert_string) inserts.add(data_tables_insert_string);
					if(null!=table_reference_string) inserts.add(table_reference_string);
					if(null!=form_tables_string) inserts.add(form_tables_string);
					if(null!=data_table_fields_string) inserts.add(data_table_fields_string);
					if(null!=form_element_string) inserts.add(form_element_string);
					if(null!=tache_form_string) inserts.add(tache_form_string);
					if(null!=form_element_bind_string) inserts.add(form_element_bind_string);
					if(null!=form_element_right_string) inserts.add(form_element_right_string);
					if(null!=flow_form_element_right_string) inserts.add(flow_form_element_right_string);
					xmlReturn.append(HandlerDao.push_into_table(inserts));
					long filename=FileHelper.writeToFile(inserts);
					out.write(xmlReturn.toString().replace("<error_code>0</error_code>", "<error_code>"+String.valueOf(filename)+"</error_code>"));
					return;
			default:
				break;
			}
			out.write(xmlReturn.toString());
		} catch (ApplicationException e) {
			out.print(XmlHelper.ERROR_XML.replace("<error_code>1</error_code>", "<error_code>"+e.getMessage()+"</error_code>"));
			System.out.println(ErrorCenter.doError(e));
		} catch (SystemException e) {
			out.print(XmlHelper.ERROR_XML.replace("<error_code>1</error_code>", "<error_code>"+e.getMessage()+"</error_code>"));
			System.out.println(ErrorCenter.doError(e));
		} catch (Exception e) {
			out.print(XmlHelper.ERROR_XML.replace("<error_code>1</error_code>", "<error_code>"+e.getMessage()+"</error_code>"));
			e.printStackTrace();
		}
	}
}
