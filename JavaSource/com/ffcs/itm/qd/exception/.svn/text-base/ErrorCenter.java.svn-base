package com.ffcs.itm.qd.exception;

/**************************************************
 * Copyright (c) 2005.
 * 文件名称: ErrorCenter.java
 * 摘　　要: 统一的异常处理类,对抛出的异常进行统一处理
 *
 * 当前版本: 1.0
 * 作　　者: 方旭尘
 * 完成日期: 2005-8-2
 **************************************************/
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletResponse;
import org.apache.log4j.Logger;
import com.ffcs.itm.qd.commons.Constants;
import com.ffcs.itm.qd.commons.DBCtrl;
import com.ffcs.itm.qd.commons.StringUtils;
import com.ffcs.itm.qd.commons.XML;
import com.ffcs.itm.qd.commons.XmlHelper;

/**
 * <p>
 * 统一的异常处理类
 * </p>
 * 对抛出的异常进行统一处理
 * 
 * @author 方旭尘
 * @version 1.0
 */
public class ErrorCenter
{
    // 根据错误代码从数据库中取得对应的错误信息的SQL
    private static final String SQL_ERROR_MESSAGE        = "SELECT CODE_NAME FROM TP_ERR_CODE WHERE CODE_ID = ?";

    private static Logger       log                      = Logger
                                                                 .getLogger(com.ffcs.itm.qd.exception.ErrorCenter.class);

    private static final String PKP_EXCEPTION_CODE       = "ORA-20055";

    private static final String PKP_EXCEPTION_UNLOG_CODE = "ORA-20056";

    private static final int    START_INDEX              = 11;

    /**
     * 根据指定的错误代码输出格式化的错误信息
     * 
     * @param errCode
     *            数据库中定义的异常编码
     * @return 异常的具体信息(用XML表示)
     */
    public static String doError(int errCode, boolean isAddHead)
    {
        StringBuffer xml = (isAddHead) ? new StringBuffer(XmlHelper.XML_HEAD)
                : new StringBuffer("");
        // 从数据库中取得错误代码对应的错误信息
        String errMsgArr[] = getErrorMessage(errCode);
        // 输出错误信息
        xml.append("<root>");
        xml.append("<error_code>").append(errCode).append("</error_code>");
        xml.append("<error_msg>").append(errMsgArr[0]).append("</error_msg>");
        xml.append("<solution>").append(errMsgArr[1]).append("</solution>");
        xml.append("</root>");
        return xml.toString();
    }

    public static String doError(int errCode)
    {
        return doError(errCode, true);
    }

    public static String doErrorJson(int errCode)
    {
        StringBuffer sbuf = new StringBuffer();
        // 从数据库中取得错误代码对应的错误信息
        String errMsgArr[] = getErrorMessage(errCode);
        // 输出错误信息
        sbuf.append("{");
        sbuf.append("success:false,");
        sbuf.append("error_msg:'").append(errMsgArr[0]).append("'");
        sbuf.append("}");
        return sbuf.toString();
    }

    /**
     * 直接将错误信息(不是错误代码)以XML形式输出
     * 
     * @param errMsg
     *            错误信息(不是错误代码)
     * @return 异常的具体信息(用XML表示)
     */
    public static String doError(String errMsg, boolean isAddHead)
    {
        StringBuffer xml = (isAddHead) ? new StringBuffer(XmlHelper.XML_HEAD)
                : new StringBuffer("");
        xml.append("<root>");
        xml.append("<error_code>-1</error_code>");
        xml.append("<error_msg>");
        xml.append(XML.Encode(errMsg));
        xml.append("</error_msg>");
        xml.append("</root>");
        return xml.toString();
    }
    
    public static String doError(String errMsg)
    {
        return doError(errMsg, true);
    }
    

    public static String doErrorJson(String errMsg)
    {
        StringBuffer sbuf = new StringBuffer();
        sbuf.append("{");
        sbuf.append("success:false,");
        sbuf.append("error_msg:'").append(errMsg).append("'");
        sbuf.append("}");
        return sbuf.toString();
    }

    /**
     * 直接将错误信息(不是错误代码)以XML形式输出
     * 
     * @param errMsg
     *            错误信息(不是错误代码)
     * @return 异常的具体信息(用XML表示)
     */
    public static String doError(String errMsg, boolean isAddHead, Throwable ex)
    {
        logError(ex);
        return doError(errMsg, isAddHead);
    }
    
    public static String doError(String errMsg, Throwable ex)
    {
        return doError(errMsg, true, ex);
    }

    public static String doErrorJson(String errMsg, Throwable ex)
    {
        logError(ex);
        return doErrorJson(errMsg);
    }

    /**
     * 根据指定的错误代码输出格式化的错误信息,并提供抛出的异常
     * 
     * @param errCode
     *            数据库中定义的异常编码
     * @param ex
     *            抛出的异常
     * @return 异常的具体信息(用XML表示)
     */
    public static String doError(int errCode, boolean isAddHead, Throwable ex)
    {
        // 还未提供对抛出异常的处理
        logError(ex);
        return doError(errCode, isAddHead);
    }

