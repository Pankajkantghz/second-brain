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
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  // 1. Hoisted global state managing total system grid structural responsive actions
  const [collapsed, setCollapsed] = useState(false);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedContent, setSelectedContent] = useState({ id: "", title: "" });

  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen, editOpen]);

  const youtubeCount = contents.filter((item) => item.type === "Youtube").length;
  const twitterCount = contents.filter((item) => item.type === "Twitter").length;
  const websiteCount = contents.filter((item) => item.type === "Website").length;

  const allTags = useMemo(
    () => [...new Set(contents.flatMap((item) => item.tags || []))],
    [contents],
  );

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const matchesType = selectedType === "All" || item.type === selectedType;
      const matchesTag = !selectedTag || item.tags?.includes(selectedTag);
      return matchesType && matchesTag;
    });
  }, [contents, selectedType, selectedTag]);

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${Backend_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
      );
      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied");
    } catch {
      toast.error("Failed to share");
    }
  };

  const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(`${Backend_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { contentId },
      });
      toast.success("Content deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar
        tags={allTags}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)} />
      <EditContentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        contentId={selectedContent.id}
        currentTitle={selectedContent.title}
        refresh={refresh}
      />

      {/* 2. Dynamic main tracking space container layout:
        Changes margin-left cleanly from ml-72 to ml-24 over a 300ms transition 
      */}
      <main 
        className={`min-h-screen px-8 py-6 transition-all duration-300 ease-in-out ${
          collapsed ? "ml-24" : "ml-72"
        }`}
      >
        <DashboardHeader onAdd={() => setModalOpen(true)} onShare={handleShare} />
        
        <DashboardStats
          total={contents.length}
          youtubeCount={youtubeCount}
          twitterCount={twitterCount}
          websiteCount={websiteCount}
        />

        <div className="mt-8">
          {filteredContents.length > 0 ? (
            <ContentGrid
              contents={filteredContents}
              onDelete={handleDelete}
              onEdit={(id, title) => {
                setSelectedContent({ id, title });
                setEditOpen(true);
              }}
            />
          ) : (
            <EmptyState onAdd={() => setModalOpen(true)} />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashBoard;