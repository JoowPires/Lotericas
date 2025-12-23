// --- CONFIGURAÇÕES GERAIS ---
const whatsappNumber = "5535984544434"; // Removido o '+' para garantir compatibilidade universal de link

// --- DADOS DOS BOLÕES (MEGA DA VIRADA) ---
const megaSyndicates = [
    { id: 1, desc: "3 Apostas de 12 Dezenas", valor: 299.82, premio: "R$ 850 MILHÕES", cotas: 75 },
    { id: 2, desc: "10 Apostas de 7 Dezenas", valor: 56.70, premio: "R$ 850 MILHÕES", cotas: 10 },
    { id: 3, desc: "3 Apostas de 9 Dezenas", valor: 102.24, premio: "R$ 850 MILHÕES", cotas: 20 },
    { id: 4, desc: "2 Apostas de 10 Dezenas", valor: 141.75, premio: "R$ 850 MILHÕES", cotas: 24 },
    { id: 5, desc: "3 Apostas de 9 Dezenas ", valor: 51.41, premio: "R$ 850 MILHÕES", cotas: 40 },
    { id: 6, desc: "200 Apostas de 6 Dezenas ", valor: 324.00, premio: "R$ 850 MILHÕES", cotas: 5 }
];

// --- DADOS DOS JOGOS DO DIA ---
const dailyGames = [
    { name: "Lotofácil", color: "#9c27b0", textColor: "white", tag: "Mais Fácil de Ganhar", days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"], howTo: "Escolha de 15 a 20 números. Ganha com 11, 12, 13, 14 ou 15 acertos." },
    { name: "Mega-Sena", color: "#209869", textColor: "white", tag: "Prêmios Milionários", days: ["Ter", "Qui", "Sáb"], howTo: "A queridinha do Brasil. Escolha de 6 a 20 números. Sena, Quina ou Quadra." },
    { name: "Quina", color: "#3f51b5", textColor: "white", tag: "Sorteios Diários", days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"], howTo: "Escolha de 5 a 15 números. Ganha com 2, 3, 4 ou 5 acertos." },
    { name: "+Milionária", color: "#1a237e", textColor: "white", tag: "O Maior Prêmio", days: ["Qua", "Sáb"], howTo: "Escolha 6 números e 2 trevos. 10 faixas de premiação." },
    { name: "Lotomania", color: "#ff9800", textColor: "white", tag: "Muitas Chances", days: ["Seg", "Qua", "Sex"], howTo: "Escolha 50 números. Ganha com 20 ou nenhum acerto." },
    { name: "Dupla Sena", color: "#a61324", textColor: "white", tag: "Chance Dupla", days: ["Seg", "Qua", "Sex"], howTo: "Dois sorteios seguidos com o mesmo bilhete." },
    { name: "Timemania", color: "#FFF20B", textColor: "#004528", tag: "Paixão pelo Time", days: ["Ter", "Qui", "Sáb"], howTo: "Escolha 10 números e um Time do Coração." },
    { name: "Dia de Sorte", color: "#cb852b", textColor: "white", tag: "Seu Dia da Sorte", days: ["Ter", "Qui", "Sáb"], howTo: "Escolha de 7 a 15 números e um Mês de Sorte." },
    { name: "Super Sete", color: "#89C052", textColor: "#333", tag: "Colunas da Sorte", days: ["Seg", "Qua", "Sex"], howTo: "Escolha no mínimo 1 número em cada uma das 7 colunas." }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. POP-UP DE IDADE (Mantido com lógica segura)
    const agePopup = document.getElementById('agePopup');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    
    if (agePopup && !sessionStorage.getItem('ageConfirmed')) {
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
        btnNo.addEventListener('click', () => alert("A venda de loterias é proibida para menores de 18 anos."));
    }

    // 2. MENU MOBILE
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menuDropdown = document.getElementById('mobileMenuDropdown');
    
    if(menuBtn && menuDropdown){
        menuBtn.addEventListener('click', () => {
            menuDropdown.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                menuDropdown.classList.remove('open');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }

    // 3. RENDERIZAR BOLÕES
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
                <div class="cotas-info">Cotas disponíveis: <strong>${bolo.cotas}</strong></div>
                <div class="price-container">
                    <small>Cota individual:</small>
                    <div class="unit-price">${formatMoney(bolo.valor)}</div>
                </div>
                <div class="qty-control">
                    <button class="btn-qty minus" onclick="changeQty('${cardId}', ${bolo.valor}, -1)">-</button>
                    <input type="number" class="qty-input" value="1" readonly aria-label="Quantidade">
                    <button class="btn-qty plus" onclick="changeQty('${cardId}', ${bolo.valor}, 1)">+</button>
                </div>
                <div class="total-display">Total estimado: <span class="total-value">${formatMoney(bolo.valor)}</span></div>
                <a href="#" class="btn-mega btn-whatsapp-dinamico" 
                   data-base-msg="Olá! Gostaria de informações sobre o bolão: *${bolo.desc}*" 
                   data-price="${bolo.valor}">
                    <i class="fab fa-whatsapp"></i> SOLICITAR INFORMAÇÕES
                </a>
            </div>
        </div>`;
    };

    if(megaDesktop && megaMobileWrapper) {
        megaDesktop.innerHTML = megaSyndicates.map(b => createMegaCard(b, false)).join('');
        megaMobileWrapper.innerHTML = megaSyndicates.map(b => createMegaCard(b, true)).join('');
        updateAllLinks(); 
    }

    // 4. RENDERIZAR JOGOS DO DIA
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
                    <h4>Dias de Sorteio:</h4>
                    <div class="draw-days">${daysHtml}</div>
                </div>
                <div class="game-info-block">
                    <p>${game.howTo}</p>
                </div>
                <a href="https://wa.me/${whatsappNumber}?text=Olá! Gostaria de informações para apostar na *${game.name}*." 
                   class="btn-game-action" 
                   style="--btn-color: ${game.color}">
                   <i class="fab fa-whatsapp"></i> Consultar Disponibilidade
                </a>
            </div>
        </div>`;
    };

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
                btnShowMore.innerHTML = 'Ver Menos <i class="fas fa-chevron-up"></i>';
            } else {
                allCards.forEach((c, i) => { if(i >= 3) c.classList.add('hidden-card'); });
                btnShowMore.innerHTML = 'Ver Mais Jogos <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // Configuração dos links gerais
    document.querySelectorAll('.btn-whatsapp-geral').forEach(btn => {
        btn.href = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de falar com um atendente da Lotérica Country Club.`;
    });

    startCountdown();

    // 7. MODAL DE INFORMAÇÕES
    const modalInfo = document.getElementById('infoModal');
    const btnOpenInfo = document.getElementById('btnOpenInfo');
    const btnCloseModal = document.querySelector('.close-modal');
    const btnCloseModalBtn = document.getElementById('btnCloseModalBtn');

    if (btnOpenInfo && modalInfo) {
        const closeModal = () => {
            modalInfo.classList.remove('active');
            document.body.style.overflow = '';
        };

        btnOpenInfo.addEventListener('click', (e) => {
            e.preventDefault();
            modalInfo.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if(btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
        if(btnCloseModalBtn) btnCloseModalBtn.addEventListener('click', closeModal);
        modalInfo.addEventListener('click', (e) => { if (e.target === modalInfo) closeModal(); });
    }
});

// --- FUNÇÕES AUXILIARES ---

function changeQty(cardId, unitPrice, change) {
    const card = document.getElementById(cardId);
    if(!card) return;
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
    if(!btn) return;
    const baseMsg = btn.getAttribute('data-base-msg');
    // MENSAGEM ALTERADA: Tom de consulta informativa (mais seguro para Ads)
    const finalMsg = `${baseMsg}. Tenho interesse em adquirir ${qty} cota(s). Valor total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Como procedo para o registro?`;
    btn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
}

function updateAllLinks() {
    document.querySelectorAll('.btn-whatsapp-dinamico').forEach(btn => {
        const price = parseFloat(btn.getAttribute('data-price'));
        updateLink(btn, 1, price);
    });
}

function initSwipers() {
    try {
        if(document.querySelector(".swiperMarquee")) {
            new Swiper(".swiperMarquee", { 
                slidesPerView: "auto", loop: true, speed: 6000, 
                autoplay: { delay: 0, disableOnInteraction: false }, 
                allowTouchMove: false 
            });
        }

        if(document.querySelector(".swiperJogos")) {
            new Swiper(".swiperJogos", { 
                effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", initialSlide: 1, 
                coverflowEffect: { rotate: 35, stretch: 0, depth: 100, modifier: 1, slideShadows: false }, 
                pagination: { el: ".swiper-pagination", dynamicBullets: true } 
            });
        }

        if(document.querySelector(".swiperMega")) {
            new Swiper(".swiperMega", { 
                slidesPerView: "auto", centeredSlides: true, spaceBetween: 20, 
                pagination: { el: ".swiper-pagination", dynamicBullets: true } 
            });
        }
    } catch(e) { console.log("Swiper não iniciado: ", e); }
}

function startCountdown() {
    const targetDate = new Date("December 31, 2025 20:00:00").getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) { clearInterval(interval); return; }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const setTime = (id, val) => {
            const el = document.getElementById(id);
            if(el) el.innerText = val < 10 ? "0"+val : val;
        };

        setTime("days", d); setTime("hours", h); setTime("minutes", m); setTime("seconds", s);
    }, 1000);
}