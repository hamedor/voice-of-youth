import { TEAM_QUERY } from "../lib/apollo";
import { useQuery, NetworkStatus } from "@apollo/client";
import Image from "next/image";
import styles from "../styles/pages/about.module.css";
import useDeviceSize from "../components/useDeviceSize";
import { motion } from "framer-motion";
import { useState } from "react";

import Link from "next/link";
import Head from "next/head";

export default function About() {
  // const users= useQuery(TEAM_QUERY);
  const { loading, error, data } = useQuery(TEAM_QUERY);

  const [width, height] = useDeviceSize();
  const [test, setTest] = useState();

  const Render = () => {
    if (!loading) {
      return data?.usersPermissionsUsers?.data?.map((e) => (
        <div key={e.id}>
          <Link
            href={{
              pathname: `/user/${e.id}`,
              query: e.id,
            }}
            as={`user/${e.id}`}
          >
            <Image
              className={styles.avatar}
              src={`http://85.193.90.17:1338${e.attributes.avatar.data.attributes.url}`}
              alt={"аватар автора"}
              width={200}
              height={200}
            ></Image>
            <p>{e.attributes.firstName}</p>
            <p>{e.attributes.lastName}</p>
          </Link>
        </div>
      ));
    }
  };

  return (
    <>
    <Head>
    <title>Наша команда</title>
    
    </Head>

    <div className="wrapper">
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: width, transition: { duration: 1 }, zIndex: 22 }}
      >
        <h3 className={styles.title}>Наша команда</h3>
        <hr className={styles.hr}></hr>
        <div className={styles.users}>
          <Render />
        </div>
      </motion.div>
    </div>
    </>
  );
}
