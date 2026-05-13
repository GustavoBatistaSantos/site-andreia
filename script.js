// --- SISTEMA DE ABAS (TABS) ---
function openTab(evt, tabName) {
    const clickedBtn = evt.currentTarget;
    const tabContainer = clickedBtn.closest('.container, .bg-light');
    
    if (!tabContainer) return;

    // Remove classe ativa de todos os blocos de conteúdo daquela seção
    const allContents = tabContainer.getElementsByClassName('tab-content');
    for (let i = 0; i < allContents.length; i++) {
        allContents[i].classList.remove('active');
    }

    // Desativa estilos e propriedades ARIA de todos os botões daquela barra de abas
    const allButtons = tabContainer.getElementsByClassName('tab-btn');
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active');
        allButtons[i].setAttribute('aria-selected', 'false');
    }

    // Ativa o container correspondente
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Ativa o botão clicado
    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');
}

// Fechamento automático do menu mobile ao clicar
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const menuCheck = document.getElementById('menu-check');
        if (menuCheck) {
            menuCheck.checked = false;
        }
    });
});

// --- LÓGICA COMPARTILHADA DO QUIZ ---
function verificarResposta(botaoClicado, eCorreto) {
    const containerOpcoes = botaoClicado.parentElement;
    const containerQuiz = containerOpcoes.parentElement;
    const feedbackDiv = containerQuiz.querySelector('.quiz-feedback');
    const todosBotoes = containerOpcoes.querySelectorAll('.quiz-opt');

    // Desativa os botões para dar uma experiência estável e sem duplo clique confundindo o aluno
    todosBotoes.forEach(btn => btn.disabled = true);

    if (eCorreto) {
        botaoClicado.classList.add('correta');
        feedbackDiv.style.color = '#10b981';
        feedbackDiv.textContent = '✔️ Muito bem! Você acertou!';
    } else {
        botaoClicado.classList.add('errada');
        feedbackDiv.style.color = '#ef4444';
        feedbackDiv.textContent = '❌ Não era bem essa. Dica: releia as instruções do passo a passo acima!';
        
        // Destaca suavemente a alternativa correta após curto intervalo (Previsibilidade cognitiva)
        setTimeout(() => {
            todosBotoes.forEach(btn => {
                if (btn.getAttribute('onclick').includes('true')) {
                    btn.classList.add('correta');
                }
            });
        }, 600);
    }
}

// --- LÓGICA DO JOGO DA MEMÓRIA INCLUSIVO ---
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

    // Embaralhamento fixo e tranquilo
    const cartasEmbaralhadas = [...dadosCartas].sort(() => Math.random() - 0.5);

    cartasEmbaralhadas.forEach(dado => {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.dataset.id = dado.id;
        elementoCarta.dataset.textoReal = dado.texto;
        elementoCarta.textContent = "❓"; 
        
        elementoCarta.addEventListener('click', virarCarta);
        grid.appendChild(elementoCarta);
    });
}

function virarCarta() {
    if (bloqueiaTabuleiro) return;
    if (this.classList.contains('virada') || this.classList.contains('par-encontrado')) return;

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
        // Tempo calmo (1.2s) para leitura antes de ocultar
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            carta1.textContent = "❓";
            carta2.textContent = "❓";
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

// Dispara o carregamento do jogo automaticamente ao iniciar a página
document.addEventListener('DOMContentLoaded', iniciarJogo);
