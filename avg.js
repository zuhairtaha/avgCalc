var style = $('<style>.tahasoft{background:blue none repeat scroll 0 0;border:2px solid white;color:white;float:left;padding:8px;text-shadow:none;width:258px;overflow: hidden;}.tahasoft p{float:left;font-family:"segoe ui",arial,tahoma,serif;font-size:16px;line-height:24px;}.tahasoft img{float:right;padding-right:10px;}.ts1{background:#fc6a00 none repeat scroll 0 0;}.ts2{background:#028ccb none repeat scroll 0 0;}.ts3{background:#fba400 none repeat scroll 0 0;}.ts4{background:#00bb71 none repeat scroll 0 0;}.avgDiv{background:#fff;margin:auto;width:100%;padding:24px 0;text-align:center;font-size:17px;font-family:arial serif;text-shadow:1px 1px #FCF5CF;direction:rtl;display:inline-block}</style>');
$('html > head').append(style);

var countOfPassedSubjects = 0;
var bast                  = 0;
var makam                 = 0;
var EnglishHoursPassed    = 0;
var year                  = '';
var sumEquivalent         = 0;
$('tr td.tdpadding_c a').each(function () {
    var SpecialStatusAnchorTitle = $(this).attr('title');
    if (SpecialStatusAnchorTitle == 'Passed ()' || SpecialStatusAnchorTitle == 'Registered ()') {
        var LastDivInRow = $(this).parent().siblings(':last');
        var markDiv      = $(this).parent().next().next().next().next().next().next().next().next().next().next().next().next();
        var SubjectCode  = LastDivInRow.parent().next().children('.tdpadding_c:first-child').next().next().next().html();
        var mark         = markDiv.html();
        mark             = parseInt(mark);
		
		if (SubjectCode == 'BAT') return;
        if (SubjectCode == 'PT') {
			markDiv.css("background", "#BCFFF8");
            if (mark >= 0 && mark < 35) EnglishHoursPassed = 0;
            if (mark >= 35 && mark < 55) EnglishHoursPassed = 3;
            if (mark >= 55 && mark < 73) EnglishHoursPassed = 6;
            if (mark >= 73 && mark < 84) EnglishHoursPassed = 9;
            if (mark >= 84 && mark < 95) EnglishHoursPassed = 12;
            if (mark >= 95 && mark < 100) EnglishHoursPassed = 15;            
			console.log("English Hours: " + EnglishHoursPassed);
			}
        if (mark >= 50 && mark <= 100) {
            countOfPassedSubjects++;
            markDiv.css({"background": "#54BF48", "color": "#fff"});
            var CreditHours                 = LastDivInRow.parent().next().children('.tdpadding_c:first-child').next().next().next().next().next().css('background', 'yellow').html();
            CreditHours                     = parseInt(CreditHours);
            bast                            = bast + mark * CreditHours;
            makam                           = makam + CreditHours * 1;
            TotalHoursWithoutSkippedEnglish = 165 - makam;
        }
    }

    if (SpecialStatusAnchorTitle == 'Equivalent ()') {
        var LastDivInRow = $(this).parent().siblings(':last');
        var courseCode   = LastDivInRow.parent().next().children('.tdpadding_c:first-child').next().next().next().html();
        if (courseCode == "L1" || courseCode == "L2" || courseCode == "L3" || courseCode == "L4" || courseCode == "L5") return;
        var CreditHours = LastDivInRow.parent().next().children('.tdpadding_c:first-child').next().next().next().next().next().css('background', 'orange').html();
        CreditHours     = parseInt(CreditHours);
        sumEquivalent += CreditHours;
    }

});
average = bast / makam;
average = average.toFixed(2);
if (average >= 50 && average < 60) evaluation = 'مقبول';
if (average >= 60 && average < 70) evaluation = 'جيد';
if (average >= 70 && average < 80) evaluation = 'جيد جداً';
if (average >= 80 && average < 90) evaluation = 'ممتاز';
if (average >= 90 && average < 100) evaluation = 'مرتبة شرف';

var totlaHours = makam + EnglishHoursPassed + sumEquivalent;
var remain     = TotalHoursWithoutSkippedEnglish - EnglishHoursPassed;

if (totlaHours > 0 && totlaHours <= 22) {
    year        = 'الأولى';
    remainToNxt = 22 - totlaHours;
    NxtYerar    = 'ثانية';
}
if (totlaHours > 22 && totlaHours <= 55) {
    year        = 'الثانية';
    remainToNxt = 55 - totlaHours;
    NxtYerar    = 'ثالثة';
}
if (totlaHours > 55 && totlaHours <= 88) {
    year        = 'الثالثة';
    remainToNxt = 88 - totlaHours;
    NxtYerar    = 'رابعة';
}
if (totlaHours > 88 && totlaHours <= 121) {
    year        = 'الرابعة';
    remainToNxt = 121 - totlaHours;
    NxtYerar    = 'خامسة';
}
if (totlaHours > 121 && totlaHours <= 165) {
    year        = 'الخامسة';
    remainToNxt = 165 - totlaHours;
    NxtYerar    = 'تخرج';
}
if (totlaHours >= 165) {
    year        = 'مبارك التخرج';
    remainToNxt = 0;
    NxtYerar    = '';
}

html = '<div class="avgDiv"><div class="tahasoft ts1"><img src="http://svuise.com/files/img/avg_icn1.png">';
html += '<p>المعدل<br /> ' + average + ' (' + evaluation + ') </p>';
html += '</div><div class="tahasoft ts2"><img src="http://svuise.com/files/img/avg_icn4.png">';
if (year == 'الخامسة') {
    html += '<p>السنة الحالية: ' + year + '<br /><span style="font-size:13px">باقي' + remainToNxt + 'ساعات للتخرج ' + '<span></p>';
} else {
    html += '<p>السنة الحالية: ' + year + '<br /><span style="font-size:13px">باقي' + remainToNxt + 'ساعات لتصبح سنة ' + NxtYerar + '<span></p>';
}
html += '</div><div class="tahasoft ts3"><img src="http://svuise.com/files/img/avg_icn3.png">';
html += '<p>الساعات المتبقية للتخرج <br />' + remain + ' </p>';
html += '</div><div class="tahasoft ts4"><img src="http://svuise.com/files/img/avg_icn2.png">';
html += '<p>عدد الساعات المجتازة <br /> ' + totlaHours + ' </p>';
html += '</div></div>';

$('.act_link').before(html);
$(".ts4").after("<a style='font-family:tahoma;target=_blank;font-size:10px;float:right;margin-right:13px;font-family:tahoma;font-size:9px;color:gray;margin-top:3px;color:gray' href='http://tahasoft.com/'>last update: 19-4-2016</a>");