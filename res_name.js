const urlParams = new URLSearchParams(window.location.search);
const restaurantName = urlParams.get('restaurant');

if (restaurantName) {
  const decodedName = decodeURIComponent(restaurantName);
  document.getElementById('resTitle').textContent = decodedName;

  const bookBtn = document.getElementById('bookBtn');
  if (bookBtn) {
    bookBtn.href = `reserve_form.html?restaurant=${encodeURIComponent(decodedName)}`;
  }
}
