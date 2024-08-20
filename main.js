

class HeroShip {
    constructor(canvas, ctx) {

        this.canvas = canvas;
        this.ctx = ctx

        this.canvasSize();
        this.drawMainShip();

        window.addEventListener('resize', this.canvasSize.bind(this));

        window.addEventListener('resize', this.drawMainShip.bind(this));
    }

    canvasSize() {

        // get window height and width
        const windowInnerHeight = window.innerHeight;
        const windowInnerWidth = window.innerWidth;

        // setting cavans height percentage
        const canvasHeightPercent = windowInnerHeight * 0.35;

        // get window width size percentage which is 100
        let canvasWidthPercent = windowInnerWidth * 1;

        // making the max width of the canvas
        const canvasMaxWidth = canvasWidthPercent >= 475 ? canvasWidthPercent = 475 : canvasWidthPercent = canvasWidthPercent;

        // setting canvas width and height
        this.canvas.height = canvasHeightPercent
        this.canvas.width = canvasMaxWidth

        // get canvas center position
        const centerPosX = canvasMaxWidth / 2;
        const centerPosY = canvasHeightPercent / 2;

        this.drawMainShip(centerPosX, centerPosY)
    }

    drawMainShip(posX, posY) {

        // ship body
        const shipBodyWidth = 75;
        const shipBodyHeight = 150;

        const shipBodyX = posX - (shipBodyWidth / 2);
        const shipBodyY = posY - (shipBodyHeight / 2);

        // wings main body
        const wingsWidth = 210;
        const wingsHeight = 45;

        const wingsX = posX - ( wingsWidth / 2);
        const wingsY = (posY - ( wingsHeight / 2)) + (shipBodyHeight / wingsHeight) * 9;

        // ship head
        const shipHeadHeight = 45;

        const shipHeadStartX = shipBodyX;
        const shipHeadStartY = shipBodyY + 1;
        
        const shipHeadEndX = shipBodyX + (shipBodyWidth / 3);
        const shipHeadEndY = shipBodyY - shipHeadHeight;

        const shipHeadEndX2 = shipBodyX + (shipBodyWidth / 1.55);
        const shipHeadEndY2 = shipBodyY - shipHeadHeight;

        const shipHeadEndX3 = shipBodyX + shipBodyWidth;
        const shipHeadEndY3 = shipBodyY + 1;

        // ship front laser
        const laserHeight = shipHeadHeight + 2;
        const frontLaserX = shipBodyX + (shipBodyWidth / 2.5);
        const frontLaserY = shipBodyY - laserHeight;
        const frontLaserWH = 13.5;

        // left and right tryangle wings
        const leftTryangleStartX = wingsX;
        const leftTryangleStartY = wingsY;
        const leftTryangleEndX = wingsX + (wingsWidth / 2);
        const leftTryangleEndY = wingsY + 5;
        const leftTryangleEndX2 = leftTryangleEndX
        const leftTryangleEndY2 = leftTryangleEndY - 75;

        const rightTryangleStartX = wingsX + wingsWidth;
        const rightTryangleStartY = wingsY;
        const rightTryangleEndX = wingsX + (wingsWidth / 2);
        const rightTryangleEndY = wingsY + 5;
        const rightTryangleEndX2 = rightTryangleEndX;
        const rightTryangleEndY2 = rightTryangleEndY - 75;

        // back turbines
        const leftTurbineX = wingsX + (wingsWidth / 10);
        const rightTurbineX = wingsX + wingsWidth - (wingsWidth / 4.1);
        const turbinesY = wingsY + 40;
        const sidesTurbineWidth = 30;
        const sidesTurbineHeight = 20;

        const shipColor = '#D95B04';

        // ship body
        this.ctx.fillStyle = shipColor;
        this.ctx.fillRect(shipBodyX, shipBodyY, shipBodyWidth, shipBodyHeight);

        // headTryangle
        this.ctx.beginPath();
        this.ctx.strokeStyle = shipColor;
        this.ctx.moveTo(shipHeadStartX, shipHeadStartY);
        this.ctx.lineTo(shipHeadEndX, shipHeadEndY);
        this.ctx.lineTo(shipHeadEndX2, shipHeadEndY2);
        this.ctx.lineTo(shipHeadEndX3, shipHeadEndY3)
        this.ctx.closePath();
        this.ctx.lineWidth = 1;
        this.ctx.fill();

        // front laser
        this.ctx.fillRect(frontLaserX, frontLaserY, frontLaserWH, frontLaserWH);
        this.ctx.fill()

        // ship wings
        this.ctx.fillRect(wingsX, wingsY, wingsWidth, wingsHeight);
        this.ctx.fill()

        // wingFirstTryangle
        this.ctx.beginPath();
        this.ctx.strokeStyle = shipColor;
        this.ctx.moveTo(leftTryangleStartX, leftTryangleStartY);
        this.ctx.lineTo(leftTryangleEndX, leftTryangleEndY);
        this.ctx.lineTo(leftTryangleEndX2, leftTryangleEndY2)
        this.ctx.lineWidth = 1;
        this.ctx.closePath();
        this.ctx.fill();

        // wingSecondTryangle
        this.ctx.beginPath();
        this.ctx.moveTo(rightTryangleStartX, rightTryangleStartY);
        this.ctx.lineTo(rightTryangleEndX, rightTryangleEndY);
        this.ctx.lineTo(rightTryangleEndX2, rightTryangleEndY2);
        this.ctx.closePath();
        this.ctx.fill()
        this.ctx.stroke();


        // Back Turbines
        // left turbine
        this.ctx.fillRect(leftTurbineX, turbinesY, sidesTurbineWidth, sidesTurbineHeight);
        this.ctx.fill()

        // right turbine
        this.ctx.fillRect(rightTurbineX, turbinesY, sidesTurbineWidth, sidesTurbineHeight);
        this.ctx.fill()
    }
}



