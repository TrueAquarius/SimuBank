import React, { forwardRef } from 'react';
import styles from './Logo.module.css';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ fontSize = '1.5rem', className, ...props }, ref) => {
    const combinedClassName = [styles.logo, className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={{ fontSize }}
        aria-label="SimuBank, go to homepage"
        {...props}
      >
        <span className={styles.primary}>Simu</span>
        <span className={styles.secondary}>Bank</span>
      </div>
    );
  }
);

Logo.displayName = 'Logo';

export default Logo;