import { Briefcase } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-8">
            <Briefcase className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Track Your Job Applications
            <br />
            <span className="text-blue-600">All in One Place</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Stay organized in your job search. Track applications, interviews,
            and follow-ups with our easy-to-use platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block">
          {/* image */}

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-in-office-3455479-2929000.png"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
