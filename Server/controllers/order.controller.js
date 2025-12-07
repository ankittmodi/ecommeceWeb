import paypal from "@paypal/checkout-server-sdk";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";


export const createOrderController = async (req, res) => {
  try {
    const { userId, products, paymentId, payment_status, delivery_address, totalAmt, date, orderId } = req.body;

    // 🔹 Validate delivery address
    if (!delivery_address) {
      return res.status(400).json({
        err: true,
        success: false,
        message: "Delivery address is required!"
      });
    }

    // 🔹 Ensure orderId exists (auto-generate if missing)
    const finalOrderId = orderId || "ORD-" + Date.now();

    // 🔹 Create order
    let order = new OrderModel({
      userId,
      products,
      orderId: finalOrderId,
      paymentId,
      payment_status,
      delivery_address,
      totalAmt,
      date
    });

    // 🔹 Update product stock
    for (let i = 0; i < products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        products[i].productId,
        { $inc: { countInStock: -products[i].quantity } },
        { new: true }
      );
    }

    // 🔹 Save order
    order = await order.save();

    return res.status(200).json({
      err: false,
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    return res.status(400).json({
      err: true,
      success: false,
      message: err.message
    });
  }
};


export async function getOrderDetailsController(req,res){
    try{
        const userId=req.userId;
        const orderlist = await OrderModel.find({userId})
        .sort({createdAt: -1})
        .populate('delivery_address')
        .populate('userId');

        return res.json({
            message:"Order list",
            data:orderlist,
            err:false,
            success:true
        })
    }
    catch(err){
        return res.status(400).json({
            err:true,
            success:false,
            message:err.message
        })
    }
}

function getPayPalClient() {
  const environment =
    process.env.PAYPAL_MODE === "live"
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID_LIVE,
          process.env.PAYPAL_SECRET_LIVE
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID_TEST,
          process.env.PAYPAL_SECRET_TEST
        );

  return new paypal.core.PayPalHttpClient(environment);
}

/* ==== CREATE PAYPAL ORDER ==== */
export const createOrderPaypalController = async (req, res) => {
  try {
    const total = req.query.totalAmount;
    if (!total || total <= 0) {
      return res.status(400).json({ success: false, message: "Total amount missing" });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: total },
          description: "ClassyShop Order Payment",  // 👈 FIXED
        },
      ],
    });

    const client = getPayPalClient();
    const order = await client.execute(request);

    res.json({ orderId: order.result.id });
  } catch (error) {
    console.log("PAYPAL CREATE ERROR:", error);
    res.status(500).json({ success: false, message: "Error creating PayPal order" });
  }
};

/* ==== CAPTURE PAYMENT AND SAVE ORDER ==== */
export const captureOrderPaypalController = async (req, res) => {
  try {
    const { userId, products, orderId, paymentId, payment_status, delivery_address, totalAmount, date } = req.body;

    // Capture Payment
    const request = new paypal.orders.OrdersCaptureRequest(paymentId);
    request.requestBody({});
    const client = getPayPalClient();
    await client.execute(request);

    // Save Order in DB
    const orderData = new OrderModel({
      userId,
      products,
      orderId,
      paymentId,
      payment_status,
      delivery_address,
      totalAmt: totalAmount,
      date,
    });

    await orderData.save();

    // Update Product Stock
    for (let i = 0; i < products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        products[i].productId,
        { $inc: { countInStock: -products[i].quantity } },
        { new: true }
      );
    }

    // Empty Cart
    // await CartProductModel.deleteMany({ userId });

    return res.json({ success: true, message: "Order placed", order: orderData });
  } catch (error) {
    console.log("CAPTURE ORDER ERROR:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


