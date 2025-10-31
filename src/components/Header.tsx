import Menu from "./Menu";
import Logo from "./Logo/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Logo fontSize="2rem" />
        </div>
        <Menu />
      </div>
    </header>
  );
}