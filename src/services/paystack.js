import PaystackPop from "@paystack/inline-js";

/**
 * Initialize Paystack payment
 * @param {object} paymentDetails - Payment details object
 * @param {string} paymentDetails.email - Customer email
 * @param {number} paymentDetails.amount - Amount in Naira
 * @param {string} paymentDetails.bookingCode - Booking code for reference
 * @param {function} paymentDetails.onSuccess - Callback on successful payment
 * @param {function} paymentDetails.onError - Callback on payment error
 */
export const initializePayment = ({
  email,
  amount,
  bookingCode,
  onSuccess,
  onError,
}) => {
  const pop = new PaystackPop();

  pop.newTransaction({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    ref: `${bookingCode}-${Date.now()}`, // Unique reference
    onClose() {
      if (onError) {
        onError("Payment cancelled");
      }
    },
    onSuccess(transaction) {
      // Payment was successful - call backend to verify
      verifyPaystackPayment(transaction.reference, onSuccess, onError);
    },
  });
};

/**
 * Verify payment with backend
 * @param {string} reference - Paystack transaction reference
 * @param {function} onSuccess - Success callback
 * @param {function} onError - Error callback
 */
const verifyPaystackPayment = async (reference, onSuccess, onError) => {
  try {
    // Verify payment with backend
    console.log("Verifying payment with reference:", reference);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/bookings/verify-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Payment verification failed");
    }

    const data = await response.json();
    console.log("Payment verified successfully:", data);

    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    if (onError) {
      onError(error.message || "Payment verification failed");
    }
  }
};

/**
 * Handle payment success - Update booking with payment status
 * @param {string} bookingId - Booking ID from database
 * @param {string} reference - Paystack reference
 */
export const updateBookingAfterPayment = async (bookingId, reference) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/bookings/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: "completed",
          paystackReference: reference,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update booking");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};
