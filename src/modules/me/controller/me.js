const me = (req, res) => {
  const currentUser = req.user.data;
  res.json({ message: 'Me !!', data: currentUser });
};

module.exports = {
  me,
};