const canvasBackground = document.querySelector('.space-background');
const ctxBG = canvasBackground.getContext('2d');


// canvasBackground
class StarsAnimation {
    constructor() {

        // array for the stars blueprint created using for loop
        this.starsArray = [];

        // making animation work inside this class
        this.animate = this.animate.bind(this);
        this.animate();

        // initializing resizeCanvas when page loads, because initStars is being called inside of it
        this.resizeCanvas();

        // draw stars when the page resizes
        window.addEventListener('resize', this.draw.bind(this))

        // initializing resizeCanvas on each resize
        window.addEventListener('resize', this.resizeCanvas.bind(this))

    }

    // this will ensure my animation loads correctly when i resize the page, because i'm getting the correct canvas sizes
    resizeCanvas() {

        canvasBackground.width = window.innerWidth;
        canvasBackground.height = window.innerHeight;

        const canvasWidth = canvasBackground.width

        this.initStars(canvasWidth)

        // console.log(canvasWidth)
    }

    // creating blueprints according to each screen size, and storing them inside starsArray
    initStars(canvasWidth) {

        // clean array each time this functions is called, so i dont get duplicated stars
        this.starsArray = [];

        if(canvasWidth >= 100 && canvasWidth < 400) {

            for(let i = 0; i < 50; i++) {

                this.starsArray.push(this.createStars());
            }

        } else if (canvasWidth >= 400 && canvasWidth < 800) {

            for(let i = 0; i < 80; i++) {

                this.starsArray.push(this.createStars());
            }

        } else if (canvasWidth > 800 && canvasWidth < 1200) {

            for(let i = 0; i < 100; i++) {

                this.starsArray.push(this.createStars());
            }

        } else if (canvasWidth >= 1200) {

            for(let i = 0; i < 100; i++) {

                this.starsArray.push(this.createStars());
            }
        }
    }

    // blueprint for the stars, using for loop to create how many these i want
    createStars() {
        return {
            x: Math.floor(Math.random() * window.innerWidth),
            y: Math.floor(Math.random() * window.innerHeight),
            radius1: 1,
            radius2: 4
        }
    }

    // draw stars according with the blueprints stored in starsArray
    draw(star) {

        ctxBG.save()
        ctxBG.beginPath();
        ctxBG.arc(star.x, star.y, star.radius1, 0, 2 * Math.PI);
        ctxBG.fillStyle = '#36BFB1';
        ctxBG.strokeStyle = '#36BFB1';
        ctxBG.fill();
        ctxBG.stroke();
        ctxBG.restore();

        ctxBG.save()
        ctxBG.beginPath();
        ctxBG.arc(star.x, star.y, star.radius2, 0, 2 * Math.PI);
        ctxBG.fillStyle = '#36BFB111';
        ctxBG.strokeStyle = '#36BFB100';
        ctxBG.fill();
        ctxBG.stroke();
        ctxBG.restore();
    }

    // stars moviment
    update(star) {

        // speed change according to screen size
        if(innerWidth >= 100 && innerWidth < 400) {

            star.y += Math.random() * 2 + 0.5;

        } else if (innerWidth >= 400 && innerWidth < 800) {

            star.y += Math.random() * 2 + 1;

        } else if (innerWidth > 800 && innerWidth < 1200) {

            star.y += Math.random() * 3 + 1;

        }

        // making the stars move down the screen and reset them once they get to the bottom
        // Check if the Star is Off the Bottom Edge:
        // Subtracting 4 from star.y (the radius of the larger circle used in draw)
        if (star.y - star.radius2 > window.innerHeight) {

            star.y = -8; // Reposition the Star to the Top: If the star is off the bottom edge, it is repositioned to just above the top edge of the screen (-8 is used to ensure it starts slightly off-screen).

            star.x = Math.random() * innerWidth; // this creates a new random horizontal position when the animation resets to the top
        }

    }

