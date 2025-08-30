/**
 * Advanced Animations and Visual Effects
 * Creates engaging visual experiences for the sentiment analysis app
 */

class AnimationController {
    constructor() {
        this.particles = [];
        this.neuralNodes = [];
        this.animationFrame = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        this.createParticleSystem();
        this.createNeuralNetwork();
        this.startAnimationLoop();
        this.setupScrollEffects();
        this.isInitialized = true;
    }

    createParticleSystem() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 8}s;
                animation-duration: ${6 + Math.random() * 4}s;
            `;
            particleContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createNeuralNetwork() {
        const neuralContainer = document.getElementById('neuralNetwork');
        if (!neuralContainer) return;

        // Create neural network visualization
        for (let i = 0; i < 20; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.cssText = `
                position: absolute;
                width: ${4 + Math.random() * 4}px;
                height: ${4 + Math.random() * 4}px;
                background: rgba(76, 201, 196, ${0.3 + Math.random() * 0.4});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: pulse ${2 + Math.random() * 3}s infinite;
            `;
            neuralContainer.appendChild(node);
            this.neuralNodes.push({
                element: node,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateNeuralNetwork();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    updateNeuralNetwork() {
        this.neuralNodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x <= 0 || node.x >= window.innerWidth) node.vx = -node.vx;
            if (node.y <= 0 || node.y >= window.innerHeight) node.vy = -node.vy;

            node.element.style.left = `${(node.x / window.innerWidth) * 100}%`;
            node.element.style.top = `${(node.y / window.innerHeight) * 100}%`;
        });
    }

    setupScrollEffects() {
        // Parallax scrolling for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.particles, .neural-network');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Text typing animation
    typeWriter(element, text, speed = 50) {
        return new Promise((resolve) => {
            let i = 0;
            element.textContent = '';
            
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    // Animate confidence bar
    animateConfidenceBar(element, targetWidth, duration = 1000) {
        if (!element) return;
        
        element.style.width = '0%';
        element.style.transition = `width ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.width = `${targetWidth}%`;
        }, 100);
    }

    // Animate sentiment result
    animateSentimentResult(sentimentData) {
        const display = document.getElementById('sentimentDisplay');
        if (!display) return;

        // Add entrance animation
        display.style.transform = 'scale(0.8) translateY(20px)';
        display.style.opacity = '0';
        display.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

        setTimeout(() => {
            display.style.transform = 'scale(1) translateY(0)';
            display.style.opacity = '1';
        }, 100);

        // Update colors based on sentiment
        const colors = this.getSentimentColors(sentimentData.sentiment);
        display.style.background = colors.background;
        display.style.boxShadow = colors.shadow;
    }

    // Get colors based on sentiment
    getSentimentColors(sentiment) {
        switch (sentiment) {
            case 'positive':
                return {
                    background: 'linear-gradient(135deg, #00b894, #00cec9)',
                    shadow: '0 10px 30px rgba(0, 184, 148, 0.3)',
                    text: '#fff'
                };
            case 'negative':
                return {
                    background: 'linear-gradient(135deg, #e17055, #d63031)',
                    shadow: '0 10px 30px rgba(225, 112, 85, 0.3)',
                    text: '#fff'
                };
            default:
                return {
                    background: 'linear-gradient(135deg, #fdcb6e, #f39c12)',
                    shadow: '0 10px 30px rgba(253, 203, 110, 0.3)',
                    text: '#fff'
                };
        }
    }

    // Animate word cloud
    animateWordCloud(words, container) {
        if (!container) return;
        
        container.innerHTML = '';
        
        words.forEach((word, index) => {
            const wordElement = document.createElement('span');
            wordElement.className = `word-tag ${word.type}`;
            wordElement.textContent = word.word;
            wordElement.style.opacity = '0';
            wordElement.style.transform = 'scale(0) rotate(45deg)';
            wordElement.style.transition = `all 0.5s ease ${index * 100}ms`;
            
            // Add hover effects
            wordElement.addEventListener('mouseenter', () => {
                wordElement.style.transform = 'scale(1.2)';
                this.showWordTooltip(wordElement, word);
            });
            
            wordElement.addEventListener('mouseleave', () => {
                wordElement.style.transform = 'scale(1)';
                this.hideWordTooltip();
            });
            
            container.appendChild(wordElement);
            
            // Animate in
            setTimeout(() => {
                wordElement.style.opacity = '1';
                wordElement.style.transform = 'scale(1) rotate(0deg)';
            }, index * 100 + 200);
        });
    }

    // Show word tooltip
    showWordTooltip(element, wordData) {
        const tooltip = this.createTooltip();
        tooltip.innerHTML = `
            <strong>${wordData.word}</strong><br>
            Type: ${wordData.type}<br>
            Intensity: ${wordData.intensity.toFixed(2)}
        `;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.opacity = '1';
    }

    // Hide word tooltip
    hideWordTooltip() {
        const tooltip = document.getElementById('wordTooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    }

    // Create tooltip element
    createTooltip() {
        const existing = document.getElementById('wordTooltip');
        if (existing) existing.remove();
        
        const tooltip = document.createElement('div');
        tooltip.id = 'wordTooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        return tooltip;
    }

    // Animate chart creation
    animateChart(chartInstance, data) {
        if (!chartInstance) return;
        
        // Start with empty data
        chartInstance.data.datasets[0].data = [0, 0, 0];
        chartInstance.update();
        
        // Animate to final values
        setTimeout(() => {
            chartInstance.data.datasets[0].data = data;
            chartInstance.update('active');
        }, 300);
    }

    // Loading animation
    showLoadingAnimation() {
        const loading = document.getElementById('loadingAnimation');
        const results = document.getElementById('resultsContent');
        
        if (loading) {
            loading.style.display = 'block';
            this.animateThinkingDots();
        }
        
        if (results) {
            results.style.display = 'none';
            results.classList.remove('active');
        }
    }

    // Hide loading animation
    hideLoadingAnimation() {
        const loading = document.getElementById('loadingAnimation');
        const results = document.getElementById('resultsContent');
        
        if (loading) {
            loading.style.display = 'none';
        }
        
        if (results) {
            setTimeout(() => {
                results.style.display = 'block';
                results.classList.add('active');
            }, 200);
        }
    }

    // Animate thinking dots
    animateThinkingDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Section transition animation
    animateSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        const targetSection = document.getElementById(sectionId);
        
        if (!targetSection) return;
        
        // Hide all sections
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.opacity = '0';
                section.style.transform = 'translateX(-30px)';
                
                setTimeout(() => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        // Show target section
        setTimeout(() => {
            targetSection.style.display = 'block';
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateX(30px)';
            targetSection.classList.add('active');
            
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateX(0)';
            }, 50);
        }, 350);
    }

    // Particle burst effect
    createParticleBurst(x, y, color = '#4ecdc4', count = 15) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${x}px;
                top: ${y}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let currentX = x;
            let currentY = y;
            let opacity = 1;
            
            const animate = () => {
                currentX += vx;
                currentY += vy;
                opacity -= 0.02;
                
                particle.style.left = `${currentX}px`;
                particle.style.top = `${currentY}px`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }
    }

    // Algorithm card selection animation
    animateAlgorithmSelection(selectedCard) {
        const cards = document.querySelectorAll('.algorithm-card');
        
        cards.forEach(card => {
            if (card === selectedCard) {
                card.style.transform = 'scale(1.05) translateY(-5px)';
                card.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
            } else {
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0.7';
            }
        });
        
        // Reset after animation
        setTimeout(() => {
            cards.forEach(card => {
                if (card !== selectedCard) {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }
            });
        }, 1000);
    }

    // Cleanup animations
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.particles = [];
        this.neuralNodes = [];
        this.isInitialized = false;
    }
}

