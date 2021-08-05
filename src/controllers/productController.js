import Product from "../schemas/Product";
import uploadService from "../services/uploadService";

const getProducts = async (req, res) => {
  try {
    const limit = req.body.limit || 10;
    const page = req.body.page || 0;
    const filterObj = {};
    const { name, cost, inStock } = req.body;
    if (name) {
      filterObj["name"] = name;
    }
    if (cost) {
      filterObj["cost"] = { $lte: cost };
    }
    if (inStock) {
      filterObj["balance"] = { $gte: 1 };
    }
    const data = await Product.find(filterObj)
      .skip(page * limit)
      .limit(limit);
    res.status(200).json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id).exec();
    res.status(200).json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, name, cost, balance, image } = req.body;
    const data = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          cost,
          balance,
          image,
        },
      },
      { new: true }
    );
    res.status(200).json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, cost, balance, image } = req.body;
    const data = await Product.create({
      name,
      cost,
      balance,
      image,
    });
    res.status(200).json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndRemove(id);
    if (data.image)
      await uploadService.destroyFile(`${process.cwd()}/public/${data.image}`);
    res.status(200).json({
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e,
    });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    const { status, data } = await uploadService.uploadFile(req);
    res.status(status).json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const { name } = req.body;
    await uploadService.destroyFile(
      `${process.cwd()}/public/${req.appid}/${name}`
    );
    res.status(200).json({
      data: {
        status: "ok",
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

export {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductImage,
};
