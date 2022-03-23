document.getElementById("clickMe").addEventListener("click", getClicked);
$(".toggleSlide").click(function () {
    $(".panelSlide").slideDown();
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
    for (let i = 0; i < newQuestion.length; i++) {
        body.append(`<div class="toggleSlide">Câu hỏi số ${i+1}: ${newQuestion[i]}<div class="panelSlide">`);
        if (newTitle.length == newLink.length) {
            for (let j = 0; j < newTitle[i].length; j++) {
                let domain = getDomainName(newLink[i][j]);
                body.append(`<div><b>${domain}</b></div>`);
                body.append(`<a href="${newLink[i][j]}" target="_blank">${newTitle[i][j]}</a><br>`);
            }
            body.append(`</div></div>`);
        }
    }
}

function getDomainName(url){
    url = new URL(url);
    return url.hostname;
}