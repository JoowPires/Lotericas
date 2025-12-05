/* --- CONFIGURAÇÕES --- */
const whatsappNumber = "5511999999999"; 

/* --- DADOS DOS JOGOS --- */
const allGames = [
    { name: "Mega da Virada", value: "R$ 600 MILHÕES", color: "#004528", textColor: "white", desc: "O maior prêmio da história! Não acumula. Sorteio dia 31/12." },
    { name: "Lotofácil", value: "R$ 1.7 MILHÃO", color: "#9c27b0", textColor: "white", desc: "Uma das mais fáceis de ganhar. Aposte com 15 a 20 números." },
    { name: "Mega-Sena", value: "R$ 32 MILHÕES", color: "#209869", textColor: "white", desc: "A queridinha do Brasil. Prêmios milionários toda semana." },
    { name: "Quina", value: "R$ 700 MIL", color: "#3f51b5", textColor: "white", desc: "Sorteios diários de segunda a sábado. Chances incríveis." },
    { name: "+Milionária", value: "R$ 10 MILHÕES", color: "#1a237e", textColor: "white", desc: "Mais chances de ganhar e prêmio mínimo garantido de 10 mi." },
    { name: "Lotomania", value: "R$ 4.5 MILHÕES", color: "#ff9800", textColor: "white", desc: "Escolha 50 números. Ganhe com 20, 19, 18... ou nenhum acerto!" },
    { name: "Timemania", value: "R$ 12 MILHÕES", color: "#8bc34a", textColor: "#004528", desc: "O jogo para quem é apaixonado por futebol e pelo seu time." },
    { name: "Dupla Sena", value: "R$ 2.5 MILHÕES", color: "#a61324", textColor: "white", desc: "O dobro de chances de ganhar com o mesmo bilhete. Dois sorteios." },
    { name: "Dia de Sorte", value: "R$ 300 MIL", color: "#cb852b", textColor: "white", desc: "Aposte nos seus números da sorte e no seu mês favorito." }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // --- LÓGICA DO POP-UP DE IDADE ---
    // =======================================================
    const agePopup = document.getElementById('agePopup');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const isAgeConfirmed = sessionStorage.getItem('ageConfirmed');
    
    if (!isAgeConfirmed) {
        agePopup.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    btnYes.addEventListener('click', () => {
        agePopup.classList.remove('active');
        sessionStorage.setItem('ageConfirmed', 'true');
        document.body.style.overflow = '';
    });

    btnNo.addEventListener('click', () => {
        alert("Desculpe, este site é apenas para maiores de 18 anos.");
    });
    // =======================================================
    // --- FIM LÓGICA DO POP-UP ---
    // =======================================================
    
    // --- 1. RENDERIZAR TICKER ---
    const tickerContainer = document.getElementById('ticker-content');
    if(tickerContainer) {
        const itemsHtml = allGames.map(game => `
            <div class="ticker-pill" style="background-color: ${game.color}; color: ${game.textColor}">
                ${game.name}
                <span style="color: #333">${game.value}</span>
            </div>
        `).join('');
        tickerContainer.innerHTML = itemsHtml + itemsHtml; 
    }

    // --- 2. RENDERIZAR CARDS PARA AS DUAS ESTRUTURAS ---
    const desktopContainer = document.getElementById('games-container');
    const swiperContainer = document.getElementById('swiper-games-container');
    
    if(desktopContainer && swiperContainer) {
        const desktopFragment = document.createDocumentFragment();
        const swiperFragment = document.createDocumentFragment();

        allGames.forEach((game) => {
            const cardHtml = `
                <div class="card-header" style="background-color: ${game.color}; color: ${game.textColor}">
                    ${game.name} ${game.name.includes("Virada") ? '<i class="fas fa-star" style="color:#ffd700"></i>' : ''}
                </div>
                <div class="card-body">
                    <div>
                        <p class="prize-label">Estimativa de Prêmio</p>
                        <div class="jackpot">${game.value}</div>
                        <p class="card-desc">${game.desc}</p>
                    </div>
                    <a href="https://wa.me/${whatsappNumber}?text=Olá! Quero apostar na ${game.name}" 
                       class="btn-card" target="_blank" 
                       style="color:${game.color}; border-color:${game.color}">
                        <i class="fab fa-whatsapp"></i> Apostar Agora
                    </a>
                </div>
            `;
            
            // Cria card Desktop
            const desktopCard = document.createElement('div');
            desktopCard.className = `game-card`; 
            desktopCard.innerHTML = cardHtml;
            desktopFragment.appendChild(desktopCard);

            // Cria slide Mobile (DEVE ter a classe swiper-slide)
            const swiperSlide = document.createElement('div');
            swiperSlide.className = `swiper-slide game-card`; 
            swiperSlide.innerHTML = cardHtml;
            swiperFragment.appendChild(swiperSlide);
        });

        // Adiciona ao DOM
        desktopContainer.appendChild(desktopFragment);
        swiperContainer.appendChild(swiperFragment);
        

        // --- 3. INICIALIZAÇÃO DO SWIPER (NA ESTRUTURA MOBILE) ---
        var swiper = new Swiper(".swiperJogos", {
            effect: "coverflow", // <<< EFEITO COVERFLOW REATIVADO
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto", // Importante para o efeito de peek/overflow
            loop: true,
            coverflowEffect: { // <<< CONFIGURAÇÃO DO EFEITO 3D
                rotate: 40,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
        });
    }

    // --- 4. LINKS WHATSAPP ---
    document.querySelectorAll('.btn-whatsapp-geral').forEach(btn => {
        btn.href = `https://wa.me/${whatsappNumber}?text=Olá! Vim pelo site da Lotérica Country Club e gostaria de atendimento.`;
    });
    
    document.querySelectorAll('.btn-whatsapp-virada').forEach(btn => {
        btn.href = `https://wa.me/${whatsappNumber}?text=Olá! Quero garantir meu bolão da Mega da Virada 2025!`;
    });
});