// to find the keycode that is being pressed in the browser use:
document.addEventListener('keydown', function(event) {
    console.log('Key: ' + event.key);
    console.log('Code: ' + event.code);
});
