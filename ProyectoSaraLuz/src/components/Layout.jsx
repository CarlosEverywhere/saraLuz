
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package2, Users, Scissors, Menu, Shirt, Ruler, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const aside = document.querySelector('aside');
      const menuButton = document.querySelector('.menu-button');
      if (isOpen && aside && !aside.contains(event.target) && !menuButton.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 border-b gradient-header z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden text-white hover:text-white/80 menu-button"
            >
              <Menu />
            </Button>
            <h1 className="text-xl font-bold text-white">Sara Luz</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-white hover:text-white/80"
          >
            <LogOut />
          </Button>
        </div>
      </nav>

      <div className="flex h-full pt-16">
        <AnimatePresence>
          {(isOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ width: 0, x: -250 }}
              animate={{ width: "auto", x: 0 }}
              exit={{ width: 0, x: -250 }}
              transition={{ duration: 0.2 }}
              className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r lg:relative lg:w-64 z-40`}
            >
              <nav className="p-4 space-y-2 w-64">
                <Link to="/" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/inventario" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package2 className="mr-2 h-4 w-4" />
                    Rollos
                  </Button>
                </Link>
                <Link to="/proveedores" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Proveedores
                  </Button>
                </Link>
                <Link to="/tendidos" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Scissors className="mr-2 h-4 w-4" />
                    Tendidos
                  </Button>
                </Link>
                <Link to="/cortes" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shirt className="mr-2 h-4 w-4" />
                    Cortes
                  </Button>
                </Link>
                <Link to="/prendas" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Ruler className="mr-2 h-4 w-4" />
                    Prendas
                  </Button>
                </Link>
                <Link to="/usuarios" onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Usuarios
                  </Button>
                </Link>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
