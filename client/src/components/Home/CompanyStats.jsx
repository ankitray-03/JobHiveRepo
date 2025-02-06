import { Users, Briefcase, Building2 } from "lucide-react";

const CompanyStats = () => {
  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Jobs Tracked", value: "50,000+", icon: Briefcase },
    { label: "Companies", value: "5,000+", icon: Building2 },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
