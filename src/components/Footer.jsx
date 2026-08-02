import { footer, fullName } from '../content';

export default function Footer() {
  return (
    <footer className="border-t border-hairline/60">
      <div className="container-page flex flex-col gap-2 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {footer.year} {fullName}
        </p>
        <p>{footer.builtWith}</p>
      </div>
    </footer>
  );
}
