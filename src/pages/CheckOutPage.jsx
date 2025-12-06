import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const { priceWithoutDiscount, price, cartQuantity, fetchCartData,fetchOrderDetails } =
    useGlobalContext();
  const navigate = useNavigate();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const addressList = useSelector((state) => state.address.address);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemList = useSelector((state) => state.cart.cartItem);

  const handleCashOnDelivery = async () => {
    try {
      const res = await Axios.post("/order/cash-on-delivery", {
        list_items: cartItemList,
        addressId: addressList[selectedAddress]?._id,
        subTotalAmt: price,
        totalAmt: price,
      });
      console.log(res);
      if (res?.data?.success) {
        toast.success("order successful");
        fetchCartData();
        fetchOrderDetails();
        navigate("/success", {
          state: {
            text: "order",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place COD order");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      // ---------- CLIENT-SIDE GUARDS (NEW) ----------
      if (!cartItemList || cartItemList.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      if (!addressList[selectedAddress]) {
        toast.error("Please select an address");
        return;
      }
      const MIN_ORDER_RUPEES = 50;
      if (!price || Number(price) < MIN_ORDER_RUPEES) {
        toast.error(`Minimum order value is ₹${MIN_ORDER_RUPEES}. Add more items.`);
        return;
      }
      const res = await Axios.post("/order/checkout", {
        list_items: cartItemList,
        addressId: addressList[selectedAddress]?._id,
        subTotalAmt: price,
        totalAmt: price,
      });

      console.log("Checkout create response:", res?.data);
      const session = res?.data;

      if (session?.url) {
        window.location.href = session.url;
        return;
      }
      if (session?.id) {
        toast.error("Payment session created but no redirect URL returned. Update server to return session.url");
        console.error("Session returned but no url:", session);
        return;
      }

      toast.error("Failed to create checkout session");
      console.error("Unexpected session response:", session);
    } catch (error) {
      console.error("handleOnlinePayment error:", error);
      toast.error("Something went wrong while initiating payment");
    }
  };

  return (
    <div className="min-h-[78vh] bg-slate-50 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">Checkout</h2>
          <p className="text-sm text-slate-600 mt-1">Confirm delivery address and payment method</p>
        </div>

        {/* Responsive two-column layout:
            - mobile: stacked (flex-col)
            - md and up: side-by-side (flex-row)
            Keep left ~60% and right ~40% on larger screens so address list has more space */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT: Address + other details */}
          <div className="w-full md:w-3/5 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Choose your address</h3>
              <button
                onClick={() => setOpenAddAddress(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-sm font-medium shadow-sm"
              >
                + Add address
              </button>
            </div>

            <div className="mt-5">
              <div
                className="w-full border-2 border-dashed border-blue-100 rounded-lg p-4 flex items-center justify-between text-sm text-slate-600"
                onClick={() => setOpenAddAddress(true)}
              >
                <p className="truncate">Add a new delivery address</p>
                <p className="text-xs text-slate-500">Click to add</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid gap-4">
                {/* address list container with nice scroll and spacing */}
                <div className="flex flex-col gap-3 max-h-[55vh] overflow-y-auto pr-2">
                  {addressList.length === 0 && (
                    <div className="text-sm text-slate-500 py-6 text-center">
                      No saved addresses. Click <span className="font-medium">Add address</span> to continue.
                    </div>
                  )}

                  {addressList.map((address, index) => (
                    <label
                      htmlFor={"selectedAddress" + index}
                      key={address._id || index}
                      className={`cursor-pointer rounded-lg border p-4 flex gap-3 items-start transition-shadow
                        ${selectedAddress === index ? "bg-green-50 border-green-300 shadow-sm" : "bg-white border-gray-100 hover:shadow"}
                      `}
                    >
                      <input
                        id={"selectedAddress" + index}
                        name="address"
                        type="radio"
                        value={index}
                        checked={selectedAddress === index}
                        onChange={() => setSelectedAddress(index)}
                        className="mt-1 accent-emerald-600"
                      />

                      <div className="flex-1 text-sm leading-tight">
                        <p className="text-slate-800 font-medium">{address.address_line}, {address.city}</p>
                        <p className="text-slate-600 text-xs mt-1">{address.state} • {address.country} - {address.pincode}</p>
                        <p className="text-slate-600 text-xs mt-1">📞 {address.mobile}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary + Payment */}
          <aside className="w-full md:w-2/5">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-800">₹{price}.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Delivery</span>
                    <span className="font-medium text-slate-800">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Items</span>
                    <span className="font-medium text-slate-800">{cartQuantity} Items</span>
                  </div>

                  <div className="border-t pt-3 mt-3 flex justify-between items-center">
                    <p className="text-sm text-slate-600">Total</p>
                    <p className="text-2xl font-extrabold text-slate-900">₹{price}.00</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h4 className="text-md font-semibold text-slate-800 mb-3">Payment</h4>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleOnlinePayment}
                    className="w-full py-3 rounded-md bg-gradient-to-r from-emerald-600 to-green-700 text-white font-semibold shadow hover:from-emerald-500 hover:to-green-600 transition"
                  >
                    Pay Online
                  </button>

                  <button
                    onClick={handleCashOnDelivery}
                    className="w-full py-3 rounded-md border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-600 hover:text-white transition"
                  >
                    Cash on Delivery
                  </button>

                  <p className="text-xs text-slate-500 mt-2">
                    Note: Minimum order ₹50 required for online payment. You will be redirected to the payment gateway.
                  </p>
                </div>
              </div>

              <div className="text-center text-xs text-slate-500">
                <p>By placing an order you agree to our <span className="font-medium">Terms & Conditions</span>.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {openAddAddress && <AddAddress close={setOpenAddAddress} />}
    </div>
  );
};

export default CheckOutPage;
