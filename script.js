/*----- constants -----*/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 800; //set canvasWidth
const canvasHeight = 800; //set canvasHeight
// const colors = ['#e6e6e6','#f7f7f7','#fffff'];
// const colors = ['#A0CED9','#B7E4C7','#AFE1E7','#D8BFD8','#FFC0CB'];
const colors = ['#3fc6cc','#efcc1a','#f08519','#f08519','#c9db47'];
// const colorChange = ['#ff1111','#f2e900','#007aff','#02d7f2'];
const colorChange = ['#3fc6cc','#efcc1a','#f08519','#f08519','#c9db47'];
const sizes = [15, 30, 125, 150];
const canvasRect = canvas.getBoundingClientRect();




let isMouseDown = false;
// const clickableArea = {
//     x: player.x,
//     y: player.y,
//     width: 2*player.radius,
//     height: 2*player.radius,
// };


/*----- state variables -----*/
let player;
let bubbles = [];
let players = [];
var speed = 15;

/*----- cached elements -----*/
const restartBtn = document.querySelector('button');
const message = document.querySelector('h3');


/*----- event listeners -----*/

 restartBtn.addEventListener('click', restartGame);

 //follow Mouse movement

 document.addEventListener('mousedown', (event) => {

    const canvas = document.querySelector('canvas');
    const canvasRect = canvas.getBoundingClientRect();

    // console.log(event.clientX, event.clientY);
    // console.log(canvasRect.left,canvasRect.top);
    // console.log(player.x, player.y);

    if (
        event.clientX >= canvasRect.left + player.x - player.radius&&
        event.clientX <= canvasRect.left + player.x + player.radius&&
        event.clientY >= canvasRect.top + player.y - player.radius&&
        event.clientY <= canvasRect.top + player.y + player.radius
    ) {
        isMouseDown = true;
        console.log('isMouseDown is true');
    }

    console.log('isMouseDown is false');

    
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});


document.addEventListener('mousemove', (event) => {
    const canvas = document.querySelector('canvas');
    const canvasRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - canvasRect.left;
    mouseY = event.clientY - canvasRect.top;
});





//  window.onload = function() {
//     restartGame();
//  };

window.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" || event.key == "d" ) {
        player.moveRight();
    } 
    if (event.key == "ArrowLeft" || event.key == "a" ) {
        player.moveLeft();
    }
    if (event.key == "ArrowUp" || event.key == "w" ) {
        player.moveUp();
    }
    if (event.key == "ArrowDown" || event.key == "s" ) {
        player.moveDown();
    }
        
 })

/*----- functions -----*/
function randomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


class Bubble {
    constructor(x, y, radius, color = randomItem(colors)) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    // Getter and setter

    // getBXPos() {
    //     return this.x;
    // }

    // getBYPos() {
    //     return this.y;
    // }
    // getTop() {
    //     return this.y-this.radius;
    // }
    // getBtm(){
    //     return this.y+this.radius;
    // }
    // getLeft() {
    //     return this.x-this.radius;
    // }
    // getRight() {
    //     return this.x+this.radius;
    // }

    // moveLeft() {
    //     if (this.x > 0) {
    //         this.x -= speed;
    //     }
    // }

    // moveRight() {
    //     if (this.x < canvasWidth) {
    //         this.x += speed;
    //     }
    // }

    // moveUp() {
    //     if (this.y > 0) {
    //         this.y -= speed;
    //     }
    // }

    // moveDown() {
    //     if (this.y < canvasHeight) {
    //         this.y += speed;
    //     }
    // }



    moveLeft() {
        this.xVelocity = Math.min(this.xVelocity + 0.5, speed);
        this.x -= this.xVelocity;

        // Wrap around the canvas horizontally
        if (this.x < -this.radius) {
            this.x = canvasWidth + this.radius;
        }
    }

    

    moveRight() {
        this.xVelocity = Math.min(this.xVelocity + 0.5, speed);
        this.x += this.xVelocity;

        // Wrap around the canvas horizontally
        if (this.x > canvasWidth + this.radius) {
            this.x = -this.radius;
        }
    }

   

    moveUp() {
        this.yVelocity = Math.min(this.yVelocity + 0.5, speed);
        this.y -= this.yVelocity;

        // Wrap around the canvas vertically
        if (this.y < -this.radius) {
            this.y = canvasHeight + this.radius;
        }
    }



    moveDown() {
        this.yVelocity = Math.min(this.yVelocity + 0.5, speed);
        this.y += this.yVelocity;

        // Wrap around the canvas vertically
        if (this.y > canvasHeight + this.radius) {
            this.y = -this.radius;
        }
    }



