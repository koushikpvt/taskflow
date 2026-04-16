import './globals.css';
import Navbar from './components/Navbar';
import ClerkProviderWrapper from './clerk-provider';

export const metadata = {
  title: 'TaskFlow',
  description: 'Modern Task Manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white">
        <ClerkProviderWrapper>
          <Navbar />
          {children}
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}