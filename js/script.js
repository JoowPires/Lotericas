// --- CONFIGURAÇÕES GERAIS ---
const whatsappNumber = "+5535984544434"; // Coloque seu número aqui (apenas números)

// --- DADOS DOS BOLÕES (MEGA DA VIRADA) ---
const megaSyndicates = [
    { id: 1, desc: "3 Apostas de 12 Dezenas", valor: 299.82, premio: "R$ 850 MILHÕES", cotas: 75 },
    { id: 2, desc: "10 Apostas de 7 Dezenas", valor: 56.70, premio: "R$ 850 MILHÕES", cotas: 10 },
    { id: 3, desc: "3 Apostas de 9 Dezenas", valor: 102.24, premio: "R$ 850 MILHÕES", cotas: 20 },
    { id: 4, desc: "2 Apostas de 10 Dezenas", valor: 141.75, premio: "R$ 850 MILHÕES", cotas: 24 },
    { id: 5, desc: "3 Apostas de 9 Dezenas (Extra)", valor: 51.41, premio: "R$ 850 MILHÕES", cotas: 40 }
];

// --- DADOS DOS JOGOS DO DIA (COM TAGS E DIAS) ---
const dailyGames = [
    { 
        name: "Lotofácil", color: "#9c27b0", textColor: "white", 
        tag: "Mais Fácil de Ganhar",
        days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        howTo: "Escolha de <strong>15 a 20 números</strong> entre os 25 disponíveis. Ganha com 11, 12, 13, 14 ou 15 acertos." 
    },
    { 
        name: "Mega-Sena", color: "#209869", textColor: "white", 
        tag: "Prêmios Milionários",
        days: ["Ter", "Qui", "Sáb"],
        howTo: "A queridinha do Brasil. Escolha de <strong>6 a 20 números</strong>. Ganha quem acerta a Sena, Quina ou Quadra." 
    },
    { 
        name: "Quina", color: "#3f51b5", textColor: "white", 
        tag: "Sorteios Diários",
        days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        howTo: "Escolha de <strong>5 a 15 números</strong> dentre os 80 disponíveis. Ganha com 2, 3, 4 ou 5 acertos." 
    },
    { 
        name: "+Milionária", color: "#1a237e", textColor: "white", 
        tag: "O Maior Prêmio",
        days: ["Qua", "Sáb"],
        howTo: "Escolha <strong>6 números</strong> e <strong>2 trevos</strong>. Possui 10 faixas de premiação diferentes." 
    },
    { 
        name: "Lotomania", color: "#ff9800", textColor: "white", 
        tag: "Muitas Chances",
        days: ["Seg", "Qua", "Sex"],
        howTo: "Escolha <strong>50 números</strong>. Ganha se acertar 20, 19, 18, 17, 16, 15 ou nenhum número." 
    },
    { 
        name: "Dupla Sena", color: "#a61324", textColor: "white", 
        tag: "Chance Dupla",
        days: ["Seg", "Qua", "Sex"],
        howTo: "Com o mesmo bilhete, você concorre em <strong>dois sorteios</strong> seguidos. Mais chances de ganhar." 
    },
    { 
        name: "Timemania", color: "#FFF20B", textColor: "#004528", 
        tag: "Paixão pelo Time",
        days: ["Ter", "Qui", "Sáb"],
        howTo: "Escolha 10 números e um <strong>Time do Coração</strong>. Sorteiam-se 7 números por concurso." 
    },
    { 
        name: "Dia de Sorte", color: "#cb852b", textColor: "white", 
        tag: "Seu Dia da Sorte",
        days: ["Ter", "Qui", "Sáb"],
        howTo: "Escolha de 7 a 15 números e um <strong>Mês de Sorte</strong>. Sorteios três vezes por semana." 
    },
    { 
        name: "Super Sete", color: "#89C052", textColor: "#333", 
        tag: "Colunas da Sorte",
        days: ["Seg", "Qua", "Sex"],
        howTo: "Escolha no mínimo 1 número em cada uma das <strong>7 colunas</strong> disponíveis." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. POP-UP DE IDADE
    const agePopup = document.getElementById('agePopup');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    
    if (!sessionStorage.getItem('ageConfirmed')) {
        agePopup.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    } else {
        initSwipers(); 
    }
    
    if(btnYes) {
        btnYes.addEventListener('click', () => {
            agePopup.classList.remove('active');
            sessionStorage.setItem('ageConfirmed', 'true');
            document.body.style.overflow = ''; 
            initSwipers();
        });
    }
    
    if(btnNo) {
        btnNo.addEventListener('click', () => alert("Apenas para maiores de 18 anos."));
    }

    // 2. MENU MOBILE
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menuDropdown = document.getElementById('mobileMenuDropdown');
    
    if(menuBtn && menuDropdown){
        menuBtn.addEventListener('click', () => {
            menuDropdown.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if(menuDropdown.classList.contains('open')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                menuDropdown.classList.remove('open');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. RENDERIZAR BOLÕES (MEGA DA VIRADA)
    const megaDesktop = document.getElementById('mega-boloes-grid');
    const megaMobileWrapper = document.getElementById('swiper-mega-wrapper');
    const formatMoney = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const createMegaCard = (bolo, isSlide) => {
        const cardId = `bolo-${isSlide ? 'mobile' : 'desktop'}-${bolo.id}`;
        return `
        <div class="${isSlide ? 'swiper-slide ' : ''}mega-card" id="${cardId}">
            <div class="mega-header">
                <span class="premio-label">PRÊMIO ESTIMADO</span>
                <span class="premio-valor">${bolo.premio}</span>
            </div>
            <div class="mega-body">
                <h3 class="bolo-desc">${bolo.desc}</h3>
                <div class="cotas-info">Bolão de <strong>${bolo.cotas}</strong> Cotas</div>
                
                <div class="price-container">
                    <small>Valor da Cota:</small>
                    <div class="unit-price">${formatMoney(bolo.valor)}</div>
                </div>
                
                <div class="qty-control">
                    <button class="btn-qty minus" onclick="changeQty('${cardId}', ${bolo.valor}, -1)">-</button>
                    <input type="number" class="qty-input" value="1" readonly>
                    <button class="btn-qty plus" onclick="changeQty('${cardId}', ${bolo.valor}, 1)">+</button>
                </div>
                
                <div class="total-display">Total: <span class="total-value">${formatMoney(bolo.valor)}</span></div>
                
                <a href="#" class="btn-mega btn-whatsapp-dinamico" 
                   data-base-msg="Olá! Gostaria de participar do bolão: *${bolo.desc}*" 
                   data-price="${bolo.valor}">
                    <i class="fab fa-whatsapp"></i> GARANTIR AGORA
                </a>
            </div>
        </div>
    `};

    if(megaDesktop && megaMobileWrapper) {
        megaDesktop.innerHTML = megaSyndicates.map(b => createMegaCard(b, false)).join('');
        megaMobileWrapper.innerHTML = megaSyndicates.map(b => createMegaCard(b, true)).join('');
        updateAllLinks(); 
    }

    // 4. RENDERIZAR JOGOS DO DIA (PREMIUM)
    const dailyDesktop = document.getElementById('daily-games-grid');
    const dailyMobileWrapper = document.getElementById('swiper-daily-wrapper');
    
    const createDailyCard = (game, isSlide, index) => {
        const hiddenClass = (!isSlide && index >= 3) ? 'hidden-card' : '';
        const daysHtml = game.days.map(day => `<span class="day-badge">${day}</span>`).join('');

        return `
        <div class="${isSlide ? 'swiper-slide ' : ''}game-card ${hiddenClass}">
            <div class="game-header" style="background: ${game.color}; color: ${game.textColor}">
                <div class="game-tag" style="border-color:${game.textColor}">${game.tag}</div>
                <div class="game-title">${game.name}</div>
            </div>
            
            <div class="game-body">
                <div class="game-info-block">
                    <h4>QUANDO CORRE?</h4>
                    <div class="draw-days">${daysHtml}</div>
                </div>

                <div class="game-info-block">
                    <h4>COMO FUNCIONA?</h4>
                    <p>${game.howTo}</p>
                </div>

                <a href="https://wa.me/${whatsappNumber}?text=Olá! Quero apostar na *${game.name}*." 
                   class="btn-game-action" 
                   style="--btn-color: ${game.color}">
                   <i class="fab fa-whatsapp"></i> Apostar Agora
                </a>
            </div>
        </div>
    `};

    if(dailyDesktop && dailyMobileWrapper) {
        dailyDesktop.innerHTML = dailyGames.map((g, i) => createDailyCard(g, false, i)).join('');
        dailyMobileWrapper.innerHTML = dailyGames.map((g, i) => createDailyCard(g, true, i)).join('');
    }

    // 5. BOTÃO VER MAIS
    const btnShowMore = document.getElementById('btn-show-more');
    if(btnShowMore) {
        btnShowMore.addEventListener('click', () => {
            const hiddenCards = document.querySelectorAll('.game-card.hidden-card');
            const allCards = document.querySelectorAll('#daily-games-grid .game-card');
            
            if(hiddenCards.length > 0) {
                hiddenCards.forEach(c => c.classList.remove('hidden-card'));
                btnShowMore.innerHTML = 'Ver Menos Jogos <i class="fas fa-chevron-up"></i>';
            } else {
                allCards.forEach((c, i) => { if(i >= 3) c.classList.add('hidden-card'); });
                btnShowMore.innerHTML = 'Ver Mais Jogos <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    document.querySelectorAll('.btn-whatsapp-geral').forEach(btn => btn.href = `https://wa.me/${whatsappNumber}`);

    // 6. INICIA O CRONÔMETRO
    startCountdown();

    // 7. MODAL DE INFORMAÇÕES (ENTREGA E SEGURANÇA)
    const modalInfo = document.getElementById('infoModal');
    const btnOpenInfo = document.getElementById('btnOpenInfo');
    const btnCloseModal = document.querySelector('.close-modal');
    const btnCloseModalBtn = document.getElementById('btnCloseModalBtn');

    if (btnOpenInfo && modalInfo) {
        // Abrir
        btnOpenInfo.addEventListener('click', (e) => {
            e.preventDefault();
            modalInfo.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava a rolagem
        });

        // Fechar (X, Botão ou Clicar Fora)
        const closeModal = () => {
            modalInfo.classList.remove('active');
            document.body.style.overflow = ''; // Destrava rolagem
        };

        if(btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
        if(btnCloseModalBtn) btnCloseModalBtn.addEventListener('click', closeModal);
        
        modalInfo.addEventListener('click', (e) => {
            if (e.target === modalInfo) closeModal();
        });
    }
});

// --- FUNÇÕES AUXILIARES ---

function changeQty(cardId, unitPrice, change) {
    const card = document.getElementById(cardId);
    const input = card.querySelector('.qty-input');
    const totalDisplay = card.querySelector('.total-value');
    const btnLink = card.querySelector('.btn-whatsapp-dinamico');
    
    let newQty = parseInt(input.value) + change;
    if (newQty < 1) return;
    
    input.value = newQty;
    let newTotal = newQty * unitPrice;
    totalDisplay.innerText = newTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    updateLink(btnLink, newQty, newTotal);
}

function updateLink(btn, qty, total) {
    const baseMsg = btn.getAttribute('data-base-msg');
    const finalMsg = `${baseMsg}\n\n*Qtd:* ${qty}\n*Total:* ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    btn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
}

function updateAllLinks() {
    document.querySelectorAll('.btn-whatsapp-dinamico').forEach(btn => {
        const price = parseFloat(btn.getAttribute('data-price'));
        updateLink(btn, 1, price);
    });
}

function initSwipers() {
    new Swiper(".swiperMarquee", { 
        slidesPerView: "auto", loop: true, speed: 6000, 
        autoplay: { delay: 0, disableOnInteraction: false }, 
        allowTouchMove: false 
    });

    new Swiper(".swiperJogos", { 
        effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", 
        coverflowEffect: { rotate: 40, stretch: 0, depth: 100, modifier: 1, slideShadows: true }, 
        pagination: { el: ".swiper-pagination", dynamicBullets: true } 
    });

    new Swiper(".swiperMega", { 
        slidesPerView: "auto", centeredSlides: true, spaceBetween: 20, 
        pagination: { el: ".swiper-pagination", dynamicBullets: true } 
    });
}

function startCountdown() {
    const targetDate = new Date("December 31, 2025 20:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if(document.getElementById("days")) document.getElementById("days").innerText = "00";
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) document.getElementById("days").innerText = d < 10 ? "0"+d : d;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m < 10 ? "0"+m : m;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s < 10 ? "0"+s : s;
    }, 1000);
}