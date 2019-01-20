document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        runColor();
    }
}

runColor();
createLockButton();

const copyTarget = document.querySelectorAll(".clickToCopy");
	
copyTarget.forEach(function(e) {
    e.addEventListener("click", copyToClipboard);
});