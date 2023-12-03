export class SnowController {

    constructor(micropatricles) {
        this.angle =0
        this.micropatricles =micropatricles
        this.particles = []
    }

    generateParticles(canvas) {
        for(var i = 0; i < this.micropatricles; i++)
        {
            this.particles.push({
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height,
                r: Math.random()*4+1,
                d: Math.random()*this.micropatricles
            })
        }
    }
    animateSnow(canvas,ctx){
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for(var i = 0; i < this.micropatricles; i++)
        {
            var particle = this.particles[i];
            ctx.moveTo(particle.x, particle.y);
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        this.update(canvas);
    }

    update(canvas)
    {
        this.angle += 0.01;
        for(var i = 0; i < this.micropatricles; i++)
        {
            var p = this.particles[i];

            p.y += Math.cos(this.angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(this.angle) * 2;


            if(p.x > canvas.width+5 || p.x < -5 || p.y > canvas.height)
            {
                if(i%3 > 0)
                {
                    this.particles[i] = {x: Math.random()*canvas.width, y: -10, r: p.r, d: p.d};
                }
                else
                {

                    if(Math.sin(this.angle) > 0)
                    {

                        this.particles[i] = {x: -5, y: Math.random()*canvas.height, r: p.r, d: p.d};
                    }
                    else
                    {
                        this.particles[i] = {x: canvas.width+5, y: Math.random()*canvas.height, r: p.r, d: p.d};
                    }
                }
            }
        }
    }
}


