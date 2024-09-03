
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Backquote') {
            let password = prompt('Enter authentication key:');
            if (password === 'correct-password') {
                window.location.href = 'main.html';
            } else {
                alert('Incorrect password!');
            }
        }
    });
});