    moveToMouse() {
        if (isMouseDown) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance > 5) {
                this.xVelocity = dx/distance * speed * 0.5;
                this.yVelocity = dy/distance * speed * 0.5;
                const newX = this.x + this.xVelocity;
                const newY = this.y + this.yVelocity;
                // this.x = mouseX;
                // this.y = mouseY;


            

            // Check if the new position is within the canvas bounds
            if (
                newX >= 0 &&
                newX <= canvasWidth &&
                newY >= 0 &&
                newY <= canvasHeight
            ) {
                // Update the player's position
                this.x = newX;
                this.y = newY;
            } else {
                // Keep the player within the canvas bounds
                this.x = Math.max(this.radius, Math.min(newX, canvasWidth - this.radius));
                this.y = Math.max(this.radius, Math.min(newY, canvasHeight - this.radius));
            }
    
            // Wrap around the canvas horizontally
            // if (this.x < -this.radius) {
            //     this.x = canvasWidth + this.radius;
            // } else if (this.x > canvasWidth + this.radius) {
            //     this.x = -this.radius;
            // }
    
            // Wrap around the canvas vertically
            // if (this.y < -this.radius) {
            //     this.y = canvasHeight + this.radius;
            // } else if (this.y > canvasHeight + this.radius) {
            //     this.y = -this.radius;
            // }
        }}
    }

    // Methods

    static generateNonOverlappingPosition(radius, bubbles, color) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (canvasWidth - 2 * radius)) + radius;
            y = Math.floor(Math.random() * (canvasHeight - 2 * radius)) + radius;
        } while (bubbles.some(bubble => Bubble.checkOverlap(bubble, x, y, radius + 15)));
        return new Bubble(x, y, radius, color);
    }

    static checkOverlap(bubble, x, y, radius) {
        return Math.hypot(bubble.x - x, bubble.y - y) < bubble.radius + radius;
    }

    touch(otherBubble) {
        // Check if the bubbles are touching
        if (Bubble.checkOverlap(this, otherBubble.x, otherBubble.y, otherBubble.radius)) {
            // Determine the bubble with the smaller radius
            const smallerBubble = this.radius < otherBubble.radius ? this : otherBubble;
            const largerBubble = this.radius >= otherBubble.radius ? this : otherBubble;
            const totalDistance = Math.hypot(this.x - otherBubble.x, this.y - otherBubble.y);
            let difference;
            // let overRun = false ;
            if (totalDistance >= largerBubble.radius){
                difference = largerBubble.radius + smallerBubble.radius - totalDistance;
            } else {
                difference = 0;
                // overRun = true;
            }
            console.log(difference);

            // Remove the smaller bubble
            const index = bubbles.indexOf(smallerBubble);
            // console.log(index);
            if (index !== -1 && index !== bubbles.length-1) {
                
                bubbles.splice(index, 1);
                score += 1;
            
                console.log(bubbles);
                console.log(players);
                // Increase the radius of the larger bubble
                // largerBubble.radius += smallerBubble.radius*0.5;
                // Increase the radius of the larger bubble in slow motion
                let radiusIncrement = smallerBubble.radius * 0.05;
                let totalIncrease = largerBubble.radius + smallerBubble.radius*0.5;
                let intervalId = setInterval(() => {
                    largerBubble.radius += radiusIncrement;
                    // const colorFixed = largerBubble.color;
                    largerBubble.color = randomItem(colorChange);
                    // smallerBubble.radius -= radiusIncrement;
                    if (largerBubble.radius >=  totalIncrease) {
                        largerBubble.color = 'black';
                        clearInterval(intervalId);
                        
                    }
                }, 50); // Increase the radius every 50 milliseconds
            } else if (index === bubbles.length-1) {
                // largerBubble.radius += difference*0.5;
                // smallerBubble.radius -= difference;
                let radiusIncrement = difference * 0.5 * 0.05;
                let radiusReduce = difference * 0.05 ; 
                let totalIncrease, totalReduce;
                if (difference > 0){
                totalIncrease = largerBubble.radius + difference * 0.5;
                totalReduce = smallerBubble.radius - difference;
                } else {
                    totalIncrease = largerBubble.radius + smallerBubble.radius;
                    totalReduce = smallerBubble.radius;
                    // smallerBubble.radius = 0;
                }
                let intervalId = setInterval(() => {
                    largerBubble.radius += radiusIncrement;
                    smallerBubble.radius -= radiusReduce;
                    largerBubble.color = randomItem(colorChange);
                    if (smallerBubble.radius - radiusReduce >= 0) {
                        smallerBubble.radius -= radiusReduce;
                        // largerBubble.radius += radiusIncrement;
                    } else {
                        smallerBubble.radius = 0;
                        speed = 0;
                        clearInterval(intervalId)
                        // largerBubble.radius = totalIncrease; 
                        // clearInterval(intervalId);
                    }

                    if (largerBubble.radius < totalIncrease) {
                        largerBubble.radius += radiusIncrement;
                        largerBubble.color = randomItem(colorChange);
                      } else {
                        clearInterval(intervalId);
                      }
                    
                    // if (smallerBubble.radius <= totalReduce && largerBubble.radius >= totalIncrease) {
                    //     clearInterval(intervalId);
                    // }
                }, 50); // Increase the radius every 50 milliseconds
                console.log(bubbles);
                console.log(players);

            }
        


            
        }
    }


    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function generateBubbles() {
    const num15 = Math.floor(Math.random() * 20) + 10;
    const num30 = Math.floor(Math.random() * 20) + 5;
    // const num100 = Math.floor(Math.random() * (num30 * 0.5)) + 1;
    // const num150 = Math.floor(Math.random() * (num100 * 0.5)) + 1;
    // const num15 = Math.floor(Math.random() * 40) + 1;
    // const num30 = Math.floor(Math.random() * 20) + 1;
    const num100 = Math.floor(Math.random() * 3) + 1;
    const num150 = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < num150; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(150, bubbles, randomItem(colors));
        bubbles.push(bubble);
        bubble.draw();
    }
    for (let i = 0; i < num100; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(100, bubbles, randomItem(colors));
        bubbles.push(bubble);
        bubble.draw();
    }
    for (let i = 0; i < num30; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(30, bubbles, randomItem(colors));
        bubbles.push(bubble);
        bubble.draw();
    }
    for (let i = 0; i < num15; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(15, bubbles, randomItem(colors));
        bubbles.push(bubble);
        bubble.draw();
    }
}

