
const canvas = document.getElementById("canvas");
    const ctx= canvas.getContext("2d");


    const rand = function(num) {
        return Math.floor(Math.random() * num) + 1;
    };

    const createBoxes = function(count, canvasWidth, canvasHeight) {
        let arr=[];
        const colorArray= ["brown", "gray", "silver", "red", "green"];
        const width =30;
        const height= 30;

        for(let i=0; i<count; i++){
            let obj

            = {
                width: width,
                height: height,
                x: rand(canvasWidth - width),
                y: rand(canvasHeight - height),
                xDelta: 5,
                yDelta: 5,
                color: colorArray[rand(colorArray.length) - 1],
                draw: function () {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.width, this.height)
                },
                update: function () {
                    this.x += this.xDelta;
                    this.y += this.yDelta;
                    if(this.x + this.width >= canvas.width || this.x <= 0) {
                    	this.xDelta *= -1
                    	this.color= colorArray[rand(colorArray.length) - 1];
                    } 
                    if(this.y + this.height >= canvas.height || this.y <= 0){
                    	this.yDelta *= -1
                    	this.color= colorArray[rand(colorArray.length) - 1];
                    };
                }
            };
            arr[i]= obj;
        }
            return arr;
        };

        let newarr= createBoxes(6,canvas.width, canvas.height);
        const draw= function () {
            for(let i=0; i<newarr.length; i++){
                newarr[i].draw();
            }
        };

        const update = function(){
        	for(let i=0; i< newarr.length; i++) {
        		newarr[i].update();

        	}
        }

        const animate = function() {
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            draw();
            update();
        };
        animate();



       

   


     

