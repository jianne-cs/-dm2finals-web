// Ave Mujica Logic Grimoire - Main Application

class LogicGrimoire {
    constructor() {
        this.currentSection = 0;
        this.unlockedSongs = [];
        this.completedGates = [];
        this.questProgress = {};
        this.questCompleted = {};
        this.currentQuest = null;
        this.currentStage = 0;
        this.finalMasqueradeSeen = false;
        
        // Audio
        this.audio = new Audio();
        this.isPlaying = false;
        this.playlist = [];
        this.currentTrack = 0;
        this.volume = 0.5;
        
        this.loadProgress();
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupResetButton();
        this.renderOperations();
        this.renderCharacters();
        this.renderGates();
        this.setupMusicPlayer();
        this.setupModals();
        this.showSection(0);
        
        // Check if final masquerade should show
        setTimeout(() => {
            this.checkAndShowFinalMasquerade();
        }, 1000);
    }
    
    setupResetButton() {
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetProgress());
        }
    }
    
    // Progress Management
    saveProgress() {
        const data = {
            unlockedSongs: this.unlockedSongs,
            completedGates: this.completedGates,
            questProgress: this.questProgress,
            questCompleted: this.questCompleted,
            finalMasqueradeSeen: this.finalMasqueradeSeen
        };
        localStorage.setItem('logicGrimoireProgress', JSON.stringify(data));
    }
    
    loadProgress() {
        const saved = localStorage.getItem('logicGrimoireProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.unlockedSongs = data.unlockedSongs || [];
            this.completedGates = data.completedGates || [];
            this.questProgress = data.questProgress || {};
            this.questCompleted = data.questCompleted || {};
            this.finalMasqueradeSeen = data.finalMasqueradeSeen || false;
        }
    }
    
    resetProgress() {
        if (confirm('⚠️ RESET ALL PROGRESS?\n\nThis will:\n- Remove all unlocked songs\n- Reset all quest progress\n- Reset all gate progress\n- Remove the secret ending\n\nThis cannot be undone!')) {
            this.unlockedSongs = [];
            this.completedGates = [];
            this.questProgress = {};
            this.questCompleted = {};
            this.finalMasqueradeSeen = false;
            this.saveProgress();
            this.buildPlaylist();
            this.renderCharacters();
            this.renderGates();
            this.updateUnlockIndicator();
            this.showSection(0);
            this.showFinalMasqueradeNotification();
            alert('Progress has been reset. Start your journey anew.');
        }
    }
    
    // Navigation
    setupNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => this.showSection(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '4') {
                this.showSection(parseInt(e.key) - 1);
            }
            if (e.key === 'ArrowRight') {
                this.showSection(Math.min(3, this.currentSection + 1));
            }
            if (e.key === 'ArrowLeft') {
                this.showSection(Math.max(0, this.currentSection - 1));
            }
        });
    }
    
    showSection(index) {
        this.currentSection = index;
        
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        // Show/hide sections
        document.querySelectorAll('.section').forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
        
        // Update indicator
        const sectionNames = ['🏰 Intro', '⛪ Cathedral', '👥 Characters', '🔮 16 Gates'];
        document.getElementById('section-indicator').textContent = sectionNames[index];
    }
    
    // Render Operations (Cathedral)
    renderOperations() {
        const grid = document.getElementById('operations-grid');
        grid.innerHTML = OPERATIONS.map(op => `
            <div class="operation-card">
                <span class="symbol">${op.symbol}</span>
                <h3>${op.name}</h3>
                <p>${op.description}</p>
                <div class="truth-table">
                    <strong>Truth Table:</strong><br>
                    F,F → ${op.truthTable[0] ? 'T' : 'F'}<br>
                    F,T → ${op.truthTable[1] ? 'T' : 'F'}<br>
                    T,F → ${op.truthTable[2] ? 'T' : 'F'}<br>
                    T,T → ${op.truthTable[3] ? 'T' : 'F'}
                </div>
            </div>
        `).join('');
    }
    
    // Render Characters
    renderCharacters() {
        const grid = document.getElementById('characters-grid');
        const secretColor = '#7f0003';
        
        let charactersHtml = CHARACTERS.map(char => {
            const status = this.getCharacterStatus(char.id);
            const imgPath = `assets/images/character encounters/${char.id}.png`;
            const charColor = this.getCharacterColor(char.id);
            const songDisplay = this.questCompleted[char.id] ? 
                `<div class="character-song-unlocked" style="border-color: ${charColor};">🎵 ${char.song}</div>` : '';
            const isCompleted = this.questCompleted[char.id];
            
            return `
                <div class="character-card" onclick="app.openQuest('${char.id}')">
                    <div class="character-image" style="border: 3px solid ${charColor}; border-radius: 8px; overflow: hidden;">
                        <img src="${imgPath}" alt="${char.name}" style="width: 100%; height: 200px; object-fit: cover; display: block;" onerror="this.style.display='none';">
                    </div>
                    <div class="character-info">
                        <h3 style="color: ${charColor};">${char.name}</h3>
                        <p class="character-role">${char.role}</p>
                        <p class="character-op">${char.symbol} ${char.operation}</p>
                        ${songDisplay}
                        <span class="status-badge ${status.class}">${status.text}</span>
                        <button class="quest-btn" onclick="event.stopPropagation(); app.${isCompleted ? 'replayQuest' : 'openQuest'}('${char.id}')">${status.btnText}</button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add secret ending card if all quests are completed
        if (this.areAllQuestsCompleted()) {
            const secretImage = `assets/images/character encounters/secret ending - ave mujica.png`;
            charactersHtml += `
                <div class="character-card secret-ending-card" onclick="app.openFinalMasquerade()">
                    <div class="character-image" style="border: 3px solid ${secretColor}; border-radius: 8px; overflow: hidden; position: relative;">
                        <img src="${secretImage}" alt="Secret Ending" style="width: 100%; height: 200px; object-fit: cover; display: block;" onerror="this.style.display='none';">
                        <div style="position: absolute; top: 10px; right: 10px; background: ${secretColor}; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">🔮 SECRET</div>
                    </div>
                    <div class="character-info">
                        <h3 style="color: ${secretColor};">The Final Masquerade</h3>
                        <p class="character-role">Secret Ending</p>
                        <p class="character-op">🌟 Truth Seeker</p>
                        <div class="character-song-unlocked" style="border-color: ${secretColor};">🎵 Memento Mori</div>
                        <span class="status-badge status-completed">✓ UNLOCKED</span>
                        <button class="quest-btn">View Ending</button>
                    </div>
                </div>
            `;
        }
        
        grid.innerHTML = charactersHtml;
    }
    
    getCharacterStatus(charId) {
        const progress = this.questProgress[charId] || 0;
        const completed = this.questCompleted[charId] || false;
        
        if (completed) {
            return { class: 'status-completed', text: '✓ COMPLETED', btnText: 'Replay Quest' };
        } else if (progress > 0) {
            return { class: 'status-in-progress', text: '⚜ IN PROGRESS', btnText: 'Continue Journey' };
        } else {
            return { class: 'status-available', text: '🔓 AVAILABLE', btnText: 'Begin Quest' };
        }
    }
    
    // Render Gates
    renderGates() {
        const grid = document.getElementById('gates-grid');
        const gateImageMap = {
            0: 'avemujica.png',      // NAND
            1: 'sophie.png',          // AND
            2: 'deepintoforest.png',  // NOR
            3: 'killkiss.png',        // XOR
            4: 'kuronobirthday.png', // OR
            5: 'crucifixX.png',       // Implication
            6: 'georgette.png',       // XNOR
            7: 'air.png',             // Negation
            8: 'octagramdance.png',   // Tautology
            9: 'XII.png',             // Contradiction
            10: 'fire.png',           // Converse Implication
            11: 'water.png',          // Material Nonimplication
            12: 'earth.png',          // Converse Nonimplication
            13: 'alterego.png',       // Projection P
            14: 'divine.png',        // Projection Q
            15: 'ether.png'          // Negation of Q
        };
        
        grid.innerHTML = OPERATIONS.map((op, index) => {
            const completed = this.completedGates.includes(index);
            const gateSong = GATE_SONGS[index];
            const imageFile = gateImageMap[index];
            
            return `
                <div class="gate-card ${completed ? 'completed' : ''}" onclick="app.openGate(${index})">
                    ${completed ? `<img src="assets/images/songs/${imageFile}" alt="${op.name}" class="gate-image" onerror="this.style.display='none'">` : ''}
                    <div class="gate-number">Gate ${index + 1}</div>
                    <div class="gate-symbol">${op.symbol}</div>
                    <div class="gate-name">${op.name}</div>
                </div>
            `;
        }).join('');
        
        this.updateGatesProgress();
    }
    
    updateGatesProgress() {
        const count = this.completedGates.length;
        const total = OPERATIONS.length;
        const percent = (count / total) * 100;
        
        document.getElementById('gates-progress').style.width = `${percent}%`;
        document.getElementById('gates-progress-text').textContent = `${count}/${total} Gates Completed`;
    }
    
    // Quest System
    openQuest(charId) {
        this.currentQuest = charId;
        this.currentStage = this.questProgress[charId] || 0;
        this.quizAttempts = 0; // Reset attempts for new quest
        
        const char = CHARACTERS.find(c => c.id === charId);
        const questData = QUEST_DIALOGUES[charId];
        
        if (this.currentStage >= questData.stages.length) {
            this.showQuestFinale(char, questData);
        } else {
            this.showQuestStage(char, questData);
        }
        
        document.getElementById('quest-modal').classList.add('active');
    }
    
    replayQuest(charId) {
        if (!confirm('🔄 Replay this quest from the beginning?\n\nNote: You will need to complete all stages again to unlock the song.')) {
            return;
        }
        
        this.currentQuest = charId;
        this.currentStage = 0;
        this.questProgress[charId] = 0;
        this.quizAttempts = 0;
        
        const char = CHARACTERS.find(c => c.id === charId);
        const questData = QUEST_DIALOGUES[charId];
        
        this.buildPlaylist();
        this.renderCharacters();
        this.updateUnlockIndicator();
        this.showQuestStage(char, questData);
        
        document.getElementById('quest-modal').classList.add('active');
    }
    
    showQuestStage(char, questData) {
        const stage = questData.stages[this.currentStage];
        const content = document.getElementById('quest-content');
        const imgPath = `assets/images/character encounters/${char.id}.png`;
        const charColor = this.getCharacterColor(char.id);
        
        const totalStages = questData.stages.length;
        const currentStageNum = this.currentStage + 1;
        
        let stageIndicators = '';
        for (let i = 0; i < totalStages; i++) {
            let statusClass = 'stage-pending';
            let statusText = '';
            
            if (i < currentStageNum - 1) {
                statusClass = 'stage-complete';
                statusText = '✓';
            } else if (i === currentStageNum - 1) {
                statusClass = 'stage-current';
                statusText = i + 1;
            } else {
                statusText = i + 1;
            }
            
            stageIndicators += `<div class="stage-indicator ${statusClass}">${statusText}</div>`;
        }
        
        const truthTableGuide = this.getTruthTableGuide(char.operation);
        
        content.innerHTML = `
            <div class="quest-header">
                <img src="${imgPath}" alt="${char.name}" style="width: 150px; height: 200px; object-fit: cover; border: 3px solid ${charColor}; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 0 20px ${charColor}50;" onerror="this.style.display='none';">
                <h2 style="color: ${charColor};">${char.name}</h2>
                <p>${char.symbol} ${char.operation}</p>
                <p class="section-desc">${char.role}</p>
                <div class="quest-progress-bar">
                    ${stageIndicators}
                </div>
            </div>
            
            <div class="quest-stage">
                <h3 style="color: ${charColor}; margin-bottom: 15px;">${stage.title}</h3>
                <div class="quest-dialogue">${stage.dialogue.replace(/\n/g, '<br>')}</div>
                ${truthTableGuide}
                <p class="quest-challenge">⚔️ ${stage.challenge}</p>
                
                ${this.renderCharacterTruthTable(char.id, this.currentStage)}
            </div>
        `;
        
        this.setupTruthTableQuiz('quest');
    }
    
    renderCharacterTruthTable(charId, stageIndex) {
        const difficulty = stageIndex === 0 ? 'easy' : (stageIndex === 1 ? 'difficult' : 'hard');
        const tableData = CHARACTER_TRUTH_TABLES[charId]?.[difficulty];
        
        if (!tableData) {
            return this.renderTruthTableQuiz(QUEST_DIALOGUES[charId].stages[stageIndex].challenge);
        }
        
        const difficultyColors = {
            easy: { bg: 'rgba(45, 90, 39, 0.3)', label: '🌱 Easy' },
            difficult: { bg: 'rgba(155, 162, 200, 0.3)', label: '🔥 Difficult' },
            hard: { bg: 'rgba(139, 0, 0, 0.3)', label: '💀 Hard' }
        };
        
        const difficultyStyle = difficultyColors[difficulty];
        
        let html = `
            <div class="character-truth-table" style="background: ${difficultyStyle.bg}; border: 2px solid var(--dark-purple); border-radius: 8px; padding: 15px; margin: 15px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: var(--gold); margin: 0;">${difficultyStyle.label} Challenge</h4>
                </div>
                <table class="truth-table-quiz char-truth-table">
                    <thead>
                        <tr>
                            ${tableData.columns.map(col => `<th>${col}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        tableData.rows.forEach((row, index) => {
            const isTwoColumn = tableData.columns.length === 2;
            html += `
                <tr>
                    ${row.values.map((val, i) => {
                        const isResult = i === row.values.length - 1;
                        const correctVal = val === 'T';
                        const displayVal = isResult ? '-' : val;
                        return `<td class="truth-cell" data-index="${index}" data-col="${i}" data-correct="${correctVal}" data-result="${isResult}" onclick="app.toggleTruth(this)">${displayVal}</td>`;
                    }).join('')}
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
                <p class="truth-table-desc">${tableData.explanation}</p>
                <div id="quiz-feedback"></div>
                <button class="submit-btn" onclick="app.submitQuiz('quest')">Submit Answer</button>
            </div>
        `;
        
        return html;
    }
    
    getTruthTableGuide(operation) {
        const guides = {
            'Implication': `
                <div class="truth-table-guide">
                    <h4 style="color: var(--gold); margin: 15px 0 10px;">📖 Implication (P → Q) Guide</h4>
                    <table class="truth-guide-table">
                        <tr><th>P</th><th>Q</th><th>P → Q</th></tr>
                        <tr><td>F</td><td>F</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>F</td><td>T</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>T</td><td>F</td><td><span style="color: var(--error-red);">F</span></td></tr>
                        <tr><td>T</td><td>T</td><td><span style="color: var(--success-green);">T</span></td></tr>
                    </table>
                    <p style="font-size: 12px; color: var(--periwinkle); margin-top: 5px;">💡 False implies anything. Only F→F is false.</p>
                </div>
            `,
            'XOR': `
                <div class="truth-table-guide">
                    <h4 style="color: var(--gold); margin: 15px 0 10px;">📖 XOR (P ⊕ Q) Guide</h4>
                    <table class="truth-guide-table">
                        <tr><th>P</th><th>Q</th><th>P ⊕ Q</th></tr>
                        <tr><td>F</td><td>F</td><td><span style="color: var(--error-red);">F</span></td></tr>
                        <tr><td>F</td><td>T</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>T</td><td>F</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>T</td><td>T</td><td><span style="color: var(--error-red);">F</span></td></tr>
                    </table>
                    <p style="font-size: 12px; color: var(--periwinkle); margin-top: 5px;">💡 True when exactly ONE is true. Same = False.</p>
                </div>
            `,
            'Negation': `
                <div class="truth-table-guide">
                    <h4 style="color: var(--gold); margin: 15px 0 10px;">📖 Negation (¬P) Guide</h4>
                    <table class="truth-guide-table">
                        <tr><th>P</th><th>¬P</th></tr>
                        <tr><td>F</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>T</td><td><span style="color: var(--error-red);">F</span></td></tr>
                    </table>
                    <p style="font-size: 12px; color: var(--periwinkle); margin-top: 5px;">💡 Simply flip the value. NOT true = false, NOT false = true.</p>
                </div>
            `,
            'NOR': `
                <div class="truth-table-guide">
                    <h4 style="color: var(--gold); margin: 15px 0 10px;">📖 NOR (P ↓ Q) Guide</h4>
                    <table class="truth-guide-table">
                        <tr><th>P</th><th>Q</th><th>P ↓ Q</th></tr>
                        <tr><td>F</td><td>F</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>F</td><td>T</td><td><span style="color: var(--error-red);">F</span></td></tr>
                        <tr><td>T</td><td>F</td><td><span style="color: var(--error-red);">F</span></td></tr>
                        <tr><td>T</td><td>T</td><td><span style="color: var(--error-red);">F</span></td></tr>
                    </table>
                    <p style="font-size: 12px; color: var(--periwinkle); margin-top: 5px;">💡 True ONLY when both are false. (NOT OR)</p>
                </div>
            `,
            'NAND': `
                <div class="truth-table-guide">
                    <h4 style="color: var(--gold); margin: 15px 0 10px;">📖 NAND (P ↑ Q) Guide</h4>
                    <table class="truth-guide-table">
                        <tr><th>P</th><th>Q</th><th>P ↑ Q</th></tr>
                        <tr><td>F</td><td>F</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>F</td><td>T</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>T</td><td>F</td><td><span style="color: var(--success-green);">T</span></td></tr>
                        <tr><td>T</td><td>T</td><td><span style="color: var(--error-red);">F</span></td></tr>
                    </table>
                    <p style="font-size: 12px; color: var(--periwinkle); margin-top: 5px;">💡 False ONLY when both are true. (NOT AND)</p>
                </div>
            `
        };
        
        return guides[operation] || '';
    }
    
    showQuestFinale(char, questData) {
        const finale = questData.finale;
        const content = document.getElementById('quest-content');
        const imgPath = `assets/images/character encounters/${char.id}.png`;
        const charColor = this.getCharacterColor(char.id);
        
        content.innerHTML = `
            <div class="quest-header">
                <img src="${imgPath}" alt="${char.name}" style="width: 150px; height: 200px; object-fit: cover; border: 3px solid ${charColor}; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 0 20px ${charColor}50;" onerror="this.style.display='none';">
                <h2 style="color: ${charColor};">✨ ${char.name}'s Truth ✨</h2>
            </div>
            
            <div class="finale-section">
                <div class="quest-dialogue centered-dialogue">${finale.dialogue.replace(/\n/g, '<br>')}</div>
                <div class="songs-list centered-song" style="border-color: ${charColor};">
                    🎵 ${char.song}
                </div>
                <div style="margin-top: 15px; padding: 12px; border-top: 2px solid ${charColor}; border-bottom: 2px solid ${charColor};">
                    <p style="color: var(--gold); margin-bottom: 8px;">🎵 "${char.song}" by Ave Mujica © Bushiroad</p>
                    <p style="color: var(--cream); font-size: 14px; margin-bottom: 10px;">Support the official release:</p>
                    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                        <a href="${char.youtube}" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">▶ YouTube</a>
                        <a href="${char.spotify}" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">🎧 Spotify</a>
                        <a href="https://avemujica.bang-dream.com" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">🌐 avemujica.bang-dream.com</a>
                    </div>
                </div>
            </div>
            
            <button class="submit-btn" onclick="app.closeModal('quest')">Return to Grimoire</button>
        `;
    }
    
    getCharacterColor(charId) {
        const colors = {
            sakiko: '#a4c5d4',
            uika: '#fcf1da',
            mutsumi: '#b9c2b4',
            umiri: '#8f8f8c',
            nyamu: '#b1a2bf'
        };
        return colors[charId] || '#C4A962';
    }
    
    renderTruthTableQuiz(challenge) {
        // Determine operation from challenge
        let op;
        if (challenge.includes('Implication')) op = OPERATIONS.find(o => o.name === 'Implication');
        else if (challenge.includes('XOR')) op = OPERATIONS.find(o => o.name === 'XOR');
        else if (challenge.includes('Negation')) op = OPERATIONS.find(o => o.name === 'Negation');
        else if (challenge.includes('NOR')) op = OPERATIONS.find(o => o.name === 'NOR');
        else if (challenge.includes('NAND')) op = OPERATIONS.find(o => o.name === 'NAND');
        else if (challenge.includes('AND')) op = OPERATIONS.find(o => o.name === 'AND');
        else if (challenge.includes('OR')) op = OPERATIONS.find(o => o.name === 'OR');
        else op = OPERATIONS.find(o => o.name === challenge.split(' ')[0]);
        
        if (!op) op = OPERATIONS[0];
        
        const rows = [
            { p: 'F', q: 'F' },
            { p: 'F', q: 'T' },
            { p: 'T', q: 'F' },
            { p: 'T', q: 'T' }
        ];
        
        return `
            <table class="truth-table-quiz">
                <thead>
                    <tr>
                        <th>P</th>
                        <th>Q</th>
                        <th>${op.symbol} ${op.name}</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map((row, i) => `
                        <tr>
                            <td>${row.p}</td>
                            <td>${row.q}</td>
                            <td class="truth-cell" data-index="${i}" data-correct="${op.truthTable[i]}" onclick="app.toggleTruth(this)">-</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div id="quiz-feedback"></div>
            <button class="submit-btn" id="quiz-submit" onclick="app.submitQuiz('quest')">Submit Answer</button>
        `;
    }
    
    toggleTruth(cell) {
        // Cycle through: empty -> T -> F -> empty
        if (cell.classList.contains('selected-true')) {
            cell.classList.remove('selected-true');
            cell.classList.add('selected-false');
            cell.textContent = 'F';
        } else if (cell.classList.contains('selected-false')) {
            cell.classList.remove('selected-false');
            cell.textContent = '-';
        } else {
            cell.classList.add('selected-true');
            cell.textContent = 'T';
        }
    }
    
    submitQuiz(type) {
        let cells;
        
        if (type === 'quest') {
            cells = document.querySelectorAll('.truth-cell[data-result="true"]');
        } else {
            cells = document.querySelectorAll('.truth-cell');
        }
        
        let allCorrect = true;
        
        cells.forEach(cell => {
            const correct = cell.dataset.correct === 'true';
            const selected = cell.classList.contains('selected-true');
            
            if (correct !== selected) {
                allCorrect = false;
                cell.style.borderColor = 'var(--error-red)';
            } else {
                cell.style.borderColor = 'var(--success-green)';
            }
        });
        
        const feedback = document.getElementById('quiz-feedback');
        
        if (allCorrect) {
            this.quizAttempts = 0; // Reset attempts on success
            if (type === 'quest') {
                this.completeQuestStage();
            } else {
                this.completeGate();
                const gateSong = GATE_SONGS.find(g => g.index === this.currentGateIndex);
                if (gateSong) {
                    feedback.innerHTML = `
                        <div class="feedback correct">✓ VERITAS! Gate ${this.currentGateIndex + 1} Unlocked!</div>
                        <div class="centered-song">🎵 ${gateSong.song}</div>
                        <div class="gate-unlock-meaning">"${gateSong.meaning}"</div>
                        <div class="gate-unlock-lyric">${gateSong.lyric}</div>
                    `;
                }
            }
        } else {
            // Initialize or increment attempts for quests
            if (type === 'quest') {
                this.quizAttempts = (this.quizAttempts || 0) + 1;
                const attemptsLeft = 4 - this.quizAttempts;
                
                if (this.quizAttempts >= 4) {
                    feedback.innerHTML = `
                        <div class="feedback wrong">✗ Out of attempts! Try again later.</div>
                        <button class="submit-btn" onclick="app.resetQuizCells()">Reset Answers</button>
                    `;
                } else {
                    feedback.innerHTML = `
                        <div class="feedback wrong">✗ Incorrect. Attempts: ${this.quizAttempts}/4</div>
                        <button class="submit-btn" onclick="app.resetQuizCells()">Try Again</button>
                    `;
                }
            } else {
                feedback.innerHTML = `
                    <div class="feedback wrong">✗ Incorrect. Try again.</div>
                    <button class="submit-btn" onclick="app.resetQuizCells()">Reset Answers</button>
                `;
            }
        }
    }
    
    resetQuizCells() {
        this.quizAttempts = 0;
        const cells = document.querySelectorAll('.truth-cell');
        cells.forEach(cell => {
            cell.classList.remove('selected-true', 'selected-false');
            cell.textContent = '-';
            cell.style.borderColor = '';
        });
        document.getElementById('quiz-feedback').innerHTML = '';
    }
    
    completeQuestStage() {
        const charId = this.currentQuest;
        const questData = QUEST_DIALOGUES[charId];
        
        this.currentStage++;
        this.questProgress[charId] = this.currentStage;
        
        if (this.currentStage >= questData.stages.length) {
            // Quest complete
            this.questCompleted[charId] = true;
            
            // Add character song to unlocked songs
            const charSong = CHARACTER_SONG_MAP[charId];
            if (charSong && !this.unlockedSongs.includes(charSong.song)) {
                this.unlockedSongs.push(charSong.song);
            }
            
            // Rebuild playlist with new song
            this.buildPlaylist();
            
            this.saveProgress();
            this.renderCharacters();
            this.updateUnlockIndicator();
            
            // Play the newly unlocked song immediately
            this.playUnlockedSong(charSong.song);
            
            // Show finale after delay
            setTimeout(() => {
                const char = CHARACTERS.find(c => c.id === charId);
                this.showQuestFinale(char, questData);
                
                // Check if all quests completed - show final masquerade notification
                setTimeout(() => {
                    this.checkAndShowFinalMasquerade();
                }, 2000);
            }, 1500);
        } else {
            this.saveProgress();
            
            // Show next stage after delay
            setTimeout(() => {
                const char = CHARACTERS.find(c => c.id === charId);
                this.showQuestStage(char, questData);
            }, 1500);
        }
    }
    
    // Gate Quiz
    openGate(index) {
        this.currentGateIndex = index;
        const op = OPERATIONS[index];
        const gateSong = GATE_SONGS[index];
        const isCompleted = this.completedGates.includes(index);
        const content = document.getElementById('gate-content');
        
        if (isCompleted && gateSong) {
            const imageFileName = gateSong.file.replace('.mp3', '.png').replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase();
            const gateImageMap = {
                0: 'avemujica.png', 1: 'sophie.png', 2: 'deepintoforest.png', 3: 'killkiss.png',
                4: 'kuronobirthday.png', 5: 'crucifixX.png', 6: 'georgette.png', 7: 'air.png',
                8: 'octagramdance.png', 9: 'XII.png', 10: 'fire.png', 11: 'water.png',
                12: 'earth.png', 13: 'alterego.png', 14: 'divine.png', 15: 'ether.png'
            };
            const imgSrc = `assets/images/songs/${gateImageMap[index]}`;
            
            content.innerHTML = `
                <div class="quest-header">
                    <h2>✓ Gate ${index + 1} - Unlocked</h2>
                    <p>${op.symbol} ${op.name}</p>
                    <p class="section-desc">${op.description}</p>
                </div>
                
                <div class="gate-details" style="text-align: center; padding: 20px;">
                    <div class="gate-detail-section" style="margin: 15px 0; padding: 15px; background: var(--shadow); border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 10px;">🎵 Song</h4>
                        <p style="font-size: 18px; color: var(--cream);">${gateSong.song}</p>
                    </div>
                    
                    <div class="gate-detail-section" style="margin: 15px 0; padding: 15px; background: var(--shadow); border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 10px;">⚙️ Operation</h4>
                        <p style="font-size: 16px; color: var(--periwinkle);">${gateSong.operation}</p>
                    </div>
                    
                    <div class="gate-detail-section" style="margin: 15px 0; padding: 15px; background: var(--shadow); border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 10px;">📜 Meaning</h4>
                        <p style="font-size: 14px; color: var(--cream); font-style: italic;">"${gateSong.meaning}"</p>
                    </div>
                    
                    <div class="gate-detail-section" style="margin: 15px 0; padding: 15px; background: var(--shadow); border-radius: 8px;">
                        <h4 style="color: var(--gold); margin-bottom: 10px;">🎤 Lyric</h4>
                        <p style="font-size: 13px; color: var(--periwinkle);">${gateSong.lyric}</p>
                    </div>
                    
                    <div style="background: ${gateSong.color}; padding: 20px; border-radius: 10px; margin: 20px auto; display: inline-block;">
                        <img src="${imgSrc}" 
                             alt="${gateSong.song}" 
                             style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px; border: 3px solid var(--gold);"
                             onerror="this.parentElement.innerHTML='<div style=width:200px;height:200px;display:flex;align-items:center;justify-content:center;color:var(--cream);font-size:48px;>🎵</div>'">
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; border-top: 2px solid var(--gold); border-bottom: 2px solid var(--gold);">
                        <p style="color: var(--gold); margin-bottom: 8px;">🎵 "${gateSong.song}" by Ave Mujica © Bushiroad</p>
                        <p style="color: var(--cream); font-size: 14px; margin-bottom: 10px;">Support the official release:</p>
                        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                            <a href="${gateSong.youtube}" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">▶ YouTube</a>
                            <a href="${gateSong.spotify}" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">🎧 Spotify</a>
                            <a href="https://avemujica.bang-dream.com" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">🌐 avemujica.bang-dream.com</a>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="submit-btn" onclick="app.closeModal('gate')">Close</button>
                </div>
            `;
        } else {
            content.innerHTML = `
                <div class="quest-header">
                    <h2>🔮 Gate ${index + 1}</h2>
                    <p>${op.symbol} ${op.name}</p>
                    <p class="section-desc">${op.description}</p>
                </div>
                
                <div class="quest-stage">
                    <p class="quest-challenge">Fill in the truth table:</p>
                    
                    <table class="truth-table-quiz">
                        <thead>
                            <tr>
                                <th>P</th>
                                <th>Q</th>
                                <th>${op.symbol}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${[
                                { p: 'F', q: 'F' },
                                { p: 'F', q: 'T' },
                                { p: 'T', q: 'F' },
                                { p: 'T', q: 'T' }
                            ].map((row, i) => `
                                <tr>
                                    <td>${row.p}</td>
                                    <td>${row.q}</td>
                                    <td class="truth-cell" data-index="${i}" data-correct="${op.truthTable[i]}" onclick="app.toggleTruth(this)">-</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div id="quiz-feedback"></div>
                    <button class="submit-btn" onclick="app.submitQuiz('gate')">Unlock Gate</button>
                </div>
            `;
        }
        
        document.getElementById('gate-modal').classList.add('active');
    }
    
    completeGate() {
        // Get the gate index from the current quest context
        // We need to track which gate is being completed
        const gateIndex = this.currentGateIndex;
        
        if (gateIndex !== undefined && !this.completedGates.includes(gateIndex)) {
            this.completedGates.push(gateIndex);
            
            // Add gate song to unlocked songs
            const gateSong = GATE_SONGS.find(g => g.index === gateIndex);
            if (gateSong && !this.unlockedSongs.includes(gateSong.song)) {
                this.unlockedSongs.push(gateSong.song);
            }
            
            // Rebuild playlist with new song
            this.buildPlaylist();
            
            // Play the newly unlocked song immediately
            if (gateSong) {
                this.playUnlockedSong(`${gateSong.name}: ${gateSong.song}`);
            }
        }
        
        this.saveProgress();
        this.renderGates();
        this.updateUnlockIndicator();
        
        setTimeout(() => {
            this.closeModal('gate');
        }, 1500);
    }
    
    // Music Player
    setupMusicPlayer() {
        const playBtn = document.getElementById('play-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const volumeSlider = document.getElementById('volume-slider');
        
        playBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.playPrevious());
        nextBtn.addEventListener('click', () => this.playNext());
        
        volumeSlider.addEventListener('input', (e) => {
            this.volume = e.target.value / 100;
            this.audio.volume = this.volume;
        });
        
        // Build playlist from unlocked songs
        this.buildPlaylist();
        
        // Load main webpage music as default
        this.tryPlayMainMusic();
    }
    
    buildPlaylist() {
        const mainMusicPath = 'assets/music/main webpage/';
        const charFolder = 'assets/music/character quests songs/';
        const gateFolder = 'assets/music/16 gates unlocked songs/';
        
        const previousTrackName = this.playlist[this.currentTrack]?.name;
        
        this.playlist = [];
        
        // 0: Always add main webpage music as default
        this.playlist.push({
            path: mainMusicPath,
            file: '[Lofi] KiLLKiSS – Ave Mujica _ Lofi Arrangement  Chill Remix 🌙🎧.mp3',
            name: 'Ave Mujica - Lofi Theme'
        });
        
        // Add completed character quest songs
        for (const [charId, songInfo] of Object.entries(CHARACTER_SONG_MAP)) {
            if (this.questCompleted[charId]) {
                this.playlist.push({
                    path: charFolder,
                    file: songInfo.file,
                    name: songInfo.song
                });
            }
        }
        
        // Add completed gate songs
        for (const gateIndex of this.completedGates) {
            const gateSong = GATE_SONGS.find(g => g.index === gateIndex);
            if (gateSong) {
                this.playlist.push({
                    path: gateFolder,
                    file: gateSong.file,
                    name: `${gateSong.name}: ${gateSong.song}`
                });
            }
        }
        
        // Add secret ending if all quests completed
        if (this.areAllQuestsCompleted()) {
            this.playlist.push({
                path: 'assets/music/character quests songs/secret ending/',
                file: 'Kamisama Baka.mp3',
                name: '🌟 Memento Mori - Secret Ending'
            });
        }
        
        // Try to find the previously playing track in the new playlist
        if (previousTrackName) {
            const trackIndex = this.playlist.findIndex(t => t.name === previousTrackName);
            if (trackIndex !== -1) {
                this.currentTrack = trackIndex;
            } else {
                this.currentTrack = 0;
            }
        } else {
            this.currentTrack = 0;
        }
    }
    
    areAllQuestsCompleted() {
        const allChars = ['sakiko', 'uika', 'mutsumi', 'umiri', 'nyamu'];
        return allChars.every(charId => this.questCompleted[charId]);
    }
    
    checkAndShowFinalMasquerade() {
        if (this.areAllQuestsCompleted() && !this.finalMasqueradeSeen) {
            this.showFinalMasqueradeNotification();
        }
    }
    
    showFinalMasqueradeNotification() {
        if (this.areAllQuestsCompleted() && !this.finalMasqueradeSeen) {
            const content = SECRET_ENDING_CONTENT.notification;
            const modal = document.getElementById('final-masquerade-modal');
            document.getElementById('fm-title').innerHTML = content.title;
            document.getElementById('fm-content').innerHTML = `
                <p style="text-align: center; line-height: 1.8;">${content.message}</p>
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 25px;">
                    <button class="submit-btn" onclick="app.openFinalMasquerade()" style="background: var(--success-green);">Yes, Experience It</button>
                    <button class="submit-btn" onclick="app.dismissFinalMasquerade()" style="background: var(--periwinkle);">Later</button>
                </div>
            `;
            modal.classList.add('active');
        }
    }
    
    dismissFinalMasquerade() {
        document.getElementById('final-masquerade-modal').classList.remove('active');
    }
    
    openFinalMasquerade() {
        this.dismissFinalMasquerade();
        this.finalMasqueradeSeen = true;
        this.saveProgress();
        
        const content = SECRET_ENDING_CONTENT.finale;
        const allSongs = this.getAllUnlockedSongsList();
        
        const hasSecretEnding = this.completedGates.length === 16;
        const displayContent = hasSecretEnding ? content.secretAchievement : content;
        const secretColor = '#7f0003';
        
        const secretEndingImage = hasSecretEnding ? 
            `<img src="assets/images/character encounters/secret ending - ave mujica.png" alt="Ave Mujica" class="secret-ending-image" style="border-color: ${secretColor};">` : '';
        
        document.getElementById('fm-title').innerHTML = displayContent.title || content.title;
        document.getElementById('fm-content').innerHTML = `
            <div class="final-masquerade-content">
                ${secretEndingImage}
                <div class="scene-text">${displayContent.scene || content.scene}</div>
                
                <div class="character-dialogues" style="border-color: ${secretColor};">
                    <p><strong>Sakiko:</strong> ${displayContent.dialogues?.sakiko || content.dialogues.sakiko}</p>
                    <p><strong>Uika:</strong> ${displayContent.dialogues?.uika || content.dialogues.uika}</p>
                    <p><strong>Mutsumi:</strong> ${displayContent.dialogues?.mutsumi || content.dialogues.mutsumi}</p>
                    <p><strong>Umiri:</strong> ${displayContent.dialogues?.umiri || content.dialogues.umiri}</p>
                    <p><strong>Nyamu:</strong> ${displayContent.dialogues?.nyamu || content.dialogues.nyamu}</p>
                </div>
                
                ${displayContent.finalSong ? `<div class="scene-text">${displayContent.finalSong}</div>` : ''}
                
                <div class="all-together">${content.allTogether.replace(/\n/g, '<br>')}</div>
                
                ${allSongs ? `<div class="songs-list-container">
                    <h4 style="color: var(--gold); margin: 15px 0;">🎵 All Unlocked Songs (${this.playlist.length - 1})</h4>
                    <div class="final-songs-list">${allSongs}</div>
                </div>` : ''}
                
                <div class="final-message">${displayContent.finalQuote || displayContent.finalMessage || content.finalMessage}</div>
                
                ${displayContent.achievement ? `
                <div class="achievement-unlock">
                    <div style="font-size: 2em; margin: 15px 0;">✨✨✨ SECRET ACHIEVEMENT UNLOCKED ✨✨✨</div>
                    <div class="achievement-name">"${displayContent.achievement.name}"</div>
                    <div class="achievement-desc">${displayContent.achievement.description}</div>
                </div>
                <div class="epilogue">${displayContent.epilogue || content.epilogue || displayContent.finalSong ? content.finalSong : ''}</div>
                ` : ''}
                
                ${displayContent.youtube && displayContent.spotify ? `
                <div style="margin-top: 20px; padding: 15px; border-top: 2px solid ${secretColor}; border-bottom: 2px solid ${secretColor};">
                    <p style="color: var(--gold); margin-bottom: 8px;">🎵 "Memento Mori" by Ave Mujica © Bushiroad</p>
                    <p style="color: var(--cream); font-size: 14px; margin-bottom: 10px;">Support the official release:</p>
                    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                        <a href="${displayContent.youtube}" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">▶ YouTube</a>
                        <a href="${displayContent.spotify}" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">🎧 Spotify</a>
                        <a href="https://avemujica.bang-dream.com" target="_blank" rel="noopener noreferrer" style="color: var(--periwinkle); text-decoration: none; font-size: 16px;">🌐 avemujica.bang-dream.com</a>
                    </div>
                </div>
                ` : ''}
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="submit-btn" onclick="app.closeFinalMasquerade()">Return to the Grimoire</button>
            </div>
        `;
        document.getElementById('final-masquerade-modal').classList.add('active');
    }
    
    getAllUnlockedSongsList() {
        let songsHtml = '';
        
        // Character songs
        for (const [charId, songInfo] of Object.entries(CHARACTER_SONG_MAP)) {
            if (this.questCompleted[charId]) {
                songsHtml += `<div class="song-item">🎵 ${songInfo.song}</div>`;
            }
        }
        
        // Gate songs
        for (const gateIndex of this.completedGates) {
            const gateSong = GATE_SONGS.find(g => g.index === gateIndex);
            if (gateSong) {
                songsHtml += `<div class="song-item">🔮 ${gateSong.name}: ${gateSong.song}</div>`;
            }
        }
        
        // Secret ending
        if (this.areAllQuestsCompleted()) {
            songsHtml += `<div class="song-item secret">🌟 Memento Mori - Secret Ending</div>`;
        }
        
        return songsHtml;
    }
    
    closeFinalMasquerade() {
        document.getElementById('final-masquerade-modal').classList.remove('active');
    }
    
    tryPlayMainMusic() {
        const mainMusicPath = 'assets/music/main webpage/';
        const mainMusicFile = '[Lofi] KiLLKiSS – Ave Mujica _ Lofi Arrangement  Chill Remix 🌙🎧.mp3';
        const musicPath = mainMusicPath + mainMusicFile;
        
        const self = this;
        this.onMetadataLoaded = function() {
            document.getElementById('track-name').textContent = 'Ave Mujica - Lofi Theme';
            document.getElementById('track-status').textContent = 'Ready';
            self.audio.play().then(() => {
                self.isPlaying = true;
                document.getElementById('play-btn').textContent = '⏸';
                document.getElementById('track-status').textContent = 'Playing';
            }).catch(() => {
                document.getElementById('track-status').textContent = 'Click ▶ to play';
            });
        };
        
        this.audio.addEventListener('loadedmetadata', this.onMetadataLoaded);
        
        this.audio.addEventListener('error', () => {
            console.log('Main music file not found, using demo mode');
            document.getElementById('track-name').textContent = 'No Music File';
            document.getElementById('track-status').textContent = 'Demo Mode';
        });
        
        this.audio.src = musicPath;
        this.audio.volume = this.volume;
        this.audio.loop = true;
    }
    
    togglePlay() {
        if (!this.audio.src) {
            alert('No music loaded. Add music files to assets/music/main webpage/');
            return;
        }
        
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            document.getElementById('play-btn').textContent = '▶';
            document.getElementById('track-status').textContent = 'Paused';
        } else {
            this.audio.play().catch(e => {
                console.log('Could not play:', e);
                this.updateTrackDisplay('Click to play', 'Ready');
            });
            this.isPlaying = true;
            document.getElementById('play-btn').textContent = '⏸';
            document.getElementById('track-status').textContent = 'Playing';
        }
    }
    
    playNext() {
        if (!this.playlist || this.playlist.length <= 1) {
            alert('Complete more quests to unlock more songs!');
            return;
        }
        
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.playCurrentTrack();
    }
    
    playPrevious() {
        if (!this.playlist || this.playlist.length <= 1) return;
        
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.playCurrentTrack();
    }
    
    playCurrentTrack() {
        const track = this.playlist[this.currentTrack];
        
        this.audio.removeEventListener('loadedmetadata', this.onMetadataLoaded);
        
        this.audio.src = track.path + track.file;
        this.audio.loop = (this.currentTrack === 0);
        
        const displayName = track.name.length > 35 ? track.name.substring(0, 35) + '...' : track.name;
        document.getElementById('track-name').textContent = displayName;
        document.getElementById('track-status').textContent = 'Playing';
        this.isPlaying = true;
        document.getElementById('play-btn').textContent = '⏸';
        
        this.audio.play().catch(() => {});
    }
    
    updateTrackDisplay(name, status) {
        const displayName = name.length > 35 ? name.substring(0, 35) + '...' : name;
        document.getElementById('track-name').textContent = displayName;
        document.getElementById('track-status').textContent = status;
    }
    
    updateUnlockIndicator() {
        const indicator = document.getElementById('unlock-indicator');
        const total = this.unlockedSongs.length;
        
        if (total > 0) {
            indicator.textContent = `🔓 ${total}`;
            indicator.style.color = 'var(--success-green)';
        } else {
            indicator.textContent = '🔒 0';
            indicator.style.color = 'var(--periwinkle)';
        }
        
        this.updateMusicPlayerDisplay();
    }
    
    updateMusicPlayerDisplay() {
        const trackName = document.getElementById('track-name');
        const trackStatus = document.getElementById('track-status');
        
        if (this.playlist.length > 0) {
            // Ensure currentTrack is within bounds
            if (this.currentTrack >= this.playlist.length) {
                this.currentTrack = 0;
            }
            
            const currentTrack = this.playlist[this.currentTrack];
            if (currentTrack) {
                const displayName = currentTrack.name.length > 35 ? currentTrack.name.substring(0, 35) + '...' : currentTrack.name;
                trackName.textContent = displayName;
            }
        }
        
        const playlistInfo = `🔓 ${this.playlist.length} songs`;
        trackStatus.textContent = playlistInfo;
    }
    
    playUnlockedSong(songName) {
        const songIndex = this.playlist.findIndex(track => track.name === songName);
        if (songIndex !== -1) {
            this.currentTrack = songIndex;
            this.playCurrentTrack();
        }
    }
    
    // Modals
    setupModals() {
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
            });
        });
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }
    
    closeModal(type) {
        document.getElementById(`${type}-modal`).classList.remove('active');
        this.renderCharacters();
    }
    
    setupTruthTableQuiz(type) {
        // Already handled in render methods
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new LogicGrimoire();
});
