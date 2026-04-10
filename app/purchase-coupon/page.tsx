"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import moment from "moment";

// const BASE_URL = 'http://localhost:5002/api/';
const BASE_URL = "https://api.beasy.info/api/";
// const BASE_URL = "https://api-dev.beasy.info/api/";
// const BASE_URL = "https://api.beasy.info/api/";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseCoupon />
    </Suspense>
  );
}

function PurchaseCoupon() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // get ?id=123
  const [aba, setAba] = useState(null);
  const [khqr, setKHQR] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [paymentLinkData, setPaymentLinkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}guest/payment-link/${id}/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPaymentLinkData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    fetch(`${BASE_URL}payment/aba/checkout/payment-link/rest/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        // checkout_qr_url
        setAba(data.data.abapay_deeplink);
        setKHQR(data.data.checkout_qr_url);
        setError(data?.data?.errorMessage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  const handlePayNow = () => {
    setIsLoading(true);
    if (aba) {
      try {
        const fallback = khqr; // fallback URL if app is not installed
        // Record the time
        const start = Date.now();

        window.location = aba; // try to open app
        setTimeout(() => {
          if (Date.now() - start < 2000) {
            // App did not open
            if (fallback) window.location = fallback;
          }
        }, 1500);
        // const response = window.open(aba, "_self");
        // if (!response && khqr) {
        //   window.open(khqr, "_self");
        // }
      } catch (error) {
        console.log("error", error);
        // if (khqr) {
        //   window.open(khqr, "_self");
        // }
      }
    }
  };

  if (loading)
    return <div className="text-center mt-25">Plase wait...</div>;

  if (!paymentLinkData)
    return <div className="text-center mt-25">Coupon not found</div>;
  const { user, coupons, type } = paymentLinkData;

  const subtotal = paymentLinkData.amount;
  const vat = paymentLinkData.vatFee;
  const total = paymentLinkData.total;

  return (
    <div className="min-h-screen bg-gray-900 px-2 py-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Invoice content */}
        <div className="px-4 py-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl font-bold">Invoice</h1>
          </div>

          {/* Company info */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-gray-600 text-xs mb-1">
                SUNTEL TECHNOLOGY (CAMBODIA) CO., LTD.
              </div>
              <div className="text-gray-600 text-xs mb-1">K003-902405242</div>
              <div className="text-gray-600 text-xs">010957098</div>
            </div>
            <div className="w-16 h-16 relative">
              <Image
                src="/images/new-beasy.png"
                alt="Logo"
                fill
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Invoice details grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {type === "COUPON" ? (
              <div>
                <div className="text-gray-600 text-xs mb-2">Billed to</div>
                <div className="font-semibold mb-1 text-sm">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-gray-600 text-sm">{user.username}</div>
              </div>
            ) : (
              <div>
                <div className="text-gray-600 text-xs mb-2">Billed to</div>
                <div className="font-semibold mb-1 text-sm">
                  Suntel Technology
                </div>
              </div>
            )}
            <div>
              <div className="text-gray-600 text-xs mb-2">E-Invoice Number</div>
              <div className="font-semibold text-sm">
                {paymentLinkData?.bulkOrderId || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-2">Payment Method</div>
              <div className="font-semibold text-sm">ABA Pay</div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-gray-600 text-xs mb-2">Issue Date</div>
              {/* <div className="font-semibold text-sm">01 Oct, 2025</div> */}
              <div className="font-semibold text-sm">
                {paymentLinkData?.tranInitDate
                  ? moment(paymentLinkData?.tranInitDate).format("DD MMM, YYYY")
                  : moment().format("DD MMM, YYYY")}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-2">Date Due</div>
              <div className="font-semibold text-sm">
                {paymentLinkData?.tranInitDate
                  ? moment(paymentLinkData?.tranInitDate).format("DD MMM, YYYY")
                  : moment().format("DD MMM, YYYY")}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Item details table */}
          <div className="mb-6">
            <div className="grid grid-cols-6 gap-2 text-gray-600 text-xs font-medium mb-4">
              <div className="col-span-4 text-xs">ITEM DETAIL</div>
              <div className="col-span-2 text-center text-xs">QTY</div>
              {/* <div className="col-span-3 text-right text-xs">UNIT PRICE</div>
              <div className="col-span-3 text-right text-xs">AMOUNT</div> */}
            </div>

            <div className="border-t border-gray-200 mb-5"></div>
            {type === "GENERAL" ? (
              <div className="grid grid-cols-6 gap-2 text-sm mb-6">
                <div className="col-span-4 text-sm">General Payment</div>
                <div className="col-span-2 text-center text-sm">1</div>
              </div>
            ) : null}
            {coupons.map((coupon: any, index: any) => (
              <div key={index} className="grid grid-cols-6 gap-2 text-sm mb-6">
                <div className="col-span-4 text-sm">{coupon.name}</div>
                <div className="col-span-2 text-center text-sm">
                  {coupon.qty}
                </div>
                {/* <div className="col-span-3 text-right text-sm">
                  {coupon.type === "FIXED"
                    ? `$${coupon.value}`
                    : `${coupon.value}%`}
                </div>
                <div className="col-span-3 text-right text-sm">{}</div> */}
              </div>
            ))}

            {/* Subtotal and VAT */}
            <div className="space-y-3">
              <div className="flex text-sm gap-4">
                <div className="flex flex-1 justify-end">
                  <div className="text-gray-600 text-sm">Subtotal</div>
                </div>
                <div className="w-17.5 flex justify-end">
                  <div className="font-medium text-sm">${subtotal}</div>
                </div>
              </div>
              <div className="flex text-sm">
                <div className="flex flex-1 justify-end">
                  <div className="text-gray-600 text-sm">VAT (10%)</div>
                </div>
                <div className="w-17.5 flex justify-end">
                  <div className="font-medium text-sm">${vat}</div>
                </div>
              </div>
              <div className="flex text-sm">
                <div className="flex flex-1 justify-end">
                  <div className="text-gray-600 text-sm">Total</div>
                </div>
                <div className="w-17.5 flex justify-end">
                  <div className="font-medium text-sm">${total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pay Now button */}
        <div className="px-8 pb-8">
          <button
            disabled={!aba || isLoading}
            className="h-12 w-full bg-blue-700 text-white text-lg font-semibold rounded-full hover:bg-blue-800 disabled:bg-gray-500 transition-colors"
            onClick={handlePayNow}
          >
            {!isLoading ? error || "Pay Now" : "loading..."}
          </button>
        </div>
      </div>
    </div>
  );
}
