Imports System.ComponentModel

Namespace Models
    Public Class Calc
        <DisplayName("出勤日数")>
        Public Property NumOfWorkingDays As Integer

        <DisplayName("在宅勤務日数")>
        Public Property NumOfHomeWorkingDays As Integer

        <DisplayName("支給対象月")>
        Public Property TargetMonth As Integer

        <DisplayName("支給対象月の日数")>
        Public Property NumOfTargetMonthDays As Integer

        <DisplayName("在宅手当")>
        Public Property HomeAllowance As Integer

        <DisplayName("1ヶ月の定期代")>
        Public Property OneMonthCommuterPass As Integer

        <DisplayName("定期代（京阪）")>
        Public Property CommuterPass_Keihan As Integer

        <DisplayName("切符代（京阪）")>
        Public Property Ticket_Keihan As Integer

        <DisplayName("定期代（地下鉄）")>
        Public Property CommuterPass_Subway As Integer

        <DisplayName("切符代（地下鉄）")>
        Public Property Ticket_Subway As Integer

        <DisplayName("支給額")>
        Public Property PaymentAmount As Integer

        <DisplayName("交通費合計（仕事）")>
        Public Property TravelCosts_Work As Integer

        <DisplayName("京阪（定期）＋地下鉄（切符）")>
        Public Property TravelCosts_WorkA As Integer

        <DisplayName("京阪（切符）＋地下鉄（定期）")>
        Public Property TravelCosts_WorkB As Integer

        <DisplayName("京阪（切符）＋地下鉄（切符）")>
        Public Property TravelCosts_WorkC As Integer

        <DisplayName("交通費（プライベートA）")>
        Public Property TravelCosts_PrivateA As Integer

        <DisplayName("交通費（プライベートB）")>
        Public Property TravelCosts_PrivateB As Integer

        <DisplayName("交通費（プライベートC）")>
        Public Property TravelCosts_PrivateC As Integer

        <DisplayName("交通費（プライベートD）")>
        Public Property TravelCosts_PrivateD As Integer

        <DisplayName("支給額からの差額")>
        Public Property Difference_FromPaymentAmount As Integer

        <DisplayName("余剰交通費")>
        Public Property SurplusTravelCost As Integer

    End Class
End Namespace
