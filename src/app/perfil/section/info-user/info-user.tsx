import React from 'react';
import styles from './info-user.module.css';

interface UserStats {
  label: string;
  value: number;
}

interface InfoUserProps {
  name?: string;
  role?: string;
  initials?: string;
  stats?: UserStats[];
}

export function InfoUser({ 
  name = 'NOMBRE USUARIO', 
  role = 'VIAJERO',
  initials = 'NU',
}: InfoUserProps) {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <h1 className={styles.welcomeText}>Bienvenido a tu rincón personal</h1>
          <p className={styles.descriptionText}>
            Aquí encontrarás toda la información relevante sobre tu actividad y preferencias de viaje.
            Gestiona tus reservas, revisa tu historial y descubre nuevas experiencias.
          </p>
          
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{name}</h2>
            <p className={styles.userRole}>{role}</p>
          </div>
        </div>
        
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <span className={styles.avatarInitials}>{initials}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
