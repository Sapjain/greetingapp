/**
 * Greeting App - Main Application Logic
 * Features: Label, Input, Greet button, Dynamic greeting, 3 random animations
 */

(function () {
    'use strict';

    const ANIMATION_DURATION = 3000;
    const CONFETTI_COUNT = 80;
    const STREAMER_COUNT = 25;
    const GLOW_RINGS = 5;

    const ANIMATIONS = ['confetti', 'partyPopper', 'glowingBurst'];

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe'];

    let activeAnimationId = null;

    function getContainer() {
        return document.getElementById('animation-container');
    }

    function clearAllAnimations() {
        const container = getContainer();
        container.innerHTML = '';
        activeAnimationId = null;
    }

    function runRandomAnimation() {
        clearAllAnimations();
        const idx = Math.floor(Math.random() * ANIMATIONS.length);
        const animation = ANIMATIONS[idx];
        const id = Date.now();
        activeAnimationId = id;

        switch (animation) {
            case 'confetti':
                runConfetti();
                break;
            case 'partyPopper':
                runPartyPopper();
                break;
            case 'glowingBurst':
                runGlowingBurst();
                break;
        }

        setTimeout(() => {
            if (activeAnimationId === id) {
                clearAllAnimations();
            }
        }, ANIMATION_DURATION);
    }

    function createConfettiPieces() {
        const container = getContainer();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < CONFETTI_COUNT; i++) {
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const dist = 100 + Math.random() * 300;

            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = centerX + 'px';
            piece.style.top = centerY + 'px';
            piece.style.backgroundColor = colors[i % colors.length];
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = (6 + Math.random() * 8) + 'px';

            piece.animate([
                {
                    opacity: 1,
                    transform: 'translate(0, 0) rotate(0deg) scale(1)'
                },
                {
                    opacity: 0,
                    transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(720deg) scale(0)`
                }
            ], {
                duration: ANIMATION_DURATION,
                easing: 'ease-out',
                fill: 'forwards'
            });

            container.appendChild(piece);
        }
    }

    function createPartyStreamers() {
        const container = getContainer();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < STREAMER_COUNT; i++) {
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const dist = 150 + Math.random() * 250;
            const width = 40 + Math.random() * 80;

            const streamer = document.createElement('div');
            streamer.className = 'party-streamer';
            streamer.style.left = centerX + 'px';
            streamer.style.top = centerY + 'px';
            streamer.style.width = width + 'px';
            streamer.style.backgroundColor = colors[i % colors.length];

            streamer.animate([
                {
                    opacity: 1,
                    transform: 'translate(0, 0) rotate(0deg) scaleX(0)'
                },
                {
                    opacity: 0.8,
                    transform: `translate(${Math.cos(angle) * dist * 0.3}px, ${Math.sin(angle) * dist * 0.3}px) rotate(0deg) scaleX(1)`
                },
                {
                    opacity: 0,
                    transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(180deg) scaleX(0.5)`
                }
            ], {
                duration: ANIMATION_DURATION,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });

            container.appendChild(streamer);
        }
    }

    function runConfetti() {
        createConfettiPieces();
    }

    function runPartyPopper() {
        createPartyStreamers();
    }

    function runGlowingBurst() {
        const container = getContainer();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < GLOW_RINGS; i++) {
            const ring = document.createElement('div');
            ring.className = 'glow-burst';
            ring.style.left = (centerX - 100) + 'px';
            ring.style.top = (centerY - 100) + 'px';
            ring.style.width = '200px';
            ring.style.height = '200px';
            ring.style.border = `4px solid ${colors[i % colors.length]}`;
            ring.style.boxShadow = `0 0 30px ${colors[i % colors.length]}`;
            ring.style.opacity = '0.8';
            ring.style.animation = `glowBurst ${ANIMATION_DURATION}ms ease-out forwards`;
            ring.style.animationDelay = (i * 80) + 'ms';

            container.appendChild(ring);
        }

        injectGlowKeyframes();
    }

    function injectGlowKeyframes() {
        if (document.getElementById('glow-keyframes')) return;
        const style = document.createElement('style');
        style.id = 'glow-keyframes';
        style.textContent = `
            @keyframes glowBurst {
                0% {
                    transform: scale(0.2);
                    opacity: 0.9;
                }
                50% {
                    opacity: 0.6;
                }
                100% {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        const form = document.getElementById('greet-form');
        const nameInput = document.getElementById('name-input');
        const greetingDisplay = document.getElementById('greeting-display');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = nameInput.value.trim();
            const displayName = name || 'there';

            greetingDisplay.textContent = 'Hello ' + displayName;
            greetingDisplay.classList.add('visible');

            runRandomAnimation();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.GreetingApp = {
        runRandomAnimation,
        clearAllAnimations,
        getAnimations: () => ANIMATIONS
    };
})();
