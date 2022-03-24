document.getElementById("clickMe").addEventListener("click", getClicked);
document.getElementById("keyInput").addEventListener("click", getKeyInput);
let displayKey;
chrome.storage.local.get(['receivedKey']).then((content) => {
    displayKey = content.receivedKey;
    if (displayKey != "") {
        $("#displayKey").text(displayKey);
    }
});
$("#keyInput").blur(function (e) {
    e.preventDefault();
    getKeyInput();
});
async function getClicked() {
    let body = $("body");
    let newTitle, newLink, newQuestion;
    await chrome.storage.local.get(["question"]).then((content) => {
        newQuestion = content.question;
    });
    await chrome.storage.local.get(["title"]).then((content) => {
        newTitle = content.title;
    });
    await chrome.storage.local.get(["links"]).then((content) => {
        newLink = content.links;
    });

    if (newQuestion == undefined || newQuestion.length == 0) {
        alert("U haven't access Azota, access Azota tests then comeback here");
    }
    if (newQuestion.length != newTitle.length) {
        alert("The key is corrupted or out of order / The ")
    }

    console.log(newQuestion, newTitle, newLink);
    for (let i = 0; i < newQuestion.length; i++) {
        body.append(`<div class="toggleSlide">Câu ${i+1}: ${newQuestion[i]}</div><div class="panelSlide"></div>`);
    }
    let appendTarget = $(".panelSlide");
    appendTarget.each(function (index, element) {
        for (let j = 0; j < newTitle[index].length; j++) {
            let domain = getDomainName(newLink[index][j]);


            // create node and attrib, etc 
            let el = document.createElement("div");
            let textNode = document.createTextNode(`${domain}`);
            el.appendChild(textNode);
            element.append(el);
            // element.append(`<div><b>${domain}</b></div>`);

            let el_2 = document.createElement("a");
            let textNode_2 = document.createTextNode(`${newTitle[index][j]}`);
            el_2.appendChild(textNode_2);
            el_2.setAttribute("href", `${newLink[index][j]}`);
            el_2.setAttribute("target", "_blank");
            element.append(el_2);
            // element.append(`<a href="${newLink[index][j]}" target="_blank">${newTitle[index][j]}</a><br>`);
        }
    });
    // for (let i = 0; i < newQuestion.length; i++) {
    //     for (let j = 0; j < newTitle[i].length; j++) {
    //         let domain = getDomainName(newLink[i][j]);
    //         body.append(`<div><b>${domain}</b></div>`);
    //         body.append(`<a href="${newLink[i][j]}" target="_blank">${newTitle[i][j]}</a><br>`);
    //     }
    // }
    $(".toggleSlide").click(function () {
        $(this).toggleClass("selected");
        $(this).next().slideToggle();
    });
}

function getDomainName(url) {
    url = new URL(url);
    return url.hostname;
}

function getKeyInput() {
    var val = $("#keyInput").val()
    console.log(val);
    if (val != "" || val != undefined || val != null) {
        $("#displayKey").text(val);
        chrome.storage.local.set({
            "receivedKey": val
        });

    }
}