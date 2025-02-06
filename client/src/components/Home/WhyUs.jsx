import { CheckCircle2, Clock, Shield, Zap } from "lucide-react";

const WhyUs = () => {
  const benefits = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      title: "Stay Organized",
      description:
        "Keep all your job applications in one place with our intuitive tracking system.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Never Miss Deadlines",
      description:
        "Get timely reminders for interviews, follow-ups, and important application deadlines.",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Data Security",
      description:
        "Your data is encrypted and secured with enterprise-grade security measures.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Boost Productivity",
      description:
        "Focus on what matters - landing your dream job, while we handle the organization.",
    },
  ];
  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose JobHive?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide the tools you need to streamline your job search
              process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
