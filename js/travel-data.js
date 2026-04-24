// FREE WORLD — Travel Module Data — Anti Gravity System L99
const TRAVEL_INTERESTS = [
  {id:'beach',icon:'🏖️',label:'Beach & Relaxation',labelPt:'Praia e Relaxamento'},
  {id:'culture',icon:'🏛️',label:'Culture & History',labelPt:'Cultura e História'},
  {id:'adventure',icon:'🏔️',label:'Adventure & Nature',labelPt:'Aventura e Natureza'},
  {id:'shopping',icon:'🛍️',label:'Shopping & Entertainment',labelPt:'Compras e Entretenimento'},
  {id:'food',icon:'🍽️',label:'Gastronomy',labelPt:'Gastronomia'},
  {id:'family',icon:'👨‍👩‍👧‍👦',label:'Family & Theme Parks',labelPt:'Família e Parques'}
];

const TRAVEL_DESTINATIONS = {
  'new-york':{
    name:'New York',country:'United States',countryPt:'Estados Unidos',
    airport:'JFK International Airport',airportCode:'JFK',
    currency:'US Dollar (USD)',lang:'English',
    img:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    descEN:'New York City, the city that never sleeps! Home to Times Square, Central Park, the Statue of Liberty, and Broadway. A melting pot of cultures with world-class museums, restaurants, and iconic skyscrapers.',
    descPT:'Nova York, a cidade que nunca dorme! Lar da Times Square, Central Park, Estátua da Liberdade e Broadway. Um caldeirão de culturas com museus de classe mundial, restaurantes e arranha-céus icônicos.',
    interests:['culture','shopping','food'],
    hotels:[
      {name:'The Manhattan Grand Hotel',stars:5,price:'$320/night',pricePt:'$320/noite'},
      {name:'Times Square Inn',stars:4,price:'$180/night',pricePt:'$180/noite'},
      {name:'Brooklyn Bridge Hostel',stars:3,price:'$85/night',pricePt:'$85/noite'}
    ],
    immigration:{
      type:'US I-94',
      fields:['Full Name','Date of Birth','Passport Number','Country of Citizenship','Flight Number','Address in the US','Purpose of Visit'],
      fieldsPt:['Nome Completo','Data de Nascimento','Número do Passaporte','País de Cidadania','Número do Voo','Endereço nos EUA','Propósito da Visita'],
      questions:[
        {q:"What is the purpose of your visit?",a:"I'm here on vacation / for tourism.",qPt:"Qual é o propósito da sua visita?",aPt:"Estou aqui de férias / para turismo."},
        {q:"How long will you be staying?",a:"I'll be staying for [X] days.",qPt:"Quanto tempo você vai ficar?",aPt:"Vou ficar por [X] dias."},
        {q:"Where will you be staying?",a:"I'll be staying at [hotel name] in Manhattan.",qPt:"Onde você vai ficar?",aPt:"Vou ficar no [nome do hotel] em Manhattan."},
        {q:"Do you have a return ticket?",a:"Yes, here is my return ticket.",qPt:"Você tem passagem de volta?",aPt:"Sim, aqui está minha passagem de volta."},
        {q:"Are you carrying any food, plants or animals?",a:"No, I'm not carrying any of those items.",qPt:"Você está trazendo comida, plantas ou animais?",aPt:"Não, não estou trazendo nenhum desses itens."},
        {q:"How much money are you bringing?",a:"I'm bringing about [amount] dollars.",qPt:"Quanto dinheiro você está trazendo?",aPt:"Estou trazendo cerca de [quantia] dólares."}
      ]
    },
    touristSpots:[
      {name:'Statue of Liberty',namePt:'Estátua da Liberdade',ticketEN:'One adult ticket, please.',ticketPT:'Um ingresso de adulto, por favor.',price:'$24',time:'3 hours',distance:'Ferry from Battery Park',
       phrases:[
         {en:"I'd like to buy a ticket to the Statue of Liberty.",pt:"Eu gostaria de comprar um ingresso para a Estátua da Liberdade."},
         {en:"Does the ticket include the ferry ride?",pt:"O ingresso inclui a viagem de ferry?"},
         {en:"Can I go up to the crown?",pt:"Posso subir até a coroa?"},
         {en:"Where is the best spot for photos?",pt:"Onde é o melhor lugar para fotos?"}
       ]},
      {name:'Times Square',namePt:'Times Square',ticketEN:'No ticket needed — it is free!',ticketPT:'Não precisa de ingresso — é grátis!',price:'Free',time:'2 hours',distance:'Walking from Midtown',
       phrases:[
         {en:"Excuse me, how do I get to Times Square?",pt:"Com licença, como eu chego na Times Square?"},
         {en:"Can you take a photo of me, please?",pt:"Você pode tirar uma foto minha, por favor?"},
         {en:"Where can I find a good restaurant nearby?",pt:"Onde posso encontrar um bom restaurante por perto?"}
       ]},
      {name:'Central Park',namePt:'Central Park',ticketEN:'No ticket needed.',ticketPT:'Não precisa de ingresso.',price:'Free',time:'3 hours',distance:'Walk or subway to 59th St',
       phrases:[
         {en:"Is there a map of Central Park available?",pt:"Existe um mapa do Central Park disponível?"},
         {en:"Where can I rent a bicycle?",pt:"Onde posso alugar uma bicicleta?"},
         {en:"How long does it take to walk across the park?",pt:"Quanto tempo leva para atravessar o parque a pé?"}
       ]},
      {name:'Empire State Building',namePt:'Empire State Building',ticketEN:'One ticket to the observation deck, please.',ticketPT:'Um ingresso para o deck de observação, por favor.',price:'$44',time:'2 hours',distance:'Midtown Manhattan',
       phrases:[
         {en:"I'd like a ticket to the top floor, please.",pt:"Eu gostaria de um ingresso para o último andar, por favor."},
         {en:"Is there a discount for students?",pt:"Tem desconto para estudantes?"},
         {en:"What time does it close?",pt:"A que horas fecha?"}
       ]}
    ]
  },
  'london':{
    name:'London',country:'United Kingdom',countryPt:'Reino Unido',
    airport:'Heathrow Airport',airportCode:'LHR',
    currency:'British Pound (GBP)',lang:'English',
    img:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    descEN:'London, the capital of England! Home to Big Ben, Buckingham Palace, the Tower of London, and the British Museum. A city rich in history with amazing pubs, theatres, and royal parks.',
    descPT:'Londres, a capital da Inglaterra! Lar do Big Ben, Palácio de Buckingham, Torre de Londres e Museu Britânico. Uma cidade rica em história com pubs incríveis, teatros e parques reais.',
    interests:['culture','shopping','food'],
    hotels:[
      {name:'The Royal Westminster',stars:5,price:'£280/night',pricePt:'£280/noite'},
      {name:'Piccadilly Lodge',stars:4,price:'£150/night',pricePt:'£150/noite'},
      {name:'Camden Town Hostel',stars:3,price:'£65/night',pricePt:'£65/noite'}
    ],
    immigration:{
      type:'UK Landing Card',
      fields:['Family Name','First Name','Date of Birth','Nationality','Passport Number','Address in UK','Flight Number'],
      fieldsPt:['Sobrenome','Primeiro Nome','Data de Nascimento','Nacionalidade','Número do Passaporte','Endereço no Reino Unido','Número do Voo'],
      questions:[
        {q:"What is the purpose of your visit to the UK?",a:"I'm visiting for tourism.",qPt:"Qual é o propósito da sua visita ao Reino Unido?",aPt:"Estou visitando para turismo."},
        {q:"How long are you planning to stay?",a:"I'm staying for [X] days.",qPt:"Quanto tempo você planeja ficar?",aPt:"Vou ficar por [X] dias."},
        {q:"Where will you be staying?",a:"I'll be at [hotel name] in central London.",qPt:"Onde você vai ficar?",aPt:"Vou ficar no [nome do hotel] no centro de Londres."},
        {q:"Do you have sufficient funds for your stay?",a:"Yes, I have enough money for my trip.",qPt:"Você tem fundos suficientes para sua estadia?",aPt:"Sim, tenho dinheiro suficiente para minha viagem."}
      ]
    },
    touristSpots:[
      {name:'Big Ben & Parliament',namePt:'Big Ben e Parlamento',ticketEN:'No ticket for outside view.',ticketPT:'Sem ingresso para ver de fora.',price:'Free (outside)',time:'1 hour',distance:'Westminster',
       phrases:[
         {en:"Excuse me, is Big Ben open for tours?",pt:"Com licença, o Big Ben está aberto para visitas?"},
         {en:"Can you tell me the history of this building?",pt:"Você pode me contar a história deste prédio?"}
       ]},
      {name:'Tower of London',namePt:'Torre de Londres',ticketEN:'One adult ticket, please.',ticketPT:'Um ingresso adulto, por favor.',price:'£33',time:'3 hours',distance:'Tower Hill station',
       phrases:[
         {en:"I'd like to see the Crown Jewels.",pt:"Eu gostaria de ver as Jóias da Coroa."},
         {en:"Where can I find the Beefeaters?",pt:"Onde posso encontrar os Beefeaters?"}
       ]},
      {name:'British Museum',namePt:'Museu Britânico',ticketEN:'Admission is free!',ticketPT:'A entrada é gratuita!',price:'Free',time:'3 hours',distance:'Holborn/Tottenham Court Road',
       phrases:[
         {en:"Where is the Egyptian collection?",pt:"Onde fica a coleção egípcia?"},
         {en:"Is there an audio guide available?",pt:"Tem áudio-guia disponível?"}
       ]}
    ]
  },
  'paris':{
    name:'Paris',country:'France',countryPt:'França',
    airport:'Charles de Gaulle Airport',airportCode:'CDG',
    currency:'Euro (EUR)',lang:'French',
    img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    descEN:'Paris, the City of Light! Home to the Eiffel Tower, the Louvre Museum, Notre-Dame Cathedral, and the Champs-Élysées. Famous for its cuisine, fashion, art, and romantic atmosphere.',
    descPT:'Paris, a Cidade Luz! Lar da Torre Eiffel, Museu do Louvre, Catedral de Notre-Dame e Champs-Élysées. Famosa por sua culinária, moda, arte e atmosfera romântica.',
    interests:['culture','food','shopping'],
    hotels:[
      {name:'Le Grand Paris Hotel',stars:5,price:'€350/night',pricePt:'€350/noite'},
      {name:'Montmartre Boutique',stars:4,price:'€180/night',pricePt:'€180/noite'},
      {name:'Saint-Germain Hostel',stars:3,price:'€75/night',pricePt:'€75/noite'}
    ],
    immigration:{
      type:'Schengen Entry',
      fields:['Full Name','Nationality','Date of Birth','Passport Number','Entry Point','Duration of Stay','Accommodation Address'],
      fieldsPt:['Nome Completo','Nacionalidade','Data de Nascimento','Número do Passaporte','Ponto de Entrada','Duração da Estadia','Endereço de Hospedagem'],
      questions:[
        {q:"What is the purpose of your visit?",a:"Tourism. I'm here to visit Paris.",qPt:"Qual é o propósito da sua visita?",aPt:"Turismo. Estou aqui para visitar Paris."},
        {q:"How many days will you stay in the Schengen area?",a:"I'll stay for [X] days, only in France.",qPt:"Quantos dias vai ficar na área Schengen?",aPt:"Vou ficar por [X] dias, somente na França."},
        {q:"Do you have travel insurance?",a:"Yes, here is my travel insurance document.",qPt:"Você tem seguro viagem?",aPt:"Sim, aqui está meu documento de seguro viagem."}
      ]
    },
    touristSpots:[
      {name:'Eiffel Tower',namePt:'Torre Eiffel',ticketEN:'One ticket to the summit, please.',ticketPT:'Um ingresso para o topo, por favor.',price:'€26',time:'2 hours',distance:'Champ de Mars',
       phrases:[
         {en:"I'd like to go to the top of the Eiffel Tower.",pt:"Eu gostaria de ir ao topo da Torre Eiffel."},
         {en:"How long is the wait to go up?",pt:"Quanto tempo é a espera para subir?"},
         {en:"Can I take the stairs instead of the elevator?",pt:"Posso subir pelas escadas em vez do elevador?"}
       ]},
      {name:'Louvre Museum',namePt:'Museu do Louvre',ticketEN:'One adult ticket, please.',ticketPT:'Um ingresso adulto, por favor.',price:'€17',time:'4 hours',distance:'Palais Royal–Musée du Louvre metro',
       phrases:[
         {en:"Where is the Mona Lisa?",pt:"Onde fica a Mona Lisa?"},
         {en:"How big is this museum?",pt:"Quão grande é este museu?"}
       ]},
      {name:'Arc de Triomphe',namePt:'Arco do Triunfo',ticketEN:'One ticket to climb to the top.',ticketPT:'Um ingresso para subir ao topo.',price:'€16',time:'1.5 hours',distance:'Charles de Gaulle–Étoile',
       phrases:[
         {en:"Is there an elevator or only stairs?",pt:"Tem elevador ou só escadas?"},
         {en:"What a beautiful view of the Champs-Élysées!",pt:"Que vista linda dos Champs-Élysées!"}
       ]}
    ]
  },
  'tokyo':{
    name:'Tokyo',country:'Japan',countryPt:'Japão',
    airport:'Narita International Airport',airportCode:'NRT',
    currency:'Japanese Yen (JPY)',lang:'Japanese',
    img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    descEN:'Tokyo, a fascinating blend of ultra-modern and traditional! From neon-lit Shibuya to ancient Senso-ji Temple, Tokyo offers incredible food, technology, anime culture, and breathtaking cherry blossoms.',
    descPT:'Tóquio, uma mistura fascinante de ultramoderno e tradicional! Do neon de Shibuya ao antigo Templo Senso-ji, Tóquio oferece comida incrível, tecnologia, cultura anime e cerejeiras de tirar o fôlego.',
    interests:['culture','food','adventure','shopping'],
    hotels:[
      {name:'Tokyo Imperial Hotel',stars:5,price:'¥45,000/night',pricePt:'¥45.000/noite'},
      {name:'Shinjuku City Hotel',stars:4,price:'¥18,000/night',pricePt:'¥18.000/noite'},
      {name:'Asakusa Capsule Inn',stars:3,price:'¥5,000/night',pricePt:'¥5.000/noite'}
    ],
    immigration:{
      type:'Japan Arrival Card',
      fields:['Family Name','Given Name','Date of Birth','City/Country','Passport Number','Purpose of Visit','Flight Number','Intended Address in Japan'],
      fieldsPt:['Sobrenome','Nome','Data de Nascimento','Cidade/País','Número do Passaporte','Propósito da Visita','Número do Voo','Endereço Pretendido no Japão'],
      questions:[
        {q:"What is the purpose of your visit to Japan?",a:"Sightseeing. I'm here for tourism.",qPt:"Qual é o propósito da sua visita ao Japão?",aPt:"Passeio. Estou aqui para turismo."},
        {q:"How long will you stay in Japan?",a:"I will stay for [X] days.",qPt:"Quanto tempo vai ficar no Japão?",aPt:"Vou ficar por [X] dias."},
        {q:"Where will you stay?",a:"I'll be staying at [hotel] in Shinjuku, Tokyo.",qPt:"Onde vai ficar?",aPt:"Vou ficar no [hotel] em Shinjuku, Tóquio."}
      ]
    },
    touristSpots:[
      {name:'Senso-ji Temple',namePt:'Templo Senso-ji',ticketEN:'Free admission.',ticketPT:'Entrada gratuita.',price:'Free',time:'2 hours',distance:'Asakusa station',
       phrases:[
         {en:"Is it okay to take photos inside the temple?",pt:"Posso tirar fotos dentro do templo?"},
         {en:"What is the meaning of this tradition?",pt:"Qual é o significado desta tradição?"}
       ]},
      {name:'Shibuya Crossing',namePt:'Cruzamento de Shibuya',ticketEN:'No ticket needed.',ticketPT:'Não precisa de ingresso.',price:'Free',time:'1 hour',distance:'Shibuya station',
       phrases:[
         {en:"This is the busiest crossing in the world!",pt:"Este é o cruzamento mais movimentado do mundo!"},
         {en:"Where is the Hachiko statue?",pt:"Onde fica a estátua do Hachiko?"}
       ]},
      {name:'Tokyo Skytree',namePt:'Tokyo Skytree',ticketEN:'One ticket to the observation deck.',ticketPT:'Um ingresso para o deck de observação.',price:'¥2,100',time:'2 hours',distance:'Tokyo Skytree station',
       phrases:[
         {en:"Can I see Mount Fuji from here?",pt:"Consigo ver o Monte Fuji daqui?"},
         {en:"How tall is the Skytree?",pt:"Qual é a altura do Skytree?"}
       ]}
    ]
  },
  'orlando':{
    name:'Orlando',country:'United States',countryPt:'Estados Unidos',
    airport:'Orlando International Airport',airportCode:'MCO',
    currency:'US Dollar (USD)',lang:'English',
    img:'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=800',
    descEN:'Orlando, the theme park capital of the world! Home to Walt Disney World, Universal Studios, SeaWorld, and countless attractions. Perfect for families with warm weather year-round.',
    descPT:'Orlando, a capital mundial dos parques temáticos! Lar do Walt Disney World, Universal Studios, SeaWorld e inúmeras atrações. Perfeita para famílias com clima quente o ano todo.',
    interests:['family','shopping','adventure'],
    hotels:[
      {name:'Disney Grand Floridian Resort',stars:5,price:'$450/night',pricePt:'$450/noite'},
      {name:'Universal Cabana Bay',stars:4,price:'$180/night',pricePt:'$180/noite'},
      {name:'International Drive Inn',stars:3,price:'$75/night',pricePt:'$75/noite'}
    ],
    immigration:{
      type:'US I-94',
      fields:['Full Name','Date of Birth','Passport Number','Country of Citizenship','Flight Number','Address in the US','Purpose of Visit'],
      fieldsPt:['Nome Completo','Data de Nascimento','Número do Passaporte','País de Cidadania','Número do Voo','Endereço nos EUA','Propósito da Visita'],
      questions:[
        {q:"What is the purpose of your visit?",a:"I'm here on vacation with my family.",qPt:"Qual é o propósito da sua visita?",aPt:"Estou aqui de férias com minha família."},
        {q:"How long will you be staying?",a:"We'll be staying for [X] days.",qPt:"Quanto tempo vai ficar?",aPt:"Vamos ficar por [X] dias."},
        {q:"Where will you be staying?",a:"At [hotel name] near International Drive.",qPt:"Onde vai ficar?",aPt:"No [nome do hotel] perto da International Drive."}
      ]
    },
    touristSpots:[
      {name:'Walt Disney World - Magic Kingdom',namePt:'Walt Disney World - Magic Kingdom',ticketEN:'Two adult tickets and one child ticket, please.',ticketPT:'Dois ingressos de adulto e um de criança, por favor.',price:'$109/person',time:'Full day',distance:'30 min from I-Drive',
       phrases:[
         {en:"Where is the entrance to Magic Kingdom?",pt:"Onde é a entrada do Magic Kingdom?"},
         {en:"What time is the fireworks show?",pt:"A que horas é o show de fogos?"},
         {en:"How long is the wait for this ride?",pt:"Quanto tempo é a espera para este brinquedo?"}
       ]},
      {name:'Universal Studios',namePt:'Universal Studios',ticketEN:'One park-to-park ticket, please.',ticketPT:'Um ingresso parque-a-parque, por favor.',price:'$164/person',time:'Full day',distance:'15 min from I-Drive',
       phrases:[
         {en:"I'd like to visit the Wizarding World of Harry Potter.",pt:"Eu gostaria de visitar o Mundo Mágico de Harry Potter."},
         {en:"Where can I buy a butterbeer?",pt:"Onde posso comprar uma cerveja amanteigada?"}
       ]}
    ]
  },
  'miami':{
    name:'Miami',country:'United States',countryPt:'Estados Unidos',
    airport:'Miami International Airport',airportCode:'MIA',
    currency:'US Dollar (USD)',lang:'English / Spanish',
    img:'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
    descEN:'Miami, where Latin culture meets American lifestyle! Famous for South Beach, Art Deco architecture, vibrant nightlife, and the stunning Florida Keys nearby. A tropical paradise with year-round sunshine.',
    descPT:'Miami, onde a cultura latina encontra o estilo de vida americano! Famosa pela South Beach, arquitetura Art Deco, vida noturna vibrante e as deslumbrantes Florida Keys. Um paraíso tropical com sol o ano todo.',
    interests:['beach','shopping','food'],
    hotels:[
      {name:'Fontainebleau Miami Beach',stars:5,price:'$380/night',pricePt:'$380/noite'},
      {name:'South Beach Resort',stars:4,price:'$200/night',pricePt:'$200/noite'},
      {name:'Ocean Drive Hostel',stars:3,price:'$70/night',pricePt:'$70/noite'}
    ],
    immigration:{
      type:'US I-94',
      fields:['Full Name','Date of Birth','Passport Number','Country of Citizenship','Flight Number','Address in the US','Purpose of Visit'],
      fieldsPt:['Nome Completo','Data de Nascimento','Número do Passaporte','País de Cidadania','Número do Voo','Endereço nos EUA','Propósito da Visita'],
      questions:[
        {q:"What is the purpose of your visit?",a:"I'm here for vacation.",qPt:"Qual é o propósito da sua visita?",aPt:"Estou aqui de férias."},
        {q:"How long will you be staying?",a:"I'll be staying for [X] days.",qPt:"Quanto tempo vai ficar?",aPt:"Vou ficar por [X] dias."}
      ]
    },
    touristSpots:[
      {name:'South Beach',namePt:'South Beach',ticketEN:'No ticket needed.',ticketPT:'Não precisa de ingresso.',price:'Free',time:'Half day',distance:'Ocean Drive',
       phrases:[
         {en:"Where can I rent a beach umbrella?",pt:"Onde posso alugar um guarda-sol?"},
         {en:"Is it safe to swim here?",pt:"É seguro nadar aqui?"}
       ]},
      {name:'Art Deco Historic District',namePt:'Distrito Histórico Art Deco',ticketEN:'Free walking tour available.',ticketPT:'Tour a pé gratuito disponível.',price:'Free',time:'2 hours',distance:'South Beach area',
       phrases:[
         {en:"When does the walking tour start?",pt:"A que horas começa o tour a pé?"},
         {en:"What is the history of these buildings?",pt:"Qual é a história destes prédios?"}
       ]}
    ]
  }
};
