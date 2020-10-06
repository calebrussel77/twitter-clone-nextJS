import nc from "next-connect";

export default nc({
  onNoMatch(req, resp) {
    resp.status(405).json({ error: `Method ${req.method} Not Allowed !` });
  },
});
