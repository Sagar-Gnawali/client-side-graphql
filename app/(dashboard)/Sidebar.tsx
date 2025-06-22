import Logo from "@/app/_components/Logo";
import { removeToken } from "@/utils/token";
import { Boxes, LayoutGrid, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const links = [
  { href: "/", name: "Issues", Icon: Boxes },
  { href: "/projects", name: "Projects", Icon: LayoutGrid },
  { href: "/settings", name: "Settings", Icon: Settings },
];
const sideBarClass = "flex gap-2 items-center hover:bg-white border hover:border-black/20 border-transparent py-2 px-2 rounded-lg transition-all";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full py-3">
      <div className="px-4">
        <Link href="/" className="">
          <Logo />
        </Link>
      </div>
      <div className="mt-8 px-4">
        <div>
          {links.map((link) => {
            return (
              <div key={link.href}>
                <Link href={link.href}>
                  <div className={sideBarClass}>
                    <link.Icon size={16} />
                    <span>{link.name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
          <div className="">
            <div
              className={sideBarClass}
              onClick={() => {
                removeToken();
                router.push("/signin");
              }}
            >
              <LogOut size={16} />
              <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
