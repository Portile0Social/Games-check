
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 192) {
            let password = prompt('Enter the password:');
            if (password === 'correct-password') {
                window.location.href = 'main.html';
            } else {
                alert('Incorrect password!');
            }
        }
    });
});
