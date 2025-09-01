document.body.scrollTop = 0; 
document.documentElement.scrollTop = 0; 

// const DOMvideo = "../IMG/mainPage/animation.mp4";

// function preloadVideo(src) {
//   return new Promise((res, rej) => {
//     const v = document.createElement("video");
//     v.preload = "auto";
//     v.src = src;
//     v.addEventListener("loadeddata", res, { once: true });
//     v.addEventListener("error", rej, { once: true });
//     v.load();
//   });
// }

// Promise.all([
//   preloadVideo(DOMvideo)
// ]).then(() => {
//   document.querySelector("#webContainer").classList.add("endAnimation");
// });

  function typewriter(element, typewriterSpeed = 50) {
    const text = element.getAttribute("data-type");
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        element.textContent += text.charAt(i);
      }, i * typewriterSpeed);
    }
  }

let heroTextTypewriter = false;
setTimeout(() => {
  typewriter(document.querySelector("#hero h1"));
  let heroTextTypewriter = false;
}, 3000);

console.log("text".length);

let navDefaultIcoStateSet = false;
document.querySelectorAll('nav i').forEach(icon => {
  const navItems = document.getElementById('navItems');
  const navIcoHolder = document.getElementById("navIcoHolder");
  const navBars = document.querySelector('nav .fa-bars');
  const navX = document.querySelector('nav .fa-x');
  icon.addEventListener('click', function () {

    navItems.classList.toggle('open');

    navIcoHolder.classList.add("navIcoChange");

    setTimeout(() => {
      if (navBars.style.display === "none") {
        navBars.style.display = "block"; 
        navX.style.display = "none";     
      } else {
        navBars.style.display = "none";  
        navX.style.display = "block";    
      }
    }, 250);

    setTimeout(() => {
      navIcoHolder.classList.remove("navIcoChange");
    }, 300);
  });
  if (!navDefaultIcoStateSet) {
    navBars.style.display = "block";
    navX.style.display = "none";
    navDefaultIcoStateSet = true;
  }
});

function isVisible(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();

  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right > 0
  );
}

function inCenter(element) {
  const rect = element.getBoundingClientRect();
    return (
      rect.top < 0 &&
      rect.bottom > -100
    )
}

function getObjectDOMposition(element) {
  const rect = element.getBoundingClientRect();
  let a;
  if (place = "top") {
    a = rect.top;
  } else if (place = "bottom") {
    a = rect.bottom;
  } else if (place = "right") {
    a = rect.right;
  } else { 
    a = rect.left;
  }
  return a;
}

let introTextTypewriter = false;
window.addEventListener('scroll', () => {
  const heroImage = document.getElementById('hero_img');
  const intro = document.getElementById("about_me");
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  const fadeStart = 0;
  const fadeEnd = window.innerHeight + 250;

  const scrollProgress = Math.min(Math.max((scrollPosition - fadeStart) / (fadeEnd - fadeStart), 0), 1);

  const translateY = scrollProgress * -30;
  const scaleValue = 1.5 + scrollProgress * 1.2;  
  const opacityValue = 1.2 - scrollProgress;

   heroImage.style.transform = `translateY(${translateY}px) scale(${scaleValue})`;

  intro.style.opacity = scrollProgress;
  if (isVisible(intro)) {
    intro.style.top = "0";
    if(!introTextTypewriter && !heroTextTypewriter) { 
      typewriter(document.querySelector("#about_me h2")); 
      typewriter(document.querySelector("#about_me p"), 10);
      introTextTypewriter = true;
    } 

  } else {
    intro.style.top = "50vh";
  }
});

const carousels = document.querySelectorAll('.carousel');
const nextButtons = document.querySelectorAll('.carousel-button.next');
const prevButtons = document.querySelectorAll('.carousel-button.prev');
let currentIndex = [0,0];

let skillContent = {
  lang: {
    src: [
      "../IMG/mainPage/skills/en.png",
      "../IMG/mainPage/skills/lv.png",
      "../IMG/mainPage/skills/jp.png",
    ],
    text: ["English", "Latvian", "Japanese"],
    heading: "Human Languages",
    belongs: "skills",
  },
  progLang: {
    src: [
      "../IMG/mainPage/skills/html_css_js.png",
      "../IMG/mainPage/skills/c++.png",
      "../IMG/mainPage/skills/python.png",
    ],
    text: ["HTML, CSS, JS", "C++", "Python"],
    heading: "Programming Languages",
    belongs: "skills",
  },
  other: {
    src: [
      "../IMG/mainPage/skills/chess.png",
      "../IMG/mainPage/skills/brain.png",
    ],
    text: ["Problem solving & Adaptability", "Quick learning"],
    heading: "Other Skills",
    belongs: "skills",
  },
};

function populateCarousel(content) {
  const track = document.querySelector('#skills .carousel-track');
  track.style.opacity = "0";
  setTimeout(() => {
    track.innerHTML = "";
    content.src.forEach((src, index) => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = src;
      img.alt = content.text[index] || `Slide ${index + 1}`;
      img.draggable = false;
      img.oncontextmenu = () => false;

      const figcaption = document.createElement('figcaption');
      figcaption.textContent = content.text[index] || `Slide ${index + 1}`;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      track.appendChild(figure);
    });

    track.style.opacity = "1";
  }, 450);

  setTimeout(() => {
    carousels.forEach((carousel, i) => {
      currentIndex[i] = 0
      updateSlidePosition(track, i);
    });
  }, 300);

  document.querySelector("#skills h2").textContent = content.heading;
}

function updateSlidePosition(track, carouselIndex) {
  const slides = Array.from(track.children);
  const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
  track.style.transform = `translateX(-${currentIndex[carouselIndex] * slideWidth}px)`;
}

function carouselNext(event, carouselIndex) {
  let carousel;
  try {
        carousel = event.target.closest('.carousel');
  } catch (error) {
        carousel = document.querySelectorAll('.carousel')[carouselIndex];
  }
  if (carousel === null) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  if (currentIndex[carouselIndex] < slides.length - 1) {
    currentIndex[carouselIndex]++;
  } else {
    currentIndex[carouselIndex] = 0;
  }
  updateSlidePosition(track, carouselIndex);
}

function carouselPrev(event, carouselIndex) {
  let carousel;
  try {
        carousel = event.target.closest('.carousel');
  } catch (error) {
        carousel = document.querySelectorAll('.carousel')[carouselIndex];
  }
  if (carousel === null) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);

  if (currentIndex[carouselIndex] > 0) {
    currentIndex[carouselIndex]--;
  } else {
    currentIndex[carouselIndex] = slides.length - 1;
  }
  updateSlidePosition(track, carouselIndex);
}

window.addEventListener('resize', () => {
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    updateSlidePosition(track);
  });
});

populateCarousel(skillContent.progLang);

function skillMenu() {
  const skillMenuSymbol = document.querySelector("#skills strong");
  const skillMenuContainer = document.getElementById("skills_menu");

  skillMenuSymbol.classList.add("spin");

  setTimeout(() => {
    if (skillMenuSymbol.innerHTML === "+") {
      skillMenuSymbol.innerHTML = "-";
      skillMenuContainer.classList.add("skills_menu_extend");
      skillMenuContainer.classList.remove("skills_menu_retract");
    } else {
      skillMenuSymbol.innerHTML = "+";
      skillMenuContainer.classList.remove("skills_menu_extend");
      skillMenuContainer.classList.add("skills_menu_retract");
    }

    setTimeout(() => {
      skillMenuSymbol.classList.remove("spin");
    }, 50);
  }, 50);
}

setTimeout(() => {

const carousel = document.querySelectorAll(".carousel");
const carouselFullArea = document.querySelectorAll(".carouselFullBox");
const firstImg = [];

carousel.forEach((carouselObject, i) => firstImg[i] = carousel[i].querySelectorAll("img")[0]);

let isDragStart = false, isDragging = false, prevPageX = [], prevScrollLeft = [], positionDiff = [];

  let startPosition = 0, endPosition = 0;
  const dragStart = (carouselIndex, e) => {
      isDragStart = true;

      startPosition = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
      console.log(`curPosStart: ${startPosition}`);
      console.log(`car[carInd].scrlLef: ${carousel[carouselIndex].scrollLeft}, prevScrollLeft: ${prevScrollLeft} \n `);
  }

  const dragging = (carouselIndex, e) => {
      if(!isDragStart) return;
      e.preventDefault();
      isDragging = true;
  }

  const dragStop = (carouselIndex, e) => {
  isDragStart = false;
  if (!isDragging) return;
  isDragging = false;

    endPosition = e.type.startsWith("touch") ? e.changedTouches[0].clientX : e.clientX;

  const dragDistance = endPosition - startPosition;

  const track = carousel[carouselIndex].querySelector('.carousel-track');

  if (dragDistance < -30 && currentIndex[carouselIndex] < track.children.length - 1) {
    currentIndex[carouselIndex]++;
  } else if (dragDistance > 30 && currentIndex[carouselIndex] > 0) {
    currentIndex[carouselIndex]--;
  }

  updateSlidePosition(track, carouselIndex);
};

carousel.forEach((carouselObject, i) => {
    nextButtons[i].addEventListener("click", (e) => carouselNext(e, i));
    prevButtons[i].addEventListener("click", (e) => carouselPrev(e, i));

    carousel[i].addEventListener("mousedown", (e) => dragStart(i, e));
    carousel[i].addEventListener("touchstart", (e) => dragStart(i, e));

    carousel[i].addEventListener("mousemove", (e) => dragging(i, e));
    carousel[i].addEventListener("touchmove", (e) => dragging(i, e));

    carouselFullArea[i].addEventListener("mouseup", (e) => dragStop(i, e));
    carouselFullArea[i].addEventListener("touchend", (e) => dragStop(i, e));
  });

}, 500);

const stickySection = [...document.querySelectorAll(".sticky")];
let horizontalImages = [
  { 
    src: "../IMG/mainPage/work_examples/black.png", 
    text: "--ATTAgency-- redesign" 
  },
  { 
    src: "../IMG/mainPage/work_examples/black.png", 
    text: "Work 2" 
  },
  { 
    src: "../IMG/mainPage/work_examples/black.png", 
    text: "Work 3" 
  }
];

