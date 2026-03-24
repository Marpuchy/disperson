import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <p className="site-footer__title">Disperson</p>
          <p className="site-footer__copy">
            Big Five / OCEAN, lectura visual y personajes asociados en una misma experiencia de autoconocimiento.
          </p>
        </div>

        <div className="site-footer__links">
          <Link href="/about">Enfoque</Link>
          <Link href="/contact">Contacto</Link>
          <Link href="/profile">Perfil</Link>
        </div>
      </div>
    </footer>
  );
}
