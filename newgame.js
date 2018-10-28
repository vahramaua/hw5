const canvas = document.getElementById("game"); 
const context = canvas.getContext("2d");

canvas.width = 1700;
canvas.height = 730;

 
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
  

const background = new Image();
 background.src = "https://png.pngtree.com/thumb_back/fw800/back_pic/00/11/35/07563820c254fd0.jpg";
const goodGuyImg = new Image();
 goodGuyImg.src = "https://opengameart.org/sites/default/files/idle_12.gif";
const badGuyImg = new Image();
 badGuyImg.src= "https://www.dictionary.com/e/wp-content/uploads/2018/06/jack-o-lantern-emoji.png";


const gameData = {
    goodguy:  {
   	  x: 0,
      y: 0,
	    xDelta: 0,
	    yDelta: 0,
	    width: 100,
	    height: 100,
	    image: goodGuyImg,
	    draw: function() { 
	     context.drawImage(this.image, this.x, this.y, this.width, this.height)
	    },
	    update: function() { 
         this.x += this.xDelta;
         this.y += this.yDelta;

               if(this.x + this.width >= canvas.width || this.x <= 0){
                this.xDelta *= -1
               }
               if(this.y + this.height >= canvas.height || this.y <= 0){
                this.yDelta *= -1
               }
          
     
        }
   	},
 

   	badguys: []
}

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function(event) {
	if(event.keyCode === upKey) {
        gameData.goodguy.yDelta = -6;
  	}
  	if(event.keyCode === downKey){
  		 gameData. goodguy.yDelta = 6;
  	}
  	if(event.keyCode === rightKey){
  		  gameData.goodguy.xDelta = 6;
  	}
  	if(event.keyCode === leftKey){
  		 gameData.goodguy.xDelta = -6;
  	}
}, false);
document.addEventListener('keyup', function(event) {
    gameData.goodguy.xDelta = 0;
    gameData.goodguy.yDelta = 0;
},false);


const createBadGuys = function(count, canvaswidth, canvasheight){
  let badguyarr=[]
  for (let i = 0; i < count; i++) {
      badguyarr[i] = {
           x: rand(canvas.width - 100),
           y: rand(canvas.height - 100),
           xDelta: 4,
           yDelta: 4,
           width: 100,
           height: 100,
           image: badGuyImg,
           draw: function() {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
           },
           update: function() {
                this.x += this.xDelta;
                this.y += this.yDelta;
                let xmid = ((this.width / 2) + this.x);
                let ymid = (this.y - (this.height / 2))
              if(xmid <= gameData.goodguy.x + gameData.goodguy.width && xmid >= gameData.goodguy.x && ymid <= gameData.goodguy.y && ymid >= gameData.goodguy.y - gameData.goodguy.height){
                  alert("Game Over");
              }

               if(this.x + this.width >= canvas.width || this.x <= 0){
                this.xDelta *= -1
               }
               if(this.y + this.height >= canvas.height || this.y <= 0){
                this.yDelta *= -1
               }
           }
        }
         gameData.badguys=badguyarr

  }
}


 const draw = function(){
   context.drawImage(background, 0, 0, canvas.width, canvas.height)
   gameData.goodguy.draw();
   for (let i = 0; i < gameData.badguys.length; i++) {
      gameData.badguys[i].draw();
    }

   
 }

  const update = function (){
    gameData.goodguy.update();
    for (let i = 0; i < gameData.badguys.length; i++) {
      gameData.badguys[i].update();
    }
   

  }
  

const loop = function(){
  
 draw();
 update();
 gameData.goodguy.xDelta=0
 gameData.goodguy.yDelta=0
   
	requestAnimationFrame(loop);
}
createBadGuys(2,canvas.width, canvas.height);
 loop();
