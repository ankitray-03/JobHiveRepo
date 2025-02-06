import { LineChart, Clock, Bell, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Track Progress",
      description:
        "Monitor your application status and success rate with intuitive analytics.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Never Miss Deadlines",
      description:
        "Set reminders for interviews and follow-ups to stay on top of opportunities.",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Notifications",
      description:
        "Get timely alerts for application updates and upcoming interviews.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Network Management",
      description: "Keep track of your professional contacts and interactions.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything you need to manage your job search
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
