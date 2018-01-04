/* this version uses only JavaScript. It includes an 'undo' functionality: if the cell already has the chosen color, it will be removed. */
//declaration of variables used in this code
let cellStyle, current_color, new_color, x, y, table, row, cell; 
// assign table element to variable for convenience 
table = document.getElementById("pixel_canvas"); 
/* this function changes the cell color if it is not already that color */
function hexToRGB(color){
    var r = parseInt(color.substr(1,2),16);
    var g = parseInt(color.substr(3,2),16);
    var b = parseInt(color.substr(5,2),16);    
    return 'rgb('+r+', '+g+', '+b+')' ;
  }    
function changeCellColor() {
	//cellStyle = window.getComputedStyle(this,"");
    current_color = this.style.backgroundColor; 
	// assign new color value from input to variable
	new_color = hexToRGB(document.getElementById("colorPicker").value);
	if(current_color !== new_color){
		this.style.backgroundColor = new_color;
	}
	else {
		this.removeAttribute("style");
	}
};

/* this function assigns the width and height values to x and y respectively, 
then checks if table element has child elements (i.e. if a grid is already present), 
which have to be removed, and then it builds the cell grid inside the table. */
function makeGrid(){
	x = parseInt(document.getElementById("input_width").value);
	y = parseInt(document.getElementById("input_height").value);
	while (table.firstChild){
		table.removeChild(table.firstChild);
	}
	for (i=1; i<=x; i++){
		row = document.createElement("tr");
		table.appendChild(row);
		for (j=1; j<=y; j++){
			cell = document.createElement("td");
			row.appendChild(cell);
		}
	}
	/* this code adds a 'click' event listener on the just created 'td' elements, 
	which when triggered calls function changeCellColor() to change the background color
	to the one selected or undo the color if already applied */
	let cells = document.getElementsByTagName("td");
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', changeCellColor, false);
	}
}
/* this code listens to the 'submit' event on the input element of the same name, 
then executes a function to prevent default behaviour and calling the function makegrid() */
document.getElementById("sizePicker").addEventListener("submit", function(event){
event.preventDefault(); makeGrid()});
