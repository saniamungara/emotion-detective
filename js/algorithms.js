/**
 * Advanced Sentiment Analysis Algorithms
 * Multiple approaches for educational purposes
 */

// Enhanced emotion lexicon with intensity scores and categories
const EmotionLexicon = {
    // Positive emotions with intensity (0.1 to 1.0)
    positive: {
        // High intensity positive
        'amazing': 0.9, 'awesome': 0.9, 'excellent': 0.8, 'fantastic': 0.9,
        'incredible': 0.9, 'outstanding': 0.9, 'spectacular': 0.9, 'wonderful': 0.8,
        'brilliant': 0.9, 'perfect': 1.0, 'phenomenal': 0.9, 'extraordinary': 0.9,
        'marvelous': 0.8, 'magnificent': 0.8, 'superb': 0.8, 'terrific': 0.8,
        
        // Medium intensity positive
        'good': 0.5, 'great': 0.7, 'nice': 0.5, 'fine': 0.4, 'okay': 0.2,
        'pleasant': 0.6, 'lovely': 0.7, 'beautiful': 0.7, 'pretty': 0.6,
        'happy': 0.7, 'glad': 0.6, 'cheerful': 0.6, 'joyful': 0.8,
        
        // Love/affection
        'love': 0.8, 'adore': 0.9, 'cherish': 0.7, 'treasure': 0.7,
        'like': 0.5, 'enjoy': 0.6, 'appreciate': 0.6, 'favor': 0.5,
        
        // Excitement
        'excited': 0.7, 'thrilled': 0.9, 'ecstatic': 1.0, 'elated': 0.9,
        'enthusiastic': 0.8, 'eager': 0.6, 'pumped': 0.8,
        
        // Achievement
        'proud': 0.7, 'accomplished': 0.7, 'successful': 0.7, 'victorious': 0.8,
        'triumphant': 0.8, 'winning': 0.7, 'achieved': 0.6
    },
    
    // Negative emotions with intensity (-0.1 to -1.0)
    negative: {
        // High intensity negative
        'terrible': -0.9, 'horrible': -0.9, 'awful': -0.9, 'disgusting': -1.0,
        'hideous': -0.9, 'appalling': -0.9, 'atrocious': -0.9, 'dreadful': -0.9,
        'abysmal': -1.0, 'ghastly': -0.9, 'horrendous': -0.9, 'revolting': -1.0,
        
        // Hate/dislike
        'hate': -0.8, 'despise': -0.9, 'loathe': -1.0, 'detest': -0.9,
        'dislike': -0.5, 'resent': -0.6, 'abhor': -0.9,
        
        // Sadness
        'sad': -0.6, 'unhappy': -0.6, 'depressed': -0.8, 'miserable': -0.9,
        'heartbroken': -0.9, 'devastated': -1.0, 'crushed': -0.8, 'disappointed': -0.6,
        'upset': -0.6, 'hurt': -0.6, 'wounded': -0.7,
        
        // Anger
        'angry': -0.7, 'mad': -0.7, 'furious': -0.9, 'enraged': -1.0,
        'livid': -0.9, 'irate': -0.8, 'irritated': -0.5, 'annoyed': -0.5,
        'frustrated': -0.6, 'outraged': -0.9,
        
        // Fear/anxiety
        'scared': -0.6, 'afraid': -0.6, 'terrified': -0.9, 'frightened': -0.7,
        'anxious': -0.6, 'worried': -0.5, 'nervous': -0.5, 'panicked': -0.8,
        
        // Quality descriptors
        'bad': -0.5, 'poor': -0.5, 'inferior': -0.6, 'inadequate': -0.6,
        'unsatisfactory': -0.7, 'disappointing': -0.6, 'subpar': -0.6,
        'mediocre': -0.4, 'lame': -0.5, 'boring': -0.4, 'dull': -0.4,
        
        // Insults/criticism
        'stupid': -0.7, 'idiotic': -0.8, 'ridiculous': -0.6, 'absurd': -0.6,
        'foolish': -0.6, 'silly': -0.3, 'worthless': -0.8, 'useless': -0.7
    },
    
    // Intensifiers that modify emotion strength
    intensifiers: {
        'very': 1.5, 'extremely': 2.0, 'incredibly': 1.8, 'absolutely': 1.7,
        'completely': 1.6, 'totally': 1.5, 'utterly': 1.8, 'quite': 1.2,
        'really': 1.3, 'truly': 1.4, 'genuinely': 1.3, 'seriously': 1.4,
        'super': 1.6, 'mega': 1.8, 'ultra': 1.9, 'massively': 1.7,
        'tremendously': 1.8, 'exceptionally': 1.7, 'remarkably': 1.6,
        'particularly': 1.3, 'especially': 1.4, 'definitely': 1.2,
        'certainly': 1.2, 'surely': 1.2, 'indeed': 1.1
    },
    
    // Diminishers that reduce emotion strength
    diminishers: {
        'slightly': 0.5, 'somewhat': 0.6, 'rather': 0.7, 'fairly': 0.7,
        'pretty': 0.8, 'kind': 0.6, 'sort': 0.6, 'little': 0.5,
        'bit': 0.5, 'barely': 0.3, 'hardly': 0.3, 'scarcely': 0.3,
        'almost': 0.8, 'nearly': 0.8, 'practically': 0.9
    },
    
    // Negation words
    negators: [
        'not', 'no', 'never', 'none', 'nothing', 'nowhere', 'nobody', 'neither',
        "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't",
        "shouldn't", "mustn't", "haven't", "hasn't", "hadn't", "isn't", "aren't", "wasn't", "weren't"
    ],
    
    // Positive emoticons and emojis
    positiveEmoticons: [
        ':)', ':-)', ':D', ':-D', ':P', ':-P', ';)', ';-)', ':3',
        '😊', '😀', '😃', '😄', '😁', '🙂', '😍', '🥰', '😘', '😗',
        '🤗', '🤩', '😎', '👍', '👌', '💕', '❤️', '💖', '💯', '🔥',
        '🎉', '🥳', '✨', '⭐', '🌟', '💫'
    ],
    
    // Negative emoticons and emojis
    negativeEmoticons: [
        ':(', ':-(', ":'(", '>:(', 'D:', ':/', ':\\',
        '😢', '😭', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫',
        '😩', '😤', '😠', '😡', '🤬', '😨', '😰', '😱', '😳', '😵',
        '💔', '😪', '😴', '🤒', '🤕', '👎', '💩', '🚫', '❌'
    ]
};

