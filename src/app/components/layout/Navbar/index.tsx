import { ChartBarIcon } from "lucide-react";
import useFullscreen from "@/app/hooks/useFullscreen";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";

export default function Navbar() {
  const { isFullscrenActive } = useFullscreen();

  return (
    <nav
      className={cn("fixed top-0 border-b z-20 backdrop-blur w-full", {
        hidden: isFullscrenActive,
      })}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"} className="flex items-center space-x-2">
          <ChartBarIcon className="h-6 w-6 text-primary" />
          <span className="text-lg md:text-xl font-bold">Auto Poll</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                to="/sobre"
                className={navigationMenuTriggerStyle()}
              >
                Sobre
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
