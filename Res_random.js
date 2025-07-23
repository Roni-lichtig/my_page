const restaurants = [
  {
    name: "Luigi's Trattoria",
    category: "Italian",
    image: "https://www.travelandleisure.com/thmb/vAg5d_rhUy-c54Xwz8f0i6jAKYk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-restaurant-patio-in-italy-ITLNRESTAURANTS0424-832da3120e1f4b12ade4c4cf6a5ab694.jpg",
    description: "Authentic pasta, pizza and tiramisu",
    address: "Via Roma 12, Tel Aviv"
  },
  {
    name: "Convivium Osteria",
    category: "Italian",
    image: "https://conviviumosteria.com/wp-content/uploads/2019/06/best-italian-restaurant-brooklyn-300x165.jpg",
    description: "Modern twist on Italian classics",
    address: "Ben Yehuda 88 St, Haifa"
  },
  {
    name: "Luigi's Roma",
    category: "Italian",
    image: "https://assets.bonappetit.com/photos/5ca680eff7c9b51309c95d26/16:9/w_2240,c_limit/luigis-2.jpg",
    description: "Rustic vibes & rich flavors",
    address: "49 Shlomo Ibn Gabirol St, Jerusalem"
  },
  {
    name: "McDonald's",
    category: "Burger",
    image: "https://www.pymnts.com/wp-content/uploads/2021/11/mcdonalds-singapore.jpg",
    description: "Most loved burger not only by children",
    address: "23 Dizengoff St, Tel Aviv"
  },
  {
    name: "Cafe Bouloud",
    category: "Coffee",
    image: "https://media.cntravellerme.com/photos/6799de6ebb2dc566dcbf6178/16:9/w_2240,c_limit/cafebouloud_05.jpg",
    description: "Elegant and fresh coffee experience",
    address: "45 Hillel St, Haifa"
  },
  {
    name: "Kisu",
    category: "Asian",
    image: "https://media.getmood.io/warehouse/dynamic/44411.jpg",
    description: "High class asian kitchen and sushi bar",
    address: "8 Ramban St, Jerusalem"
  },
  {
    name: "GDB",
    category: "Burger",
    image: "https://www.secrettelaviv.com/wp-content/uploads/2020/08/116133403_339219480815995_5944128839654256109_o.jpg",
    description: "The best burger in town",
    address: "22 Shlomo Ibn Gabirol St, Tel Aviv"
  },
  {
    name: "Cafein",
    category: "Coffee",
    image: "https://media.easy.co.il/images/UserPics/4933774_1543682273932.jpg",
    description: "Cozy vibes with aromatic brews",
    address: "26 HaNeviim St., Haifa, Israel"
  },
  {
    name: "Japanika",
    category: "Asian",
    image: "https://www.enjoyingisrael.com/pic/restaurants/0022078_japanika-modiin_493.jpeg",
    description: "Asian kitchen, quality sushi and fair prices",
    address: "10 Yitzhak Rabin Blvd, Jerusalem"
  }
];

document.getElementById('surpriseBtn').addEventListener('click', () => {
  const selectedCategory = document.getElementById('categorySelect').value;

  if (!selectedCategory) {
    alert('Please select a category');
    return;
  }

  const filteredRestaurants = restaurants.filter(r => r.category === selectedCategory);

  if (filteredRestaurants.length === 0) {
    alert('No restaurants found in this category.');
    return;
  }

  const randomRestaurant = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];

  document.getElementById('resName').textContent = randomRestaurant.name;
  document.getElementById('resImage').src = randomRestaurant.image;
  document.getElementById('resImage').alt = randomRestaurant.name;
  document.getElementById('resDesc').textContent = randomRestaurant.description;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(randomRestaurant.address)}`;
  document.getElementById('resAddrLink').href = mapsUrl;
  document.getElementById('resAddrLink').textContent = randomRestaurant.address;

  document.getElementById('resultContainer').style.display = 'block';
});