/**
 * Basic Lexicon-Based Sentiment Analysis
 * Good for educational purposes - shows how word lists work
 */
class BasicLexiconAnalyzer {
    analyze(text) {
        if (!text || text.trim().length === 0) {
            return this.createResult(0, 0, [], 'No text provided');
        }
        // --- Contrast clause handling ---
        const contrastWords = ['but', 'however', 'although', 'though', 'yet'];
        let lower = text.toLowerCase();
        let splitIndex = -1;
        let foundWord = '';
        for (let word of contrastWords) {
            let idx = lower.indexOf(' ' + word + ' ');
            if (idx !== -1 && (splitIndex === -1 || idx < splitIndex)) {
                splitIndex = idx;
                foundWord = word;
            }
        }
        let mainClause = text;
        if (splitIndex !== -1) {
            // Use the clause after the contrast word
            mainClause = text.slice(splitIndex + foundWord.length + 2).trim();
            if (mainClause.length < 3) mainClause = text; // fallback if nothing after
       }
    // Now, use mainClause for all further analysis instead of text
       text = mainClause;
        const words = this.preprocessText(text);
        let totalScore = 0;
        let emotionalWordCount = 0;
        let emotionalWords = [];
        let currentModifier = 1;
        let negationActive = false;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            // Check for negation
            if (EmotionLexicon.negators.includes(word)) {
                negationActive = true;
                continue;
            }

            // Check for intensifiers
            if (EmotionLexicon.intensifiers[word]) {
                currentModifier *= EmotionLexicon.intensifiers[word];
                continue;
            }

            // Check for diminishers
            if (EmotionLexicon.diminishers[word]) {
                currentModifier *= EmotionLexicon.diminishers[word];
                continue;
            }

            // Check for emotional words
            let baseScore = 0;
            let emotionType = 'neutral';

            if (EmotionLexicon.positive[word]) {
                baseScore = EmotionLexicon.positive[word];
                emotionType = 'positive';
            } else if (EmotionLexicon.negative[word]) {
                baseScore = EmotionLexicon.negative[word];
                emotionType = 'negative';
            }

            if (baseScore !== 0) {
                let finalScore = baseScore * currentModifier;
                
                // Apply negation
                if (negationActive) {
                    finalScore = -finalScore;
                    emotionType = emotionType === 'positive' ? 'negative' : 'positive';
                    negationActive = false;
                }

                totalScore += finalScore;
                emotionalWordCount++;
                
                emotionalWords.push({
                    word: word,
                    type: emotionType,
                    intensity: Math.abs(finalScore),
                    modified: currentModifier !== 1 || negationActive
                });
            }

            // Reset modifier for next word
            currentModifier = 1;
        }

