// prevents GoGuardian tab closing
window.addEventListener('beforeunload', function (event) {
    const message = 'Are you sure you want to leave? Your changes may not be saved.';

    event.returnValue = message;
    return message;
});

// prevents unfocusing the window
document.addEventListener("visibilitychange", () => {
    if ((document.visibilityState === 'visible')) {
        document.body.focus();
    }
});

// quick-hide shortcut
document.addEventListener('keydown', function(event) {
    if (event.altKey && event.code === 'Backquote') {
        event.preventDefault();
        window.location.href = 'index.html';
    }
});