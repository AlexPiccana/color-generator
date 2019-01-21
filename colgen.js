const rect = document.querySelectorAll('.color-box');
const colorDirectory = colors.colors;
const colorDirectoryLength = colors.colors.length;

runColor = () => {
	rect.forEach(function(c){
		if(!Boolean(c.className.toLowerCase().match('locked'))) {
			let randomHex = Math.floor(Math.random() * colorDirectoryLength);
			c.id = randomHex;
			c.style.backgroundColor = colorDirectory[randomHex].hex;
			colorDetails(c, randomHex);
			textContrast(c, randomHex);
		}
	});
};

colorDetails = (c) => {
    let randomHex = c.id;
    c.children[0].children[0].innerText = colorDirectory[randomHex].name;
    if(document.querySelector("#rgb-switch").classList == "hex") {
        c.children[0].children[1].innerText = colorDirectory[randomHex].hex;
    } else {
        c.children[0].children[1].innerText = (`${colorDirectory[randomHex].rgb.r} ${colorDirectory[randomHex].rgb.g} ${colorDirectory[randomHex].rgb.b}`);
    }
};

textContrast = (c) => {
    let randomHex = c.id;

    let r = colorDirectory[randomHex].rgb.r;
    let g = colorDirectory[randomHex].rgb.g;
    let b = colorDirectory[randomHex].rgb.b;

    if (r * 0.2126 + g * 0.7152 + b * 0.0722 > 255 / 2) {
        c.style.color = "#2f3640";
    } else {
        c.style.color = "#f5f6fa";
    }
}

createLockButton = () => {
	let lockButtons = document.querySelectorAll(".lock-btn");
	lockButtons.forEach(function(e) {
    e.addEventListener("click", applyLock)
});
};

applyLock = event => {
	event = event || window.event;

	const tempA = event.target;
	tempA.closest(".color-box").classList.toggle('locked');
	if(tempA.closest(".color-box").className.toLowerCase().match('locked')){
		tempA.parentElement.innerHTML = '<i class="fas fa-lock lock-btn"></i>';
	} else {
		tempA.parentElement.innerHTML = '<i class="fas fa-unlock lock-btn"></i>';
	}
	createLockButton();
};

copyToClipboard = event => {
	event = event || window.event;
 	let tempA = document.body.appendChild(document.createElement('textarea'));
 	let tempB = event.target.parentNode.children[0].children[1].textContent;
	tempA.value = tempB.replace(/<\/?[a-zA-Z]+\/?>/g, '').trim();
  	tempA.select();  
  	document.execCommand("copy");
  	tempA.remove();
};