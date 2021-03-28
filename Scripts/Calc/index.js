$(function () {

    //定期代（京阪）
    let commuterpass_Keihan = 11780;
    //切符代（京阪）
    let ticket_Keihan = 310;
    //定期代（地下鉄）
    let commuterpass_Subway = 9100;
    //切符代（地下鉄）
    let ticket_Subway = 230;
    //1ヶ月の定期代
    let oneMonth_commuterpass = commuterpass_Keihan + commuterpass_Subway;

    //★各初期値のセット
    $(document).ready(function () {
        let today = new Date();
        let thisYear = today.getFullYear();
        let thisMonth = today.getMonth() + 1;

        //支給対象月のセット
        let targetMonth = thisMonth + 1;
        $('#TargetMonth').val(targetMonth);

        //支給対象月の日数をセット
        let numof_targetmonthdays = new Date(thisYear, targetMonth, 0).getDate();
        $('#NumOfTargetMonthDays').val(numof_targetmonthdays);

        //1ヶ月の定期代をセット
        $('#OneMonthCommuterPass').val(oneMonth_commuterpass);

        //定期代（京阪）をセット
        $('#CommuterPass_Keihan').val(commuterpass_Keihan);

        //切符代（京阪）をセット
        $('#Ticket_Keihan').val(ticket_Keihan);

        //定期代（地下鉄）をセット
        $('#CommuterPass_Subway').val(commuterpass_Subway);

        //切符代（地下鉄）をセット
        $('#Ticket_Subway').val(ticket_Subway);
    });


    //★「計算する」ボタン押下時の処理
    $('#calcBtn').click(function () {

        //出勤日数の取得
        let numof_workingdays = parseInt($('#NumOfWorkingDays').val(), 10);

        //1ヶ月の定期代
        let onemonth_commuterpass = $('#OneMonthCommuterPass').val();

        //支給額
        let paymentamount = 0;

        //パターンAの計算　※京阪（定期）＋地下鉄（切符）
        let travelcosts_workA = commuterpass_Keihan + ((ticket_Subway * 2) * numof_workingdays)
        $('#TravelCosts_WorkA').val(travelcosts_workA);
        console.log(`京阪（定期）＋地下鉄（切符）： ${travelcosts_workA} 円`);

        //パターンBの計算　※京阪（切符）＋地下鉄（定期）
        let travelcosts_workB = ((ticket_Keihan * 2) * numof_workingdays) + commuterpass_Subway
        $('#TravelCosts_WorkB').val(travelcosts_workB);
        console.log(`京阪（切符）＋地下鉄（定期）： ${travelcosts_workB} 円`);

        //パターンCの計算　※京阪（切符）＋地下鉄（切符）
        let travelcosts_workC = ((ticket_Keihan * 2) * numof_workingdays) + ((ticket_Subway * 2) * numof_workingdays)
        $('#TravelCosts_WorkC').val(travelcosts_workC);
        console.log(`京阪（切符）＋地下鉄（切符）： ${travelcosts_workC} 円`);


        //出勤日数が12日以上の場合、支給額 = 1ヶ月の定期代を支給・在宅手当なし
        if (numof_workingdays >= 12) {

            //支給額 = 1ヶ月の定期代
            paymentamount = onemonth_commuterpass;

            //支給額をセット
            $('#PaymentAmount').val(paymentamount);


            //出勤日数が12日未満の場合、支給額 = 日割り通勤費＋在宅手当（250円）
        } else {

            //1ヶ月分の車両交通費を計算　※（京阪＋地下鉄の往復）× 支給対象月の日数
            let ticket_keihan = parseInt($('#Ticket_Keihan').val(), 10);
            let ticket_subway = parseInt($('#Ticket_Subway').val(), 10);
            console.log(`京阪（片道）： ${ticket_keihan} 円`);
            console.log(`地下鉄（片道）： ${ticket_subway} 円`);

            //支給対象月の日数
            let numof_targetmonthdays = parseInt($('#NumOfTargetMonthDays').val(), 10);
            console.log(`支給対象月の日数： ${numof_targetmonthdays} 日`);

            //1ヶ月分の車両交通費
            let onemonth_travelcost = (ticket_keihan + ticket_subway) * 2 * numof_targetmonthdays
            console.log(`1ヶ月分の車両交通費： ${onemonth_travelcost} 円`);

            //車両通勤費の日割り通勤費　※1ヶ月分の車両交通費 ÷ 20日
            let daily_travelcost = parseInt(onemonth_travelcost / 20, 10);
            console.log(`車両通勤費の日割り通勤費： ${daily_travelcost} 円`);


            //在宅勤務日数（有給日を除く）
            let numof_homeworkingdays = parseInt($('#NumOfHomeWorkingDays').val(), 10);

            //在宅手当　※250円 × 在宅勤務日数
            let homeallowance = 250 * numof_homeworkingdays
            $('#HomeAllowance').val(homeallowance);
            console.log(`在宅手当： ${homeallowance} 円`);

            //支給額　※車両通勤費の日割り通勤費×出勤数　＋　在宅手当
            paymentamount = (daily_travelcost * numof_workingdays) + homeallowance;
            console.log(`支給額： ${paymentamount} 円`);

            //支給額をセット
            $('#PaymentAmount').val(paymentamount);

        };

        //各パターンの、支給額からの差額
        let difference_fromPaymentAmountA = paymentamount - travelcosts_workA;
        let difference_fromPaymentAmountB = paymentamount - travelcosts_workB;
        let difference_fromPaymentAmountC = paymentamount - travelcosts_workC;
        let difference_fromPaymentAmountD = paymentamount - oneMonth_commuterpass;
        console.log(`支給額からの差額A： ${difference_fromPaymentAmountA} 円`);
        console.log(`支給額からの差額B： ${difference_fromPaymentAmountB} 円`);
        console.log(`支給額からの差額C： ${difference_fromPaymentAmountC} 円`);
        console.log(`支給額からの差額D： ${difference_fromPaymentAmountD} 円`);

        //交通費（プライベート）の取得
        let travelcosts_PrivateA = parseInt($('#TravelCosts_PrivateA').val(), 10);
        let travelcosts_PrivateB = parseInt($('#TravelCosts_PrivateB').val(), 10);
        let travelcosts_PrivateC = parseInt($('#TravelCosts_PrivateC').val(), 10);
        let travelcosts_PrivateD = parseInt($('#TravelCosts_PrivateD').val(), 10);
        console.log(`交通費（プライベート）A： ${travelcosts_PrivateA} 円`);
        console.log(`交通費（プライベート）B： ${travelcosts_PrivateB} 円`);
        console.log(`交通費（プライベート）C： ${travelcosts_PrivateC} 円`);
        console.log(`交通費（プライベート）D： ${travelcosts_PrivateD} 円`);

        //各パターンの、余剰交通費
        let surplusTravelCostA = difference_fromPaymentAmountA - travelcosts_PrivateA;
        let surplusTravelCostB = difference_fromPaymentAmountB - travelcosts_PrivateB;
        let surplusTravelCostC = difference_fromPaymentAmountC - travelcosts_PrivateC;
        let surplusTravelCostD = difference_fromPaymentAmountD - travelcosts_PrivateD;
        console.log(`余剰交通費A： ${surplusTravelCostA} 円`);
        console.log(`余剰交通費B： ${surplusTravelCostB} 円`);
        console.log(`余剰交通費C： ${surplusTravelCostC} 円`);
        console.log(`余剰交通費D： ${surplusTravelCostD} 円`);

        //余剰交通費の比較
        let result = Math.max(surplusTravelCostA, surplusTravelCostB, surplusTravelCostC, surplusTravelCostD);

        //最も余剰交通費が多いものが最善パターン
        switch (result) {
            case surplusTravelCostA:
                console.log('京阪（定期）＋地下鉄（切符）で購入するのが良いです！');
                break;

            case surplusTravelCostB:
                console.log('京阪（切符）＋地下鉄（定期）で購入するのが良いです！');
                break;

            case surplusTravelCostC:
                console.log('京阪（切符）＋地下鉄（切符）で購入するのが良いです！');
                break;

            case surplusTravelCostD:
                console.log('京阪（定期）＋地下鉄（定期）で購入するのが良いです！');
                break;
        };

    });
});