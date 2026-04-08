const productModel = require("../model/productModel");
const httpCodes = require("../utils/httpStatusCodes");

class productController {
  async create(req, res) {
    try {
      const {
        brand,
        name,
        slug,
        category,
        price,
        currency,
        variants,
        desc,
        shortDesc,
        status,
      } = req.body;

      const productData = await productModel({
        brand,
        name,
        slug,
        category,
        price,
        currency,
        variants,
        desc,
        shortDesc,
        status,
      });

      const existingProduct = await productModel.findOne({ name });
      if (existingProduct) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Product name should be different",
        });
      }

      const result = await productData.save();

      if (result) {
        return res.status(httpCodes.ok).json({
          success: true,
          message: "Product Created Successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  async allPorducts(req, res) {
    try {
      const data = await productModel.find({ isDelete: false });

      if (data) {
        return res.status(httpCodes.ok).json({
          success: true,
          message: "Product Created Successfully",
          total: data.length,
          data: data,
        });
      }
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  async readProduct(req, res) {
    try {
      const productID = req.params.id;
      const data = await productModel.findById(productID);
      if (!data) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Invalid ID",
        });
      }
      return res.status(httpCodes.ok).json({
        success: true,
        message: "Found product by id",
        data: data,
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
  async update(req, res) {
    try {
      const productID = req.params.id;
      const data = req.body;

      if (!productID) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Invalid ID",
        });
      }

      const updateProduct = await productModel.findByIdAndUpdate(
        productID,
        data,
        { new: true },
      );

      if (!updateProduct) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(httpCodes.ok).json({
        success: true,
        message: "Product Updated Successfully",
        data: updateProduct,
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
  async softDelete(req, res) {
    try {
      const productID = req.params.id;

      if (!productID) {
        return res.status(httpCodes.not_found).json({
          success: false,
          message: "Invalid ID",
        });
      }
      const deleteProduct = await productModel.findByIdAndUpdate(
        productID,
        {
          isDelete: true,
        },
        { new: true },
      );
      if (deleteProduct) {
        return res.status(httpCodes.ok).json({
          success: true,
          message: "Product Soft Deleted Successfully",
        });
      }
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
  async deletedProduct(req, res) {
    try {
      const data = await productModel.find({ isDelete: true });

      if (data) {
        return res.status(httpCodes.ok).json({
          success: true,
          message: "Product Created Successfully",
          total: data.length,
          data: data,
        });
      } else {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "No Products Found",
        });
      }
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new productController();
