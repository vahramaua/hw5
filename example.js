 const canvas = document.getElementById("example");
    const context = canvas.getContext("2d");
    let gameStatus = true;

    const background = new Image();
    background.src = "spaceimage4.jpg";
    const goodGuyImg = new Image();
    goodGuyImg.src = "spacecraft2.jpg";
    const spaceStoneImg = new Image();
    spaceStoneImg.src= "meteorite.png";
    const earthImage = new Image();
    earthImage.src = "planet.png";
    const laserImage = new Image();
    laserImage.src = "laser.png";
    const endImage = new Image();
    endImage.src = "endphoto.png"

    const deathSound = new Audio('death.mp3');
    const laserSound = new Audio('laser.wav');


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let goodGuy = {
        x:100,
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
        width: 150,
        height: 150,
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

    function createBadGuys(count) {
        let arr = [];
        let width = 70;
        let height = 50;
        for(let i = 0; i < count; i++) {
            arr[arr.length] = {
                x: getRandomInt(canvas.width, canvas.width + 500),
                y: getRandomInt(0, canvas.height - height),
                width: width,
                height: height,
                xDelta: -1,
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

    function Laser(x, y, xDelta) {
        this.x = x;
        this.y = y;
        this.xDelta = xDelta;
        this.width = 20;
        this.height = 20;
        this.img = laserImage;
        this.draw = function() {
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
        };
        this.update = function() {
            this.x += this.xDelta;
        }
    }

    let array = createBadGuys(10);
    let laserArray = [];

    function intersection(obj1, obj2) {
        if(obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
            return true;
        }
    }

    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;
    const spaceKey= 32;

    document.addEventListener('keydown', function(event) {
        let speed=4; 

        if(event.keyCode === upKey) {
            goodGuy.yDelta = -speed;
           
        }
         if(event.keyCode === downKey){
            goodGuy.yDelta = speed;
           
        }
         if(event.keyCode === rightKey){
            goodGuy.xDelta = speed;
            
        }
         if(event.keyCode === leftKey){
            goodGuy.xDelta = -speed;
            
        }  if(event.keyCode === spaceKey) {
            laserSound.currentTime = speed;
            laserSound.play();
            laserArray[laserArray.length] = new Laser(goodGuy.x + goodGuy.width, (goodGuy.y + goodGuy.height / 2) - 20, 10);
        }
    }, false);

    document.addEventListener('keyup', function(event) {
        goodGuy.xDelta = 0;
        goodGuy.yDelta = 0;
    },false);

     function draw() {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        for(var i = 0; i < array.length; ++i) {
            array[i].draw();
        }
        for(var x = 0; x < laserArray.length; x++){
            laserArray[x].draw();
        }
        goodGuy.draw();
        earth.draw();
    }

     function update() {
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
                    laserArray.splice(x,1);
                    deathSound.currentTime = 0;
                    deathSound.play();
                }
            }
        }
        earth.update();
        goodGuy.update();
        
    }

    function animate() {
        if(gameStatus) {
            let frame = requestAnimationFrame(animate);
            draw();
            update();
            if(array.length === 0) {
                cancelAnimationFrame(frame);
                window.location="example.html"
            }
        } else {
            context.drawImage(endImage,0,0, canvas.width, canvas.height)
        }

    }

    animate();
