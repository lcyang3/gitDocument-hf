template.helper("parseInt", function(s) {
    return parseInt(s);
});

template.helper("fisrtWeek", function(yyyy, MM) {
    return new Date(yyyy, MM - 1, 1).getDay();
});

template.helper("currDays", function(yyyy, MM) {
    return new Date(yyyy, MM, 0).getDate();
});

template.helper("formatTime", function(yyyy, MM, dd) {
    MM = String(MM);
    for (var i = 0, zeros = ''; i < (2 - MM.length); i++) {
        zeros += '0';
    }
    return yyyy + "-" + zeros + MM + "-" + dd;
});

template.helper("checkStart", function(yyyy, MM, dd, startTime) {
    return new Date(yyyy, MM - 1, dd).getTime() == new Date(startTime + " 0:0:0").getTime();
});

template.helper("checkEnd", function(yyyy, MM, dd, endTime) {
    return new Date(yyyy, MM - 1, dd).getTime() == new Date(endTime + " 0:0:0").getTime();
});