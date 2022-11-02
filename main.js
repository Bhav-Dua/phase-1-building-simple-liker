// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const hearts = document.querySelectorAll('.like-glyph');
  for(const heart of hearts) {
    addLikeListener(heart);
  }

  function addLikeListener(heart) {
    heart.addEventListener('click', serverCall)
  }

  function serverCall(e) {
    mimicServerCall()
    .then(() => handleLike(e))
    .catch(error => handleLikeError(error));
  }

  function handleLike(e) {
    e.target.classList.add('activated-heart');
    e.target.textContent = FULL_HEART;
    e.target.removeEventListener('click', serverCall);
    e.target.addEventListener('click', handleUnlike);
  }

  function handleUnlike(e) {
    e.target.classList.remove('activated-heart');
    e.target.textContent = EMPTY_HEART;
    e.target.removeEventListener('click', handleUnlike);
    addLikeListener(e.target);  
  }

  function handleLikeError(error) {
    document.querySelector('#modal-message').textContent = error;
    document.querySelector('#modal').classList.remove('hidden');
    setTimeout(() => document.querySelector('#modal').classList.add('hidden'), 3000);
  }
})

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
