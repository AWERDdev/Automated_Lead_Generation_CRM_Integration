 import { NavbarNoAUTH } from '@/components/NavBar'
 import { Input } from '@/components/Inputs'
 import { Signup_validate } from '@/tools/UseValidation';
 const SignupPage: React.FC = () => {
  const {errors,validate} = Signup_validate()
  
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900">
        <header className="w-full">
          <div>
            <NavbarNoAUTH/>
          </div>
        </header>
        <div className="text-center mb-8">
          <div className="mb-2"><h1 className="text-2xl font-bold">Create an account</h1></div>
          <div><p className="text-gray-500 text-base">Start your free trial and transform your lead generation</p></div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg px-8 py-8 min-w-[350px] max-w-[400px] w-full mb-6 flex flex-col gap-6">
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <Input Label="First Name" PlaceHolder='First Name' ID='First_Name' Type='text'/>
              </div>
              <div>
                <Input Label="Last Name" PlaceHolder='Last Name' ID='Last_Name' Type='text'/>
              </div>
              <div>
                <Input Label="Email" PlaceHolder='Email' ID='Email' Type='Email'/>
              </div>
              <div>
                <Input Label="Password" PlaceHolder='Password' ID='Password' Type='password'/>
              </div>
              <div>
                <Input Label="Comfirm Password" PlaceHolder='Comfirm Password' ID='ComfirmPassword' Type='password'/>
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

export default SignupPage