import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <img
          src="/images/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <SignUp
          path="/sign-up"
          routing="path"
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-3xl p-6",
              headerTitle: "text-white text-2xl font-bold text-center",
              headerSubtitle: "text-zinc-400 text-center",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl py-3 transition-all shadow-lg shadow-blue-600/20",
              socialButtonsBlockButton: "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-2xl py-2.5 transition-all",
              formFieldInput: "bg-zinc-950 border border-zinc-800 text-white rounded-2xl focus:border-blue-500 transition-colors",
              formFieldLabel: "text-zinc-300 font-medium",
              footerActionLink: "text-blue-400 hover:text-blue-300 font-medium",
            },
          }}
        />
      </div>
    </div>
  );
}