import fs from 'fs'
import path from 'path';

export function readFileData(){
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = fs.readFileSync(filePath);
  return  JSON.parse(fileData);
}
function handler(req, res) {
 if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // Store in file
   const data = readFileData();
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    // Send back
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else { // for GET
   // Read from file
    const data = readFileData();
   // Send back
    res.status(200).json({ message: data});
  }
}
export default handler;