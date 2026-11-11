import { Link } from "react-router-dom";
import logo from "../../assets/shavi-logo.webp";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  onOpenSidebar: () => void;
}

const MobileNav = ({ onOpenSidebar }: MobileNavProps) => {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-[#1E3A8A] text-white">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Shavi Homes" 
            className="h-8 w-auto brightness-0 invert"
          />
          <h1 className="font-heading font-black text-white text-lg tracking-tight">Admin</h1>
        </Link>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onOpenSidebar}
        className="text-white hover:bg-white/10 h-10 w-10 rounded-xl"
      >
        <Menu className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default MobileNav;
