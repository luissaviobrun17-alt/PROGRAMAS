// FREE WORLD â€” English Mastery Course â€” Main Application
// Anti Gravity System L99

const FreeWorld = (function() {
    // ====== STATE ======
    let state = {
        currentScreen: 'welcome',
        level: 'A1',
        moduleIndex: 0,
        lessonIndex: 0,
        currentStep: 0,
        steps: ['intro','vocabulary','grammar','dialogue','pronunciation','flashcards','roleplay','listening','cultural','exercises','summary'],
        placementIndex: 0,
        placementAnswers: [],
        settings: { voiceSpeed: 0.8, typewriter: true, showTranslation: true, sounds: true },
        progress: { completedLessons: [], wordsLearned: [], scores: {}, streak: 0, lastDate: null, totalTime: 0, achievements: [], startTime: null },
        typingTimer: null,
        isRecording: false,
        sidebarOpen: true,
        selectedInstructor: 'vinicius',
        studentName: ''
    };

    // ====== INIT ======
    function init() {
        loadProgress();
        checkStreak();
        if (state.progress.completedLessons.length > 0) {
            const btn = document.getElementById('btn-continue');
            if (btn) btn.style.display = 'inline-flex';
        }
        state.progress.startTime = Date.now();
        setupKeyboard();
        // Restore instructor selection
        const savedInstructor = localStorage.getItem('freeworld_instructor');
        if (savedInstructor) { state.selectedInstructor = savedInstructor; }
        selectInstructor(state.selectedInstructor);
        // Restore student name
        const savedName = localStorage.getItem('freeworld_student_name');
        if (savedName) {
            state.studentName = savedName;
            const nameInput = document.getElementById('student-name-input');
            if (nameInput) nameInput.value = savedName;
        }
        console.log('ðŸŒ FREE WORLD initialized â€” Anti Gravity System L99');
    }

    function setStudentName(name) {
        state.studentName = name;
        localStorage.setItem('freeworld_student_name', name);
    }

    function selectInstructor(name) {
        state.selectedInstructor = name;
        localStorage.setItem('freeworld_instructor', name);
        // Update UI cards
        document.querySelectorAll('.instructor-card.selectable').forEach(c => c.classList.remove('selected'));
        const card = document.getElementById('card-' + name);
        if (card) card.classList.add('selected');
    }

    function setupKeyboard() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeAllModals();
                if (state.currentScreen === 'placement' || state.currentScreen === 'placement-result') showWelcome();
            }
        });
    }

    // ====== SCREENS ======
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const el = document.getElementById(id + '-screen');
        if (el) { el.classList.add('active'); state.currentScreen = id; }
        // Show/hide global tools (only on app screen)
        const gt = document.querySelector('.global-tools');
        if (gt) { if (id === 'app') gt.classList.add('visible'); else gt.classList.remove('visible'); }
    }

    function showWelcome() { showScreen('welcome'); }

    function showPlacement() {
        state.placementIndex = 0;
        state.placementAnswers = [];
        showScreen('placement');
        renderPlacementQuestion();
    }

    function startBeginner() {
        state.level = 'A1';
        state.moduleIndex = 0;
        state.lessonIndex = 0;
        startApp();
    }

    function continueProgress() {
        // Find last completed lesson and go to next
        const completed = state.progress.completedLessons;
        if (completed.length > 0) {
            const lastId = completed[completed.length - 1];
            // Try to find the next lesson
            for (const lvl of Object.keys(COURSE_DATA)) {
                const levelData = COURSE_DATA[lvl];
                for (let mi = 0; mi < levelData.modules.length; mi++) {
                    for (let li = 0; li < levelData.modules[mi].lessons.length; li++) {
                        if (levelData.modules[mi].lessons[li].id === lastId) {
                            state.level = lvl;
                            state.moduleIndex = mi;
                            state.lessonIndex = li + 1 < levelData.modules[mi].lessons.length ? li + 1 : 0;
                            if (state.lessonIndex === 0 && mi + 1 < levelData.modules.length) {
                                state.moduleIndex = mi + 1;
                            }
                        }
                    }
                }
            }
        }
        startApp();
    }

    function startApp() {
        showScreen('app');
        document.getElementById('level-selector').value = state.level;
        updateHeader();
        renderSidebar();
        loadLesson();
        const greeting = state.studentName ? (state.studentName + ', bem-vindo(a)') : 'Bem-vindo';
        const instrName = state.selectedInstructor === 'vinicius' ? 'vinicius' : 'Carolina';
        addChatMessage('system', 'ðŸŒ ' + greeting + ' ao FREE WORLD! Seu instrutor Ã© ' + instrName + '. Use os comandos /NEXT, /VISUAL, /LEVEL_UP, /PRONUNCIATION ou /REVIEW para navegar.');
    }

    // ====== PLACEMENT TEST ======
    function renderPlacementQuestion() {
        const q = PLACEMENT_QUESTIONS[state.placementIndex];
        if (!q) return showPlacementResult();
        const area = document.getElementById('placement-question-area');
        const counter = document.getElementById('placement-counter');
        const fill = document.getElementById('placement-fill');
        counter.textContent = 'Pergunta ' + (state.placementIndex + 1) + ' de ' + PLACEMENT_QUESTIONS.length;
        fill.style.width = ((state.placementIndex + 1) / PLACEMENT_QUESTIONS.length * 100) + '%';
        let html = '<p class="pq-question">' + q.q + '</p><div class="pq-options">';
        q.o.forEach((opt, i) => {
            html += '<div class="pq-option" data-idx="' + i + '" onclick="FreeWorld.selectPlacementOption(this,' + i + ')">' + opt + '</div>';
        });
        html += '</div>';
        area.innerHTML = html;
    }

    function selectPlacementOption(el, idx) {
        document.querySelectorAll('.pq-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        state.placementAnswers[state.placementIndex] = idx;
    }

    function nextPlacementQuestion() {
        if (state.placementAnswers[state.placementIndex] === undefined) return;
        state.placementIndex++;
        if (state.placementIndex >= PLACEMENT_QUESTIONS.length) {
            showPlacementResult();
        } else {
            renderPlacementQuestion();
        }
    }

    function showPlacementResult() {
        let scores = {A1:0,A2:0,B1:0,B2:0,C1:0,C2:0};
        PLACEMENT_QUESTIONS.forEach((q, i) => {
            if (state.placementAnswers[i] === q.a) scores[q.level]++;
        });
        let total = state.placementAnswers.filter((a,i) => a === PLACEMENT_QUESTIONS[i].a).length;
        let level = 'A1';
        if (total >= 13) level = 'C2';
        else if (total >= 11) level = 'C1';
        else if (total >= 9) level = 'B2';
        else if (total >= 7) level = 'B1';
        else if (total >= 4) level = 'A2';
        state.level = level;
        showScreen('placement-result');
        document.getElementById('result-level').textContent = level;
        const descs = {A1:'Iniciante â€” Vamos comeÃ§ar do bÃ¡sico!',A2:'Elementar â€” VocÃª jÃ¡ tem uma boa base!',B1:'IntermediÃ¡rio â€” Ã“timo progresso!',B2:'IntermediÃ¡rio Superior â€” Quase fluente!',C1:'AvanÃ§ado â€” Impressionante!',C2:'Proficiente â€” VocÃª Ã© quase nativo!'};
        document.getElementById('result-description').textContent = descs[level] + ' Acertou ' + total + ' de ' + PLACEMENT_QUESTIONS.length + ' questÃµes.';
    }

    function startFromResult() { state.moduleIndex = 0; state.lessonIndex = 0; startApp(); }

    // ====== SIDEBAR & NAVIGATION ======
    function toggleSidebar() {
        const sb = document.getElementById('sidebar');
        const ov = document.getElementById('sidebar-overlay');
        state.sidebarOpen = !state.sidebarOpen;
        if (window.innerWidth <= 900) {
            sb.classList.toggle('open');
            ov.style.display = sb.classList.contains('open') ? 'block' : 'none';
        } else {
            sb.classList.toggle('collapsed');
            document.getElementById('main-content').style.marginLeft = sb.classList.contains('collapsed') ? '0' : '280px';
        }
    }

    function renderSidebar() {
        const nav = document.getElementById('sidebar-nav');
        const levelData = COURSE_DATA[state.level];
        if (!levelData) return;
        let html = '';
        levelData.modules.forEach((mod, mi) => {
            const isActive = mi === state.moduleIndex;
            html += '<div class="module-group">';
            html += '<div class="module-title' + (isActive ? ' active' : '') + '" onclick="FreeWorld.toggleModule(' + mi + ')">';
            html += '<span class="module-icon">' + mod.icon + '</span> ' + mod.titlePt;
            html += '</div>';
            if (isActive) {
                html += '<div class="lesson-list">';
                mod.lessons.forEach((lesson, li) => {
                    const isCompleted = state.progress.completedLessons.includes(lesson.id);
                    const isCurrent = li === state.lessonIndex && mi === state.moduleIndex;
                    let cls = 'lesson-item';
                    if (isCurrent) cls += ' active';
                    if (isCompleted) cls += ' completed';
                    html += '<div class="' + cls + '" onclick="FreeWorld.goToLesson(' + mi + ',' + li + ')">';
                    html += '<span class="status-dot"></span>';
                    html += (isCompleted ? 'âœ“ ' : '') + lesson.titlePt;
                    html += '</div>';
                });
                html += '</div>';
            }
            html += '</div>';
        });

        // Music section in sidebar
        html += '<div class="module-group">';
        html += '<div class="module-title" onclick="FreeWorld.showMusicSection()">';
        html += '<span class="module-icon">ðŸŽµ</span> Aprenda com MÃºsicas';
        html += '</div></div>';

        nav.innerHTML = html;
        updateSidebarStats();
    }

    function toggleModule(mi) {
        state.moduleIndex = mi;
        state.lessonIndex = 0;
        renderSidebar();
        loadLesson();
    }

    function goToLesson(mi, li) {
        state.moduleIndex = mi;
        state.lessonIndex = li;
        state.currentStep = 0;
        renderSidebar();
        loadLesson();
    }

    function changeLevel(level) {
        state.level = level;
        state.moduleIndex = 0;
        state.lessonIndex = 0;
        state.currentStep = 0;
        updateHeader();
        renderSidebar();
        loadLesson();
    }

    function updateHeader() {
        document.getElementById('header-level').textContent = state.level;
        const levelData = COURSE_DATA[state.level];
        if (!levelData) return;
        let totalLessons = 0, completedInLevel = 0;
        levelData.modules.forEach(m => {
            m.lessons.forEach(l => {
                totalLessons++;
                if (state.progress.completedLessons.includes(l.id)) completedInLevel++;
            });
        });
        const pct = totalLessons > 0 ? Math.round(completedInLevel / totalLessons * 100) : 0;
        document.getElementById('header-progress-fill').style.width = pct + '%';
        document.getElementById('header-progress-text').textContent = pct + '% concluÃ­do';
        document.getElementById('streak-count').textContent = state.progress.streak;
    }

    function updateSidebarStats() {
        document.getElementById('stat-lessons').textContent = state.progress.completedLessons.length;
        document.getElementById('stat-words').textContent = state.progress.wordsLearned.length;
        const scores = Object.values(state.progress.scores);
        const avg = scores.length > 0 ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : 0;
        document.getElementById('stat-score').textContent = avg + '%';
    }

    // ====== LESSON LOADING ======
    function getLesson() {
        const levelData = COURSE_DATA[state.level];
        if (!levelData || !levelData.modules[state.moduleIndex]) return null;
        const mod = levelData.modules[state.moduleIndex];
        if (!mod.lessons[state.lessonIndex]) return null;
        return mod.lessons[state.lessonIndex];
    }

    function loadLesson() {
        const lesson = getLesson();
        if (!lesson) {
            document.getElementById('lesson-content').innerHTML = '<div style="text-align:center;padding:60px"><h2>ðŸŽ‰ ParabÃ©ns!</h2><p style="color:var(--text2);margin-top:12px">VocÃª completou todas as liÃ§Ãµes deste nÃ­vel! Avance para o prÃ³ximo.</p></div>';
            return;
        }
        state.currentStep = 0;
        // Set instructor based on student's choice
        const instructor = state.selectedInstructor || 'vinicius';
        const isArthur = instructor === 'vinicius';
        document.getElementById('instructor-avatar').src = isArthur ? 'assets/images/vinicius.png' : 'assets/images/carolina.png';
        document.getElementById('instructor-name').textContent = isArthur ? 'vinicius' : 'Carolina';
        document.getElementById('instructor-role').textContent = 'Instrutor PhD';
        // Render step indicators
        renderStepIndicators();
        // Show first step
        renderCurrentStep();
    }

    function renderStepIndicators() {
        const container = document.getElementById('step-indicators');
        const lesson = getLesson();
        if (!lesson) return;
        const availableSteps = getAvailableSteps(lesson);
        let html = '';
        availableSteps.forEach((s, i) => {
            const cls = i === state.currentStep ? 'active' : (i < state.currentStep ? 'completed' : '');
            html += '<div class="step-dot ' + cls + '" onclick="FreeWorld.goToStep(' + i + ')" title="' + getStepName(s) + '"></div>';
        });
        container.innerHTML = html;
    }

    function getAvailableSteps(lesson) {
        return state.steps.filter(s => {
            if (s === 'intro') return lesson.intro;
            if (s === 'vocabulary') return lesson.vocabulary && lesson.vocabulary.length;
            if (s === 'grammar') return lesson.grammar;
            if (s === 'dialogue') return lesson.dialogue && lesson.dialogue.length;
            if (s === 'pronunciation') return lesson.pronunciation && lesson.pronunciation.length;
            if (s === 'flashcards') return lesson.vocabulary && lesson.vocabulary.length >= 4;
            if (s === 'roleplay') return lesson.dialogue && lesson.dialogue.length >= 4;
            if (s === 'listening') return lesson.vocabulary && lesson.vocabulary.length >= 3;
            if (s === 'cultural') return lesson.cultural;
            if (s === 'exercises') return lesson.exercises && lesson.exercises.length;
            if (s === 'summary') return true;
            return false;
        });
    }

    function getStepName(step) {
        const names = {intro:'IntroduÃ§Ã£o',vocabulary:'VocabulÃ¡rio',grammar:'GramÃ¡tica',dialogue:'DiÃ¡logo',pronunciation:'PronÃºncia',flashcards:'Flashcards',roleplay:'SimulaÃ§Ã£o',listening:'Escuta',cultural:'Nota Cultural',exercises:'ExercÃ­cios',summary:'Resumo'};
        return names[step] || step;
    }

    function goToStep(idx) {
        state.currentStep = idx;
        renderStepIndicators();
        renderCurrentStep();
    }

    // ====== STEP RENDERING ======
    function renderCurrentStep() {
        const lesson = getLesson();
        if (!lesson) return;
        const steps = getAvailableSteps(lesson);
        const stepName = steps[state.currentStep];
        // Hide all sections
        ['dual-layout','vocabulary-section','grammar-section','dialogue-section','pronunciation-section','flashcard-section','roleplay-section','listening-section','cultural-section','exercise-section','lesson-summary'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        // Update navigation buttons
        document.getElementById('btn-prev-step').disabled = state.currentStep === 0;
        document.getElementById('btn-next-step').textContent = state.currentStep >= steps.length - 1 ? 'Concluir âœ“' : 'PrÃ³ximo â†’';

        switch(stepName) {
            case 'intro': renderIntro(lesson); break;
            case 'vocabulary': renderVocabulary(lesson); break;
            case 'grammar': renderGrammar(lesson); break;
            case 'dialogue': renderDialogue(lesson); break;
            case 'pronunciation': renderPronunciation(lesson); break;
            case 'flashcards': renderFlashcards(lesson); break;
            case 'roleplay': renderRoleplay(lesson); break;
            case 'listening': renderListening(lesson); break;
            case 'cultural': renderCultural(lesson); break;
            case 'exercises': renderExercises(lesson); break;
            case 'summary': renderSummary(lesson); break;
        }
        renderStepIndicators();
    }

    function renderIntro(lesson) {
        document.getElementById('dual-layout').style.display = 'grid';
        const textEl = document.getElementById('content-text');
        const visualEl = document.getElementById('content-visual');
        // Dynamic instructor name replacement
        const instrName = state.selectedInstructor === 'vinicius' ? 'vinicius' : 'Carolina';
        const studentGreeting = state.studentName ? ', ' + state.studentName + '!' : '!';
        let introText = lesson.intro.text.replace(/I'm Vinicius/g, "I'm " + instrName).replace(/Eu sou o Arthur/g, 'Eu sou ' + (state.selectedInstructor === 'vinicius' ? 'o Arthur' : 'a Leticia'));
        let introPt = lesson.intro.textPt ? lesson.intro.textPt.replace(/Eu sou o Arthur/g, 'Eu sou ' + (state.selectedInstructor === 'vinicius' ? 'o Arthur' : 'a Leticia')) : '';
        // Text side
        let textHtml = '<h4>ðŸ“š ' + lesson.title + '</h4>';
        textHtml += '<p class="en">' + introText + '</p>';
        if (state.settings.showTranslation && introPt) {
            textHtml += '<p class="pt">' + introPt + '</p>';
        }
        textEl.innerHTML = textHtml;
        // Visual side
        visualEl.innerHTML = '<div class="visual-icon">ðŸ–¼ï¸</div><p class="visual-desc">[[IMAGEM: ' + lesson.intro.visual + ']]</p>';
        // Typewriter with personalized greeting
        typeText('Welcome' + studentGreeting + ' ' + introText.substring(0, 100) + '...');
    }

    function renderVocabulary(lesson) {
        const section = document.getElementById('vocabulary-section');
        section.style.display = 'block';
        const container = document.getElementById('vocab-cards');
        let html = '';
        lesson.vocabulary.forEach((v, i) => {
            html += '<div class="vocab-card" style="animation-delay:' + (i * 0.1) + 's">';
            html += '<button class="btn-speak" onclick="FreeWorld.speak(\'' + v.word.replace(/'/g,"\\'") + '\')" title="Ouvir pronÃºncia">ðŸ”Š</button>';
            html += '<div class="word">' + v.word + '</div>';
            html += '<div class="ipa">' + v.ipa + '</div>';
            html += '<div class="translation">â†’ ' + v.pt + '</div>';
            html += '<div class="example"><strong>Ex:</strong> ' + v.ex;
            if (state.settings.showTranslation && v.exPt) html += '<br><em>' + v.exPt + '</em>';
            html += '</div></div>';
            // Track learned words
            if (!state.progress.wordsLearned.includes(v.word)) {
                state.progress.wordsLearned.push(v.word);
            }
        });
        container.innerHTML = html;
        typeText('Let\'s learn some new vocabulary! Click the ðŸ”Š button to hear the pronunciation.');
        saveProgress();
    }

    function renderGrammar(lesson) {
        const section = document.getElementById('grammar-section');
        section.style.display = 'block';
        const content = document.getElementById('grammar-content');
        let html = '<h4>' + lesson.grammar.title + '</h4>';
        html += '<p><em>' + lesson.grammar.titlePt + '</em></p>';
        html += '<p>' + lesson.grammar.explanation + '</p>';
        html += '<table class="grammar-table"><thead><tr>';
        // Determine headers based on content
        html += '<th>Sujeito/Tipo</th><th>Forma</th><th>Exemplo</th>';
        html += '</tr></thead><tbody>';
        lesson.grammar.table.forEach(row => {
            html += '<tr>';
            row.forEach(cell => { html += '<td>' + cell + '</td>'; });
            html += '</tr>';
        });
        html += '</tbody></table>';
        if (lesson.grammar.tip) {
            html += '<div style="background:rgba(245,158,11,.08);border-left:3px solid var(--warm);padding:12px 16px;border-radius:0 8px 8px 0;margin-top:12px;font-size:.88rem;color:var(--warm)">';
            html += 'ðŸ’¡ <strong>Dica:</strong> ' + lesson.grammar.tip + '</div>';
        }
        content.innerHTML = html;
        typeText('Now let\'s understand the grammar behind what we learned. Pay close attention to the patterns!');
    }

    function renderDialogue(lesson) {
        const section = document.getElementById('dialogue-section');
        section.style.display = 'block';
        const content = document.getElementById('dialogue-content');
        let html = '';
        lesson.dialogue.forEach((d, i) => {
            const isArthur = d.speaker === 'vinicius';
            html += '<div class="dialogue-bubble ' + d.speaker + '" style="animation-delay:' + (i * 0.2) + 's">';
            html += '<img class="dialogue-avatar" src="assets/images/' + d.speaker + '.png" alt="' + d.speaker + '">';
            html += '<div class="dialogue-text-wrap">';
            html += '<div class="dialogue-name">' + (isArthur ? 'vinicius' : 'Carolina') + '</div>';
            html += '<div class="dialogue-msg">' + d.text + '</div>';
            if (state.settings.showTranslation && d.textPt) {
                html += '<div class="dialogue-translation">' + d.textPt + '</div>';
            }
            html += '</div></div>';
        });
        content.innerHTML = html;
        typeText('Listen to this conversation between Arthur and leticia. Try to understand before reading the translation!');
    }

    function renderPronunciation(lesson) {
        const section = document.getElementById('pronunciation-section');
        section.style.display = 'block';
        const content = document.getElementById('pronunciation-content');
        let html = '';
        lesson.pronunciation.forEach(p => {
            html += '<div class="pronun-card">';
            html += '<div class="pronun-word">' + p.word + '</div>';
            html += '<div class="pronun-ipa">' + p.ipa + '</div>';
            html += '<div class="pronun-breakdown">ðŸ—£ï¸ ' + p.breakdown + '</div>';
            html += '<div class="pronun-tip">' + p.tip + '</div>';
            html += '<div class="pronun-btn">';
            html += '<button onclick="FreeWorld.speak(\'' + p.word.replace(/'/g,"\\'") + '\')">ðŸ”Š Ouvir</button>';
            html += '<button onclick="FreeWorld.speakSlow(\'' + p.word.replace(/'/g,"\\'") + '\')">ðŸ¢ Devagar</button>';
            html += '</div></div>';
        });
        content.innerHTML = html;
        typeText('Pronunciation is key! Listen carefully and try to repeat each word. Focus on the sounds highlighted in the tips.');
    }

    function renderCultural(lesson) {
        const section = document.getElementById('cultural-section');
        section.style.display = 'block';
        document.getElementById('cultural-title').textContent = 'ðŸŒŽ ' + lesson.cultural.title;
        let text = lesson.cultural.text;
        if (state.settings.showTranslation && lesson.cultural.textPt) {
            text += '<br><br><em style="color:var(--text3)">' + lesson.cultural.textPt + '</em>';
        }
        document.getElementById('cultural-text').innerHTML = text;
        typeText('Here\'s an interesting cultural insight! Understanding culture is just as important as grammar.');
    }

    // ====== EXERCISES ======
    let exerciseState = { current: 0, answers: [], score: 0, total: 0 };

    function renderExercises(lesson) {
        const section = document.getElementById('exercise-section');
        section.style.display = 'block';
        exerciseState = { current: 0, answers: [], score: 0, total: lesson.exercises.length };
        renderExercise(lesson.exercises[0], 0, lesson);
        typeText('Time to practice! Answer the exercises to test your knowledge. Good luck! ðŸ’ª');
    }

    function renderExercise(ex, idx, lesson) {
        const content = document.getElementById('exercise-content');
        const fb = document.getElementById('exercise-feedback');
        fb.style.display = 'none';
        let html = '<div class="exercise-card">';
        html += '<div class="ex-type">' + getExTypeName(ex.type) + ' â€” ExercÃ­cio ' + (idx + 1) + ' de ' + lesson.exercises.length + '</div>';

        if (ex.type === 'mc') {
            html += '<div class="ex-question">' + ex.question + '</div>';
            html += '<div class="ex-options">';
            ex.options.forEach((opt, i) => {
                html += '<div class="ex-option" data-idx="' + i + '" onclick="FreeWorld.answerMC(' + i + ',' + ex.correct + ',this)">' + opt + '</div>';
            });
            html += '</div>';
        } else if (ex.type === 'fill') {
            html += '<div class="ex-question">Complete as lacunas:</div>';
            let sentenceParts = ex.sentence.split('___');
            html += '<div class="ex-fill-sentence">';
            sentenceParts.forEach((part, i) => {
                html += part;
                if (i < sentenceParts.length - 1) {
                    html += '<input type="text" class="ex-fill-input" style="display:inline;width:120px;padding:4px 8px;margin:0 4px" data-blank="' + i + '" placeholder="' + (ex.hints ? ex.hints[i] : '...') + '">';
                }
            });
            html += '</div>';
            html += '<button class="btn btn-primary ex-submit" onclick="FreeWorld.checkFill()">Verificar âœ“</button>';
        } else if (ex.type === 'order') {
            html += '<div class="ex-question">Ordene as palavras para formar a frase correta:</div>';
            if (state.settings.showTranslation && ex.translation) {
                html += '<div style="color:var(--text3);font-style:italic;margin-bottom:12px;font-size:.85rem">(' + ex.translation + ')</div>';
            }
            html += '<div class="ex-answer-area" id="answer-area" ondrop="FreeWorld.dropWord(event)" ondragover="event.preventDefault()"></div>';
            const shuffled = [...ex.words].sort(() => Math.random() - 0.5);
            html += '<div class="ex-word-bank" id="word-bank">';
            shuffled.forEach((w, i) => {
                html += '<span class="ex-word" draggable="true" data-word="' + w + '" onclick="FreeWorld.clickWord(this)">' + w + '</span>';
            });
            html += '</div>';
            html += '<button class="btn btn-primary ex-submit" onclick="FreeWorld.checkOrder()">Verificar âœ“</button>';
        }
        html += '</div>';
        content.innerHTML = html;
        // Store current exercise data
        exerciseState.currentEx = ex;
        exerciseState.currentLesson = lesson;
    }

    function getExTypeName(type) {
        const names = {mc:'MÃºltipla Escolha',fill:'Preencher Lacunas',order:'Ordenar Palavras',translate:'TraduÃ§Ã£o'};
        return names[type] || type;
    }

    function answerMC(selected, correct, el) {
        const options = document.querySelectorAll('.ex-option');
        options.forEach(o => {
            o.style.pointerEvents = 'none';
            const idx = parseInt(o.dataset.idx);
            if (idx === correct) o.classList.add('correct');
            if (idx === selected && selected !== correct) o.classList.add('wrong');
        });
        const isCorrect = selected === correct;
        if (isCorrect) exerciseState.score++;
        showExerciseFeedback(isCorrect, exerciseState.currentEx.explanation || '');
    }

    function checkFill() {
        const inputs = document.querySelectorAll('.ex-fill-input');
        const blanks = exerciseState.currentEx.blanks;
        let allCorrect = true;
        inputs.forEach((inp, i) => {
            const val = inp.value.trim().toLowerCase();
            const expected = blanks[i].toLowerCase();
            if (val === expected) {
                inp.style.borderColor = 'var(--success)';
                inp.style.color = 'var(--success)';
            } else {
                inp.style.borderColor = 'var(--error)';
                inp.style.color = 'var(--error)';
                allCorrect = false;
                inp.value = blanks[i]; // Show correct answer
            }
        });
        if (allCorrect) exerciseState.score++;
        showExerciseFeedback(allCorrect, allCorrect ? '' : 'As respostas corretas foram preenchidas para vocÃª.');
    }

    function clickWord(el) {
        const word = el.dataset.word;
        const area = document.getElementById('answer-area');
        if (el.classList.contains('used')) {
            // Remove from answer
            el.classList.remove('used');
            const inArea = area.querySelector('[data-word="' + word + '"]');
            if (inArea) inArea.remove();
        } else {
            el.classList.add('used');
            const span = document.createElement('span');
            span.className = 'ex-word';
            span.dataset.word = word;
            span.textContent = word;
            span.onclick = function() { el.classList.remove('used'); span.remove(); };
            area.appendChild(span);
        }
    }

    function checkOrder() {
        const area = document.getElementById('answer-area');
        const words = Array.from(area.querySelectorAll('.ex-word')).map(w => w.dataset.word);
        const answer = words.join(' ').replace(/\s+/g,' ').trim().replace(' ,',',').replace(' .','.');
        const correct = exerciseState.currentEx.correct.replace(/\s+/g,' ').trim();
        const isCorrect = answer.toLowerCase() === correct.toLowerCase();
        if (isCorrect) exerciseState.score++;
        showExerciseFeedback(isCorrect, isCorrect ? '' : 'Resposta correta: "' + correct + '"');
    }

    function showExerciseFeedback(correct, explanation) {
        const fb = document.getElementById('exercise-feedback');
        fb.style.display = 'block';
        fb.className = 'exercise-feedback ' + (correct ? 'correct' : 'wrong');
        let html = '<div class="fb-icon">' + (correct ? 'âœ…' : 'âŒ') + '</div>';
        html += '<div class="fb-text">' + (correct ? 'Excelente! Resposta correta!' : 'NÃ£o foi dessa vez...') + '</div>';
        if (explanation) html += '<div style="margin-top:8px;font-size:.85rem;color:var(--text3)">' + explanation + '</div>';
        // Next exercise button
        const lesson = exerciseState.currentLesson;
        const nextIdx = exerciseState.current + 1;
        if (nextIdx < lesson.exercises.length) {
            html += '<button class="btn btn-primary" style="margin-top:12px" onclick="FreeWorld.nextExercise()">PrÃ³ximo ExercÃ­cio â†’</button>';
        } else {
            html += '<div style="margin-top:12px;font-size:1rem;font-weight:700">Resultado: ' + exerciseState.score + '/' + exerciseState.total + ' (' + Math.round(exerciseState.score/exerciseState.total*100) + '%)</div>';
            html += '<button class="btn btn-primary" style="margin-top:12px" onclick="FreeWorld.nextStep()">Continuar â†’</button>';
            // Save score
            const lessonObj = getLesson();
            if (lessonObj) {
                state.progress.scores[lessonObj.id] = Math.round(exerciseState.score/exerciseState.total*100);
            }
        }
        fb.innerHTML = html;
        fb.scrollIntoView({ behavior: 'smooth' });
    }

    function nextExercise() {
        exerciseState.current++;
        const lesson = exerciseState.currentLesson;
        if (lesson.exercises[exerciseState.current]) {
            renderExercise(lesson.exercises[exerciseState.current], exerciseState.current, lesson);
        }
    }

    // ====== SUMMARY ======
    function renderSummary(lesson) {
        const section = document.getElementById('lesson-summary');
        section.style.display = 'flex';
        const stats = document.getElementById('summary-stats');
        const score = state.progress.scores[lesson.id] || 0;
        const wordsCount = lesson.vocabulary ? lesson.vocabulary.length : 0;
        stats.innerHTML = '<div class="summary-stat"><div class="val">' + wordsCount + '</div><div class="lbl">Palavras</div></div>'
            + '<div class="summary-stat"><div class="val">' + score + '%</div><div class="lbl">Acertos</div></div>'
            + '<div class="summary-stat"><div class="val">â­</div><div class="lbl">' + (score >= 80 ? 'Ã“timo!' : 'Continue!') + '</div></div>';
        // Mark lesson as completed
        if (!state.progress.completedLessons.includes(lesson.id)) {
            state.progress.completedLessons.push(lesson.id);
            checkAchievements();
        }
        saveProgress();
        updateHeader();
        updateSidebarStats();
        renderSidebar();
        typeText('Congratulations! You completed this lesson! ðŸŽ‰ Keep going â€” you\'re doing amazing!');
    }

    // ====== STEP NAVIGATION ======
    function nextStep() {
        const lesson = getLesson();
        if (!lesson) return;
        const steps = getAvailableSteps(lesson);
        if (state.currentStep < steps.length - 1) {
            state.currentStep++;
            renderCurrentStep();
            document.getElementById('lesson-content').scrollTo({top:0,behavior:'smooth'});
            saveProgress();
        }
    }

    function prevStep() {
        if (state.currentStep > 0) {
            state.currentStep--;
            renderCurrentStep();
            saveProgress();
        }
    }

    function nextLesson() {
        const levelData = COURSE_DATA[state.level];
        if (!levelData) return;
        const mod = levelData.modules[state.moduleIndex];
        if (state.lessonIndex + 1 < mod.lessons.length) {
            state.lessonIndex++;
        } else if (state.moduleIndex + 1 < levelData.modules.length) {
            state.moduleIndex++;
            state.lessonIndex = 0;
        } else {
            // Level complete â€” suggest next level
            const levels = Object.keys(COURSE_DATA);
            const nextLevelIdx = levels.indexOf(state.level) + 1;
            if (nextLevelIdx < levels.length) {
                state.level = levels[nextLevelIdx];
                state.moduleIndex = 0;
                state.lessonIndex = 0;
                document.getElementById('level-selector').value = state.level;
            }
        }
        state.currentStep = 0;
        renderSidebar();
        updateHeader();
        loadLesson();
    }

    function reviewLesson() {
        state.currentStep = 0;
        renderCurrentStep();
    }

    // ====== MUSIC SECTION ======
    function showMusicSection() {
        const content = document.getElementById('lesson-content');
        // Hide all lesson sections
        ['dual-layout','vocabulary-section','grammar-section','dialogue-section','pronunciation-section','cultural-section','exercise-section','lesson-summary'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        let html = '<div class="music-section">';
        html += '<h3 class="section-title">ðŸŽµ Aprenda InglÃªs com MÃºsicas</h3>';
        html += '<p style="color:var(--text2);margin-bottom:20px">Escolha uma mÃºsica para estudar. Arthur e leticia vÃ£o contar a histÃ³ria, explicar a letra e criar exercÃ­cios especiais!</p>';
        MUSIC_LIBRARY.forEach(song => {
            html += '<div class="music-card" id="music-' + song.id + '">';
            html += '<div class="music-header" onclick="FreeWorld.toggleSong(\'' + song.id + '\')" style="cursor:pointer">';
            html += '<div class="music-cover" style="font-size:2.5rem;display:flex;align-items:center;justify-content:center">' + song.cover + '</div>';
            html += '<div class="music-info"><h4>' + song.title + '</h4><p>' + song.artist + ' (' + song.year + ')</p></div>';
            html += '</div>';
            html += '<div class="music-body" id="music-body-' + song.id + '" style="display:none">';
            // Story from Arthur & leticia
            html += '<div class="music-story">';
            html += '<h4 style="color:var(--accent3);margin-bottom:12px">ðŸ“– A HistÃ³ria da MÃºsica</h4>';
            html += '<div style="display:flex;gap:12px;margin-bottom:16px;align-items:flex-start">';
            html += '<img src="assets/images/vinicius.png" style="width:40px;height:40px;border-radius:50%;object-fit:cover">';
            html += '<div><strong style="color:var(--accent3)">Vinicius:</strong><p style="color:var(--text2);margin-top:4px;font-size:.9rem;line-height:1.6">' + song.story.arthur + '</p>';
            html += '<p style="color:var(--text3);font-style:italic;font-size:.82rem;margin-top:6px">' + song.story.storyPt + '</p></div></div>';
            html += '<div style="display:flex;gap:12px;align-items:flex-start">';
            html += '<img src="assets/images/carolina.png" style="width:40px;height:40px;border-radius:50%;object-fit:cover">';
            html += '<div><strong style="color:var(--accent2)">Carolina:</strong><p style="color:var(--text2);margin-top:4px;font-size:.9rem;line-height:1.6">' + song.story.leticia + '</p></div></div>';
            html += '</div>';
            // Lyrics side by side
            html += '<div class="music-lyrics">';
            html += '<div class="lyrics-col"><h5>ðŸ‡¬ðŸ‡§ English</h5>';
            song.lyrics.forEach((l, i) => {
                html += '<div class="lyrics-line" onclick="FreeWorld.speak(\'' + l.en.replace(/'/g,"\\'") + '\')" title="Clique para ouvir">' + l.en + '</div>';
            });
            html += '</div><div class="lyrics-col"><h5>ðŸ‡§ðŸ‡· PortuguÃªs</h5>';
            song.lyrics.forEach(l => {
                html += '<div class="lyrics-line">' + l.pt + '</div>';
            });
            html += '</div></div>';
            // Vocabulary
            if (song.vocabulary) {
                html += '<div style="padding:20px;border-top:1px solid rgba(255,255,255,.05)">';
                html += '<h4 style="color:var(--accent3);margin-bottom:12px">ðŸ“– VocabulÃ¡rio da MÃºsica</h4>';
                html += '<div class="vocab-cards">';
                song.vocabulary.forEach(v => {
                    html += '<div class="vocab-card">';
                    html += '<button class="btn-speak" onclick="FreeWorld.speak(\'' + v.word.replace(/'/g,"\\'") + '\')">ðŸ”Š</button>';
                    html += '<div class="word">' + v.word + '</div>';
                    html += '<div class="ipa">' + v.ipa + '</div>';
                    html += '<div class="translation">â†’ ' + v.pt + '</div>';
                    html += '<div class="example"><strong>Ex:</strong> ' + v.ex + '</div>';
                    html += '</div>';
                });
                html += '</div></div>';
            }
            // Exercises
            if (song.exercises) {
                html += '<div class="music-exercises">';
                html += '<h4 style="color:var(--accent3);margin-bottom:12px">ðŸŽ¯ ExercÃ­cios da MÃºsica</h4>';
                song.exercises.forEach((ex, ei) => {
                    html += '<div class="exercise-card" style="margin-bottom:12px">';
                    html += '<div class="ex-type">' + getExTypeName(ex.type) + '</div>';
                    html += '<div class="ex-question">' + ex.q + '</div>';
                    if (ex.type === 'mc') {
                        html += '<div class="ex-options">';
                        ex.o.forEach((opt, oi) => {
                            html += '<div class="ex-option" onclick="FreeWorld.answerMusicMC(this,' + oi + ',' + ex.a + ')">' + opt + '</div>';
                        });
                        html += '</div>';
                    } else if (ex.type === 'fill' || ex.type === 'translate') {
                        html += '<input type="text" class="ex-fill-input" id="music-ex-' + song.id + '-' + ei + '" placeholder="' + (ex.hint || 'Digite sua resposta...') + '">';
                        html += '<button class="btn btn-primary ex-submit" onclick="FreeWorld.checkMusicFill(\'' + song.id + '\',' + ei + ',\'' + ex.a.replace(/'/g,"\\'") + '\')">Verificar âœ“</button>';
                    }
                    html += '</div>';
                });
                html += '</div>';
            }
            html += '</div></div>';
        });
        html += '</div>';
        content.querySelector('.lesson-content') ? content.querySelector('.lesson-content').innerHTML = html : null;
        // If lesson-content doesn't have a sub, insert directly
        const lc = document.getElementById('lesson-content');
        // Append music section after other sections
        let musicDiv = document.getElementById('music-section-container');
        if (!musicDiv) {
            musicDiv = document.createElement('div');
            musicDiv.id = 'music-section-container';
            lc.appendChild(musicDiv);
        }
        musicDiv.innerHTML = html;
        musicDiv.style.display = 'block';
        typeText('ðŸŽµ Welcome to the Music Room! Choose a song and let\'s learn English through music!');
    }

    function toggleSong(id) {
        const body = document.getElementById('music-body-' + id);
        if (body) body.style.display = body.style.display === 'none' ? 'block' : 'none';
    }

    function answerMusicMC(el, selected, correct) {
        const parent = el.closest('.ex-options');
        parent.querySelectorAll('.ex-option').forEach((o, i) => {
            o.style.pointerEvents = 'none';
            if (i === correct) o.classList.add('correct');
            if (i === selected && selected !== correct) o.classList.add('wrong');
        });
    }

    function checkMusicFill(songId, exIdx, correctAnswer) {
        const input = document.getElementById('music-ex-' + songId + '-' + exIdx);
        if (!input) return;
        const val = input.value.trim().toLowerCase();
        const expected = correctAnswer.toLowerCase();
        if (val === expected) {
            input.style.borderColor = 'var(--success)';
            input.style.color = 'var(--success)';
        } else {
            input.style.borderColor = 'var(--error)';
            input.value = correctAnswer;
            input.style.color = 'var(--error)';
        }
    }

    // ====== TYPEWRITER ======
    function typeText(text) {
        if (state.typingTimer) clearInterval(state.typingTimer);
        const el = document.getElementById('speech-text');
        const cursor = document.querySelector('.typing-cursor');
        if (!el) return;
        if (!state.settings.typewriter) { el.textContent = text; cursor.classList.add('hidden'); return; }
        el.textContent = '';
        cursor.classList.remove('hidden');
        let i = 0;
        state.typingTimer = setInterval(() => {
            if (i < text.length) { el.textContent += text[i]; i++; }
            else { clearInterval(state.typingTimer); cursor.classList.add('hidden'); }
        }, 25);
    }

    // ====== SPEECH ======
    function speak(text) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'en-US';
            u.rate = parseFloat(state.settings.voiceSpeed);
            u.pitch = 1;
            speechSynthesis.speak(u);
        }
    }

    function speakSlow(text) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'en-US';
            u.rate = 0.4;
            u.pitch = 1;
            speechSynthesis.speak(u);
        }
    }

    function toggleMic() {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            addChatMessage('system', 'âš ï¸ Seu navegador nÃ£o suporta reconhecimento de voz. Use o Chrome para esta funcionalidade.');
            return;
        }
        const btn = document.getElementById('btn-mic');
        if (state.isRecording) {
            state.isRecording = false;
            btn.classList.remove('recording');
            if (state.recognition) state.recognition.stop();
            return;
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        state.recognition = new SR();
        state.recognition.lang = 'en-US';
        state.recognition.continuous = false;
        state.recognition.interimResults = false;
        state.recognition.onresult = function(e) {
            const text = e.results[0][0].transcript;
            document.getElementById('chat-input').value = text;
            addChatMessage('user', 'ðŸŽ¤ ' + text);
            addChatMessage('vinicius', 'I heard you say: "' + text + '". ' + (e.results[0][0].confidence > 0.8 ? 'Great pronunciation! ðŸ‘' : 'Good try! Keep practicing! ðŸ’ª'));
        };
        state.recognition.onend = function() { state.isRecording = false; btn.classList.remove('recording'); };
        state.recognition.onerror = function() { state.isRecording = false; btn.classList.remove('recording'); };
        state.isRecording = true;
        btn.classList.add('recording');
        state.recognition.start();
        addChatMessage('system', 'ðŸŽ¤ Gravando... Fale em inglÃªs!');
    }

    // ====== CHAT ======
    function sendChat() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        if (text.startsWith('/')) { executeCommand(text); return; }
        addChatMessage('user', text);
        // Simple response system
        setTimeout(() => {
            const lower = text.toLowerCase();
            if (lower.includes('hello') || lower.includes('hi')) {
                addChatMessage('vinicius', 'Hello! Great to hear from you! How are you doing today? ðŸ˜Š');
            } else if (lower.includes('how are you')) {
                addChatMessage('Carolina', 'I\'m doing wonderful, thank you for asking! And you? Try to answer in English! ðŸ˜Š');
            } else if (lower.includes('thank')) {
                addChatMessage('vinicius', 'You\'re welcome! Keep up the great work! ðŸ’ª');
            } else if (lower.includes('help')) {
                addChatMessage('system', 'Comandos disponÃ­veis: /NEXT, /VISUAL, /LEVEL_UP, /PRONUNCIATION, /REVIEW, /PROGRESS');
            } else {
                const responses = [
                    'Good job writing in English! Keep practicing! ðŸ‘',
                    'Excellent! Your English is improving! ðŸŒŸ',
                    'That\'s a great sentence! Try using it in a real conversation! ðŸ’¬',
                    'Well done! Remember to practice pronunciation too! ðŸ”Š',
                    'Nice! Every sentence you write makes you better! ðŸ“ˆ'
                ];
                addChatMessage(Math.random() > 0.5 ? 'vinicius' : 'Carolina', responses[Math.floor(Math.random() * responses.length)]);
            }
        }, 500);
    }

    function executeCommand(cmd) {
        const command = cmd.toUpperCase().replace('/','');
        addChatMessage('user', cmd);
        switch(command) {
            case 'NEXT': nextStep(); addChatMessage('system', 'â­ï¸ AvanÃ§ando...'); break;
            case 'VISUAL':
                addChatMessage('vinicius', '[[VISUAL EXPANDIDO]] Let me paint a more detailed picture for you...');
                const lesson = getLesson();
                if (lesson && lesson.intro) addChatMessage('system', 'ðŸ–¼ï¸ ' + lesson.intro.visual);
                break;
            case 'LEVEL_UP':
                const levels = Object.keys(COURSE_DATA);
                const nextIdx = levels.indexOf(state.level) + 1;
                if (nextIdx < levels.length) {
                    changeLevel(levels[nextIdx]);
                    addChatMessage('system', 'â¬†ï¸ NÃ­vel aumentado para ' + levels[nextIdx] + '!');
                } else {
                    addChatMessage('system', 'ðŸ‘‘ VocÃª jÃ¡ estÃ¡ no nÃ­vel mÃ¡ximo!');
                }
                break;
            case 'PRONUNCIATION':
                addChatMessage('Carolina', 'ðŸ”Š Let\'s focus on pronunciation! Listen carefully and repeat after me.');
                const l = getLesson();
                if (l && l.pronunciation) {
                    l.pronunciation.forEach(p => speak(p.word));
                    addChatMessage('system', 'ðŸ”Š Reproduzindo palavras-chave... Repita apÃ³s ouvir!');
                }
                break;
            case 'REVIEW':
                state.currentStep = 0;
                renderCurrentStep();
                addChatMessage('system', 'ðŸ”„ Revisando a liÃ§Ã£o do inÃ­cio...');
                break;
            case 'PROGRESS': showProgress(); break;
            default: addChatMessage('system', 'â“ Comando nÃ£o reconhecido. Use: /NEXT, /VISUAL, /LEVEL_UP, /PRONUNCIATION, /REVIEW');
        }
    }

    function addChatMessage(type, text) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        const div = document.createElement('div');
        div.className = 'chat-msg ' + type;
        const prefix = type === 'vinicius' ? 'ðŸŽ“ Vinicius: ' : type === 'Carolina' ? 'ðŸ‘©â€ðŸ« Carolina: ' : type === 'system' ? '' : '';
        div.textContent = prefix + text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    // ====== PROGRESS ======
    function showProgress() {
        document.getElementById('progress-modal').style.display = 'flex';
        document.getElementById('prog-total-lessons').textContent = state.progress.completedLessons.length;
        document.getElementById('prog-total-words').textContent = state.progress.wordsLearned.length;
        const scores = Object.values(state.progress.scores);
        document.getElementById('prog-accuracy').textContent = scores.length > 0 ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) + '%' : 'â€”';
        document.getElementById('prog-streak').textContent = state.progress.streak;
        const elapsed = Math.round((Date.now() - (state.progress.startTime || Date.now())) / 3600000);
        document.getElementById('prog-time').textContent = elapsed > 0 ? elapsed + 'h' : '<1h';
        document.getElementById('prog-achievements').textContent = state.progress.achievements.length;
        // Level progress bars
        const barsContainer = document.getElementById('progress-levels-bars');
        let barsHtml = '';
        const colors = {A1:'#6366f1',A2:'#8b5cf6',B1:'#10b981',B2:'#059669',C1:'#f59e0b',C2:'#ef4444'};
        Object.keys(COURSE_DATA).forEach(lvl => {
            let total = 0, done = 0;
            COURSE_DATA[lvl].modules.forEach(m => m.lessons.forEach(l => { total++; if(state.progress.completedLessons.includes(l.id)) done++; }));
            const pct = total > 0 ? Math.round(done/total*100) : 0;
            barsHtml += '<div class="level-prog-item"><span class="level-prog-name">' + lvl + '</span>';
            barsHtml += '<div class="level-prog-bar"><div class="level-prog-fill" style="width:' + pct + '%;background:' + colors[lvl] + '"></div></div>';
            barsHtml += '<span class="level-prog-pct">' + pct + '%</span></div>';
        });
        barsContainer.innerHTML = barsHtml;
        // Achievements
        const achGrid = document.getElementById('achievements-grid');
        achGrid.innerHTML = ACHIEVEMENTS.map(a => '<div class="achievement ' + (state.progress.achievements.includes(a.id) ? 'unlocked' : '') + '"><div class="ach-icon">' + a.icon + '</div><div class="ach-name">' + a.name + '</div></div>').join('');
    }

    function showSettings() { document.getElementById('settings-modal').style.display = 'flex'; }
    function closeModal(id) { document.getElementById(id).style.display = 'none'; }
    function closeAllModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none'); }

    function updateSetting(key, value) {
        state.settings[key] = value;
        if (key === 'voiceSpeed') document.getElementById('voice-speed-label').textContent = value + 'x';
        localStorage.setItem('freeworld_settings', JSON.stringify(state.settings));
    }

    // ====== PERSISTENCE ======
    function saveProgress() {
        const data = {
            completedLessons: state.progress.completedLessons,
            wordsLearned: state.progress.wordsLearned,
            scores: state.progress.scores,
            streak: state.progress.streak,
            lastDate: state.progress.lastDate,
            achievements: state.progress.achievements,
            level: state.level,
            moduleIndex: state.moduleIndex,
            lessonIndex: state.lessonIndex,
            currentStep: state.currentStep
        };
        localStorage.setItem('freeworld_progress', JSON.stringify(data));
    }

    function loadProgress() {
        try {
            const data = JSON.parse(localStorage.getItem('freeworld_progress'));
            if (data) {
                Object.assign(state.progress, data);
                if (data.level) state.level = data.level;
                if (data.moduleIndex !== undefined) state.moduleIndex = data.moduleIndex;
                if (data.lessonIndex !== undefined) state.lessonIndex = data.lessonIndex;
                if (data.currentStep !== undefined) state.currentStep = data.currentStep;
            }
            const settings = JSON.parse(localStorage.getItem('freeworld_settings'));
            if (settings) Object.assign(state.settings, settings);
        } catch(e) { console.log('No saved progress found.'); }
    }

    function checkStreak() {
        const today = new Date().toDateString();
        if (state.progress.lastDate !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (state.progress.lastDate === yesterday) {
                state.progress.streak++;
            } else if (state.progress.lastDate) {
                state.progress.streak = 1;
            } else {
                state.progress.streak = 1;
            }
            state.progress.lastDate = today;
            saveProgress();
        }
    }

    function checkAchievements() {
        const p = state.progress;
        const checks = [
            {id:'first_lesson', cond: p.completedLessons.length >= 1},
            {id:'five_lessons', cond: p.completedLessons.length >= 5},
            {id:'ten_lessons', cond: p.completedLessons.length >= 10},
            {id:'first_perfect', cond: Object.values(p.scores).some(s => s === 100)},
            {id:'streak_3', cond: p.streak >= 3},
            {id:'streak_7', cond: p.streak >= 7},
            {id:'vocab_50', cond: p.wordsLearned.length >= 50},
            {id:'vocab_100', cond: p.wordsLearned.length >= 100}
        ];
        checks.forEach(c => { if (c.cond && !p.achievements.includes(c.id)) { p.achievements.push(c.id); addChatMessage('system', 'ðŸ† Nova conquista desbloqueada!'); } });
        saveProgress();
    }

    function resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso? Esta aÃ§Ã£o nÃ£o pode ser desfeita.')) {
            localStorage.removeItem('freeworld_progress');
            state.progress = { completedLessons:[], wordsLearned:[], scores:{}, streak:0, lastDate:null, totalTime:0, achievements:[], startTime:Date.now() };
            state.level = 'A1'; state.moduleIndex = 0; state.lessonIndex = 0;
            closeAllModals();
            updateHeader(); renderSidebar(); loadLesson();
            addChatMessage('system', 'ðŸ”„ Progresso resetado. ComeÃ§ando do zero!');
        }
    }

    // ====== FLASHCARDS ======
    let fcState = { cards:[], idx:0, flipped:false, correct:0, wrong:0 };

    function renderFlashcards(lesson) {
        document.getElementById('flashcard-section').style.display = 'block';
        fcState = { cards: lesson.vocabulary.map(v => ({front:v.word, back:v.pt + '\n' + v.ipa, ex:v.ex})), idx:0, flipped:false, correct:0, wrong:0 };
        // Shuffle
        for(let i=fcState.cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[fcState.cards[i],fcState.cards[j]]=[fcState.cards[j],fcState.cards[i]];}
        showFlashcard();
        typeText('ðŸƒ Flashcards! Clique no card para virar. Teste se vocÃª aprendeu o vocabulÃ¡rio!');
    }

    function showFlashcard() {
        const card = fcState.cards[fcState.idx];
        if (!card) return showFlashcardResult();
        const el = document.getElementById('flashcard-card');
        el.classList.remove('flipped');
        fcState.flipped = false;
        document.getElementById('fc-front').innerHTML = '<div style="font-size:2rem;margin-bottom:8px">' + card.front + '</div><div style="font-size:.8rem;color:var(--text3)">Clique para virar</div>';
        document.getElementById('fc-back').innerHTML = '<div style="font-size:1.3rem;margin-bottom:8px">' + card.back.replace('\n','<br>') + '</div><div style="font-size:.82rem;color:var(--text2);font-style:italic">"' + card.ex + '"</div>';
        document.getElementById('flashcard-counter').textContent = (fcState.idx+1) + '/' + fcState.cards.length;
        document.getElementById('fc-bar-fill').style.width = ((fcState.idx)/fcState.cards.length*100) + '%';
        document.getElementById('flashcard-score').textContent = 'âœ… ' + fcState.correct + '  âŒ ' + fcState.wrong;
    }

    function flipFlashcard() {
        const el = document.getElementById('flashcard-card');
        fcState.flipped = !fcState.flipped;
        el.classList.toggle('flipped');
        if (fcState.flipped) { const card = fcState.cards[fcState.idx]; if(card) speak(card.front); }
    }

    function flashcardAnswer(knew) {
        if (knew) fcState.correct++; else fcState.wrong++;
        fcState.idx++;
        if (fcState.idx >= fcState.cards.length) { showFlashcardResult(); return; }
        showFlashcard();
    }

    function showFlashcardResult() {
        const pct = Math.round(fcState.correct / fcState.cards.length * 100);
        document.getElementById('flashcard-card').innerHTML = '<div class="fc-front" style="transform:none;backface-visibility:visible"><div style="font-size:2.5rem;margin-bottom:12px">' + (pct >= 80 ? 'ðŸ†' : pct >= 50 ? 'ðŸ‘' : 'ðŸ“š') + '</div><div style="font-size:1.3rem;font-weight:700">Resultado: ' + fcState.correct + '/' + fcState.cards.length + '</div><div style="color:var(--text2);margin-top:8px">' + pct + '% correto</div><div style="margin-top:12px;font-size:.85rem;color:var(--text3)">' + (pct >= 80 ? 'Excelente! VocabulÃ¡rio dominado!' : 'Continue praticando â€” revisÃ£o Ã© a chave!') + '</div></div>';
        document.getElementById('fc-bar-fill').style.width = '100%';
        document.getElementById('flashcard-score').textContent = 'âœ… ' + fcState.correct + '  âŒ ' + fcState.wrong;
    }

    // ====== ROLE-PLAY ======
    let rpState = { steps:[], idx:0, score:0 };

    function renderRoleplay(lesson) {
        document.getElementById('roleplay-section').style.display = 'block';
        // Generate roleplay from lesson dialogue + vocabulary
        const instrName = state.selectedInstructor === 'vinicius' ? 'vinicius' : 'Carolina';
        const instrImg = state.selectedInstructor === 'vinicius' ? 'assets/images/vinicius.png' : 'assets/images/carolina.png';
        rpState = { steps:[], idx:0, score:0 };
        // Create roleplay scenarios from dialogue
        const dlg = lesson.dialogue;
        for (let i = 0; i < dlg.length - 1; i += 2) {
            const q = dlg[i];
            const a = dlg[i+1];
            if (!a) break;
            // Create wrong options from other dialogues
            const wrongOptions = [];
            if (lesson.vocabulary && lesson.vocabulary.length > 0) {
                wrongOptions.push('I don\'t understand. Can you repeat?');
                wrongOptions.push('Sorry, what did you say?');
            }
            rpState.steps.push({
                speaker: q.speaker === 'vinicius' ? instrName : instrName,
                speakerImg: instrImg,
                text: q.text,
                textPt: q.textPt,
                correct: a.text,
                correctPt: a.textPt,
                options: shuffle([a.text, ...wrongOptions.slice(0,2)])
            });
        }
        showRoleplayStep();
        typeText('ðŸŽ­ Hora da simulaÃ§Ã£o! Escolha a melhor resposta para cada situaÃ§Ã£o.');
    }

    function shuffle(arr) { const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }

    function showRoleplayStep() {
        const container = document.getElementById('roleplay-container');
        const step = rpState.steps[rpState.idx];
        if (!step) { showRoleplayResult(); return; }
        let html = '<div class="rp-dialogue">';
        html += '<div class="rp-bubble"><img class="rp-avatar" src="' + step.speakerImg + '"><div class="rp-msg"><strong>' + step.speaker + ':</strong> ' + step.text;
        if (state.settings.showTranslation && step.textPt) html += '<br><em style="font-size:.8rem;color:var(--text3)">' + step.textPt + '</em>';
        html += '</div></div></div>';
        html += '<p style="color:var(--accent3);font-weight:600;margin-bottom:8px">ðŸ’¬ Como vocÃª responderia?</p>';
        html += '<div class="rp-options">';
        step.options.forEach((opt, i) => {
            html += '<div class="rp-option" onclick="FreeWorld.answerRoleplay(' + i + ')" data-idx="' + i + '">' + opt + '</div>';
        });
        html += '</div>';
        container.innerHTML = html;
    }

    function answerRoleplay(idx) {
        const step = rpState.steps[rpState.idx];
        const options = document.querySelectorAll('.rp-option');
        const selected = step.options[idx];
        const isCorrect = selected === step.correct;
        if (isCorrect) rpState.score++;
        options.forEach((o, i) => {
            o.style.pointerEvents = 'none';
            if (step.options[i] === step.correct) o.classList.add('correct');
            if (i === idx && !isCorrect) o.classList.add('wrong');
        });
        // Show correct response as dialogue
        const container = document.getElementById('roleplay-container');
        let fb = '<div class="rp-bubble student" style="margin-top:12px"><div class="rp-msg">' + step.correct;
        if (state.settings.showTranslation && step.correctPt) fb += '<br><em style="font-size:.8rem;color:var(--text3)">' + step.correctPt + '</em>';
        fb += '</div></div>';
        fb += '<div style="text-align:center;margin-top:16px"><button class="btn btn-primary" onclick="FreeWorld.nextRoleplay()">Continuar â†’</button></div>';
        container.innerHTML += fb;
    }

    function nextRoleplay() {
        rpState.idx++;
        showRoleplayStep();
    }

    function showRoleplayResult() {
        const pct = rpState.steps.length > 0 ? Math.round(rpState.score / rpState.steps.length * 100) : 0;
        const container = document.getElementById('roleplay-container');
        container.innerHTML = '<div style="text-align:center;padding:30px"><div style="font-size:3rem;margin-bottom:12px">' + (pct >= 80 ? 'ðŸŽ‰' : 'ðŸ’ª') + '</div><h3>SimulaÃ§Ã£o ConcluÃ­da!</h3><p style="color:var(--text2);margin-top:8px">VocÃª acertou ' + rpState.score + '/' + rpState.steps.length + ' (' + pct + '%)</p><p style="color:var(--text3);font-size:.85rem;margin-top:8px">' + (pct >= 80 ? 'Excelente! VocÃª mandou muito bem no diÃ¡logo!' : 'Continue praticando! A fluÃªncia vem com a prÃ¡tica.') + '</p></div>';
    }

    // ====== LISTENING CHALLENGE ======
    let listenState = { phrases:[], idx:0, score:0 };

    function renderListening(lesson) {
        document.getElementById('listening-section').style.display = 'block';
        // Build phrases from vocabulary examples
        listenState = { phrases:[], idx:0, score:0 };
        lesson.vocabulary.forEach(v => {
            if (v.ex) listenState.phrases.push({ text: v.ex, answer: v.ex, hint: v.exPt || v.pt });
        });
        // Shuffle and limit to 5
        listenState.phrases = shuffle(listenState.phrases).slice(0, 5);
        showListenChallenge();
        typeText('ðŸ‘‚ Desafio de Escuta! OuÃ§a e escreva o que ouvir. Treine seu ouvido!');
    }

    function showListenChallenge() {
        const container = document.getElementById('listening-container');
        const phrase = listenState.phrases[listenState.idx];
        if (!phrase) { showListenResult(); return; }
        let html = '<div class="listen-card">';
        html += '<div style="font-size:.85rem;color:var(--text3);margin-bottom:12px">Frase ' + (listenState.idx+1) + ' de ' + listenState.phrases.length + '</div>';
        html += '<button class="listen-btn" onclick="FreeWorld.playListenPhrase()" title="Ouvir frase">ðŸ”Š</button>';
        html += '<p style="color:var(--text2);font-size:.85rem;margin-bottom:12px">Clique para ouvir, depois escreva o que ouviu</p>';
        if (state.settings.showTranslation && phrase.hint) {
            html += '<p style="color:var(--text3);font-size:.8rem;font-style:italic;margin-bottom:12px">Dica: ' + phrase.hint + '</p>';
        }
        html += '<input type="text" class="listen-input" id="listen-input" placeholder="Escreva o que ouviu..." onkeydown="if(event.key===\'Enter\')FreeWorld.checkListen()">';
        html += '<button class="btn btn-primary" onclick="FreeWorld.checkListen()">Verificar âœ“</button>';
        html += '<div id="listen-feedback"></div>';
        html += '</div>';
        container.innerHTML = html;
    }

    function playListenPhrase() {
        const phrase = listenState.phrases[listenState.idx];
        if (phrase) speak(phrase.text);
    }

    function checkListen() {
        const input = document.getElementById('listen-input');
        const phrase = listenState.phrases[listenState.idx];
        if (!input || !phrase) return;
        const val = input.value.trim().toLowerCase().replace(/[?.!,]/g,'');
        const expected = phrase.answer.toLowerCase().replace(/[?.!,]/g,'');
        const isCorrect = val === expected || expected.includes(val) && val.length > expected.length * 0.6;
        if (isCorrect) listenState.score++;
        const fb = document.getElementById('listen-feedback');
        fb.innerHTML = '<div class="listen-result ' + (isCorrect ? 'correct' : 'wrong') + '">' + (isCorrect ? 'âœ… Correto!' : 'âŒ Resposta: "' + phrase.answer + '"') + '</div>';
        fb.innerHTML += '<div style="text-align:center;margin-top:12px"><button class="btn btn-primary" onclick="FreeWorld.nextListen()">PrÃ³xima â†’</button></div>';
        input.disabled = true;
        input.value = phrase.answer;
        input.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
    }

    function nextListen() {
        listenState.idx++;
        showListenChallenge();
    }

    function showListenResult() {
        const pct = listenState.phrases.length > 0 ? Math.round(listenState.score / listenState.phrases.length * 100) : 0;
        const container = document.getElementById('listening-container');
        container.innerHTML = '<div style="text-align:center;padding:30px"><div style="font-size:3rem;margin-bottom:12px">' + (pct >= 80 ? 'ðŸ‘‚ðŸ†' : 'ðŸ‘‚ðŸ’ª') + '</div><h3>Escuta ConcluÃ­da!</h3><p style="color:var(--text2);margin-top:8px">' + listenState.score + '/' + listenState.phrases.length + ' corretas (' + pct + '%)</p></div>';
    }

    // ====== DICTIONARY ======
    let dictFilter = 'all';

    function showDictionary() {
        document.getElementById('dictionary-modal').style.display = 'flex';
        document.getElementById('dict-search').value = '';
        dictFilter = 'all';
        document.querySelectorAll('.dict-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.dict-tab').classList.add('active');
        renderDictionary(DICTIONARY);
    }

    function searchDictionary(query) {
        const q = query.toLowerCase().trim();
        let results = DICTIONARY;
        if (dictFilter !== 'all') results = results.filter(e => e.t === dictFilter);
        if (q) results = results.filter(e => e.w.toLowerCase().includes(q) || e.pt.toLowerCase().includes(q));
        renderDictionary(results);
    }

    function dictTab(filter, el) {
        dictFilter = filter;
        document.querySelectorAll('.dict-tab').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        searchDictionary(document.getElementById('dict-search').value);
    }

    function renderDictionary(entries) {
        const container = document.getElementById('dict-results');
        const count = document.getElementById('dict-count');
        if (entries.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text3)">Nenhuma palavra encontrada. Tente outra busca.</div>';
            count.textContent = '';
            return;
        }
        const typeNames = {noun:'Substantivo',verb:'Verbo',adj:'Adjetivo',adv:'AdvÃ©rbio',phrase:'Frase'};
        let html = '';
        entries.forEach(e => {
            html += '<div class="dict-entry">';
            html += '<div>';
            html += '<div class="dict-word">' + e.w + ' <span class="dict-ipa">' + e.ipa + '</span></div>';
            html += '<span class="dict-type">' + (typeNames[e.t] || e.t) + '</span>';
            html += '<div class="dict-translation">â†’ ' + e.pt + '</div>';
            html += '<div class="dict-example">"' + e.ex + '"</div>';
            html += '</div>';
            html += '<button class="dict-speak" onclick="FreeWorld.speak(\'' + e.w.replace(/'/g,"\\'") + '\')" title="Ouvir pronÃºncia">ðŸ”Š</button>';
            html += '</div>';
        });
        container.innerHTML = html;
        count.textContent = entries.length + ' palavra' + (entries.length !== 1 ? 's' : '') + ' encontrada' + (entries.length !== 1 ? 's' : '');
    }

    // ====== VERB CONJUGATION ======
    function showVerbs() {
        document.getElementById('verbs-modal').style.display = 'flex';
        document.getElementById('verb-search').value = '';
        renderVerbList(VERB_DATABASE.slice(0, 5));
    }

    function searchVerbs(query) {
        document.getElementById('verb-search').value = query;
        const q = query.toLowerCase().trim();
        let results = VERB_DATABASE;
        if (q) {
            results = results.filter(v =>
                v.v.toLowerCase().includes(q) ||
                v.pt.toLowerCase().includes(q) ||
                v.forms.past.toLowerCase().includes(q) ||
                v.forms.pp.toLowerCase().includes(q)
            );
        }
        renderVerbList(results);
    }

    function renderVerbList(verbs) {
        const container = document.getElementById('verb-results');
        if (verbs.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text3)">Nenhum verbo encontrado. Tente outra busca.</div>';
            return;
        }
        const tenseNames = {present:'ðŸ• Presente Simples',past:'ðŸ•‘ Passado Simples',future:'ðŸ•’ Futuro Simples',presentPerf:'ðŸ•“ Presente Perfeito'};
        const subjects = ['I','You','He/She/It','We','They'];
        let html = '';
        verbs.forEach(vb => {
            html += '<div class="verb-card">';
            html += '<div class="verb-header"><div>';
            html += '<div class="verb-title">To ' + vb.v.charAt(0).toUpperCase() + vb.v.slice(1);
            if (vb.irregular) html += '<span class="irregular">IRREGULAR</span>';
            html += '</div>';
            html += '<div class="verb-meaning">â†’ ' + vb.pt + '</div>';
            html += '</div><button class="dict-speak" onclick="FreeWorld.speak(\'to ' + vb.v + '\')" title="Ouvir">ðŸ”Š</button></div>';
            html += '<div class="verb-forms">';
            html += '<div class="verb-form"><div class="verb-form-label">Base Form</div><div class="verb-form-value">' + vb.forms.base + '</div><div class="verb-form-pt">Infinitivo</div></div>';
            html += '<div class="verb-form"><div class="verb-form-label">Past Simple</div><div class="verb-form-value">' + vb.forms.past + '</div><div class="verb-form-pt">Passado</div></div>';
            html += '<div class="verb-form"><div class="verb-form-label">Past Participle</div><div class="verb-form-value">' + vb.forms.pp + '</div><div class="verb-form-pt">ParticÃ­pio</div></div>';
            html += '<div class="verb-form"><div class="verb-form-label">3rd Person</div><div class="verb-form-value">' + vb.forms.third + '</div><div class="verb-form-pt">3Âª pessoa</div></div>';
            html += '<div class="verb-form"><div class="verb-form-label">Gerund</div><div class="verb-form-value">' + vb.forms.gerund + '</div><div class="verb-form-pt">GerÃºndio</div></div>';
            html += '<div class="verb-form"><div class="verb-form-label">Tipo</div><div class="verb-form-value" style="color:' + (vb.irregular ? 'var(--warm)' : 'var(--success)') + '">' + (vb.irregular ? 'Irregular' : 'Regular') + '</div></div>';
            html += '</div>';
            html += '<div class="verb-tenses">';
            Object.keys(vb.tenses).forEach(tense => {
                html += '<h4>' + tenseNames[tense] + '</h4>';
                html += '<div class="verb-tense-grid">';
                vb.tenses[tense].forEach((conj, i) => {
                    html += '<div class="verb-tense-item"><span class="subj">' + subjects[i] + '</span> ';
                    html += '<span class="conj">' + conj + '</span></div>';
                });
                html += '</div>';
            });
            html += '</div>';
            if (vb.examples) {
                html += '<div class="verb-examples"><h4>ðŸ“Œ Exemplos</h4>';
                vb.examples.forEach(ex => {
                    html += '<div class="verb-ex-item"><span class="en">' + ex.en + '</span> â€” <span class="pt">' + ex.pt + '</span></div>';
                });
                html += '</div>';
            }
            html += '</div>';
        });
        container.innerHTML = html;
    }

    // ====== WIZARD NAVIGATION ======
    function wizardNext(step) {
        document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
        const el = document.getElementById('wizard-step-' + step);
        if (el) {
            el.classList.add('active');
            // Auto-focus input on step 2
            if (step === 2) {
                const input = el.querySelector('input');
                if (input) setTimeout(() => input.focus(), 300);
            }
        }
    }

    // ====== PUBLIC API ======
    return {
        init, selectInstructor, setStudentName, showWelcome, showPlacement, startBeginner, continueProgress, startFromResult, wizardNext,
        toggleSidebar, changeLevel, toggleModule, goToLesson, goToStep,
        nextStep, prevStep, nextLesson, reviewLesson, nextExercise,
        selectPlacementOption, nextPlacementQuestion,
        answerMC, checkFill, clickWord, checkOrder, dropWord: function(){},
        sendChat, executeCommand, toggleMic,
        speak, speakSlow,
        showProgress, showSettings, closeModal,
        updateSetting, resetProgress,
        showMusicSection, toggleSong, answerMusicMC, checkMusicFill,
        flipFlashcard, flashcardAnswer,
        answerRoleplay, nextRoleplay,
        playListenPhrase, checkListen, nextListen,
        showDictionary, searchDictionary, dictTab,
        showVerbs, searchVerbs
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', FreeWorld.init);


