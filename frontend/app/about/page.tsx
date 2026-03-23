import Image from "next/image";
import Link from "next/link";
import { characterPanels, heroSignals, journeyCards, projectPillars, traitCards } from "@/lib/disperson-content";

export default function AboutPage() {
  return (
    <>
      <section className="hero hero--content">
        <div className="shell content-showcase">
          <div className="section-heading">
            <span className="eyebrow">Proyecto</span>
            <h1>Psicologia interpretativa, persistencia real y una narrativa visual que no tapa el modelo OCEAN.</h1>
            <p className="lead">
              Disperson no se presenta como diagnostico clinico ni como quiz generico. El producto parte del Big Five,
              usa preguntas reales en base de datos y remata en un perfil visual mas facil de entender.
            </p>
          </div>

          <article className="surface manifesto-card">
            <div className="manifesto-card__thumbs">
              {characterPanels.slice(0, 2).map((panel) => (
                <div key={panel.image} className="manifesto-card__thumb">
                  <Image src={panel.image} alt={panel.title} width={360} height={360} loading="lazy" unoptimized />
                </div>
              ))}
            </div>

            <div className="manifesto-card__stats">
              {heroSignals.map((signal) => (
                <div key={signal}>
                  <strong>{signal.split(" ")[0]}</strong>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section--dense">
        <div className="shell about-mosaic">
          {projectPillars.map((panel) => (
            <article key={panel.title} className="surface about-pillar">
              <p className="surface__eyebrow">{panel.eyebrow}</p>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </article>
          ))}

          <article className="surface about-mosaic__wide">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow">Dimensiones</span>
              <h2>Las cinco piezas del modelo siguen visibles en todo el producto.</h2>
            </div>

            <div className="trait-rail">
              {traitCards.map((trait) => (
                <article key={trait.letter} className="trait-rail__item">
                  <span className="trait-wall__letter">{trait.letter}</span>
                  <h3>{trait.title}</h3>
                  <p>{trait.summary}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section--dense">
        <div className="shell workflow-board">
          <article className="surface workflow-board__lead">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow">Arquitectura del recorrido</span>
              <h2>El producto esta pensado para pasar rapido de respuesta a interpretacion.</h2>
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

          <div className="inline-actions">
            <Link href="/quiz/start" className="button">
              Probar la aplicacion
            </Link>
            <Link href="/admin" className="button button--ghost">
              Gestionar contenido
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
