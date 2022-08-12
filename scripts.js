// To click Shorten button when enter key is pressed
document
  .getElementById("full-link")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("shorten-btn").click();
    }
  });

function copyText() {
  var linkObj = document.getElementById("short-link");
  linkObj.select();
  linkObj.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

$(document).ready(function () {
  $("button").click(function () {
    const link = document.getElementById("full-link").value;
    var sendInfo = { longUrl: link };
    $.ajax({
      type: "post",
      url: "https://crisp-link.herokuapp.com/api/url/shorten",
      data: JSON.stringify(sendInfo),
      contentType: "application/json; charset=utf-8",
      traditional: true,
      success: function (data) {
        const contentDOM = document.getElementById("content");
        const response = data.shortUrl;
        contentDOM.innerHTML =
          '<div class="short-link">' +
          '<input id="short-link" class="input-short" type="text" readonly value=' +
          response +
          ">" +
          '<button class = "btn-cpy" onclick = "copyText()">' +
          '<i class = "far fa-2x fa-copy" > </i>' +
          "</button>" +
          "</div>";
      },
      error: function (data) {
        const contentDOM = document.getElementById("content");
        contentDOM.innerHTML =
          '<p class="error">' + data.responseJSON + " !!</p>";
      },
    });
  });
});
