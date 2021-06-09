const Clarifai = require("clarifai");

//Dont run your api on the frontend where it can be seen
//run it on the backend
const app = new Clarifai.App({
  apiKey: "81904160117e43058b3c7eb663cfc620",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: "a403429f2ddf4b49b307e318f00e528b",
      },
      //Cant use imageUrl
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.status(400).json("unable to work with API please try again later")
    );
};

const handleImageInput = (req, res, dbpsql) => {
  const { id } = req.body;
  dbpsql("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      console.log(entries);
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImageInput,
  handleApiCall,
};
