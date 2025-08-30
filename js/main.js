/**
 * Main Application Controller
 * Handles all user interactions and coordinates between components
 */

class EmotionDetectiveApp {
    constructor() {
        this.currentAlgorithm = 'basic';
        this.currentChart = null;
        this.isAnalyzing = false;
        this.exerciseScore = 0;
        this.exerciseTotal = 0;
        
        // Initialize app when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('🚀 Initializing Emotion Detective Academy...');
        
        // Initialize animations
        animationController.init();
        
        // Setup event listeners
        this.setupNavigation();
        this.setupAlgorithmSelection();
        this.setupAnalyzer();
        this.setupLearningSection();
        this.setupPlayground();
        
        // Add interactive effects
        InteractiveEffects.addButtonEffects();
        InteractiveEffects.addHoverEffects();
        InteractiveEffects.addScrollRevealEffects();
        
        // Setup real-time analysis
        this.setupRealTimeAnalysis();
        
        console.log('✅ App initialized successfully!');
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.showSection(sectionId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    showSection(sectionId) {
        animationController.animateSection(sectionId);
        
        // Trigger section-specific initializations
        switch(sectionId) {
            case 'learn':
                this.initializeLearningExercises();
                break;
            case 'playground':
                this.initializePlayground();
                break;
            case 'analyzer':
                this.focusTextInput();
                break;
        }
    }

    // ===== ALGORITHM SELECTION =====
    setupAlgorithmSelection() {
        const algorithmCards = document.querySelectorAll('.algorithm-card');
        
        algorithmCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                algorithmCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                card.classList.add('active');
                
                // Update current algorithm
                this.currentAlgorithm = card.getAttribute('data-algorithm');
                
                // Animate selection
                animationController.animateAlgorithmSelection(card);
                
                // Show algorithm info
                this.showAlgorithmInfo(this.currentAlgorithm);
                
                console.log(`🔧 Algorithm changed to: ${this.currentAlgorithm}`);
            });
        });
    }

    showAlgorithmInfo(algorithm) {
        const info = {
            basic: "Using Basic Lexicon Analysis - Perfect for learning how computers understand emotions through word lists!",
            advanced: "Using Pattern Recognition - Analyzing text structure, punctuation, and linguistic patterns!",
            neural: "Using Neural Network Simulation - Advanced AI combining multiple approaches for maximum accuracy!"
        };
        
        // You could show this in a tooltip or info panel
        console.log(`💡 ${info[algorithm]}`);
    }

    // ===== MAIN ANALYZER =====
    setupAnalyzer() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        const textInput = document.getElementById('textInput');
        
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.performAnalysis());
        }
        
        if (textInput) {
            // Enter key to analyze
            textInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                    this.performAnalysis();
                }
            });
        }
    }

    async performAnalysis() {
        if (this.isAnalyzing) return;
        
        const textInput = document.getElementById('textInput');
        const text = textInput?.value?.trim();
        
        if (!text) {
            this.showMessage('Please enter some text to analyze!', 'warning');
            return;
        }
        
        this.isAnalyzing = true;
        console.log(`🔍 Analyzing text with ${this.currentAlgorithm} algorithm...`);
        
        // Show loading animation
        animationController.showLoadingAnimation();
        
        // Simulate AI processing time
        await this.sleep(1500 + Math.random() * 1000);
        
        try {
            // Get the appropriate analyzer
            const analyzer = SentimentAnalyzers[this.currentAlgorithm];
            if (!analyzer) {
                throw new Error(`Algorithm ${this.currentAlgorithm} not found`);
            }
            
            // Perform analysis
            const result = analyzer.analyze(text);
            
            // Display results
            this.displayResults(result);
            
            console.log('📊 Analysis complete:', result);
            
        } catch (error) {
            console.error('❌ Analysis failed:', error);
            this.showMessage('Analysis failed. Please try again!', 'error');
        } finally {
            this.isAnalyzing = false;
            animationController.hideLoadingAnimation();
        }
    }

    displayResults(result) {
        // Update main sentiment display
        this.updateSentimentDisplay(result);
        
        // Update metrics
        this.updateMetrics(result);
        
        // Update word cloud
        this.updateWordCloud(result);
        
        // Update chart
        this.updateEmotionChart(result);
        
        // Update explanation
        this.updateExplanation(result);
        
        // Show results dashboard
        const dashboard = document.getElementById('resultsDashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
        }
    }

    updateSentimentDisplay(result) {
        const emojiEl = document.getElementById('sentimentEmoji');
        const labelEl = document.getElementById('sentimentLabel');
        const fillEl = document.getElementById('confidenceFill');
        const textEl = document.getElementById('confidenceText');
        
        if (emojiEl) emojiEl.textContent = result.emoji;
        if (labelEl) labelEl.textContent = result.sentiment.toUpperCase();
        if (textEl) textEl.textContent = `Confidence: ${result.confidence}%`;
        
        if (fillEl) {
            const colors = animationController.getSentimentColors(result.sentiment);
            fillEl.style.background = colors.background;
            animationController.animateConfidenceBar(fillEl, result.confidence);
        }
        
        // Animate the whole display
        animationController.animateSentimentResult(result);
    }

    updateMetrics(result) {
        const intensityEl = document.getElementById('intensityScore');
        const polarityEl = document.getElementById('polarityScore');
        
        if (intensityEl && result.metrics) {
            intensityEl.textContent = result.metrics.intensity || '0.0';
        }
        if (polarityEl && result.metrics) {
            polarityEl.textContent = result.metrics.polarity || '0.0';
        }
    }

    updateWordCloud(result) {
        const container = document.getElementById('wordCloud');
        if (!container) return;
        
        const words = result.emotionalWords || [];
        
        if (words.length === 0) {
            container.innerHTML = '<div class="no-words">No emotional words detected</div>';
            return;
        }
        
        animationController.animateWordCloud(words, container);
    }

    updateEmotionChart(result) {
        const canvas = document.getElementById('emotionChart');
        if (!canvas) return;
        
        // Calculate percentages for chart
        const positive = result.sentiment === 'positive' ? result.confidence : 
                        (result.emotionalWords?.filter(w => w.type === 'positive').length || 0) * 10;
        const negative = result.sentiment === 'negative' ? result.confidence :
                        (result.emotionalWords?.filter(w => w.type === 'negative').length || 0) * 10;
        const neutral = 100 - positive - negative;
        
        const chartData = [
            Math.max(0, positive),
            Math.max(0, negative),
            Math.max(0, neutral)
        ];
        
        if (this.currentChart) {
            ChartAnimations.updateChart(this.currentChart, chartData);
        } else {
            this.currentChart = ChartAnimations.createEmotionChart(canvas, chartData);
        }
    }

    updateExplanation(result) {
        const explanationEl = document.getElementById('explanationText');
        if (explanationEl && result.explanation) {
            // Use typewriter effect for explanation
            animationController.typeWriter(explanationEl, result.explanation, 30);
        }
    }

    // ===== REAL-TIME ANALYSIS =====
    setupRealTimeAnalysis() {
        const textInput = document.getElementById('textInput');
        const preview = document.getElementById('previewContent');
        
        if (!textInput || !preview) return;
        
        let timeout;
        
        textInput.addEventListener('input', () => {
            clearTimeout(timeout);
            
            // Show typing indicator
            const indicator = document.getElementById('typingIndicator');
            if (indicator) {
                indicator.style.display = 'block';
            }
            
            timeout = setTimeout(() => {
                this.updateRealTimePreview(textInput.value, preview);
                
                // Hide typing indicator
                if (indicator) {
                    indicator.style.display = 'none';
                }
            }, 500);
        });
    }

    updateRealTimePreview(text, preview) {
        if (!text.trim()) {
            preview.textContent = 'Start typing to see real-time analysis...';
            return;
        }
        
        // Quick sentiment preview using basic analyzer
        const result = SentimentAnalyzers.basic.analyze(text);
        
        preview.innerHTML = `
            <div style="color: ${this.getSentimentColor(result.sentiment)};">
                ${result.emoji} ${result.sentiment.toUpperCase()}
            </div>
            <div style="font-size: 0.9em; margin-top: 5px;">
                Score: ${result.score} | Confidence: ${result.confidence}%
            </div>
        `;
    }

    getSentimentColor(sentiment) {
        switch(sentiment) {
            case 'positive': return '#00b894';
            case 'negative': return '#e17055';
            default: return '#fdcb6e';
        }
    }

    // ===== LEARNING SECTION =====
    setupLearningSection() {
        // Setup interactive examples
        this.setupInteractiveExamples();
    }

    setupInteractiveExamples() {
        // This will be called when learning section is shown
    }

    initializeLearningExercises() {
        const exerciseGrid = document.getElementById('exerciseGrid');
        if (!exerciseGrid) return;
        
        const exercises = [
            { text: "I love this amazing ice cream!", correct: "positive" },
            { text: "This movie is terrible and boring.", correct: "negative" },
            { text: "The library opens at 9 AM.", correct: "neutral" },
            { text: "What a fantastic day! 🎉", correct: "positive" },
            { text: "I hate doing homework on weekends.", correct: "negative" },
            { text: "Please submit your report by Friday.", correct: "neutral" },
            { text: "This is the worst experience ever! 😭", correct: "negative" },
            { text: "Super excited about the concert! 🎵", correct: "positive" },
            { text: "The meeting is scheduled for 2 PM.", correct: "neutral" },
            { text: "Absolutely brilliant performance! 👏", correct: "positive" }
        ];
        
        exerciseGrid.innerHTML = '';
        this.exerciseScore = 0;
        this.exerciseTotal = exercises.length;
        
        exercises.forEach((exercise, index) => {
            const exerciseEl = this.createExerciseElement(exercise, index);
            exerciseGrid.appendChild(exerciseEl);
        });
        
        this.updateExerciseScore();
    }

    createExerciseElement(exercise, index) {
        const div = document.createElement('div');
        div.className = 'exercise-item';
        div.innerHTML = `
            <div class="exercise-text">${exercise.text}</div>
            <div class="exercise-options">
                <button class="exercise-btn positive" data-answer="positive">😊 Positive</button>
                <button class="exercise-btn negative" data-answer="negative">😢 Negative</button>
                <button class="exercise-btn neutral" data-answer="neutral">😐 Neutral</button>
            </div>
            <div class="exercise-feedback" style="display: none;"></div>
        `;
        
        div.style.cssText = `
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            margin: 10px 0;
            transition: all 0.3s ease;
        `;
        
        // Add event listeners to buttons
        const buttons = div.querySelectorAll('.exercise-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.checkExerciseAnswer(div, btn.dataset.answer, exercise.correct, buttons);
            });
        });
        
        return div;
    }

    checkExerciseAnswer(exerciseEl, userAnswer, correctAnswer, buttons) {
        const feedback = exerciseEl.querySelector('.exercise-feedback');
        const isCorrect = userAnswer === correctAnswer;
        
        // Disable all buttons
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === correctAnswer) {
                btn.style.background = '#00b894';
                btn.style.color = 'white';
            } else if (btn.dataset.answer === userAnswer && !isCorrect) {
                btn.style.background = '#e17055';
                btn.style.color = 'white';
            }
        });
        
        // Show feedback
        feedback.style.display = 'block';
        if (isCorrect) {
            feedback.innerHTML = `<div style="color: #00b894;">✅ Correct! Great job!</div>`;
            this.exerciseScore++;
            
            // Particle burst effect
            const rect = exerciseEl.getBoundingClientRect();
            animationController.createParticleBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                '#00b894'
            );
        } else {
            feedback.innerHTML = `<div style="color: #e17055;">❌ Not quite! The correct answer is ${correctAnswer}.</div>`;
        }
        
        // Update score
        this.updateExerciseScore();
        
        // Add completion effect
        exerciseEl.style.opacity = '0.7';
    }

    updateExerciseScore() {
        const scoreEl = document.getElementById('exerciseScore');
        if (scoreEl) {
            scoreEl.textContent = `${this.exerciseScore}/${this.exerciseTotal}`;
        }
    }

    // ===== PLAYGROUND SECTION =====
    setupPlayground() {
        // Initialize playground when section is shown
    }

    initializePlayground() {
        this.setupEmotionSliders();
        this.updateMixedEmotion();
    }

    setupEmotionSliders() {
        const sliders = ['happinessSlider', 'sadnessSlider', 'angerSlider'];
        
        sliders.forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            if (slider) {
                slider.addEventListener('input', () => {
                    this.updateMixedEmotion();
                });
            }
        });
    }

    updateMixedEmotion() {
        const happiness = document.getElementById('happinessSlider')?.value || 50;
        const sadness = document.getElementById('sadnessSlider')?.value || 25;
        const anger = document.getElementById('angerSlider')?.value || 25;
        
        const mixedResult = document.getElementById('mixedEmotion');
        if (!mixedResult) return;
        
        const total = parseInt(happiness) + parseInt(sadness) + parseInt(anger);
        const happinessPercent = (happiness / total * 100).toFixed(1);
        const sadnessPercent = (sadness / total * 100).toFixed(1);
        const angerPercent = (anger / total * 100).toFixed(1);
        
        let dominantEmotion = 'neutral';
        let emoji = '😐';
        
        if (happiness > sadness && happiness > anger) {
            dominantEmotion = 'happiness';
            emoji = '😊';
        } else if (sadness > happiness && sadness > anger) {
            dominantEmotion = 'sadness';
            emoji = '😢';
        } else if (anger > happiness && anger > sadness) {
            dominantEmotion = 'anger';
            emoji = '😠';
        }
        
        mixedResult.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 10px;">${emoji}</div>
            <div><strong>Dominant Emotion:</strong> ${dominantEmotion}</div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                😊 ${happinessPercent}% | 😢 ${sadnessPercent}% | 😠 ${angerPercent}%
            </div>
        `;
    }

    // ===== UTILITY FUNCTIONS =====
    loadSample() {
        const samples = [
            ...SampleTexts.positive,
            ...SampleTexts.negative,
            ...SampleTexts.neutral,
            ...SampleTexts.mixed
        ];
        
        const randomSample = samples[Math.floor(Math.random() * samples.length)];
        const textInput = document.getElementById('textInput');
        
        if (textInput) {
            textInput.value = randomSample;
            textInput.focus();
            
            // Trigger input event for real-time preview
            textInput.dispatchEvent(new Event('input'));
        }
    }

    clearInput() {
        const textInput = document.getElementById('textInput');
        const preview = document.getElementById('previewContent');
        const results = document.getElementById('resultsDashboard');
        
        if (textInput) {
            textInput.value = '';
            textInput.focus();
        }
        
        if (preview) {
            preview.textContent = 'Start typing to see real-time analysis...';
        }
        
        if (results) {
            results.style.display = 'none';
        }
    }

    focusTextInput() {
        const textInput = document.getElementById('textInput');
        if (textInput) {
            setTimeout(() => textInput.focus(), 500);
        }
    }

    generateRandomSentence() {
        const templates = [
            "I think this {adjective} {noun} is absolutely {feeling}!",
            "The {noun} was {adjective} and made me feel {feeling}.",
            "{feeling} about this {adjective} {noun} I just {verb}!",
            "This {noun} is {adjective}. It makes me {feeling}."
        ];
        
        const words = {
            adjective: ['amazing', 'terrible', 'boring', 'exciting', 'wonderful', 'awful', 'incredible', 'disappointing'],
            noun: ['movie', 'book', 'restaurant', 'game', 'song', 'experience', 'product', 'service'],
            feeling: ['happy', 'sad', 'excited', 'angry', 'disappointed', 'thrilled', 'frustrated', 'delighted'],
            verb: ['bought', 'tried', 'experienced', 'discovered', 'found', 'used']
        };
        
        const template = templates[Math.floor(Math.random() * templates.length)];
        let sentence = template;
        
        // Replace placeholders with random words
        Object.keys(words).forEach(type => {
            const wordList = words[type];
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            sentence = sentence.replace(`{${type}}`, randomWord);
        });
        
        const generatedContent = document.getElementById('generatedSentence');
        if (generatedContent) {
            generatedContent.innerHTML = `
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <strong>Generated Sentence:</strong><br>
                    "${sentence}"
                    <button onclick="app.analyzeGenerated('${sentence}')" style="margin-top: 10px; padding: 5px 15px; background: #4ecdc4; color: white; border: none; border-radius: 15px; cursor: pointer;">
                        Analyze This!
                    </button>
                </div>
            `;
        }
    }

    analyzeGenerated(sentence) {
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.value = sentence;
            this.showSection('analyzer');
            
            // Auto-analyze after a short delay
            setTimeout(() => {
                this.performAnalysis();
            }, 1000);
        }
    }

    startChallenge() {
        const challengeContent = document.getElementById('challengeContent');
        if (!challengeContent) return;
        
        const challenges = [
            { text: "This pizza is absolutely divine! 🍕", correct: "positive", difficulty: "easy" },
            { text: "I'm not unhappy with the service.", correct: "positive", difficulty: "hard" },
            { text: "The weather forecast predicts rain tomorrow.", correct: "neutral", difficulty: "easy" },
            { text: "This is the worst day ever! Everything is going wrong! 😭", correct: "negative", difficulty: "easy" },
            { text: "I suppose it's not terrible, just not great either.", correct: "neutral", difficulty: "medium" }
        ];
        
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        
        challengeContent.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px;">
                <h4>Challenge Text:</h4>
                <div style="font-style: italic; margin: 15px 0; font-size: 1.1em;">
                    "${randomChallenge.text}"
                </div>
                <div style="margin: 15px 0;">
                    <strong>Difficulty:</strong> ${randomChallenge.difficulty}
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="app.submitChallenge('positive', '${randomChallenge.correct}')" class="challenge-btn positive">
                        😊 Positive
                    </button>
                    <button onclick="app.submitChallenge('negative', '${randomChallenge.correct}')" class="challenge-btn negative">
                        😢 Negative
                    </button>
                    <button onclick="app.submitChallenge('neutral', '${randomChallenge.correct}')" class="challenge-btn neutral">
                        😐 Neutral
                    </button>
                </div>
                <div id="challengeResult" style="margin-top: 15px;"></div>
            </div>
        `;
    }

    submitChallenge(userAnswer, correctAnswer) {
        const resultEl = document.getElementById('challengeResult');
        const buttons = document.querySelectorAll('.challenge-btn');
        
        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);
        
        if (userAnswer === correctAnswer) {
            resultEl.innerHTML = `
                <div style="color: #00b894; font-weight: bold;">
                    🎉 Correct! You're becoming an emotion detection expert!
                </div>
            `;
            
            // Success particle effect
            animationController.createParticleBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                '#00b894',
                20
            );
        } else {
            resultEl.innerHTML = `
                <div style="color: #e17055; font-weight: bold;">
                    ❌ Not quite! The correct answer was ${correctAnswer}.
                    <br>Keep practicing - you're learning!
                </div>
            `;
        }
        
        // Add retry button
        setTimeout(() => {
            resultEl.innerHTML += `
                <button onclick="app.startChallenge()" style="margin-top: 10px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 15px; cursor: pointer;">
                    Try Another Challenge
                </button>
            `;
        }, 2000);
    }

    showExplanation(type) {
        const explanations = {
            positive: {
                emotion: "POSITIVE 😊",
                explanation: "This text contains happy, excited, or loving words like 'love' and 'amazing'. These make us feel good!",
                color: "#00b894"
            },
            negative: {
                emotion: "NEGATIVE 😢",
                explanation: "This text has sad, angry, or dislike words like 'terrible' and 'boring'. These express bad feelings.",
                color: "#e17055"
            },
            neutral: {
                emotion: "NEUTRAL 😐",
                explanation: "This text just shares information or facts without strong emotions. It's neither happy nor sad.",
                color: "#fdcb6e"
            }
        };
        
        const explanation = explanations[type];
        this.showMessage(
            `<strong style="color: ${explanation.color};">${explanation.emotion}</strong><br>${explanation.explanation}`,
            'info'
        );
    }

    showMessage(message, type = 'info') {
        // Create or update message popup
        let messageEl = document.getElementById('messagePopup');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'messagePopup';
            document.body.appendChild(messageEl);
        }
        
        const colors = {
            info: '#667eea',
            warning: '#fdcb6e',
            error: '#e17055',
            success: '#00b894'
        };
        
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            max-width: 400px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        messageEl.innerHTML = `
            ${message}
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; font-size: 1.2em; cursor: pointer; margin-left: 10px;">×</button>
        `;
        
        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (messageEl && messageEl.parentElement) {
                messageEl.style.transform = 'translateX(100%)';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, 5000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global functions for HTML onclick handlers
function showSection(sectionId) {
    if (window.app) {
        window.app.showSection(sectionId);
    }
}

function loadSample() {
    if (window.app) {
        window.app.loadSample();
    }
}

function clearInput() {
    if (window.app) {
        window.app.clearInput();
    }
}

function generateRandomSentence() {
    if (window.app) {
        window.app.generateRandomSentence();
    }
}

function startChallenge() {
    if (window.app) {
        window.app.startChallenge();
    }
}

function showExplanation(type) {
    if (window.app) {
        window.app.showExplanation(type);
    }
}

// Initialize the app
window.app = new EmotionDetectiveApp();

// Add some CSS for exercise elements and other dynamic content
const additionalStyles = `
.exercise-item {
    margin: 15px 0;
    transition: all 0.3s ease;
}

.exercise-text {
    font-size: 1.1em;
    margin-bottom: 15px;
    font-style: italic;
    color: #333;
}

.exercise-options {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.exercise-btn {
    padding: 8px 16px;
    border: 2px solid #ddd;
    background: white;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.exercise-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.exercise-btn:disabled {
    cursor: not-allowed;
}

.exercise-feedback {
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background: rgba(255,255,255,0.5);
}

.challenge-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    color: white;
}

.challenge-btn.positive {
    background: #00b894;
}

.challenge-btn.negative {
    background: #e17055;
}

.challenge-btn.neutral {
    background: #fdcb6e;
}

.challenge-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    opacity: 0.9;
}

.challenge-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .exercise-options {
        flex-direction: column;
    }
    
    .exercise-btn {
        width: 100%;
        text-align: center;
    }
}
`;

// Inject the additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('🎉 Emotion Detective Academy loaded successfully!');