// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Select all the hearts
const articleHearts = document.getElementsByClassName('like-glyph');

//function that handles the click event on the hearts
function likeClick(event) {
  // get the heart element that was clicked
  const heart = event.target;

  // mimic a server call
  mimicServerCall("http://mimicServer.example.com") 
    .then(() => {
      // check if the heart's inner text is the empty heart
      if (heart.innerText === EMPTY_HEART) {
        // if it is, fill it with the full heart
        heart.innerText = FULL_HEART;
        heart.classList.add('activated-heart');
      } else {
        //otherwise, change the inner text to the empty heart
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    })
    .catch((error) => {
      //if there's an error, show a modal with the error message 
      const modal = document.getElementById('modal');
      modal.classList.remove('hidden');
      const modalMessage = document.getElementById('modal-message');
      modalMessage.innerText = error;
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 3000);
    });
}

//loop through all the article hearts and add a click event listener to each one
for (let i=0; i<articleHearts.length; i++) {
  articleHearts[i].addEventListener('click', likeClick);
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
