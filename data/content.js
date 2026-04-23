// FREE WORLD - English Mastery Course - Content Data
// Anti Gravity System L99

const PLACEMENT_QUESTIONS = [
  {q:'Choose the correct: "She ___ a teacher."',o:['am','is','are','be'],a:1,level:'A1'},
  {q:'What is the plural of "child"?',o:['childs','childes','children','childrens'],a:2,level:'A1'},
  {q:'"I ___ to school every day."',o:['go','goes','going','went'],a:0,level:'A1'},
  {q:'Choose: "They ___ watching TV now."',o:['is','am','are','was'],a:2,level:'A1'},
  {q:'"Where ___ you from?"',o:['is','are','do','does'],a:1,level:'A1'},
  {q:'"She has ___ been to Paris."',o:['ever','never','yet','already'],a:1,level:'A2'},
  {q:'"If I ___ rich, I would travel."',o:['am','was','were','be'],a:2,level:'B1'},
  {q:'"He suggested ___ early."',o:['leave','leaving','to leave','left'],a:1,level:'B1'},
  {q:'"The report ___ by the manager."',o:['wrote','was written','has wrote','writing'],a:1,level:'B2'},
  {q:'"I wish I ___ harder last year."',o:['studied','had studied','have studied','study'],a:1,level:'B2'},
  {q:'"Not until ___ home did I realize."',o:['I got','got I','did I get','I did get'],a:0,level:'C1'},
  {q:'"The proposal was met with ___ opposition."',o:['fierce','fiercely','ferocity','fierceness'],a:0,level:'C1'},
  {q:'"Had she ___ sooner, we would have left."',o:['arrive','arrived','arriving','been arrived'],a:1,level:'C1'},
  {q:'"The nuances of the debate were ___ appreciated."',o:['scarce','scarcely','scarcing','scarcity'],a:1,level:'C2'},
  {q:'"He acquiesced ___ their demands reluctantly."',o:['to','with','for','on'],a:0,level:'C2'}
];

const ACHIEVEMENTS = [
  {id:'first_lesson',icon:'🎓',name:'Primeira Lição',desc:'Complete sua primeira lição'},
  {id:'five_lessons',icon:'📚',name:'Estudante Dedicado',desc:'Complete 5 lições'},
  {id:'ten_lessons',icon:'🏅',name:'Mestre do Estudo',desc:'Complete 10 lições'},
  {id:'first_perfect',icon:'💯',name:'Perfeição',desc:'100% em exercícios'},
  {id:'streak_3',icon:'🔥',name:'Em Chamas',desc:'3 dias seguidos'},
  {id:'streak_7',icon:'⚡',name:'Imparável',desc:'7 dias seguidos'},
  {id:'vocab_50',icon:'📖',name:'Vocabulário Rico',desc:'Aprenda 50 palavras'},
  {id:'vocab_100',icon:'🧠',name:'Poliglota',desc:'Aprenda 100 palavras'},
  {id:'music_1',icon:'🎵',name:'Melômano',desc:'Complete 1 música'},
  {id:'all_a1',icon:'🌟',name:'A1 Completo',desc:'Complete o nível A1'}
];

