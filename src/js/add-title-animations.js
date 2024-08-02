// import {preloadFonts} from './utils';
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

const wrapElements = (elems, wrapType, wrapClass) => {
  elems.forEach(char => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    char.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(char);
  });
}
Splitting();
const letterRoll = [...document.querySelectorAll('.content__title[data-splitting][data-letter-roll]')];
const letterStretch = [...document.querySelectorAll('.content__title[data-splitting][data-letter-stretch]')];
const letterFlip = [...document.querySelectorAll('.content__title[data-splitting][data-letter-flip]')];
const compactor = [...document.querySelectorAll('.content__title[data-splitting][data-compactor]')];
const fadedSort = [...document.querySelectorAll('.content__title[data-splitting][data-faded-sort]')];
const letterRise = [...document.querySelectorAll('.content__title[data-splitting][data-letter-rise]')];
const sideRoll = [...document.querySelectorAll('.content__title[data-splitting][data-side-roll]')];
const obfText = [...document.querySelectorAll('.content__title[data-splitting][data-obf-text]')];
const fizzLetters = [...document.querySelectorAll('.content__title[data-splitting][data-fizz-letters]')];
const fadePop = [...document.querySelectorAll('.content__title[data-splitting][data-fade-pop]')];
const letterFall = [...document.querySelectorAll('.content__title[data-splitting][data-letter-fall]')];
const scatterFlip = [...document.querySelectorAll('.content__title[data-splitting][data-scatter-flip]')];
const growIn = [...document.querySelectorAll('.content__title[data-splitting][data-grow-in]')];
const fangs = [...document.querySelectorAll('.content__title[data-splitting][data-fangs]')];
const ghost = [...document.querySelectorAll('.content__title[data-splitting][data-ghost]')];
// Lenis smooth scrolling
let lenis;
// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.2,
    smooth: true
  });
  lenis.on('scroll', () => ScrollTrigger.update());
  const scrollFn = (time) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };
  requestAnimationFrame(scrollFn);
};
// GSAP Scroll Triggers
const scroll = () => {
  fadePop.forEach(title => {
    const chars = title.querySelectorAll('.char');
    chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 }));
    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      opacity: 0.2,
      z: -800
    },
      {
        ease: 'back.out(1.2)',
        opacity: 1,
        z: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

  });
  letterFall.forEach(title => {
    const chars = title.querySelectorAll('.char');
    chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 }));
    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      transformOrigin: '50% 0%',
      opacity: 0,
      rotationX: -90,
      z: -200
    },
      {
        ease: 'power1',
        opacity: 1,
        stagger: 0.05,
        rotationX: 0,
        z: 0,
        scrollTrigger: {
          trigger: title,
          start: 'center bottom',
          end: 'bottom top+=20%',
          scrub: true,
        }
      });
  });
  scatterFlip.forEach(title => {
    const chars = title.querySelectorAll('.char');
    chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 }));
    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      transformOrigin: '50% 100%',
      opacity: 0,
      rotationX: 90
    },
      {
        ease: 'power4',
        opacity: 1,
        stagger: {
          each: 0.03,
          from: 'random'
        },
        rotationX: 0,
        scrollTrigger: {
          trigger: title,
          start: 'center bottom',
          end: 'bottom top+=20%',
          scrub: true,
        }
      });
  });
  growIn.forEach(title => {
    const words = [...title.querySelectorAll('.word')];
    for (const [wordPosition, word] of words.entries()) {
      gsap.fromTo(word.querySelectorAll('.char'), {
        'will-change': 'transform',
        scale: 0.01,
        x: (pos, _, arr) => {
          return wordPosition % 2 ? pos * 50 : (arr.length - pos - 1) * -50
        }
      },
        {
          ease: 'power4',
          scale: 1,
          x: 0,
          scrollTrigger: {
            trigger: word,
            start: 'center bottom',
            end: 'bottom top-=40%',
            scrub: true,
          }
        });
    }
  });
  fangs.forEach(title => {
    const words = [...title.querySelectorAll('.word')];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: 'center center',
        end: '+=100%',
        scrub: true,
        pin: title.parentNode,
      }
    });
    for (const [wordPosition, word] of words.entries()) {
      tl.fromTo(word.querySelectorAll('.char'), {
        'will-change': 'transform',
        transformOrigin: () => !wordPosition % 2 ? '50% 0%' : '50% 100%',
        scaleY: 0
      },
        {
          ease: 'power1.inOut',
          scaleY: 1,
          stagger: {
            amount: 0.3,
            from: 'center'
          }
        }, 0);
    }
  });
  ghost.forEach(title => {
    const words = [...title.querySelectorAll('.word')];
    for (const word of words) {
      const chars = word.querySelectorAll('.char');
      const charsTotal = chars.length;
      gsap.fromTo(chars, {
        'will-change': 'transform, filter',
        transformOrigin: '50% 100%',
        scale: position => {
          const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
          return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0.5, 2.1, factor);
        },
        y: position => {
          const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
          return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 60, factor);
        },
        rotation: position => {
          const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
          return position < charsTotal / 2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 4, factor);
        },
        filter: 'blur(12px) opacity(0)',
      },
        {
          ease: 'power2.inOut',
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px) opacity(1)',
          scrollTrigger: {
            trigger: word,
            start: 'top bottom+=40%',
            end: 'top top+=15%',
            scrub: true,
          },
          stagger: {
            amount: 0.15,
            from: 'center'
          }
        });
    }
  });
  letterRoll.forEach(title => {
    const chars = title.querySelectorAll('.char');
    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      opacity: 0,
      scale: 0.6,
      rotationZ: () => gsap.utils.random(-20, 20)
    },
      {
        ease: 'power4',
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.4,
        scrollTrigger: {
          trigger: title,
          start: 'center+=20% bottom',
          end: '+=50%',
          scrub: true
        },
      });
  });
  letterStretch.forEach(title => {
    const chars = title.querySelectorAll('.char');
    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%'
    },
      {
        duration: 1,
        ease: 'back.inOut(2)',
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: title,
          start: 'center bottom+=50%',
          end: 'bottom top+=40%',
          scrub: true
        }
      });

  });
  letterFlip.forEach(title => {
    const chars = title.querySelectorAll('.char');
    gsap.fromTo(chars, {
      'will-change': 'transform',
      transformOrigin: '50% 0%',
      scaleY: 0
    },
      {
        ease: 'back',
        opacity: 1,
        scaleY: 1,
        yPercent: 0,
        stagger: 0.03,
        scrollTrigger: {
          trigger: title,
          start: 'center bottom-=5%',
          end: 'top top-=20%',
          scrub: true
        }
      });
  });
  compactor.forEach(title => {
    const words = title.querySelectorAll('.word');
    for (const word of words) {
      const chars = word.querySelectorAll('.char');
      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        x: (position, _, arr) => 150 * (position - arr.length / 2)
      },
        {
          ease: 'power1.inOut',
          x: 0,
          stagger: {
            grid: 'auto',
            from: 'center'
          },
          scrollTrigger: {
            trigger: word,
            start: 'center bottom+=30%',
            end: 'top top+=15%',
            scrub: true,
          }
        });
    };
  });
  fadedSort.forEach(title => {
    const chars = title.querySelectorAll('.char');
    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      opacity: 0,
      xPercent: () => gsap.utils.random(-200, 200),
      yPercent: () => gsap.utils.random(-150, 150)
    },
      {
        ease: 'power1.inOut',
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
        stagger: { each: 0.05, grid: 'auto', from: 'random' },
        scrollTrigger: {
          trigger: title,
          start: 'center bottom+=40%',
          end: 'bottom center',
          scrub: 0.9
        }
      });
  });
  letterRise.forEach(title => {
    const words = title.querySelectorAll('.word');
    for (const word of words) {
      const chars = word.querySelectorAll('.char');
      chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 }));
      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        opacity: 0,
        rotationX: -90,
        yPercent: 50
      },
        {
          ease: 'power1.inOut',
          opacity: 1,
          rotationX: 0,
          yPercent: 0,
          stagger: {
            each: 0.03,
            from: 0
          },
          scrollTrigger: {
            trigger: word,
            start: 'center bottom+=40%',
            end: 'bottom center-=30%',
            scrub: 0.9
          }
        });
    }
  });
  sideRoll.forEach(title => {
    const words = title.querySelectorAll('.word');
    for (const word of words) {
      const chars = word.querySelectorAll('.char');
      chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 }));
      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        transformOrigin: '100% 50%',
        opacity: 0,
        rotationY: -90,
        z: -300
      },
        {
          ease: 'expo',
          opacity: 1,
          rotationY: 0,
          z: 0,
          stagger: { each: 0.06, from: 'end' },
          scrollTrigger: {
            trigger: word,
            start: 'bottom bottom+=20%',
            end: 'bottom top',
            scrub: 1
          }
        });
    }
  });
  const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  obfText.forEach(title => {
    const chars = title.querySelectorAll('.char');
    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      gsap.fromTo(char, {
        opacity: 0
      },
        {
          duration: 0.03,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          repeat: 1,
          repeatRefresh: true,
          opacity: 1,
          repeatDelay: 0.03,
          delay: (position + 1) * 0.18,
          onComplete: () => gsap.set(char, { innerHTML: initialHTML, delay: 0.03 }),
          scrollTrigger: {
            trigger: title,
            start: 'top bottom',
            end: 'bottom center',
            toggleActions: "play resume resume reset",
            onEnter: () => gsap.set(char, { opacity: 0 })
          }
        });
    });
  });
  fizzLetters.forEach(title => {
    const chars = title.querySelectorAll('.char');
    gsap.fromTo(chars, {
      'will-change': 'opacity',
      opacity: 0,
      filter: 'blur(20px)'
    },
      {
        duration: 0.25,
        ease: 'power1.inOut',
        opacity: 1,
        filter: 'blur(0px)',
        stagger: { each: 0.05, from: 'random' },
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'center center',
          toggleActions: "play resume resume reset"
        }
      });
  });
};
// Lenis (smooth scrolling)
initSmoothScrolling();
// GSAP Scroll Triggers
scroll();