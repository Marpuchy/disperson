import Image from "next/image";
import Link from "next/link";
import { characterPanels, contactCards } from "@/lib/disperson-content";

export default function ContactPage() {
  return (
    <>
      <section className="hero hero--content">
        <div className="shell contact-stage">
          <div className="section-heading">
            <span className="eyebrow">Contacto</span>
            <h1>Demo funcional, revision del producto y mantenimiento del contenido desde un mismo punto.</h1>
            <p className="lead">
              Aqui puedes entrar al flujo real de Disperson, abrir el banco administrable del proyecto o escribir para
              revisar su evolucion funcional y tecnica.
            </p>
          </div>

          <article className="surface contact-spotlight">
            <div>
              <p className="surface__eyebrow">Canal principal</p>
              <h2>mibanezp0709@gmail.com</h2>
              <p>
                El contacto central sirve tanto para revisar la experiencia como para hablar del cuestionario, del perfil
                final o del mantenimiento del banco de preguntas y personajes.
              </p>
            </div>

            <div className="contact-spotlight__meta">
              <div>
                <strong>Email</strong>
                <span>Feedback y demos</span>
              </div>
              <div>
                <strong>Admin</strong>
                <span>Preguntas y personajes</span>
              </div>
              <div>
                <strong>Stack</strong>
                <span>Symfony + Twig + Doctrine</span>
              </div>
            </div>

            <div className="inline-actions">
              <a href="mailto:mibanezp0709@gmail.com" className="button">
                Escribir ahora
              </a>
              <Link href="/quiz/start" className="button button--ghost">
                Abrir el test
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--dense">
        <div className="shell contact-board">
          <div className="contact-board__grid">
            {contactCards.map((card) => (
              <article key={card.title} className="surface contact-card">
                <h2>{card.title}</h2>
                <p>{card.text}</p>
                <Link href={card.href} className="text-link">
                  {card.label}
                </Link>
              </article>
            ))}
          </div>

          <article className="surface contact-board__aside">
            <div>
              <p className="surface__eyebrow">Capa visual</p>
              <h2>La parte emocional del proyecto tambien comunica marca.</h2>
              <p>
                El sistema de personajes no sustituye la base psicologica, pero si ayuda a que la experiencia se vea
                viva y tenga una recompensa clara al final del recorrido.
              </p>
            </div>

            <div className="contact-board__aside-thumbs">
              {characterPanels.slice(1).map((panel) => (
                <div key={panel.image} className="contact-board__aside-thumb">
                  <Image src={panel.image} alt={panel.title} width={260} height={260} loading="lazy" unoptimized />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
