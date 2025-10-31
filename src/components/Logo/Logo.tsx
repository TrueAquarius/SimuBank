import React from 'react';
import styles from './Logo.module.css';

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  fontSize?: string;
}

const Logo: React.FC<LogoProps> = ({ fontSize = '1.5rem', className, ...props }) => {
  const combinedClassName = [styles.logo, className].filter(Boolean).join(' ');

  return (
    <a
      href="/"
      className={combinedClassName}
      style={{ fontSize }}
      aria-label="SimuBank, go to homepage"
      {...props}
    >
      <span className={styles.primary}>Simu</span>
      <span className={styles.secondary}>Bank</span>
    </a>
  );
};

export default Logo;