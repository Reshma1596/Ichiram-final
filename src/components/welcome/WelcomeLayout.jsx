import styles from './WelcomeLayout.module.css';

function WelcomeLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>Left branding panel</div>
      <div className={styles.rightPanel}>{children}</div>
    </div>
  );
}

export default WelcomeLayout;