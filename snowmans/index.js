
import {SnowmanController} from "./SnowmanController.js";

window.onload = function() {

    var snowmanController = new SnowmanController();

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 550;
    canvas.height = 582;

    snowmanController.initSnowmans(canvas)

    snowmanController.initSnowmansTextures(canvas);


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowmanController.animationSnowMan(ctx);
    }
    gsap.ticker.add(animate);
};