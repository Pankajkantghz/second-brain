import mongoose, { model, Schema } from "mongoose";

/* ---------------- Database Connection ---------------- */

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

/* ---------------- User Schema ---------------- */

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

/* ---------------- Content Schema ---------------- */

const ContentSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,

      validate: {
        validator: function (value: string) {
          return /^https?:\/\/.+/.test(value);
        },

        message: "Invalid URL",
      },
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,

      enum: ["Youtube", "Twitter", "Website"],

      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

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

/* Faster content fetch */
ContentSchema.index({
  userId: 1,
});

export const ContentModel = model("Content", ContentSchema);

/* ---------------- Share Link Schema ---------------- */

const LinkSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
