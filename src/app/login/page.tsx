'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/auth.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';

  // Utiliser useEffect pour la redirection après le rendu
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push(from);
    }
  }, [isAuthenticated, loading, router, from]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h1>Connexion</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        
        <p className={styles.authLink}>
          Vous n'avez pas de compte ? <Link href="/register">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}