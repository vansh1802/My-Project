import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  }
});

// import models
import UserModel from "./user.js";
import PostModel from "./post.js";
import CommentModel from "./comment.js";

export const User = UserModel(sequelize);
export const Post = PostModel(sequelize);
export const Comment = CommentModel(sequelize);

// relations
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default sequelize;