        const avgScore = emotionalWordCount > 0 ? totalScore / emotionalWordCount : 0;
        const confidence = this.calculateConfidence(emotionalWordCount, words.length);
        
        return this.createResult(avgScore, confidence, emotionalWords, this.generateExplanation(avgScore, emotionalWords));
    }

    preprocessText(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s\-']/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0);
    }

    calculateConfidence(emotionalWords, totalWords) {
        if (totalWords === 0) return 0;
        
        const emotionalRatio = emotionalWords / totalWords;
        const baseConfidence = Math.min(emotionalRatio * 100, 90);
        const wordCountBonus = Math.min(emotionalWords * 5, 20);
        
        return Math.min(baseConfidence + wordCountBonus, 95);
    }

    createResult(score, confidence, words, explanation) {
        let sentiment = 'neutral';
        let emoji = '😐';
        
        if (score > 0.1) {
            sentiment = 'positive';
            emoji = score > 0.6 ? '😍' : '😊';
        } else if (score < -0.1) {
            sentiment = 'negative';
            emoji = score < -0.6 ? '😭' : '😢';
        }

        return {
            sentiment,
            score: Number(score.toFixed(2)),
            confidence: Math.round(confidence),
            emoji,
            emotionalWords: words,
            explanation,
            algorithm: 'Basic Lexicon',
            metrics: {
                polarity: Number(score.toFixed(2)),
                intensity: Number(Math.abs(score).toFixed(2)),
                subjectivity: Math.min(words.length / 10, 1)
            }
        };
    }

    generateExplanation(score, words) {
        if (words.length === 0) {
            return "No emotional words detected. This text appears to be neutral or factual.";
        }

        const positiveWords = words.filter(w => w.type === 'positive').length;
        const negativeWords = words.filter(w => w.type === 'negative').length;
        
        let explanation = `Found ${words.length} emotional word(s): `;
        explanation += `${positiveWords} positive and ${negativeWords} negative. `;
        
        if (score > 0.1) {
            explanation += "Overall sentiment is positive because positive words outweigh negative ones.";
        } else if (score < -0.1) {
            explanation += "Overall sentiment is negative because negative words outweigh positive ones.";
        } else {
            explanation += "Sentiment is neutral with balanced or minimal emotional content.";
        }

        return explanation;
    }
}

/**
 * Advanced Pattern Recognition Analyzer
 * Looks for linguistic patterns, punctuation, capitalization, etc.
 */
class PatternRecognitionAnalyzer {
    analyze(text) {
        if (!text || text.trim().length === 0) {
            return this.createResult(0, 0, {}, 'No text provided');
        }

        const patterns = this.extractPatterns(text);
        const score = this.calculatePatternScore(patterns);
        const confidence = this.calculatePatternConfidence(patterns, text.length);
        
        return this.createResult(score, confidence, patterns, this.generatePatternExplanation(patterns, score));
    }