// Specialized chart animations
class ChartAnimations {
    static createEmotionChart(canvas, data) {
        const ctx = canvas.getContext('2d');
        
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    data: [0, 0, 0], // Start with empty data
                    backgroundColor: [
                        'rgba(0, 184, 148, 0.8)',
                        'rgba(225, 112, 85, 0.8)',
                        'rgba(253, 203, 110, 0.8)'
                    ],
                    borderColor: [
                        '#00b894',
                        '#e17055',
                        '#fdcb6e'
                    ],
                    borderWidth: 2,
                    hoverBackgroundColor: [
                        'rgba(0, 184, 148, 1)',
                        'rgba(225, 112, 85, 1)',
                        'rgba(253, 203, 110, 1)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12,
                                family: 'Inter, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: ${value.toFixed(1)}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500,
                    easing: 'easeOutCubic'
                }
            }
        });
        
        // Animate the data in
        setTimeout(() => {
            chart.data.datasets[0].data = data;
            chart.update('active');
        }, 300);
        
        return chart;
    }

    static updateChart(chart, newData) {
        if (!chart) return;
        
        chart.data.datasets[0].data = newData;
        chart.update('active');
    }
}

// Interactive effects for user engagement
class InteractiveEffects {
    static addButtonEffects() {
        const buttons = document.querySelectorAll('button, .nav-link, .algorithm-card, .example-card');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    static addHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .algorithm-card, .tool-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    static addScrollRevealEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const elements = document.querySelectorAll('.feature-card, .story-chapter, .tool-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// CSS for additional animations (inject into document)
const additionalCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes thinkingDots {
    0%, 60%, 100% {
        transform: translateY(0);
        background-color: #4ecdc4;
    }
    30% {
        transform: translateY(-20px);
        background-color: #ff6b6b;
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.7;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
}

@keyframes glow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(76, 201, 196, 0.5);
    }
    50% {
        box-shadow: 0 0 20px rgba(76, 201, 196, 0.8);
    }
}

.thinking-dots .dot {
    animation: thinkingDots 1.5s infinite;
}

.neural-node {
    animation: pulse 3s infinite;
}

.glow-effect {
    animation: glow 2s infinite;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Export animation controller
const animationController = new AnimationController();