//ServiceWorker registration begin

if('serviceWorker' in navigator){
  console.log('Service worker supported!');
  window.addEventListener('load', () => {
      navigator.serviceWorker
              .register('sw.js')
              .then(reg => console.log('Service Worker Registered!'))
              .catch(err => console.log('Service Worker: Error: ${err}'))
  });

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    var button = document.querySelector('.install-btn');
    button.removeAttribute('hidden');
    button.addEventListener('click', () => {
      event.prompt();
      button.setAttribute('disabled', true);
    });
  });
}

//sw.js reg. end





// Get the modal
var modal = document.getElementById("Modal");

// Get the button that opens the modal
var btn = document.getElementById("btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
