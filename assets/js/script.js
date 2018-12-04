

var canvas = document.getElementById('canvas'); //taking canvas by id
ctx = canvas.getContext('2d');

var pText = document.getElementById('score');

document.addEventListener("keydown", keyPush);
document.addEventListener("keydownCreate", keyPush);

ctx.fillStyle = "DarkGreen";
ctx.fillRect( 0, 0, canvas.width, canvas.height);

var step = 35;                   //cells size

var score = 0;					 //really score

var maxX = canvas.width-step;    //border for creating meal
var maxY = canvas.height-step;
var min = 0;

var meal = 0;                    //flag(meal existing) ...(in future meal count)
mealx = 0;                       //meal x pos
mealy = 0;

var key = "";					 //keycode

var brd = 5;					 //border to make snake cells smaller than another objects
var tail = 3;					 //tail size
var pos = []; 					 //tail position (pos[0] - head)
var px = 0, py = 0;				 //new head position
var bigHead = 0;				 //flag to make another head after eating 

var time = 90;					 //timer delay

for(var i = 0; i < tail; i++){	 //pushing start tail
	pos.push([i*step, 0]);
}

function game(){
	//clear canvas
	ctx.fillStyle = "DarkGreen";
	ctx.fillRect( 0, 0, canvas.width, canvas.height);
	key = "right";
	//start timer
	var timerId = setInterval(function() {
		if(key == "esc"){//exit			
			clearInterval(timerId);
			ctx.fillStyle = "red";
			ctx.fillRect( 0, 0, canvas.width, canvas.height);
			alert("game over");
		}
		if(key == "left" || key == "up" || key == "down" || key == "right"){//newt move
			newMeal();
			changePos();
			draw();
		}
	}, time);
}
function changePos(){//changing elements position
	for(var i = 1; i < tail; i++){
		if(pos[i][0]==pos[0][0] && pos[i][1] == pos[0][1]){
			for(var j = 3; j < tail; j++){
				pos[i].pop();


} 
			tail = 3;
			score = 0;
		}
	}
	if(pos[0][0] == mealx && pos[0][1] == mealy){//eating 
		score++;
		meal = 0;
		tail++;
		bigHead = 1;
		pos.push([0, 0]);
	}
	for(var i = tail-1; i >= 1; i--){//new tail position
		pos[i][0] = pos[i-1][0];
		pos[i][1] = pos[i-1][1];
	}
	if(px == pos[0][0] && py == pos[0][1]){//if no changes
		if(key == "left")px-=step;
		if(key == "right")px+=step;
		if(key == "up")py-=step;
		if(key == "down")py+=step;
	}

	if(px<0)px = canvas.width-step;//new head position
	if(py<0)py = canvas.height-step;
	if(px>canvas.width-step)px = 0;
	if(py>canvas.height-step)py = 0;
	pos[0][0]=px;
	pos[0][1]=py;


	}
function newMeal(){
	if(meal==0){//if no meal
		mealx = Math.floor(Math.random() * (maxX - min) + min);//new position
		mealy = Math.floor(Math.random() * (maxY - min) + min);
		
		while(mealx%step){//center
			mealx+=1;
		}
		while(mealy%step){
			mealy+=1;
		}
		meal = 1;//flag(there is meal)
	}
}
function draw(){//drawing canvas
	pText.innerHTML = "Score: " + score;

	ctx.fillStyle = "Black";//claer canvas
	ctx.fillRect( 0, 0, canvas.width, canvas.height);

	if(meal != 0){//draw meal		
		ctx.fillStyle = "yellow";
		ctx.fillRect( mealx, mealy, step-brd, step-brd);
	}


	if(bigHead == 0){//drawing head
		ctx.fillStyle = "lime";
		ctx.fillRect(pos[0][0], pos[0][1], step-brd, step-brd);
		ctx.fillStyle = "DarkGreen";
		ctx.fillRect(pos[0][0]+step/7, pos[0][1]+step/7, step/1.8, step/1.8	);	
	}else{
		ctx.fillStyle = "yellow";
		ctx.fillRect(pos[0][0], pos[0][1], step-brd, step-brd);
		ctx.fillStyle = "red";
		ctx.fillRect(pos[0][0]+step/7, pos[0][1]+step/7, step/1.8, step/1.8	);
		bigHead++;
		if(bigHead == 5){
			bigHead = 0;
		}
	}


	//drawing tail
	var clrG = 255;
	var clrR = 0;
	var str = "rgb(0, ";
	for(var i = 1; i < tail; i++){
		if(clrG<=0){
			ctx.fillStyle = "rgb("+clrR+", 0, 0)";
			clrR+=20;
		}
		else{
			ctx.fillStyle = "rgb(0, "+clrG+", 0)";
			clrG -= 20;
		}
		
		ctx.fillRect(pos[i][0], pos[i][1], step-brd, step-brd);
	}	
}
function keyPush(evt){//key codes
	if(evt.keyCode == 37){
		if(key != "right" && key != "left"){//to avoid turn around and to avoid *jumping* through cells
			key = "left";
			px-=step;//changing head position
		}		
	}
	if(evt.keyCode == 38){
		if(key != "down" && key != "up"){
			key = "up";
			py-=step;
		}
	}

	if(evt.keyCode == 39){
		if(key != "left" && key != "right"){
			key = "right";
			px+=step;
		}
	}
	if(evt.keyCode == 40){
		if(key != 'up' && key != "down"){
			key = "down";
			py+=step;
		}
	} 
	if(evt.keyCode == 27){
		key = "esc";
	}
	if(evt.keyCode == 13){
		key = "enter";
	}
}
function upButton(){
	if(key != "down" && key != "up"){
		key = "up";
		py-=step;
	}
}

function downButton(){
	if(key != 'up' && key != "down"){
		key = "down";
		py+=step;
	}
}
function leftButton(){
	if(key != "right" && key != "left"){
		key = "left";
		px-=step;
	}	
}
function rightButton(){
	if(key != "left" && key != "right"){
		key = "right";
		px+=step;
	}
}



