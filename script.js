const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Heart(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.alpha = 1;

  this.draw = function() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff4d94";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x, this.y - this.size/2, this.x - this.size, this.y - this.size/2, this.x - this.size, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size/2, this.x, this.y + this.size, this.x, this.y + this.size*1.5);
    ctx.bezierCurveTo(this.x, this.y + this.size, this.x + this.size, this.y + this.size/2, this.x + this.size, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size/2, this.x, this.y - this.size/2, this.x, this.y);
    ctx.fill();
    ctx.restore();
  }

  this.update = function() {
    this.y -= this.speed;
    this.alpha -= 0.002;
    if(this.alpha <= 0) {
      this.x = random(0, canvas.width);
      this.y = canvas.height + 50;
      this.alpha = 1;
      this.speed = random(1, 3);
    }
    this.draw();
  }
}

for(let i=0; i<50; i++){
  hearts.push(new Heart(random(0, canvas.width), random(0, canvas.height), random(10, 20), random(1, 3)));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => h.update());
  requestAnimationFrame(animate);
}

animate();
