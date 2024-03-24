import getYear from "../util/getYear";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 py-10 bg-base-200 text-base-content text-md sm:text-lg">
      <aside>
        <p>Copyright © {getYear()} - Berat Dilki</p>
        <a
          href="https://github.com/berat-552"
          className="underline underline-offset-2 hover:text-primary"
        >
          GitHub
        </a>
      </aside>
    </footer>
  );
}