    // animating the stars
    animate() {
        // clean canvas each time the stars move, so i dont get a trail drawing
        ctxBG.clearRect(0, 0, innerWidth, innerHeight);

        this.starsArray.forEach(star => {
            // passing stars blueprint to update they location
            this.update(star);
            // passing blueprints for draw
            this.draw(star);
        })

        requestAnimationFrame(this.animate);
    }
}





class InGameBackground extends StarsAnimation {

    constructor() {
        super()
    }

    update(star){

        if(innerWidth >= 100 && innerWidth < 400) {

            star.y += Math.random() * 4 + 2;

        } else if (innerWidth >= 400 && innerWidth < 800) {

            star.y += Math.random() * 4.5 + 2;

        } else if (innerWidth > 800 && innerWidth < 1200) {

            star.y += Math.random() * 6 + 3;

        } else if (innerWidth >= 1200) {

            star.y += Math.random() * 15 + 5;
        }

        if (star.y - star.radius2 > window.innerHeight) {

            star.y = -8;

            star.x = Math.random() * innerWidth;
        }
    }
}











class HeroShipInGame {
    constructor(canvasGameplay, ctxGame) {

        this.canvasGameplay = canvasGameplay;
        this.ctxGame = ctxGame;

        this.shipPosX = this.canvasGameplay.width / 2;
        this.shipPosY = this.canvasGameplay.height / 1.5;
        this.shipSidesScreColi = 35;
        this.shipTopScreColi = 36.5;
        this.shipBottomScrenColi = 22.5;

        this.shipMoviment = {
            up: false,
            down: false,
            left: false,
            right: false,
        }// keeps track of which direction keys are currently being held down.

        // speed on each screen config
        this.defaultSpeed = 8;

        // handling screen size. so depending on the size of the screen the speed of the ship is increased
        this.handleResize = this.handleResize.bind(this);

        this.resizeTimer = null; // Initializes to null, This will be used to store the timer ID for the resize event.

        window.onresize = this.handleResize; // Sets up an event listener that calls the handleResize method whenever the window is resized.

        this.screenSpeedChanger(); // this function increase or decrase the ship speed according with the screen size

        this.drawing();

        window.addEventListener('resize', this.canvasResize.bind(this));

        window.addEventListener('keydown', this.keyDownHandler.bind(this))

        window.addEventListener('keyup', this.keyUpHandler.bind(this))

        this.animation();

    }

    screenSpeedChanger() {

        let width = this.canvasGameplay.width;

        // get a small number each time the screen size is increased by 375px
        const increaseFactor = Math.floor(width / 375)

        // now each time the screen size is increased by 375 i will multiply increaseFactor by two, giving me the acceleration that i want for my ship on each screen size
        const speedChanger = width >= 1000 ? increaseFactor * 3 : increaseFactor * 2;

        // check 375px increase
        if(increaseFactor > 0){

            this.defaultSpeed = 8 // reseting speed on each increase

            this.defaultSpeed += speedChanger; // add speed on each increase

        } else {

            this.defaultSpeed = 8
        };
    }

    // This function is called whenever the window is resized.
    handleResize() {

        clearTimeout(this.resizeTimer); // Clears any previously set timeout to prevent multiple executions of getScreenWidth during resizing.

        this.resizeTimer = setTimeout(() => {

            this.screenSpeedChanger();

        }, 300); // Sets a new timeout to call getScreenWidth after 300 milliseconds of inactivity (no resizing). This delay ensures that getScreenWidth is only called once resizing has stopped.
    }


    canvasResize() {

        // ajusting canvas to resize
        this.canvasGameplay.width = window.innerWidth;
        this.canvasGameplay.height = window.innerHeight;

        //get screen total width
        const screenWidth = window.innerWidth;

        // centering the ship in the screen
        this.shipPosX = screenWidth / 2;
        // console.log(window.innerWidth)

        this.drawing();

    }

