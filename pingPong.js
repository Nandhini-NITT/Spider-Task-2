var gameball,paddle1,paddle2,frame,score=0,waiting=true,no_of_players=0;
var GameArea=
{
	canvas:document.createElement("canvas"),
	start: function()
			{
			this.canvas.height=300;
			this.canvas.width=300;
			this.context=this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas,document.body.childNodes[0]);
			window.addEventListener('keydown', function (e) {
						GameArea.key = e.keyCode;
						})
				window.addEventListener('keyup', function (e) {
						GameArea.key = e.keycode;
						})

			},
	clear: function()
			{
				this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
			}
};
function component(x,y,width,height,control)
{
	this.control=control;
	this.score=0;
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.update=function()
				{
					var ctx=GameArea.context;
					ctx.fillStyle="green";
					ctx.fillRect(this.x,this.y,this.width,this.height);
				}
	this.crashWith=function(ballobj)
				{
					var paddleright=this.x+this.width;
					var ballleft=ballobj.x-10;
					var paddleleft=this.x;
					var ballright=ballobj.x+10;
					var balltop=ballobj.y-10;
					var ballbottom=ballobj.y+10;
					var paddletop=this.y;
					var paddlebottom=this.y+this.height;
					if((paddleright>=(ballleft) && paddleleft<=ballright)&& (ballobj.y>=paddletop && ballbottom<=paddlebottom+10))
						{
						this.control=0;
						this.score++;
						return true;
						}
					else
						return false;
				}
}
function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}
function unhide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'table';
  }
}
function ball(x,y,r,path,angle)
{
	this.startx=x;
	this.starty=y;
	this.path=0;
	this.radius=r;
	this.speed=1;
	this.angle=angle/180*3.14;
	this.multiplierx=-1;
	this.multipliery=1;
	this.newPos=function()
				{
					this.x=this.startx+this.multiplierx*(this.path*Math.cos(this.angle));
					this.y=this.starty+this.multipliery*(this.path*Math.sin(this.angle));
					this.path+=this.speed;
				}
	this.update=function()
				{
					var ctx=GameArea.context;
					ctx.beginPath();
					ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
					ctx.fillStyle='white';
					ctx.fill();
				}
}
function checkboundarycollision()
{
	if(gameball.y<=10)
		{
			gameball.speed+=0.5;
			gameball.startx=gameball.x;
			gameball.starty=gameball.y;
			gameball.multiplierx*=1;
			gameball.multipliery*=-1;
			gameball.path=0;
			gameball.newPos();
		}
	else if(gameball.y>=290)
		{
			gameball.speed+=0.5;
			gameball.startx=gameball.x;
			gameball.starty=gameball.y;
			gameball.multiplierx*=1;
			gameball.multipliery*=-1;
			gameball.path=0;
			gameball.newPos();
		}
}
function findangle(startx,starty,x,y)
{
	gameball.angle=-Math.atan((y-starty)/(x-startx));
}
function instruct_2()
{
no_of_players=2;
document.getElementById("score").innerHTML="Player 1: Press 'w' to go up Press 'x' to go down <br> Player 2:Use up and down arrow keys <br> Press Enter to continue";
}
function updateGame()
{
	frame=requestAnimationFrame(updateGame);
	if(!waiting)
	{
	gameball.newPos();
	paddle1.update();
	paddle2.update();
	}
	checkboundarycollision();
	
	if(GameArea.key && GameArea.key == 84 && waiting)
	{
		instruct_2();
	}
	if(GameArea.key && GameArea.key == 83 && waiting)
	{
		waiting=false;
		no_of_players=1;
		document.getElementById("score").innerHTML="Score : "+score;
	}
	if(paddle1.crashWith(gameball) )
	{
		gameball.startx=25;
		gameball.multiplierx*=-1;
		gameball.path=0;
		gameball.starty=gameball.y;
		gameball.multipliery*=1;
		gameball.newPos();
		setTimeout(function()
					{
					paddle1.y=Math.floor(Math.random()*241);
					},500);
		paddle2.control=1;
	}
	else if(paddle2.crashWith(gameball))
	{
		gameball.startx=gameball.x;
		gameball.multiplierx*=-1;
		gameball.multipliery*=1;
		gameball.starty=gameball.y;
		gameball.path=0;
		gameball.newPos();
		setTimeout(function()
					{
					paddle2.y=Math.floor(Math.random()*241);
					},500);
		paddle1.control=1;
	}
	if(no_of_players==1)
	{
	document.getElementById("score").innerHTML="Score : "+(paddle1.score+paddle2.score);
	if(GameArea.key && GameArea.key == 38 && !waiting)
		{
		if(paddle1.control==1)
			paddle1.y-=1;
		else if(paddle2.control==1)
			paddle2.y-=1;
		}
	if(GameArea.key && GameArea.key == 40 && !waiting)
		{
			if(paddle1.control==1)
			paddle1.y+=1;
		else if(paddle2.control==1)
			paddle2.y+=1;
		}
	}
	else if(no_of_players==2)
	{
		document.getElementById("1").innerHTML=paddle1.score;
		document.getElementById("2").innerHTML=paddle2.score;
		if(GameArea.key && GameArea.key== 13)
		{
			waiting=false;
			unhide(document.getElementById("score-board"));
			hide(document.getElementById("score"));
		}
		if(GameArea.key && GameArea.key== 87 && !waiting)
		{
			if(paddle1.control==1)
			paddle1.y-=1;
		}
		if(GameArea.key && GameArea.key== 88 && !waiting)
		{
			if(paddle1.control==1)
			paddle1.y+=1;
		}
		if(GameArea.key &&  GameArea.key ==38 && paddle2.control)
			paddle2.y-=1;
		if(GameArea.key && GameArea.key == 40 && paddle2.control)
			paddle2.y+=1;
	}
	GameArea.clear();
	gameball.update();
	paddle1.update();
	paddle2.update();
	if(gameball.x<=10 || gameball.x>= 290 && !waiting)
	{
		GameArea.clear();
		hide(document.getElementById("score"));
		var ctx=GameArea.context;
		ctx.font = "15px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		if(no_of_players==1)
		ctx.fillText("Game Over - SCORE:  "+(paddle1.score+paddle2.score), GameArea.canvas.width/2, GameArea.canvas.height/2);
		else
		{
		hide(document.getElementById("score-board"));
		ctx.fillText("Game Over ",GameArea.canvas.width/2,GameArea.canvas.height/2);
		ctx.fillText("Player 1: "+paddle1.score,GameArea.canvas.width/2,GameArea.canvas.height/2+20);
		ctx.fillText("Player 2: "+paddle2.score,GameArea.canvas.width/2,GameArea.canvas.height/2+40);
		}
		cancelAnimationFrame(frame);
	}
}

function startGame()
{
	paddle1=new component(0,100,15,60,1);
	paddle2=new component(285,100,15,60,0);
	var angle=Math.random()*61;
	gameball=new ball(140,140,10,100,angle);
	gameball.newPos();
	hide(document.getElementById("score-board"));
	GameArea.start();
	paddle1.update();
	paddle2.update();
	gameball.update();
	updateGame();
}