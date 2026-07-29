"use client";

import { useEffect, useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Comunicação essencial para evoluir com consistência.",
    price: "R$ 47,99",
    suffix: "/ mês",
    features: [
      "Treinos de dicção e oratória",
      "Análises personalizadas",
      "Histórico de evolução",
    ],
    action: "Assinar Basic",
  },
  {
    name: "Pro",
    description:
      "Mais confiança, presença e preparação para apresentações.",
    price: "R$ 97,99",
    suffix: "/ mês",
    features: [
      "Tudo do Basic",
      "Trilhas de confiança",
      "Preparação para apresentações",
    ],
    action: "Assinar Pro",
    recommended: true,
  },
  {
    name: "Vitalício",
    description: "Acesso vitalício à plataforma e às futuras melhorias.",
    price: "R$ 499",
    suffix: "pagamento único",
    features: [
      "Acesso para sempre",
      "Todos os treinos",
      "Melhor custo no longo prazo",
    ],
    action: "Garantir acesso vitalício",
    lifetime: true,
  },
];

const showcaseCards = [
  {
    name: "Resultado",
    color: "green",
    title: "Seu resultado",
    content: (
      <>
        <div className="result-highlight">
          <span className="round-check">✓</span>
          <div>
            <small>VOCÊ FOI BEM EM</small>
            <strong>Suas pausas ficaram mais naturais.</strong>
          </div>
        </div>
        <div className="mini-grid">
          <div>
            <small>PODE MELHORAR</small>
            <strong>Palavras principais</strong>
            <p>Destaque melhor o ponto central.</p>
          </div>
          <div className="blue-mini">
            <small>PRÓXIMO TREINO</small>
            <strong>Presença ao falar</strong>
            <p>3 minutos · nível leve</p>
          </div>
        </div>
      </>
    ),
  },
  {
    name: "Confiança",
    color: "blue",
    title: "Sua confiança",
    content: (
      <>
        <div className="confidence-number">
          <strong>82%</strong>
          <span>mais segurança<br />ao apresentar</span>
        </div>
        <div className="mini-grid">
          <div>
            <small>SEU DESTAQUE</small>
            <strong>Contato visual</strong>
            <p>Ritmo firme e natural.</p>
          </div>
          <div>
            <small>CONTINUE ASSIM</small>
            <strong>Pausas conscientes</strong>
            <p>Você transmite calma.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    name: "Vocabulário",
    color: "yellow",
    title: "Seu vocabulário",
    content: (
      <>
        <div className="result-highlight vocabulary">
          <span>↗</span>
          <div>
            <small>NOVA CONQUISTA</small>
            <strong>Você encontrou palavras mais precisas.</strong>
          </div>
        </div>
        <div className="mini-grid">
          <div>
            <small>EXPRESSÕES NOVAS</small>
            <strong>12 palavras</strong>
            <p>Usadas com naturalidade.</p>
          </div>
          <div className="blue-mini">
            <small>PRÓXIMO PASSO</small>
            <strong>Improviso leve</strong>
            <p>2 minutos · nível leve</p>
          </div>
        </div>
      </>
    ),
  },
];

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Bona Prosa — página inicial">
      <span className="bird-logo" aria-hidden="true">
        <i />
      </span>
      <span><b>Bona</b> Prosa</span>
    </a>
  );
}

function ArrowButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={`button ${className}`} href="#planos">
      <span>{children}</span><b>→</b>
    </a>
  );
}

