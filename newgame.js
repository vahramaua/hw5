const canvas = document.getElementById("game"); 
const context = canvas.getContext("2d");

canvas.width = 1790;
canvas.height = 790;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

 const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
  
const background = new Image();
 background.src = "spaceimage4.jpg";
const goodGuyImg = new Image();
 goodGuyImg.src = "spacecraft2.jpg";
const spacestoneImg = new Image();
 spacestoneImg.src= "meteorite.png";
 const earthimage = new Image();
 earthimage.src = "planet.png";
 const laserimage = new Image();
 laserimage.src = "laser.png";

 debugger


   var goodGuy = {
        x:200,
        y: 0,
        xDelta: 0,
        yDelta: 0,
        width: 150,
        height: 150,
        image: goodGuyImg,
        draw: function() {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        },
        update: function() {
            this.x +=  this.xDelta;
            this.y += this.yDelta ;

            if(this.x <= earth.x + earth.width){
                this.x = earth.x + earth.width;
            }
            if(this.y + this.height >= canvas.height) {
                this.y = canvas.height - this.height;
            }
            if(this.y <= 0) {
                this.y = 0;
            }


        }
    };
  let earth = {
        x:0,
        y:0,
        yDelta: 3,
        width: 200,
        height: 200,
        image: earthImage,
        draw: function(){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        },
        update: function() {
            this.y += this.yDelta;

            if(this.y + this.height >= canvas.height || this.y <= 0) {
                this.yDelta *= -1;
            }
        }
    };


function Laser(x, y, xDelta) {
        this.x = x;
        this.y = y;
        this.xDelta = xDelta;
        this.width = 40;
        this.height = 40;
        this.img = laserImage;
        this.draw = function() {
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
        };
        this.update = function() {
            this.x += this.xDelta;
        }
    };


    function createBadGuys(count) {
        var arr = [];
        var width = 100;
        var height = 100;
        for(var i = 0; i < count; i++) {
            arr[arr.length] = {
                x: getRandomInt(canvas.width, canvas.width + 5000),
                y: getRandomInt(0, canvas.height - height),
                width: width,
                height: height,
                xDelta: -20,
                img: spaceStoneImg,
                draw: function() {
                    context.drawImage(this.img, this.x, this.y, this.width, this.height);
                },
                update: function() {
                    this.x += this.xDelta;
                }
            };
        }
        return arr;
    }

    var laserArray = [];
    var array = createBadGuys(45);

    function intersection(obj1, obj2) {
        if(obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
            return true;
        }
    }
    const update = function (){
    earth.update();
    // goodguy.update();
    for(var i = 0; i < array.length; ++i) {
            array[i].update();
            if(intersection(array[i], earth)) {
                gameStatus = false;
            }
        }
        for(var x = 0; x < laserArray.length; x++){
            laserArray[x].update();
            for(var y = 0; y < array.length; ++y) {
                if(intersection(laserArray[x], array[y])) {
                    array.splice(y, 1);
                }
            }
        }
    };



const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const spacekey= 32;
document.addEventListener('keydown', function(event) {
	if(event.keyCode === upKey) {
        goodguy.yDelta = -10;
        goodguy.update();
  	}
  	else if(event.keyCode === downKey){
  		 goodguy.yDelta = 10;
         goodguy.update();
  	}
  	else if(event.keyCode === rightKey){
  		  goodguy.xDelta = 10;
          goodguy.update();
  	}
  	else if(event.keyCode === leftKey){
  		 goodguy.xDelta = -10;
         goodguy.update();
  	} else if(event.keyCode === spacekey) {
       Laser(goodguy.x + goodguy.width, goodguy.y + goodguy.height / 2, 10);
       laserLoop(laser);
    }
}, false);
document.addEventListener('keyup', function(event) {
    goodguy.xDelta = 0;
    goodguy.yDelta = 0;
},false);


 const draw = function(){
   context.drawImage(background, 0, 0, canvas.width, canvas.height);
   goodguy.draw();
   earth.draw();
   for (let i = 0; i < array.length; i++) {
      array[i].draw();
    }
    for(var x = 0; x < laserArray.length; x++){
            laserArray[x].draw();
          };

  // const update = function (){
  //   earth.update();
  //   // goodguy.update();
  //   for(var i = 0; i < array.length; ++i) {
  //           array[i].update();
  //           if(intersection(array[i], earth)) {
  //               gameStatus = false;
  //           }
  //       }
  //       for(var x = 0; x < laserArray.length; x++){
  //           laserArray[x].update();
  //           for(var y = 0; y < array.length; ++y) {
  //               if(intersection(laserArray[x], array[y])) {
  //                   array.splice(y, 1);
  //               }
  //           }
  //       }
  //   };

  // function laserLoop(obj) {
  //   requestAnimationFrame(laserloop);
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   obj.draw();
  //   obj.update();
  // }

  
// const loop = function(){
//  requestAnimationFrame(loop); 
//  draw();
//  update();
// };
//  loop();
 laserSound.currentTime = 0;
            laserSound.play();
            laserArray[laserArray.length] = new Laser(goodGuy.x + goodGuy.width, (goodGuy.y + goodGuy.height / 2) - 20, 10);


  function animate() {
        if(gameStatus) {
            var frame = requestAnimationFrame(animate);
            //context.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            update();
            if(array.length === 0) {
                cancelAnimationFrame(frame);
                alert("yaaay");
            }
        } else {
            alert("you lose!");
        }

    }

    animate();
