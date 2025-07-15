import { Navbar } from '@/components/NavBar';
import { LinkStyle1 } from '@/components/LinkStyles';
import Card from '@/components/Card';
import { Buttonstyle1, Buttonstyle2 } from '@/components/ButtonStyles';
import BottomBar from '@/components/BottomBar';
import { ROUTES } from '@/Types/Routes';

const steps = [
  {
    title: 'Connect Your Sources',
    ICON: '1',
    INFO: 'Integrate your website, social media accounts, and existing CRM to start capturing leads from all channels.'
  },
  {
    title: 'Set Up Automation',
    ICON: '2',
    INFO: 'Configure automated workflows, email sequences, and lead scoring rules to nurture prospects automatically.'
  },
  {
    title: 'Monitor & Optimize',
    ICON: '3',
    INFO: 'Track lead quality, conversion rates, and campaign performance with real-time analytics and insights.'
  },
  {
    title: 'Close More Deals',
    ICON: '4',
    INFO: 'Focus on high-quality leads while the system handles nurturing and follow-ups automatically.'
  }
];

const features = [
  {
    title: 'Smart Lead Capture',
    ICON: '👤',
    INFO: 'Website visitor tracking, social media lead identification, form submissions, and lead scoring.'
  },
  {
    title: 'Automated Workflows',
    ICON: '⚡',
    INFO: 'Personalized email sequences, follow-up reminders, lead assignment, and trigger-based actions.'
  },
  {
    title: 'Advanced Analytics',
    ICON: '📊',
    INFO: 'Real-time metrics, conversion tracking, ROI reporting, and custom dashboards.'
  },
  {
    title: 'CRM Integration',
    ICON: '⚙️',
    INFO: 'Salesforce, HubSpot, Pipedrive integration, two-way sync, custom field mapping, and API access.'
  }
];

const INFOPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Back to Home */}
        <div className="goHome">
          <LinkStyle1 ROUTE={ROUTES.INTRO} text="← Back to Home" />
        </div>
        {/* Section 1: Hero */}
        <div className="sec1 text-center py-12">
          <div className="text mb-2">
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">How It Works</span>
          </div>
          <div className="title text-4xl font-bold mb-4">Complete Guide to Automated Lead Generation</div>
          <div className="text text-lg text-gray-500 max-w-2xl mx-auto">
            Learn how our platform transforms your lead generation process from manual to automated, helping you capture more qualified leads and close more deals.
          </div>
        </div>
        {/* Section 2: Steps */}
        <div className="sec2 bg-gray-50 py-12">
          <div className="title text-2xl font-bold text-center mb-8">Get Started in 4 Simple Steps</div>
          <div className="cards grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <Card key={idx} title={step.title} ICON={<span className="step-icon">{step.ICON}</span>} INFO={step.INFO} />
            ))}
          </div>
        </div>
        {/* Section 3: Features */}
        <div className="sec3 py-12">
          <div className="title text-2xl font-bold text-center mb-8">Powerful Features for Modern Sales Teams</div>
          <div className="cards grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Card key={idx} title={feature.title} ICON={<span className="feature-icon text-2xl mr-2">{feature.ICON}</span>} INFO={feature.INFO} />
            ))}
          </div>
        </div>
        {/* Section 4: Call to Action */}
        <div className="sec4 bg-gray-50 py-12 text-center">
          <div className="title text-2xl font-bold mb-4">Ready to Get Started?</div>
          <div className="text text-lg text-gray-500 mb-6">Set up your automated lead generation system in minutes, not hours.</div>
          <div className="button flex justify-center gap-4">
            <Buttonstyle1 ButtonFUNC={() => {window.location.href = '#';}} buttonText="Start Free Trial" />
            <Buttonstyle2 ButtonFUNC={() => {window.location.href = '#';}} buttonText="View Demo" />
          </div>
        </div>
        {/* Bottom Navigation Bar */}
        <div className="Bottom_navBar">
          <BottomBar />
        </div>
      </main>
    </>
  );
}

export default INFOPage