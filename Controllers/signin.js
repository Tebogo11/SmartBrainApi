const handleSignIn = (dbpsql, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    //To end an execution you have to run 'return'
    return res.status(400).json("incorrect form submition");
  }
  dbpsql
    .select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isVaild = bcrypt.compareSync(req.body.password, data[0].hash);
      console.log(data[0].hash);
      if (isVaild) {
        return dbpsql
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("incorrect username or password");
      }
    })
    .catch((err) => res.status(400).json("incorrect username or password"));
};

module.exports = {
  handleSignIn,
};
