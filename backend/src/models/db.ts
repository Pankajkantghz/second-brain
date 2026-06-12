import mongoose, { model, Schema } from "mongoose";

/* Database Connection */

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

/* User Schema */

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("User", UserSchema);

/* Tag Schema */

const TagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TagModel = model("Tag", TagSchema);

/* Content Schema */

const ContentSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Youtube", "Twitter"],
      required: true,
    },

    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      },
    ],

    userId: {
      type: mongoose.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ContentModel = model("Content", ContentSchema);

/* Share Link Schema */

const LinkSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Types.ObjectId,

      ref: "User",

      required: true,

      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const LinkModel = model("Link", LinkSchema);
