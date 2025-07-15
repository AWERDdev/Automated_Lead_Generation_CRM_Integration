import { NavbarNoAUTH } from '@/components/NavBar'
import { Input } from '@/components/Inputs'

 const LoginPage: React.FC = () => {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900">
        <header className="w-full">
          <div>
            <NavbarNoAUTH/>
          </div>
        </header>
        <div className="text-center mb-8">
          <div className="mb-2"><h1 className="text-2xl font-bold">Welcome back</h1></div>
          <div><p className="text-gray-500 text-base">Sign in to your account to continue</p></div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg px-8 py-8 min-w-[350px] max-w-[400px] w-full mb-6 flex flex-col gap-6">
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <Input Label="Email" PlaceHolder='Email' ID='Email' Type='Email'/>
              </div>
              <div>
                <Input Label="Password" PlaceHolder='Password' ID='Password' Type='password'/>
              </div>
            </div>
          </form>
        </div>
        <div></div>
        <div></div>
      </main>
    </>
  );
}

export default LoginPage