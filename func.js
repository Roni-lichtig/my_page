// Background toggle (JS)
document.getElementById("bg-btn").addEventListener("click", function () {
  const body = document.body;
  body.style.backgroundColor =
    body.style.backgroundColor === "lightyellow" ? "#ffffff" : "lightyellow";
});

// Show random recommendation (JS)
const recommendations = [
  "The Basta – Modern market food in Tel Aviv",
  "Kiton – Homestyle comfort food in Haifa",
  "El Rancho – Authentic grill in Be'er Sheva",
  "Tiger Lilly – True Thai in Ramat Hachayal",
  "Weekend brunch at Café Louise, Haifa"
];

document.getElementById("random-btn").addEventListener("click", function () {
  const random = recommendations[Math.floor(Math.random() * recommendations.length)];
  document.getElementById("random-pick").innerText = random;
});

// jQuery toggle class
$(document).ready(function () {
  $("#highlightTitle").click(function () {
    $("#page-title").toggleClass("highlighted-title");
  });
});
