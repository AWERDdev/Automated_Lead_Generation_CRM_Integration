import Navbar from "@/components/NavBar";
import { Buttonstyle1 , Buttonstyle2 } from "@/components/ButtonStyles";
import  Card  from '@/components/Card'
import BNavbar from "@/components/BottomBar";
import Image from "next/image";
const IntroPage: React.FC = () => {
  return (
    <>
    <main className="flex flex-col min-h-screen">
      {/* Header/Nav */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Navbar/>
      </header>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Automate Your Lead Generation</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Transform your sales process with AI-powered lead generation and seamless CRM integration. Capture, nurture, and convert leads automatically.</p>
          <div className="space-x-4">
            <Buttonstyle1 ButtonFUNC={() => {console.log('hello world')}} buttonText="Get Started Free"/>
            <Buttonstyle2 ButtonFUNC={() => {console.log('hello world')}} buttonText="Learn More"/>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card 
              title="Smart Lead Capture" 
              ICON={<Image src="/globe.svg" alt="Smart Lead Capture" className="h-10 w-10 mb-2 text-primary" />} 
              INFO="Automatically identify and capture high-quality leads from multiple sources. Our AI analyzes visitor behavior, social media interactions, and engagement patterns to identify the most promising prospects." 
            />
            <Card 
              title="Automated Workflows" 
              ICON={<Image src="/file.svg" alt="Automated Workflows" className="h-10 w-10 mb-2 text-primary" />} 
              INFO="Set up intelligent nurturing sequences that run on autopilot. Create personalized email sequences, follow-up reminders, and task assignments that adapt based on lead behavior and engagement." 
            />
            <Card 
              title="Advanced Analytics" 
              ICON={<Image src="/window.svg" alt="Advanced Analytics" className="h-10 w-10 mb-2 text-primary" />} 
              INFO="Track performance and optimize your lead generation strategy. Get detailed insights into lead quality, conversion rates, and ROI with comprehensive dashboards and reporting tools." 
            />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Sales Process?</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Join thousands of businesses already using our platform to generate more qualified leads.</p>
          <Buttonstyle1 ButtonFUNC={() => {console.log('hello world')}} buttonText="Start Your Free Trial"/>
        </div>
      </section>
      {/* Footer/BottomBar */}
      <footer>
        <BNavbar/>
      </footer>
    </main>
    </>
  );
}

export default IntroPage