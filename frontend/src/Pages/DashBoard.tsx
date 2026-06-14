import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { Sidebar } from "../components/Sidebar";

import CreateContentModel from "../components/CreateContentModel";
import EditContentModal from "../components/EditContentModal";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ContentGrid from "../components/dashboard/ContentGrid";
import EmptyState from "../components/dashboard/EmptyState";

import useContent from "../hooks/useContent";

import { Backend_URL } from "../config";

const DashBoard = () => {
  /* Sidebar */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /* Modals */
  const [modalOpen, setModalOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  /* Filters */
  const [selectedType, setSelectedType] = useState("All");

  const [selectedTag, setSelectedTag] = useState("");

  /* Selected Content */
  const [selectedContent, setSelectedContent] = useState({
    id: "",
    title: "",
    link: "",
    tags: [] as string[],
  });

  /* Content Hook */
  const { contents = [], refresh } = useContent() || {};

  /* Initial Fetch */
  useEffect(() => {
    refresh?.();
  }, []);

  /* Stats */
  const stats = useMemo(() => {
    return {
      total: contents.length,

      youtube: contents.filter((item) => item.type?.toLowerCase() === "youtube")
        .length,

      twitter: contents.filter((item) => item.type?.toLowerCase() === "twitter")
        .length,

      website: contents.filter((item) => item.type?.toLowerCase() === "website")
        .length,
    };
  }, [contents]);

  /* Tags */
  const allTags = useMemo(() => {
    return [...new Set(contents.flatMap((item) => item.tags || []))];
  }, [contents]);

  /* Filter Content */
  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const matchesType =
        selectedType === "All" ||
        item.type?.toLowerCase() === selectedType.toLowerCase();

      const matchesTag = !selectedTag || item.tags?.includes(selectedTag);

      return matchesType && matchesTag;
    });
  }, [contents, selectedType, selectedTag]);

  /* Share Brain */
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

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

      await navigator.clipboard.writeText(shareUrl);

      toast.success("Brain link copied");
    } catch {
      toast.error("Failed to share brain");
    }
  };

  /* Delete Content */
  const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(`${Backend_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        data: {
          contentId,
        },
      });

      toast.success("Content deleted");

      refresh?.();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* Edit Content */
  const handleEdit = (content: any) => {
    setSelectedContent({
      id: content._id,
      title: content.title,
      link: content.link,
      tags: content.tags || [],
    });

    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        tags={allTags}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Create Modal */}
      <CreateContentModel
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        refresh={refresh}
      />
      {/* Edit Modal */}
      ```tsx
      <EditContentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        contentId={selectedContent.id}
        currentTitle={selectedContent.title}
        refresh={refresh}
      />
      ```
      {/* Main */}
      <main
        className={`min-h-screen px-6 py-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-24" : "ml-72"
        }`}
      >
        {/* Header */}
        <DashboardHeader
          onAdd={() => setModalOpen(true)}
          onShare={handleShare}
        />

        {/* Stats */}
        <DashboardStats
          total={stats.total}
          youtubeCount={stats.youtube}
          twitterCount={stats.twitter}
          websiteCount={stats.website}
        />

        {/* Content */}
        <section className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Saved Content</h2>

            <p className="mt-1 text-slate-500">
              Your saved knowledge, links, and resources.
            </p>
          </div>

          {filteredContents.length > 0 ? (
            <ContentGrid
              contents={filteredContents}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <EmptyState onAdd={() => setModalOpen(true)} />
          )}
        </section>
      </main>
    </div>
  );
};

export default DashBoard;
