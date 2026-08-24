import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

import { Sidebar } from "../components/Sidebar.tsx";


import CreateContentModel from "../components/CreateContentModel";
import EditContentModal from "../components/EditContentModal";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ContentGrid from "../components/dashboard/ContentGrid";
import EmptyState from "../components/dashboard/EmptyState";

import useContent from "../hooks/useContent";
import { Backend_URL } from "../config";

import {
  pageVariants,
  fadeUp,
  staggerContainer,
  fadeUpChild,
  contentTransition,
} from "../animations";

const DashBoard = () => {
  /* =====================================================
     SIDEBAR
  ===================================================== */

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  /* =====================================================
     MODALS
  ===================================================== */

  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  /* =====================================================
     FILTERS
  ===================================================== */

  const [selectedType, setSelectedType] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");

  /* =====================================================
     SELECTED CONTENT
  ===================================================== */

  const [selectedContent, setSelectedContent] = useState({
    id: "",
    title: "",
    link: "",
    tags: [] as string[],
  });

  /* =====================================================
     CONTENT
  ===================================================== */

  const { contents = [], refresh } = useContent() || {};

  useEffect(() => {
    refresh?.();
  }, []);

  /* =====================================================
     STATS
  ===================================================== */

  const stats = useMemo(() => {
    let youtube = 0;
    let twitter = 0;
    let website = 0;

    contents.forEach((item) => {
      const type = item.type?.toLowerCase();

      if (type === "youtube") youtube++;
      if (type === "twitter") twitter++;
      if (type === "website") website++;
    });

    return {
      total: contents.length,
      youtube,
      twitter,
      website,
    };
  }, [contents]);

  /* =====================================================
     TAGS
  ===================================================== */

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();

    contents.forEach((item) => {
      item.tags?.forEach((tag) => {
        if (tag.trim()) {
          tagSet.add(tag);
        }
      });
    });

    return Array.from(tagSet).sort();
  }, [contents]);

  /* =====================================================
     FILTER CONTENT
  ===================================================== */

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const type = item.type?.toLowerCase();

      const matchesType =
        selectedType === "All" ||
        type === selectedType.toLowerCase();

      const matchesTag =
        !selectedTag ||
        item.tags?.includes(selectedTag);

      return matchesType && matchesTag;
    });
  }, [contents, selectedType, selectedTag]);

  /* =====================================================
     SHARE BRAIN
  ===================================================== */

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${Backend_URL}/api/v1/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const shareUrl =
        `${window.location.origin}/share/${response.data.hash}`;

      await navigator.clipboard.writeText(shareUrl);

      toast.success("Brain link copied");
    } catch {
      toast.error("Failed to share brain");
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(
        `${Backend_URL}/api/v1/content`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          data: {
            contentId,
          },
        },
      );

      toast.success("Content deleted");

      refresh?.();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (content: any) => {
    setSelectedContent({
      id: content._id,
      title: content.title,
      link: content.link,
      tags: content.tags || [],
    });

    setEditOpen(true);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="
        min-h-screen
        bg-slate-100
        transition-colors
        dark:bg-slate-950
      "
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        tags={allTags}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() =>
          setSidebarCollapsed((prev) => !prev)
        }
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() =>
          setMobileSidebarOpen(false)
        }
      />

      {/* =================================================
          CREATE MODAL
      ================================================= */}

      <CreateContentModel
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        refresh={refresh}
      />

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      <EditContentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        contentId={selectedContent.id}
        currentTitle={selectedContent.title}
        currentTags={selectedContent.tags}
        refresh={refresh}
      />

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className={`
          min-h-screen
          px-4
          py-5
          transition-[margin]
          duration-300

          sm:px-6
          sm:py-6

          ${
            sidebarCollapsed
              ? "md:ml-24"
              : "md:ml-72"
          }
        `}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <DashboardHeader
            onAdd={() => setModalOpen(true)}
            onShare={handleShare}
            onMenu={() =>
              setMobileSidebarOpen(true)
            }
          />
        </motion.div>

        {/* =================================================
            STATS
        ================================================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-1"
        >
          <motion.div variants={fadeUpChild}>
            <DashboardStats
              total={stats.total}
              youtubeCount={stats.youtube}
              twitterCount={stats.twitter}
              websiteCount={stats.website}
              onSelect={setSelectedType}
            />
          </motion.div>
        </motion.div>

        {/* =================================================
            SAVED CONTENT
        ================================================= */}

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          {/* Section Header */}

          <div className="mb-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    dark:text-white
                  "
                >
                  Saved Content
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Your saved knowledge, links, and resources.
                </p>
              </div>

              {/* Content count */}

              <motion.span
                key={filteredContents.length}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="
                  hidden
                  rounded-full
                  bg-slate-200
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-slate-600

                  sm:inline-flex

                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                {filteredContents.length}
              </motion.span>
            </div>

            {/* Active Filters */}

            <AnimatePresence mode="popLayout">
              {(selectedType !== "All" || selectedTag) && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    marginTop: 12,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedType !== "All" && (
                      <span
                        className="
                          rounded-full
                          bg-indigo-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-indigo-600

                          dark:bg-indigo-500/10
                          dark:text-indigo-400
                        "
                      >
                        {selectedType}
                      </span>
                    )}

                    {selectedTag && (
                      <span
                        className="
                          rounded-full
                          bg-indigo-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-indigo-600

                          dark:bg-indigo-500/10
                          dark:text-indigo-400
                        "
                      >
                        #{selectedTag}
                      </span>
                    )}

                    {/* Clear filters */}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("All");
                        setSelectedTag("");
                      }}
                      className="
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-500
                        transition
                        hover:bg-slate-100
                        hover:text-slate-800

                        dark:text-slate-400
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                      "
                    >
                      Clear filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =================================================
              CONTENT / EMPTY STATE
          ================================================= */}

          <AnimatePresence mode="wait">
            {filteredContents.length > 0 ? (
              <motion.div
                key={`${selectedType}-${selectedTag}-content`}
                variants={contentTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ContentGrid
                  contents={filteredContents}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedType}-${selectedTag}-empty`}
                variants={contentTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <EmptyState
                  onAdd={() => setModalOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default DashBoard;