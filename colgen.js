const rect = document.querySelectorAll('.color-box');

runColor = () => {
	rect.forEach(function(c){
		if(!Boolean(c.className.toLowerCase().match('locked'))) {
			r = Math.floor(Math.random() * 256);
			g = Math.floor(Math.random() * 256);
			b = Math.floor(Math.random() * 256);
			c.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
			c.children[0].children[0].innerText = `rgb(${r}, ${g}, ${b})`;
			c.children[0].children[1].innerText = "#" + fullColorHex(r,g,b);

			if (r * 0.2126 + g * 0.7152 + b * 0.0722 > 255 / 2) {
				c.style.color = "#131313"
			} else {
				c.style.color = "#fafcfa"
			}
		}
	});
}

rgbToHex = rgb => { 
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

fullColorHex = (r,g,b) => {   
  let red = rgbToHex(r);
  let green = rgbToHex(g);
  let blue = rgbToHex(b);
  return red+green+blue;
};

createLockButton = () => {
	let lockButtons = document.querySelectorAll(".lock-btn");
	lockButtons.forEach(function(e) {
    e.addEventListener("click", applyLock)
});
}

applyLock = () => {
	const tempA = event.target;
	tempA.closest(".color-box").classList.toggle('locked');
	if(tempA.closest(".color-box").className.toLowerCase().match('locked')){
		tempA.parentElement.innerHTML = '<i class="fas fa-lock lock-btn"></i>';
	} else {
		tempA.parentElement.innerHTML = '<i class="fas fa-unlock lock-btn"></i>';
	}
	createLockButton();
}

copyToClipboard = () => {
  const tempA = document.body.appendChild(document.createElement('textarea'));
  const tempB = event.target;
  tempA.value = tempB.textContent.replace(/<\/?[a-zA-Z]+\/?>/g, '').trim();
  tempA.select();  
  document.execCommand("copy");
  tempA.remove();
}