import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBookOpen, FiLayers, FiLock } from "react-icons/fi";

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
  content?: SharedContent[];
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
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b12] px-4">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]" />
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
            border-slate-800
            bg-slate-900/90
            px-10
            py-8
            shadow-xl
            shadow-slate-900/5
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

          <p className="mt-4 text-sm font-medium text-slate-300">
            Opening shared brain...
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
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b12] px-4">
        <motion.div
          variants={scaleFade}
          initial="hidden"
          animate="visible"
          className="
            w-full
            max-w-md
            rounded-[32px]
            border
            border-slate-800
            bg-slate-900
            p-10
            text-center
            shadow-xl
            shadow-slate-900/5
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
              bg-indigo-500/10
              text-indigo-300
            "
          >
            <BrainIcon />
          </motion.div>

          <motion.h2
            variants={fadeUpChild}
            initial="hidden"
            animate="visible"
            className="mt-6 text-2xl font-bold text-white"
          >
            Brain not found
          </motion.h2>

          <motion.p
            variants={fadeUpChild}
            initial="hidden"
            animate="visible"
            className="mt-2 text-sm leading-6 text-slate-400"
          >
            This shared link may be invalid or has been removed.
          </motion.p>
        </motion.div>
      </main>
    );
  }

  const ownerName = data.username || data.name || "Shared User";
  const content = data.content ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090b12] px-4 py-5 text-slate-100 sm:px-7 sm:py-8 lg:px-10">
      <div className="pointer-events-none absolute -left-40 top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1440px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="
            mb-8 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5 sm:mb-12 sm:pb-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">
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
              bg-gradient-to-br from-indigo-500 to-violet-600
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
              Second Brain
            </h1>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">A space for ideas worth keeping</p>
          </div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
            <FiLock aria-hidden="true" /> Public link
          </div>
        </motion.header>

        <motion.section variants={fadeUp} initial="hidden" animate="visible" className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">Shared collection</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {ownerName}<span className="text-slate-500">’s</span> Brain
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              A handpicked collection of links, notes, and references from {ownerName}.
            </p>
          </div>
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300"><FiLayers size={18} /></span>
            <div><p className="text-lg font-semibold leading-5 text-white">{content.length}</p><p className="mt-1 text-xs text-slate-500">saved items</p></div>
          </div>
        </motion.section>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        {content.length > 0 ? (
          <>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300"><FiBookOpen className="text-indigo-300" /> Collection <span className="text-slate-600">/</span> <span className="text-slate-500">{content.length} {content.length === 1 ? "item" : "items"}</span></div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="
              grid
              grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            "
          >
            {content.map((item) => (
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
          </>
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
              border-white/10
              bg-white/[0.025]
              px-6
              py-12
              text-center
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
                  bg-slate-800
                  text-slate-400
                "
              >
                <BrainIcon />
              </motion.div>

              <motion.h2
                variants={fadeUpChild}
                initial="hidden"
                animate="visible"
                className="mt-6 text-xl font-bold text-white"
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
                  text-slate-400
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
