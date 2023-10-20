// Code here
// Define the base URL for Fetch requests, this means the JS will run only after the HTML document is fully loaded 
document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000';// this variable directs to the server where the fetch requests will be sent to GET data
  //Declarations assigning all the HTML elements to variables
  const beerList = document.getElementById('beer-list');
  const beerName = document.getElementById('beer-name');
  const beerImage = document.getElementById('beer-image');
  const beerDescription = document.getElementById('beer-description');
  const reviewList = document.getElementById('review-list');
  const descriptionForm = document.getElementById('description-form');
  const descriptionInput = document.getElementById('description');
  const reviewForm = document.getElementById('review-form');
  const reviewInput = document.getElementById('review');

  // here we use .fetch and display the first beer's details when the page loads. fetch send a HTTP GET request
  fetch(`${baseUrl}/beers/1`)
    .then((response) => response.json())
    .then((beer) => {
      beerName.textContent = beer.name;
      beerImage.src = beer.image_url;
      beerDescription.textContent = beer.description;
      reviewList.innerHTML = '';
      beer.reviews.forEach((review) => {
        const li = document.createElement('li');//For each beer, we create a list item and set its text content to the beer's name.
        li.textContent = review;
        reviewList.appendChild(li);
      });
    })
    .catch((error) => console.error('Error fetching beer details:', error));// we add .catch If there is an error in fetching the beer details, an error message is logged

  // Here we use Fetch and display the list of beers in the menu
  fetch(`${baseUrl}/beers`)
    .then((response) => response.json())
    .then((beers) => {
      beers.forEach((beer) => {
        const li = document.createElement('li');
        li.textContent = beer.name;
        li.dataset.id = beer.id;
        beerList.appendChild(li);
        li.addEventListener('click', () => displayBeerDetails(beer)); // we add this so when a user clicks on a beer it calls the displayBeerDetails function, displaying beer details
      });
    })
    .catch((error) => console.error('Error fetching beer list:', error));

  // the function bellow displays the beer details when invoked
  function displayBeerDetails(beer) {
    beerName.textContent = beer.name; // this sections takes the object beer, representing the selected beer and its data
    beerImage.src = beer.image_url;
    beerDescription.textContent = beer.description;// this function udpates the 'text content' of HTML elements to display beer details
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

  // Handles review form submission
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