    extractPatterns(text) {
        return {
            // Punctuation patterns
            exclamationMarks: (text.match(/!/g) || []).length,
            questionMarks: (text.match(/\?/g) || []).length,
            ellipsis: (text.match(/\.{2,}/g) || []).length,
            
            // Capitalization patterns
            allCapsWords: (text.match(/\b[A-Z]{2,}\b/g) || []).length,
            capitalizedWords: (text.match(/\b[A-Z][a-z]+/g) || []).length,
            
            // Repetition patterns
            repeatedPunctuation: (text.match(/[!?]{2,}/g) || []).length,
            repeatedLetters: (text.match(/(.)\1{2,}/g) || []).length,
            repeatedWords: this.findRepeatedWords(text),
            
            // Emoticon patterns
            positiveEmoticons: this.countEmoticons(text, EmotionLexicon.positiveEmoticons),
            negativeEmoticons: this.countEmoticons(text, EmotionLexicon.negativeEmoticons),
            
            // Length patterns
            averageWordLength: this.calculateAverageWordLength(text),
            sentenceCount: (text.split(/[.!?]+/).filter(s => s.trim().length > 0)).length,
            
            // Special patterns
            profanity: this.detectProfanity(text),
            intensiveAdverbs: this.countIntensiveAdverbs(text),
            comparatives: this.countComparatives(text)
        };
    }

    findRepeatedWords(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        return Object.values(wordCount).filter(count => count > 1).length;
    }

    countEmoticons(text, emoticonList) {
        return emoticonList.reduce((count, emoticon) => {
            return count + (text.split(emoticon).length - 1);
        }, 0);
    }

    calculateAverageWordLength(text) {
        const words = text.match(/\b\w+\b/g) || [];
        if (words.length === 0) return 0;
        return words.reduce((sum, word) => sum + word.length, 0) / words.length;
    }

    detectProfanity(text) {
        const profanityWords = ['damn', 'hell', 'crap', 'stupid', 'idiot', 'moron'];
        return profanityWords.filter(word => 
            text.toLowerCase().includes(word)
        ).length;
    }

    countIntensiveAdverbs(text) {
        const intensiveAdverbs = ['extremely', 'incredibly', 'absolutely', 'completely', 'totally'];
        return intensiveAdverbs.filter(adverb => 
            text.toLowerCase().includes(adverb)
        ).length;
    }

    countComparatives(text) {
        const comparatives = ['better', 'worse', 'best', 'worst', 'more', 'less', 'most', 'least'];
        return comparatives.filter(comp => 
            text.toLowerCase().includes(comp)
        ).length;
    }

    calculatePatternScore(patterns) {
        let score = 0;
        
        // Positive indicators
        score += patterns.exclamationMarks * 0.15;
        score += patterns.positiveEmoticons * 0.4;
        score += patterns.intensiveAdverbs * 0.2;
        
        // Negative indicators
        score -= patterns.negativeEmoticons * 0.4;
        score -= patterns.profanity * 0.3;
        score -= patterns.ellipsis * 0.1;
        
        // Neutral/complexity indicators
        score += patterns.questionMarks * 0.05; // Questions can indicate engagement
        score += patterns.allCapsWords * 0.1; // CAPS can indicate strong emotion (could be positive or negative)
        score += patterns.repeatedPunctuation * 0.1;
        score += patterns.repeatedLetters * 0.1;
        
        // Normalize score to [-1, 1] range
        return Math.max(-1, Math.min(1, score));
    }

    calculatePatternConfidence(patterns, textLength) {
        let confidenceFactors = 0;
        let totalFactors = 0;
        
        // Count significant patterns
        if (patterns.exclamationMarks > 0) { confidenceFactors += patterns.exclamationMarks; totalFactors++; }
        if (patterns.positiveEmoticons > 0) { confidenceFactors += patterns.positiveEmoticons * 2; totalFactors++; }
        if (patterns.negativeEmoticons > 0) { confidenceFactors += patterns.negativeEmoticons * 2; totalFactors++; }
        if (patterns.allCapsWords > 0) { confidenceFactors += patterns.allCapsWords; totalFactors++; }
        if (patterns.repeatedPunctuation > 0) { confidenceFactors += patterns.repeatedPunctuation; totalFactors++; }
        if (patterns.profanity > 0) { confidenceFactors += patterns.profanity * 2; totalFactors++; }
        
        const baseConfidence = totalFactors > 0 ? (confidenceFactors / totalFactors) * 20 : 10;
        const lengthBonus = Math.min(textLength / 100, 1) * 20;
        
        return Math.min(baseConfidence + lengthBonus, 85);
    }