const MUSIC_LIBRARY = [
  {
    id:'imagine',
    title:'Imagine',
    artist:'John Lennon',
    year:1971,
    cover:'🎹',
    story:{
      vinicius:"This song was written by John Lennon in 1971. It's one of the most famous songs in history. Lennon wrote it inspired by Yoko Ono's poetry book 'Grapefruit'. The song asks us to imagine a world without borders, without religions dividing people, and without possessions. It's a beautiful call for peace and unity.",
      storyPt:"Esta música foi escrita por John Lennon em 1971. É uma das músicas mais famosas da história. Lennon a escreveu inspirado no livro de poesia 'Grapefruit' de Yoko Ono. A música nos pede para imaginar um mundo sem fronteiras, sem religiões dividindo pessoas, e sem posses. É um belo apelo à paz e à unidade.",
      leticia:"When Lennon sat at his white piano in his Tittenhurst Park mansion, he created something timeless. The melody is simple but powerful. Notice how the piano carries the entire emotion of the song. Each verse builds on the idea of removing barriers between people."
    },
    lyrics:[
      {en:"Imagine there's no heaven",pt:"Imagine que não há paraíso"},
      {en:"It's easy if you try",pt:"É fácil se você tentar"},
      {en:"No hell below us",pt:"Nenhum inferno abaixo de nós"},
      {en:"Above us, only sky",pt:"Acima de nós, apenas o céu"},
      {en:"Imagine all the people",pt:"Imagine todas as pessoas"},
      {en:"Living for today",pt:"Vivendo o hoje"},
      {en:"Imagine there's no countries",pt:"Imagine que não há países"},
      {en:"It isn't hard to do",pt:"Não é difícil de fazer"},
      {en:"Nothing to kill or die for",pt:"Nada pelo qual matar ou morrer"},
      {en:"And no religion, too",pt:"E nenhuma religião também"},
      {en:"Imagine all the people",pt:"Imagine todas as pessoas"},
      {en:"Living life in peace",pt:"Vivendo a vida em paz"},
      {en:"You may say I'm a dreamer",pt:"Você pode dizer que sou um sonhador"},
      {en:"But I'm not the only one",pt:"Mas não sou o único"},
      {en:"I hope someday you'll join us",pt:"Espero que um dia você se junte a nós"},
      {en:"And the world will be as one",pt:"E o mundo será como um só"}
    ],
    vocabulary:[
      {word:'imagine',ipa:'/ɪˈmædʒ.ɪn/',pt:'imaginar',ex:'Imagine a world without war.'},
      {word:'heaven',ipa:'/ˈhev.ən/',pt:'paraíso/céu',ex:'Some believe in heaven.'},
      {word:'below',ipa:'/bɪˈloʊ/',pt:'abaixo',ex:'The temperature is below zero.'},
      {word:'countries',ipa:'/ˈkʌn.triz/',pt:'países',ex:'I want to visit many countries.'},
      {word:'dreamer',ipa:'/ˈdriː.mər/',pt:'sonhador',ex:'He is a dreamer.'},
      {word:'peace',ipa:'/piːs/',pt:'paz',ex:'We all want peace.'}
    ],
    exercises:[
      {type:'fill',q:'Complete: "Imagine there\'s no ___"',a:'heaven',hint:'paraíso'},
      {type:'fill',q:'Complete: "You may say I\'m a ___"',a:'dreamer',hint:'sonhador'},
      {type:'mc',q:'What does "above us, only sky" mean?',o:['Acima de nós, só o céu','Debaixo de nós, só o céu','Ao lado do céu','Perto do céu'],a:0},
      {type:'translate',q:'Translate: "Living life in peace"',a:'Vivendo a vida em paz'}
    ]
  },
  {
    id:'yesterday',
    title:'Yesterday',
    artist:'The Beatles',
    year:1965,
    cover:'🎸',
    story:{
      vinicius:"Paul McCartney woke up one morning with this melody in his head. He was so convinced he had heard it somewhere that he spent weeks asking people if they recognized it. When no one did, he realized he had composed one of the most covered songs in history — over 2,200 versions exist! The working title was 'Scrambled Eggs' because he used those words as placeholder lyrics.",
      storyPt:"Paul McCartney acordou uma manhã com esta melodia na cabeça. Ele estava tão convencido de que a tinha ouvido em algum lugar que passou semanas perguntando às pessoas se a reconheciam. Quando ninguém reconheceu, ele percebeu que tinha composto uma das músicas mais regravadas da história — mais de 2.200 versões existem! O título provisório era 'Scrambled Eggs' porque ele usou essas palavras como letras provisórias.",
      leticia:"The beauty of this song lies in its simplicity. It uses basic past tense structures that are perfect for English learners. Notice the contrast between 'yesterday' (past) and 'now' (present). McCartney's voice carries a melancholy that transcends language barriers."
    },
    lyrics:[
      {en:"Yesterday, all my troubles seemed so far away",pt:"Ontem, todos os meus problemas pareciam tão distantes"},
      {en:"Now it looks as though they're here to stay",pt:"Agora parece que eles vieram para ficar"},
      {en:"Oh, I believe in yesterday",pt:"Oh, eu acredito no ontem"},
      {en:"Suddenly, I'm not half the man I used to be",pt:"De repente, não sou nem metade do homem que eu era"},
      {en:"There's a shadow hanging over me",pt:"Há uma sombra pairando sobre mim"},
      {en:"Oh, yesterday came suddenly",pt:"Oh, o ontem veio de repente"},
      {en:"Why she had to go, I don't know",pt:"Por que ela teve que ir, eu não sei"},
      {en:"She wouldn't say",pt:"Ela não quis dizer"},
      {en:"I said something wrong",pt:"Eu disse algo errado"},
      {en:"Now I long for yesterday",pt:"Agora eu anseio pelo ontem"}
    ],
    vocabulary:[
      {word:'yesterday',ipa:'/ˈjes.tɚ.deɪ/',pt:'ontem',ex:'I saw her yesterday.'},
      {word:'troubles',ipa:'/ˈtrʌb.əlz/',pt:'problemas',ex:'He has many troubles.'},
      {word:'suddenly',ipa:'/ˈsʌd.ən.li/',pt:'de repente',ex:'Suddenly, it started to rain.'},
      {word:'shadow',ipa:'/ˈʃæd.oʊ/',pt:'sombra',ex:'The shadow is getting longer.'},
      {word:'believe',ipa:'/bɪˈliːv/',pt:'acreditar',ex:'I believe in you.'}
    ],
    exercises:[
      {type:'fill',q:'Complete: "All my ___ seemed so far away"',a:'troubles',hint:'problemas'},
      {type:'mc',q:'What does "I\'m not half the man I used to be" mean?',o:['Não sou nem metade do homem que eu era','Sou o dobro do homem','Sou metade homem','Nunca fui homem'],a:0},
      {type:'fill',q:'Complete: "___, I\'m not half the man I used to be"',a:'Suddenly',hint:'de repente'},
      {type:'translate',q:'Translate: "I said something wrong"',a:'Eu disse algo errado'}
    ]
  },
  {
    id:'hello',
    title:'Hello',
    artist:'Adele',
    year:2015,
    cover:'🎤',
    story:{
      vinicius:"Adele wrote 'Hello' after a period of silence. She had taken a three-year break from music to focus on her personal life. When she returned, this was the first song the world heard. It broke records everywhere — the music video reached one billion views faster than any other video in YouTube history at the time. The song is about trying to reconnect with someone from her past.",
      storyPt:"Adele escreveu 'Hello' após um período de silêncio. Ela fez uma pausa de três anos da música para focar em sua vida pessoal. Quando voltou, esta foi a primeira música que o mundo ouviu. Quebrou recordes em todo lugar — o clipe alcançou um bilhão de visualizações mais rápido do que qualquer outro vídeo na história do YouTube na época. A música é sobre tentar se reconectar com alguém do seu passado.",
      leticia:"Pay attention to how Adele uses conditional structures: 'I was wondering if after all these years you'd like to meet.' This is a perfect example of polite, formal English. Also notice the phone call metaphor — she's calling from 'the other side,' which means from a different place in her life."
    },
    lyrics:[
      {en:"Hello, it's me",pt:"Olá, sou eu"},
      {en:"I was wondering if after all these years",pt:"Eu estava pensando se depois de todos esses anos"},
      {en:"You'd like to meet",pt:"Você gostaria de se encontrar"},
      {en:"To go over everything",pt:"Para conversar sobre tudo"},
      {en:"They say that time's supposed to heal ya",pt:"Dizem que o tempo deveria te curar"},
      {en:"But I ain't done much healing",pt:"Mas eu não me curei muito"},
      {en:"Hello from the other side",pt:"Olá do outro lado"},
      {en:"I must've called a thousand times",pt:"Eu devo ter ligado mil vezes"},
      {en:"To tell you I'm sorry",pt:"Para te dizer que sinto muito"},
      {en:"For everything that I've done",pt:"Por tudo que eu fiz"},
      {en:"But when I call, you never seem to be home",pt:"Mas quando eu ligo, você nunca parece estar em casa"},
      {en:"Hello from the outside",pt:"Olá de fora"},
      {en:"At least I can say that I've tried",pt:"Pelo menos posso dizer que tentei"}
    ],
    vocabulary:[
      {word:'wondering',ipa:'/ˈwʌn.dɚ.ɪŋ/',pt:'pensando/imaginando',ex:'I was wondering about you.'},
      {word:'heal',ipa:'/hiːl/',pt:'curar',ex:'Time will heal the wound.'},
      {word:'sorry',ipa:'/ˈsɑːr.i/',pt:'desculpa/sentir muito',ex:'I am sorry for the mistake.'},
      {word:'outside',ipa:'/ˌaʊtˈsaɪd/',pt:'do lado de fora',ex:'Wait for me outside.'},
      {word:'tried',ipa:'/traɪd/',pt:'tentei',ex:'I tried my best.'}
    ],
    exercises:[
      {type:'fill',q:'Complete: "Hello from the other ___"',a:'side',hint:'lado'},
      {type:'mc',q:'What does "I ain\'t done much healing" mean?',o:['Eu não me curei muito','Eu estou curado','Eu curei outras pessoas','Eu sou médico'],a:0},
      {type:'translate',q:'Translate: "At least I can say that I\'ve tried"',a:'Pelo menos posso dizer que tentei'},
      {type:'fill',q:'Complete: "I must\'ve called a ___ times"',a:'thousand',hint:'mil'}
    ]
  }
];

