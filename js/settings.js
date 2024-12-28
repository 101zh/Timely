const workDayHoursDiv = document.getElementById("workDayHours")


var startAndEndHours = workDayHoursDiv.getElementsByTagName("input")

// document.cookie = "workDayStartHour" + "=" + startAndEndHours[0].value + ";SameSite=Strict" + ";expires=" + new Date(Date.now() + (10 * 365 * 24 * 60 * 60 * 1000))
// document.cookie = "workDayEndHour" + "=" + startAndEndHours[1].value + ";SameSite=Strict" + ";expires=" + new Date(Date.now() + (10 * 365 * 24 * 60 * 60 * 1000))

// document.cookie.split(";")


startAndEndHours[2].onmouseup = saveWorkDayHours;

function saveWorkDayHours() {
    console.log("save in cookies")
    document.cookie = "workDayStartHour" + "=" + startAndEndHours[0].value + ";SameSite=Strict" + ";expires=" + new Date(Date.now() + (10 * 365 * 24 * 60 * 60 * 1000))
    document.cookie = "workDayEndHour" + "=" + startAndEndHours[1].value + ";SameSite=Strict" + ";expires=" + new Date(Date.now() + (10 * 365 * 24 * 60 * 60 * 1000))
}
