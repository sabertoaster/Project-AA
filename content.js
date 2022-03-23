let totalLink = [];
let totalTitle = [];

let apiKey = "AIzaSyAyJQbBc0BbZOnFVS1QORCSp1NFFWY4mrY";
let panelID = "41f196f7d3f22e0d7";


var x = setInterval(() => {
  let content = document.querySelectorAll(".content-img");
  let passaway = document.querySelector("#question_ui");
  let data = [];
  if (passaway.length != 0) {
    for (let i = 0; i < content.length; i++) {
      let record = content[i].innerText;
      data.push(record);
    }
    searchContent(data);
    // console.log(data);
    console.log(totalLink);
    console.log(totalTitle);
    chrome.storage.local.set({
      "question": data,
      "links": totalLink,
      "title": totalTitle
    });
    clearInterval(x);
  }

}, 1000);

function searchContent(arr) {
  let array = arr;
  for (let i = 0; i < array.length; i++) {
    subContent(array[i]);
  }
}

function subContent(query) {
  let tempLink = [];
  let tempTitle = [];
  let urlName = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${panelID}&q=${query}`;
  $.ajax({
    type: "GET",
    url: urlName,
    success: (data) => {
      for (let i = 0; i < 10; i++) {
        tempLink.push(data.items[i].link);
        tempTitle.push(data.items[i].title);
      }
      console.log(tempLink);
      console.log(tempTitle);
      totalLink.push(tempLink);
      totalTitle.push(tempTitle);
    },
    async: false
  });
}