stickySection.forEach(section => {
  const scrollSection = section.querySelector('.scroll_section');

  horizontalImages.forEach(imgObj => {
    let container = document.createElement("div");
    container.classList.add("horizontal_scroll_container");

    let image = document.createElement('img');
    image.src = imgObj.src;
    container.appendChild(image);

    let text = document.createElement("h2");
    text.innerHTML = imgObj.text;
    text.classList.add("horizontal_scroll_text");
    container.appendChild(text);

    scrollSection.appendChild(container);
  });
});

function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector('.scroll_section');
  const scrollableWidth = scrollSection.scrollWidth - window.innerWidth; 

  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = Math.max(0, Math.min(percentage, 100)); 

  const translateX = -(scrollableWidth * (percentage / 100));
  scrollSection.style.transform = `translate3d(${translateX}px, 0, 0)`;
}

window.addEventListener('scroll', () => {
  stickySection.forEach(section => requestAnimationFrame(() => transform(section)));
});

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null, 
    threshold: 0.6, 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const image = entry.target.querySelector(".school_image");
      if (entry.isIntersecting) {
        image.style.filter = "brightness(100%)"; 
      } else {
        image.style.filter = "brightness(50%)"; 
      }
    });
  }, options);

  const schoolContainers = document.querySelectorAll(".school_image_container");
  schoolContainers.forEach((container) => observer.observe(container));
});

let gameIco;
function handleClick(element) {
  gameIco = element;

  switchBox('alt');

  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 250);

  element.onclick = null;
}

const VIDEO = {
    fps: 30.17,
    duration: 6,
    get totalFrames() {
        return Math.ceil(this.fps * this.duration);
    },
    get frameTime() {
        return 1 / this.fps;
    }
};

const video = document.querySelector('#videoScroll video');
let maxScroll = 0;
let isPlaying = false;
let lastFrame = -1;
let container = null;

let animating = false;
let animationStart = null;
let animationFrom = 0;
let animationTo = 0;
let animationDuration = 1200; 

video.preload = 'auto';
video.addEventListener('loadeddata', async () => {
  VIDEO.duration = video.duration;

  while(video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      await new Promise(r => setTimeout(r, 100));
  }

  initScrollControl();
});

function initScrollControl() {
    container = document.getElementById("videoScroll");
    maxScroll = container.offsetHeight - window.innerHeight;
    checkVisibility();
}

function updateVideo(timestamp) {
  if (!isPlaying) return;

  const scrollTop = window.scrollY - container.offsetTop;
  const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
  const targetFrame = Math.round(progress * (VIDEO.totalFrames - 1));

  if (targetFrame !== animationTo) {
    animationFrom = lastFrame < 0 ? targetFrame : lastFrame;
    animationTo = targetFrame;

    const frameDiff = Math.abs(animationTo - animationFrom);
    const BASE_DURATION = 120;  
    const MIN_DURATION = 80;    
    const MAX_DURATION = 600;   
    animationDuration = Math.min(
      MAX_DURATION,
      Math.max(MIN_DURATION, (frameDiff / 100) * BASE_DURATION)
    );

    animationStart = timestamp;
    animating = true;
  }

  if (animating) {
    const elapsed = timestamp - animationStart;
    const t = Math.min(1, elapsed / animationDuration);
    let currentFrame = animationFrom + (animationTo - animationFrom) * t;

    const frameDiff = Math.abs(animationTo - animationFrom);
    const stepSize = frameDiff > 400 ? Math.ceil(frameDiff / 200) : 1; 
    currentFrame = Math.round(currentFrame / stepSize) * stepSize;

    if (currentFrame !== lastFrame) {
      lastFrame = currentFrame;
      const targetTime = Math.min(video.duration, lastFrame * VIDEO.frameTime);
      video.currentTime = targetTime;
    }

    if (t >= 1) {
      animating = false;
    }
  }

  requestAnimationFrame(updateVideo);
}

function checkVisibility() {
    if (!container) return;
    const visible = isVisible(container);
    if (visible && !isPlaying) {
        startAnimation();
    } else if (!visible && isPlaying) {
        stopAnimation();
    }
}

function startAnimation() {
    if (!isPlaying) {
        isPlaying = true;
        lastFrame = -1;
        requestAnimationFrame(updateVideo);
    }
}

function stopAnimation() {
    isPlaying = false;
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkVisibility, 50);
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (container) {
            maxScroll = container.offsetHeight - window.innerHeight;
            checkVisibility();
        }
    }, 200);
});

video.addEventListener('error', (e) => {
    console.error('Video error:', video.error);
});

window.addEventListener('load', checkVisibility);

let isEventActive = false; 

function startMyEvent(event_id_arr, eventParent_id, eventAnimationName_string, recursiveTimeout_ms, eventEnd_ms, eventLength_ms) {
    if (isEventActive) {
        console.log("Event is already active.");
        return; 
    }

    isEventActive = true; 

    let eventAnim = [true, 0];
    let events = [];
    for (let i = 0; i < event_id_arr.length; i++) {
        events.push(document.getElementById(event_id_arr[i]));
    }
    let eventbox = document.querySelector("#" + eventParent_id + " img");

    eventbox.style.display = "block";
    eventbox.classList.add(eventAnimationName_string + "_start"); 

    let endAnimation = false; 

    function eventAnimation() {
        if (endAnimation) {
            eventbox.classList.remove(eventAnimationName_string + "_start");
        }

        if (eventAnim[0]) {
            events.forEach(img => img.style.display = "none"); 
            events[eventAnim[1]].style.display = "block"; 

            eventAnim[1] = (eventAnim[1] + 1) % events.length; 

            if (!endAnimation) endAnimation = true;
            setTimeout(eventAnimation, recursiveTimeout_ms); 
        }
    }
    eventAnimation();

    function killEvent() {
        eventbox.classList.remove(eventAnimationName_string + "_end");
        eventbox.style.display = "none";
        isEventActive = false; 
    }

    function endeventAnimation() {
        eventAnim[0] = false; 
        eventbox.classList.add(eventAnimationName_string + "_end");
        setTimeout(killEvent, eventEnd_ms); 
    }

    setTimeout(endeventAnimation, eventLength_ms + eventEnd_ms); 
}

function switchBox(goTo) {

    function worldTransition(goTo) {
        if (goTo === "main") {

            document.getElementById("alternate_box").style.display = "none"; 
            document.getElementById("game").style.display = "none"; 
        }  else if (goTo === "game") {
            document.getElementById("game").style.display = "flex"; 
            document.getElementById("alternate_decision").style.display = "none"; 
        } else {

            document.getElementById("alternate_box").style.display = "block"; 
            document.getElementById("alternate_decision").style.display = "flex"; 

        }
    }

    function switchWorld() {worldTransition(goTo)}

    const myTimeout1 = setTimeout(switchWorld, 200);

}

let keysManual = document.getElementById("manualBtn");
let actualManual = document.getElementById("manual");
let rightManualImg = document.getElementById("rightManualImg");
let leftManualImg = document.getElementById("leftManualImg");
let gamePaused = false; 

function manualOpen(params) {
  actualManual.style.display = "block";

  rightManualImg.classList.remove("manual_right_close");
  leftManualImg.classList.remove("manual_left_close");

  rightManualImg.classList.add("manual_right_open");
  leftManualImg.classList.add("manual_left_open");

  gamePaused = true;
}
keysManual.addEventListener("click", () => {
  manualOpen();
});

actualManual.addEventListener("click", () => {
  rightManualImg.classList.remove("manual_right_open");
  leftManualImg.classList.remove("manual_left_open");

  rightManualImg.classList.add("manual_right_close");
  leftManualImg.classList.add("manual_left_close");

  setTimeout(() => {
      actualManual.style.display = "none";
      gamePaused = false;

  }, 500);
});

let skip = document.getElementById("skip");

function helpingButtons(x, y) {
  if (x === "keys") {
    if (keysManual.style.display === "none") keysManual.style.display = y;
    else keysManual.style.display = y;
  } else if (x === "skip") {
    if (skip.style.display === "none") skip.style.display = y;
    else skip.style.display = y;
  }
}

