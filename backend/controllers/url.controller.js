import { URL as URLModel } from "../models/url.model.js"; // renamed to avoid clash with native URL
import { Counter } from "../models/counter.model.js";

const BASE62_CHARS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Converts a positive integer into a Base62 string.
function toBase62(num) {
  if (num === 0) return BASE62_CHARS[0];

  let result = "";
  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result; // prepend the remainder character
    num = Math.floor(num / 62);
  }
  return result;
}

//generates base62 short id
async function getNextShortId() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "url_counter" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }, //upsert short for update and insert (if no object with id url_counter exists then it returns by creating new object)
  );
  return toBase62(counter.seq);
}

const generateNewShortURL = async (req, res, next) => {
  const { url, customAlias, expiresInDays } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  //URL format validation using the native URL constructor
  let parsedURL;
  try {
    parsedURL = new URL(url); // throws if the URL is malformed
  } catch {
    return res.status(400).json({ error: "Invalid URL format." });
  }

  if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
    return res
      .status(400)
      .json({ error: "URL must use HTTP or HTTPS protocol." });
  }

  try {
    let shortID;

    const alias = customAlias?.trim();
    if (alias) {
      const existing = await URLModel.findOne({ shortId: customAlias });
      if (existing) {
        return res
          .status(409)
          .json({ error: `Alias '${customAlias}' is already taken.` });
      }
      shortID = alias;
    } else {
      shortID = await getNextShortId();
    }

    //calculating expiry date if provided
    let expiresAt = null;
    if (expiresInDays !== undefined) {
      const days = Number(expiresInDays);
      if (Number.isNaN(days) || days <= 0) {
        return res
          .status(400)
          .json({ error: "expiresInDays must be a positive number." });
      }
      expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }

    await URLModel.create({
      shortId: shortID,
      redirectURL: url,
      visitHistory: [],
      expiresAt,
    });

    return res.status(201).json({ id: shortID, expiresAt });
  } catch (error) {
    next(error);
  }
};

const redirectURL = async (req, res, next) => {
  try {
    const { shortId } = req.params;

    //fetch first so we can check expiry before recording the visit
    const entry = await URLModel.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    //expiry check
    if (entry.expiresAt && entry.expiresAt < new Date()) {
      return res.status(410).json({ message: "This short URL has expired." });
    }

    // Record the visit
    await URLModel.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
    );

    return res.redirect(entry.redirectURL);
  } catch (err) {
    next(err);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const result = await URLModel.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    const visitHistory = result.visitHistory;
    const totalClicks = visitHistory.length;

    // visitHistory is stored in insertion order, so index 0 is always the first visit
    const firstVisit =
      totalClicks > 0 ? new Date(visitHistory[0].timestamp) : null;
    const lastVisit =
      totalClicks > 0
        ? new Date(visitHistory[totalClicks - 1].timestamp)
        : null;

    // Midnight of today in local server time
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const clicksToday = visitHistory.filter(
      (visit) => visit.timestamp >= startOfToday.getTime(),
    ).length;

    return res.status(200).json({
      totalClicks,
      firstVisit,
      lastVisit,
      clicksToday,
      analytics: visitHistory,
    });
  } catch (error) {
    next(error);
  }
};

export { generateNewShortURL, redirectURL, getAnalytics };
