document.body.onkeyup = function(e) {
    if(e.keyCode == 32) {
        runColor();
    }
};

runColor();
createLockButton();

const copyTarget = document.querySelectorAll(".clickToCopy");
	
copyTarget.forEach(function(e) {
    e.addEventListener("click", copyToClipboard);
});

swapCode = () => {
    let x = document.querySelector("#rgb-switch");

    if (x.classList == "hex") {
        x.classList.add("rgb");
        x.classList.remove("hex");
        x.innerHTML = '<p class="rgb-switch" onclick="swapCode()"><i class="fas fa-exchange-alt" style="padding-right: 10px;"></i> Switch to HEX</p>';
    } else {
        x.classList.add("hex");
        x.classList.remove("rgb");
        x.innerHTML = '<p class="rgb-switch" onclick="swapCode()"><i class="fas fa-exchange-alt" style="padding-right: 10px;"></i> Switch to RGB</p>';
    }

    rect.forEach(function(c) {
            let z = c.id;
            colorDetails(c, z);
        });
};