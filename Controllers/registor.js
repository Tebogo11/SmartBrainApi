const handleRegistor = (req, res, dbpsql, bcrypt) => {
  const { email, name, password } = req.body;
  //server validation
  if (!email || !name || !password) {
    //To end an execution you have to run 'return'
    return res.status(400).json("incorrect form submition");
  }
  //encryt password before storing it
  const hash = bcrypt.hashSync(password);
  //all operation have to pass
  dbpsql
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then((data) => res.json(data[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => res.status(400).json("Unable to registor"));
  //always remember to response with something
};

module.exports = { handleRegistor: handleRegistor };