    createResult(score, confidence, patterns, explanation) {
        let sentiment = 'neutral';
        let emoji = '😐';
        
        if (score > 0.1) {
            sentiment = 'positive';
            emoji = score > 0.5 ? '🤩' : '😊';
        } else if (score < -0.1) {
            sentiment = 'negative';
            emoji = score < -0.5 ? '😡' : '😔';
        }

        return {
            sentiment,
            score: Number(score.toFixed(2)),
            confidence: Math.round(confidence),
            emoji,
            patterns,
            explanation,
            algorithm: 'Pattern Recognition',
            metrics: {
                polarity: Number(score.toFixed(2)),
                intensity: Number(Math.abs(score).toFixed(2)),
                complexity: this.calculateComplexity(patterns)
            }
        };
    }

    calculateComplexity(patterns) {
        const complexityFactors = [
            patterns.questionMarks,
            patterns.ellipsis,
            patterns.comparatives,
            Math.min(patterns.averageWordLength / 10, 1)
        ];
        
        return Number((complexityFactors.reduce((a, b) => a + b, 0) / complexityFactors.length).toFixed(2));
    }

    generatePatternExplanation(patterns, score) {
        let explanation = "Pattern analysis detected: ";
        const significantPatterns = [];
        
        if (patterns.positiveEmoticons > 0) {
            significantPatterns.push(`${patterns.positiveEmoticons} positive emoticon(s)`);
        }
        if (patterns.negativeEmoticons > 0) {
            significantPatterns.push(`${patterns.negativeEmoticons} negative emoticon(s)`);
        }
        if (patterns.exclamationMarks > 0) {
            significantPatterns.push(`${patterns.exclamationMarks} exclamation mark(s) indicating excitement`);
        }
        if (patterns.allCapsWords > 0) {
            significantPatterns.push(`${patterns.allCapsWords} capitalized word(s) showing emphasis`);
        }
        if (patterns.repeatedPunctuation > 0) {
            significantPatterns.push(`repeated punctuation showing strong emotion`);
        }
        
        if (significantPatterns.length > 0) {
            explanation += significantPatterns.join(', ') + '. ';
        } else {
            explanation += "minimal emotional patterns. ";
        }
        
        if (score > 0.1) {
            explanation += "The overall pattern suggests positive sentiment.";
        } else if (score < -0.1) {
            explanation += "The overall pattern suggests negative sentiment.";
        } else {
            explanation += "The patterns indicate neutral sentiment.";
        }
        
        return explanation;
    }
}

/**
 * Neural Network Simulator
 * Simulates advanced AI processing with ensemble methods
 */
class NeuralNetworkSimulator {
    constructor() {
        this.lexiconAnalyzer = new BasicLexiconAnalyzer();
        this.patternAnalyzer = new PatternRecognitionAnalyzer();
    }

    analyze(text) {
        if (!text || text.trim().length === 0) {
            return this.createResult(0, 0, {}, {}, 'No text provided');
        }

        // Get results from both analyzers
        const lexiconResult = this.lexiconAnalyzer.analyze(text);
        const patternResult = this.patternAnalyzer.analyze(text);
        
        // Apply neural network simulation (weighted ensemble)
        const combinedScore = this.combineScores(lexiconResult.score, patternResult.score, text);
        const combinedConfidence = this.combineConfidence(lexiconResult.confidence, patternResult.confidence, text);
        
        // Extract context features
        const contextFeatures = this.extractContextFeatures(text);
        
        return this.createResult(
            combinedScore, 
            combinedConfidence, 
            lexiconResult, 
            patternResult,
            this.generateNeuralExplanation(lexiconResult, patternResult, combinedScore, contextFeatures)
        );
    }

