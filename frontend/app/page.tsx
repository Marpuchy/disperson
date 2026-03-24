import Image from "next/image";
import Link from "next/link";
import { characterPanels, contactCards, journeyCards, traitCards } from "@/lib/disperson-content";

const heroScores = [
  { label: "Experiencia", value: 78 },
  { label: "Responsabilidad", value: 64 },
  { label: "Amabilidad", value: 71 },
];

const oceanCopy: Record<string, string> = {
  O: "Curiosidad, imaginacion y apertura ante lo nuevo.",
  C: "Orden, constancia y capacidad para sostener compromisos.",
  E: "Energia social, iniciativa y comodidad en contextos activos.",
  A: "Empatia, cooperacion y sensibilidad hacia los demas.",
  N: "Calma, regulacion y respuesta equilibrada ante la presion.",
};

const collaborationCards = [
  {
    eyebrow: "Autoria",
    title: "Marc Ibanez Puchol",
    text: "Direccion creativa, narrativa visual y construccion de una experiencia centrada en personalidad, atmosfera y lectura interpretativa.",
  },
  {
    eyebrow: "Colaboracion UJI",
    title: "Base psicometrica",
    text: "La narrativa y el cuestionario se apoyan en una colaboracion real que aporta contexto academico a la experiencia.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="section hero landing-hero">
        <div className="shell landing-hero__layout">
          <div className="landing-hero__copy">
            <span className="eyebrow">Big Five / OCEAN / Perfil visual</span>
            <h1>Descubre tu mezcla de rasgos y conviertela en un perfil visual con atmosfera propia.</h1>
            <p className="lead">
              Disperson convierte la exploracion de la personalidad en una experiencia guiada, visual y facil de
              recordar.
            </p>

            <div className="hero__actions">
              <Link href="/quiz/start" className="button">
                Empezar test
              </Link>
              <Link href="/about" className="button button--ghost">
                Conocer la experiencia
              </Link>
            </div>

            <div className="landing-hero__stats">
              <div>
                <strong>5</strong>
                <span>dimensiones de personalidad</span>
              </div>
              <div>
                <strong>Lectura</strong>
                <span>interpretacion clara</span>
              </div>
              <div>
                <strong>Perfil</strong>
                <span>visual unico</span>
              </div>
            </div>
          </div>

          <div className="landing-hero__visual">
            <article className="surface surface--accent landing-hero__card">
              <div className="landing-hero__overview">
                <div>
                  <p className="surface__eyebrow">Preview del resultado</p>
                  <h2>Un retrato de personalidad que se entiende rapido y se recuerda mejor.</h2>
                </div>

                <p className="landing-hero__summary">
                  Rasgos, interpretacion y personaje asociado aparecen en una sola escena para que la lectura se sienta
                  inmediata.
                </p>
              </div>

              <div className="landing-hero__main">
                <div className="landing-hero__media">
                  <div className="landing-hero__media-frame">
                    <Image
                      src={characterPanels[0].image}
                      alt="Representacion visual del resultado de Disperson"
                      width={640}
                      height={760}
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                <div className="landing-hero__preview">
                  <div className="landing-hero__chart" aria-hidden="true">
                    <svg viewBox="0 0 220 220" role="presentation">
                      <polygon className="landing-hero__grid" points="110,22 192,83 160,184 60,184 28,83" />
                      <polygon className="landing-hero__grid" points="110,48 167,90 145,160 75,160 53,90" />
                      <polygon className="landing-hero__grid" points="110,74 142,98 131,136 89,136 78,98" />
                      <line className="landing-hero__axis" x1="110" y1="110" x2="110" y2="22" />
                      <line className="landing-hero__axis" x1="110" y1="110" x2="192" y2="83" />
                      <line className="landing-hero__axis" x1="110" y1="110" x2="160" y2="184" />
                      <line className="landing-hero__axis" x1="110" y1="110" x2="60" y2="184" />
                      <line className="landing-hero__axis" x1="110" y1="110" x2="28" y2="83" />
                      <polygon className="landing-hero__shape" points="110,41 163,94 145,150 82,164 70,89" />
                      <circle className="landing-hero__point" cx="110" cy="41" r="5" />
                      <circle className="landing-hero__point" cx="163" cy="94" r="5" />
                      <circle className="landing-hero__point" cx="145" cy="150" r="5" />
                      <circle className="landing-hero__point" cx="82" cy="164" r="5" />
                      <circle className="landing-hero__point" cx="70" cy="89" r="5" />
                    </svg>
                  </div>

                  <div className="landing-hero__scores">
                    {heroScores.map((score) => (
                      <div key={score.label} className="landing-hero__score">
                        <div className="landing-hero__score-copy">
                          <span>{score.label}</span>
                          <div className="landing-hero__score-bar" style={{ ["--fill" as string]: `${score.value}%` }} />
                        </div>
                        <strong>{score.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="landing-hero__metrics">
                <div className="landing-hero__metric">
                  <strong>Lectura</strong>
                  <span>Mapa de rasgos claro</span>
                </div>
                <div className="landing-hero__metric">
                  <strong>Interpretacion</strong>
                  <span>Significado facil de recorrer</span>
                </div>
                <div className="landing-hero__metric">
                  <strong>Personaje</strong>
                  <span>Asociacion emocional del perfil</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section landing-ocean">
        <div className="shell landing-ocean__layout">
          <div className="section-heading landing-ocean__intro">
            <span className="eyebrow">El nucleo de la experiencia</span>
            <h2>Las cinco dimensiones ordenan toda la experiencia.</h2>
            <p>
              Cada rasgo ilumina una parte distinta de tu manera de estar en el mundo. La capa visual acompana, pero la
              lectura nace siempre del Big Five.
            </p>
          </div>

          <div className="landing-ocean__rows">
            <div className="landing-ocean__row landing-ocean__row--top">
              {traitCards.slice(0, 3).map((trait) => (
                <article key={trait.letter} className="landing-ocean__card">
                  <div className="landing-ocean__card-top">
                    <span className="landing-ocean__letter">{trait.letter}</span>
                    <h3>{trait.title}</h3>
                  </div>
                  <p>{oceanCopy[trait.letter]}</p>
                  <div className="landing-ocean__anchors">
                    <span>{trait.lowAnchor}</span>
                    <span>{trait.highAnchor}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="landing-ocean__row landing-ocean__row--bottom">
              {traitCards.slice(3).map((trait) => (
                <article key={trait.letter} className="landing-ocean__card">
                  <div className="landing-ocean__card-top">
                    <span className="landing-ocean__letter">{trait.letter}</span>
                    <h3>{trait.title}</h3>
                  </div>
                  <p>{oceanCopy[trait.letter]}</p>
                  <div className="landing-ocean__anchors">
                    <span>{trait.lowAnchor}</span>
                    <span>{trait.highAnchor}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section landing-visual">
        <div className="shell landing-visual__layout">
          <div className="section-heading landing-visual__intro">
            <span className="eyebrow">Capa visual</span>
            <h2>El personaje llega como recompensa emocional de un resultado ya interpretado.</h2>
            <p>
              Primero aparece la lectura de rasgos. Despues llega una asociacion visual que vuelve el resultado mas
              cercano, mas evocador y mas facil de recordar.
            </p>
          </div>

          <article className="surface landing-visual__feature">
            <div className="landing-visual__feature-media">
              <Image
                src={characterPanels[0].image}
                alt={characterPanels[0].title}
                width={620}
                height={520}
                unoptimized
              />
            </div>

            <div className="landing-visual__feature-copy">
              <p className="surface__eyebrow">{characterPanels[0].eyebrow}</p>
              <h3>{characterPanels[0].title}</h3>
              <p>{characterPanels[0].text}</p>
            </div>
          </article>

          <div className="landing-visual__examples">
            {characterPanels.slice(1).map((panel) => (
              <article key={panel.title} className="surface landing-visual__example">
                <div className="landing-visual__example-thumb">
                  <Image src={panel.image} alt={panel.title} width={260} height={240} loading="lazy" unoptimized />
                </div>
                <div>
                  <p className="surface__eyebrow">{panel.eyebrow}</p>
                  <h3>{panel.title}</h3>
                  <p>{panel.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dense landing-journey">
        <div className="shell landing-journey__layout">
          <div className="landing-journey__intro">
            <span className="eyebrow">Como se vive la experiencia</span>
            <h2>Un recorrido pensado para pasar de la intuicion a una lectura que deja huella.</h2>
            <p>
              Cada etapa prepara la siguiente para que el resultado no se sienta como un numero, sino como una
              interpretacion personal y reconocible.
            </p>
          </div>

          <div className="landing-journey__track">
            {journeyCards.map((card, index) => (
              <article key={card.title} className="landing-journey__step">
                <span className="landing-journey__index">0{index + 1}</span>
                <div className="landing-journey__step-body">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="landing-journey__notes">
            {collaborationCards.map((card) => (
              <article key={card.title} className="surface landing-journey__note">
                <p className="surface__eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="section section--band landing-closing">
        <div className="shell landing-closing__layout">
          <div className="landing-closing__copy">
            <span className="eyebrow">Da el siguiente paso</span>
            <h2>Entra en una lectura de personalidad hecha para quedarse contigo.</h2>
            <p>
              Puedes empezar el cuestionario, volver a tu espacio personal o profundizar en el enfoque que da forma a
              Disperson.
            </p>
            <Link href="/quiz/start" className="button">
              Empezar test
            </Link>
          </div>

          <div className="landing-closing__actions">
            {contactCards.map((card, index) => (
              <article key={card.title} className="surface landing-closing__action">
                <div className="landing-closing__action-copy">
                  <span className="landing-closing__action-index">0{index + 1}</span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </div>
                <Link href={card.href} className="button button--ghost">
                  {card.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
