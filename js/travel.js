// FREE WORLD — Travel Module Engine — Anti Gravity System L99
const TravelModule = (function(){
  let trip = { dest:null, days:3, hotel:null, phase:0, spotIdx:0, studentName:'' };

  function start(studentName){
    trip.studentName = studentName || 'aluno';
    trip.phase = 0; trip.spotIdx = 0; trip.dest = null; trip.hotel = null;
    renderInterestSelection();
  }

  function getContainer(){
    const lc = document.getElementById('lesson-content');
    // Hide all other sections
    ['dual-layout','vocabulary-section','grammar-section','dialogue-section',
     'pronunciation-section','flashcard-section','roleplay-section',
     'listening-section','cultural-section','exercise-section','lesson-summary'].forEach(id=>{
      const el=document.getElementById(id); if(el) el.style.display='none';
    });
    return lc;
  }

  function speakEN(text){ if(window.FreeWorld && FreeWorld.speak) FreeWorld.speak(text); }

  function instrBubble(text, extra){
    const isV = (localStorage.getItem('freeworld_instructor')||'vinicius')==='vinicius';
    const name = isV ? 'Prof. Vinicius' : 'Prof. Carolina';
    const img = 'assets/images/'+(isV?'vinicius':'carolina')+'.png';
    return '<div class="instr-bubble"><img class="instr-bubble-avatar" src="'+img+'"><div class="instr-bubble-content"><strong class="instr-bubble-name">'+name+'</strong><p>'+text+'</p>'+(extra||'')+'</div></div>';
  }

  function bilingual(en,pt){
    return '<div class="tv-bilingual"><div class="tv-en">'+en+'</div><div class="tv-pt">'+pt+'</div></div>';
  }

  // ===== PHASE 0: Interest Selection =====
  function renderInterestSelection(){
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">✈️ MÓDULO DE VIAGENS INTERATIVO</div>';
    h += instrBubble(trip.studentName+', vamos planejar sua viagem internacional! Primeiro, escolha seus interesses para eu recomendar o destino perfeito.');
    h += '<h3 class="tv-title">What are your travel interests?</h3>';
    h += '<p class="tv-subtitle">Quais são seus interesses de viagem?</p>';
    h += '<div class="tv-interests">';
    TRAVEL_INTERESTS.forEach(i=>{
      h += '<div class="tv-interest-card" data-id="'+i.id+'" onclick="TravelModule.toggleInterest(this)">';
      h += '<span class="tv-interest-icon">'+i.icon+'</span>';
      h += '<span class="tv-interest-label">'+i.label+'</span>';
      h += '<span class="tv-interest-labelpt">'+i.labelPt+'</span></div>';
    });
    h += '</div><button class="btn btn-primary btn-lg tv-btn-main" onclick="TravelModule.findDestination()">🔍 Find My Destination / Encontrar Destino</button></div>';
    c.innerHTML = h;
  }

  let selectedInterests = [];
  function toggleInterest(el){
    const id = el.dataset.id;
    el.classList.toggle('selected');
    if(el.classList.contains('selected')){ if(!selectedInterests.includes(id)) selectedInterests.push(id); }
    else { selectedInterests = selectedInterests.filter(x=>x!==id); }
  }

  function findDestination(){
    if(selectedInterests.length===0){ alert('Selecione pelo menos 1 interesse!'); return; }
    let bestDest=null, bestScore=0;
    Object.keys(TRAVEL_DESTINATIONS).forEach(k=>{
      const d=TRAVEL_DESTINATIONS[k];
      let score=0;
      selectedInterests.forEach(i=>{ if(d.interests.includes(i)) score++; });
      score += Math.random()*0.5;
      if(score>bestScore){ bestScore=score; bestDest=k; }
    });
    trip.dest = bestDest;
    renderDestinationReveal();
  }

  // ===== PHASE 1: Destination Reveal & Trip Planning =====
  function renderDestinationReveal(){
    const d = TRAVEL_DESTINATIONS[trip.dest];
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">FASE 1 — CONTEXTUALIZAÇÃO / CONTEXTUALIZATION</div>';
    h += instrBubble(trip.studentName+', encontrei o destino perfeito para você! Vamos conhecer '+d.name+'!');
    h += '<div class="tv-dest-card">';
    h += '<img src="'+d.img+'" alt="'+d.name+'" class="tv-dest-img" onerror="this.style.display=\'none\'">';
    h += '<div class="tv-dest-info">';
    h += '<h2 class="tv-dest-name">'+d.name+' <span class="tv-dest-country">'+d.country+'</span></h2>';
    h += bilingual(d.descEN, d.descPT);
    h += '<div class="tv-dest-details">';
    h += '<div class="tv-detail"><span>✈️</span> '+d.airport+' ('+d.airportCode+')</div>';
    h += '<div class="tv-detail"><span>💰</span> '+d.currency+'</div>';
    h += '<div class="tv-detail"><span>🗣️</span> '+d.lang+'</div></div></div></div>';
    // Trip duration
    h += '<div class="tv-planning glass-panel">';
    h += '<h3>📅 How many days? / Quantos dias?</h3>';
    h += '<div class="tv-days-select">';
    [3,5,7,10].forEach(n=>{
      h += '<button class="tv-day-btn'+(trip.days===n?' selected':'')+'" onclick="TravelModule.setDays('+n+',this)">'+n+' days</button>';
    });
    h += '</div></div>';
    // Hotel selection
    h += '<div class="tv-planning glass-panel"><h3>🏨 Choose your hotel / Escolha seu hotel</h3><div class="tv-hotels">';
    d.hotels.forEach((ht,i)=>{
      h += '<div class="tv-hotel-card" onclick="TravelModule.selectHotel('+i+',this)">';
      h += '<div class="tv-hotel-stars">'+'⭐'.repeat(ht.stars)+'</div>';
      h += '<div class="tv-hotel-name">'+ht.name+'</div>';
      h += '<div class="tv-hotel-price">'+ht.price+' <span class="tv-pt">('+ht.pricePt+')</span></div></div>';
    });
    h += '</div></div>';
    h += '<button class="btn btn-primary btn-lg tv-btn-main" onclick="TravelModule.startJourney()" id="tv-btn-journey" disabled>🛫 Start Journey / Iniciar Viagem</button></div>';
    c.innerHTML = h;
  }

  function setDays(n, el){
    trip.days = n;
    document.querySelectorAll('.tv-day-btn').forEach(b=>b.classList.remove('selected'));
    el.classList.add('selected');
    checkJourneyReady();
  }

  function selectHotel(idx, el){
    trip.hotel = idx;
    document.querySelectorAll('.tv-hotel-card').forEach(b=>b.classList.remove('selected'));
    el.classList.add('selected');
    checkJourneyReady();
  }

  function checkJourneyReady(){
    const btn = document.getElementById('tv-btn-journey');
    if(btn) btn.disabled = (trip.hotel===null);
  }

  // ===== PHASE 2: Journey (Airport → Flight → Immigration → Hotel) =====
  function startJourney(){ trip.phase=2; renderAirport(); }

  function renderAirport(){
    const d = TRAVEL_DESTINATIONS[trip.dest];
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">FASE 2 — VIAGEM / JOURNEY</div>';
    h += instrBubble(trip.studentName+', estamos no aeroporto! Vamos praticar frases essenciais para viajar.');
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">🛫</div><h3>At the Airport / No Aeroporto</h3>';
    const phrases = [
      {en:"Excuse me, where is the check-in counter?", pt:"Com licença, onde é o balcão de check-in?"},
      {en:"I'd like a window seat, please.", pt:"Eu gostaria de um assento na janela, por favor."},
      {en:"Here is my passport and boarding pass.", pt:"Aqui está meu passaporte e cartão de embarque."},
      {en:"What gate is my flight departing from?", pt:"De qual portão meu voo vai sair?"},
      {en:"How long is the flight to "+d.name+"?", pt:"Quanto tempo é o voo para "+d.name+"?"},
      {en:"Is there Wi-Fi on board?", pt:"Tem Wi-Fi a bordo?"}
    ];
    phrases.forEach(p=>{
      h += '<div class="tv-phrase-card">';
      h += '<div class="tv-phrase-en">'+p.en+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+p.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-phrase-pt">'+p.pt+'</div></div>';
    });
    h += '</div>';
    // On the plane
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">✈️</div><h3>On the Plane / No Avião</h3>';
    const planeP = [
      {en:"Could I have some water, please?", pt:"Poderia me dar água, por favor?"},
      {en:"What time do we land?", pt:"A que horas nós pousamos?"},
      {en:"Excuse me, can I get past? I need to use the restroom.", pt:"Com licença, posso passar? Preciso usar o banheiro."},
      {en:"I'd like chicken with rice, please.", pt:"Eu gostaria de frango com arroz, por favor."}
    ];
    planeP.forEach(p=>{
      h += '<div class="tv-phrase-card">';
      h += '<div class="tv-phrase-en">'+p.en+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+p.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-phrase-pt">'+p.pt+'</div></div>';
    });
    h += '</div>';
    h += '<button class="btn btn-primary btn-lg tv-btn-main" onclick="TravelModule.renderImmigration()">🛬 Arriving — Immigration / Chegada — Imigração →</button></div>';
    c.innerHTML = h;
    c.scrollTo({top:0,behavior:'smooth'});
  }

  function renderImmigration(){
    const d = TRAVEL_DESTINATIONS[trip.dest];
    const imm = d.immigration;
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">FASE 2 — IMIGRAÇÃO / IMMIGRATION</div>';
    h += instrBubble(trip.studentName+', chegamos! Agora vem a imigração. Vou te ensinar a preencher o formulário e responder ao oficial.');
    // Immigration Form
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">🛂</div>';
    h += '<h3>'+imm.type+' — Immigration Form</h3>';
    h += '<p class="tv-subtitle">Preencha o formulário de imigração (pratique em inglês!)</p>';
    h += '<form class="tv-imm-form" id="tv-imm-form">';
    imm.fields.forEach((f,i)=>{
      h += '<div class="tv-form-group"><label>'+f+' <span class="tv-pt">('+imm.fieldsPt[i]+')</span></label>';
      h += '<input type="text" class="tv-form-input" placeholder="Type in English..."></div>';
    });
    h += '</form></div>';
    // Immigration Questions
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">👮</div>';
    h += '<h3>Immigration Officer Questions / Perguntas do Oficial</h3>';
    h += '<p class="tv-subtitle">Pratique as respostas — o oficial vai perguntar em inglês!</p>';
    imm.questions.forEach((q,i)=>{
      h += '<div class="tv-qa-card">';
      h += '<div class="tv-qa-q"><strong>Officer:</strong> '+q.q+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+q.q.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-qa-qpt">'+q.qPt+'</div>';
      h += '<div class="tv-qa-input-wrap"><input type="text" class="tv-qa-input" id="tv-qa-'+i+'" placeholder="Your answer in English..."></div>';
      h += '<button class="btn btn-sm tv-qa-check" onclick="TravelModule.checkAnswer('+i+')">Check ✓</button>';
      h += '<div class="tv-qa-answer" id="tv-qa-ans-'+i+'" style="display:none">';
      h += '<div class="tv-qa-a">✅ <strong>Suggested:</strong> '+q.a+'</div>';
      h += '<div class="tv-qa-apt">'+q.aPt+'</div></div></div>';
    });
    h += '</div>';
    h += '<button class="btn btn-primary btn-lg tv-btn-main" onclick="TravelModule.renderHotelCheckin()">🏨 Go to Hotel / Ir ao Hotel →</button></div>';
    c.innerHTML = h;
    c.scrollTo({top:0,behavior:'smooth'});
  }

  function checkAnswer(idx){
    document.getElementById('tv-qa-ans-'+idx).style.display='block';
    const input = document.getElementById('tv-qa-'+idx);
    if(input && input.value.trim().length>0) input.style.borderColor='var(--success)';
  }

  function renderHotelCheckin(){
    const d = TRAVEL_DESTINATIONS[trip.dest];
    const ht = d.hotels[trip.hotel||0];
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">FASE 2 — CHECK-IN NO HOTEL / HOTEL CHECK-IN</div>';
    h += instrBubble(trip.studentName+', chegamos ao '+ht.name+'! Vamos fazer o check-in em inglês.');
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">🏨</div>';
    h += '<h3>'+ht.name+' '+'⭐'.repeat(ht.stars)+'</h3>';
    const checkinP = [
      {en:"Hello, I have a reservation under the name [Your Name].", pt:"Olá, tenho uma reserva no nome de [Seu Nome]."},
      {en:"I'd like to check in, please.", pt:"Eu gostaria de fazer o check-in, por favor."},
      {en:"Could I have a room with a view?", pt:"Poderia ser um quarto com vista?"},
      {en:"What time is breakfast served?", pt:"A que horas o café da manhã é servido?"},
      {en:"Is there a gym or pool in the hotel?", pt:"Tem academia ou piscina no hotel?"},
      {en:"Could you call a taxi for me in the morning?", pt:"Poderia chamar um táxi para mim de manhã?"},
      {en:"What is the Wi-Fi password?", pt:"Qual é a senha do Wi-Fi?"}
    ];
    checkinP.forEach(p=>{
      h += '<div class="tv-phrase-card">';
      h += '<div class="tv-phrase-en">'+p.en+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+p.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-phrase-pt">'+p.pt+'</div></div>';
    });
    h += '</div>';
    h += '<button class="btn btn-primary btn-lg tv-btn-main" onclick="TravelModule.renderTourism()">🗺️ Start Tourism / Começar Turismo →</button></div>';
    c.innerHTML = h;
    c.scrollTo({top:0,behavior:'smooth'});
  }

  // ===== PHASE 3: Tourism =====
  function renderTourism(){
    trip.phase=3; trip.spotIdx=0;
    renderTouristSpot();
  }

  function renderTouristSpot(){
    const d = TRAVEL_DESTINATIONS[trip.dest];
    const spots = d.touristSpots;
    if(trip.spotIdx >= spots.length){ renderReturn(); return; }
    const spot = spots[trip.spotIdx];
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">FASE 3 — TURISMO / TOURISM ('+d.name+' — Dia '+(trip.spotIdx+1)+')</div>';
    h += instrBubble(trip.studentName+', hoje vamos visitar '+spot.name+'! Aprenda as frases para aproveitar ao máximo.');
    h += '<div class="tv-spot-card glass-panel">';
    h += '<div class="tv-spot-header"><h2>'+spot.name+'</h2><p class="tv-pt">'+spot.namePt+'</p></div>';
    h += '<div class="tv-spot-meta">';
    h += '<span>🎟️ '+spot.price+'</span><span>⏰ '+spot.time+'</span><span>📍 '+spot.distance+'</span></div>';
    // Ticket phrase
    h += '<div class="tv-ticket-box">';
    h += '<div class="tv-ticket-label">🎫 Buying Tickets / Comprando Ingressos</div>';
    h += '<div class="tv-phrase-card highlight">';
    h += '<div class="tv-phrase-en">'+spot.ticketEN+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+spot.ticketEN.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
    h += '<div class="tv-phrase-pt">'+spot.ticketPT+'</div></div></div>';
    // Useful phrases
    h += '<div class="tv-phrases-section"><h4>🗣️ Useful Phrases / Frases Úteis</h4>';
    spot.phrases.forEach(p=>{
      h += '<div class="tv-phrase-card">';
      h += '<div class="tv-phrase-en">'+p.en+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+p.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-phrase-pt">'+p.pt+'</div></div>';
    });
    h += '</div></div>';
    // Practice exercise
    h += '<div class="tv-practice glass-panel"><h4>✏️ Practice / Pratique</h4>';
    h += '<p class="tv-subtitle">Traduza para inglês:</p>';
    if(spot.phrases.length>0){
      const rp = spot.phrases[Math.floor(Math.random()*spot.phrases.length)];
      h += '<div class="tv-practice-q">'+rp.pt+'</div>';
      h += '<input type="text" class="tv-practice-input" id="tv-practice-input" placeholder="Type in English...">';
      h += '<button class="btn btn-primary tv-practice-btn" onclick="TravelModule.checkPractice(\''+rp.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">Check ✓</button>';
      h += '<div id="tv-practice-result" style="display:none"></div>';
    }
    h += '</div>';
    // Navigation
    h += '<div class="tv-spot-nav">';
    if(trip.spotIdx>0) h += '<button class="btn btn-ghost" onclick="TravelModule.prevSpot()">← Previous Spot</button>';
    if(trip.spotIdx < spots.length-1){
      h += '<button class="btn btn-primary btn-lg" onclick="TravelModule.nextSpot()">Next Spot → ('+ spots[trip.spotIdx+1].name+')</button>';
    } else {
      h += '<button class="btn btn-primary btn-lg" onclick="TravelModule.renderReturn()">🏠 Return Home / Voltar para Casa →</button>';
    }
    h += '</div></div>';
    c.innerHTML = h;
    c.scrollTo({top:0,behavior:'smooth'});
  }

  function nextSpot(){ trip.spotIdx++; renderTouristSpot(); }
  function prevSpot(){ if(trip.spotIdx>0){ trip.spotIdx--; renderTouristSpot(); } }

  function checkPractice(correct){
    const input = document.getElementById('tv-practice-input');
    const result = document.getElementById('tv-practice-result');
    if(!input||!result) return;
    result.style.display='block';
    const val = input.value.trim().toLowerCase();
    const exp = correct.toLowerCase();
    if(val===exp){
      result.innerHTML='<div class="tv-correct">✅ Perfect! Perfeito!</div>';
      input.style.borderColor='var(--success)';
    } else if(val.length>0 && exp.includes(val.substring(0,10))){
      result.innerHTML='<div class="tv-close">🟡 Close! Almost there!<br>✅ Correct: '+correct+'</div>';
      input.style.borderColor='var(--warm)';
    } else {
      result.innerHTML='<div class="tv-wrong">❌ Not quite.<br>✅ Correct: '+correct+'</div>';
      input.style.borderColor='var(--error)';
    }
  }

  // ===== PHASE 4: Return =====
  function renderReturn(){
    trip.phase=4;
    const d = TRAVEL_DESTINATIONS[trip.dest];
    const ht = d.hotels[trip.hotel||0];
    const c = getContainer();
    let h = '<div class="travel-module"><div class="tv-phase-label">FASE 4 — RETORNO / RETURN HOME</div>';
    h += instrBubble(trip.studentName+', que viagem incrível para '+d.name+'! Agora vamos voltar para o Brasil. Pratique as frases finais!');
    // Checkout
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">🏨</div><h3>Hotel Checkout</h3>';
    const checkoutP = [
      {en:"I'd like to check out, please.",pt:"Eu gostaria de fazer o checkout, por favor."},
      {en:"Can I have the bill, please?",pt:"Posso ver a conta, por favor?"},
      {en:"I had a wonderful stay. Thank you!",pt:"Tive uma estadia maravilhosa. Obrigado!"},
      {en:"Could you arrange a taxi to the airport?",pt:"Poderia providenciar um táxi para o aeroporto?"}
    ];
    checkoutP.forEach(p=>{
      h += '<div class="tv-phrase-card"><div class="tv-phrase-en">'+p.en+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+p.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-phrase-pt">'+p.pt+'</div></div>';
    });
    h += '</div>';
    // Airport return
    h += '<div class="tv-scene glass-panel"><div class="tv-scene-icon">🛫</div><h3>Return Flight / Voo de Volta</h3>';
    const retP = [
      {en:"I'm checking in for my flight back to Brazil.",pt:"Estou fazendo check-in para meu voo de volta ao Brasil."},
      {en:"Do I need to go through customs?",pt:"Preciso passar pela alfândega?"},
      {en:"I have nothing to declare.",pt:"Não tenho nada a declarar."},
      {en:"What a wonderful trip! I'll definitely come back.",pt:"Que viagem maravilhosa! Vou voltar com certeza."}
    ];
    retP.forEach(p=>{
      h += '<div class="tv-phrase-card"><div class="tv-phrase-en">'+p.en+' <button class="btn-speak-mini" onclick="TravelModule.speakText(\''+p.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">🔊</button></div>';
      h += '<div class="tv-phrase-pt">'+p.pt+'</div></div>';
    });
    h += '</div>';
    // Summary
    h += '<div class="tv-summary glass-panel"><div class="tv-summary-icon">🏆</div>';
    h += '<h3>Trip Complete! / Viagem Completa!</h3>';
    h += '<div class="tv-summary-stats">';
    h += '<div class="tv-stat"><div class="tv-stat-val">'+d.name+'</div><div class="tv-stat-lbl">Destination</div></div>';
    h += '<div class="tv-stat"><div class="tv-stat-val">'+trip.days+'</div><div class="tv-stat-lbl">Days</div></div>';
    h += '<div class="tv-stat"><div class="tv-stat-val">'+d.touristSpots.length+'</div><div class="tv-stat-lbl">Places Visited</div></div>';
    h += '<div class="tv-stat"><div class="tv-stat-val">50+</div><div class="tv-stat-lbl">Phrases Learned</div></div></div>';
    h += '<button class="btn btn-primary btn-lg" onclick="TravelModule.start(\''+trip.studentName+'\')">🔄 New Trip / Nova Viagem</button>';
    h += '</div></div>';
    c.innerHTML = h;
    c.scrollTo({top:0,behavior:'smooth'});
  }

  function speakText(t){ speakEN(t); }

  return {
    start, toggleInterest, findDestination, setDays, selectHotel,
    startJourney, renderImmigration, checkAnswer, renderHotelCheckin,
    renderTourism, nextSpot, prevSpot, checkPractice,
    renderReturn, speakText
  };
})();