    drawing() {

        const posX = this.shipPosX
        const posY = this.shipPosY

        // ship body
        const shipBodyWidth = 25;
        const shipBodyHeight = 50;

        const shipBodyX = posX - (shipBodyWidth / 2);
        const shipBodyY = posY - (shipBodyHeight / 2);

        // wings main body
        const wingsWidth = 70;
        const wingsHeight = 15;

        const wingsX = posX - ( wingsWidth / 2);
        const wingsY = (posY - ( wingsHeight / 2)) + (shipBodyHeight / wingsHeight) * 3;

        // ship head
        const shipHeadHeight = 15;

        const shipHeadStartX = shipBodyX;
        const shipHeadStartY = shipBodyY + 1;
        
        const shipHeadEndX = shipBodyX + (shipBodyWidth / 3);
        const shipHeadEndY = shipBodyY - shipHeadHeight;

        const shipHeadEndX2 = shipBodyX + (shipBodyWidth / 1.55);
        const shipHeadEndY2 = shipBodyY - shipHeadHeight;

        const shipHeadEndX3 = shipBodyX + shipBodyWidth;
        const shipHeadEndY3 = shipBodyY + 1;

        // ship front laser
        const laserHeight = shipHeadHeight + 2;
        const frontLaserX = shipBodyX + (shipBodyWidth / 2.5);
        const frontLaserY = shipBodyY - laserHeight;
        const frontLaserWH = 4.5;

        // left and right tryangle wings
        const leftTryangleStartX = wingsX;
        const leftTryangleStartY = wingsY;
        const leftTryangleEndX = wingsX + (wingsWidth / 2);
        const leftTryangleEndY = wingsY + 5;
        const leftTryangleEndX2 = leftTryangleEndX
        const leftTryangleEndY2 = leftTryangleEndY - 30;

        const rightTryangleStartX = wingsX + wingsWidth;
        const rightTryangleStartY = wingsY;
        const rightTryangleEndX = wingsX + (wingsWidth / 2);
        const rightTryangleEndY = wingsY + 5;
        const rightTryangleEndX2 = rightTryangleEndX;
        const rightTryangleEndY2 = rightTryangleEndY - 30;

        // back turbines
        const leftTurbineX = wingsX + (wingsWidth / 10);
        const rightTurbineX = wingsX + wingsWidth - (wingsWidth / 4.1);
        const turbinesY = wingsY + 10;
        const sidesTurbineWidth = 10;
        const sidesTurbineHeight = 10;

        const shipColor = '#D95B04';

        // ship body
        this.ctxGame.fillStyle = shipColor;
        this.ctxGame.fillRect(shipBodyX, shipBodyY, shipBodyWidth, shipBodyHeight);

        // headTryangle
        this.ctxGame.beginPath();
        this.ctxGame.strokeStyle = shipColor;
        this.ctxGame.moveTo(shipHeadStartX, shipHeadStartY);
        this.ctxGame.lineTo(shipHeadEndX, shipHeadEndY);
        this.ctxGame.lineTo(shipHeadEndX2, shipHeadEndY2);
        this.ctxGame.lineTo(shipHeadEndX3, shipHeadEndY3)
        this.ctxGame.closePath();
        this.ctxGame.lineWidth = 1;
        this.ctxGame.fill();

        // front laser
        this.ctxGame.fillRect(frontLaserX, frontLaserY, frontLaserWH, frontLaserWH);
        this.ctxGame.fill()

        // ship wings
        this.ctxGame.fillRect(wingsX, wingsY, wingsWidth, wingsHeight);
        this.ctxGame.fill()

        // wingFirstTryangle
        this.ctxGame.beginPath();
        this.ctxGame.strokeStyle = shipColor;
        this.ctxGame.moveTo(leftTryangleStartX, leftTryangleStartY);
        this.ctxGame.lineTo(leftTryangleEndX, leftTryangleEndY);
        this.ctxGame.lineTo(leftTryangleEndX2, leftTryangleEndY2)
        this.ctxGame.lineWidth = 1;
        this.ctxGame.closePath();
        this.ctxGame.fill();

        // wingSecondTryangle
        this.ctxGame.beginPath();
        this.ctxGame.moveTo(rightTryangleStartX, rightTryangleStartY);
        this.ctxGame.lineTo(rightTryangleEndX, rightTryangleEndY);
        this.ctxGame.lineTo(rightTryangleEndX2, rightTryangleEndY2);
        this.ctxGame.closePath();
        this.ctxGame.fill()
        this.ctxGame.stroke();


        // Back Turbines
        // left turbine
        this.ctxGame.fillRect(leftTurbineX, turbinesY, sidesTurbineWidth, sidesTurbineHeight);
        this.ctxGame.fill()

        // right turbine
        this.ctxGame.fillRect(rightTurbineX, turbinesY, sidesTurbineWidth, sidesTurbineHeight);
        this.ctxGame.fill()
    }