function PhoneMockup({ compact = false }: { compact?: boolean }) {
  const [recording, setRecording] = useState(false);
  return (
    <div className={`phone-scene ${compact ? "compact-phone-scene" : ""}`}>
      {!compact && <><i className="orbit one" /><i className="orbit two" /></>}
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-status"><b>9:41</b><span>● ◔ ▰</span></div>
        <div className="phone-head">
          <span className="phone-b">B</span>
          <div><small>BONA PROSA</small><strong>{compact ? "Sua evolução" : "Olá, João!"}</strong></div>
          {!compact && <em>3 dias ✦</em>}
        </div>
        {compact ? (
          <div className="evolution-screen">
            <small>CONFIANÇA AO FALAR</small>
            <strong className="score">82%</strong>
            <div className="bar-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="evolution-grid">
              <div><small>SEQUÊNCIA</small><b>7 dias</b></div>
              <div><small>TREINOS</small><b>14 feitos</b></div>
            </div>
            <div className="next-training"><small>PRÓXIMO TREINO</small><b>Presença ao falar</b><span>→</span></div>
          </div>
        ) : (
          <div className="phone-content">
            <small>TREINO DE HOJE</small>
            <h2>{recording ? "Estamos ouvindo você..." : "Organize uma ideia em 30 segundos."}</h2>
            <p>{recording ? "Fale com calma. Seu progresso aparece logo depois." : "Fale sobre algo que você gostaria de melhorar na sua rotina."}</p>
            <div className="phone-tags"><span>Dicção</span><span>Confiança</span><span>Clareza</span></div>
            <div className="prompt"><small>COMECE ASSIM</small><b>“Uma mudança que faria diferença...”</b></div>
            <button className={recording ? "recording" : ""} onClick={() => setRecording(!recording)}>
              <span>◉</span>{recording ? "Finalizar treino" : "Começar treino"}
            </button>
          </div>
        )}
        <div className="phone-nav"><span>⌂<small>Início</small></span><span>◉<small>Treinos</small></span><span>↗<small>Evolução</small></span><span>○<small>Perfil</small></span></div>
      </div>
      {!compact && (
        <>
          <div className="float-badge badge-time"><span>◷</span><small>TREINO RÁPIDO<strong>3 minutos</strong></small></div>
          <div className="float-badge badge-progress"><span>↗</span><small>EVOLUÇÃO<strong>+18% em clareza</strong></small></div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const track = document.querySelector<HTMLElement>(".showcase-track");
      if (!track) return;
      const start = track.offsetTop;
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(0.999, (window.scrollY - start) / span));
      setActiveShowcase(Math.min(2, Math.floor(progress * 3)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
            <a href="#beneficios">A experiência</a>
            <a href="#como-funciona">Benefícios</a>
            <a href="#planos">Planos</a>
          </nav>
          <div className="header-actions">
            <a className="login" href="/login">Entrar</a>
            <a className="app-button" href="/cadastro">Ir para o APP</a>
            <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="grid-pattern" />
        <div className="hero-inner">
          <div className="hero-copy reveal">
            <p className="eyebrow yellow">O poder da sua voz começa aqui</p>
            <h1>Fale.<span>Cative as<br />pessoas.</span><em>Impressione.</em></h1>
            <p className="lead">Sua fala tem mais poder do que você imagina. Como você tem se comunicado ultimamente?</p>
            <div className="hero-actions">
              <ArrowButton>Quero cativar as pessoas</ArrowButton>
              <a className="text-link" href="#beneficios">Ver como funciona</a>
            </div>
            <div className="proof"><span>✓ Poucos minutos por dia</span><span>✓ Sem julgamentos</span><span>✓ No seu ritmo</span></div>
          </div>
          <PhoneMockup />
        </div>
      </section>

      <section className="showcase-track" id="beneficios">
        <div className="showcase-sticky">
          <div className="showcase-glow" />
          <div className="showcase-copy">
            <p className="eyebrow blue">O jeito Bona Prosa</p>
            <h2>É simples.<span>Você fala.</span>A gente ajuda<br />a evoluir.</h2>
            <p>De complicado já basta a vida, o Bona Prosa veio pra facilitar!</p>
            <ArrowButton className="outline-button">Quero descomplicar também</ArrowButton>
            <div className="showcase-tabs">
              {showcaseCards.map((card, i) => (
                <button key={card.name} className={activeShowcase === i ? "active" : ""} onClick={() => setActiveShowcase(i)}>
                  <i />{card.name}
                </button>
              ))}
            </div>
          </div>
          <div className="card-stack">
            {showcaseCards.map((card, i) => (
              <article key={card.name} className={`result-card ${card.color} ${activeShowcase === i ? "active" : ""}`} style={{ "--card-index": i } as React.CSSProperties}>
                <div className="result-head"><span className="phone-b">B</span><div><small>BONA PROSA</small><strong>{card.title}</strong></div><em>Hoje</em></div>
                {card.content}
                <div className="wave">▂▃▅▇▅▃▂▃▆▇▅▂▃▆▅▃▂</div>
              </article>
            ))}
            <small className="scroll-hint">ROLE PARA AVANÇAR</small>
          </div>
        </div>
      </section>

      <section className="how" id="como-funciona">
        <div className="section-title">
          <p className="eyebrow green">Como funciona</p>
          <h2>Escolha. Fale. Evolua.</h2>
          <p>Um caminho simples entre a prática e o seu próximo passo.</p>
        </div>
        <div className="timeline">
          <article><div><small>PASSO 01</small><h3>Comece pelo que importa</h3><p>Escolha uma habilidade e faça um treino curto, pensado para uma situação real.</p></div><span>1</span></article>
          <article><span>2</span><div><small>PASSO 02</small><h3>Você fala. O app entende.</h3><p>Grave do seu jeito. A Bona Prosa observa ritmo, clareza e confiança na sua comunicação.</p></div></article>
          <article><div><small>PASSO 03</small><h3>Evolua a cada conversa</h3><p>Receba uma orientação simples, pratique novamente e perceba sua evolução.</p></div><span>3</span></article>
        </div>
        <ArrowButton className="secondary-button">Ver como funciona</ArrowButton>
      </section>

      <section className="guidance" id="experiencia">
        <div className="guidance-inner">
          <div className="guidance-visual">
            <PhoneMockup compact />
            <div className="guidance-callout c1"><b>✓</b><span>FEEDBACK CLARO<strong>Saiba onde melhorar</strong></span></div>
            <div className="guidance-callout c2"><b>↗</b><span>EVOLUÇÃO<strong>Acompanhe seu avanço</strong></span></div>
            <div className="guidance-callout c3"><b>✦</b><span>PERSONALIZADO<strong>Treinos para você</strong></span></div>
          </div>
          <div className="guidance-copy">
            <p className="eyebrow blue-text">Orientação personalizada</p>
            <h2>Orientações cada vez mais úteis para o seu jeito de falar.</h2>
            <p>A Bona Prosa transforma cada treino em um próximo passo possível. Você pratica, entende o que já funciona e sabe exatamente onde evoluir.</p>
            <ul><li>Começa pelo que você já fez bem</li><li>Mostra poucos pontos por vez</li><li>Indica um próximo treino possível</li></ul>
            <ArrowButton className="blue-button">Conhecer a experiência</ArrowButton>
          </div>
        </div>
      </section>

      <section className="pricing" id="planos">
        <div className="section-title light">
          <p className="eyebrow yellow">Planos</p>
          <h2>Escolha como você quer evoluir.</h2>
          <p>Geralmente um raio não cai no mesmo lugar. Então escolha seu plano antes que não dê mais tempo.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`plan ${plan.recommended ? "recommended" : ""} ${plan.lifetime ? "lifetime" : ""}`} key={plan.name}>
              {plan.recommended && <div className="recommended-label">MAIS ESCOLHIDO</div>}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="price"><strong>{plan.price}</strong><span>{plan.suffix}</span></div>
              <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href="/cadastro">{plan.action}</a>
            </article>
          ))}
        </div>
        <p className="pricing-note">Protótipo conceitual: a cobrança ainda não está ativa.</p>
      </section>

      <section className="final-cta" id="comecar">
        <div className="final-inner">
          <div className="final-phone">
            <div className="mini-phone">
              <span className="phone-b">B</span><b>Olá! Vamos treinar?</b>
              <div className="sound-wave">▂▄▆█▆▄▂▄▇▅▃▅▇▄▂</div>
              <i>◉</i>
            </div>
            <div className="final-float one">✦ Treino concluído</div>
            <div className="final-float two">↗ +18% de clareza</div>
          </div>
          <div className="final-copy">
            <p className="eyebrow light-blue">Sua voz merece espaço</p>
            <h2>Não espere a próxima oportunidade para descobrir que poderia ter se comunicado melhor.</h2>
            <p>Tenha no bolso um treino rápido, orientação prática e a confiança para transformar qualquer conversa em uma chance de ser lembrado.</p>
            <ArrowButton className="white-button">Ir para o APP</ArrowButton>
            <small>Comece em poucos minutos. Evolua por toda a vida.</small>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div><Brand /><p>Comunicação clara, prática e acessível.</p></div>
          <div><b>Experiência</b><a href="#beneficios">Benefícios</a><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a></div>
          <div><b>Institucional</b><a href="#privacidade">Privacidade</a><a href="#termos">Termos de uso</a><a href="mailto:contato@bonaprosa.com.br">Contato</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Bona Prosa.</span><span>Feito para quem quer se expressar melhor.</span></div>
      </footer>
    </main>
  );
}
