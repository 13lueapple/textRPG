const canvas = document.getElementById("display");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;


ctx.font = "10px Arial"



class Display{
    constructor(width, height, ctx) {
        this.x = width / 10;
        this.y = height / 10;
        this.ctx = ctx
        this.mapContent = new Array(2500).fill(0);
        this.playerSymbol = '@';  // 플레이어를 나타내는 심볼
        this.playerX = Math.floor(this.x / 2);  // 플레이어 초기 X 위치
        this.playerY = Math.floor(this.y / 2);  // 플레이어 초기 Y 위치
        this.updatePlayerPosition();  // 초기 플레이어 위치 설정
        this.gravity = 0.5;  // 중력 가속도
        this.jumpStrength = -5;  // 점프 시 속도
        this.velocityY = 0;  // y축 속도
        this.isJumping = false;  // 점프 상태
        this.keys = {};  // 키 상태를 저장할 객체
    }

    draw() {
        this.ctx.clearRect(0, 0, this.x * 10, this.y * 10);  // 캔버스 초기화
        this.ctx.fillStyle = "black";  // 배경색 설정
        this.ctx.fillRect(0, 0, this.x * 10, this.y * 10);  // 전체 캔버스 배경 채우기
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                const distance = Math.sqrt(Math.pow(this.playerX - j, 2) + Math.pow(this.playerY - i, 2));  // 유클리드 거리 계산
                if (distance <= 7) {  // 플레이어 주변 원형 영역
                    const brightness = 255 - (distance * 30);  // 거리 기반 밝기 계산
                    this.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;  // 텍스트 색상 설정
                } else {
                    this.ctx.fillStyle = `rgb(60,60,60)`;  // 플레이어 주변이 아닌 경우
                }
                this.ctx.fillText(this.mapContent[this.x * i + j], 10 * j, 10 * i + 10);
            }
        }
        this.handleMovement();  // 키 입력에 따른 움직임 처리
        this.applyGravity();  // 중력 적용
        this.updatePlayerPosition();  // 플레이어 위치 업데이트
    }

    setContent(content, x, y) {
        this.mapContent[this.x * y + x] = content
    }

    getContent(x, y) {
        return this.mapContent[this.x * y + x]
    }

    updatePlayerPosition() {
        this.mapContent.fill(0);  // 맵 초기화
        this.mapContent[this.playerY * this.x + this.playerX] = this.playerSymbol;  // 플레이어 위치 설정
    }

    applyGravity() {
        this.velocityY += this.gravity;  // 중력에 의한 속도 증가
        this.playerY += this.velocityY;  // 속도에 따른 위치 변경

        if (this.playerY >= this.y - 1) {  // 바닥에 닿으면 위치 고정
            this.playerY = this.y - 1;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    handleMovement() {
        if (this.keys['w'] && !this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
        }
        if (this.keys['a'] && this.playerX > 0) {
            this.playerX--;
        }
        if (this.keys['d'] && this.playerX < this.x - 1) {
            this.playerX++;
        }
        if (this.keys['s'] && this.playerY < this.y - 1) {
            this.playerY++;
        }
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;  // 키가 눌렸을 때 상태 저장
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;  // 키가 떼어졌을 때 상태 저장
    }
}


const display = new Display(width, height, ctx)

function animate() {
    display.draw();
}

setInterval(animate, 1000 / 30);  // 60fps로 설정

document.addEventListener('keydown', (e) => display.handleKeyDown(e));
document.addEventListener('keyup', (e) => display.handleKeyUp(e));