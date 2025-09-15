export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-md px-6 py-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
     
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A11.955 11.955 0 0112 15c2.485 0 4.774.756 6.879 2.051M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">CIHP</h1>
        </div>


        {children}
      </div>
    </div>
  );
}