    combineScores(lexiconScore, patternScore, text) {
        // Dynamic weighting based on text characteristics
        let lexiconWeight = 0.7;
        let patternWeight = 0.3;
        
        // Adjust weights based on text features
        const words = text.match(/\b\w+\b/g) || [];
        //const hasEmoticons = /[😀-🙏]|[:;][)(\][]/.test(text);
        const hasEmoticons = /[\u{1F600}-\u{1F64F}]|[:;][)(\\\][]/u.test(text);
        const hasExclamations = /!/.test(text);
        const isShort = words.length < 10;
        
        if (hasEmoticons || hasExclamations) {
            // Give more weight to pattern analysis for expressive text
            patternWeight = 0.5;
            lexiconWeight = 0.5;
        }
        
        if (isShort && (hasEmoticons || hasExclamations)) {
            // For short expressive text, patterns matter more
            patternWeight = 0.6;
            lexiconWeight = 0.4;
        }
        
        const combinedScore = (lexiconScore * lexiconWeight) + (patternScore * patternWeight);
        
        // Apply neural network activation function (tanh for smooth transitions)
        return Math.tanh(combinedScore);
    }

    combineConfidence(lexiconConf, patternConf, text) {
        // Higher confidence when both methods agree
        const agreement = 1 - Math.abs(lexiconConf - patternConf) / 100;
        const averageConf = (lexiconConf + patternConf) / 2;
        
        // Boost confidence for agreement, reduce for disagreement
        const adjustedConf = averageConf * (0.7 + 0.3 * agreement);
        
        // Length and complexity bonus
        const words = text.match(/\b\w+\b/g) || [];
        const lengthBonus = Math.min(words.length / 50, 0.15);
        
        return Math.min(adjustedConf + (lengthBonus * 100), 95);
    }

    extractContextFeatures(text) {
        const words = text.match(/\b\w+\b/g) || [];
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        return {
            wordCount: words.length,
            sentenceCount: sentences.length,
            averageSentenceLength: sentences.length > 0 ? words.length / sentences.length : 0,
            complexityScore: this.calculateTextComplexity(text),
            contextualClues: this.findContextualClues(text),
            emotionalProgression: this.analyzeEmotionalProgression(text)
        };
    }

    calculateTextComplexity(text) {
        const words = text.match(/\b\w+\b/g) || [];
        if (words.length === 0) return 0;
        
        const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
        const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
        const vocabularyRichness = uniqueWords / words.length;
        
        return (avgWordLength / 10) + vocabularyRichness;
    }

    findContextualClues(text) {
        const clues = [];
        
        // Temporal indicators
        if (/\b(will|gonna|future|tomorrow|next|later)\b/i.test(text)) {
            clues.push('future-oriented');
        }
        if (/\b(was|were|past|yesterday|ago|before)\b/i.test(text)) {
            clues.push('past-oriented');
        }
        
        // Certainty indicators
        if (/\b(definitely|certainly|absolutely|sure|confident)\b/i.test(text)) {
            clues.push('high-certainty');
        }
        if (/\b(maybe|perhaps|possibly|might|could|uncertain)\b/i.test(text)) {
            clues.push('low-certainty');
        }
        
        // Social context
        if (/\b(we|us|our|together|team|group)\b/i.test(text)) {
            clues.push('social-context');
        }
        if (/\b(I|me|my|myself|personal)\b/i.test(text)) {
            clues.push('personal-context');
        }
        
        return clues;
    }

    analyzeEmotionalProgression(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length < 2) return 'stable';
        
        const sentimentScores = sentences.map(sentence => {
            const result = this.lexiconAnalyzer.analyze(sentence);
            return result.score;
        });
        
        const firstHalf = sentimentScores.slice(0, Math.floor(sentimentScores.length / 2));
        const secondHalf = sentimentScores.slice(Math.floor(sentimentScores.length / 2));
        
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        const change = secondAvg - firstAvg;
        
