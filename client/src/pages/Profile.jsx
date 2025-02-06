import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Edit, Save, X } from "lucide-react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
    Verification: "Verified",
    Last_login: new Date(currentUser.lastLogin).toISOString().split("T")[0],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({ ...user });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!editUser.name.trim()) newErrors.name = "Name required";
    if (!editUser.email.trim() || !/\S+@\S+\.\S+/.test(editUser.email))
      newErrors.email = "Invalid email";
    if (!editUser.phone.trim()) newErrors.phone = "Phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("/api/update-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editUser),
        });

        if (response.ok) {
          setUser(editUser);
          setIsEditing(false);
        } else {
          setErrors((prev) => ({
            ...prev,
            submit: "Update failed",
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          submit: "Network error",
        }));
      }
    }
  };

  return (
    <div className=" w-full flex items-center justify-center mt-4 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8" />
            <h2 className="text-xl font-bold">My Profile</h2>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(false)} //make it true to edit
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              <Edit className="h-5 w-5 text-white" />
            </motion.button>
          )}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.form
                key="edit-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {["name", "email"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={editUser[field]}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                        ${
                          errors[field]
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        }`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}

                <div className="flex justify-between space-x-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditUser(user);
                      setIsEditing(false);
                      setErrors({});
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center"
                  >
                    <X className="mr-2 h-5 w-5" /> Cancel
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
                  >
                    <Save className="mr-2 h-5 w-5" /> Save
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="view-mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {Object.entries(user).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b pb-2 last:border-b-0"
                  >
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
