$(startTime);

var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

function startTime() {
    var today = new Date();

    var h = today.getHours();
    var m = checkTime(today.getMinutes());
    var s = checkTime(today.getSeconds());

    var day = today.getDate();
    var month = months[today.getMonth()];
    var dayOfWeek = days[today.getDay()];

    $("#clock").html(`<span id="time">${dayOfWeek}, ${month} ${day}, ${h}:${m}:${s}</span>`);
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
