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

        //公共交通機関の切符代を取得
        let ticket_keihan = parseInt($('#Ticket_Keihan').val(), 10);
        let ticket_subway = parseInt($('#Ticket_Subway').val(), 10);
        console.log(`京阪（片道）： ${ticket_keihan} 円`);
        console.log(`地下鉄（片道）： ${ticket_subway} 円`);

        //公共交通機関の往復切符代（1日あたり）
        let daily_travelcost = (ticket_keihan + ticket_subway) * 2;
        console.log(`往復切符代（1日あたり）： ${daily_travelcost} 円`);

        //1ヶ月にかかる交通費の計算　※公共交通機関の往復切符×出勤日数
        let onemonth_travelcost = daily_travelcost * numof_workingdays;
        $('#OneMonthTravelCost').val(onemonth_travelcost);
        console.log(`1ヶ月にかかる交通費： ${onemonth_travelcost} 円`);


        //出勤日数が12日以上の場合、支給額 = 1ヶ月の定期代を支給・在宅手当なし
        if (numof_workingdays >= 12) {

            //支給額 = 1ヶ月の定期代
            paymentamount = onemonth_commuterpass;

            //支給額をセット
            $('#PaymentAmount').val(paymentamount);


            //出勤日数が12日未満の場合、支給額 = （公共交通機関の往復切符×出勤日数）＋在宅手当（250円×在宅日数）
        } else {

            //在宅勤務日数（有給日を除く）
            let numof_homeworkingdays = parseInt($('#NumOfHomeWorkingDays').val(), 10);

            //在宅手当　※250円 × 在宅勤務日数
            let homeallowance = 250 * numof_homeworkingdays
            $('#HomeAllowance').val(homeallowance);
            console.log(`在宅手当： ${homeallowance} 円`);

            //支給額　※1ヶ月にかかる交通費（日割り通勤費×出勤数）　＋　在宅手当
            paymentamount = onemonth_travelcost + homeallowance;
            console.log(`支給額： ${paymentamount} 円`);

            //支給額をセット
            $('#PaymentAmount').val(paymentamount);

        };
        //各パターンの、1ヶ月にかかる交通費支給額からの差額
        let difference_fromOneMonthTravelCostA = travelcosts_workA - onemonth_travelcost;
        let difference_fromOneMonthTravelCostB = travelcosts_workB - onemonth_travelcost;
        let difference_fromOneMonthTravelCostC = travelcosts_workC - onemonth_travelcost;
        let difference_fromOneMonthTravelCostD = oneMonth_commuterpass - onemonth_travelcost;
        console.log(`1ヶ月にかかる交通費からの追加支払額A： ${difference_fromOneMonthTravelCostA} 円`);
        console.log(`1ヶ月にかかる交通費からの追加支払額B： ${difference_fromOneMonthTravelCostB} 円`);
        console.log(`1ヶ月にかかる交通費からの追加支払額C： ${difference_fromOneMonthTravelCostC} 円`);
        console.log(`1ヶ月にかかる交通費からの追加支払額D： ${difference_fromOneMonthTravelCostD} 円`);

        //各パターンの、（在宅手当含む）支給額からの差額
        let difference_fromPaymentAmountA = paymentamount - travelcosts_workA;
        let difference_fromPaymentAmountB = paymentamount - travelcosts_workB;
        let difference_fromPaymentAmountC = paymentamount - travelcosts_workC;
        let difference_fromPaymentAmountD = paymentamount - oneMonth_commuterpass;
        console.log(`支給額からの差額A（在宅手当含む）： ${difference_fromPaymentAmountA} 円`);
        console.log(`支給額からの差額B（在宅手当含む）： ${difference_fromPaymentAmountB} 円`);
        console.log(`支給額からの差額C（在宅手当含む）： ${difference_fromPaymentAmountC} 円`);
        console.log(`支給額からの差額D（在宅手当含む）： ${difference_fromPaymentAmountD} 円`);

        //交通費（プライベート）の取得
        let travelcosts_PrivateA = parseInt($('#TravelCosts_PrivateA').val(), 10);
        let travelcosts_PrivateB = parseInt($('#TravelCosts_PrivateB').val(), 10);
        let travelcosts_PrivateC = parseInt($('#TravelCosts_PrivateC').val(), 10);
        let travelcosts_PrivateD = parseInt($('#TravelCosts_PrivateD').val(), 10);
        console.log(`プライベート交通費A： ${travelcosts_PrivateA} 円`);
        console.log(`プライベート交通費B： ${travelcosts_PrivateB} 円`);
        console.log(`プライベート交通費C： ${travelcosts_PrivateC} 円`);
        console.log(`プライベート交通費D： ${travelcosts_PrivateD} 円`);

        //各パターンの、1ヶ月に支払う交通費
        let payment_TravelCostA = travelcosts_PrivateA + difference_fromOneMonthTravelCostA;
        let payment_TravelCostB = travelcosts_PrivateB + difference_fromOneMonthTravelCostB;
        let payment_TravelCostC = travelcosts_PrivateC + difference_fromOneMonthTravelCostC;
        let payment_TravelCostD = travelcosts_PrivateD + difference_fromOneMonthTravelCostD;
        console.log(`1ヶ月に支払う交通費A： ${payment_TravelCostA} 円`);
        console.log(`1ヶ月に支払う交通費B： ${payment_TravelCostB} 円`);
        console.log(`1ヶ月に支払う交通費C： ${payment_TravelCostC} 円`);
        console.log(`1ヶ月に支払う交通費D： ${payment_TravelCostD} 円`);

        //余剰交通費の比較
        let result = Math.min(payment_TravelCostA, payment_TravelCostB, payment_TravelCostC, payment_TravelCostD);

        //1ヶ月に支払う交通費が最も少ないものを最善パターンとして表示
        let text = '';
        switch (result) {
            case payment_TravelCostA:
                text = '京阪（定期）＋地下鉄（切符）で購入するのが良いです！';
                $('#conclusion').text(text);
                console.log(text);
                break;

            case payment_TravelCostB:
                text = '京阪（切符）＋地下鉄（定期）で購入するのが良いです！';
                $('#conclusion').text(text);
                console.log(text);
                break;

            case payment_TravelCostC:
                text = '京阪（切符）＋地下鉄（切符）で購入するのが良いです！';
                $('#conclusion').text(text);
                console.log(text);
                break;

            case payment_TravelCostD:
                text = '京阪（定期）＋地下鉄（定期）で購入するのが良いです！';
                $('#conclusion').text(text);
                console.log(text);
                break;
        };

    });
});