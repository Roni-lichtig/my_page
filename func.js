const restaurants = {
  "Italian": [
    {
      name: "Pasta Basta",
      address: "Weizmann 32, Tel Aviv",
      image: "https://media.timeout.com/images/105902660/750/422/image.jpg"
    },
    {
      name: "Tony Vespa",
      address: "King George 20, Tel Aviv",
      image: "https://www.hashulchan.co.il/wp-content/uploads/2021/07/Tony-Vespa-credit-Dana-Shlush-DSC_0166.jpg"
    }
  ],
  "Take Out & Delivery": [
    {
      name: "Domino's Pizza",
      address: "Ibn Gabirol 12, Tel Aviv",
      image: "https://cdn-uploads.dominos.co.il/2021/03/dominos-about-1.jpg"
    },
    {
      name: "McDonald's",
      address: "Ramban 8, Jerusalem",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/7c/21/33/mcdonald-s.jpg"
    }
  ]
};

document.getElementById("surpriseBtn").addEventListener("click", function () {
  const category = document.getElementById("categorySelect").value;
  const container = document.getElementById("resultContainer");

  if (!category || !restaurants[category]) {
    alert("Please select a valid category.");
    return;
  }

  const options = restaurants[category];
  const random = options[Math.floor(Math.random() * options.length)];

  document.getElementById("resName").textContent = random.name;
  document.getElementById("resImage").src = random.image;
  document.getElementById("resImage").alt = random.name + " image";
  document.getElementById("resAddress").textContent = random.address;
  document.getElementById("resAddress").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(random.address)}`;

  container.style.display = "block";
});

document.getElementById("bookBtn").addEventListener("click", function () {
  alert("Not implemented");
});
