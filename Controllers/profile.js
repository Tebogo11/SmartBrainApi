const handleFindProfile = (req, res, dbpsql) => {
  const { id } = req.params;
  dbpsql
    .select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("user not found");
      }
    });
};

module.exports = {
  handleFindProfile,
};
