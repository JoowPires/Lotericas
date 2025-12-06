const whatsappNumber = "5511999999999"; 

// --- DADOS DOS BOLÕES DA MEGA (NOVOS CARDS) ---
const megaSyndicates = [
    { name: "Bolão Ouro", cotas: 10, valor: "R$ 100,00", info: "Jogos de 15 dezenas com desdobramento." },
    { name: "Bolão Diamante", cotas: 20, valor: "R$ 250,00", info: "Jogos de 20 números. Alta probabilidade!" },
    { name: "Bolão Premium", cotas: 5, valor: "R$ 500,00", info: "Estratégia VIP. Poucas cotas." }
];

// --- DADOS DOS JOGOS DO DIA (CARDS ANTIGOS) ---
const dailyGames = [
    { name: "Lotofácil", value: "R$ 1.7 MILHÃO", color: "#9c27b0", textColor: "white", desc: "Fácil de ganhar." },
    { name: "Quina", value: "R$ 700 MIL", color: "#3f51b5", textColor: "white", desc: "Sorteios diários." },
    { name: "Mega-Sena", value: "R$ 32 MILHÕES", color: "#209869", textColor: "white", desc: "A queridinha do Brasil." },
    { name: "+Milionária", value: "R$ 10 MILHÕES", color: "#1a237e", textColor: "white", desc: "Prêmio mínimo garantido." },
    { name: "Lotomania", value: "R$ 4.5 MILHÕES", color: "#ff9800", textColor: "white", desc: "50 números para escolher." },
    { name: "Dupla Sena", value: "R$ 2.5 MILHÕES", color: "#a61324", textColor: "white", desc: "Dois sorteios." }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. POP-UP IDADE
    const agePopup = document.getElementById('agePopup');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    if (!sessionStorage.getItem('ageConfirmed')) {
        agePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    btnYes.addEventListener('click', () => {
        agePopup.classList.remove('active');
        sessionStorage.setItem('ageConfirmed', 'true');
        document.body.style.overflow = '';
        setupSwiper();
    });
    btnNo.addEventListener('click', () => alert("Apenas para maiores de 18 anos."));

    // 2. MENU MOBILE (ABAIXAR)
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menuDropdown = document.getElementById('mobileMenuDropdown');
    
    if(menuBtn){
        menuBtn.addEventListener('click', () => {
            menuDropdown.classList.toggle('open');
            // Alterna ícone
            const icon = menuBtn.querySelector('i');
            if(menuDropdown.classList.contains('open')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fecha menu ao clicar em link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuDropdown.classList.remove('open');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. RENDERIZAR BOLÕES DA MEGA (NOVOS CARDS)
    const megaContainer = document.getElementById('mega-boloes-container');
    if(megaContainer) {
        megaContainer.innerHTML = megaSyndicates.map(bolo => `
            <div class="mega-card">
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
        `).join('');
    }

    // 4. RENDERIZAR JOGOS DO DIA (CARDS ANTIGOS)
    const desktopGrid = document.getElementById('daily-games-grid');
    const mobileWrapper = document.getElementById('swiper-daily-wrapper');

    const createOldCard = (game, isSlide) => `
        <div class="${isSlide ? 'swiper-slide ' : ''}game-card">
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
    `;

    if(desktopGrid && mobileWrapper) {
        desktopGrid.innerHTML = dailyGames.map(g => createOldCard(g, false)).join('');
        mobileWrapper.innerHTML = dailyGames.map(g => createOldCard(g, true)).join('');
    }

    // LINKS GERAIS
    document.querySelectorAll('.btn-whatsapp-geral').forEach(btn => {
        btn.href = `https://wa.me/${whatsappNumber}`;
    });
    document.querySelectorAll('.btn-whatsapp-virada').forEach(btn => {
        btn.href = `https://wa.me/${whatsappNumber}?text=Quero Mega da Virada`;
    });
});

// SWIPER
let swiperInstance = null;
function setupSwiper() {
    if (swiperInstance) return;
    swiperInstance = new Swiper(".swiperJogos", {
        slidesPerView: "auto",
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        pagination: { el: ".swiper-pagination", dynamicBullets: true },
    });
}