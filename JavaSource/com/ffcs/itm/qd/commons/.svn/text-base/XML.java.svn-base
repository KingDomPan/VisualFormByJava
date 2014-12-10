/**************************************************
 * Copyright (c) 2005.
 * 文件名称: XML.java
 * 摘　　要: 提供常用一些XML的解析操作方法
 *
 * 当前版本: 1.0
 * 作　　者: 方旭尘
 * 完成日期: 2005-8-2
 **************************************************/
package com.ffcs.itm.qd.commons;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import com.ffcs.itm.qd.exception.ApplicationException;
import com.ffcs.itm.qd.exception.SystemException;

/**
 * <p>
 * XML解析操作的基本方法
 * </p>
 * 提供常用一些XML的解析操作方法
 * 
 * @author 方旭尘
 * @version 1.0
 */
public class XML
{
    /**
     * 提供XML头格式
     */
    public static final String XML_HEAD      = "<?xml version=\"1.0\" encoding=\"GBK\"?>";

    public static final String TREE_TAG_NAME = "MenuItem";

    public static final String SUCCESS_XML   = "<root><error_code>0</error_code></root>";

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

    /**
     * 将Document输出到Servlet输出流
     * 
     * @param resp
     *            HTTP应答对象
     * @param doc
     *            需要输出的Document对象
     * @throws SystemException
     */
    public static void outXML(HttpServletResponse resp, Document doc)
            throws SystemException
    {
        OutputFormat out = new OutputFormat();
        out.setEncoding("GB2312");
        out.setNewlines(true);
        try
        {
            XMLWriter output = new XMLWriter(resp.getOutputStream(), out);
            output.write(doc);
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

    public static void outXML(OutputStream outs, Document doc)
            throws SystemException
    {
        OutputFormat out = new OutputFormat();
        out.setEncoding("GB2312");
        out.setNewlines(true);
        try
        {
            XMLWriter output = new XMLWriter(outs, out);
            output.write(doc);
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

    /**
     * 为XML文本添加处理指令
     * 
     * @param xml
     *            XML文本字符串
     * @param target
     *            处理指令标识
     * @param data
     *            处理指令值
     * @return 添加处理指令后的XML文本
     */
    public static String addProcessingInstruction(String xml, String target,
            Map data)
    {
        StringBuffer returnVal = new StringBuffer(XML.XML_HEAD);
        returnVal.append(addProcessingInstruction(target, data));
        int beginIndex = XML.XML_HEAD.length();
        int endIndex = xml.length();
        returnVal.append(xml.substring(beginIndex, endIndex));
        return returnVal.toString();
    }

    public static String addProcessingInstruction(String target, Map data)
    {
        StringBuffer returnVal = new StringBuffer("<?");
        returnVal.append(target);
        Iterator keys = data.keySet().iterator();
        while (keys.hasNext())
        {
            String key = (String) keys.next();
            String val = (String) data.get(key);
            returnVal.append(" ");
            returnVal.append(key);
            returnVal.append("=\"");
            returnVal.append(val);
            returnVal.append("\"");
        }
        returnVal.append("?>");
        return returnVal.toString();
    }

    private static String rsToElement(ResultSet rs) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
        String tagName;
        String value;
        try
        {
            ResultSetMetaData rsmd = rs.getMetaData();
            if (rs.next())
            {
                for (int i = 1; i <= rsmd.getColumnCount(); i++)
                {
                    tagName = Encode(rsmd.getColumnLabel(i));
                    xmlReturn.append("<").append(tagName);
                    value = rs.getString(i);
                    if (value == null)
                    {
                        xmlReturn.append("/>");
                    }
                    else
                    {
                        xmlReturn.append(">");
                        xmlReturn.append(Encode(value));
                        xmlReturn.append("</").append(tagName).append(">");
                    }
                }
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }

    public static Document rsToXMLTree(ResultSet rs, HashMap xslMap)
            throws SystemException
    {
        Document treeDoc = DocumentHelper.createDocument();
        StringBuffer xml = new StringBuffer(XML.XML_HEAD);
        xml.append(XML.addProcessingInstruction("xml-stylesheet", xslMap));
        xml.append("<root>");
        xml.append("<error_code>0</error_code>");
        xml.append("<Menu>");
        List levels = new ArrayList();
        try
        {
            while (rs.next())
            {
                xml.append(rs.getString(1));
                levels.add(rs.getString(2));
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        xml.append("</Menu>");
        xml.append("</root>");
        try
        {
            treeDoc = DocumentHelper.parseText(xml.toString());
        }
        catch (DocumentException e)
        {
            throw new SystemException("380009", e);
        }
        Element menuRoot = (Element) treeDoc.selectSingleNode("/root/Menu");
        Iterator menus = menuRoot.elementIterator();
        int level, i = 0;
        List parents = new ArrayList();
        parents.add(0, menuRoot);
        while (menus.hasNext())
        {
            level = Integer.parseInt((String) levels.get(i));
            Element parent = (Element) parents.get(level - 1);
            Element item = (Element) menus.next();
            if (parent != item.getParent() && item.getParent().remove(item))
            {
                parent.add(item);
            }
            parents.add(level, item);
            i++;
        }
        return treeDoc;
    }

    public static Document rsToTree(ResultSet rs) throws SystemException
    {
        Document treeDoc = DocumentHelper.createDocument();
        Element root = treeDoc.addElement("root");
        Element errElement = root.addElement("error_code");
        errElement.setText("0");
        Element menuRoot = root.addElement("Menu");
        List parents = new ArrayList();
        parents.add(0, menuRoot);
        try
        {
            while (rs.next())
            {
                String id = rs.getString(1);
                String name = rs.getString(2);
                int level = rs.getInt(3);
                Element item = DocumentHelper.createElement(TREE_TAG_NAME);
                item.addAttribute("id", id);
                item.addAttribute("moduleID", id);
                item.addAttribute("label", name);

                Element parent = (Element) parents.get(level - 1);
                parent.add(item);
                parents.add(level, item);
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return treeDoc;
    }

    public static Document rsToTree(ResultSet rs, String[] cols)
            throws SystemException
    {
        Document treeDoc = DocumentHelper.createDocument();
        Element root = treeDoc.addElement("root");
        Element errElement = root.addElement("error_code");
        errElement.setText("0");
        Element menuRoot = root.addElement("Menu");
        List parents = new ArrayList();
        parents.add(0, menuRoot);
        int i = 0;
        String colLabel;
        String colVal;
        try
        {
            while (rs.next())
            {
                String id = rs.getString(1);
                String name = rs.getString(2);
                int level = rs.getInt(3);
                Element item = DocumentHelper.createElement(TREE_TAG_NAME);
                item.addAttribute("id", id);
                item.addAttribute("moduleID", id);
                item.addAttribute("label", name);

                for (i = 0; i < cols.length; i++)
                {
                    colLabel = cols[i];
                    colVal = rs.getString(i + 4);
                    item.addAttribute(colLabel, colVal);
                }

                Element parent = (Element) parents.get(level - 1);
                parent.add(item);
                parents.add(level, item);
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return treeDoc;
    }

    public static String rsToXML(ResultSet rs) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("<Msg>");
        xmlReturn.append(rsToElement(rs));
        xmlReturn.append("</Msg>");
        return xmlReturn.toString();
    }

    public static String rsToXMLNoKey(ResultSet rs) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
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
                xmlReturn.append("<rowSet>");
                for (i = 1; i <= labels.length; i++)
                {
                    tagName = Encode(labels[i - 1]);
                    xmlReturn.append("<").append(tagName).append(">");
                    xmlReturn.append(Encode(rs.getString(i)));
                    xmlReturn.append("</").append(tagName).append(">");
                }
                xmlReturn.append("</rowSet>");
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }


    public static String rsToXML(ResultSet rs, int key, boolean isAddAttribute)
            throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
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
                xmlReturn.append("<rowSet id=\"");
                xmlReturn.append(Encode(rs.getString(key)));
                xmlReturn.append("\">");
                for (i = 1; i <= labels.length; i++)
                {
                    if (isAddAttribute || i != key)
                    {
                        tagName = Encode(labels[i - 1]);
                        xmlReturn.append("<").append(tagName).append(">");
                        xmlReturn.append(Encode(rs.getString(i)));
                        xmlReturn.append("</").append(tagName).append(">");
                    }
                }
                xmlReturn.append("</rowSet>");
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int[] key, boolean isAddAttribute)
            throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
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
                xmlReturn.append("<rowSet");
                for (i = 0; i < key.length; i++)
                {
                    tagName = Encode(labels[key[i] - 1]);
                    xmlReturn.append(" ").append(tagName).append("=\"");
                    xmlReturn.append(Encode(rs.getString(key[i])));
                    xmlReturn.append("\"");
                }
                xmlReturn.append(">");
                for (i = 1; i <= labels.length; i++)
                {
                    if (isAddAttribute || !startWith(i, key))
                    {
                        tagName = Encode(labels[i - 1]);
                        xmlReturn.append("<").append(tagName).append(">");
                        xmlReturn.append(Encode(rs.getString(i)));
                        xmlReturn.append("</").append(tagName).append(">");
                    }
                }
                xmlReturn.append("</rowSet>");
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int key, boolean isAddAttribute,
            int hidden[]) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
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
                xmlReturn.append("<rowSet id=\"");
                xmlReturn.append(Encode(rs.getString(key)));
                xmlReturn.append("\">");
                for (i = 1; i <= labels.length; i++)
                {
                    if (!startWith(i, hidden) && (isAddAttribute || i != key))
                    {
                        tagName = Encode(labels[i - 1]);
                        xmlReturn.append("<").append(tagName).append(">");
                        xmlReturn.append(Encode(rs.getString(i)));
                        xmlReturn.append("</").append(tagName).append(">");
                    }
                }
                xmlReturn.append("</rowSet>");
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int[] key,
            boolean isAddAttribute, int hidden[]) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer("");
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
                xmlReturn.append("<rowSet");
                for (i = 0; i < key.length; i++)
                {
                    tagName = Encode(labels[key[i] - 1]);
                    xmlReturn.append(" ").append(tagName).append("=\"");
                    xmlReturn.append(Encode(rs.getString(key[i])));
                    xmlReturn.append("\"");
                }
                xmlReturn.append(">");
                for (i = 1; i <= labels.length; i++)
                {
                    if (!startWith(i, hidden)
                        && (isAddAttribute || !startWith(i, key)))
                    {
                        tagName = Encode(labels[i - 1]);
                        xmlReturn.append("<").append(tagName).append(">");
                        xmlReturn.append(Encode(rs.getString(i)));
                        xmlReturn.append("</").append(tagName).append(">");
                    }
                }
                xmlReturn.append("</rowSet>");
            }
        }
        catch (SQLException e)
        {
            throw new SystemException("380045", e);
        }
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int key, int rowCount,
            boolean isAddAttribute) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer(rsToXML(rs, key,
                isAddAttribute));
        xmlReturn.append("<recordCount>");
        xmlReturn.append(rowCount);
        xmlReturn.append("</recordCount>");
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int[] key, int rowCount,
            boolean isAddAttribute) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer(rsToXML(rs, key,
                isAddAttribute));
        xmlReturn.append("<recordCount>");
        xmlReturn.append(rowCount);
        xmlReturn.append("</recordCount>");
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int key, int rowCount,
            int[] hidden, boolean isAddAttribute) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer(rsToXML(rs, key,
                isAddAttribute, hidden));
        xmlReturn.append("<recordCount>");
        xmlReturn.append(rowCount);
        xmlReturn.append("</recordCount>");
        return xmlReturn.toString();
    }

