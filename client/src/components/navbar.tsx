import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-deblue via-depurple to-demagenta text-dewhite shadow-neon">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Digerati Experts
        </Link>
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <Link href="/ecosystem">ProActive Ecosystem</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
