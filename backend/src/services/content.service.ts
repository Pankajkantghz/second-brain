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
  const query: any = {
    userId,
  };

  if (search && search.trim()) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },

      {
        tags: {
          $regex: search,
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

interface UpdateContentParams {
  contentId: string;
  title: string;
  link: string;
  tags: string[];
  userId: string;
}

export const updateContent = async ({
  contentId,
  title,
  link,
  tags,
  userId,
}: UpdateContentParams) => {
  const detectedType = detectType(link);

  return await ContentModel.updateOne(
    {
      _id: contentId,

      userId,
    },
    {
      title,
      link,

      type: detectedType,

      tags,
    },
  );
};
