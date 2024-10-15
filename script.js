
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Backquote') {
            event.preventDefault()
            if (localStorage.getItem('vertex_autologin_setting') !== 'true') {
              window.location.href = 'login.html'
            } else {
              window.location.href = 'main.html'
            }
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
            event.preventDefault();

            let inputText = document.getElementById('input').value;

              if (inputText.startsWith('exec =>')) {
                let command = inputText.slice(7).trim();
                try {
                  eval(command);
                } catch (e) {
                  console.error('Error executing command: ', e);
                }
              } else if (inputText.startsWith('nav =>')) {
                let path = inputText.slice(6).trim();
                window.location.href = path;
              } else if (inputText.startsWith('flash =>')) {
                let flashUrl = inputText.slice(8).trim();
                window.location.href = `/games/flash.html?href=${encodeURIComponent(flashUrl)}`;
              } else {
                window.open('https://www.google.com/search?q=' + inputText, '__blank');
              }
        }
    });
});




