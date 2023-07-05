// Function to handle form submission and create a new tweet
function handleTweetSubmit(event) {
    event.preventDefault();
  
    const userId = '123'; // Replace with the actual user ID
    const content = document.getElementById('tweetContent').value;
  
    // Make a POST request to create a new tweet
    fetch('/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, content }),
    })
      .then((response) => response.json())
      .then((tweet) => {
        // Display the new tweet
        displayTweet(tweet);
      })
      .catch((error) => {
        console.error('Failed to create tweet', error);
      });
  }
  
  // Function to handle liking a tweet
  function handleLike(event) {
    const tweetId = event.target.dataset.tweetId;
    const likeButton = event.target;
    const likeCount = likeButton.nextElementSibling;
  
    const userId = '123'; // Replace with the actual user ID
  
    // Make a POST request to like the tweet
    fetch(`/tweets/like/${tweetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Update the UI to reflect the updated like count
        const currentCount = parseInt(likeCount.textContent);
        likeCount.textContent = currentCount + 1;
        likeButton.disabled = true;
      })
      .catch((error) => {
        console.error('Failed to like tweet', error);
      });
  }
  
  // Function to handle search
  function handleSearch(event) {
    event.preventDefault();
  
    const searchTerm = document.getElementById('searchInput').value;
  
    // Make a GET request to search for tweets
    fetch(`/tweets/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((tweets) => {
        // Clear existing tweets
        const tweetsContainer = document.getElementById('tweetsContainer');
        tweetsContainer.innerHTML = '';
  
        // Display the search results
        tweets.forEach((tweet) => {
          displayTweet(tweet);
        });
      })
      .catch((error) => {
        console.error('Failed to search tweets', error);
      });
  }
  
  // Function to display a tweet in the UI
  function displayTweet(tweet) {
    const tweetsContainer = document.getElementById('tweetsContainer');
    const template = document.getElementById('tweetTemplate');
    const tweetElement = template.content.cloneNode(true);
  
    const tweetContent = tweetElement.querySelector('.tweet-content');
    tweetContent.textContent = tweet.content;
  
    const likeButton = tweetElement.querySelector('.like-button');
    likeButton.dataset.tweetId = tweet._id;
    likeButton.addEventListener('click', handleLike);
  
    const likeCount = tweetElement.querySelector('.like-count');
    likeCount.textContent = tweet.likes;
  
    tweetsContainer.insertBefore(tweetElement, tweetsContainer.firstChild);
  }
  
  // Fetch and display existing tweets on page load
  function loadTweets() {
    fetch('/tweets')
      .then((response) => response.json())
      .then((tweets) => {
        tweets.forEach((tweet) => {
          displayTweet(tweet);
        });
      })
      .catch((error) => {
        console.error('Failed to fetch tweets', error);
      });
  }
  
  // Update the event listeners
  document.getElementById('tweetForm').addEventListener('submit', handleTweetSubmit);
  document.getElementById('searchButton').addEventListener('click', handleSearch);
  document.addEventListener('DOMContentLoaded', loadTweets);
  