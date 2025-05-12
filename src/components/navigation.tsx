'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext'; // Maintenant ce sera correctement importé
import { usePathname } from 'next/navigation';
import styles from '../styles/navigation.module.scss';

export default function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link href="/dashboard" className={styles.logo}>
          JDR Manager
        </Link>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Menu principal"
        >
          <span className={styles.hamburger}></span>
        </button>

        <div
          className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}
        >
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tableau de bord
              </Link>
              <Link
                href="/sessions"
                className={`${styles.navLink} ${isActive('/sessions') ? styles.active : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sessions
              </Link>
              <Link
                href="/characters"
                className={`${styles.navLink} ${isActive('/characters') ? styles.active : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Personnages
              </Link>
              <div className={styles.userMenu}>
                <span className={styles.username}>{user.username}</span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className={`${styles.navLink} ${isActive('/register') ? styles.active : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}