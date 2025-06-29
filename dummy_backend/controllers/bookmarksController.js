const { Bookmark, EResource } = require("../models");

exports.getUserBookmarks = async (req, res) => {
  const userId = req.params.userId;
  try {
    const bookmarks = await Bookmark.findAll({
      where: { user_id: userId },
      include: [EResource],
    });
    res.json(bookmarks);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.addBookmark = async (req, res) => {
  const { user_id, resource_id } = req.body;

  try {
    const newBookmark = await Bookmark.create({ user_id, resource_id });
    res.status(201).json(newBookmark);
  } catch (err) {
    console.error("Error adding bookmark:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
