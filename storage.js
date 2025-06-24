import { db } from "./database.js";

// Persist tokens in MongoDB instead of memory

export async function storeDiscordTokens(userId, tokens) {
    await db
        .collection("tokens")
        .updateOne({ userId }, { $set: { tokens } }, { upsert: true });
}

export async function getDiscordTokens(userId) {
    const entry = await db.collection("tokens").findOne({ userId });
    return entry ? entry.tokens : null;
}

export async function deleteDiscordTokens(userId) {
    await db.collection("tokens").deleteOne({ userId });
}
