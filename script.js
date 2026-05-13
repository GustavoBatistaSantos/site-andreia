/* =========================================
SISTEMA DE ABAS
========================================= */

function openTab(evt, tabName) {

    const clickedBtn = evt.currentTarget;

    const tabContainer = clickedBtn.closest('.container, .bg-light');

    if (!tabContainer) return;

    const allContents = tabContainer.getElementsByClassName('tab-content');

    for (let i = 0; i < allContents.length; i++) {
        allContents[i].classList.remove('active');
    }

    const allButtons = tabContainer.getElementsByClassName('tab-btn');

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active');
        allButtons[i].setAttribute('aria-selected', 'false');
    }

    const activeTab = document.getElementById(tabName);

    if (activeTab) {
        activeTab.classList.add('active');
    }

    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');
}

/* =========================================
ABAS DOS VÍDEOS
========================================= */

function openVideoTab(evt, tabId) {

    const clickedBtn = evt.currentTarget;

    const sectionVideos = document.getElementById('videos');

    if (!sectionVideos) return;

    const allVideoTabs = sectionVideos.querySelectorAll('.tab-content-video');

    allVideoTabs.forEach(tab => {

        tab.classList.remove('active');
        tab.style.display = 'none';

        const iframes = tab.querySelectorAll('iframe');

        iframes.forEach(frame => {

            const currentSrc = frame.src;

            frame.src = '';
            frame.src = currentSrc;
        });
    });

    const allButtons = sectionVideos.querySelectorAll('.tab-btn-video');

    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);

    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.display = 'block';
    }

    clickedBtn.classList.add('active');
}

/* =========================================
FECHAR MENU MOBILE
========================================= */

document.querySelectorAll('nav ul li a').forEach(link => {

    link.addEventListener('click', () => {

        const menuCheck = document.getElementById('menu-check');

        if (menuCheck) {
            menuCheck.checked = false;
        }
    });
});

/* =========================================
QUIZ
========================================= */

function verificarResposta(botaoClicado, eCorreto) {

    const containerOpcoes = botaoClicado.parentElement;

    const containerQuiz = containerOpcoes.parentElement;

    const feedbackDiv = containerQuiz.querySelector('.quiz-feedback');

    const todosBotoes = containerOpcoes.querySelectorAll('.quiz-opt');

    todosBotoes.forEach(btn => btn.disabled = true);

    if (eCorreto) {

        botaoClicado.classList.add('correta');

        feedbackDiv.style.color = '#10b981';

        feedbackDiv.textContent = '✔️ Muito bem! Você acertou!';

    } else {

        botaoClicado.classList.add('errada');

        feedbackDiv.style.color = '#ef4444';

        feedbackDiv.textContent = '❌ Não era bem essa.';

        setTimeout(() => {

            todosBotoes.forEach(btn => {

                if (btn.getAttribute('onclick').includes('true')) {
                    btn.classList.add('correta');
                }
            });

        }, 600);
    }
}

/* =========================================
JOGO DA MEMÓRIA
========================================= */

const dadosCartas = [

    { id: 1, texto: "🦴 Ossos", tipo: "nome" },
    { id: 1, texto: "Sustentam o nosso corpo", tipo: "funcao" },

    { id: 2, texto: "🫁 Pulmões", tipo: "nome" },
    { id: 2, texto: "Fazem a respiração", tipo: "funcao" },

    { id: 3, texto: "❤️ Coração", tipo: "nome" },
    { id: 3, texto: "Bombeia o sangue", tipo: "funcao" },

    { id: 4, texto: "🧠 Cérebro", tipo: "nome" },
    { id: 4, texto: "Controla o nosso corpo", tipo: "funcao" }
];

let cartasViradas = [];
let bloqueiaTabuleiro = false;

function iniciarJogo() {

    const grid = document.getElementById('memoriaGrid');

    if (!grid) return;

    grid.innerHTML = '';

    cartasViradas = [];

    bloqueiaTabuleiro = false;

    const cartasEmbaralhadas = [...dadosCartas].sort(() => Math.random() - 0.5);

    cartasEmbaralhadas.forEach(dado => {

        const elementoCarta = document.createElement('div');

        elementoCarta.classList.add('carta');

        elementoCarta.dataset.id = dado.id;

        elementoCarta.dataset.textoReal = dado.texto;

        elementoCarta.textContent = '❓';

        elementoCarta.addEventListener('click', virarCarta);

        grid.appendChild(elementoCarta);
    });
}

function virarCarta() {

    if (bloqueiaTabuleiro) return;

    if (
        this.classList.contains('virada') ||
        this.classList.contains('par-encontrado')
    ) {
        return;
    }

    this.classList.add('virada');

    this.textContent = this.dataset.textoReal;

    cartasViradas.push(this);

    if (cartasViradas.length === 2) {
        checarPar();
    }
}

function checarPar() {

    const [carta1, carta2] = cartasViradas;

    const ePar = carta1.dataset.id === carta2.dataset.id;

    if (ePar) {

        carta1.classList.add('par-encontrado');
        carta2.classList.add('par-encontrado');

        limparTurno();

    } else {

        bloqueiaTabuleiro = true;

        setTimeout(() => {

            carta1.classList.remove('virada');
            carta2.classList.remove('virada');

            carta1.textContent = '❓';
            carta2.textContent = '❓';

            limparTurno();

        }, 1200);
    }
}

function limparTurno() {

    cartasViradas = [];
    bloqueiaTabuleiro = false;
}

function reiniciarJogo() {
    iniciarJogo();
}

/* =========================================
INICIAR JOGO
========================================= */

document.addEventListener('DOMContentLoaded', iniciarJogo);