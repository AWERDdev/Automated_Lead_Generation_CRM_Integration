'use client'

import Navbar from "@/Components/NavBarNoAUTH2";
import { useRouter } from 'next/navigation';
import { useAppData } from '@/Tools/useAppData';
import { AuthGuard } from '@/Components/AuthGuard';
import { useEffect } from 'react';
import { API_BASE_URL } from "@/Config";
import { ButtonStyle9 } from '@/Components/ButtonStyles';
// import { LoadingPage, ErrorPage } from '@/Components/PageHandle';
import { ROUTES } from "@/Types/Routes";

  const MainPage: React.FC = ()=> {
  const router = useRouter();
  const { user, userType } = useAppData();
  // const [ loading, setLoading ] = useState(true);
  // const [ error, setError ] = useState<string | null>(null);
  const goToCONTACT = () => {
    router.push(ROUTES.CONTACT);
  };

  const verifyToken = async () => {
    
    try {
      const token = localStorage.getItem('USERtoken') || localStorage.getItem('COMPtoken');
      if (!token) {
        return false;
      }
      const response = await fetch(`${API_BASE_URL}/apiAUTH/validateToken`,{
        method:"GET",
        headers:{
          'Authorization': `Bearer ${token}` 
        }
      });
      const data = await response.json();
      
      return data.AUTH === true;
    } catch (error) {
      console.log(`failed to validate ${error}`);
      return false;
    }
  }
  
  const handleFunctions = async () => {
    const tokenVerified = await verifyToken();

    if (!tokenVerified) {
      console.log('token invalid');
      router.push(ROUTES.HOME);
    } else {
      console.log('token valid');

    }
  };

  useEffect(() => {
    handleFunctions();
  });
  return (
    <AuthGuard>
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="text-gray-600">
            {userType === 'USER' 
              ? 'Browse our medicine catalog and place orders for your needs.'
              : 'Manage your hospital\'s medicine supply chain efficiently.'
            }
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center">Available Medicines</h2>
        <p className="text-gray-600 mb-8 text-center">Click on any medicine to view detailed information and place orders</p>
        
      

        {/* Call to Action */}
        <div className="text-center mt-12 grid justify-center ">
          <p className="text-gray-600 mb-4 ">Need more medicines or bulk orders?</p>
          <ButtonStyle9 onClick={goToCONTACT} ButtonText="Contact sales Team" />
        </div>
      </div>
      </main>
    </AuthGuard>
  );
}

export default MainPage