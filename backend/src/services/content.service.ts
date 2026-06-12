import { ContentModel } from "../models/db";

/* Add Content */

export const addContent = async (body: any, userId: string) => {
  const { title, link, type } = body;

  await ContentModel.create({
    title,
    link,
    type,
    userId,
    tags: [],
  });

  return {
    status: 201,
    message: "Content added",
  };
};

/* Get Content */

export const getContent = async (userId: string) => {
  const content = await ContentModel.find({
    userId,
  });

  return {
    status: 200,
    content,
  };
};

/* Delete Content */
export const deleteContent = async (contentId: string, userId: string) => {
  console.log("contentId:", contentId);

  console.log("userId:", userId);

  const result = await ContentModel.deleteOne({
    _id: contentId,
    userId,
  });

  console.log(result);

  return {
    status: 200,
    message: "Content deleted",
  };
};

/* Update Content */

export const updateContent = async (body: any, userId: string) => {
  const { contentId, title, link, type } = body;

  await ContentModel.updateOne(
    {
      _id: contentId,
      userId,
    },
    {
      title,
      link,
      type,
    },
  );

  return {
    status: 200,
    message: "Content updated",
  };
};
