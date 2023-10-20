// Code here
// Define the base URL for Fetch requests
document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000';
  //Declarations to HTML elements
  const beerList = document.getElementById('beer-list');
  const beerName = document.getElementById('beer-name');
  const beerImage = document.getElementById('beer-image');
  const beerDescription = document.getElementById('beer-description');
  const reviewList = document.getElementById('review-list');
  const descriptionForm = document.getElementById('description-form');
  const descriptionInput = document.getElementById('description');
  const reviewForm = document.getElementById('review-form');
  const reviewInput = document.getElementById('review');

  // Fetch and display the first beer's details when the page loads
  fetch(`${baseUrl}/beers/1`)
    .then((response) => response.json())
    .then((beer) => {
      beerName.textContent = beer.name;
      beerImage.src = beer.image_url;
      beerDescription.textContent = beer.description;
      reviewList.innerHTML = '';
      beer.reviews.forEach((review) => {
        const li = document.createElement('li');
        li.textContent = review;
        reviewList.appendChild(li);
      });
    })
    .catch((error) => console.error('Error fetching beer details:', error));

  // Fetch and display the list of beers in the menu
  fetch(`${baseUrl}/beers`)
    .then((response) => response.json())
    .then((beers) => {
      beers.forEach((beer) => {
        const li = document.createElement('li');
        li.textContent = beer.name;
        li.dataset.id = beer.id;
        beerList.appendChild(li);
        li.addEventListener('click', () => displayBeerDetails(beer));
      });
    })
    .catch((error) => console.error('Error fetching beer list:', error));

  // Function to show the beer details
  function displayBeerDetails(beer) {
    beerName.textContent = beer.name;
    beerImage.src = beer.image_url;
    beerDescription.textContent = beer.description;
    reviewList.innerHTML = '';
    beer.reviews.forEach((review) => {
      const li = document.createElement('li');
      li.textContent = review;
      reviewList.appendChild(li);
    });
  }
  descriptionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newDescription = descriptionInput.value;
    if (newDescription) {
      beerDescription.textContent = newDescription;
    }
  });

  // Handle review form submission
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newReview = reviewInput.value;
    if (newReview) {
      const li = document.createElement('li');
      li.textContent = newReview;
      reviewList.appendChild(li);
      reviewInput.value = ''; // Clear the input field
    }
  });
});