import { ROUTES } from "@/Types/Routes";
import Link from "next/link";
import { Box, User, LogOut } from "lucide-react";
import type { userProps } from '@/Types/User';
import { useAppData } from '@/Tools/useAppData';
// import { useRouter } from 'next/navigation';

interface NavbarProps {
  UserData?: userProps | null;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { isAUTH, handleLogout } = useAppData();
  return (
    <>
      <main className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="webName flex items-center gap-2">
            <Link href={ROUTES.MAIN_PAGE}>
              <span className="bg-blue-100 flex rounded-lg p-1">
                <Box className="text-blue-600" size={28} />
                <h1 className="text-2xl flex font-bold text-blue-700">Stock Page</h1>
              </span>
            </Link>
          </div>
          </div>
          {/* Navigation Links */}
          <div className="elements flex gap-8 items-center">
            {!isAUTH ? (
              <>
                <div className="elment">
                  <Link href={ROUTES.FEATURES} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
                </div>
                <div className="elment">
                  <Link href={ROUTES.ABOUT} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">ABOUT</Link>
                </div>
                <div className="elment">
                  <Link href={ROUTES.CONTACT} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">CONTACT</Link>
                </div>
              </>
            ) : (
             <>
                <div className="elment">
                  <Link href={ROUTES.MAIN_PAGE} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
                </div>
                <div className="elment">
                  <Link
                    href={ROUTES.PROFILE}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 hover:text-red-800 transition-colors font-medium flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
     </>
            )}
          </div>
        </main>
    </>
  );
};

export default Navbar;