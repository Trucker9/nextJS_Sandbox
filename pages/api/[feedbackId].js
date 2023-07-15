import { readFileData } from "./feedback";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const data = readFileData();

  const feedback = data.find((el) => el.id === feedbackId)

  res.status(200).json({feedback: feedback})
}

export default handler;
