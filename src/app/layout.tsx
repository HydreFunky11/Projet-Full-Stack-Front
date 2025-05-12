import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/authContext';
import Navigation from '../components/navigation';
import '../styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App de Jeu de Rôle',
  description: 'Application de gestion de jeux de rôle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <div className="container">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}