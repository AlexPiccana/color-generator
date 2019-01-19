color = c => {
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
  
    document.getElementById(`colorBox${c}`).style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  
  console.log(`colorBox${c}`);
}

runColor = () => {
for(i = 1; i < 6; i++) {
  color(i);
}
}