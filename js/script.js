const whatsappNumber = "5511999999999"; 

// --- DADOS DOS BOLÕES DA MEGA ---
const megaSyndicates = [
    { name: "Bolão Ouro", cotas: 10, valor: "R$ 100,00", info: "Jogos de 15 dezenas com desdobramento." },
    { name: "Bolão Diamante", cotas: 20, valor: "R$ 250,00", info: "Jogos de 20 números. Alta probabilidade!" },
    { name: "Bolão Premium", cotas: 5, valor: "R$ 500,00", info: "Estratégia VIP. Poucas cotas." }
];

// --- DADOS DOS JOGOS DO DIA ---
const dailyGames = [
    { name: "Lotofácil", value: "R$ 1.7 MILHÃO", color: "#9c27b0", textColor: "white", desc: "Fácil de ganhar." },
    { name: "Quina", value: "R$ 700 MIL", color: "#3f51b5", textColor: "white", desc: "Sorteios diários." },
    { name: "Mega-Sena", value: "R$ 32 MILHÕES", color: "#209869", textColor: "white", desc: "A queridinha do Brasil." },
    { name: "+Milionária", value: "R$ 10 MILHÕES", color: "#1a237e", textColor: "white", desc: "Prêmio mínimo garantido." },
    { name: "Lotomania", value: "R$ 4.5 MILHÕES", color: "#ff9800", textColor: "white", desc: "50 números para escolher." },
    { name: "Dupla Sena", value: "R$ 2.5 MILHÕES", color: "#a61324", textColor: "white", desc: "Dois sorteios." },
    { name: "Timemania", value: "R$ 12 MILHÕES", color: "#8bc34a", textColor: "#004528", desc: "O jogo para quem é apaixonado." },
    { name: "Dia de Sorte", value: "R$ 300 MIL", color: "#cb852b", textColor: "white", desc: "Aposte nos seus números." },
    { name: "Super Sete", value: "R$ 1.5 MILHÃO", color: "#d9d9d9", textColor: "#333", desc: "Colunas da sorte." }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. POP-UP IDADE
    const agePopup = document.getElementById('agePopup');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    
    if (!sessionStorage.getItem('ageConfirmed')) {
        agePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        initSwipers(); 
    }
    
    btnYes.addEventListener('click', () => {
        agePopup.classList.remove('active');
        sessionStorage.setItem('ageConfirmed', 'true');
        document.body.style.overflow = '';
        initSwipers();
    });
    
    btnNo.addEventListener('click', () => alert("Apenas para maiores de 18 anos."));

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

    // 3. RENDERIZAR BOLÕES DA MEGA
    const megaDesktop = document.getElementById('mega-boloes-grid');
    const megaMobileWrapper = document.getElementById('swiper-mega-wrapper');
    const createMegaCard = (bolo, isSlide) => `
        <div class="${isSlide ? 'swiper-slide ' : ''}mega-card">
            <div class="mega-header">${bolo.name}</div>
            <div class="mega-body">
                <p><strong>${bolo.cotas}</strong> Cotas Disponíveis</p>
                <div class="mega-price">${bolo.valor}</div>
                <p class="mega-info">${bolo.info}</p>
                <a href="https://wa.me/${whatsappNumber}?text=Quero o ${bolo.name}" class="btn-mega">
                    <i class="fab fa-whatsapp"></i> COMPRAR
                </a>
            </div>
        </div>
    `;
    if(megaDesktop && megaMobileWrapper) {
        megaDesktop.innerHTML = megaSyndicates.map(b => createMegaCard(b, false)).join('');
        megaMobileWrapper.innerHTML = megaSyndicates.map(b => createMegaCard(b, true)).join('');
    }

    // 4. RENDERIZAR JOGOS DO DIA
    const dailyDesktop = document.getElementById('daily-games-grid');
    const dailyMobileWrapper = document.getElementById('swiper-daily-wrapper');
    const createDailyCard = (game, isSlide, index) => {
        const hiddenClass = (!isSlide && index >= 3) ? 'hidden-card' : '';
        return `
        <div class="${isSlide ? 'swiper-slide ' : ''}game-card ${hiddenClass}">
            <div class="card-header" style="background-color: ${game.color}; color: ${game.textColor}">
                ${game.name}
            </div>
            <div class="card-body">
                <div>
                    <p class="prize-label">Prêmio</p>
                    <div class="jackpot">${game.value}</div>
                    <p class="card-desc">${game.desc}</p>
                </div>
                <a href="https://wa.me/${whatsappNumber}?text=Apostar na ${game.name}" 
                   class="btn-card" style="color:${game.color}; border-color:${game.color}">
                   Apostar
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
                hiddenCards.forEach(card => {
                    card.classList.remove('hidden-card');
                    card.classList.add('was-hidden');
                });
                btnShowMore.innerHTML = 'Ver Menos Jogos <i class="fas fa-chevron-up"></i>';
            } else {
                allCards.forEach((card, index) => {
                    if(index >= 3) {
                        card.classList.add('hidden-card');
                        card.classList.remove('was-hidden');
                    }
                });
                btnShowMore.innerHTML = 'Ver Mais Jogos <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // LINKS GERAIS
    document.querySelectorAll('.btn-whatsapp-geral').forEach(btn => btn.href = `https://wa.me/${whatsappNumber}`);
    document.querySelectorAll('.btn-whatsapp-virada').forEach(btn => btn.href = `https://wa.me/${whatsappNumber}?text=Quero Mega da Virada`);
});

// CONFIGURAÇÃO DOS SLIDERS
let swipersInitialized = false;
function initSwipers() {
    if (swipersInitialized) return;
    new Swiper(".swiperJogos", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 40, stretch: 0, depth: 100, modifier: 1, slideShadows: true,
        },
        pagination: { el: ".swiper-pagination", dynamicBullets: true },
    });
    new Swiper(".swiperMega", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: { el: ".swiper-pagination", dynamicBullets: true },
    });
    swipersInitialized = true;
}