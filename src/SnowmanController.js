
export class SnowmanController {

    constructor() {
        this.snowmanImages = [];
        this.snowmansHeight = 180;
        this.snowmansWidth = 150;
        this.angle = 0
        this.amplitude = 30
    }

    initSnowmans(canvas){
        this.snowmanImages.push(
            {img: new Image(this.snowmansWidth, this.snowmansHeight),
                locationWidth: canvas.width / 4,
                locationHeight: canvas.height - 10, rotate: -1},
            {img: new Image(this.snowmansWidth, this.snowmansHeight),
                locationWidth: canvas.width - this.snowmansWidth / 2,
                locationHeight: canvas.height - this.snowmansHeight  , rotate: 1}
        );
    }

    loadImage(path,imageLoaded) {
        this.snowmanImages.forEach((snowmanImage) => {
            snowmanImage.img.src = path;
            snowmanImage.img.onload = imageLoaded;
        });
    }

    gsapToSnowman(){
        gsap.to(this, {
            angle: 15,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }




    animationSnowMan(ctx){
        this.snowmanImages.forEach(snowmanImage => {
            this.relocateSnowman(ctx,snowmanImage)
            ctx.drawImage(snowmanImage.img, -this.snowmansWidth / 2, -this.snowmansHeight, this.snowmansWidth, this.snowmansHeight);
            ctx.restore();
        });

    }

    relocateSnowman(ctx,snowmanImage) {
        var swingAngle = this.amplitude * Math.sin(this.angle);

        ctx.save();
        ctx.translate(snowmanImage.locationWidth, snowmanImage.locationHeight);
        ctx.scale(snowmanImage.rotate, 1);
        ctx.rotate(swingAngle * Math.PI / 180);
    }


}