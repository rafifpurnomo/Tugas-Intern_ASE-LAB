const usersModel = require("../models/users");

const getAllUser = async (req, res) => {
  try {
    const [data] = await usersModel.getAllUser();

    res.json({
      massage: "Menampilkan data User",
      data: data,
    });
  } catch (error) {
    res.status(500).json ({
        massage: "Error ",
        serverMassage: error,
    })
  }
};

const createUser = (req, res) => {
  res.json({
    massage: "Succes add users",
    data: req.body,
  });
};

module.exports = {
  getAllUser,
  createUser,
};
