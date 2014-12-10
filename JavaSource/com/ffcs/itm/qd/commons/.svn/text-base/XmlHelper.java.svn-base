package com.ffcs.itm.qd.commons;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import javax.servlet.http.HttpServletResponse;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import com.ffcs.itm.qd.exception.SystemException;

public class XmlHelper {
	
	/**
     * 提供XML头格式
     */
    public static final String XML_HEAD      = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

    public static final String SUCCESS_XML   = "<root><error_code>0</error_code></root>";
    
    public static final String ERROR_XML   = "<root><error_code>1</error_code></root>";

	/**
     * 编码XML,将一些特殊字符如'&','<','>','"'进行转译
     * 
     * @param str
     *            需要编码的字符串
     * @return 编码后的字符串
     */
    public static String Encode(String str)
    {
        str = StringUtils.toNoNull(str);
        StringBuffer tmp = new StringBuffer();
        for (int i = 0; i < str.length(); i++)
        {
            char a = str.charAt(i);
            if (a == '&')
            {
                tmp.append("&amp;");
            }
            else if (a == '<')
            {
                tmp.append("&lt;");
            }
            else if (a == '>')
            {
                tmp.append("&gt;");
            }
            else if (a == '"')
            {
                tmp.append("&quot;");
            }
            else
            {
                tmp.append(a);
            }
        }
        return tmp.toString();
    }
    
    public static String rsToXML(ResultSet rs) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
        xmlReturn.append("<root>");
        xmlReturn.append("<rows>");
        int i = 0;
        try
        {
            ResultSetMetaData rsmd = rs.getMetaData();
            String[] labels = new String[rsmd.getColumnCount()];
            String tagName;
            for (i = 0; i < labels.length; i++)
            {
                labels[i] = rsmd.getColumnLabel(i + 1);
            }
            while (rs.next())
            {
                xmlReturn.append("<row>");
                for (i = 1; i <= labels.length; i++)
                {
                    tagName = Encode(labels[i - 1].toLowerCase());
                    xmlReturn.append("<").append(tagName).append(">");
                    xmlReturn.append(Encode(rs.getString(i)));
                    xmlReturn.append("</").append(tagName).append(">");
                }
                xmlReturn.append("</row>");
            }
            xmlReturn.append("</rows>");
            xmlReturn.append("</root>");
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }
    
	public static String getSingleParam(Document doc, String node)
			throws SystemException {
		Element ele = null;
		try {
			ele = (Element) doc.selectSingleNode("/root/" + node);
		} catch (Exception e) {
			 throw new SystemException("380045", e);
		}
		return ele.getText();
	}
	
	/*@SuppressWarnings("unchecked")
	public static String[] getMutiParams(Document doc, String node)
			throws SystemException {
		List<Element> eles = null;
		try {
			eles = (List<Element>)doc.selectNodes("/root/" + node);
		} catch (Exception e) {
			 throw new SystemException("380045", e);
		}
		String[] params=new String[eles.size()];
		for(int i=0;i<eles.size();i++){
			params[i]=eles.get(i).getText();
		}
		return params;
	}*/
	
    public static void outXML(HttpServletResponse resp, String xmlString)
            throws SystemException
    {
        OutputFormat out = new OutputFormat();
        out.setEncoding("utf-8");
        out.setNewlines(true);
        try
        {
            XMLWriter output = new XMLWriter(resp.getOutputStream(), out);
            output.write(xmlString);
        }
        catch (UnsupportedEncodingException ex)
        {
            throw new SystemException("380008", ex);
        }
        catch (IOException ex)
        {
            throw new SystemException("380008", ex);
        }
    }
}
