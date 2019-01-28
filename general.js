// Set up
generateBoxID(rect);
runColor();
createLockButton();
createCopyButton();
createInputFunctionality();

// Generate

document.body.onkeyup = function(e) {
    if(e.keyCode == 32) {
        runColor();
    }
};