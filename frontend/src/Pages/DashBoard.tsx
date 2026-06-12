import { useEffect, useState } from "react";

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

  const [selectedContent, setSelectedContent] = useState({
    id: "",
    title: "",
  });

  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const youtubeCount = contents.filter(
    (item) => item.type === "Youtube",
  ).length;

  const twitterCount = contents.filter(
    (item) => item.type === "Twitter",
  ).length;

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

      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;

      await navigator.clipboard.writeText(shareUrl);

      toast.success("Brain link copied");
    } catch {
      toast.error("Failed to share brain");
    }
  };

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

      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id: string, title: string) => {
    setSelectedContent({
      id,
      title,
    });

    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <CreateContentModel
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <EditContentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        contentId={selectedContent.id}
        currentTitle={selectedContent.title}
        refresh={refresh}
      />

      <main className="ml-72 min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">
        <DashboardHeader
          onAdd={() => setModalOpen(true)}
          onShare={handleShare}
        />

        <DashboardStats
          total={contents.length}
          youtubeCount={youtubeCount}
          twitterCount={twitterCount}
        />

        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-slate-800">
            Saved Content
          </h2>

          <p className="mt-1 text-slate-500">
            Your stored knowledge and resources.
          </p>
        </div>

        {contents.length > 0 ? (
          <ContentGrid
            contents={contents}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <EmptyState onAdd={() => setModalOpen(true)} />
        )}
      </main>
    </div>
  );
};

export default DashBoard;
