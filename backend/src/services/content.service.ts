import { ContentModel } from "../models/db";

import { detectType } from "../utils/detectType";

/* ---------------- Add Content ---------------- */

interface AddContentParams {
  title: string;
  link: string;
  tags: string[];
  userId: string;
}

export const addContent = async ({
  title,
  link,
  tags,
  userId,
}: AddContentParams) => {
  const detectedType = detectType(link);

  return await ContentModel.create({
    title,
    link,
    type: detectedType,
    tags,
    userId,
  });
};

/* ---------------- Get Content ---------------- */

export const getContent = async (userId: string, search?: string) => {
  const query: Record<string, unknown> = {
    userId,
  };

  if (search && search.trim()) {
    const escapedSearch = search.trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = [
      {
        title: {
          $regex: escapedSearch,
          $options: "i",
        },
      },

      {
        tags: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
    ];
  }

  return await ContentModel.find(query).sort({
    createdAt: -1,
  });
};

/* ---------------- Delete Content ---------------- */

export const deleteContent = async (contentId: string, userId: string) => {
  return await ContentModel.deleteOne({
    _id: contentId,
    userId,
  });
};

/* ---------------- Update Content ---------------- */

export const updateContent = async ({
  contentId,
  title,
  userId,
}: {
  contentId: string;

  title: string;

  userId: string;
}) => {
  return await ContentModel.updateOne(
    {
      _id: contentId,
      userId,
    },
    {
      title,
    },
  );
};
