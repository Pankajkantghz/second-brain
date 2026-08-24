import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Card from "../components/Card";
import BrainIcon from "../icons/BrainIcon";
import { Backend_URL } from "../config";

import {
  fadeUp,
  fadeUpChild,
  staggerContainer,
  cardFadeUp,
  scaleFade,
  contentTransition,
} from "../animations";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: "Youtube" | "Twitter" | "Website" | string;
  tags?: string[];
}

interface SharedBrainData {
  username?: string;
  name?: string;
  content: SharedContent[];
}

export default function SharedBrain() {
  const { shareLink } = useParams();

  const [data, setData] = useState<SharedBrainData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrain = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${Backend_URL}/api/v1/brain/${shareLink}`,
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchBrain();
    }
  }, [shareLink]);

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
        <motion.div
          variants={scaleFade}
          initial="hidden"
          animate="visible"
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-slate-200
            bg-white
            px-10
            py-8
            shadow-xl
            shadow-slate-900/5
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          {/* Logo */}
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-indigo-600
              text-white
              shadow-lg
              shadow-indigo-500/20
            "
          >
            <BrainIcon />
          </motion.div>

          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading brain...
          </p>

          {/* Loading line */}
          <div className="mt-4 h-1 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 rounded-full bg-indigo-500"
            />
          </div>
        </motion.div>
      </main>
    );
  }

  /* =====================================================
     NOT FOUND
  ====================================================== */

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
        <motion.div
          variants={scaleFade}
          initial="hidden"
          animate="visible"
          className="
            w-full
            max-w-md
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-10
            text-center
            shadow-xl
            shadow-slate-900/5
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.4,
              type: "spring",
              stiffness: 180,
            }}
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-indigo-50
              text-indigo-600
              dark:bg-indigo-500/10
              dark:text-indigo-400
            "
          >
            <BrainIcon />
          </motion.div>

          <motion.h2
            variants={fadeUpChild}
            initial="hidden"
            animate="visible"
            className="mt-6 text-2xl font-bold text-slate-900 dark:text-white"
          >
            Brain not found
          </motion.h2>

          <motion.p
            variants={fadeUpChild}
            initial="hidden"
            animate="visible"
            className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400"
          >
            This shared link may be invalid or has been removed.
          </motion.p>
        </motion.div>
      </main>
    );
  }

  const ownerName = data.username || data.name || "Shared User";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 transition-colors sm:px-6 sm:py-10 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="
            mb-8
            flex
            items-center
            gap-4
            sm:mb-10
          "
        >
          {/* Logo */}
          <motion.div
            whileHover={{
              rotate: -3,
              scale: 1.04,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-indigo-600
              text-white
              shadow-lg
              shadow-indigo-500/20
            "
          >
            <BrainIcon />
          </motion.div>

          <div className="min-w-0">
            <h1
              className="
                truncate
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
                lg:text-4xl
                dark:text-white
              "
            >
              {ownerName}'s Brain
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base dark:text-slate-400">
              Shared knowledge, links, and resources.
            </p>
          </div>
        </motion.header>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        {data.content?.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
            "
          >
            {data.content.map((item) => (
              <motion.div
                key={item._id}
                variants={cardFadeUp}
                whileHover={{
                  y: -4,
                }}
                transition={contentTransition}
              >
                <Card
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  tags={item.tags || []}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* =====================================================
             EMPTY STATE
          ====================================================== */

          <motion.div
            variants={scaleFade}
            initial="hidden"
            animate="visible"
            className="
              flex
              min-h-[360px]
              items-center
              justify-center
              rounded-[32px]
              border
              border-dashed
              border-slate-300
              bg-white
              px-6
              py-12
              text-center
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div>
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-slate-100
                  text-slate-500
                  dark:bg-slate-800
                  dark:text-slate-400
                "
              >
                <BrainIcon />
              </motion.div>

              <motion.h2
                variants={fadeUpChild}
                initial="hidden"
                animate="visible"
                className="mt-6 text-xl font-bold text-slate-900 dark:text-white"
              >
                No shared content
              </motion.h2>

              <motion.p
                variants={fadeUpChild}
                initial="hidden"
                animate="visible"
                className="
                  mx-auto
                  mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-slate-500
                  dark:text-slate-400
                "
              >
                This brain does not contain any content yet.
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}