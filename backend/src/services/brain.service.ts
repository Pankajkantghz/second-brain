import { ContentModel, LinkModel, UserModel } from "../models/db";

import { random } from "../utils/random";

export const createShareLink = async (userId: string) => {
  const existingLink = await LinkModel.findOne({
    userId,
  });

  if (existingLink) {
    return {
      hash: existingLink.hash,
    };
  }

  const hash = random(10);

  await LinkModel.create({
    userId,
    hash,
  });

  return {
    hash,
  };
};

export const removeShareLink = async (userId: string) => {
  await LinkModel.deleteOne({
    userId,
  });
};

export const fetchSharedBrain = async (shareLink: string) => {
  const link = await LinkModel.findOne({
    hash: shareLink,
  });

  if (!link) {
    throw new Error("Invalid share link");
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findById(link.userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    name: user.name,

    email: user.email,

    content,
  };
};
