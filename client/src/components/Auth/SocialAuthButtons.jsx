import { Facebook, Linkedin, Mail } from "lucide-react";

const SocialAuthButtons = () => {
  const hanldeGoogleSignIn = async () => {
    try {
      window.open("/api/auth/google", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-furafll border-t border-gray-300" />
        </div>
        {/* <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div> */}
      </div>

      {/* <div className=" ">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
          onClick={hanldeGoogleSignIn}
        >
          <Mail className="h-8 w-8 text-red-500" />
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <Facebook className="h-5 w-5 text-blue-600" />
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <Linkedin className="h-5 w-5 text-blue-700" />
        </button>
      </div> */}
    </div>
  );
};

export default SocialAuthButtons;
