import styles from './WelcomeLayout.module.css';
import ramenImg from "../../assets/ramen.jpg";

function WelcomeLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <h6 className={styles.brandTitle}>Ichiram</h6>
        </div>
      <div className={styles.rightPanel}>
        {children}
          </div>
    </div>
  );
}

export default WelcomeLayout;