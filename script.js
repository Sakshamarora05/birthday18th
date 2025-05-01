document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startButton = document.getElementById('startButton');
    const landing = document.getElementById('landing');
    const gallery = document.getElementById('gallery');
    const messages = document.getElementById('messages');
    const final = document.getElementById('final');
    const toMessages = document.getElementById('toMessages');
    const toFinal = document.getElementById('toFinal');
    const restart = document.getElementById('restart');
    const messageCards = document.querySelectorAll('.message-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const floatingEmojis = document.querySelector('.floating-emojis');
    
    // Variables
    let currentCardIndex = 0;
    let balloonsInterval;
    let confettiInterval;
    let emojisInterval;
    const emojis = ['🎉', '🎂', '🎈', '🥳', '🎁', '✨', '🌸', '💫'];
    
    // Initialize
    messageCards[currentCardIndex].classList.add('active');
    
    // Event Listeners
    startButton.addEventListener('click', startCelebration);
    toMessages.addEventListener('click', () => navigateTo('gallery', 'messages'));
    toFinal.addEventListener('click', () => navigateTo('messages', 'final'));
    restart.addEventListener('click', () => navigateTo('final', 'landing'));
    prevBtn.addEventListener('click', showPreviousCard);
    nextBtn.addEventListener('click', showNextCard);
    
    // Functions
    function startCelebration() {
        // Play music
        birthdayMusic.play().catch(e => {
            // Show play button if autoplay fails
            startButton.innerHTML = '<span class="button-text">Click to enable music!</span>';
            startButton.onclick = () => {
                birthdayMusic.play();
                startCelebration();
            };
        });
        
        // Create floating balloons
        createBalloons();
        
        // Navigate to next section
        navigateTo('landing', 'gallery');
        
        // Start confetti
        createConfetti();
        
        // Add sparkle effect to button
        addButtonSparkles();
    }
    
    function navigateTo(from, to) {
        const fromSection = document.getElementById(from);
        const toSection = document.getElementById(to);
        
        fromSection.classList.add('hidden');
        toSection.classList.remove('hidden');
        
        // Special effects for certain sections
        if (to === 'gallery') {
            animatePhotoGrid();
        } else if (to === 'final') {
            animateCake();
            createFloatingEmojis();
        }
    }
    
    function createBalloons() {
        clearInterval(balloonsInterval);
        
        balloonsInterval = setInterval(() => {
            const balloonColors = ['#ff9ff3', '#48dbfb', '#feca57', '#1dd1a1', '#ff6b6b'];
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            // Random position
            const xPos = Math.random() * window.innerWidth;
            
            // Random color
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            
            // Random size
            const size = Math.random() * 60 + 40;
            
            // Random animation duration
            const duration = Math.random() * 15 + 10;
            
            // Set styles
            balloon.style.left = `${xPos}px`;
            balloon.style.bottom = `-100px`;
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.2}px`;
            balloon.style.backgroundColor = color;
            balloon.style.animation = `floatUp ${duration}s linear forwards`;
            
            // Add string
            const string = document.createElement('div');
            string.style.position = 'absolute';
            string.style.bottom = `-${size * 0.8}px`;
            string.style.left = '50%';
            string.style.width = '2px';
            string.style.height = `${size * 0.8}px`;
            string.style.backgroundColor = '#777';
            string.style.transform = 'translateX(-50%)';
            
            balloon.appendChild(string);
            
            // Add to DOM
            document.querySelector('.floating-elements').appendChild(balloon);
            
            // Remove after animation
            setTimeout(() => {
                balloon.remove();
            }, duration * 1000);
        }, 800);
    }
    
    function createConfetti() {
        clearInterval(confettiInterval);
        
        confettiInterval = setInterval(() => {
            const colors = ['#ff4757', '#ff6b81', '#ff9f43', '#feca57', '#1dd1a1', '#48dbfb', '#0abde3', '#5f27cd'];
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random position
            const xPos = Math.random() * window.innerWidth;
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            // Set styles
            confetti.style.left = `${xPos}px`;
            confetti.style.backgroundColor = color;
            confetti.style.opacity = '1';
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '8px solid transparent';
                confetti.style.borderRight = '8px solid transparent';
                confetti.style.borderBottom = `15px solid ${color}`;
                confetti.style.backgroundColor = 'transparent';
            }
            
            // Random animation
            const animationDuration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            
            confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            // Add to DOM
            document.querySelector('.floating-elements').appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }, 100);
    }
    
    function addButtonSparkles() {
        const button = document.querySelector('.cta-button');
        const sparklesContainer = button.querySelector('.button-sparkles');
        
        // Clear existing sparkles
        sparklesContainer.innerHTML = '';
        
        // Add multiple sparkles
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('span');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '10px';
            sparkle.style.height = '10px';
            sparkle.style.backgroundColor = 'white';
            sparkle.style.borderRadius = '50%';
            sparkle.style.opacity = '0';
            
            // Random position
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay
            sparkle.style.animation = `sparkle ${Math.random() * 1 + 1}s infinite`;
            sparkle.style.animationDelay = `${i * 0.3}s`;
            
            sparklesContainer.appendChild(sparkle);
        }
    }
    
    function animatePhotoGrid() {
        const photoItems = document.querySelectorAll('.photo-item');
        
        photoItems.forEach((item, index) => {
            // Staggered animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1) rotateY(0deg)';
            }, index * 200);
        });
    }
    
    function showNextCard() {
        messageCards[currentCardIndex].classList.remove('active');
        currentCardIndex = (currentCardIndex + 1) % messageCards.length;
        messageCards[currentCardIndex].classList.add('active');
    }
    
    function showPreviousCard() {
        messageCards[currentCardIndex].classList.remove('active');
        currentCardIndex = (currentCardIndex - 1 + messageCards.length) % messageCards.length;
        messageCards[currentCardIndex].classList.add('active');
    }
    
    function animateCake() {
        const candle = document.querySelector('.candle');
        const flame = document.querySelector('.flame');
        
        // Make candle appear to be blown out after delay
        setTimeout(() => {
            flame.style.animation = 'none';
            flame.style.transform = 'translateX(-50%) scale(0)';
            flame.style.opacity = '0';
            
            // Add smoke effect
            const smoke = document.createElement('div');
            smoke.style.position = 'absolute';
            smoke.style.width = '5px';
            smoke.style.height = '20px';
            smoke.style.backgroundColor = '#ccc';
            smoke.style.borderRadius = '50%';
            smoke.style.left = '50%';
            smoke.style.top = '-30px';
            smoke.style.transform = 'translateX(-50%)';
            smoke.style.opacity = '0.7';
            smoke.style.animation = 'smokeRise 2s ease-out forwards';
            
            candle.appendChild(smoke);
            
            // Remove smoke after animation
            setTimeout(() => {
                smoke.remove();
            }, 2000);
            
            // Create mini explosion effect
            createMiniExplosion(candle);
        }, 3000);
    }
    
    function createMiniExplosion(element) {
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'absolute';
            spark.style.width = '5px';
            spark.style.height = '5px';
            spark.style.backgroundColor = '#ffeb3b';
            spark.style.borderRadius = '50%';
            spark.style.left = '50%';
            spark.style.top = '0';
            spark.style.transform = 'translate(-50%, -50%)';
            spark.style.boxShadow = '0 0 5px #ff9800';
            spark.style.animation = `sparkFly ${Math.random() * 1 + 0.5}s forwards`;
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 30;
            
            // Add keyframes dynamically
            const style = document.createElement('style');
            style.textContent = `
                @keyframes sparkFly {
                    to {
                        transform: translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            element.appendChild(spark);
            
            // Remove after animation
            setTimeout(() => {
                spark.remove();
                style.remove();
            }, 1000);
        }
    }
    
    function createFloatingEmojis() {
        clearInterval(emojisInterval);
        
        emojisInterval = setInterval(() => {
            const emoji = document.createElement('div');
            emoji.classList.add('floating-emoji');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random position
            emoji.style.left = `${Math.random() * 100}%`;
            
            // Random size
            emoji.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
            
            // Random animation duration
            const duration = Math.random() * 10 + 5;
            emoji.style.animationDuration = `${duration}s`;
            
            floatingEmojis.appendChild(emoji);
            
            // Remove after animation
            setTimeout(() => {
                emoji.remove();
            }, duration * 1000);
        }, 500);
    }
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                opacity: 0.8;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});