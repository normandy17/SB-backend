const Birds = require("../models/birds");

const getBirds=(req, res) => {
  console.log("paginating")   
}

const getBird = (req, res) => {
  const id = req.params.id;
  Birds.findById(id)
    .then((bird) => {
      setTimeout(function () {
        res.json(bird)
      }, 1500)
    })
    .catch((err) => res.status(404).json("bird not Found"));
};

const addBird=(req, res) => {
  const common_name = req.body.common_name
  const scientific_name = req.body.scientific_name
  const family = req.body.family
  const description = req.body.description
  const image = req.body.image  
  const newBird = new Birds({ common_name,scientific_name,family,description,image})
  newBird.save()
      .then(() => res.json("Bird Added Successfully"))
      .catch((err) => res.status(400).json("Error: " + err))
}


const editBird=(req, res) => {
  const id = req.params.id
  Birds.findById(id).then((bird) => {
      bird.common_name = req.body.common_name
      bird.scientific_name = req.body.scientific_name
      bird.family = req.body.family
      bird.description = req.body.description
      bird.image = req.body.image

      bird.save()
          .then(() => res.json("Bird Updated Successfully"))
          .catch((err) => res.status(400).json("Error: " + err))
  }).catch((err) => res.status(404).json("Bird not Found"))
}

const deleteBird=(req, res) => {
  const id = req.params.id
  Birds.findByIdAndDelete(id)
      .then(() => res.status(200).json({ message: "Bird deleted successfully" }))
      .catch((err) => res.status(404).json({ message: "Bird not found" }))

}

const searchResult = (req, res) => {  
  let query = req.body.query;
  console.log("Searching for", query)
  Birds.find({ common_name: { $regex: query, $options: "$i" } }).then((data) => {
    res.status(200).send(data);
  });
};

module.exports = {getBirds, getBird, searchResult, addBird, editBird, deleteBird };
