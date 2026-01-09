// Configuration
const CONFIG = {
    // GitHub Models API endpoint
    API_ENDPOINT: 'https://models.inference.ai.azure.com/chat/completions',
    // You'll need to set this as an environment variable or prompt user for it
    // For demo purposes, we'll show how to use it
    MODEL: 'gpt-4o',
};

// Chord quality definitions for different complexity levels
const CHORD_QUALITIES = {
    1: ['major', 'minor'],
    2: ['major', 'minor', 'sus2', 'sus4'],
    3: ['major', 'minor', '7', 'maj7', 'min7', 'sus2', 'sus4'],
    4: ['major', 'minor', '7', 'maj7', 'min7', '9', 'maj9', 'min9', '6', 'min6', 'dim', 'aug'],
    5: ['7#9', '7b9', 'maj7#11', 'min7b5', 'min(maj7)', 'maj7#5', '9sus4', '13', 'alt', '7b13', '9#11', 'dim7']
};

// DOM Elements
const settingsCard = document.getElementById('settingsCard');
const flipToAdvanced = document.getElementById('flipToAdvanced');
const flipToSimple = document.getElementById('flipToSimple');
const generateBtn = document.getElementById('generateBtn');
const loadingState = document.getElementById('loadingState');
const chordGrid = document.getElementById('chordGrid');
const complexitySlider = document.getElementById('complexity');
const keySelect = document.getElementById('key');
const modeSelect = document.getElementById('mode');
const tempoSelect = document.getElementById('tempo');
const styleSelect = document.getElementById('style');
const allowDiminished = document.getElementById('allowDiminished');
const allowAugmented = document.getElementById('allowAugmented');

// Event Listeners
flipToAdvanced.addEventListener('click', () => {
    settingsCard.classList.add('flipped');
});

flipToSimple.addEventListener('click', () => {
    settingsCard.classList.remove('flipped');
});

generateBtn.addEventListener('click', generateProgression);

// Check for API token
let githubToken = localStorage.getItem('github_models_token');

// Function to prompt for API token
function getAPIToken() {
    if (!githubToken) {
        const token = prompt(
            'Please enter your GitHub Models API token.\n\n' +
            'You can get one from: https://github.com/marketplace/models\n\n' +
            'The token will be stored locally in your browser.'
        );
        if (token) {
            githubToken = token;
            localStorage.setItem('github_models_token', token);
        }
    }
    return githubToken;
}

