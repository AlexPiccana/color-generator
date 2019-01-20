const rect = document.getElementsByClassName("three");
const rectArr = Array.from(rect);

runColor = () => {
	rectArr.forEach(function(c){
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
		c.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
		c.innerHTML = `<p>rgb(${r}, ${g}, ${b})</p>`;
	});
}