var gameball,paddle1,paddle2,frame,score=0,waiting=true;
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
					if((paddleright==ballleft || paddleleft==ballright)&& (ballobj.y>=paddletop || ballbottom==paddletop && ballbottom<=paddlebottom+10))
						{
						this.control=0;
						score++;
						return true;
						}
					else
						return false;
				}
}
function ball(x,y,r)
{
	this.x=x;
	this.y=y;
	this.radius=r;
	this.speed=-1;
	this.newPos=function()
				{
					this.x+=this.speed;
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
function updateGame()
{
	frame=requestAnimationFrame(updateGame);
	if(!waiting)
	{
	gameball.newPos();
	paddle1.update();
	paddle2.update();
	}
	if(paddle1.crashWith(gameball) )
	{
		gameball.speed=1;
		setTimeout(function()
					{
					paddle1.y=Math.floor(Math.random()*241);
					},500);
		paddle2.control=1;
	}
	else if(paddle2.crashWith(gameball))
	{
		gameball.speed=-1;
		setTimeout(function()
					{
					paddle2.y=Math.floor(Math.random()*241);
					},500);
		paddle1.control=1;
	}
	if(GameArea.key && GameArea.key == 38)
		{
		waiting=false;
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
		
	GameArea.clear();
	gameball.update();
	paddle1.update();
	paddle2.update();
	if(gameball.x==10 || gameball.x== 290 && !waiting)
	{
		GameArea.clear();
		var ctx=GameArea.context;
		ctx.font = "15px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Game Over - SCORE:  "+score, GameArea.canvas.width/2, GameArea.canvas.height/2);
		cancelAnimationFrame(frame);
	}
}

function startGame()
{
	paddle1=new component(0,100,15,60,1);
	paddle2=new component(285,100,15,60,0);
	gameball=new ball(140,140,10);
	GameArea.start();
	paddle1.update();
	paddle2.update();
	gameball.update();
	updateGame();
}