    public static String rsToXML(ResultSet rs, int[] key, int rowCount,
            int[] hidden, boolean isAddAttribute) throws SystemException
    {
        StringBuffer xmlReturn = new StringBuffer(rsToXML(rs, key,
                isAddAttribute, hidden));
        xmlReturn.append("<recordCount>");
        xmlReturn.append(rowCount);
        xmlReturn.append("</recordCount>");
        return xmlReturn.toString();
    }

    public static String addXML(ResultSet rs, String xml)
            throws SystemException
    {
        int endIndex = xml.indexOf("</Msg>");
        StringBuffer xmlReturn = new StringBuffer(xml.substring(0, endIndex));
        xmlReturn.append(rsToElement(rs));
        return xmlReturn.toString();
    }

    public static String completeXML(String xml)
    {
        StringBuffer xmlReturn = new StringBuffer("<root>");
        xmlReturn.append("<error_code>0</error_code>");
        xmlReturn.append(xml);
        xmlReturn.append("</root>");
        return xmlReturn.toString();
    }

    public static String completeXML(String xml, String tagName)
    {
        StringBuffer xmlReturn = new StringBuffer("<root>");
        xmlReturn.append("<error_code>0</error_code>");
        xmlReturn.append("<").append(tagName).append(">");
        xmlReturn.append(XML.Encode(xml));
        xmlReturn.append("</").append(tagName).append(">");
        xmlReturn.append("</root>");
        return xmlReturn.toString();
    }

    public static boolean startWith(int value, int[] arrays)
    {
        boolean isInclude = false;
        for (int i = 0; i < arrays.length && !isInclude; i++)
        {
            isInclude = (value == arrays[i]);
        }
        return isInclude;
    }
}
