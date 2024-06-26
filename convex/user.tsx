import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return result;
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("user", {
      email: args.email,
      name: args.name,
      image: args.image,
    });
  },
});
