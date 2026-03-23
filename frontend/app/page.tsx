import Image from "next/image";
import Link from "next/link";
import { characterPanels, heroSignals, journeyCards, projectPillars, traitCards } from "@/lib/disperson-content";

export default function HomePage() {
  return (
    <>
      <section className="hero hero--immersive">
        <div className="shell hero-showcase">
          <div className="hero__copy">
            <span className="eyebrow">Big Five / OCEAN / Perfil visual</span>
            <h1>Descubre tu mezcla de rasgos y conviertela en un perfil visual con atmosfera propia.</h1>
            <p className="lead">
              Disperson une psicologia interpretativa, preguntas dinamicas y una capa Disney que vuelve el resultado
              mas memorable sin sacar a OCEAN del centro.
            </p>

            <div className="hero__actions">
              <Link href="/quiz/start" className="button">
                Empezar test
              </Link>
              <Link href="/about" className="button button--ghost">
                Como funciona
              </Link>
            </div>

            <div className="hero__stats">
              <div>
                <strong>5</strong>
                <span>dimensiones OCEAN</span>
              </div>
              <div>
                <strong>BD</strong>
                <span>preguntas dinamicas</span>
              </div>
              <div>
                <strong>1</strong>
                <span>perfil persistido por usuario</span>
              </div>
            </div>

            <div className="signal-ribbon" aria-label="Claves del producto">
              {heroSignals.map((signal) => (
                <span key={signal} className="signal-pill">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-stage">
            <article className="surface surface--accent hero-stage__panel">
              <div className="hero-stage__media">
                <Image
                  src={characterPanels[0].image}
                  alt="Resultado visual principal de Disperson"
                  width={560}
                  height={700}
                  priority
                  unoptimized
                />
              </div>

              <div className="hero-stage__body">
                <div>
                  <p className="surface__eyebrow">Resultado principal</p>
                  <h2>Rasgo dominante, nivel y personaje asociado en una sola mirada.</h2>
                  <p>
                    El flujo cruza scoring, interpretacion y narrativa visual para que el perfil se vea mas cercano
                    desde la primera pantalla.
                  </p>
                </div>

                <div className="hero-stage__meta">
                  <div className="hero-stage__metric">
                    <span>Modelo</span>
                    <strong>OCEAN</strong>
                  </div>
                  <div className="hero-stage__metric">
                    <span>Salida</span>
                    <strong>Radar + perfil</strong>
                  </div>
                  <div className="hero-stage__metric">
                    <span>Lectura</span>
                    <strong>Psico + visual</strong>
                  </div>
                </div>

                <div className="hero-orbit" aria-label="Dimensiones principales">
                  {traitCards.map((trait) => (
                    <div key={trait.letter} className="hero-orbit__node">
                      <strong>{trait.letter}</strong>
                      <span>{trait.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="hero-stage__side">
              {characterPanels.slice(1).map((panel) => (
                <article key={panel.title} className="surface hero-mini-card">
                  <div className="hero-mini-card__thumb">
                    <Image src={panel.image} alt={panel.title} width={320} height={320} loading="lazy" unoptimized />
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
        </div>
      </section>

      <section className="section section--dense">
        <div className="shell landing-mosaic">
          <article className="surface landing-mosaic__wide">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow">Recorrido</span>
              <h2>De respuestas guardadas a un perfil que se entiende rapido y se recuerda mejor.</h2>
            </div>

            <div className="journey-strip">
              {journeyCards.map((card, index) => (
                <article key={card.title} className="journey-step">
                  <span className="journey-step__index">0{index + 1}</span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>

          {projectPillars.slice(0, 2).map((panel) => (
            <article key={panel.title} className="surface mosaic-note">
              <p className="surface__eyebrow">{panel.eyebrow}</p>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dense">
        <div className="shell discovery-layout">
          <article className="surface trait-wall">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow">Modelo OCEAN</span>
              <h2>Cinco dimensiones visibles en una misma escena.</h2>
            </div>

            <div className="trait-wall__grid">
              {traitCards.map((trait) => (
                <article key={trait.letter} className="trait-wall__card">
                  <div className="trait-wall__top">
                    <span className="trait-wall__letter">{trait.letter}</span>
                    <p className="surface__eyebrow">{trait.title}</p>
                  </div>
                  <p>{trait.summary}</p>
                  <div className="trait-wall__anchors">
                    <span>{trait.lowAnchor}</span>
                    <span>{trait.highAnchor}</span>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="surface gallery-panel">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow">Capa Disney</span>
              <h2>El resultado no solo se lee: tambien se ve y se recuerda.</h2>
            </div>

            <div className="gallery-panel__grid">
              {characterPanels.map((panel) => (
                <figure key={panel.title} className="gallery-panel__card">
                  <div className="gallery-panel__thumb">
                    <Image src={panel.image} alt={panel.title} width={360} height={420} loading="lazy" unoptimized />
                  </div>
                  <figcaption>
                    <p className="surface__eyebrow">{panel.eyebrow}</p>
                    <h3>{panel.title}</h3>
                    <p>{panel.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section--band">
        <div className="shell callout callout--visual">
          <div>
            <span className="eyebrow">Siguiente paso</span>
            <h2>Entra al flujo real y deja que tu perfil tome forma.</h2>
            <p className="callout__note">
              Login, cuestionario y perfil final conviven dentro de la misma experiencia para que el recorrido se sienta continuo.
            </p>
          </div>

          <div className="callout__actions">
            <Link href="/quiz/start" className="button">
              Ir al cuestionario
            </Link>
            <Link href="/profile" className="button button--ghost">
              Ver perfil
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
