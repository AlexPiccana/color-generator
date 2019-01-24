// Constant Declaration and Set Up Functions
const rect = document.querySelectorAll('.color-box');
const colorDirectory = colors.colors;
let colArray = [
	{
		"name": "Bara Red",
		"hex": "#e9546b",
		"rgb": {
			"r": 233,
			"g": 84,
			"b": 107
		},
		"luminance": 86.21810109831925,
		"locked": false
	},
	{
		"name": "Celadon Green",
		"hex": "#2f847c",
		"rgb": {
			"r": 47,
			"g": 132,
			"b": 124
		},
		"luminance": 80.00677196962766,
		"locked": false
	},
	{
		"name": "Purple Thorn",
		"hex": "#f0b9be",
		"rgb": {
			"r": 240,
			"g": 185,
			"b": 190
		},
		"luminance": 131.95274618210868,
		"locked": false
	},
	{
		"name": "Raw Cashew Nut",
		"hex": "#c8beb1",
		"rgb": {
			"r": 200,
			"g": 190,
			"b": 177
		},
		"luminance": 128.14886883620937,
		"locked": false
	},
	{
		"name": "Lorna",
		"hex": "#658477",
		"rgb": {
			"r": 101,
			"g": 132,
			"b": 119
		},
		"luminance": 84.26022912976204,
		"locked": false
	}
];

generateBoxID = rect => {
	let i = 0;
	rect.forEach(function(c) {
		c.id = i;
		i++;
	});
};
createLockButton = () => {
	const lockButtons = document.querySelectorAll(".lockBtn");
	lockButtons.forEach(function(e) {
		e.addEventListener("click", applyLock)
	});
};
createCopyButton = () => {
	const copyTarget = document.querySelectorAll(".copyBtn");
	copyTarget.forEach(function (e) {
		e.addEventListener("click", copyToClipboard);
	});
};

// Color Generator
runColor = () => {
	colorGeneration(colArray, colorDirectory, rect.length);
	rect.forEach(function(c){
		if(!Boolean(c.className.toLowerCase().match('locked'))) {
			c.style.backgroundColor = colArray[c.id].hex;
			colorDetails(c);
			textContrast(c);
		}
	});
	let count = parseInt(document.querySelector('#genCounter').innerHTML);
	document.querySelector('#genCounter').innerHTML = count + 1;
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
	c.querySelector('.colorName').firstChild.textContent = divObj.name;
	c.querySelector('#colorCodeHex').textContent = divObj.hex.toUpperCase();
	c.querySelector('#colorCodeRGB').textContent = (`${divObj.rgb.r} ${divObj.rgb.g} ${divObj.rgb.b}`);
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

// Icon Functionality

applyLock = event => {
	event = event || window.event;
	const tempDiv = event.target.closest(".color-box");

	colArray[tempDiv.id].locked = !colArray[tempDiv.id].locked;

	if(colArray[tempDiv.id].locked) {
		event.target.closest(".lockBtn").innerHTML = '<i class="fas fa-lock"></i><span class="tooltiptext">Unlock this Colour</span>';
	} else {
		event.target.closest(".lockBtn").innerHTML = '<i class="fas fa-unlock"></i><span class="tooltiptext">Lock this Colour</span>';
	}
};

copyToClipboard = event => {
	event = event || window.event;
 	let tempTextArea = document.body.appendChild(document.createElement('textarea'));
	let colorCodeContent = event.target.closest('.color-box').querySelector('.colorCode').firstChild.textContent;
	tempTextArea.value = colorCodeContent.replace(/<\/?[a-zA-Z]+\/?>/g, '').trim();
	tempTextArea.select();
  	document.execCommand("copy");
	tempTextArea.remove();
};