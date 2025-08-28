import Query from "../models/query.js";

/**
 * Controller to handle creating a new user query.
 */
export const createNewQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuery = new Query({ name, email, message });
    await newQuery.save();

    res.status(201).json({
      message:
        "Your message has been sent successfully! We will get back to you soon.",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error, please try again later.",
        error: error.message,
      });
  }
};
