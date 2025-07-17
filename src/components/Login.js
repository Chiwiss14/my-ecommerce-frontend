export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r bg-gray-100 px-4 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
             type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-t" />
        </div>

        {/* Social login buttons */}
        <div className="space-y-3">
          <button className="flex items-center justify-center border border-gray-300 rounded-xl py-2 w-full hover:bg-gray-50">
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google icon"
              className="w-5 h-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>

          <button className="flex items-center justify-center border border-gray-300 rounded-xl py-2 w-full hover:bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
              alt="X icon"
              className="w-5 h-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Continue with X</span>
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-600 font-semibold hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
