function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

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


