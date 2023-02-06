import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import { Hero } from "../components/hero";
import { HeroTwo } from "../components/heroTwo";
import useDeviceSize from "../components/useDeviceSize";
import { Header } from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const [width, height] = useDeviceSize();

  return (
    <main className={styles.main}>
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: width, transition: { duration: 1 }, zIndex: 22 }}
      >
        <Hero />
        <HeroTwo />
      </motion.div>
    </main>
  );
}
