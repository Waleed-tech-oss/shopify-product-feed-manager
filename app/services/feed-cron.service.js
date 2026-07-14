import cron from "node-cron";

import Feed from "../models/Feed";
import { connectDB } from "../lib/mongodb.server";

export function startFeedCron() {

  console.log("🕒 Feed Scheduler Started");

  cron.schedule("* * * * *", async () => {

    try {

      await connectDB();

      const feeds = await Feed.find({
        isActive: true,
      });

      const now = new Date();

      for (const feed of feeds) {

        let interval = 60;

        switch (feed.schedule) {

          case "15min":
            interval = 15;
            break;

          case "30min":
            interval = 30;
            break;

          case "1hour":
            interval = 60;
            break;

          case "6hour":
            interval = 360;
            break;

          case "12hour":
            interval = 720;
            break;

          case "daily":
            interval = 1440;
            break;

        }

        const lastRun = feed.lastGeneratedAt
          ? new Date(feed.lastGeneratedAt)
          : null;

        const diffMinutes = lastRun
          ? (now - lastRun) / (1000 * 60)
          : interval;

        if (diffMinutes >= interval) {

          console.log(
            `✅ Generating ${feed.channel} Feed (${feed.feedName})`
          );

          feed.lastGeneratedAt = now;

          await feed.save();

        }

      }

    } catch (err) {

      console.error(
        "❌ Feed Cron Error",
        err.message
      );

    }

  });

}