// Generate chord progression using AI
async function generateProgression() {
    // Get user preferences
    const complexity = parseInt(complexitySlider.value);
    const key = keySelect.value;
    const mode = modeSelect.value;
    const tempo = tempoSelect.value;
    const style = styleSelect.value;
    const includeDiminished = allowDiminished.checked;
    const includeAugmented = allowAugmented.checked;

    // Show loading state
    generateBtn.classList.add('generating');
    loadingState.classList.add('active');
    chordGrid.classList.remove('visible');
    chordGrid.innerHTML = '';

    try {
        // Get API token
        const token = getAPIToken();
        if (!token) {
            throw new Error('API token required');
        }

        // Create prompt for AI
        const prompt = createPrompt(complexity, key, mode, tempo, style, includeDiminished, includeAugmented);

        // Call GitHub Models API
        const response = await fetch(CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional music theory expert and composer. You help musicians create inspiring chord progressions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.9,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        const chords = parseAIResponse(data.choices[0].message.content);

        // Display chords
        displayChords(chords);

    } catch (error) {
        console.error('Error generating progression:', error);

        // Show error message
        chordGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: #ef4444; font-size: 1.1rem; margin-bottom: 10px;">⚠️ Error generating progression</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${error.message}</p>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 20px;">
                    Make sure you have a valid GitHub Models API token.<br>
                    Get one at: <a href="https://github.com/marketplace/models" target="_blank" style="color: var(--primary-light);">github.com/marketplace/models</a>
                </p>
                <button onclick="localStorage.removeItem('github_models_token'); location.reload();"
                    style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Reset API Token
                </button>
            </div>
        `;
        chordGrid.classList.add('visible');

        // Fallback to local generation if API fails
        if (error.message.includes('token') || error.message.includes('API')) {
            console.log('Falling back to local generation...');
            setTimeout(() => {
                const fallbackChords = generateLocalProgression(complexity, key, mode, style);
                displayChords(fallbackChords);
            }, 1500);
        }
    } finally {
        loadingState.classList.remove('active');
        generateBtn.classList.remove('generating');
    }
}

// Create prompt for AI
function createPrompt(complexity, key, mode, tempo, style, includeDiminished, includeAugmented) {
    const complexityDescriptions = {
        1: 'very simple, basic triads only (major and minor chords)',
        2: 'simple with some suspended chords',
        3: 'moderate complexity with 7th chords',
        4: 'complex with extended chords (9ths, 11ths, 13ths)',
        5: 'very complex jazz chords with alterations and substitutions'
    };

    let prompt = `Generate a chord progression of exactly 8 chords in the key of ${key}`;

    if (mode !== 'any') {
        prompt += ` ${mode}`;
    }

    prompt += `.\n\nComplexity level: ${complexityDescriptions[complexity]}`;

    if (style !== 'any') {
        prompt += `\nStyle: ${style}`;
    }

    if (tempo !== 'any') {
        prompt += `\nTempo: ${tempo}`;
    }

    if (includeDiminished) {
        prompt += `\nInclude diminished chords where appropriate.`;
    }

    if (includeAugmented) {
        prompt += `\nInclude augmented chords where appropriate.`;
    }

    prompt += `\n\nProvide EXACTLY 8 chords. Format your response as a simple list, one chord per line, with just the chord symbol (e.g., "Cmaj7", "Dm7", "G7"). Do not include chord numbers, descriptions, or any other text. Just the chord symbols.`;

    return prompt;
}

// Parse AI response
function parseAIResponse(response) {
    // Extract chord symbols from the response
    const lines = response.trim().split('\n');
    const chords = [];

    for (const line of lines) {
        // Remove any numbering, bullets, or extra whitespace
        const cleaned = line.trim().replace(/^[\d\.\-\*\)]+\s*/, '');
        if (cleaned && !cleaned.toLowerCase().includes('chord') && cleaned.length < 20) {
            chords.push({
                name: cleaned,
                type: getChordType(cleaned)
            });
        }
    }

    // Ensure we have exactly 8 chords
    if (chords.length > 8) {
        return chords.slice(0, 8);
    } else if (chords.length < 8) {
        // Pad with additional chords if needed
        while (chords.length < 8) {
            chords.push(chords[chords.length - 1]);
        }
    }

    return chords;
}

// Get chord type description
function getChordType(chordName) {
    const name = chordName.toLowerCase();

    if (name.includes('dim7')) return 'Diminished 7th';
    if (name.includes('dim')) return 'Diminished';
    if (name.includes('aug')) return 'Augmented';
    if (name.includes('maj7#11')) return 'Major 7 #11';
    if (name.includes('maj7#5')) return 'Major 7 #5';
    if (name.includes('maj9')) return 'Major 9th';
    if (name.includes('maj7')) return 'Major 7th';
    if (name.includes('min(maj7)')) return 'Minor Major 7th';
    if (name.includes('min7b5') || name.includes('m7b5')) return 'Half Diminished';
    if (name.includes('min9') || name.includes('m9')) return 'Minor 9th';
    if (name.includes('min7') || name.includes('m7')) return 'Minor 7th';
    if (name.includes('min6') || name.includes('m6')) return 'Minor 6th';
    if (name.includes('min') || name.includes('m')) return 'Minor';
    if (name.includes('7#9')) return 'Dominant 7 #9';
    if (name.includes('7b9')) return 'Dominant 7 b9';
    if (name.includes('7b13')) return 'Dominant 7 b13';
    if (name.includes('13')) return 'Dominant 13th';
    if (name.includes('9sus4')) return '9 Suspended 4th';
    if (name.includes('9#11')) return 'Dominant 9 #11';
    if (name.includes('9')) return 'Dominant 9th';
    if (name.includes('7')) return 'Dominant 7th';
    if (name.includes('6')) return 'Major 6th';
    if (name.includes('sus2')) return 'Suspended 2nd';
    if (name.includes('sus4')) return 'Suspended 4th';
    if (name.includes('alt')) return 'Altered';

    return 'Major';
}

// Fallback: Generate progression locally (without AI)
function generateLocalProgression(complexity, key, mode, style) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const keyIndex = notes.indexOf(key);

    // Common progressions by style
    const progressionTemplates = {
        pop: [0, 5, 3, 4, 0, 5, 3, 4],      // I-vi-IV-V
        jazz: [0, 3, 5, 0, 4, 0, 4, 0],     // ii-V-I variations
        blues: [0, 0, 3, 3, 0, 0, 4, 3],    // Blues progression
        rock: [0, 5, 3, 4, 0, 3, 4, 0],     // Rock variation
        classical: [0, 4, 5, 0, 3, 4, 5, 0], // Classical cadences
        rnb: [0, 3, 5, 4, 0, 3, 4, 0],      // R&B progression
        any: [0, 5, 3, 4, 0, 4, 5, 0]       // Generic progression
    };

    // Major scale intervals
    const majorScale = [0, 2, 4, 5, 7, 9, 11];
    const minorScale = [0, 2, 3, 5, 7, 8, 10];

    const scale = (mode === 'minor') ? minorScale : majorScale;
    const template = progressionTemplates[style] || progressionTemplates.any;
    const qualities = CHORD_QUALITIES[complexity] || CHORD_QUALITIES[3];

    const chords = template.map((degree, index) => {
        const noteIndex = (keyIndex + scale[degree % scale.length]) % 12;
        const note = notes[noteIndex];
        const quality = qualities[Math.floor(Math.random() * qualities.length)];

        let chordName = note;

        // Apply quality
        if (quality === 'minor') chordName += 'm';
        else if (quality === 'major') chordName += '';
        else if (quality !== 'major') chordName += quality;

        return {
            name: chordName,
            type: getChordType(chordName)
        };
    });

    return chords;
}

// Display chords on the page
function displayChords(chords) {
    chordGrid.innerHTML = '';

    chords.forEach((chord, index) => {
        const chordCard = document.createElement('div');
        chordCard.className = 'chord-card';
        chordCard.innerHTML = `
            <div class="chord-number">${index + 1}</div>
            <div class="chord-name">${chord.name}</div>
            <div class="chord-type">${chord.type}</div>
        `;
        chordGrid.appendChild(chordCard);
    });

    // Trigger animation
    setTimeout(() => {
        chordGrid.classList.add('visible');
    }, 100);
}

// Initialize with a welcome message
window.addEventListener('load', () => {
    chordGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 20px;">
                👋 Welcome! Click the generate button to create your first chord progression.
            </p>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Adjust the complexity and key above to customize your results.
            </p>
        </div>
    `;
    chordGrid.classList.add('visible');
});
