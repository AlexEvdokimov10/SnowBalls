import {SnowController} from "./SnowController.js"
import {SnowmanController} from "./SnowmanController.js";

const PATH_SNOWMAN = "../assets/canvas_snowman.png";

window.onload = function(){

    var snowController = new SnowController(50)
    var snowmanController = new SnowmanController()

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 335;
    canvas.height = 582;
    var imagesLoaded = 0;




    snowmanController.initSnowmans(canvas)
    snowmanController.loadImage(PATH_SNOWMAN, imageLoaded)


    snowController.generateParticles(canvas)

    snowmanController.gsapToSnowman()



    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка canvas один раз
        snowController.animateSnow(canvas,ctx)
        snowmanController.animationSnowMan(ctx)
        requestAnimationFrame(animate);
    }



    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            requestAnimationFrame(animate);
        }
    }


}