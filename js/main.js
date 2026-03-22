// ============================================================
//  PORTFÓLIO PESSOAL — JOÃO VICTOR FERNANDES
//  main.js
// ============================================================

// ============================================================
//  TEMA CLARO / ESCURO
//  Salva a preferência no localStorage
// ============================================================
const body      = document.body;
const themeBtn  = document.getElementById('themeBtn');

// Aplica o tema salvo ou usa claro como padrão
const savedTheme = localStorage.getItem('jvf-theme') || 'light';
body.classList.add(savedTheme);

themeBtn.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.replace('light', 'dark');
    localStorage.setItem('jvf-theme', 'dark');
  } else {
    body.classList.replace('dark', 'light');
    localStorage.setItem('jvf-theme', 'light');
  }
});

// ============================================================
//  CURSOR PERSONALIZADO
// ============================================================
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

// Posição suavizada do cursor grande
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  dotX = e.clientX;
  dotY = e.clientY;
});

// O cursor grande segue com leve atraso (lerp)
function animateCursor() {
  cursorX += (dotX - cursorX) * 0.12;
  cursorY += (dotY - cursorY) * 0.12;

  cursor.style.left    = cursorX + 'px';
  cursor.style.top     = cursorY + 'px';
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top  = dotY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Efeito hover sobre links e botões
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
});

// ============================================================
//  MENU HAMBURGUER (mobile)
// ============================================================
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Fecha o menu ao clicar em qualquer link
mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// ============================================================
//  HEADER COM SOMBRA AO ROLAR
// ============================================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ============================================================
//  LINK ATIVO NO MENU CONFORME SEÇÃO VISÍVEL
//  Usa IntersectionObserver para detectar qual seção está na tela
// ============================================================
const sections  = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ============================================================
//  EFEITO TYPEWRITER NO HERO
//  Alterna entre diferentes descrições
// ============================================================
const typewriterEl = document.getElementById('typewriter');

// Palavras que vão aparecer após "Desenvolvedor "
const words = [
  'Front-end',
  'de Interfaces',
  'Web',
  'em formação',
];

let wordIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typeTimeout;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    // Apagando
    typewriterEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
  } else {
    // Digitando
    typewriterEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    // Palavra completa — pausa antes de apagar
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Apagou tudo — próxima palavra
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  typeTimeout = setTimeout(type, speed);
}

// Inicia o typewriter após um pequeno delay
setTimeout(type, 800);

// ============================================================
//  ANIMAÇÃO REVEAL AO ROLAR (cards de skills e projetos)
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // para de observar após revelar
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ============================================================
//  ANIMAÇÃO DAS BARRAS DE IDIOMA
//  Dispara quando a seção Sobre entra na tela
// ============================================================
const langFills = document.querySelectorAll('.lang-fill');

const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      langFills.forEach(bar => {
        // A largura alvo está no atributo data-width
        const targetWidth = bar.dataset.width + '%';
        // Pequeno delay para a transição CSS ser percebida
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);
      });
      langObserver.disconnect(); // dispara só uma vez
    }
  });
}, { threshold: 0.3 });

const sobreSection = document.getElementById('sobre');
if (sobreSection) langObserver.observe(sobreSection);

// ============================================================
//  VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ============================================================
const contactForm   = document.getElementById('contactForm');
const modal         = document.getElementById('modal');
const fecharModal   = document.getElementById('fecharModal');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // impede reload da página

    const nome     = document.getElementById('nome');
    const email    = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    const erroNome     = document.getElementById('erroNome');
    const erroEmail    = document.getElementById('erroEmail');
    const erroMensagem = document.getElementById('erroMensagem');

    let valido = true;

    // Validação do nome
    if (nome.value.trim() === '') {
      nome.classList.add('invalid');
      erroNome.textContent = 'Informe seu nome.';
      valido = false;
    } else {
      nome.classList.remove('invalid');
      erroNome.textContent = '';
    }

    // Validação do e-mail com regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
      email.classList.add('invalid');
      erroEmail.textContent = 'Informe seu e-mail.';
      valido = false;
    } else if (!emailRegex.test(email.value.trim())) {
      email.classList.add('invalid');
      erroEmail.textContent = 'E-mail inválido. Ex: usuario@dominio.com';
      valido = false;
    } else {
      email.classList.remove('invalid');
      erroEmail.textContent = '';
    }

    // Validação da mensagem
    if (mensagem.value.trim() === '') {
      mensagem.classList.add('invalid');
      erroMensagem.textContent = 'Escreva uma mensagem.';
      valido = false;
    } else {
      mensagem.classList.remove('invalid');
      erroMensagem.textContent = '';
    }

    // Se tudo ok: limpa o formulário e abre o modal
    if (valido) {
      contactForm.reset();
      modal.classList.remove('hidden');
    }
  });
}

// Fecha o modal pelo botão
fecharModal && fecharModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Fecha o modal clicando no fundo
modal && modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});
