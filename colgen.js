const rect = document.querySelectorAll('.color-box');
const colorDirectory = colors.colors;
let colArray = [];

generateBoxID = rect => {
	let i = 0;
	rect.forEach(function(c) {
		c.id = i;
		i++;
	});
};

init = (outArr, inArr) => {
	let i = 0;

	while(i < inArr.length) {
		let randomHex = Math.floor(Math.random() * inArr.length);
		if (!duplicateTest(outArr, inArr[randomHex])) {
			outArr[i] = (inArr[randomHex]);
			outArr[i].locked = false;
			i++;
		}
	}
};

runColor = () => {
	colorGeneration(colArray, colorDirectory, rect.length);

	rect.forEach(function(c){
		if(!Boolean(c.className.toLowerCase().match('locked'))) {
			c.style.backgroundColor = colArray[c.id].hex;
			colorDetails(c);
			textContrast(c);
		}
	});
};

function colorGeneration(outArr, inArr, amt) {
	let i = 0;

	while(i < amt) {
		if(colArray[i].locked === true) {
			i++;
		} else {
			let randomHex = Math.floor(Math.random() * inArr.length);
			if(!duplicateTest(outArr, inArr[randomHex])) {
				outArr[i] = (inArr[randomHex]);
				outArr[i].locked = false;
				i++;
			}
		}
	}
	colArray = outArr;
}

function duplicateTest(y, x) {
	return Boolean(
		y.find(function(c) {
			return c == x;
		}));
}

colorDetails = (c) => {
	let divObj = colArray[c.id];
	c.children[0].children[0].innerText = divObj.name;
	if(document.querySelector("#rgb-switch").classList == "hex") {
		c.children[0].children[1].innerText = divObj.hex;
	} else {
		c.children[0].children[1].innerText = (`${divObj.rgb.r} ${divObj.rgb.g} ${divObj.rgb.b}`);
	}
};

textContrast = (c) => {
	let randomHex = colArray[c.id];

	let r = randomHex.rgb.r;
	let g = randomHex.rgb.g;
	let b = randomHex.rgb.b;

	if (r * 0.2126 + g * 0.7152 + b * 0.0722 > 255 / 2) {
		c.style.color = "#2f3640";
	} else {
		c.style.color = "#f5f6fa";
	}
};

createLockButton = () => {
	let lockButtons = document.querySelectorAll(".lock-btn");
	lockButtons.forEach(function(e) {
    e.addEventListener("click", applyLock)
});
};

applyLock = event => {
	event = event || window.event;
	const tempDiv = event.target.closest(".color-box");

	colArray[tempDiv.id].locked = !colArray[tempDiv.id].locked;

	if(colArray[tempDiv.id].locked) {
		event.target.parentElement.innerHTML = '<i class="fas fa-lock lock-btn"></i>';
	} else {
		event.target.parentElement.innerHTML = '<i class="fas fa-unlock lock-btn"></i>';
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