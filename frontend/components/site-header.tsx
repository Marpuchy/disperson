import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Enfoque" },
  { href: "/contact", label: "Contacto" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="brand">
          <span className="brand__mark">D</span>
          <span className="brand__text">Disperson</span>
        </Link>

        <nav className="site-nav" aria-label="Principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/login" className="button button--ghost">
            Entrar
          </Link>
          <Link href="/quiz/start" className="button">
            Empezar test
          </Link>
        </div>
      </div>
    </header>
  );
}
