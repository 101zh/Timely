const timeElement = document.getElementById("time")
const dateElement = document.getElementById("date")
const container = document.getElementById("blockcontainer");

var content = ""

fetch('../assets/htmlAssets/prefab.html')
    .then(response => response.text())
    .then(textContent => {
        content = textContent
    })
    .catch(error => console.error('Error:', error));

var timeJsonString = ""

fetch('../assets/timeAssets/time.json')
    .then(response => response.text())
    .then(textContent => {
        timeJsonString = textContent
    })
    .catch(error => console.error('Error:', error));

var timeAssetDict = JSON.parse(timeJsonString)

var timePeriods = timeAssetDict["timePeriods"]
var blocks = []

for (let index = 0; index < 5; index++) {
    blocks[index] = container.appendChild(createElementFromHTML(content))
}

const monthDays = timeAssetDict["monthDays"]

var dNow = new Date(Date.now())
var dEndOfYear = new Date(dNow.getFullYear() + 1, 0)
var dEndOfMonth = new Date(dNow.getFullYear(), dNow.getMonth() + 1)
var dEndOfWeek = new Date(dNow.getFullYear(), dNow.getMonth(), dNow.getDate() + (8 - dNow.getDay()))
var dEndOfDay = new Date(dNow.getFullYear(), dNow.getMonth(), dNow.getDate() + 1)

var workDayCookieValues = getWorkDayHours()

var dStartOfWorkDay = (new Date(dNow.getTime()));
var dEndOfWorkDay = (new Date(dNow.getTime()));
var startOfWorkDayTime = workDayCookieValues[0].split(":");
var endOfWorkDayTime = workDayCookieValues[1].split(":");
dStartOfWorkDay.setHours(startOfWorkDayTime[0], startOfWorkDayTime[1], 0, 0);
dEndOfWorkDay.setHours(endOfWorkDayTime[0], endOfWorkDayTime[1], 0, 0);


updatePercentageBars()
updateTime()

setTimeout(() => {
    setInterval(updateTime, 1000)
}, 1000 - new Date().getMilliseconds());


setTimeout(() => {
    setInterval(updatePercentageBars, 30000)
}, 1000 - new Date().getMilliseconds());

function updateTime() {
    console.log("update current time")
    dNow = new Date(Date.now())
    timeElement.textContent = dNow.toTimeString()
    dateElement.textContent = dNow.toDateString()
    dNow.setSeconds(dNow.getSeconds() + 1)
}

function updatePercentageBars() {
    console.log("update percentage bars")
    var percentages = calculateTimePercentages()
    for (let index = 0; index < blocks.length; index++) {
        var block = blocks[index]
        var percentage = percentages[index]
        block.querySelector(".descrip").textContent = timePeriods[index]
        if (percentage > 1) {
            block.querySelector(".percent").textContent = "Complete!"
            block.querySelector(".progressbar").querySelector("div").style.width = "100%";
        } else {
            var percentageString = Math.round(percentage * 10000) / 100 + "%"
            block.querySelector(".percent").textContent = percentageString
            block.querySelector(".progressbar").querySelector("div").style.width = percentageString;
        }
    }
}


// ----------------------Helper Methods----------------------

/**
 * 
 * @param {Date} dateNow The current time as a date object
 * @param {Date} dateEnd The end time of the time period as a date object
 * @param {number} days The number of days in the time period
 * @param {number} hours the number of hours in the time period if `days==1`
 * @param {number} extraMinutes the number of extra minutes after the end of an hour
 * @returns {number} The percentage of the time period the current time is at as a decimal
 */
function givePercentageOfTimePeriod(dateNow, dateEnd, days, hours, extraMinutes) {
    var percentage = 1 - (((dateEnd.getTime() - dateNow.getTime()) / 1000) / (days * hours * 60 * 60 + (extraMinutes * 60)))

    return percentage
}

/**
 * 
 * @returns {number[]} An array of time percentages based on the currrent time
 */
function calculateTimePercentages() {
    var timePercentages = []
    timePercentages[0] = givePercentageOfTimePeriod(dNow, dEndOfYear, 365, 24, 0)
    timePercentages[1] = givePercentageOfTimePeriod(dNow, dEndOfMonth, monthDays[dNow.getMonth()], 24, 0)
    timePercentages[2] = givePercentageOfTimePeriod(dNow, dEndOfWeek, 7, 24, 0)
    timePercentages[3] = givePercentageOfTimePeriod(dNow, dEndOfDay, 1, 24, 0)
    timePercentages[4] = givePercentageOfTimePeriod(dNow, dEndOfWorkDay, 1, dEndOfWorkDay.getHours() - dStartOfWorkDay.getHours(), dEndOfWorkDay.getMinutes() - dStartOfWorkDay.getMinutes())


    return timePercentages
}

/**
 * 
 * @param {String} htmlString The string of the div in html
 * @returns {HTMLDivElement} an HTMLDivElement created from `htmlString`
 */
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div;
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function getWorkDayHours() {
    var startHour = getCookie("workDayStartHour")
    var endHour = getCookie("workDayEndHour")

    if (startHour.length <= 0) {
        startHour = "09:00"
    }
    if (endHour.length <= 0) {
        endHour = "17:00"
    }


    return [startHour, endHour]
}