const COURSE_DATA = {
  A1: {
    title:'Iniciante / Beginner',
    description:'Fundamentos do inglês para o dia a dia',
    modules:[
      {
        id:'a1m1',title:'Greetings & Introductions',titlePt:'Saudações e Apresentações',icon:'👋',
        theme:'Chegando em uma cafeteria em São Paulo',
        lessons:[
          {
            id:'a1m1l1',title:'Hello! Nice to Meet You!',titlePt:'Olá! Prazer em Conhecer Você!',
            instructor:'vinicius',
            intro:{
              text:"Welcome to FREE WORLD! I'm Vinicius, your English instructor. Today, we're starting with the most important thing in any language: how to greet people and introduce yourself. Let's imagine you just walked into a modern café in São Paulo and you need to order in English.",
              textPt:"Bem-vindo ao FREE WORLD! Eu sou o Vinicius, seu instrutor de inglês. Hoje, vamos começar com a coisa mais importante em qualquer idioma: como cumprimentar pessoas e se apresentar. Vamos imaginar que você acabou de entrar em uma cafeteria moderna em São Paulo e precisa pedir em inglês.",
              visual:"A modern, cozy café in São Paulo with large windows, wooden tables, and warm lighting. A friendly barista smiles behind the counter."
            },
            vocabulary:[
              {word:'Hello',ipa:'/həˈloʊ/',pt:'Olá',ex:'Hello! How are you?',exPt:'Olá! Como você está?'},
              {word:'Good morning',ipa:'/ɡʊd ˈmɔːr.nɪŋ/',pt:'Bom dia',ex:'Good morning! Nice day, right?',exPt:'Bom dia! Belo dia, né?'},
              {word:'My name is...',ipa:'/maɪ neɪm ɪz/',pt:'Meu nome é...',ex:'My name is Vinicius.',exPt:'Meu nome é Vinicius.'},
              {word:'Nice to meet you',ipa:'/naɪs tə miːt juː/',pt:'Prazer em conhecer você',ex:'Hi! Nice to meet you!',exPt:'Oi! Prazer em conhecer você!'},
              {word:'How are you?',ipa:'/haʊ ɑːr juː/',pt:'Como você está?',ex:'Hello! How are you today?',exPt:'Olá! Como você está hoje?'},
              {word:'I am fine',ipa:'/aɪ æm faɪn/',pt:'Eu estou bem',ex:'I am fine, thank you!',exPt:'Eu estou bem, obrigado!'},
              {word:'Thank you',ipa:'/θæŋk juː/',pt:'Obrigado(a)',ex:'Thank you very much!',exPt:'Muito obrigado!'},
              {word:'Please',ipa:'/pliːz/',pt:'Por favor',ex:'A coffee, please.',exPt:'Um café, por favor.'}
            ],
            grammar:{
              title:'The Verb TO BE — Present Tense',
              titlePt:'O Verbo TO BE — Presente',
              explanation:'O verbo "to be" (ser/estar) é o verbo mais importante do inglês. Ele muda conforme a pessoa:',
              table:[
                ['I','am','I am a student. (Eu sou um estudante.)'],
                ['You','are','You are my friend. (Você é meu amigo.)'],
                ['He/She/It','is','She is beautiful. (Ela é bonita.)'],
                ['We','are','We are happy. (Nós estamos felizes.)'],
                ['They','are','They are here. (Eles estão aqui.)']
              ],
              tip:'Em inglês informal, usamos contrações: I\'m, you\'re, he\'s, she\'s, we\'re, they\'re.'
            },
            dialogue:[
              {speaker:'vinicius',text:'Hello! Welcome to this beautiful café!',textPt:'Olá! Bem-vindo a esta linda cafeteria!'},
              {speaker:'Leticia',text:'Hi there! My name is leticia. What\'s your name?',textPt:'Oi! Meu nome é leticia. Qual é o seu nome?'},
              {speaker:'vinicius',text:'I\'m Vinicius. Nice to meet you, leticia!',textPt:'Eu sou Vinicius. Prazer em conhecer você, leticia!'},
              {speaker:'Leticia',text:'Nice to meet you too! How are you today?',textPt:'Prazer em conhecer você também! Como você está hoje?'},
              {speaker:'vinicius',text:'I\'m great, thank you! Would you like a coffee?',textPt:'Estou ótimo, obrigado! Você gostaria de um café?'},
              {speaker:'Leticia',text:'Yes, please! A cappuccino, please.',textPt:'Sim, por favor! Um cappuccino, por favor.'}
            ],
            pronunciation:[
              {word:'Hello',ipa:'/həˈloʊ/',tip:'O "H" é aspirado (soprado). Diga "rê-LÔU". O "e" soa como um "ê" fraco.',breakdown:'hə-LOH'},
              {word:'Thank',ipa:'/θæŋk/',tip:'O "TH" é o som mais difícil! Coloque a língua entre os dentes e sopre. Soa como um "F" com a língua para fora.',breakdown:'THANK'},
              {word:'Please',ipa:'/pliːz/',tip:'O "ea" soa como "ii" longo. O "s" final soa como "Z".',breakdown:'PLIIZ'}
            ],
            cultural:{
              title:'Greetings Around the English-Speaking World',
              titlePt:'Cumprimentos pelo Mundo Anglófono',
              text:'In the US, people often say "Hi!" or "Hey!" casually. In the UK, "Hello" and "How do you do?" are more common. In Australia, "G\'day!" (Good day) is the classic greeting. In business, always use "Good morning/afternoon" for a professional impression.',
              textPt:'Nos EUA, as pessoas frequentemente dizem "Hi!" ou "Hey!" de forma casual. No Reino Unido, "Hello" e "How do you do?" são mais comuns. Na Austrália, "G\'day!" (Bom dia) é o cumprimento clássico. Nos negócios, sempre use "Good morning/afternoon" para uma impressão profissional.'
            },
            exercises:[
              {type:'mc',question:'How do you say "Meu nome é João" in English?',options:['My name is João','I name João','João is my name is','Name my is João'],correct:0,explanation:'We use "My name is..." to introduce ourselves.'},
              {type:'mc',question:'Choose the correct form: "She ___ a teacher."',options:['am','is','are','be'],correct:1,explanation:'"She" uses "is" — She is a teacher.'},
              {type:'fill',sentence:'Hello! I ___ Vinicius. Nice to ___ you!',blanks:['am','meet'],hints:['verbo to be para I','conhecer']},
              {type:'order',words:['name','My','is','Leticia'],correct:'My name is leticia',translation:'Meu nome é leticia'},
              {type:'mc',question:'What is the correct greeting for morning?',options:['Good night','Good morning','Good bye','Good luck'],correct:1,explanation:'"Good morning" is used until around noon.'},
              {type:'fill',sentence:'How ___ you? I ___ fine, thank you!',blanks:['are','am'],hints:['verbo to be para You','verbo to be para I']}
            ]
          },
          {
            id:'a1m1l2',title:'Where Are You From?',titlePt:'De Onde Você É?',
            instructor:'Leticia',
            intro:{
              text:"Hey! It's me, leticia! Today we're going to learn how to talk about where we're from and our nationalities. This is one of the first things people ask when they meet someone new. Let's practice!",
              textPt:"Oi! Sou eu, leticia! Hoje vamos aprender como falar sobre de onde somos e nossas nacionalidades. Esta é uma das primeiras coisas que as pessoas perguntam quando conhecem alguém novo. Vamos praticar!",
              visual:"A colorful world map on a café wall, with small flags pinned to different countries. Two people pointing at Brazil and the United States."
            },
            vocabulary:[
              {word:'Where',ipa:'/wer/',pt:'Onde',ex:'Where are you from?',exPt:'De onde você é?'},
              {word:'Country',ipa:'/ˈkʌn.tri/',pt:'País',ex:'Brazil is a big country.',exPt:'Brasil é um país grande.'},
              {word:'City',ipa:'/ˈsɪt.i/',pt:'Cidade',ex:'São Paulo is a big city.',exPt:'São Paulo é uma cidade grande.'},
              {word:'Brazilian',ipa:'/brəˈzɪl.i.ən/',pt:'Brasileiro(a)',ex:'I am Brazilian.',exPt:'Eu sou brasileiro(a).'},
              {word:'American',ipa:'/əˈmer.ɪ.kən/',pt:'Americano(a)',ex:'She is American.',exPt:'Ela é americana.'},
              {word:'Language',ipa:'/ˈlæŋ.ɡwɪdʒ/',pt:'Idioma',ex:'English is a global language.',exPt:'Inglês é um idioma global.'},
              {word:'I speak...',ipa:'/aɪ spiːk/',pt:'Eu falo...',ex:'I speak Portuguese and English.',exPt:'Eu falo português e inglês.'},
              {word:'I live in...',ipa:'/aɪ lɪv ɪn/',pt:'Eu moro em...',ex:'I live in São Paulo.',exPt:'Eu moro em São Paulo.'}
            ],
            grammar:{
              title:'Questions with WHERE, WHAT, WHO',
              titlePt:'Perguntas com WHERE, WHAT, WHO',
              explanation:'Para fazer perguntas em inglês, usamos palavras interrogativas + verbo auxiliar:',
              table:[
                ['Where','Onde','Where are you from? (De onde você é?)'],
                ['What','O que/Qual','What is your name? (Qual é seu nome?)'],
                ['Who','Quem','Who is she? (Quem é ela?)'],
                ['How','Como','How are you? (Como você está?)'],
                ['When','Quando','When is your birthday? (Quando é seu aniversário?)']
              ],
              tip:'A ordem é: Question Word + Verb (to be) + Subject. Where ARE YOU from?'
            },
            dialogue:[
              {speaker:'Leticia',text:'So, where are you from?',textPt:'Então, de onde você é?'},
              {speaker:'vinicius',text:'I\'m from London, but I live in São Paulo now.',textPt:'Sou de Londres, mas moro em São Paulo agora.'},
              {speaker:'Leticia',text:'Oh, nice! I\'m from Rio de Janeiro. I\'m Brazilian.',textPt:'Ah, legal! Sou do Rio de Janeiro. Sou brasileira.'},
              {speaker:'vinicius',text:'Do you speak English at home?',textPt:'Você fala inglês em casa?'},
              {speaker:'Leticia',text:'No, I speak Portuguese at home. But I study English every day!',textPt:'Não, falo português em casa. Mas estudo inglês todo dia!'},
              {speaker:'vinicius',text:'That\'s wonderful! Practice makes perfect!',textPt:'Isso é maravilhoso! A prática leva à perfeição!'}
            ],
            pronunciation:[
              {word:'Where',ipa:'/wer/',tip:'O "WH" soa como um "U" rápido. NÃO pronuncie o H separado.',breakdown:'UERR'},
              {word:'Country',ipa:'/ˈkʌn.tri/',tip:'O "ou" soa como "Ã". "Country" soa como "CÃN-tri".',breakdown:'KAN-tree'},
              {word:'Language',ipa:'/ˈlæŋ.ɡwɪdʒ/',tip:'Três sílabas: "LÊN-gui-dj". O "g" final soa como "DJ".',breakdown:'LANG-gwij'}
            ],
            cultural:{
              title:'Nationalities in English',
              titlePt:'Nacionalidades em Inglês',
              text:'In English, nationalities are always capitalized: Brazilian, American, Japanese. It\'s considered rude to ask "What are you?" — always say "Where are you from?" Also, Americans often say their state instead of their country: "I\'m from Texas" instead of "I\'m from the United States."',
              textPt:'Em inglês, nacionalidades sempre começam com maiúscula: Brazilian, American, Japanese. É considerado rude perguntar "What are you?" — sempre diga "Where are you from?" Além disso, americanos frequentemente dizem seu estado ao invés do país: "I\'m from Texas" em vez de "I\'m from the United States."'
            },
            exercises:[
              {type:'mc',question:'"De onde você é?" em inglês é:',options:['Where are you from?','Where you are from?','From where you are?','You are where from?'],correct:0,explanation:'A ordem correta é: Where + are + you + from?'},
              {type:'fill',sentence:'I ___ from Brazil. I ___ Brazilian.',blanks:['am','am'],hints:['verbo to be','verbo to be']},
              {type:'mc',question:'Choose: "She ___ in New York."',options:['live','lives','living','lived'],correct:1,explanation:'"She" usa "lives" (terceira pessoa do singular).'},
              {type:'order',words:['from','are','Where','you','?'],correct:'Where are you from?',translation:'De onde você é?'},
              {type:'mc',question:'How do you say "Eu falo português" in English?',options:['I speak Portuguese','I talk Portuguese','I say Portuguese','I tell Portuguese'],correct:0,explanation:'"Speak" is the verb for languages.'},
              {type:'fill',sentence:'What ___ is São Paulo in? São Paulo ___ in Brazil.',blanks:['country','is'],hints:['país','verbo to be']}
            ]
          }
        ]
      },
      {
        id:'a1m2',title:'Numbers, Dates & Time',titlePt:'Números, Datas e Horas',icon:'🔢',
        theme:'Reservando um hotel para férias',
        lessons:[
          {
            id:'a1m2l1',title:'Let\'s Count! Numbers 1-100',titlePt:'Vamos Contar! Números de 1 a 100',
            instructor:'vinicius',
            intro:{
              text:"Numbers are everywhere! You need them to tell time, give your phone number, pay for things, and so much more. Today, we'll master numbers from 1 to 100. I promise — it's easier than you think!",
              textPt:"Números estão em todo lugar! Você precisa deles para dizer as horas, dar seu número de telefone, pagar por coisas, e muito mais. Hoje, vamos dominar os números de 1 a 100. Eu prometo — é mais fácil do que você pensa!",
              visual:"A hotel reception desk with a digital clock showing 10:30, room key cards with numbers, and a calendar on the wall."
            },
            vocabulary:[
              {word:'One, Two, Three',ipa:'/wʌn, tuː, θriː/',pt:'Um, Dois, Três',ex:'I have three brothers.',exPt:'Eu tenho três irmãos.'},
              {word:'Ten, Twenty, Thirty',ipa:'/ten, ˈtwen.ti, ˈθɜːr.ti/',pt:'Dez, Vinte, Trinta',ex:'The hotel costs thirty dollars.',exPt:'O hotel custa trinta dólares.'},
              {word:'Hundred',ipa:'/ˈhʌn.drəd/',pt:'Cem/Cento',ex:'One hundred percent!',exPt:'Cem por cento!'},
              {word:'Phone number',ipa:'/foʊn ˈnʌm.bər/',pt:'Número de telefone',ex:'What\'s your phone number?',exPt:'Qual é seu número de telefone?'},
              {word:'How much?',ipa:'/haʊ mʌtʃ/',pt:'Quanto custa?',ex:'How much is this room?',exPt:'Quanto custa este quarto?'},
              {word:'Room',ipa:'/ruːm/',pt:'Quarto',ex:'I need a room for two nights.',exPt:'Preciso de um quarto por duas noites.'}
            ],
            grammar:{
              title:'Numbers Pattern in English',
              titlePt:'Padrão dos Números em Inglês',
              explanation:'Os números em inglês seguem um padrão lógico depois do 20:',
              table:[
                ['1-12','Únicos','one, two, three... twelve (memorize!)'],
                ['13-19','"-teen"','thirteen, fourteen... nineteen'],
                ['20-90','"-ty"','twenty, thirty, forty... ninety'],
                ['21-99','Combo','twenty-one, thirty-five, ninety-nine'],
                ['100','Hundred','one hundred, two hundred...']
              ],
              tip:'Cuidado: 13 = thirteen (não threeteen!), 15 = fifteen (não fiveteen!), 50 = fifty (não fivety!)'
            },
            dialogue:[
              {speaker:'vinicius',text:'Good afternoon! I\'d like to book a room, please.',textPt:'Boa tarde! Eu gostaria de reservar um quarto, por favor.'},
              {speaker:'Leticia',text:'Of course! For how many nights?',textPt:'Claro! Por quantas noites?'},
              {speaker:'vinicius',text:'Three nights. From Monday to Thursday.',textPt:'Três noites. De segunda a quinta.'},
              {speaker:'Leticia',text:'Perfect. A single room is eighty-five dollars per night.',textPt:'Perfeito. Um quarto de solteiro é oitenta e cinco dólares por noite.'},
              {speaker:'vinicius',text:'How much is that in total?',textPt:'Quanto é isso no total?'},
              {speaker:'Leticia',text:'That\'s two hundred and fifty-five dollars total.',textPt:'São duzentos e cinquenta e cinco dólares no total.'}
            ],
            pronunciation:[
              {word:'Three',ipa:'/θriː/',tip:'Lembre-se do "TH"! Língua entre os dentes. NÃO é "free" ou "tree".',breakdown:'THREE'},
              {word:'Thirteen vs Thirty',ipa:'/ˌθɜːrˈtiːn/ vs /ˈθɜːr.ti/',tip:'thirTEEN (acento no final) vs THIRty (acento no início). A diferença de acento muda o número!',breakdown:'thir-TEEN vs THIR-tee'}
            ],
            cultural:{
              title:'Numbers & Culture',
              titlePt:'Números e Cultura',
              text:'In the US, the ground floor is the "first floor" (not "ground floor" like in the UK). Americans use commas for thousands (1,000) and periods for decimals (3.14), which is the opposite of Brazil! Also, 13 is considered an unlucky number — many buildings skip the 13th floor.',
              textPt:'Nos EUA, o térreo é o "first floor" (não "ground floor" como no Reino Unido). Americanos usam vírgulas para milhares (1,000) e pontos para decimais (3.14), que é o oposto do Brasil! Além disso, 13 é considerado um número de azar — muitos prédios pulam o 13º andar.'
            },
            exercises:[
              {type:'mc',question:'How do you write 47 in English?',options:['Fourty-seven','Forty-seven','Fortyseven','Four-seven'],correct:1,explanation:'"Forty" (not "fourty"!) + "seven" = forty-seven.'},
              {type:'fill',sentence:'The room costs ___ dollars per night. (85)',blanks:['eighty-five'],hints:['80 + 5']},
              {type:'mc',question:'What number is "seventy-three"?',options:['37','73','63','83'],correct:1,explanation:'Seventy = 70, three = 3, so seventy-three = 73.'},
              {type:'order',words:['is','How','room','much','the','?'],correct:'How much is the room?',translation:'Quanto custa o quarto?'},
              {type:'mc',question:'"I need a room for ___ nights." (2)',options:['two','too','to','tow'],correct:0,explanation:'"Two" = 2. "Too" = também/demais. "To" = para.'},
              {type:'fill',sentence:'My phone number is 555-___-___. (12, 34)',blanks:['twelve','thirty-four'],hints:['12','34']}
            ]
          }
        ]
      },
      {
        id:'a1m3',title:'Food & Restaurant',titlePt:'Comida e Restaurante',icon:'🍕',
        theme:'Jantar em um restaurante internacional',
        lessons:[
          {
            id:'a1m3l1',title:'I\'d Like to Order, Please',titlePt:'Eu Gostaria de Pedir, Por Favor',
            instructor:'Leticia',
            intro:{
              text:"Food is one of the best ways to learn a language! Today, we'll learn how to read a menu, order food, and talk about what you like and don't like to eat. Ready? Let's go to a restaurant!",
              textPt:"Comida é uma das melhores formas de aprender um idioma! Hoje, vamos aprender como ler um cardápio, pedir comida, e falar sobre o que você gosta e não gosta de comer. Pronto? Vamos a um restaurante!",
              visual:"An elegant restaurant interior with warm lighting, white tablecloths, and a beautifully presented menu on the table. A waiter approaches with a smile."
            },
            vocabulary:[
              {word:'Menu',ipa:'/ˈmen.juː/',pt:'Cardápio',ex:'Can I see the menu, please?',exPt:'Posso ver o cardápio, por favor?'},
              {word:'Appetizer',ipa:'/ˈæp.ə.taɪ.zər/',pt:'Entrada/Aperitivo',ex:'I\'d like an appetizer first.',exPt:'Eu gostaria de uma entrada primeiro.'},
              {word:'Main course',ipa:'/meɪn kɔːrs/',pt:'Prato principal',ex:'For the main course, I\'ll have steak.',exPt:'De prato principal, vou querer bife.'},
              {word:'Dessert',ipa:'/dɪˈzɜːrt/',pt:'Sobremesa',ex:'What do you have for dessert?',exPt:'O que vocês têm de sobremesa?'},
              {word:'Beverage',ipa:'/ˈbev.ər.ɪdʒ/',pt:'Bebida',ex:'Any beverages for you?',exPt:'Alguma bebida para você?'},
              {word:'The bill/check',ipa:'/ðə bɪl/',pt:'A conta',ex:'Can I have the bill, please?',exPt:'Posso pedir a conta, por favor?'}
            ],
            grammar:{
              title:'I\'D LIKE vs I WANT',
              titlePt:'I\'D LIKE vs I WANT',
              explanation:'"I\'d like" (eu gostaria) é muito mais educado que "I want" (eu quero). Em restaurantes, SEMPRE use "I\'d like":',
              table:[
                ['Educado','I\'d like...','I\'d like a coffee, please. ✓'],
                ['Casual','I want...','I want a coffee. (OK com amigos)'],
                ['Muito educado','Could I have...','Could I have the menu? ✓✓'],
                ['Pergunta','Would you like...','Would you like some water?']
              ],
              tip:'"I\'d like" = "I would like". A contração "\'d" é essencial no inglês falado!'
            },
            dialogue:[
              {speaker:'Leticia',text:'Good evening! Table for two, please.',textPt:'Boa noite! Mesa para dois, por favor.'},
              {speaker:'vinicius',text:'Right this way. Here\'s the menu.',textPt:'Por aqui, por favor. Aqui está o cardápio.'},
              {speaker:'Leticia',text:'Thank you! I\'d like a glass of water to start.',textPt:'Obrigada! Eu gostaria de um copo de água para começar.'},
              {speaker:'vinicius',text:'Of course. Are you ready to order?',textPt:'Claro. Você está pronta para pedir?'},
              {speaker:'Leticia',text:'Yes! I\'d like the grilled chicken with salad, please.',textPt:'Sim! Eu gostaria do frango grelhado com salada, por favor.'},
              {speaker:'vinicius',text:'Excellent choice! And for dessert?',textPt:'Excelente escolha! E de sobremesa?'},
              {speaker:'Leticia',text:'I\'ll have the chocolate cake. It looks delicious!',textPt:'Vou querer o bolo de chocolate. Parece delicioso!'}
            ],
            pronunciation:[
              {word:'Dessert',ipa:'/dɪˈzɜːrt/',tip:'Cuidado! "Dessert" (sobremesa) = dê-ZÊRT. "Desert" (deserto) = DÉ-zert. A posição do acento muda o significado!',breakdown:'dih-ZURT'},
              {word:'Would',ipa:'/wʊd/',tip:'O "L" é MUDO! Pronuncie "uud", não "uôld".',breakdown:'WOOD'},
              {word:'Chicken',ipa:'/ˈtʃɪk.ɪn/',tip:'Começa com o som "TCH" como em "tchau".',breakdown:'CHIK-in'}
            ],
            cultural:{
              title:'Tipping Culture',
              titlePt:'Cultura da Gorjeta',
              text:'In the United States, tipping is not optional — it\'s expected! The standard tip at restaurants is 15-20% of the total bill. In the UK, 10-15% is common. In many Asian countries, tipping can be considered rude. Always research the local custom before you travel!',
              textPt:'Nos Estados Unidos, gorjeta NÃO é opcional — é esperada! A gorjeta padrão em restaurantes é 15-20% do total da conta. No Reino Unido, 10-15% é comum. Em muitos países asiáticos, dar gorjeta pode ser considerado rude. Sempre pesquise o costume local antes de viajar!'
            },
            exercises:[
              {type:'mc',question:'The polite way to order food is:',options:['I want chicken!','Give me chicken!','I\'d like the chicken, please.','Chicken for me!'],correct:2,explanation:'"I\'d like..., please" is the most polite way to order.'},
              {type:'fill',sentence:'Good evening! I\'d ___ a table for ___, please.',blanks:['like','two'],hints:['gostaria','número de pessoas']},
              {type:'mc',question:'"Can I have the bill?" means:',options:['Posso ter a lista?','Posso pedir a conta?','Posso ter o cardápio?','Posso ter o prato?'],correct:1,explanation:'"The bill" or "the check" = a conta do restaurante.'},
              {type:'order',words:['like','the','I\'d','please','chicken',','],correct:'I\'d like the chicken, please',translation:'Eu gostaria do frango, por favor'},
              {type:'mc',question:'What is "sobremesa" in English?',options:['Desert','Dessert','Deserve','Design'],correct:1,explanation:'"Dessert" (two S\'s) = sobremesa. "Desert" (one S) = deserto.'},
              {type:'fill',sentence:'Would you ___ something to ___?',blanks:['like','drink'],hints:['gostaria','beber']}
            ]
          }
        ]
      }
    ]
  },
  A2: {
    title:'Elementar / Elementary',description:'Expandindo suas habilidades para situações cotidianas',
    modules:[
      {id:'a2m1',title:'Travel & Transportation',titlePt:'Viagens e Transporte',icon:'✈️',theme:'Planejando uma viagem internacional',
        lessons:[{
          id:'a2m1l1',title:'Booking a Flight',titlePt:'Reservando um Voo',instructor:'vinicius',
          intro:{text:"Today we're going to learn essential vocabulary for traveling. Imagine you're at an airport, ready to explore the world!",textPt:"Hoje vamos aprender vocabulário essencial para viagens. Imagine que você está em um aeroporto, pronto para explorar o mundo!",visual:"A busy international airport terminal with departure boards, travelers with luggage, and large windows showing airplanes."},
          vocabulary:[
            {word:'Airport',ipa:'/ˈer.pɔːrt/',pt:'Aeroporto',ex:'The airport is very big.',exPt:'O aeroporto é muito grande.'},
            {word:'Flight',ipa:'/flaɪt/',pt:'Voo',ex:'My flight is at 3 PM.',exPt:'Meu voo é às 15h.'},
            {word:'Passport',ipa:'/ˈpæs.pɔːrt/',pt:'Passaporte',ex:'Don\'t forget your passport!',exPt:'Não esqueça seu passaporte!'},
            {word:'Boarding pass',ipa:'/ˈbɔːr.dɪŋ pæs/',pt:'Cartão de embarque',ex:'Here\'s my boarding pass.',exPt:'Aqui está meu cartão de embarque.'},
            {word:'Luggage',ipa:'/ˈlʌɡ.ɪdʒ/',pt:'Bagagem',ex:'How many pieces of luggage?',exPt:'Quantas peças de bagagem?'},
            {word:'Gate',ipa:'/ɡeɪt/',pt:'Portão',ex:'Go to gate 12.',exPt:'Vá ao portão 12.'}
          ],
          grammar:{title:'Simple Future: WILL & GOING TO',titlePt:'Futuro Simples: WILL e GOING TO',explanation:'"Will" é para decisões no momento. "Going to" é para planos já feitos.',table:[['Will','Decisão instantânea','I will help you. (Eu vou te ajudar.)'],['Going to','Plano feito','I\'m going to travel next week.']],tip:'No aeroporto: "The flight will depart at 3 PM" (informação) vs "I\'m going to fly to London" (seu plano).'},
          dialogue:[
            {speaker:'vinicius',text:'Excuse me, which gate is flight 247 to London?',textPt:'Com licença, qual portão é o voo 247 para Londres?'},
            {speaker:'Leticia',text:'Gate 12. It\'s boarding in twenty minutes.',textPt:'Portão 12. O embarque começa em vinte minutos.'},
            {speaker:'vinicius',text:'Thank you! Do I need to show my passport here?',textPt:'Obrigado! Preciso mostrar meu passaporte aqui?'},
            {speaker:'Leticia',text:'Yes, please. And your boarding pass too.',textPt:'Sim, por favor. E seu cartão de embarque também.'}
          ],
          pronunciation:[{word:'Flight',ipa:'/flaɪt/',tip:'O "igh" é mudo — soa como "FLAIT".',breakdown:'FLAIT'},{word:'Luggage',ipa:'/ˈlʌɡ.ɪdʒ/',tip:'"LÁ-guidj" — o "u" soa como "Á".',breakdown:'LUG-ij'}],
          cultural:{title:'Airport Etiquette',titlePt:'Etiqueta no Aeroporto',text:'At English-speaking airports, the queue (UK) or line (US) is sacred. Never cut in line! Also, "flight attendant" is the correct term — never say "stewardess" as it\'s considered outdated.',textPt:'Em aeroportos anglófonos, a fila é sagrada. Nunca fure a fila! Também, "flight attendant" é o termo correto — nunca diga "stewardess" pois é considerado ultrapassado.'},
          exercises:[
            {type:'mc',question:'"Cartão de embarque" in English is:',options:['Boarding card','Boarding pass','Board pass','Pass board'],correct:1,explanation:'The correct term is "boarding pass."'},
            {type:'fill',sentence:'My ___ departs at 3 PM from ___ 12.',blanks:['flight','gate'],hints:['voo','portão']},
            {type:'mc',question:'Choose: "I ___ going to travel next week."',options:['am','is','are','will'],correct:0,explanation:'"I am going to..." for planned future actions.'},
            {type:'order',words:['is','gate','flight','Which','the','for','247','?'],correct:'Which is the gate for flight 247?',translation:'Qual é o portão para o voo 247?'}
          ]
        }]
      }
    ]
  },
  B1: {
    title:'Intermediário / Intermediate',description:'Comunicação fluente em situações diversas',
    modules:[
      {id:'b1m1',title:'Business English',titlePt:'Inglês para Negócios',icon:'💼',theme:'Reunião de negócios internacional',
        lessons:[{
          id:'b1m1l1',title:'The Business Meeting',titlePt:'A Reunião de Negócios',instructor:'vinicius',
          intro:{text:"Welcome to the professional world! Today we'll learn how to participate in business meetings, present ideas, and negotiate — all in English. These skills will open doors in your career!",textPt:"Bem-vindo ao mundo profissional! Hoje vamos aprender como participar de reuniões de negócios, apresentar ideias e negociar — tudo em inglês. Essas habilidades vão abrir portas na sua carreira!",visual:"A modern glass conference room with a long table, laptops open, and professionals in business attire discussing around a whiteboard."},
          vocabulary:[
            {word:'Meeting',ipa:'/ˈmiː.tɪŋ/',pt:'Reunião',ex:'The meeting starts at 9 AM.',exPt:'A reunião começa às 9h.'},
            {word:'Agenda',ipa:'/əˈdʒen.də/',pt:'Pauta',ex:'Let\'s review the agenda.',exPt:'Vamos revisar a pauta.'},
            {word:'Deadline',ipa:'/ˈded.laɪn/',pt:'Prazo',ex:'The deadline is next Friday.',exPt:'O prazo é sexta-feira que vem.'},
            {word:'Proposal',ipa:'/prəˈpoʊ.zəl/',pt:'Proposta',ex:'I have a new proposal.',exPt:'Eu tenho uma nova proposta.'},
            {word:'Revenue',ipa:'/ˈrev.ən.uː/',pt:'Receita/Faturamento',ex:'Revenue increased by 20%.',exPt:'A receita aumentou 20%.'},
            {word:'Stakeholder',ipa:'/ˈsteɪk.hoʊl.dər/',pt:'Parte interessada',ex:'All stakeholders must agree.',exPt:'Todas as partes interessadas devem concordar.'}
          ],
          grammar:{title:'Modal Verbs for Business',titlePt:'Verbos Modais para Negócios',explanation:'Verbos modais expressam possibilidade, obrigação e sugestão:',table:[['Should','Sugestão','We should review the data.'],['Must','Obrigação','We must meet the deadline.'],['Could','Possibilidade educada','Could we reschedule?'],['Would','Condicional educado','Would you agree with this?']],tip:'No mundo corporativo, "could" e "would" são mais educados que "can" e "will".'},
          dialogue:[
            {speaker:'vinicius',text:'Good morning, everyone. Shall we begin? Let\'s review today\'s agenda.',textPt:'Bom dia a todos. Podemos começar? Vamos revisar a pauta de hoje.'},
            {speaker:'Leticia',text:'The first item is the Q3 revenue report. Revenue increased by fifteen percent.',textPt:'O primeiro item é o relatório de receita do Q3. A receita aumentou quinze por cento.'},
            {speaker:'vinicius',text:'Excellent. Could you walk us through the key drivers?',textPt:'Excelente. Você poderia nos apresentar os principais fatores?'},
            {speaker:'Leticia',text:'Of course. The main driver was our new product launch in Southeast Asia.',textPt:'Claro. O principal fator foi o lançamento do nosso novo produto no Sudeste Asiático.'}
          ],
          pronunciation:[{word:'Revenue',ipa:'/ˈrev.ən.uː/',tip:'"RÉ-vê-niu" — acento na primeira sílaba.',breakdown:'REV-uh-noo'}],
          cultural:{title:'Business Culture',titlePt:'Cultura de Negócios',text:'In American business, being 5 minutes early is "on time," and being on time is "late." Always start meetings with brief small talk. In the UK, humor is appreciated even in formal meetings.',textPt:'Nos negócios americanos, chegar 5 minutos adiantado é "na hora", e chegar na hora é "atrasado." Sempre comece reuniões com uma breve conversa informal. No Reino Unido, humor é apreciado mesmo em reuniões formais.'},
          exercises:[
            {type:'mc',question:'The most polite way to make a suggestion in a meeting:',options:['We must do this!','You should do this.','Could we perhaps consider this approach?','Do this now.'],correct:2,explanation:'"Could we perhaps..." is very polite and professional.'},
            {type:'fill',sentence:'___ we reschedule the meeting to ___?',blanks:['Could','Thursday'],hints:['verbo modal educado','dia da semana']},
            {type:'mc',question:'"Deadline" means:',options:['Linha da morte','Prazo final','Linha morta','Final da linha'],correct:1,explanation:'"Deadline" = prazo final para entregar algo.'}
          ]
        }]
      }
    ]
  },
  B2:{title:'Intermediário Superior / Upper Intermediate',description:'Fluência e precisão em contextos complexos',modules:[{id:'b2m1',title:'Advanced Grammar & Idioms',titlePt:'Gramática Avançada e Expressões',icon:'🎭',theme:'Entendendo filmes e séries em inglês',lessons:[{id:'b2m1l1',title:'Idioms & Phrasal Verbs',titlePt:'Expressões Idiomáticas e Phrasal Verbs',instructor:'Leticia',intro:{text:"Let's dive into the fun part of English — idioms and phrasal verbs! These are the key to sounding natural.",textPt:"Vamos mergulhar na parte divertida do inglês — expressões idiomáticas e phrasal verbs! Estes são a chave para soar natural.",visual:"A cozy living room with a large TV showing a popular American series, popcorn on the table, and subtitles on screen."},vocabulary:[{word:'Break up',ipa:'/breɪk ʌp/',pt:'Terminar (relacionamento)',ex:'They broke up last month.',exPt:'Eles terminaram mês passado.'},{word:'Figure out',ipa:'/ˈfɪɡ.jər aʊt/',pt:'Descobrir/Resolver',ex:'I can\'t figure out this puzzle.',exPt:'Não consigo resolver este quebra-cabeça.'},{word:'Get along',ipa:'/ɡet əˈlɔːŋ/',pt:'Se dar bem',ex:'Do you get along with your boss?',exPt:'Você se dá bem com seu chefe?'},{word:'Look forward to',ipa:'/lʊk ˈfɔːr.wərd tuː/',pt:'Estar ansioso por',ex:'I look forward to hearing from you.',exPt:'Estou ansioso para ter notícias suas.'},{word:'It\'s raining cats and dogs',ipa:'',pt:'Está chovendo canivetes',ex:'Don\'t go out — it\'s raining cats and dogs!',exPt:'Não saia — está chovendo canivetes!'}],grammar:{title:'Phrasal Verbs Structure',titlePt:'Estrutura dos Phrasal Verbs',explanation:'Phrasal verbs = verbo + preposição/advérbio. O significado muda completamente!',table:[['Look','Olhar','Look up = Procurar / Look after = Cuidar'],['Turn','Virar','Turn on = Ligar / Turn off = Desligar'],['Give','Dar','Give up = Desistir / Give in = Ceder'],['Come','Vir','Come up = Surgir / Come across = Encontrar']],tip:'Phrasal verbs são a parte mais difícil do inglês para estrangeiros — mas os nativos os usam O TEMPO TODO!'},dialogue:[{speaker:'Leticia',text:'I was watching this series and they said "He blew it." What does that mean?',textPt:'Eu estava assistindo essa série e eles disseram "He blew it." O que isso significa?'},{speaker:'vinicius',text:'"Blow it" means to ruin an opportunity. Like "He had a chance and he blew it."',textPt:'"Blow it" significa arruinar uma oportunidade. Como "Ele teve uma chance e ele estragou tudo."'}],pronunciation:[{word:'Figure out',ipa:'/ˈfɪɡ.jər aʊt/',tip:'"FÍ-guiôr áut" — note que "figure" tem som de "guiôr" no final.',breakdown:'FIG-yer OUT'}],cultural:{title:'Idioms in Daily Life',titlePt:'Expressões no Dia a Dia',text:'Native speakers use idioms constantly. "Break a leg" means "Good luck!" "Piece of cake" means "Easy!" Understanding these will help you follow movies, songs, and conversations naturally.',textPt:'Falantes nativos usam expressões constantemente. "Break a leg" significa "Boa sorte!" "Piece of cake" significa "Fácil!" Entender estas expressões vai te ajudar a acompanhar filmes, músicas e conversas naturalmente.'},exercises:[{type:'mc',question:'"She needs to figure it out" means:',options:['Ela precisa resolver isso','Ela precisa figurar isso','Ela precisa sair','Ela precisa calcular'],correct:0,explanation:'"Figure out" = resolver, descobrir.'},{type:'fill',sentence:'I look ___ to meeting you ___.',blanks:['forward','soon'],hints:['direção','em breve']}]}]}]},
  C1:{title:'Avançado / Advanced',description:'Domínio sofisticado e nuances culturais',modules:[{id:'c1m1',title:'Academic & Professional Writing',titlePt:'Escrita Acadêmica e Profissional',icon:'📝',theme:'Preparando um artigo acadêmico',lessons:[{id:'c1m1l1',title:'The Art of Persuasion',titlePt:'A Arte da Persuasão',instructor:'vinicius',intro:{text:"At the C1 level, you're not just speaking English — you're crafting arguments, building narratives, and persuading audiences. Today, we'll explore advanced persuasive techniques used in academic and professional contexts.",textPt:"No nível C1, você não está apenas falando inglês — está construindo argumentos, criando narrativas e persuadindo audiências. Hoje, exploraremos técnicas persuasivas avançadas usadas em contextos acadêmicos e profissionais.",visual:"A university lecture hall with a professor presenting slides about rhetoric and persuasion techniques."},vocabulary:[{word:'Nevertheless',ipa:'/ˌnev.ər.ðəˈles/',pt:'No entanto',ex:'The data was limited; nevertheless, the results were significant.',exPt:'Os dados eram limitados; no entanto, os resultados foram significativos.'},{word:'Notwithstanding',ipa:'/ˌnɑːt.wɪðˈstæn.dɪŋ/',pt:'Apesar de',ex:'Notwithstanding the challenges, the project succeeded.',exPt:'Apesar dos desafios, o projeto teve sucesso.'},{word:'Compelling',ipa:'/kəmˈpel.ɪŋ/',pt:'Convincente',ex:'She made a compelling argument.',exPt:'Ela fez um argumento convincente.'},{word:'Albeit',ipa:'/ɔːlˈbiː.ɪt/',pt:'Embora/Ainda que',ex:'He accepted, albeit reluctantly.',exPt:'Ele aceitou, embora relutantemente.'}],grammar:{title:'Advanced Connectors',titlePt:'Conectores Avançados',explanation:'Domine conectores sofisticados para elevar sua escrita:',table:[['Concession','Nevertheless, Notwithstanding','Apesar de algo, o contrário acontece'],['Addition','Furthermore, Moreover','Adicionando informação importante'],['Contrast','Conversely, On the contrary','Mostrando o lado oposto'],['Result','Consequently, Hence','Mostrando resultado/causa']],tip:'Use estes conectores em emails profissionais e apresentações para soar mais sofisticado.'},dialogue:[{speaker:'vinicius',text:'The research was groundbreaking; however, the sample size raises questions about its generalizability.',textPt:'A pesquisa foi inovadora; no entanto, o tamanho da amostra levanta questões sobre sua generalização.'},{speaker:'Leticia',text:'That\'s a valid point. Nevertheless, the methodology was rigorous and well-documented.',textPt:'Esse é um ponto válido. No entanto, a metodologia foi rigorosa e bem documentada.'}],pronunciation:[{word:'Nevertheless',ipa:'/ˌnev.ər.ðəˈles/',tip:'Quatro sílabas: "NÉ-ver-dê-LESS". O acento principal fica na última sílaba.',breakdown:'nev-er-thuh-LESS'}],cultural:{title:'Academic Culture',titlePt:'Cultura Acadêmica',text:'In English academic writing, hedging is crucial. Instead of "This proves...", say "This suggests..." or "The evidence indicates..." Being overly assertive is seen as unscholarly.',textPt:'Na escrita acadêmica em inglês, usar linguagem cautelosa é crucial. Em vez de "This proves...", diga "This suggests..." ou "The evidence indicates..." Ser excessivamente assertivo é visto como não acadêmico.'},exercises:[{type:'mc',question:'Choose the most academic connector: "The results were positive; ___, more research is needed."',options:['but','nevertheless','and','so'],correct:1,explanation:'"Nevertheless" is the most formal and academic connector.'},{type:'fill',sentence:'The proposal was innovative, ___ somewhat controversial.',blanks:['albeit'],hints:['embora/ainda que']}]}]}]},
  C2:{title:'Proficiente / Proficient',description:'Maestria total da língua inglesa',modules:[{id:'c2m1',title:'Mastery & Nuance',titlePt:'Maestria e Nuances',icon:'👑',theme:'Dominando sutilezas e registros',lessons:[{id:'c2m1l1',title:'The Subtleties of English',titlePt:'As Sutilezas do Inglês',instructor:'Leticia',intro:{text:"Welcome to the pinnacle of English mastery. At C2, we explore the finest nuances — register shifts, stylistic devices, and the art of implication. You'll learn to wield language like a native speaker in any context.",textPt:"Bem-vindo ao ápice do domínio do inglês. No C2, exploramos as nuances mais finas — mudanças de registro, recursos estilísticos e a arte da implicação. Você aprenderá a usar a linguagem como um falante nativo em qualquer contexto.",visual:"An elegant library with floor-to-ceiling bookshelves, a vintage desk with leather-bound volumes, and golden afternoon light streaming through tall windows."},vocabulary:[{word:'Eloquence',ipa:'/ˈel.ə.kwəns/',pt:'Eloquência',ex:'Her eloquence captivated the audience.',exPt:'Sua eloquência cativou a audiência.'},{word:'Nuance',ipa:'/ˈnuː.ɑːns/',pt:'Nuance/Sutileza',ex:'The nuance of her argument was lost on them.',exPt:'A sutileza do argumento dela passou despercebida por eles.'},{word:'Colloquial',ipa:'/kəˈloʊ.kwi.əl/',pt:'Coloquial',ex:'That expression is very colloquial.',exPt:'Essa expressão é muito coloquial.'},{word:'Acquiesce',ipa:'/ˌæk.wiˈes/',pt:'Aquiescer/Concordar',ex:'She acquiesced to their demands.',exPt:'Ela aquiesceu às exigências deles.'}],grammar:{title:'Register & Formality',titlePt:'Registro e Formalidade',explanation:'O mesmo significado em diferentes registros:',table:[['Informal','Kids / Gonna / Wanna','Amigos, família, textos'],['Neutral','Children / Going to / Want to','Dia a dia, trabalho'],['Formal','Offspring / Intend to / Desire to','Documentos, academia'],['Literary','Progeny / Aspire to / Yearn for','Literatura, poesia']],tip:'A maestria está em saber quando usar cada registro. Misturar registros é o erro mais comum de não-nativos avançados.'},dialogue:[{speaker:'Leticia',text:'The author\'s use of litotes — "not unkind" instead of "kind" — creates a deliberate ambiguity that invites the reader to question the narrator\'s reliability.',textPt:'O uso de litotes pelo autor — "not unkind" em vez de "kind" — cria uma ambiguidade deliberada que convida o leitor a questionar a confiabilidade do narrador.'},{speaker:'vinicius',text:'Precisely. And notice how the subjunctive mood in "were I to suggest" elevates the register from conversational to literary.',textPt:'Precisamente. E note como o subjuntivo em "were I to suggest" eleva o registro do conversacional para o literário.'}],pronunciation:[{word:'Acquiesce',ipa:'/ˌæk.wiˈes/',tip:'Três sílabas: "Á-qui-ÉSS". O acento fica na última sílaba.',breakdown:'ak-wee-ESS'}],cultural:{title:'The Power of Understatement',titlePt:'O Poder do Eufemismo',text:'British English is famous for understatement. When a British person says "That\'s quite interesting," they might mean "That\'s absolutely fascinating" OR "That\'s boring." Context is everything at the C2 level.',textPt:'O inglês britânico é famoso pelo eufemismo. Quando um britânico diz "That\'s quite interesting," pode significar "Isso é absolutamente fascinante" OU "Isso é entediante." Contexto é tudo no nível C2.'},exercises:[{type:'mc',question:'Choose the literary register: "I want to go"',options:['I wanna go','I wish to proceed','I\'d like to go','I desire to depart'],correct:3,explanation:'"Desire to depart" is the most literary/elevated register.'},{type:'fill',sentence:'The author employs ___ to create a sense of ___.',blanks:['irony','detachment'],hints:['recurso retórico','distanciamento']}]}]}]}
};


