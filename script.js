class Display {
    constructor(width, height, display) {
        this.width = width;
        this.height = height;
        this.display = display;
        this.textElement = null;
        this.x = 0;
        this.y = 0;
        this.dx = 1; // x 방향 속도
        this.dy = 1; // y 방향 속도
    }
    
    draw() {
        for(let i = 0; i < this.height; i++) {
            const heightDiv = document.createElement("div");
            
            for(let j = 0; j < this.width; j++) {
                const widthDiv = document.createElement("div");
                if (i === 0 && j === 0) {
                    this.textElement = widthDiv;
                    widthDiv.textContent = "█";
                }
                heightDiv.appendChild(widthDiv);
            }
            this.display.appendChild(heightDiv);
        }
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.updatePosition();
        }, 1000 / 30); // 초당 30프레임
    }

    updatePosition() {
        // 현재 위치에서 텍스트를 제거
        this.display.children[this.y].children[this.x].textContent = "";

        // 위치 업데이트
        this.x += this.dx;
        this.y += this.dy;

        // 벽에 부딪히면 방향 반전
        if (this.x >= this.width || this.x < 0) {
            this.dx *= -1;
            this.x += this.dx;
        }
        if (this.y >= this.height || this.y < 0) {
            this.dy *= -1;
            this.y += this.dy;
        }

        // 새로운 위치에 텍스트 추가
        this.display.children[this.y].children[this.x].textContent = "█";
    }
}

const container = document.getElementById("container");
const display = new Display(80, 50, container);
display.draw();