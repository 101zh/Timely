function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

var timeElement = document.getElementById("time")
var dateElement = document.getElementById("date")
var container = document.getElementById("blockcontainer");

var content = `<div class="block">
    <div class="descrip">DAY</div>
    <div class="percent">50%</div>
    <div class="progressbar">
        <div></div>
    </div>
</div>
`

// fetch('prefab.html')
//     .then(response => response.text())
//     .then(textContent => {
//         content = textContent
//     })
//     .catch(error => console.error('Error:', error));


for (let index = 0; index < 3; index++) {
    container.appendChild(createElementFromHTML(content))
}

const list = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

var dNow = new Date(Date.now())
var dEndOfYear = new Date(dNow.getFullYear() + 1, 0)
var dEndOfMonth = new Date(dNow.getFullYear(), dNow.getMonth() + 1)
var dEndOfWeek = new Date(dNow.getFullYear(), dNow.getMonth(), dNow.getDate() + (8 - dNow.getDay()))
var dEndOfDay = new Date(dNow.getFullYear(), dNow.getMonth(), dNow.getDate() + 1)
var dEndOfWorkDay = (new Date(dNow.getTime()));
dEndOfWorkDay.setHours(16, 0, 0, 0);

var weeksToDays = 7
var daysToHours = 24
var hoursToMinutes = 60
var minutesToSeconds = 60

var secondsInAWeek = 7 * 24 * 60 * 60
var secondsInADay = 24 * 60 * 60


function givePercentageOfTimePeriod(dateStart, dateEnd, days, hoursPerDay) {
    var percentage = 1 - (((dateEnd.getTime() - dateStart.getTime()) / 1000) / (days * hoursPerDay * 60 * 60))
    if (percentage > 1) {
        return -1
    }

    return percentage
}

console.log(givePercentageOfTimePeriod(dNow, dEndOfYear, 365, 24))
console.log(givePercentageOfTimePeriod(dNow, dEndOfMonth, list[dNow.getMonth()], 24))
console.log(givePercentageOfTimePeriod(dNow, dEndOfWeek, 7, 24))
console.log(givePercentageOfTimePeriod(dNow, dEndOfDay, 1, 24))
console.log(givePercentageOfTimePeriod(dNow, dEndOfWorkDay, 1, 8))

// console.log("workDayStartHour"+"="+9+";"+ new Date(Date.now()+(10*365*24*60*60*1000)))
// document.cookie = "workDayStartHour" + "=" + 9 + ";SameSite=Strict" + ";expires=" + new Date(Date.now() + (10 * 365 * 24 * 60 * 60 * 1000))


// document.cookie.split(";")

setTimeout(() => {
    setInterval(updateTime, 1000)
}, 1000 - new Date().getMilliseconds());

function updateTime() {
    console.log("working")
    dNow = new Date(Date.now())
    timeElement.textContent = dNow.toTimeString()
    dateElement.textContent = dNow.toDateString()
    dNow.setSeconds(dNow.getSeconds() + 1)
}