    keyDownHandler(e) {

        const pressedKey = e.key

        if(pressedKey === 'ArrowUp'){

            this.shipMoviment.up = true;
        }
        if(pressedKey === 'ArrowDown'){

            this.shipMoviment.down = true;
        }
        if(pressedKey === 'ArrowLeft'){

            this.shipMoviment.left = true;
        }
        if(pressedKey === 'ArrowRight'){

            this.shipMoviment.right = true;
        }
    }

    keyUpHandler(e) {

        const pressedKey = e.key

        if(pressedKey === 'ArrowUp'){

            this.shipMoviment.up = false;
        }
        if(pressedKey === 'ArrowDown'){

            this.shipMoviment.down = false;
        }
        if(pressedKey === 'ArrowLeft'){

            this.shipMoviment.left = false;
        }
        if(pressedKey === 'ArrowRight'){

            this.shipMoviment.right = false;
        }
    }


    animation() {

        // checking to see if im pressing a specific key, meaning if they value are true, the animation will start
        if(this.shipMoviment.up){

            this.shipPosY -= this.defaultSpeed

            if(this.shipPosY - this.shipTopScreColi < 0) {

                this.shipPosY += this.defaultSpeed
            }
        }

        if(this.shipMoviment.down){

            this.shipPosY += this.defaultSpeed

            if(this.shipPosY + this.shipBottomScrenColi > window.innerHeight) {
                
                this.shipPosY -= this.defaultSpeed
            }

        }

        if(this.shipMoviment.left){

            this.shipPosX -= this.defaultSpeed

            if(this.shipPosX - this.shipSidesScreColi < 0){

                this.shipPosX += this.defaultSpeed
            }
        }

        if(this.shipMoviment.right){

            this.shipPosX += this.defaultSpeed

            if(this.shipPosX + this.shipSidesScreColi > window.innerWidth){

                this.shipPosX -= this.defaultSpeed
            }
        }

        this.ctxGame.clearRect(0, 0, innerWidth, innerHeight);
        this.drawing();
        requestAnimationFrame(this.animation.bind(this));
    }
}












class HeroGun extends HeroShipInGame {
    constructor(canvasGameplay, ctxGame){

        super(canvasGameplay, ctxGame)

        this.shots = [];
        this.shotSpeed = 15;

        window.addEventListener('keypress', this.hangleSpacePress.bind(this))

        window.addEventListener('resize', this.speedChanger.bind(this))

        this.shotAnimation();

        this.speedChanger();
    }

    speedChanger() {

        let width = this.canvasGameplay.width;

        const increaseFactor = Math.floor(width / 375)

        const changer = width >= 1000 ? increaseFactor * 3.6 : increaseFactor * 2;

        if(increaseFactor > 0){

            this.shotSpeed = 12

            this.shotSpeed += changer;

        } else {

            this.shotSpeed = 12
        };
    }

    drawShots() {

        if(this.shots.length > 0) {

            this.shots.forEach(shot => {

                this.ctxGame.beginPath();
                this.ctxGame.fillStyle = '#F2E307';
                this.ctxGame.strokeStyle = '#F2E307';
                this.ctxGame.fillRect(shot.x, shot.y, shot.width, shot.height);
                this.ctxGame.lineWidth = 3;
                this.ctxGame.fill();
                this.ctxGame.stroke();
            })
        }

    }

    hangleSpacePress(e) {

        if(e.key === ' ') {

            this.shots.push({

                    x: this.shipPosX - 1.5,
                    y: this.shipPosY - 48,
                    speed: this.shotSpeed,
                    width: 4.5,
                    height: 15,
            })

        }
    }

    shotAnimation() {

        this.shots = this.shots.filter(shot => shot.y > 0) // Remove shots that go off-screen

        this.shots.forEach(shot => {

            shot.y -= shot.speed
        })

        this.ctxGame.clearRect(0, 0, innerWidth, innerHeight); // cleaning the canvas on each shot

        this.drawing(); // drawing the ship again on each shot

        this.drawShots(); // redrawing the shots on each shot

        requestAnimationFrame(this.shotAnimation.bind(this))
    }
}




// now i need to make the asteroids appear constantly between time intervals or if i destroy a certain amount of asteroids

