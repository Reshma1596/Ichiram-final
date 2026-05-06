import styles from './WelcomeLayout.module.css';
import ramenImg from "../../assets/hero-ramen.png";
import ramenright from "../../assets/teriyaki-chicken-miso.jpg";
function WelcomeLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <img src={ramenImg} alt="Ramen hero" className={styles.brandImage} />

      </div>
      <div className={styles.rightPanel}>
        <img src={ramenright} alt="" className={styles.rightPanelBg} />
        <div className={styles.rightPanelContent}>
{children}
        </div>
        
          </div>
           
    </div>
  );
}

export default WelcomeLayout;