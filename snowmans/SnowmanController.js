const PATH_SNOWMAN = "../assets/canvas_snowman.png";

export class SnowmanController {

    constructor() {
        this.snowmans = []
        this.snowmanImages = [];
        this.snowmansHeight = 180;
        this.snowmansWidth = 150;
        this.amplitude = 30;
    }

    initSnowmans() {
        this.snowmans.push(
            {
                img: new Image(this.snowmansWidth, this.snowmansHeight),
                locationWidth: -70,
                locationHeight:250, scale: -1
            },
            {
                img: new Image(this.snowmansWidth, this.snowmansHeight),
                locationWidth: 150,
                locationHeight: 30, scale: 1
            }
        );
    }

    initSnowmansTextures() {
        this.snowmans.forEach((snowman) => {
            snowman.img.src = PATH_SNOWMAN;
            console.log(snowman.img)
            snowman.img.onload = () => {
                this.snowmanImages.push(this.createSprite(snowman.img,snowman.locationWidth, snowman.locationHeight, snowman.scale))
            }
        })
    }

    createSprite(img,x,y,scale) {
        var tl = gsap.timeline({
            delay: gsap.utils.random(0, 4),
            repeat: -1,
            repeatDelay: gsap.utils.random(1)
        });

        var sprite = {
            img: img,
            animation: tl,
            width: this.snowmansWidth,
            height: this.snowmansHeight,
            alpha: 1,
            rotation: gsap.utils.random(0, 360),
            scale:scale,
            x: x,
            y: y,
            angle:0
        };

        tl.to(sprite,
            {
                angle: 15,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                onUpdate: () => {
                    sprite.angle = this.amplitude * Math.sin(gsap.getProperty(sprite, "angle"));
                }
            }
        )

        return sprite;
    }



    animationSnowMan(ctx) {
        this.snowmanImages.forEach(snowmanImage => {
            this.relocateSnowman(ctx, snowmanImage)
            ctx.drawImage(snowmanImage.img, 0, 0, this.snowmansWidth, this.snowmansHeight);
            ctx.restore();
        });
    }

    relocateSnowman(ctx, snowmanImage) {
        var swingAngle = snowmanImage.angle * Math.PI / 180;

        ctx.save();
        ctx.translate(snowmanImage.x + this.snowmansWidth, snowmanImage.y + this.snowmansHeight);
        ctx.scale(snowmanImage.scale,1)
        ctx.rotate(swingAngle);
        ctx.translate(-this.snowmansWidth / 2 , -this.snowmansHeight  );
    }

}