import { Users, Target, Shield } from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About JobHive
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Your trusted companion in the job search journey
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Target className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Our Mission
              </h3>
              <p className="mt-2 text-base text-gray-500">
                To simplify the job search process and help job seekers stay
                organized and focused on their career goals.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Who We Are
              </h3>
              <p className="mt-2 text-base text-gray-500">
                A team of passionate developers and career experts dedicated to
                creating the best job application tracking tool.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Our Values
              </h3>
              <p className="mt-2 text-base text-gray-500">
                We believe in transparency, user privacy, and providing a
                seamless experience for all job seekers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-blue-50 rounded-lg px-6 py-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Thousands of Job Seekers
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Start tracking your job applications today and increase your
              chances of landing your dream job.
            </p>
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