function initialize() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
} 

initialize();



function startGame() {
    generateBubbles();
    player = Bubble.generateNonOverlappingPosition(20, bubbles, 'black');
    player.draw();
    player.moveToMouse();
    bubbles.push(player);
    // players.push(player);
    startTime = null;
    endTime = null;
    elapsedTime = 0;
    mouseX = 0;
    mouseY = 0;
    score = 0;
    console.log(bubbles);
    console.log(players);

    clickableArea = {
        x: player.x,
        y: player.y,
        width: 2*player.radius,
        height: 2*player.radius,
    };
    
}

startGame();





function restartGame() {
    bubbles = [];
    players = [];
    startGame();
}

function drawWinPopup() {
    // const elapsedTime = endTime - startTime;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = "30px 'Gill Sans'";
    ctx.fillText('Mission Succeeded!', canvas.width / 2, canvas.height / 2-20);
    ctx.fillText(`${score} Bubbles Vanished`, canvas.width / 2, canvas.height / 2+20);
    ctx.fillText(`${(elapsedTime / 1000).toFixed(2)} Seconds`, canvas.width / 2, canvas.height / 2+60);
    return;

}

function drawLosePopup() {
    // const elapsedTime = endTime - startTime;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = "30px 'Gill Sans'";
    ctx.fillText('YOU DID NOT SURVIVE!', canvas.width / 2, canvas.height / 2-20);
    ctx.fillText(`${score} Bubbles Vanished`, canvas.width / 2, canvas.height / 2+20);
    ctx.fillText(`${(elapsedTime / 1000).toFixed(2)} Seconds`, canvas.width / 2, canvas.height / 2+60);
    return;
}

// set stop counting function and store the elapsedTime only once when the condition is met
function stopCounting(){
    if (elapsedTime === 0) {
        endTime = performance.now();
        elapsedTime = endTime - startTime;
    }
}

function animate(step) {
    //Runs animate over and over again 60 frames per second
    initialize();
    player.moveToMouse();
    let playerIsBiggest = true; // Flag to check if the player is the biggest
    let playerIsSmallest = true; // Flag to check if the player is the smallest

    // player.draw();
    if (!startTime) {
        startTime = performance.now();
        console.log(startTime);
    }

    


    bubbles.forEach((bubble,index) => {
        
        bubble.draw();
        // Check for collisions with other bubbles
        for (let i = index + 1; i < bubbles.length; i++) {
            bubble.touch(bubbles[i]);
        }
        // Check if player's radius is smaller than any other bubble
        if (bubble !== player && (player.radius <= bubble.radius || player.radius === 0)) {
            playerIsBiggest = false;

        }

        // Check if player's radius is bigger than any other bubble
        if (bubble !== player && player.radius >= bubble.radius) {
            playerIsSmallest = false;
            
        }
    });

    // If player is the biggest
    if (playerIsBiggest) {
        stopCounting();
        drawWinPopup();
    }

    // If player is the smallest
    if (playerIsSmallest) {
        stopCounting();
        drawLosePopup();
    }




    
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);