class Asteroids extends HeroGun {
    constructor(canvasGameplay, ctxGame) {
        super(canvasGameplay, ctxGame);

        this.screenWidth = this.canvasGameplay.width;

        this.asteroidRadius = 50;
        this.asteroidSides = 8;
        this.asteroidX = this.bigAsteroidX(); // position on canvas
        this.asteroidY = this.bigAsteroidY(); // position on canvas
        this.baseColor = 'green';
        this.damageColor = '#00e100';
        this.damageTaken = [];
        this.damageThreshold = 7;
        this.asteroids = [];


        this.miniAsteroidRadius = Math.floor(Math.random() * 10 + 3);
        this.miniAsteroidSides = 8;
        this.miniAsteroidX = this.asteroidX;
        this.miniAsteroidY = this.asteroidY;
        this.miniAsteroidsAmount = Math.floor(Math.random() * 8 + 1);
        this.miniAsteroids = [];
        this.miniDamageTaken = [];
        this.miniDamageThreshold = 1;

        this.destroyedAsteroidsCount = 0;
        this.newAsteroidsThreshold = this.createdAsteroidsAmount();

        this.asteroidAnimation();

        this.initBigAsteroids();
    };

    drawAsteroid(asteroid) {
        
        this.ctxGame.beginPath();
        this.ctxGame.fillStyle = asteroid.color;
        this.ctxGame.strokeStyle = 'aquamarine';
        this.ctxGame.lineWidth = 2;

        for(let i = 0; i < asteroid.sides; i ++) {

            // Incorporating Rotation, Calculate angle for each vertex
            const angle = i * 2 * Math.PI / asteroid.sides + asteroid.rotation; // For each vertex 'i', compute the angle by multiplying 'i' with the angle between consecutive vertices.

            const x = asteroid.x + asteroid.radius * Math.cos(angle); // returns the x-coordinate of a point on the unit circle (a circle with radius 1) at the given angle.

            const y = asteroid.y + asteroid.radius * Math.sin(angle); // returns the y-coordinate of a point on the unit circle at the given angle.

            if(i === 0) {
                this.ctxGame.moveTo(x, y); // for the first vertex to move the drawing cursor to the start position.
            } else {
                this.ctxGame.lineTo(x, y); // for subsequent vertices to draw lines between them.
            };

            // By using Math.cos and Math.sin, the code accurately places each vertex of the octagon around the center point (this.asteroidX, this.asteroidY) at the correct distance (this.asteroidRadius), forming a regular octagon.
        };

        this.ctxGame.fill();
        this.ctxGame.closePath();
        this.ctxGame.stroke();
    };

    bigAsteroidX () {

        const canvasWidth = this.canvasGameplay.width;

        const x = Math.random() * (canvasWidth - 2 * this.asteroidRadius) + this.asteroidRadius;

        return x;
    };

    bigAsteroidY() {

        const canvasHeight = this.canvasGameplay.height;

        let y = (canvasHeight - canvasHeight) - 400;

        return y;
    };

    creatingAsteroid() {

        const x = this.bigAsteroidX();
        const y = this.bigAsteroidY();

        const increaseFactor = Math.floor(this.screenWidth / 500);

        const speed = increaseFactor >= 2 ? Math.random() * (increaseFactor + 2) + (increaseFactor + 2) : Math.random() * 2 + 2;

        const xNumber = increaseFactor + 3;
        const velocityX = increaseFactor >= 2 ? Math.random() * xNumber - (xNumber / 2) : Math.random() * 3 - 1.5;

        const rotation = Math.random() * Math.PI * 2;
        const rotationSpeed = Math.random() * 0.08 - 0.04;

        return {
            x,
            y,
            radius: this.asteroidRadius,
            sides: this.asteroidSides,
            damage: 0,
            color: 'green',
            isBroken: false,
            speed,
            velocityX,
            rotation,
            rotationSpeed,
        };
    };

    createdAsteroidsAmount() {

        const amountFactor = Math.floor(this.screenWidth / 500);

        const incrementedAmount = amountFactor > 0 ? amountFactor + 1 : amountFactor;

        const baseAsteroidAmount = 4;

        const numberOfAsteroids = this.screenWidth >= 1000 ? (baseAsteroidAmount * incrementedAmount) - 6 : (baseAsteroidAmount * incrementedAmount) - 2;

        return numberOfAsteroids;
    }

    initBigAsteroids() {

        // how many asteroids are being formed according with screen size?
        const amountFactor = Math.floor(this.screenWidth / 500);

        const incrementedAmount = amountFactor > 0 ? amountFactor + 1 : amountFactor;

        const baseAsteroidAmount = 4;

        const numberOfAsteroids = baseAsteroidAmount * incrementedAmount;

        for(let i = 1; i <= numberOfAsteroids; i++){

            this.asteroids.push(this.creatingAsteroid());
        };
    };