    public static String doError(int errCode, Throwable ex)
    {
        return doError(errCode, true, ex);
    }

    public static String doErrorJson(int errCode, Throwable ex)
    {
        logError(ex);
        return doErrorJson(errCode);
    }

    public static String doError(SystemException ex, boolean isAddHead)
    {
        Throwable exCause = ex.getCause();
        // 处理存储过程错误
        if (exCause != null
            && exCause instanceof SQLException
            && (exCause.getMessage().indexOf(PKP_EXCEPTION_CODE) != -1 || exCause
                    .getMessage().indexOf(PKP_EXCEPTION_UNLOG_CODE) != -1))
        {
            int end_index = exCause.getMessage().indexOf("ORA-", START_INDEX);
            return doError(exCause.getMessage().substring(START_INDEX,
                    end_index).trim());
        }
        return doError(Integer.parseInt(ex.getErrMsg()), isAddHead, exCause);
    }

    public static String doError(SystemException ex)
    {
        return doError(ex, true);
    }

    public static String doErrorJson(SystemException ex)
    {
        Throwable exCause = ex.getCause();
        // 处理存储过程错误
        if (exCause != null
            && exCause instanceof SQLException
            && (exCause.getMessage().indexOf(PKP_EXCEPTION_CODE) != -1 || exCause
                    .getMessage().indexOf(PKP_EXCEPTION_UNLOG_CODE) != -1))
        {
            int end_index = exCause.getMessage().indexOf("ORA-", START_INDEX);
            return doErrorJson(exCause.getMessage().substring(START_INDEX,
                    end_index).trim());
        }
        return doErrorJson(Integer.parseInt(ex.getErrMsg()), exCause);
    }

    public static String doError(ApplicationException ex)
    {
        return doError(ex, true);
    }
    
    public static String doError(ApplicationException ex, boolean isAddHead)
    {
        ex.outErrorMsg();
        return doError(ex.getErrMsg(), isAddHead, ex.getCause());
    }

    public static String doErrorJson(ApplicationException ex)
    {
        ex.outErrorMsg();
        return doErrorJson(ex.getErrMsg(), ex.getCause());
    }

    public static void doError(ServletResponse response, ApplicationException ex)
            throws IOException
    {
        response.setContentType(Constants.XML_CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        out.write(ErrorCenter.doError(ex));
        out.flush();
        out.close();
    }

    public static void doError(ServletResponse response, SystemException ex)
            throws IOException
    {
        response.setContentType(Constants.XML_CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        out.write(ErrorCenter.doError(ex));
        out.flush();
        out.close();
    }

    public static void doError(ServletResponse response, String eMsg)
            throws IOException
    {
        response.setContentType(Constants.XML_CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        out.write(ErrorCenter.doError(eMsg));
        out.flush();
        out.close();
    }

    /**
     * 使用Log4J输出错误信息
     * 
     * @param ex
     *            引发的错误
     */
    public static void logError(Throwable ex)
    {
        if (ex != null)
        {
            if (ex instanceof SQLException
                && ex.getMessage().indexOf(PKP_EXCEPTION_UNLOG_CODE) != -1) { return; }
            ex.printStackTrace();
            log.error("********************************************");
            log.error("ErrorMsg==>" + ex.getMessage());
            StackTraceElement elements[] = ex.getStackTrace();
            for (int i = 0, n = elements.length; i < n; i++)
            {
                log.error(elements[i].getFileName() + ":"
                    + elements[i].getLineNumber() + " ==> "
                    + elements[i].getMethodName() + "()");
            }
            log.error("********************************************");
        }
    }

    /**
     * 得到指定错误编码的信息,采用数组的返回方式
     * 
     * @param errorCode
     *            错误代码
     * @return 错误信息
     */
    public static String[] getErrorMessage(int errorCode)
    {
        Connection conn = null;
        PreparedStatement ptmt = null;
        ResultSet rs = null;
        StringBuffer errMsg = new StringBuffer("无法得到错误代码为'");
        errMsg.append(errorCode);
        errMsg.append("'的错误信息");
        String message[] = { errMsg.toString(), "" };
        try
        {
            conn = DBCtrl.getConnection();
            ptmt = conn.prepareStatement(SQL_ERROR_MESSAGE);
            ptmt.setInt(1, errorCode);
            rs = ptmt.executeQuery();
            if (rs.next())
            {
                message[0] = XML.Encode(StringUtils.toNoNull(rs.getString(1)));
            }
            DBCtrl.close(conn, ptmt, rs);
        }
        catch (SystemException e)
        {
            message[0] = "数据库连接异常,无法得到错误信息";
        }
        catch (SQLException e)
        {
            message[0] = "数据库执行错误,无法得到错误信息";
        }
        finally
        {
            try
            {
                DBCtrl.close(conn, ptmt, rs);
            }
            catch (SystemException ex1)
            {
                message[0] = "数据库连接关闭异常,无法得到错误信息";
            }
        }
        return message;
    }
}
