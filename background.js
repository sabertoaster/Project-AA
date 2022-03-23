chrome.storage.local.get("content").then((content) => {
    let newContent = content;
    document.querySelector("body").append(1);
    for (let i = 0; i < newContent.length; i++) {
        document.querySelector("body").append(`${i + 1}:${newContent[i].innerText}`);
    }
})