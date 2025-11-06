export default function Footer() {
  return (
    <footer className="bg-deblack text-dewhite py-8 text-center border-t border-delightblue/40">
      <p className="text-sm opacity-80">
        © {new Date().getFullYear()} Digerati Experts · All Rights Reserved
      </p>
    </footer>
  );
}