function myGame() {
    const canvas = document.getElementById("game_canvas");
    const ctx = canvas.getContext('2d');

    let player = {
      x: 50,
      y: canvas.height - 92,
      width: 50,
      height: 50,
      speed: 5,
      deathTravel: 50,
      lives: 130,
    };
    let enemy = {
      x: 850,
      y: canvas.height - 100,
      width: 50,
      height: 50,
      speed: .5,
      lives: 130,
    };

    let pM = { 
      idle: {
        r: [],
        cR: 0, 
        l: [],
        cL: 0
      },
      run: {
        r: [],
        cR: 0,
        l: [],
        cL: 0
      },
      dSlash: {
        r: [],
        eR: [], 
        l: [],
        eL: [],
        c: 0, 
        eC: 0 
      },
      hSlash: {
        r: [],
        eR: [],
        l: [],
        eL: [],
        c: 0, 
        eC: 0 
      },
      thrust: {
        r: [],
        eR: [],
        l: [],
        eL: [],
        c: 0, 
        eC: 0
      },
      ult: {
        r: [],
        eR: [],
        l: [],
        eL: [],
        c: 0, 
        eC: 0 
      },
      block: {
        r: [],
        l: [],
        c: 0
      },
      hit: {
        r: [],
        l: [],
        c: 0
      },
      death: {
        r: [],
        l: [],
        c: 0
      }
    };

    let eM = { 
      hit: {
        r: [],
        l: [],
        c: 0
      },
      death: {
        r: [],
        l: [],
        c: 0
      },
      hSlash: {
        r: [],
        eR: [], 
        l: [],
        eL: [], 
        c: 0,
        eC: 0
      },
      vSlash: {
        r: [],
        eR: [], 
        l: [],
        eL: [], 
        c: 0,
        eC: 0
      },
      walk: {
        r: [],
        cR: 0,
        l: [],
        cL: 0
      }
    };

    let eve = { 
      wrath: {
        img: [],
        c: 0,
      },
      loot: {
        myImg: [],
        c: 0,
        lootImg: [],
      },
      hpTransfer: {
        img: [],
        c: 0,
      },
      taunt: {
        img: [],
        c: 0,
      },
      end: {
        img: [],
        state: 0, 
        c: 0,
      },
        meOnScreen: false
    };
    let clutter = { 
      yinYang: {
        moon: [], 
        drops: [],
        c: 0,
      },
    };

    let keysPressed = {};
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
      keysPressed[event.key] = false;
    });

    let pAVGh = 24, eAVGh = 31; 

    let ending = [false]; 
    let lastPlayedKey = "right";
    let frameAmount = 30;
    let specialMove = false, ultimate = false, block = false; 
    let normalAttack = 0;

    let sceneInitialized = false, pebbles = [], grassBlades = [], stars = [], textureRocks = [];

    let eAtkState = false, eAtkStarted = false, atkFinish = false, atkFinishCounter = 0;
    let eAtk = 1; 
    let enemyIdle = 69; 
    let enemyAtkBlocked = false;
    let playerDmgTaken = false;
    let pHit = false, eHit = false; 

    function playerDamage(e, eS) { 
      const atkRangeMin = -60, atkRangeMax = 80;
      const isInRange = player.x - enemy.x <= atkRangeMax && player.x - enemy.x >= atkRangeMin;

      if (!isInRange) {
          playerDmgTaken = false;
      }

      if (e > eS / 3 && !enemyAtkBlocked && isInRange && !playerDmgTaken) {
        let eDmg = 10;
        if (enemy.lives <= 30) {
          eDmg = 33;
        } else if (enemy.lives <= 50) {
          eDmg = 26;
        } else if (enemy.lives <= 100) {
          eDmg = 20; 
        } else {
          eDmg = 16; 
        }

        player.lives -= eDmg;

          playerDmgTaken = true;

          pHit = true;

        myTaunt();
        myLoot();
      }
    }

    let pNormFin = false; 
    let pNormFinCounter = 0;
    let pNCD = 30; 
    let pUCD = 60; 
    const atkBtnLoco = document.getElementById("atk");
    function pNormCool (cd) { 
      if (pNormFin) {
         atkBtnLoco.classList.add("atkCd");

        pNormFinCounter = (pNormFinCounter + 1) % cd;
        if (pNormFinCounter === 0) pNormFin = false, atkBtnLoco.classList.remove("atkCd");
      }
    }
    canvas.addEventListener("click", () => {
      if (!pNormFin && !keysPressed['c']) {
      specialMove = true;
      if (normalAttack === 0) normalAttack = 1;
      } 
    });
    let pUltFin = false;
    let pUltFinCounter = 0;
    const ultBtnLoco = document.getElementById("ult");
    function pUltCool (cd) { 
       if (pUltFin) {
         ultBtnLoco.classList.add("ultCd");

          pUltFinCounter = (pUltFinCounter + 1) % cd;
          if (pUltFinCounter === 0) pUltFin = false, ultBtnLoco.classList.remove("ultCd");
        }
    }
    let ultDmg = 6, normDmg = 1;
    let supplyCd = []; 
    function mySupplyCd() { 
        ultDmg = 8, normDmg = 3;

      if (supplyCd[0] > 0 || supplyCd[1] > 0) {
        if (supplyCd[0] > 0) {
          ultDmg = 16, normDmg = 6;
          supplyCd[0]--;

          let x = 60, y = 52;
          let width = eve.loot.lootImg[1].width - 6;
          let height = eve.loot.lootImg[1].height - 6; 

          ctx.fillStyle = 'lightgreen';
          ctx.fillRect(x, y, width, height);

          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2; 
          ctx.strokeRect(x, y, width, height);

          ctx.drawImage(eve.loot.lootImg[1],
            62, 
            54, 
            eve.loot.lootImg[1].width - 10, 
            eve.loot.lootImg[1].height - 10);
        } 

        if (supplyCd[1] > 0) {
          ultDmg = 3, normDmg = .5;
          player.lives -= .05;
          supplyCd[1]--;

          let x = 60, y = 52;
          let width = eve.loot.lootImg[2].width - 6;
          let height = eve.loot.lootImg[2].height - 6; 

          ctx.fillStyle = 'lightgreen';
          ctx.fillRect(x, y, width, height);

          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2; 
          ctx.strokeRect(x, y, width, height);

          ctx.drawImage(eve.loot.lootImg[2],
            62, 
            54, 
            eve.loot.lootImg[2].width - 10, 
            eve.loot.lootImg[2].height - 10);
        }
      }
    }

    let loot = [false, 0];
    let supply = {
      state: [], 
      y: [], 
      x: [], 
      item: [], 
      c: 0, 
      new: false, 
      pickUp: [], 
    }
    function mySupply() {
      for (let i = 0; i <= supply.c; i++) {
        if (supply.new) {
        supply.x[supply.c] = loot[1], supply.item[supply.c]= Math.floor(Math.random() * 3), supply.y[supply.c] = 40, supply.state[supply.c] = true, supply.new = false, supply.pickUp[supply.c] = false,supply.c++; 
        }
        if (supply.state[i]) {
          ctx.drawImage(eve.loot.lootImg[supply.item[i]], 
            supply.x[i], 
            supply.y[i], 
            eve.loot.lootImg[supply.item[i]].width, 
            eve.loot.lootImg[supply.item[i]].height);

          if (supply.y[i] !== 110) {
            supply.y[i] += 10;
          } else if (supply.y[i] === 110) {
            supply.pickUp[i] = true
          } 
          if (supply.pickUp[i] && (supply.x[i] - player.x >= 0 && supply.x[i] - player.x <= 20)) {
            switch (supply.item[i]) {
              case 1:
                supplyCd[0] = 400;
                break;
              case 2:
                supplyCd[1] = 200;
                break;
              case 0:
                player.lives += 30;
                break;
              default:
            }
            supply.state[i] = false;
          }
        }
      }
    }

    function myLoot() {
      let rndNum = Math.floor(Math.random() * 100 + 1);
      if (rndNum >= 90 || loot[0] === true) {
        while (!loot[0]) {
          loot[1] = Math.floor(Math.random() * (canvas.width - 60)) + 20;
            if (!((loot[1] >= 125 && loot[1] <= 156) || (loot[1] >= 60 && loot[1] <= 120) || (loot[1] >= canvas.width - 5 && loot[1] <= canvas.width + 52)) && loot[1] < canvas.width - 30) loot[0] = true;
        }
        ctx.drawImage(eve.loot.myImg[eve.loot.c], 
          loot[1], 
          5, 
          eve.loot.myImg[eve.loot.c].width, 
          eve.loot.myImg[eve.loot.c].height);

        if (eve.loot.c + 1 === eve.loot.myImg.length) loot[0] = false, supply.new = true ,mySupply(); 

        eve.loot.c = (eve.loot.c + 1) % eve.loot.myImg.length;
      }
    }
    let taunt = false;
    function myTaunt() {
      let rndNum = Math.floor(Math.random() * 100 + 1);
      if (rndNum >= 95 || taunt === true) {
        taunt = true;

        ctx.drawImage(eve.taunt.img[0], 
          130, 
          5, 
          eve.taunt.img[0].width, 
          eve.taunt.img[0].height);

        if (eve.taunt.c + 1 === 30) enemy.lives += 10, taunt = false; 

        eve.taunt.c = (eve.taunt.c + 1) % 30;
      }
    }

    let wrath = false;

    function myWrath() {
      ctx.drawImage(eve.wrath.img[eve.wrath.c], 
        65, 
        0, 
        eve.wrath.img[eve.wrath.c].width, 
        eve.wrath.img[eve.wrath.c].height);

      if (eve.wrath.c + 1 === eve.wrath.img.length) player.lives /= 2, wrath = false; 

      eve.wrath.c = (eve.wrath.c + 1) % eve.wrath.img.length;
    }
    let hpTransfer = [false, false]; 
    function myHpTransfer() {
      ctx.drawImage(eve.hpTransfer.img[eve.hpTransfer.c], 
        canvas.width / 2, 
        5, 
        eve.hpTransfer.img[eve.hpTransfer.c].width, 
        eve.hpTransfer.img[eve.hpTransfer.c].height);

      if (eve.hpTransfer.c + 1 === eve.hpTransfer.img.length)        player.lives /= 2, enemy.lives += player.lives, hpTransfer[0] = false, hpTransfer[1] = true; 

      eve.hpTransfer.c = (eve.hpTransfer.c + 1) % eve.hpTransfer.img.length;
    }

    let enemyDmgTaken = false;
    function enemyDamage(dmg) { 
      const atkRangeMin = -50;
      const atkRangeMax = 70;
      const isInRange = player.x - enemy.x <= atkRangeMax && player.x - enemy.x >= atkRangeMin;

       if (isInRange && (lastPlayedKey === "right" && player.x - enemy.x <= 0 || lastPlayedKey === "left" && player.x - enemy.x >= 0) && !enemyDmgTaken) {
        enemy.lives -= dmg;
         enemyDmgTaken = true;
         eHit = true;
         myTaunt();
         myLoot();
         if (enemy.lives <= 65 && player.lives >= 110) {
           wrath = true;
         } else if (enemy.lives <= 30 && !hpTransfer[1]) {
           hpTransfer[0] = true;
         }
       }
    }
    function checkBlock() {
      if (!enemyAtkBlocked) {
        if (block === true && keysPressed["c"]) enemyAtkBlocked = true;
        block = true;
      }
    }
    function finishAtk(s) { 
      if (s !== 0) eAtkStarted = true;
      else {
        eAtkStarted = false;
      }
    }
    function blockBb(s, x) { 

      if (enemyAtkBlocked === true && s > 0) {
        if (s - 1 === 0 || s + 1 === x) {
           eM.vSlash.eC = 0;
            eM.hSlash.eC = 0;
        }
        if (x - s <= x / 3) { 
          if (s + 1 === x) {
            s = 0;
            return s;
          }
            else return s + 1; 
        } else {
        return s - 1; 
        }
      }
    }
    let gameEndCounter = 100;
    function gameEndCd(x) {
      if (gameEndCounter !== 0) gameEndCounter--; 
      else ending[1] = x, ending[0] = true;
    }

      let yinYang = {
        state: [], 
        y: [], 
        x: [], 
        item: [], 
        c: 0, 
        new: true, 
        speed: [], 
        charge: [], 
      }
    function yinYangDroplets() {
      let rnd = Math.floor(Math.random() * 100);

      if (rnd >= 98) {
        yinYang.new = true;
      }
        if (yinYang.new) {
        yinYang.state[yinYang.c] = true, yinYang.item[yinYang.c] = Math.floor(Math.random() * 2), yinYang.x[yinYang.c] = canvas.width - 30 + Math.floor(Math.random() * 26) + 1, yinYang.y[yinYang.c] = 36, yinYang.new = false, yinYang.speed[yinYang.c] = Math.floor(Math.random() * 2) + 0.5, yinYang.charge[yinYang.c] = Math.floor(Math.random() * 150) + 30,yinYang.c++;
        }
      for (let i = 0; i < yinYang.c; i++) {
        if (yinYang.state[i]) {
          ctx.drawImage(clutter.yinYang.drops[yinYang.item[i]],
            yinYang.x[i], 
            yinYang.y[i], 
            clutter.yinYang.drops[yinYang.item[i]].width, 
            clutter.yinYang.drops[yinYang.item[i]].height);

          if (yinYang.y[i] < 140) {
            yinYang.y[i] += yinYang.speed[i];
          } else if (yinYang.y[i] >= 140 && yinYang.charge[i] > 0) {
            yinYang.charge[i]--;
          } else if (yinYang.charge[i] <= 0) {
            yinYang.state[i] = false;
          }
        }
      }
    }

    const texts = [ 
      [
        "If I would be a wise old sensei,\nI would probably say something poetic.",
        "But since I am young and hungry,\nall I can say is...",
        "What are you 6 or\nsomething?",
        "You fought like\na legless spider.",
        "Damn.",
        "Try harder.",
        ""
      ],
      [
        "Well, that's what\nI call a victory.",
        "You proved yourself\na real keyboard warrior.",
        "I hope some of the keys on your keyboard\nflew to a different dimension.",
        "Nevertheless,\nnow I will teleport you back.",
        "So you can do it again and\nfinish your keyboard for good.",
        ""
      ]
    ];
    const typingSpeed = 50; 
    const cooldown = 2000; 
    let index = 0, textIndex = 0, lastTime = 0, cooldownActive = false, cooldownStartTime = 0;

    function drawText(x) {

      ctx.font = '10px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const yOffset = 20; 
      const lineHeight = 15; 
      const startY = canvas.height / 2 + yOffset;

      const currentText = texts[x][textIndex];
      const currentLine = currentText.substring(0, index);

      const lines = currentLine.split('\n');

      lines.forEach((line, i) => {
          ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
      });

      if (!cooldownActive) {
        ctx.drawImage(eve.end.img[1], 
          110, 
          100 - (eve.end.img[1].height), 
          eve.end.img[1].width, 
          eve.end.img[1].height);

          if (index < currentText.length) {
              if (Date.now() - lastTime > typingSpeed) {
                  index++;
                  lastTime = Date.now();
              }
          } else {

              cooldownActive = true;
              cooldownStartTime = Date.now();
          }
      } else {

        ctx.drawImage(eve.end.img[0], 
          110, 
          100 - (eve.end.img[0].height), 
          eve.end.img[0].width, 
          eve.end.img[0].height);

          if (Date.now() - cooldownStartTime > cooldown) {
              cooldownActive = false;
              if (textIndex < texts[x].length - 1) {
                  textIndex++;
              } else {

                textIndex = 0;
                gameOver = true;
                helpingButtons("skip", "none");
                gameIco.onclick = () => handleClick(gameIco);
                switchBox("main");

              }
              index = 0;
          }
      }
    }
    function playerRecoil(x) { 
      if (player.x > enemy.x && player.x + player.width < canvas.width) player.x += x;
      if (player.x < enemy.x && player.x > 0) player.x -= x;
    }
    let skipBlock = false; 
    let gameOver = false;
    function gameLoop() {
      if (gameOver) return;
      setTimeout(function() {
        requestAnimationFrame(gameLoop);
        if (!gamePaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!ending[0]) {
            let roadColor = '#C07F45', skyColor = '#090254', grassColor = '#114B38', pebbleColor = '#A0522D', pebbleHighlightColor = '#D2B48C', starColor = '#FFFFFF', darkGrassBladeColor = '#0A3D31';

            let scaleFactor = 2;

            function initScene() {

                for (let i = 0; i < 200; i++) {
                    let pebble = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * (canvas.height - 130) + (canvas.height - 120),
                        size: Math.random() * 2 + 1
                    };
                    pebbles.push(pebble);
                }

                for (let i = 0; i < 100; i++) {
                    let grassBlade = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * (canvas.height - 40) + (canvas.height - 40),
                        height: Math.random() * 4 + 2,
                        width: Math.random() * 1 + 0.5
                    };
                    grassBlades.push(grassBlade);
                }

                for (let i = 0; i < 50; i++) {
                    let star = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * (canvas.height / 3),
                        size: Math.random() * 1 + 0.5
                    };
                    stars.push(star);
                }

                for (let i = 0; i < 200; i++) {
                    let rock = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * (canvas.height - 130) + (canvas.height - 120),
                        size: Math.random() * 1 + 0.5
                    };
                    textureRocks.push(rock);
                }
            }

            function drawScene() {

                ctx.fillStyle = skyColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

                drawStars();

                let roadYStart = canvas.height - 40;
                let roadYEnd = canvas.height - 120;
                ctx.fillStyle = roadColor;
                ctx.fillRect(0, roadYEnd, canvas.width, roadYStart - roadYEnd);
                drawDetailedRoad(0, roadYEnd, canvas.width, roadYStart - roadYEnd);

                ctx.fillStyle = grassColor;
                ctx.fillRect(0, roadYStart, canvas.width, canvas.height - roadYStart);

                drawGrass();

                applyPixelation();
            }

            function drawStars() {
                ctx.fillStyle = starColor;
                stars.forEach(star => {
                    ctx.fillRect(star.x, star.y, star.size, star.size);
                });
            }

            function drawDetailedRoad(x, y, width, height) {
                drawPebbles(x, y, width, height);
                drawTextureRocks(x, y, width, height);
            }

            function drawPebbles(x, y, width, height) {
                ctx.fillStyle = pebbleColor;
                pebbles.forEach(pebble => {
                    ctx.fillRect(pebble.x, pebble.y, pebble.size, pebble.size);
                });
            }

            function drawTextureRocks(x, y, width, height) {
                ctx.fillStyle = pebbleHighlightColor;
                textureRocks.forEach(rock => {
                    ctx.fillRect(rock.x, rock.y, rock.size, rock.size);
                });
            }

            function drawGrass() {
                ctx.fillStyle = darkGrassBladeColor;
                grassBlades.forEach(grassBlade => {
                    ctx.fillRect(grassBlade.x, grassBlade.y, grassBlade.width, grassBlade.height);
                    ctx.fillRect(grassBlade.x + grassBlade.width, grassBlade.y, grassBlade.width, grassBlade.height - 1);
                });
            }

            function applyPixelation() {
                try {
                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let data = imageData.data;

                    for (let y = 0; y < canvas.height; y += scaleFactor) {
                        for (let x = 0; x < canvas.width; x += scaleFactor) {
                            let index = ((canvas.width * y) + x) * 4;
                            let red = data[index];
                            let green = data[index + 1];
                            let blue = data[index + 2];

                            for (let n = 0; n < scaleFactor; n++) {
                                for (let m = 0; m < scaleFactor; m++) {
                                    if (x + m < canvas.width && y + n < canvas.height) {
                                        let newIndex = ((canvas.width * (y + n)) + (x + m)) * 4;
                                        data[newIndex] = red;
                                        data[newIndex + 1] = green;
                                        data[newIndex + 2] = blue;
                                    }
                                }
                            }
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                } catch (e){}
            }

            if (!sceneInitialized) {
                initScene();
                sceneInitialized = true;
            }
            drawScene();

        if (!sceneInitialized) {
            initScene();
          sceneInitialized = true;
        };

        const platforms = [ 

          { x: 165, y: 40, width: 130, height: 10, color: '#3f3f3f ' }, 
          { x: 25, y: 40, width: 130, height: 10, color: '#3f3f3f' }, 
          { x: 165, y: 40, width: enemy.lives, height: 10, color: '#935452' }, 
          { x: 25, y: 40, width: player.lives, height: 10, color: '#329f42' }, 
        ];

        platforms.forEach(platform => {
          if (platform.width <= 0) platform.width = 0;
          ctx.fillStyle = platform.color;
          ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });

          ctx.drawImage(clutter.yinYang.moon[0],
            canvas.width - 30, 
            10, 
            clutter.yinYang.moon[0].width, 
            clutter.yinYang.moon[0].height);
          yinYangDroplets();

        if (wrath) myWrath();
        if (hpTransfer[0]) myHpTransfer();
        if (taunt) myTaunt();
        if (loot[0]) myLoot();
        mySupply();

        if (keysPressed['a'] || keysPressed['ArrowLeft']) lastPlayedKey = 'left';

        if (keysPressed['d'] || keysPressed['ArrowRight']) lastPlayedKey = 'right';

        if (keysPressed['q'] && !pUltFin && !keysPressed['c']) specialMove = true, ultimate = true;

        if (keysPressed['x'] && !pNormFin && !keysPressed['c']) {
            specialMove = true;
            if (normalAttack === 0) normalAttack = 1;
        }

        pNormCool(pNCD); 
        pUltCool(pUCD); 

        mySupplyCd();

          if (player.lives <= 0) {
            if (lastPlayedKey === "right") {
              ctx.drawImage(pM.death.r[pM.death.c], 
                player.x, 
                player.y - (pM.death.r[pM.death.c].height - pAVGh), 
                pM.death.r[pM.death.c].width, 
                pM.death.r[pM.death.c].height);

            } else if (lastPlayedKey === "left") {
              ctx.drawImage(pM.death.l[pM.death.c], 
                player.x, 
                player.y - (pM.death.l[pM.death.c].height - pAVGh), 
                pM.death.l[pM.death.c].width, 
                pM.death.l[pM.death.c].height);

            }
            if (pM.death.c === (pM.death.r.length - 1)) {
              gameEndCd(0);
            } 
            if (pM.death.c + 1 !== pM.death.l.length) pM.death.c = (pM.death.c + 1) % pM.death.l.length; 

            if (player.x > 0 && player.x < enemy.x) {
              if (player.deathTravel > 0) player.x -= 5, player.deathTravel -= 5;
            }
            if (player.x + player.width < canvas.width && player.x > enemy.x) {
              if (player.deathTravel < 100) player.x += 5, player.deathTravel += 5;
            }
          } else if (pHit) {       
            if (lastPlayedKey === "right") {
              ctx.drawImage(pM.hit.r[pM.hit.c], 
                player.x, 
                player.y - (pM.hit.r[pM.hit.c].height - pAVGh), 
                pM.hit.r[pM.hit.c].width, 
                pM.hit.r[pM.hit.c].height);
            } else if (lastPlayedKey === "left") {
              ctx.drawImage(pM.hit.l[pM.hit.c], 
                player.x, 
                player.y - (pM.hit.l[pM.hit.c].height - pAVGh), 
                pM.hit.l[pM.hit.c].width, 
                pM.hit.l[pM.hit.c].height);
            }
          if (pM.hit.c === 0) pHit = false;
          pM.hit.c = (pM.hit.c + 1) % pM.hit.l.length;
            playerRecoil(3);
        } else {

        if (specialMove === true) {
          frameAmount = 25;
          if (ultimate && !pUltFin) { 
            if (lastPlayedKey === "right") {
              ctx.drawImage(pM.ult.r[pM.ult.c], 
                            player.x, 
                            player.y - (pM.ult.r[pM.ult.c].height - pAVGh), 
                            pM.ult.r[pM.ult.c].width, 
                            pM.ult.r[pM.ult.c].height);

              if (pM.ult.c >= 13 && pM.ult.c <= 17) {
                ctx.drawImage(pM.ult.eR[pM.ult.eC],
                  player.x + 30, 
                  player.y - (pM.ult.eR[pM.ult.eC].height - pAVGh), 
                  pM.ult.eR[pM.ult.eC].width, 
                  pM.ult.eR[pM.ult.eC].height);

                if (pM.ult.eC === 0) enemyDmgTaken = false;

                  pM.ult.eC = (pM.ult.eC + 1) % pM.ult.eR.length;
              }
            } else if (lastPlayedKey === "left") {
              ctx.drawImage(pM.ult.l[pM.ult.c], 
                            player.x, 
                            player.y - (pM.ult.l[pM.ult.c].height - pAVGh), 
                            pM.ult.l[pM.ult.c].width, 
                            pM.ult.l[pM.ult.c].height);

              if (pM.ult.c >= 13 && pM.ult.c <= 17) {
                ctx.drawImage(pM.ult.eL[pM.ult.eC], 
                  player.x - 30, 
                  player.y - (pM.ult.eL[pM.ult.eC].height - pAVGh), 
                  pM.ult.eL[pM.ult.eC].width, 
                  pM.ult.eL[pM.ult.eC].height);

                if (pM.ult.eC === 0) enemyDmgTaken = false;

                  pM.ult.eC = (pM.ult.eC + 1) % pM.ult.eL.length;
              }
            }
            enemyDamage(ultDmg);
            pM.ult.c = (pM.ult.c + 1) % pM.ult.r.length; 
            if (pM.ult.c === pM.ult.r.length -1) specialMove = false, ultimate = false, pUltFin = true, pUCD = 60;
          } else if (normalAttack > 0 && !pNormFin) {
            switch (normalAttack) {
              case 1:
                if (lastPlayedKey === "right") {
                  ctx.drawImage(pM.dSlash.r[pM.dSlash.c], 
                                player.x, 
                                player.y - (pM.dSlash.r[pM.dSlash.c].height - pAVGh), 
                                pM.dSlash.r[pM.dSlash.c].width, 
                                pM.dSlash.r[pM.dSlash.c].height);

                  if (pM.dSlash.c >= 3 && pM.dSlash.c <= 7) {
                    ctx.drawImage(pM.dSlash.eR[pM.dSlash.eC], 
                      player.x + 30, 
                      player.y - (pM.dSlash.eR[pM.dSlash.eC].height - pAVGh), 
                      pM.dSlash.eR[pM.dSlash.eC].width, 
                      pM.dSlash.eR[pM.dSlash.eC].height);

                      pM.dSlash.eC = (pM.dSlash.eC + 1) % pM.dSlash.eR.length;
                  }             
                } else if (lastPlayedKey === "left") {
                  ctx.drawImage(pM.dSlash.l[pM.dSlash.c], 
                                player.x, 
                                player.y - (pM.dSlash.l[pM.dSlash.c].height - pAVGh), 
                                pM.dSlash.l[pM.dSlash.c].width, 
                                pM.dSlash.l[pM.dSlash.c].height);

                  if (pM.dSlash.c >= 3 && pM.dSlash.c <= 7) {
                    ctx.drawImage(pM.dSlash.eL[pM.dSlash.eC], 
                      player.x - 30, 
                      player.y - (pM.dSlash.eL[pM.dSlash.eC].height - pAVGh), 
                      pM.dSlash.eL[pM.dSlash.eC].width, 
                      pM.dSlash.eL[pM.dSlash.eC].height);

                      pM.dSlash.eC = (pM.dSlash.eC + 1) % pM.dSlash.eL.length;
                  }              
                }
                enemyDamage(normDmg);
                if (pM.dSlash.c === 0) enemyDmgTaken = false;

                pM.dSlash.c = (pM.dSlash.c + 1) % pM.dSlash.r.length; 
                if (pM.dSlash.c === pM.dSlash.r.length -1) {
                  specialMove = false;
                  normalAttack = 2;
                }
                break;          
              case 2:
                if (lastPlayedKey === "right") {
                  ctx.drawImage(pM.hSlash.r[pM.hSlash.c], 
                                player.x, 
                                player.y - (pM.hSlash.r[pM.hSlash.c].height - pAVGh), 
                                pM.hSlash.r[pM.hSlash.c].width, 
                                pM.hSlash.r[pM.hSlash.c].height);

                  if (pM.hSlash.c >= 1 && pM.hSlash.c <= 5) {
                    ctx.drawImage(pM.hSlash.eR[pM.hSlash.eC], 
                      player.x + 30, 
                      player.y - (pM.hSlash.eR[pM.hSlash.eC].height - pAVGh), 
                      pM.hSlash.eR[pM.hSlash.eC].width, 
                      pM.hSlash.eR[pM.hSlash.eC].height);

                      pM.hSlash.eC = (pM.hSlash.eC + 1) % pM.hSlash.eR.length;
                  }

                } else if (lastPlayedKey === "left") {
                  ctx.drawImage(pM.hSlash.l[pM.hSlash.c], 
                                player.x, 
                                player.y - (pM.hSlash.l[pM.hSlash.c].height - pAVGh), 
                                pM.hSlash.l[pM.hSlash.c].width, 
                                pM.hSlash.l[pM.hSlash.c].height);

                  if (pM.hSlash.c >= 1 && pM.hSlash.c <= 5) {
                    ctx.drawImage(pM.hSlash.eL[pM.hSlash.eC], 
                      player.x - 30, 
                      player.y - (pM.hSlash.eL[pM.hSlash.eC].height - pAVGh), 
                      pM.hSlash.eL[pM.hSlash.eC].width, 
                      pM.hSlash.eL[pM.hSlash.eC].height);

                      pM.hSlash.eC = (pM.hSlash.eC + 1) % pM.hSlash.eL.length;
                  }
                }
                enemyDamage(normDmg);
                if (pM.hSlash.c === 0) enemyDmgTaken = false;

                pM.hSlash.c = (pM.hSlash.c + 1) % pM.hSlash.r.length; 
                if (pM.hSlash.c === pM.hSlash.r.length -1) {
                  specialMove = false;
                  normalAttack = 3;
                }
                break;            
              case 3:
                if (lastPlayedKey === "right") {
                  ctx.drawImage(pM.thrust.r[pM.thrust.c], 
                                player.x, 
                                player.y - (pM.thrust.r[pM.thrust.c].height - pAVGh), 
                                pM.thrust.r[pM.thrust.c].width, 
                                pM.thrust.r[pM.thrust.c].height);

                  if (pM.thrust.c >= 1 && pM.thrust.c <= 5) {
                    ctx.drawImage(pM.thrust.eR[pM.thrust.eC], 
                      player.x + 30, 
                      player.y - (pM.thrust.eR[pM.thrust.eC].height - pAVGh), 
                      pM.thrust.eR[pM.thrust.eC].width, 
                      pM.thrust.eR[pM.thrust.eC].height);

                      pM.thrust.eC = (pM.thrust.eC + 1) % pM.thrust.eR.length;
                  }            
                } else if (lastPlayedKey === "left") {
                  ctx.drawImage(pM.thrust.l[pM.thrust.c], 
                                player.x, 
                                player.y - (pM.thrust.l[pM.thrust.c].height - pAVGh), 
                                pM.thrust.l[pM.thrust.c].width, 
                                pM.thrust.l[pM.thrust.c].height);

                  if (pM.thrust.c >= 1 && pM.thrust.c <= 5) {
                    ctx.drawImage(pM.thrust.eL[pM.thrust.eC], 
                      player.x - 30, 
                      player.y - (pM.thrust.eL[pM.thrust.eC].height - pAVGh), 
                      pM.thrust.eL[pM.thrust.eC].width, 
                      pM.thrust.eL[pM.thrust.eC].height);

                      pM.thrust.eC = (pM.thrust.eC + 1) % pM.thrust.eL.length;
                  }              
                }
                enemyDamage(normDmg);
                if (pM.thrust.c === 0) enemyDmgTaken = false;

                pM.thrust.c = (pM.thrust.c + 1) % pM.thrust.r.length; 
                if (pM.thrust.c === pM.thrust.r.length -1) {
                  specialMove = false;
                  normalAttack = 0;
                  pNormFin = true;
                  pNCD = 30;
                }
                break;           
              default: 
            }
          }
        } else if (keysPressed['c']) {
          frameAmount = 20;
          if (lastPlayedKey === 'left') {
            ctx.drawImage(pM.block.l[pM.block.c], 
                          player.x, 
                          player.y - (pM.idle.l[pM.block.c].height - pAVGh), 
                          pM.block.l[pM.block.c].width, 
                          pM.block.l[pM.block.c].height);
          } else {
            ctx.drawImage(pM.block.r[pM.block.c], 
                          player.x, 
                          player.y - (pM.block.r[pM.block.c].height - pAVGh), 
                          pM.block.r[pM.block.c].width, 
                          pM.block.r[pM.block.c].height);
          }
          if (!block) pM.block.c = 0;
          else {
            pM.block.c = (pM.block.c + 1) % pM.block.r.length;
            playerRecoil(3);
            if (pM.block.c === 0) block = false, pUCD = 10, pNCD = 10;
          }
        } else { 
          if (keysPressed['a'] || keysPressed['ArrowLeft']) {
            if (player.x > 0) {
              player.x -= player.speed;
            }
          }
          if (keysPressed['d'] || keysPressed['ArrowRight']) {
            if (player.x + player.width < canvas.width) {
              player.x += player.speed;
            }
          }
          if (keysPressed['d'] || keysPressed['ArrowRight'] || keysPressed['a'] || keysPressed['ArrowLeft']) { 
            if (keysPressed['d'] || keysPressed['ArrowRight']) {
              ctx.drawImage(pM.run.r[pM.run.cR], 
                            player.x, 
                            player.y - (pM.run.r[pM.run.cR].height - pAVGh), 
                            pM.run.r[pM.run.cR].width, 
                            pM.run.r[pM.run.cR].height);
            } else {
              ctx.drawImage(pM.run.l[pM.run.cL], 
                            player.x, 
                            player.y - (pM.run.l[pM.run.cL].height - pAVGh), 
                            pM.run.l[pM.run.cL].width, 
                            pM.run.l[pM.run.cL].height);
            }
          } else {
            if (lastPlayedKey === 'left') {
              ctx.drawImage(pM.idle.l[pM.idle.cL], 
                            player.x, 
                            player.y - (pM.idle.l[pM.idle.cL].height - pAVGh), 
                            pM.idle.l[pM.idle.cL].width, 
                            pM.idle.l[pM.idle.cL].height);
            } else {
              ctx.drawImage(pM.idle.r[pM.idle.cR], 
                            player.x, 
                            player.y - (pM.idle.r[pM.idle.cR].height - pAVGh), 
                            pM.idle.r[pM.idle.cR].width, 
                            pM.idle.r[pM.idle.cR].height);
            }
          } 
          frameAmount = 30;
        }
      }

        pM.run.cR = (pM.run.cR + 1) % pM.run.r.length;
        pM.run.cL = (pM.run.cL + 1) % pM.run.l.length;

        pM.idle.cR = (pM.idle.cR + 1) % pM.idle.r.length;
        pM.idle.cL = (pM.idle.cL + 1) % pM.idle.l.length;

        if (atkFinish === true) {
          atkFinishCounter++;
          if (atkFinishCounter === 30) {
            atkFinish = false, atkFinishCounter = 0;
          }
        }
        if (eAtkState === false) {
          eAtk = Math.floor(Math.random() * 2);
        }
        if (enemy.lives <= 0) {
          if (player.x - enemy.x <= 10) {
            ctx.drawImage(eM.death.l[eM.death.c], 
              enemy.x, 
              enemy.y - (eM.death.l[eM.death.c].height - eAVGh), 
              eM.death.l[eM.death.c].width, 
              eM.death.l[eM.death.c].height);
            } else {
              ctx.drawImage(eM.death.r[eM.death.c], 
                enemy.x, 
                enemy.y - (eM.death.r[eM.death.c].height - eAVGh), 
                eM.death.r[eM.death.c].width, 
                eM.death.r[eM.death.c].height);
            }
            if (eM.death.c + 1 === eM.death.r.length){
              gameEndCd(1)
            }   
            if (eM.death.c + 1 !== eM.death.l.length) eM.death.c = (eM.death.c + 1) % eM.death.l.length;

        } else if (eHit) {
        if (player.x - enemy.x <= 10) {
        ctx.drawImage(eM.hit.l[eM.hit.c], 
          enemy.x, 
          enemy.y - (eM.hit.l[eM.hit.c].height - eAVGh), 
          eM.hit.l[eM.hit.c].width, 
          eM.hit.l[eM.hit.c].height);

        } else {
          ctx.drawImage(eM.hit.r[eM.hit.c], 
            enemy.x, 
            enemy.y - (eM.hit.r[eM.hit.c].height - eAVGh), 
            eM.hit.r[eM.hit.c].width, 
            eM.hit.r[eM.hit.c].height);
        }
        eM.hit.c = (eM.hit.c + 1) % eM.hit.l.length;

        if (eM.hit.c + 1 === eM.hit.l.length) eHit = false;

      } else if (player.x - enemy.x <= 80 && player.x - enemy.x >= -60 || eAtkStarted === true) { 
          eInRange = true;
          if (atkFinish === false) {
            eAtkState = true;
          if (player.x - enemy.x <= 10) {
            if (eAtk === 0) { 
            ctx.drawImage(eM.vSlash.l[eM.vSlash.c], 
                          enemy.x, 
                          enemy.y - (eM.vSlash.l[eM.vSlash.c].height - eAVGh), 
                          eM.vSlash.l[eM.vSlash.c].width, 
                          eM.vSlash.l[eM.vSlash.c].height);

              finishAtk(eM.vSlash.c);
              if (eM.vSlash.c === 0) playerDmgTaken = false;

            if (enemyAtkBlocked === false) {
            if (eM.vSlash.c >= 40 && eM.vSlash.c <  64 || eM.vSlash.c >= 80 && eM.vSlash.c <= 96) {
            ctx.drawImage(eM.vSlash.eL[eM.vSlash.eC],
              enemy.x - 50, 
              enemy.y - (eM.vSlash.eL[eM.vSlash.eC].height - eAVGh), 
              eM.vSlash.l[eM.vSlash.eC].width, 
              eM.vSlash.l[eM.vSlash.eC].height);

              checkBlock();

              playerDamage(eM.vSlash.eC, eM.vSlash.eL.length);
              eM.vSlash.eC = (eM.vSlash.eC + 1) % eM.vSlash.eL.length;
            } else block = false;

            eM.vSlash.c = (eM.vSlash.c + 1) % eM.vSlash.l.length;
              if (eM.vSlash.c === 0) eAtkState = false, atkFinish = true;
              } else if (eM.vSlash.c > 0) {
                eM.vSlash.c = blockBb(eM.vSlash.c, eM.vSlash.l.length);
              } else atkFinish = true;

            } else { 
              ctx.drawImage(eM.hSlash.l[eM.hSlash.c], 
                enemy.x, 
                enemy.y - (eM.hSlash.l[eM.hSlash.c].height - eAVGh), 
                eM.hSlash.l[eM.hSlash.c].width, 
                eM.hSlash.l[eM.hSlash.c].height);

              finishAtk(eM.hSlash.c);
              if (eM.hSlash.c === 0) playerDmgTaken = false;

              if (enemyAtkBlocked === false) {
              if (eM.hSlash.c >= 32 && eM.hSlash.c <  48 || eM.hSlash.c >= 56 && eM.hSlash.c <= 72) {
              ctx.drawImage(eM.hSlash.eL[eM.hSlash.eC],
                enemy.x - 50, 
                enemy.y - (eM.hSlash.eL[eM.hSlash.eC].height - eAVGh), 
                eM.hSlash.eL[eM.hSlash.eC].width, 
                eM.hSlash.eL[eM.hSlash.eC].height);

                checkBlock();

                playerDamage(eM.hSlash.eC, eM.hSlash.eL.length);

                eM.hSlash.eC = (eM.hSlash.eC + 1) % eM.hSlash.eL.length;
              } else block = false;
              eM.hSlash.c = (eM.hSlash.c + 1) % eM.hSlash.l.length;
              if (eM.hSlash.c === 0) eAtkState = false, atkFinish = true; 
              } else if (eM.hSlash.c > 0) {
                eM.hSlash.c = blockBb(eM.hSlash.c, eM.hSlash.l.length);
              } else atkFinish = true;
            }
          } else {
            if (eAtk === 0) { 
            ctx.drawImage(eM.vSlash.r[eM.vSlash.c], 
                          enemy.x, 
                          enemy.y - (eM.vSlash.r[eM.vSlash.c].height - eAVGh), 
                          eM.vSlash.r[eM.vSlash.c].width, 
                          eM.vSlash.r[eM.vSlash.c].height);

              finishAtk(eM.vSlash.c);
              if (eM.vSlash.c === 0) playerDmgTaken = false;

              if (enemyAtkBlocked === false) {
              if (eM.vSlash.c >= 40 && eM.vSlash.c <  64|| eM.vSlash.c >= 80 && eM.vSlash.c <= 96) {
              ctx.drawImage(eM.vSlash.eR[eM.vSlash.eC],
                enemy.x + 50, 
                enemy.y - (eM.vSlash.eR[eM.vSlash.eC].height - eAVGh), 
                eM.vSlash.r[eM.vSlash.eC].width, 
                eM.vSlash.r[eM.vSlash.eC].height);

                checkBlock();

                playerDamage(eM.vSlash.eC, eM.vSlash.eL.length);

                eM.vSlash.eC = (eM.vSlash.eC + 1) % eM.vSlash.eL.length;
              } else block = false;

            eM.vSlash.c = (eM.vSlash.c + 1) % eM.vSlash.r.length; 
              if (eM.vSlash.c === 0) eAtkState = false, atkFinish = true;
                } else if (eM.vSlash.c > 0) {
                  eM.vSlash.c = blockBb(eM.vSlash.c, eM.vSlash.r.length);
                } else atkFinish = true;
            } else { 
              ctx.drawImage(eM.hSlash.r[eM.hSlash.c], 
                enemy.x, 
                enemy.y - (eM.hSlash.r[eM.hSlash.c].height - eAVGh), 
                eM.hSlash.r[eM.hSlash.c].width, 
                eM.hSlash.r[eM.hSlash.c].height);

              finishAtk(eM.hSlash.c);
              if (eM.hSlash.c === 0) playerDmgTaken = false;

              if (enemyAtkBlocked === false) {
              if (eM.hSlash.c >= 32 && eM.hSlash.c <  48 || eM.hSlash.c >= 56 && eM.hSlash.c <= 72) {
              ctx.drawImage(eM.hSlash.eR[eM.hSlash.eC],
                enemy.x + 50, 
                enemy.y - (eM.hSlash.eR[eM.hSlash.eC].height - eAVGh), 
                eM.hSlash.eR[eM.hSlash.eC].width, 
                eM.hSlash.eR[eM.hSlash.eC].height);

                checkBlock();

                playerDamage(eM.hSlash.eC, eM.hSlash.eR.length);

                eM.hSlash.eC = (eM.hSlash.eC + 1) % eM.hSlash.eR.length;
              } else block = false;
                eM.hSlash.c = (eM.hSlash.c + 1) % eM.hSlash.l.length;
              if (eM.hSlash.c === 0) eAtkState = false, atkFinish = true;
                } else if (eM.hSlash.c > 0) {
                  eM.hSlash.c = blockBb(eM.hSlash.c, eM.hSlash.r.length);
                } else atkFinish = true;
            }
          }
          } else { 
            enemyAtkBlocked = false;
            enemyIdle = enemyIdle === 1 ? 9 : 1;
            if (player.x - enemy.x <= 10) {
            ctx.drawImage(eM.hSlash.l[enemyIdle], 
              enemy.x, 
              enemy.y - (eM.hSlash.l[enemyIdle].height - eAVGh), 
              eM.hSlash.l[enemyIdle].width, 
              eM.hSlash.l[enemyIdle].height);
            } else {
              ctx.drawImage(eM.hSlash.r[enemyIdle], 
                enemy.x, 
                enemy.y - (eM.hSlash.r[enemyIdle].height - eAVGh), 
                eM.hSlash.r[enemyIdle].width, 
                eM.hSlash.r[enemyIdle].height);
            }
          }
    } else {
          eInRange = false;
         if (player.x < enemy.x) {
          ctx.drawImage(eM.walk.l[eM.walk.cL], 
                        enemy.x, 
                        enemy.y, 
                        eM.walk.l[eM.walk.cL].width, 
                        eM.walk.l[eM.walk.cL].height);
          enemy.x--;
        } else {
          ctx.drawImage(eM.walk.r[eM.walk.cR], 
                        enemy.x, 
                        enemy.y, 
                        eM.walk.r[eM.walk.cR].width, 
                        eM.walk.r[eM.walk.cR].height);
          enemy.x++;
        }  
      eM.vSlash.c = 0, eM.vSlash.eC = 0, eM.hSlash.c = 0, eM.hSlash.eC = 0;   
    }

        eM.walk.cR = (eM.walk.cR + 1) % eM.walk.r.length;
        eM.walk.cL = (eM.walk.cL + 1) % eM.walk.l.length;

        } else {
          keys.forEach((key) => key.style.display = "none");  
          helpingButtons("keys", "none");
          if (!skipBlock) skipBlock = true, helpingButtons("skip", "block");
          if (ending[1] === 0) {
          drawText(0);
          } else { 
            drawText(1);
          }
        }
      }
    }, 1000 / frameAmount);
  }

    let loadedImages = [];
    function preloadImages(imagePaths) {
      let imagesToLoad = imagePaths.length;
      imagePaths.forEach(src => {
        let img = new Image();
        img.onload = function() {
          loadedImages.push(img);
          imagesToLoad--;
          if (imagesToLoad === 0) {
            gameLoop();
            helpingButtons("keys", "block"); 
          }
        };
        img.src = src;
        loadedImages.push(img);
        if (src.includes("SAMURAI/reverse/samurai_blue_ultimate")) { 
          for (let i = 0; i < 2; i++) pM.ult.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_ultimate")) { 
          for (let i = 0; i < 2; i++) pM.ult.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_thrust")) { 
          for (let i = 0; i < 2; i++) pM.thrust.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_thrust")) { 
          for (let i = 0; i < 2; i++) pM.thrust.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_run")) { 
          pM.run.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_run")) { 
          pM.run.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_horizontalSlash")) { 
          for (let i = 0; i < 2; i++) pM.hSlash.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_horizontalSlash")) { 
          for (let i = 0; i < 2; i++) pM.hSlash.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_downSlash")) { 
          for (let i = 0; i < 2; i++) pM.dSlash.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_downSlash")) { 
          for (let i = 0; i < 2; i++) pM.dSlash.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_block")) { 
          pM.block.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_block")) { 
          pM.block.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_idle")) { 
          for (let i = 0; i < 10; i++) pM.idle.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_idle")) { 
          for (let i = 0; i < 10; i++) pM.idle.r.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_hit1") || src.includes("SAMURAI/samurai_blue_hit2")) {
          for (let i = 0; i < 4; i++) pM.hit.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_hit1") || src.includes("SAMURAI/reverse/samurai_blue_hit2")) {
          for (let i = 0; i < 4; i++) pM.hit.l.push(img);
        } else if (src.includes("SAMURAI/samurai_blue_hit3") || src.includes("SAMURAI/samurai_blue_hit4")) {
          for (let i = 0; i < 10; i++) pM.death.r.push(img);
        } else if (src.includes("SAMURAI/reverse/samurai_blue_hit3") || src.includes("SAMURAI/reverse/samurai_blue_hit4")) {
          for (let i = 0; i < 10; i++) pM.death.l.push(img);
        } else if (src.includes("SAMURAI/slash_effect/player_ultimate_effect")) { 
          for (let i = 0; i < 2; i++) pM.ult.eR.push(img);
        } else if (src.includes("SAMURAI/slash_effect/reverse/player_ultimate_effect")) { 
          for (let i = 0; i < 2; i++) pM.ult.eL.push(img);
        } else if (src.includes("SAMURAI/slash_effect/player_thrust_effect")) { 
          for (let i = 0; i < 2; i++) pM.thrust.eR.push(img);
        } else if (src.includes("SAMURAI/slash_effect/reverse/player_thrust_effect")) { 
          for (let i = 0; i < 2; i++) pM.thrust.eL.push(img);
        } else if (src.includes("SAMURAI/slash_effect/player_downslash_effect")) { 
          for (let i = 0; i < 2; i++) pM.dSlash.eR.push(img);
        } else if (src.includes("SAMURAI/slash_effect/reverse/player_downslash_effect")) { 
          for (let i = 0; i < 2; i++) pM.dSlash.eL.push(img);
        } else if (src.includes("SAMURAI/slash_effect/player_horizontalSlash_effect")) { 
          for (let i = 0; i < 2; i++) pM.hSlash.eR.push(img);
        } else if (src.includes("SAMURAI/slash_effect/reverse/player_horizontalSlash_effect")) { 
          for (let i = 0; i < 2; i++) pM.hSlash.eL.push(img);
        }

        else if (src.includes("zombieKnight/zombieKnight_damage_taken")) { 
          eM.hit.r.push(img);
        } else if (src.includes("zombieKnight/reverse/zombieKnight_damage_taken")) { 
          eM.hit.l.push(img);
        } else if (src.includes("zombieKnight/zombieKnight_death_animation")) { 
          for (let i = 0; i < 3; i++) eM.death.r.push(img);
        } else if (src.includes("zombieKnight/reverse/zombieKnight_death_animation")) { 
          for (let i = 0; i < 3; i++) eM.death.l.push(img);
        } else if (src.includes("zombieKnight/zombieKnight_horizontal_slash")) { 
          for (let i = 0; i < 8; i++) eM.hSlash.r.push(img);
        } else if (src.includes("zombieKnight/reverse/zombieKnight_horizontal_slash")) { 
          for (let i = 0; i < 8; i++) eM.hSlash.l.push(img);
        } else if (src.includes("zombieKnight/zombieKnight_vertical_slash")) { 
          for (let i = 0; i < 8; i++) eM.vSlash.r.push(img);
        } else if (src.includes("zombieKnight/reverse/zombieKnight_vertical_slash")) { 
          for (let i = 0; i < 8; i++) eM.vSlash.l.push(img);
        } else if (src.includes("zombieKnight/zombieKnight_walk")) { 
          for (let i = 0; i < 10; i++) eM.walk.r.push(img);
        } else if (src.includes("zombieKnight/reverse/zombieKnight_walk")) { 
          for (let i = 0; i < 10; i++) eM.walk.l.push(img);
        }  else if (src.includes("zombieKnight/slash_effect/zombieKnight_verticalSlash_effect") || src.includes("zombieKnight/slash_effect/zombieKnight_return_effect")) { 
          for (let i = 0; i < 8; i++) eM.vSlash.eR.push(img);
        } else if (src.includes("zombieKnight/slash_effect/reverse/zombieKnight_verticalSlash_effect") || src.includes("zombieKnight/slash_effect/reverse/zombieKnight_return_effect")) { 
          for (let i = 0; i < 8; i++) eM.vSlash.eL.push(img);
        } else if (src.includes("zombieKnight/slash_effect/zombieKnight_horizontalSlash_effect") || src.includes("zombieKnight/slash_effect/zombieKnight_return_effect")) { 
          for (let i = 0; i < 8; i++) eM.hSlash.eR.push(img);
        } else if (src.includes("zombieKnight/slash_effect/reverse/zombieKnight_horizontalSlash_effect") || src.includes("zombieKnight/slash_effect/reverse/zombieKnight_return_effect")) { 
          for (let i = 0; i < 8; i++) eM.hSlash.eL.push(img);
        }

        else if (src.includes("myWrath")) {
          for (let i = 0; i < 15; i++) eve.wrath.img.push(img);
        } else if (src.includes("hpTransfer")) {
          for (let i = 0; i < 10; i++) eve.hpTransfer.img.push(img);
        } else if (src.includes("loot")) {
          for (let i = 0; i < 10; i++) eve.loot.myImg.push(img);
        } else if (src.includes("taunt")) {
          eve.taunt.img.push(img);
        } else if (src.includes("end")) {
          eve.end.img.push(img);
        }

        else if (src.includes("drops/")) {
          eve.loot.lootImg.push(img);
        } 

        else if (src.includes("yinYang")) {
          clutter.yinYang.moon.push(img);
        } else if (src.includes("yin.") || src.includes("yang.")) {
          clutter.yinYang.drops.push(img);
        } 
      });

    }

    const playerImagePaths = [
      "../IMG/SAMURAI/samurai_blue_block1.png",
      "../IMG/SAMURAI/samurai_blue_block3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_block1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_block2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_block3.png",
      "../IMG/SAMURAI/samurai_blue_downSlash1.png",
      "../IMG/SAMURAI/samurai_blue_downSlash2.png",
      "../IMG/SAMURAI/samurai_blue_downSlash3.png",
      "../IMG/SAMURAI/samurai_blue_downSlash4.png",
      "../IMG/SAMURAI/samurai_blue_downSlash5.png",
      "../IMG/SAMURAI/reverse/samurai_blue_downSlash1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_downSlash2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_downSlash3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_downSlash4.png",
      "../IMG/SAMURAI/reverse/samurai_blue_downSlash5.png",
      "../IMG/SAMURAI/samurai_blue_hit1.png",
      "../IMG/SAMURAI/samurai_blue_hit2.png",
      "../IMG/SAMURAI/samurai_blue_hit3.png",
      "../IMG/SAMURAI/samurai_blue_hit4.png",
      "../IMG/SAMURAI/reverse/samurai_blue_hit1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_hit2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_hit3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_hit4.png",
      "../IMG/SAMURAI/samurai_blue_horizontalSlash1.png",
      "../IMG/SAMURAI/samurai_blue_horizontalSlash2.png",
      "../IMG/SAMURAI/samurai_blue_horizontalSlash3.png",
      "../IMG/SAMURAI/samurai_blue_horizontalSlash4.png",
      "../IMG/SAMURAI/reverse/samurai_blue_horizontalSlash1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_horizontalSlash2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_horizontalSlash3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_horizontalSlash4.png",
      "../IMG/SAMURAI/samurai_blue_idle1.png",
      "../IMG/SAMURAI/samurai_blue_idle2.png",
      "../IMG/SAMURAI/samurai_blue_idle3.png",
      "../IMG/SAMURAI/samurai_blue_idle4.png",
      "../IMG/SAMURAI/reverse/samurai_blue_idle1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_idle2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_idle3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_idle4.png",
      "../IMG/SAMURAI/samurai_blue_run1.png",
      "../IMG/SAMURAI/samurai_blue_run2.png",
      "../IMG/SAMURAI/samurai_blue_run3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_run1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_run2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_run3.png",
      "../IMG/SAMURAI/samurai_blue_thrust1.png",
      "../IMG/SAMURAI/samurai_blue_thrust2.png",
      "../IMG/SAMURAI/samurai_blue_thrust3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_thrust1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_thrust2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_thrust3.png",
      "../IMG/SAMURAI/samurai_blue_ultimate1.png",
      "../IMG/SAMURAI/samurai_blue_ultimate2.png",
      "../IMG/SAMURAI/samurai_blue_ultimate3.png",
      "../IMG/SAMURAI/samurai_blue_ultimate4.png",
      "../IMG/SAMURAI/samurai_blue_ultimate5.png",
      "../IMG/SAMURAI/samurai_blue_ultimate6.png",
      "../IMG/SAMURAI/samurai_blue_ultimate7.png",
      "../IMG/SAMURAI/samurai_blue_ultimate8.png",
      "../IMG/SAMURAI/samurai_blue_ultimate9.png",
      "../IMG/SAMURAI/samurai_blue_ultimate10.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate1.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate2.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate3.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate4.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate5.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate6.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate7.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate8.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate9.png",
      "../IMG/SAMURAI/reverse/samurai_blue_ultimate10.png",
      "../IMG/SAMURAI/slash_effect/player_downslash_effect1.png",
      "../IMG/SAMURAI/slash_effect/player_downslash_effect2.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_downslash_effect1.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_downslash_effect2.png",
      "../IMG/SAMURAI/slash_effect/player_horizontalSlash_effect1.png",
      "../IMG/SAMURAI/slash_effect/player_horizontalSlash_effect2.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_horizontalSlash_effect1.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_horizontalSlash_effect2.png",
      "../IMG/SAMURAI/slash_effect/player_thrust_effect1.png",
      "../IMG/SAMURAI/slash_effect/player_thrust_effect2.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_thrust_effect1.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_thrust_effect2.png",
      "../IMG/SAMURAI/slash_effect/player_ultimate_effect1.png",
      "../IMG/SAMURAI/slash_effect/player_ultimate_effect2.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_ultimate_effect1.png",
      "../IMG/SAMURAI/slash_effect/reverse/player_ultimate_effect2.png"
    ];

    const enemyImagePaths = [
          "../IMG/zombieKnight/zombieKnight_damage_taken1.png",
          "../IMG/zombieKnight/zombieKnight_damage_taken2.png",
          "../IMG/zombieKnight/zombieKnight_damage_taken3.png",
          "../IMG/zombieKnight/zombieKnight_damage_taken4.png",
          "../IMG/zombieKnight/reverse/zombieKnight_damage_taken1.png",
          "../IMG/zombieKnight/reverse/zombieKnight_damage_taken2.png",
          "../IMG/zombieKnight/reverse/zombieKnight_damage_taken3.png",
          "../IMG/zombieKnight/reverse/zombieKnight_damage_taken4.png",
          "../IMG/zombieKnight/zombieKnight_death_animation1.png",
          "../IMG/zombieKnight/zombieKnight_death_animation2.png",
          "../IMG/zombieKnight/zombieKnight_death_animation3.png",
          "../IMG/zombieKnight/zombieKnight_death_animation4.png",
          "../IMG/zombieKnight/zombieKnight_death_animation5.png",
          "../IMG/zombieKnight/zombieKnight_death_animation6.png",
          "../IMG/zombieKnight/zombieKnight_death_animation7.png",
          "../IMG/zombieKnight/zombieKnight_death_animation8.png",
          "../IMG/zombieKnight/zombieKnight_death_animation9.png",
          "../IMG/zombieKnight/zombieKnight_death_animation10.png",
          "../IMG/zombieKnight/zombieKnight_death_animation11.png",
          "../IMG/zombieKnight/zombieKnight_death_animation12.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation1.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation2.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation3.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation4.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation5.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation6.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation7.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation8.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation9.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation10.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation11.png",
          "../IMG/zombieKnight/reverse/zombieKnight_death_animation12.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash1.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash2.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash3.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash4.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash5.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash6.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash7.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash8.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash9.png",
          "../IMG/zombieKnight/zombieKnight_horizontal_slash10.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash1.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash2.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash3.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash4.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash5.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash6.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash7.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash8.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash9.png",
          "../IMG/zombieKnight/reverse/zombieKnight_horizontal_slash10.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash1.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash2.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash3.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash4.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash5.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash6.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash7.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash8.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash9.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash10.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash11.png",
          "../IMG/zombieKnight/zombieKnight_vertical_slash12.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash1.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash2.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash3.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash4.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash5.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash6.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash7.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash8.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash9.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash10.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash11.png",
          "../IMG/zombieKnight/reverse/zombieKnight_vertical_slash12.png",
          "../IMG/zombieKnight/zombieKnight_walk1.png",
          "../IMG/zombieKnight/zombieKnight_walk2.png",
          "../IMG/zombieKnight/zombieKnight_walk3.png",
          "../IMG/zombieKnight/zombieKnight_walk4.png",
          "../IMG/zombieKnight/zombieKnight_walk5.png",
          "../IMG/zombieKnight/zombieKnight_walk6.png",
          "../IMG/zombieKnight/zombieKnight_walk7.png",
          "../IMG/zombieKnight/zombieKnight_walk8.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk1.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk2.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk3.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk4.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk5.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk6.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk7.png",
          "../IMG/zombieKnight/reverse/zombieKnight_walk8.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_horizontalSlash_effect1.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_horizontalSlash_effect2.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_horizontalSlash_effect1.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_horizontalSlash_effect2.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_verticalSlash_effect1.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_verticalSlash_effect2.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_verticalSlash_effect3.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_verticalSlash_effect1.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_verticalSlash_effect2.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_verticalSlash_effect3.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_return_effect3.png",
          "../IMG/zombieKnight/slash_effect/zombieKnight_return_effect4.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_return_effect3.png",
          "../IMG/zombieKnight/slash_effect/reverse/zombieKnight_return_effect4.png"
        ];

    const myEventPaths = [
      "../IMG/i/myWrath1.png",
      "../IMG/i/myWrath2.png",
      "../IMG/i/myWrath3.png",
      "../IMG/i/myWrath4.png",

      "../IMG/i/loot1.png",
      "../IMG/i/loot2.png",
      "../IMG/i/loot3.png",
      "../IMG/i/loot4.png",

      "../IMG/i/hpTransfer1.png",
      "../IMG/i/hpTransfer2.png",
      "../IMG/i/hpTransfer3.png",
      "../IMG/i/hpTransfer4.png",
      "../IMG/i/hpTransfer5.png",

      "../IMG/i/taunt.png",

      "../IMG/i/end1.png",
      "../IMG/i/end2.png",  
    ];
    const lootPaths = [
      "../IMG/drops/health.png",
      "../IMG/drops/powerUp.png",
      "../IMG/drops/wrath.png",
    ];
    const clutterPaths = [
      "../IMG/clutter/yin.png",
      "../IMG/clutter/yang.png",
      "../IMG/clutter/yinYang.png",
    ];

    preloadImages(playerImagePaths);
    preloadImages(clutterPaths);
    preloadImages(enemyImagePaths);
    preloadImages(lootPaths);
    preloadImages(myEventPaths);

    skip.addEventListener("click", () => {

          gameOver = true;
          helpingButtons("skip", "none");
          gameIco.onclick = () => handleClick(gameIco);
          switchBox("main");

    });

    const leftKey = document.getElementById("left");
    const rightKey = document.getElementById("right");
    const atkKey = document.getElementById("atk");
    const ultKey = document.getElementById("ult");
    const blockKey = document.getElementById("block");

    const keys = [leftKey, rightKey, atkKey, ultKey, blockKey];
    keys.forEach((key) => key.style.display = "block");  

    keys.forEach(key => {
      if (key) { 
        key.addEventListener("touchstart", () => {  
          if (key.id === "left") lastPlayedKey = 'left', keysPressed["a"] = true;
          else if (key.id === "right") lastPlayedKey = 'right', keysPressed["d"] = true; 
          else if (key.id === "atk") {
            if (!pNormFin && !keysPressed['c']) {
            specialMove = true;
            if (normalAttack === 0) normalAttack = 1;
            }
          } else if (key.id === "ult" && !pUltFin) specialMove = true, ultimate = true;
          else if (key.id === "block") keysPressed["c"] = true;   
        });

        key.addEventListener("touchend", () => {
          if (key.id === "left") keysPressed["a"] = false;
          else if (key.id === "right") keysPressed["d"] = false;
          else if (key.id === "block") keysPressed["c"] = false;   
        });
      } else {
        console.error('Key not found:', key);
      }
    });

    if (gameOver) return "endo";
    }

function gameStart(ans) {
    if (ans === "yes") {
        manualOpen(); 
        switchBox("game");
        myGame();
    } else {

       switchBox("main");
       gameIco.onclick = () => handleClick(gameIco);

    }

}