    updateBigAsteroid(bigAsteroid) {

        bigAsteroid.y += bigAsteroid.speed;

        bigAsteroid.x += bigAsteroid.velocityX;

        bigAsteroid.rotation += bigAsteroid.rotationSpeed;

        if(bigAsteroid.y - bigAsteroid.radius > this.canvasGameplay.height) {
            
            bigAsteroid.y = -bigAsteroid.radius;
            bigAsteroid.damage = 0;

            const increaseFactor = Math.floor(this.screenWidth / 500);
            const xNumber = increaseFactor + 3;

            bigAsteroid.speed = increaseFactor >= 2 ? Math.random() * (increaseFactor + 2) + (increaseFactor + 2) : Math.random() * 2 + 2;

            bigAsteroid.velocityX  = increaseFactor >= 2 ? Math.random() * xNumber - (xNumber / 2) : Math.random() * 3 - 1.5;
        };

        if(bigAsteroid.x - bigAsteroid.radius < 0 || bigAsteroid.x + bigAsteroid.radius > this.canvasGameplay.width + 5){

            bigAsteroid.velocityX *= -1; // Reverse direction if hitting the wall
            bigAsteroid.rotation *= -1;
        };
    };

    checkCollision() {

        this.asteroids.forEach(asteroid => {

            if(asteroid.isBroken) {
                return; // Skip broken asteroids
            };

            this.shots = this.shots.filter((shot) => {

                // An array of objects representing the four corners of the shot rectangle.
                const corners = [
    
                    {x: shot.x, y: shot.y}, // Top-left corner
                    {x: shot.x + shot.width, y: shot.y}, // Top-right corner
                    {x: shot.x, y: shot.y + shot.height}, // Bottom-left corner
                    {x: shot.x + shot.width, y: shot.y + shot.height} // Bottom-right corner
                ];
    
                // Loop through each corner in the corners array.
                for(let corner of corners) {
    
                    const dx = corner.x - asteroid.x; // Calculate the horizontal distance from the corner to the center of the asteroid.
    
                    const dy = corner.y - asteroid.y; // Calculate the vertical distance from the corner to the center of the asteroid.
    
                    const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the Euclidean distance between the corner and the center of the asteroid.
    
                if(distance < asteroid.radius) {
    
                    asteroid.color = '#00e100';
    
                    setTimeout(() => {
                        asteroid.color = 'green';
                    }, 100);
    
                    asteroid.damage += 1;
    
                    if(asteroid.damage >= this.damageThreshold) {

                        asteroid.isBroken = true;
                        this.destroyedAsteroidsCount++;

                        if(this.destroyedAsteroidsCount >= this.newAsteroidsThreshold) {
                            
                            this.destroyedAsteroidsCount = 0;
                            this.initBigAsteroids();(asteroid);
                        }
                        
                        setTimeout(() => {

                            this.initMiniAsteroids(asteroid);

                        }, 105);
                    };
    
                    return false;
                };
                };
    
                return true;
            });
        });
        
    };



    drawMiniAsteroids(asteroid) {

        this.ctxGame.beginPath();
        this.ctxGame.fillStyle = this.baseColor;
        this.ctxGame.strokeStyle = this.baseColor;
        this.ctxGame.lineWidth = 2;

        for(let i = 0; i < asteroid.sides; i ++) {

            // adding rotation to angle to make a rotation animation
            const angle = i * 2 * Math.PI / asteroid.sides + asteroid.rotation;

            const x = asteroid.x + asteroid.radius * Math.cos(angle);

            const y = asteroid.y + asteroid.radius * Math.sin(angle);

            if(i === 0) {
                this.ctxGame.moveTo(x, y);
            } else {
                this.ctxGame.lineTo(x, y); 
            };
        };

        this.ctxGame.fill();
        this.ctxGame.closePath();
        this.ctxGame.stroke();
    };

    createMiniAsteroid(bigAsteroid, index, total) {

        const increaseFactor = this.screenWidth / 750;
        const baseIncreaseFactor = increaseFactor + 1;

        // Distribute the mini asteroids evenly around the main asteroid.
        const angle = index * 2 * Math.random() + Math.PI / total; // The angle for each mini asteroid is calculated by multiplying the index by 2 * Math.PI / total.
        // 2 * Math.PI is the total angle in radians for a full circle (360 degrees).
        // Dividing 2 * Math.PI by total gives the angle increment needed to evenly distribute the asteroids around the circle.
        // Multiplying this increment by the index ensures each asteroid is placed at the correct angle.

        const distanceFromCenter = Math.random() * (bigAsteroid.radius + 10); // 20: This number is added to ensure that the mini asteroids are positioned a litlle more outside of the main asteroid. You can adjust this number based on how close you want the mini asteroids to appear to the center.

        const x = bigAsteroid.x + distanceFromCenter * Math.cos(angle);
        const y = bigAsteroid.y + distanceFromCenter * Math.sin(angle);
        // Math.cos(angle) and Math.sin(angle) are used to convert the polar coordinates (angle and radius) into Cartesian coordinates (x and y). // By adding these values to this.asteroidX and this.asteroidY, the mini asteroids are correctly positioned relative to the center of the big asteroid.

        const radius = Math.floor(Math.random() * 10 + 10);

        let speed = Math.random() * 0.2 + 0.1;


        let velocityX = Math.random() * 0.2 - 0.1;


        const rotation = Math.random() * Math.PI * 2;
        const rotationSpeed = Math.random() * 0.02 - 0.02;

        return {
            x,
            y,
            radius,
            sides: 8,
            damage: 0,
            baseIncreaseFactor,
            increaseFactor,
            speed,
            velocityX,
            rotation,
            rotationSpeed,
        };
    };

