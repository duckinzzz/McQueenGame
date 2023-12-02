<template>
  <div class="game">
    <div>
      <div id="obstacle1"><img id="obtimg1" class="obstacle" src="" alt=""></div>
      <div id="obstacle2"><img id="obtimg2" class="obstacle" src="" alt=""></div>
      <div id="obstacle3"><img id="obtimg3" class="obstacle" src="" alt=""></div>
      <div id="obstacle4"><img id="obtimg4" class="obstacle" src="" alt=""></div>
    </div>
    <p class="score">Очки: {{ score }}</p>
    <div id="road" ref="roadRef">
    </div>
    <img
        id="mcqueen"
        src="../assets/car.png"
        alt="Your Image Alt Text"
        :style="{ transform: `translate(${posX}px, ${posY}px)` }"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onUnmounted, computed} from 'vue';

export default defineComponent({
  setup() {
    const posX = ref(330);
    const posY = ref(400);
    const step = 20;
    let requestId: number | null = null;
    let isMoving = false;
    const roadRef = ref<HTMLDivElement | null>(null);
    const score = ref(0);
    const roadSpeed = ref(20);
    const obstacle1 = document.getElementById('obstacle1')!;
    const obstacle2 = document.getElementById('obstacle2')!;
    const obstacle3 = document.getElementById('obstacle3')!;
    const obstacle4 = document.getElementById('obstacle4')!;
    let mcqueen: HTMLElement | null = null; // Элемент машины
    let obstacles: HTMLElement[] = []; // Массив элементов препятствий

    const initElements = () => {
      mcqueen = document.getElementById('mcqueen');
      obstacles = [
        document.getElementById('obstacle1')!,
        document.getElementById('obstacle2')!,
        document.getElementById('obstacle3')!,
        document.getElementById('obstacle4')!,
      ];
    };

    const checkCollision = () => {
      if (!mcqueen || obstacles.some((obstacle) => !obstacle)) {
        return;
      }

      const mcqueenRect = mcqueen.getBoundingClientRect();

      obstacles.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            mcqueenRect.left < obstacleRect.right &&
            mcqueenRect.right > obstacleRect.left &&
            mcqueenRect.top < obstacleRect.bottom &&
            mcqueenRect.bottom > obstacleRect.top
        ) {
          endGame();
        }
      });
    };


    const endGame = () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = null;
      }
      alert('Игра окончена!'); // Можно заменить на другое действие при окончании игры
    };


    const increaseSpeed = () => {
      setInterval(() => {
        if (roadSpeed.value <= 40) {
          roadSpeed.value += 2;
        }
      }, 10000);
    };


    const updateRoadPosition = () => {
      if (roadRef.value) {
        const road = roadRef.value;

        let newPosition = parseFloat(getComputedStyle(road).top) + roadSpeed.value;

        if (newPosition >= -125) {
          road.style.top = "-8000px";
        } else {
          road.style.top = `${newPosition}px`;
        }
      }
      requestAnimationFrame(updateRoadPosition);
    };


    requestAnimationFrame(updateRoadPosition);

    const spawnObstacle = () => {
      setInterval(() => {
        let num = Math.floor(Math.random())
        obstacle1.style.left = `${num}px`

      }, 3000)
      setInterval(() => {
        let num = Math.floor(Math.random())
        obstacle2.style.left = `${num}px`

      }, 6000)
      setInterval(() => {
        let num = Math.floor(Math.random())
        obstacle3.style.left = `${num}px`

      }, 5000)
      setInterval(() => {
        let num = Math.floor(Math.random())
        obstacle4.style.left = `${num}px`

      }, 4000)
    };

    const startTimer = () => {
      setInterval(() => {
        score.value += 1;
      }, 100);
    };

    const maxX = computed(() => {
      if (roadRef.value) {
        const roadBounds = roadRef.value.getBoundingClientRect();
        return roadBounds.width - 100;
      }
      return 0;
    });

    const moveRight = () => {
      if (isMoving) {
        const maxPosX = maxX.value; // Максимальная позиция по оси X
        const newPosX = Math.min(posX.value + step, maxPosX); // Новая позиция

        posX.value = newPosX;

        if (posX.value < maxPosX) {
          requestId = window.requestAnimationFrame(moveRight);
        }
      }
    };


    const moveLeft = () => {
      if (isMoving) {
        posX.value = Math.max(posX.value - step, 0);
        if (posX.value > 0) {
          requestId = window.requestAnimationFrame(moveLeft);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMoving) {
        if (event.key === 'ArrowRight') {
          isMoving = true;
          requestId = window.requestAnimationFrame(moveRight);
        } else if (event.key === 'ArrowLeft') {
          isMoving = true;
          requestId = window.requestAnimationFrame(moveLeft);
        }
      }
    };

    const handleKeyUp = () => {
      isMoving = false;
      if (requestId !== null) {
        window.cancelAnimationFrame(requestId);
        requestId = null;
      }
    };


    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      startTimer();
      increaseSpeed();
      initElements();
      setInterval(checkCollision, 5);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = null;
      }

    });

    return {posX, posY, roadRef, score};
  }
});
</script >

<style>

* {
  margin: 0;
  padding: 0;
}

div.game{
  text-align: left;
}
#mcqueen {
  position: absolute;
  top: 15vh;
}

body {
  background: url("../assets/background.png") no-repeat center;
  background-size: cover;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow-y: hidden;

}

#road {
  background: url("../assets/road.png") repeat-y;
  height: 1200vh;
  width: 50vw;
  position: relative;
  top: -80vh; /* Начальное положение дороги */
  z-index: -9;
  animation: roadanimation infinite linear 10s;
}


.score {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  font-weight: bold;
}

@keyframes roadanimation {
  0% {
    top: -1100vh;

  }

  100% {
    top: -200vh;
  }
}


#obstacle1 {
  background: seagreen;
  display: grid;
  place-items: center;
  position: relative;
  width: 100px;
  height: 100px;
  left: 600px;
  z-index: 1001;
  animation: obstcl1 infinite linear 3s;

}

#obstacle2 {
  background: fuchsia;
  display: grid;
  place-items: center;
  position: relative;
  width: 100px;
  height: 100px;
  left: 400px;
  z-index: 1001;
  animation: obstcl2 infinite linear 4s;

}

#obstacle3 {
  background: aqua;
  display: grid;
  place-items: center;
  position: relative;
  width: 100px;
  height: 100px;
  left: 200px;
  z-index: 1001;
  animation: obstcl3 infinite linear 6s;

}

#obstacle4 {
  background: blue;
  display: grid;
  place-items: center;
  position: relative;
  width: 100px;
  height: 100px;
  left: 0px;
  z-index: 100;
  animation: obstcl4 infinite linear 2s;

}

@keyframes obstcl1 {
  0% {
    top: -30vh;

  }

  100% {
    top: 100vh;
  }
}

@keyframes obstcl2 {
  0% {
    top: -50vh;

  }

  100% {
    top: 100vh;
  }
}

@keyframes obstcl3 {
  0% {
    top: -60vh;

  }

  100% {
    top: 100vh;
  }
}

@keyframes obstcl4 {
  0% {
    top: -80vh;

  }

  100% {
    top: 100vh;
  }
}


</style>