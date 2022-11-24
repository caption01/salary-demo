const me = (req, res) => {
  res.json({ message: 'I am superAdmin !!' });
};

module.exports = {
  me,
};
