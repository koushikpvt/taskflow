import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "bg-zinc-900 border border-zinc-700 shadow-2xl rounded-3xl",
            headerTitle: "text-white text-2xl font-bold",
            headerSubtitle: "text-zinc-400",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
            socialButtonsBlockButton: "bg-zinc-800 hover:bg-zinc-700",
          },
        }}
      />
    </div>
  );
}