    updateMiniAsteroid(mini) {

        mini.y += mini.speed;

        mini.x += mini.velocityX;

        mini.rotation += mini.rotationSpeed;

        if(mini.y - mini.radius > this.canvasGameplay.height) {

            // Reset the speed and velocityX with new random values
            mini.speed = Math.random() * 0.2 + 0.1;

            mini.velocityX = Math.random() * 0.2 - 0.1;

            mini.rotationSpeed = Math.random() * 0.02 - 0.02;
        };

        if(mini.x - mini.radius < 0 || mini.x + mini.radius > this.canvasGameplay.width){

            mini.velocityX *= -1; // Reverse direction if hitting the wall
        };
    };

    initMiniAsteroids(bigAsteroid) {
        const total = 3;
        for(let i = 0; i < total; i++){

            this.miniAsteroids.push(this.createMiniAsteroid(bigAsteroid, i, total))
            // passing in parameters for createMiniAsteroid
            // "bigAsteroid" is to create the mini Asteroids inside each individual big asteroid
            // "i" in the loop represents the position of the current mini asteroid being created.
            // "total" represents the total number of mini asteroids to be created.
        };
    };


    checkMiniAsteroidsCollision() {

        const asteroidsToRemove = [];

        this.miniAsteroids.forEach(miniAsteroid => {

            // filtering through shots
            this.shots = this.shots.filter((shot) => {

                // creating shots corners
                const corners = [
                    {x: shot.x, y: shot.y},
                    {x: shot.x + shot.width, y: shot.y},
                    {x: shot.x, y: shot.y + shot.height},
                    {x: shot.x + shot.width, y: shot.y + shot.height},
                ];

                // get corners arrays objects
                for(let corner of corners) {

                    const dx = corner.x - miniAsteroid.x;
                    const dy = corner.y - miniAsteroid.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if(distance < miniAsteroid.radius) {

                    miniAsteroid.damage += 1;

                    // applying damage threshold to mini asteroids
                    if(miniAsteroid.damage >= this.miniDamageThreshold) {

                        asteroidsToRemove.push(miniAsteroid); // storing damaged asteroids
                    };
                    return false; // take out shot
                };

                };

                return true; // keep shot

               });

               this.miniAsteroids = this.miniAsteroids.filter(asteroid => !asteroidsToRemove.includes(asteroid)); // take out from the normal array the mini asteroids destroyed
        });
    };

    asteroidAnimation() {

        this.asteroids.forEach(bigAsteroid => {

            if(!bigAsteroid.isBroken) {

                this.drawAsteroid(bigAsteroid);
                this.updateBigAsteroid(bigAsteroid);

            };
            
            this.miniAsteroids.forEach((mini) => {

                this.drawMiniAsteroids(mini);
                this.updateMiniAsteroid(mini);
            });

        });

        this.checkCollision();
        this.checkMiniAsteroidsCollision();
        requestAnimationFrame(this.asteroidAnimation.bind(this));
    };
};










function init() {
    switch(window.location.pathname) {
        case '/JavaScript/Java-Projects/Brave-Hero-Spaceship/Menu.html':

            const canvas = document.querySelector('.menu-canvas');
            const ctx = canvas.getContext('2d');

            new HeroShip(canvas, ctx);

            // ------------------------------------------

            new StarsAnimation();

            console.log('menu')

            break;

        case '/JavaScript/Java-Projects/Brave-Hero-Spaceship/index.html':

            new InGameBackground();

            const canvasGameplay = document.querySelector('.canvas-gameplay')
            const ctxGame = canvasGameplay.getContext('2d')

            canvasGameplay.width = window.innerWidth;
            canvasGameplay.height = window.innerHeight;

            new HeroShipInGame(canvasGameplay, ctxGame);
            new HeroGun(canvasGameplay, ctxGame);
            new Asteroids(canvasGameplay, ctxGame);


            console.log('in-game');

            break;
    }
}

window.addEventListener('DOMContentLoaded', init);
