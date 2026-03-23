import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <p className="site-footer__title">Disperson</p>
          <p className="site-footer__copy">
            Big Five / OCEAN, perfiles persistidos y una capa visual de personajes en la misma experiencia.
          </p>
        </div>

        <div className="site-footer__links">
          <Link href="/about">Proyecto</Link>
          <Link href="/contact">Contacto</Link>
          <Link href="/profile">Perfil</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
