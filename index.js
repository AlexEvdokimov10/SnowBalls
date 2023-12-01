

window.onload = function(){

    const PATH_SNOWMAN = "../assets/canvas_snowman.png";
    const snowmanHeight = 180;
    const snowmanWidth = 150;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 335;
    canvas.height = 582;


    var snowmanImages = [];

    snowmanImages.push(
        {img: new Image(snowmanWidth, snowmanHeight),
            locationWidth: canvas.width / 4,
            locationHeight: canvas.height - 10, rotate: -1},
        {img: new Image(snowmanWidth, snowmanHeight),
            locationWidth: canvas.width - snowmanWidth / 2,
            locationHeight: canvas.height - snowmanHeight  , rotate: 1}
    );

    snowmanImages.forEach((snowmanImage) => {
        snowmanImage.img.src = PATH_SNOWMAN;
        snowmanImage.img.onload = imageLoaded;
    });

    var mp = 50; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*canvas.width, //x-coordinate
            y: Math.random()*canvas.height, //y-coordinate
            r: Math.random()*4+1, //radius
            d: Math.random()*mp //density
        })
    }



    var angle = 0; // Начальный угол
    var amplitude = 20; // Амплитуда колебаний в градусах

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка canvas один раз

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        update();

        snowmanImages.forEach(snowmanImage => {
            angle += 0.05;
            var swingAngle = amplitude * Math.sin(angle);

            ctx.save();
            ctx.translate(snowmanImage.locationWidth, snowmanImage.locationHeight);
            ctx.scale(snowmanImage.rotate, 1);
            ctx.rotate(swingAngle * Math.PI / 180);
            ctx.drawImage(snowmanImage.img, -snowmanWidth / 2, -snowmanHeight, snowmanWidth, snowmanHeight);
            ctx.restore();
        });
    }

    var imagesLoaded = 0;
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === snowmanImages.length) {
            setInterval(animate, 20);
        }
    }
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];

            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;


            if(p.x > canvas.width+5 || p.x < -5 || p.y > canvas.height)
            {
                if(i%3 > 0)
                {
                    particles[i] = {x: Math.random()*canvas.width, y: -10, r: p.r, d: p.d};
                }
                else
                {

                    if(Math.sin(angle) > 0)
                    {

                        particles[i] = {x: -5, y: Math.random()*canvas.height, r: p.r, d: p.d};
                    }
                    else
                    {
                        particles[i] = {x: canvas.width+5, y: Math.random()*canvas.height, r: p.r, d: p.d};
                    }
                }
            }
        }
    }

}