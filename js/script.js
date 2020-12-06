const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let pontos = 0;

let intervalo = setInterval(function() {
    pontos++;
    document.getElementById("pontuacao").innerText = pontos;
}, 500);

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = screen.width + 100;
    let randomTime = Math.floor(Math.random() * 3000) + 1000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1><h1  class="game-over" id="pontuacao">Pontuação: ' + pontos + '</h1>';
            clearInterval(intervalo);
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);