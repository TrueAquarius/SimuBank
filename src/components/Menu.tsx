import Link from "next/link";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/sequence", label: "Sequence" },
];

export default function Menu() {
  return (
    <nav>
      <ul className="flex items-center space-x-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <p className="text-sm font-medium text-gray-500 hover:text-gray-900">
                {item.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}