        if (change > 0.2) return 'improving';
        if (change < -0.2) return 'declining';
        return 'stable';
    }

    createResult(score, confidence, lexiconResult, patternResult, explanation) {
        let sentiment = 'neutral';
        let emoji = '🤖';
        
        if (score > 0.15) {
            sentiment = 'positive';
            emoji = score > 0.6 ? '🚀' : '😊';
        } else if (score < -0.15) {
            sentiment = 'negative';
            emoji = score < -0.6 ? '💥' : '😔';
        }

        return {
            sentiment,
            score: Number(score.toFixed(2)),
            confidence: Math.round(confidence),
            emoji,
            explanation,
            algorithm: 'Neural Network (Ensemble)',
            components: {
                lexicon: lexiconResult,
                pattern: patternResult
            },
            metrics: {
                polarity: Number(score.toFixed(2)),
                intensity: Number(Math.abs(score).toFixed(2)),
                subjectivity: Number(((lexiconResult.metrics?.subjectivity || 0) + (patternResult.metrics?.complexity || 0)) / 2).toFixed(2)
            }
        };
    }

    generateNeuralExplanation(lexiconResult, patternResult, finalScore, contextFeatures) {
        let explanation = `🧠 Neural analysis combining multiple AI approaches:\n\n`;
        
        explanation += `📚 **Lexicon Analysis**: ${lexiconResult.sentiment} (${lexiconResult.score})\n`;
        explanation += `🔍 **Pattern Analysis**: ${patternResult.sentiment} (${patternResult.score})\n\n`;
        
        explanation += `⚖️ **Ensemble Result**: The AI weighted these analyses based on text characteristics. `;
        
        if (Math.abs(lexiconResult.score - patternResult.score) < 0.3) {
            explanation += `Both methods agreed, increasing confidence to ${Math.round((lexiconResult.confidence + patternResult.confidence) / 2)}%.`;
        } else {
            explanation += `Methods showed some disagreement, requiring careful weighted combination.`;
        }
        
        explanation += `\n\n🎯 **Context Insights**: `;
        if (contextFeatures.contextualClues.length > 0) {
            explanation += `Detected ${contextFeatures.contextualClues.join(', ')} context. `;
        }
        explanation += `Emotional progression appears to be ${contextFeatures.emotionalProgression}.`;
        
        return explanation;
    }
}

// Export analyzers for use in main.js
const SentimentAnalyzers = {
    basic: new BasicLexiconAnalyzer(),
    advanced: new PatternRecognitionAnalyzer(),
    neural: new NeuralNetworkSimulator()
};

// Sample texts for testing
const SampleTexts = {
    positive: [
        "I absolutely love this amazing new restaurant! The food is incredible and the service is outstanding!",
        "What a fantastic day! Everything went perfectly and I'm so excited about the future! 🎉",
        "This movie is the best thing I've ever seen. Absolutely brilliant and touching!",
        "Super happy with my new purchase! Excellent quality and fast delivery. Highly recommend! 👍"
    ],
    negative: [
        "This is the worst experience I've ever had. Terrible service and awful food. Never coming back!",
        "I hate this stupid software. It's buggy, slow, and completely useless. What a waste of money! 😡",
        "Disappointed and frustrated with this product. Poor quality and doesn't work as advertised.",
        "The movie was boring and predictable. Two hours of my life I'll never get back. Awful! 👎"
    ],
    neutral: [
        "The library opens at 9 AM and closes at 6 PM on weekdays.",
        "Today's weather forecast shows partly cloudy skies with temperatures around 72°F.",
        "The meeting is scheduled for next Tuesday at 2:00 PM in conference room B.",
        "Please submit your report by the end of the week. Include all necessary documentation."
    ],
    mixed: [
        "The hotel room was nice and clean, but the service was terrible and the food was overpriced.",
        "Great product design and functionality, however the customer support is lacking and delivery was slow.",
        "I love the concept of this app, but it crashes frequently and has many bugs that need fixing.",
        "Beautiful location and amazing views! Too bad the weather was awful and it rained all day. 😕"
    ]
}; 
window.SentimentAnalyzers = SentimentAnalyzers;
window.SampleTexts = SampleTexts;