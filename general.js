// Set up
generateBoxID(rect);
runColor();
createLockButton();
createCopyButton();

// Generate

document.body.onkeyup = function(e) {
    if(e.keyCode == 32) {
        runColor();
    }
};