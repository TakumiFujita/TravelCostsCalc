Imports System.Web.Mvc

Namespace Controllers
    Public Class CalcController
        Inherits Controller

        ' GET: Calc
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace