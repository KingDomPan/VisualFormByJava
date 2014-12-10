package com.ffcs.itm.qd.exception;

@SuppressWarnings("serial")
public class ApplicationException extends BaseException
{
    String[] errs = {};

    public ApplicationException(String errorCode)
    {
        super(errorCode);
    }

    public ApplicationException(String errorCode, Throwable ex)
    {
        super(errorCode, ex);
    }

    public ApplicationException(String errorCode, Throwable ex, String[] errs)
    {
        super(errorCode, ex);
        this.errs = errs;
    }

    public void outErrorMsg()
    {
        for (int i = 0, len = errs.length; i < len; i++)
        {
            System.out.println(errs[i]);
        }
    }
}
