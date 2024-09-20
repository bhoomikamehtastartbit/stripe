// import React, { useEffect, useState } from "react";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
// import { useSelector } from "react-redux";
// const stripePromise = loadStripe(
//   "pk_test_51Pvv0706O4jzx6iFcPSmE95Qk0GalZJMnsQaqzgdAZtpyHY08oIGRSxL9TvY7kAIXHZBtvY4yufndjjVTvgwC5R700EcLTlzg6"
// );

// const cardTypeIcons = {
//   visa: <FaCcVisa />,
//   mastercard: <FaCcMastercard />,
//   americanexpress: <FaCcAmex />,
// };

// const PaymentForm = (props) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [customerId, setCustomerId] = useState("");
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [saveCardCusId, setsaveCardCusId] = useState(null);
//   const [savePayId, stsavePayId] = useState(null);

//   const v = useSelector((state) => state.data);

//   const local = localStorage.getItem(JSON.stringify("status"));
//   const cus = localStorage.getItem("customerId");
//   console.log(cus);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setCustomerId(cus);
//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       if (!paymentMethods.some((method) => method.id === paymentMethod.id)) {
//         await axios.post("http://localhost:5000/api/save-card", {
//           payment_method_id: paymentMethod.id,
//           customer_id: customerId,
//         });
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: 1000,
//           payment_method_id: paymentMethod.id,
//           customer_id: customerId,
//         }
//       );

//       if (res.data.error) {
//         console.log(res.data.error);
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       // setError("Payment failed. Please try again.");
//       // setSuccess(null);
//     }
//   };

//   //   const handleSaveCustomer = async () => {
//   //     try {
//   //       const { data } = await axios.post(
//   //         "http://localhost:5000/api/create-customer"
//   //       );
//   //       setCustomerId(data.customer_id);
//   //       console.log(data);
//   //     } catch (err) {
//   //       console.error("Create Customer Error:", err);
//   //     }
//   //   };

//   // useEffect(()=>{
//   // handleSaveCustomer()
//   // },[local])

//   const fetchSavedPaymentMethods = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/list-payment-methods",
//         { customer_id: customerId }
//       );
//       setPaymentMethods(data.data);
//     } catch (err) {
//       console.error("Fetch Payment Methods Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       fetchSavedPaymentMethods();
//     }
//   }, [customerId, paymentMethods]);

//   const handlePaymentError = (errorCode) => {
//     const errorMessages = {
//       insufficient_funds: "Payment failed. Insufficient funds",
//       expired_card: "Payment failed: Card expired",
//       incorrect_cvc: "Payment failed: Incorrect CVC",
//       lost_card: "Payment failed: Lost card",
//       stolen_card: "Payment failed: Stolen card",
//       card_velocity_exceeded: "Payment failed: Card limit exceeded",
//     };

//     setError(errorMessages[errorCode] || "Payment failed. Please try again.");
//     setSuccess(null);
//   };

//   const handleSaveCharge = async (method) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: 1000,
//           payment_method_id: method.id,
//           customer_id: customerId,
//         }
//       );

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const containerStyle = {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     height: "100vh",
//     backgroundColor: "#f0f2f5",
//     margin: 0,
//   };

//   const formStyle = {
//     background: "#fff",
//     padding: "2rem 2rem",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     height: "300px",
//     maxWidth: "500px",
//     boxSizing: "border-box",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     fontSize: "1rem",
//     cursor: "pointer",
//     marginTop: "1rem",
//     transition: "background-color 0.3s ease",
//   };

//   const buttonStyle1 = {
//     width: "50%",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     fontSize: "1rem",
//     cursor: "pointer",
//     marginTop: "1rem",
//     transition: "background-color 0.3s ease",
//   };

//   const buttonHoverStyle = {
//     ...buttonStyle,
//     backgroundColor: "#218838",
//   };

//   const disabledButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: "#c0c0c0",
//     cursor: "not-allowed",
//   };

//   const errorStyle = {
//     marginTop: "1rem",
//     color: "#dc3545",
//     display: "flex",
//     alignItems: "center",
//   };

//   const successStyle = {
//     ...errorStyle,
//     color: "#28a745",
//   };

//   const paymentMethodsStyle = {
//     width: "500px",
//   };

//   const paymentMethodCardStyle = {
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     padding: "1rem",
//     marginBottom: "1rem",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   };

//   const paymentMethodIconStyle = {
//     fontSize: "2rem",
//   };
//   return (
//     <>
//       <div style={containerStyle}>
//         <div style={formStyle}>
//           {/* <button onClick={handleSaveCustomer} style={buttonStyle1}>
//             Create Customer
//           </button> */}
//           <h1>Payment Now</h1>
//           <form onSubmit={handleSubmit}>
//             <CardElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#495057",
//                     "::placeholder": {
//                       color: "#6c757d",
//                     },
//                     border: "1px solid #ccc",
//                     padding: "12px",
//                     borderRadius: "4px",
//                     invalid: {
//                       color: "#dc3545",
//                     },
//                   },
//                 },
//               }}
//             />
//             <button
//               type="submit"
//               style={!stripe ? disabledButtonStyle : buttonStyle}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.backgroundColor = !stripe
//                   ? undefined
//                   : buttonHoverStyle.backgroundColor)
//               }
//               onMouseOut={(e) =>
//                 (e.currentTarget.style.backgroundColor = !stripe
//                   ? undefined
//                   : buttonStyle.backgroundColor)
//               }
//               disabled={!stripe}
//             >
//               Pay
//             </button>
//           </form>
//           {error && (
//             <div style={errorStyle}>
//               <FaExclamationCircle style={{ marginRight: "0.5rem" }} />
//               {error}
//             </div>
//           )}
//           {success && (
//             <div style={successStyle}>
//               <FaCheckCircle style={{ marginRight: "0.5rem" }} />
//               {success}
//             </div>
//           )}
//         </div>
//         <div style={paymentMethodsStyle}>
//           <h2>Saved Payment Methods</h2>

//           {paymentMethods.length > 0 ? (
//             paymentMethods.map((method) => (
//               <div key={method.id} style={paymentMethodCardStyle}>
//                 <div style={paymentMethodIconStyle}>
//                   {cardTypeIcons[method.card.brand.toLowerCase()] || (
//                     <FaCcVisa />
//                   )}
//                 </div>
//                 <div>
//                   <p>
//                     <strong>Brand:</strong> {method.card.brand}
//                   </p>
//                   <p>
//                     <strong>Ending in:</strong> {method.card.last4}
//                   </p>
//                   <p>
//                     <strong>Expiry Date:</strong> {method.card.exp_month}/
//                     {method.card.exp_year}
//                   </p>
//                   <button onClick={() => handleSaveCharge(method)}>
//                     Save Pay
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No saved payment methods.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default PaymentForm;

// import React, { useEffect, useState } from "react";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaCcVisa,
//   FaCcMastercard,
//   FaCcAmex,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";

// const stripePromise = loadStripe(
//   "pk_test_51Pvv0706O4jzx6iFcPSmE95Qk0GalZJMnsQaqzgdAZtpyHY08oIGRSxL9TvY7kAIXHZBtvY4yufndjjVTvgwC5R700EcLTlzg6"
// );

// const cardTypeIcons = {
//   visa: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" || <FaCcVisa />,
//   mastercard: "https://w7.pngwing.com/pngs/305/373/png-transparent-logo-mastercard-font-solar-home-text-orange-logo-thumbnail.png" || <FaCcMastercard />,
//   americanexpress: <FaCcAmex />,
// };

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [customerId, setCustomerId] = useState(
//     localStorage.getItem("customerId") || ""
//   );
//   const [paymentMethods, setPaymentMethods] = useState([]);

//   const v = useSelector((state) => state.data);

//   const [data,setData] =useState(v.ammount)
//   console.log("hello ",v.ammount,data)
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       // Save payment method if not already saved
//       await axios.post("http://localhost:5000/api/save-card", {
//         payment_method_id: paymentMethod.id,
//         customer_id: customerId,
//       });

//       // Create Payment Intent

//       const res = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: data,
//           payment_method_id: paymentMethod.id,
//           customer_id: customerId,
//         }
//       );

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const fetchSavedPaymentMethods = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/list-payment-methods",
//         { customer_id: customerId }
//       );
//       setPaymentMethods(data.data);
//     } catch (err) {
//       console.error("Fetch Payment Methods Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       fetchSavedPaymentMethods();
//     }
//   }, [success]);

//   const handlePaymentError = (errorCode) => {
//     const errorMessages = {
//       insufficient_funds: "Payment failed. Insufficient funds",
//       expired_card: "Payment failed: Card expired",
//       incorrect_cvc: "Payment failed: Incorrect CVC",
//       lost_card: "Payment failed: Lost card",
//       stolen_card: "Payment failed: Stolen card",
//       card_velocity_exceeded: "Payment failed: Card limit exceeded",
//     };

//     setError(errorMessages[errorCode] || "Payment failed. Please try again.");
//     setSuccess(null);
//   };

//   const handleSaveCharge = async (method) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: 1000,
//           payment_method_id: method.id,
//           customer_id: customerId,
//         }
//       );

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const containerStyle = {

//     display: "flex",
//     position:"relative",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width:"100%",

//     backgroundColor: "#FAFAFA",
//     padding: "100px 0px 180px",
//   };

//   const formStyle = {
//     background: "#fff",
//     padding: "5rem 2rem",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     height:"300px",
//     maxWidth: "500px",
//     boxSizing: "border-box",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     fontSize: "1rem",
//     cursor: "pointer",
//     marginTop: "1rem",
//     transition: "background-color 0.3s ease",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#218838",
//   };

//   const disabledButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: "#c0c0c0",
//     cursor: "not-allowed",
//   };

//   const errorStyle = {
//     marginTop: "1rem",
//     color: "#dc3545",
//     display: "flex",
//     alignItems: "center",
//   };

//   const successStyle = {
//     ...errorStyle,
//     color: "#28a745",
//   };

//   const paymentMethodsStyle = {
//     width: "500px",
//   };

//   const paymentMethodCardStyle = {
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     padding: "1rem",
//     marginBottom: "1rem",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   };

//   const paymentMethodIconStyle = {
//     fontSize: "2rem",
//   };

//   const myicon ={
//     width:"100px"
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={formStyle}>
//         <h1 className="font-bold mb-5 text-xl">Payment Now</h1>
//         <form onSubmit={handleSubmit}>
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#495057",
//                   "::placeholder": {
//                     color: "#6c757d",
//                   },
//                   border: "1px solid #ccc",
//                   padding: "12px",
//                   borderRadius: "4px",
//                   invalid: {
//                     color: "#dc3545",
//                   },
//                 },
//               },
//             }}
//           />
//           <button
//             type="submit"
//             className={`w-full p-3 border-0 rounded-md text-white text-base cursor-pointer mt-4 transition-colors duration-300
//            ${
//             stripe
//              ? "bg-zinc-900 hover:bg-green-500 hover:text-white"
//              : "bg-gray-500 cursor-not-allowed opacity-50"
//                 }
//             `}
//             disabled={!stripe}
//           >
//             Pay
//           </button>
//         </form>
//         {error && (
//           <div style={errorStyle}>
//             <FaExclamationCircle style={{ marginRight: "0.5rem" }} />
//             {error}
//           </div>
//         )}
//         {success && (
//           <div style={successStyle}>
//             <FaCheckCircle style={{ marginRight: "0.5rem" }} />
//             {success}
//           </div>
//         )}
//       </div>
//       <div style={paymentMethodsStyle}>
//         <h2 className="font-bold mb-2 text-lg">Saved Payment Methods</h2>
//         {paymentMethods.length > 0 ? (
//           paymentMethods.map((method) => (
//             <div key={method.id} style={paymentMethodCardStyle}>
//               <div style={paymentMethodIconStyle}>
//                 <img src={cardTypeIcons[method.card.brand.toLowerCase()]} alt="" className="myicon" style={myicon} />
//               </div>
//               <div>
//                 <p>
//                   <strong>Brand:</strong> {method.card.brand}
//                 </p>
//                 <p>
//                   <strong>Ending in:</strong> {method.card.last4}
//                 </p>
//                 <p>
//                   <strong>Expiry Date:</strong> {method.card.exp_month}/
//                   {method.card.exp_year}
//                 </p>
//                 <button onClick={() => handleSaveCharge(method)} className="border p-2 mt-2 bg-zinc-900 rounded-lg text-white hover:bg-green-500 hover:text-white">
//                   Save Pay
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No saved payment methods.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useEffect, useState } from "react";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaCcVisa,
//   FaCcMastercard,
//   FaCcAmex,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";

// const stripePromise = loadStripe("pk_test_51Pvv0706O4jzx6iFcPSmE95Qk0GalZJMnsQaqzgdAZtpyHY08oIGRSxL9TvY7kAIXHZBtvY4yufndjjVTvgwC5R700EcLTlzg6");

// const cardTypeIcons = {
//   visa: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" || <FaCcVisa />,
//   mastercard: "https://w7.pngwing.com/pngs/305/373/png-transparent-logo-mastercard-font-solar-home-text-orange-logo-thumbnail.png" || <FaCcMastercard />,
//   americanexpress: <FaCcAmex />,
// };

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [customerId, setCustomerId] = useState(localStorage.getItem("customerId") || "");
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [data, setData] = useState(useSelector((state) => state.data.amount));
//   const [subscription, setSubscription] = useState(false);
//   const [priceId, setPriceId] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       if (subscription) {
//         await createSubscription(paymentMethod.id);
//       } else {
//         await createPaymentIntent(paymentMethod.id);
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const createPaymentIntent = async (paymentMethodId) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: data.ammount,
//           payment_method_id: paymentMethodId,
//           customer_id: customerId,
//         }
//       );

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const createSubscription = async (paymentMethodId) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/create-subscription",
//         {
//           payment_method_id: paymentMethodId,
//           customer_id: customerId,
//           price_id: priceId,
//         }
//       );

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Subscription Created Successfully!",
//           icon: "success",
//         });
//         setSuccess("Subscription successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Subscription Error:", err);
//       setError("Subscription failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const fetchSavedPaymentMethods = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/list-payment-methods",
//         { customer_id: customerId }
//       );
//       setPaymentMethods(data.data);
//     } catch (err) {
//       console.error("Fetch Payment Methods Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       fetchSavedPaymentMethods();
//     }
//   }, [success]);

//   const handlePaymentError = (errorCode) => {
//     const errorMessages = {
//       insufficient_funds: "Payment failed. Insufficient funds",
//       expired_card: "Payment failed: Card expired",
//       incorrect_cvc: "Payment failed: Incorrect CVC",
//       lost_card: "Payment failed: Lost card",
//       stolen_card: "Payment failed: Stolen card",
//       card_velocity_exceeded: "Payment failed: Card limit exceeded",
//     };

//     setError(errorMessages[errorCode] || "Payment failed. Please try again.");
//     setSuccess(null);
//   };

//   const handleSaveCharge = async (method) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: 1000,
//           payment_method_id: method.id,
//           customer_id: customerId,
//         }
//       );

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const containerStyle = {
//     display: "flex",
//     position: "relative",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "#FAFAFA",
//     padding: "100px 0px 180px",
//   };

//   const formStyle = {
//     background: "#fff",
//     padding: "5rem 2rem",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     height: "300px",
//     maxWidth: "500px",
//     boxSizing: "border-box",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     fontSize: "1rem",
//     cursor: "pointer",
//     marginTop: "1rem",
//     transition: "background-color 0.3s ease",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#218838",
//   };

//   const disabledButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: "#c0c0c0",
//     cursor: "not-allowed",
//   };

//   const errorStyle = {
//     marginTop: "1rem",
//     color: "#dc3545",
//     display: "flex",
//     alignItems: "center",
//   };

//   const successStyle = {
//     ...errorStyle,
//     color: "#28a745",
//   };

//   const paymentMethodsStyle = {
//     width: "500px",
//   };

//   const paymentMethodCardStyle = {
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     padding: "1rem",
//     marginBottom: "1rem",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   };

//   const paymentMethodIconStyle = {
//     fontSize: "2rem",
//   };

//   const myicon = {
//     width: "100px"
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={formStyle}>
//         <h1 className="font-bold mb-5 text-xl">Payment Now</h1>
//         <form onSubmit={handleSubmit}>
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#495057",
//                   "::placeholder": {
//                     color: "#6c757d",
//                   },
//                   border: "1px solid #ccc",
//                   padding: "12px",
//                   borderRadius: "4px",
//                   invalid: {
//                     color: "#dc3545",
//                   },
//                 },
//               },
//             }}
//           />
//           <div style={{ marginTop: "1rem" }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={subscription}
//                 onChange={() => setSubscription(!subscription)}
//               />
//               <span style={{ marginLeft: "0.5rem" }}>Subscribe</span>
//             </label>
//           </div>
//           <button
//             type="submit"
//             className={`w-full p-3 border-0 rounded-md text-white text-base cursor-pointer mt-4 transition-colors duration-300
//              ${
//               stripe
//                ? "bg-zinc-900 hover:bg-green-500 hover:text-white"
//                : "bg-gray-500 cursor-not-allowed opacity-50"
//               }
//             `}
//             disabled={!stripe}
//           >
//             {subscription ? "Subscribe" : "Pay"}
//           </button>
//         </form>
//         {error && (
//           <div style={errorStyle}>
//             <FaExclamationCircle style={{ marginRight: "0.5rem" }} />
//             {error}
//           </div>
//         )}
//         {success && (
//           <div style={successStyle}>
//             <FaCheckCircle style={{ marginRight: "0.5rem" }} />
//             {success}
//           </div>
//         )}
//       </div>
//       <div style={paymentMethodsStyle}>
//         <h2 className="font-bold mb-2 text-lg">Saved Payment Methods</h2>
//         {paymentMethods.length > 0 ? (
//           paymentMethods.map((method) => (
//             <div key={method.id} style={paymentMethodCardStyle}>
//               <div style={paymentMethodIconStyle}>
//                 <img src={cardTypeIcons[method.card.brand.toLowerCase()]} alt="" className="myicon" style={myicon} />
//               </div>
//               <div>
//                 <p>
//                   <strong>Brand:</strong> {method.card.brand}
//                 </p>
//                 <p>
//                   <strong>Ending in:</strong> {method.card.last4}
//                 </p>
//                 <p>
//                   <strong>Expiry Date:</strong> {method.card.exp_month}/
//                   {method.card.exp_year}
//                 </p>
//                 <button onClick={() => handleSaveCharge(method)} className="border p-2 mt-2 bg-zinc-900 rounded-lg text-white hover:bg-green-500 hover:text-white">
//                   Save Pay
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No saved payment methods.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useEffect, useState } from "react";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// const stripePromise = loadStripe("pk_test_51Pvv0706O4jzx6iFcPSmE95Qk0GalZJMnsQaqzgdAZtpyHY08oIGRSxL9TvY7kAIXHZBtvY4yufndjjVTvgwC5R700EcLTlzg6");

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [products, setProducts] = useState([]);
//   const [prices, setPrices] = useState([]);
//   const [customerId, setCustomerId] = useState(localStorage.getItem("customerId") || "");
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [subscription, setSubscription] = useState(false);
//   const [selectedPriceId, setSelectedPriceId] = useState("");

//   useEffect(() => {
//     // Fetch products and prices
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/products");
//         setProducts(data.products.data);
//         setPrices(data.prices.data);
//       } catch (err) {
//         console.error("Fetch Products Error:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       if (subscription) {
//         await createSubscription(paymentMethod.id);
//       } else {
//         await createPaymentIntent(paymentMethod.id);
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const createPaymentIntent = async (paymentMethodId) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/create-payment-intent", {
//         amount: 1000, // Example amount
//         payment_method_id: paymentMethodId,
//         customer_id: customerId,
//       });

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const createSubscription = async (paymentMethodId) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/create-subscription", {
//         payment_method_id: paymentMethodId,
//         customer_id: customerId,
//         price_id: selectedPriceId,
//       });

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Subscription Created Successfully!",
//           icon: "success",
//         });
//         setSuccess("Subscription successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Subscription Error:", err);
//       setError("Subscription failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const fetchSavedPaymentMethods = async () => {
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/list-payment-methods", { customer_id: customerId });
//       setPaymentMethods(data.data);
//     } catch (err) {
//       console.error("Fetch Payment Methods Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       fetchSavedPaymentMethods();
//     }
//   }, [success]);

//   const handlePaymentError = (errorCode) => {
//     const errorMessages = {
//       insufficient_funds: "Payment failed. Insufficient funds",
//       expired_card: "Payment failed: Card expired",
//       incorrect_cvc: "Payment failed: Incorrect CVC",
//       lost_card: "Payment failed: Lost card",
//       stolen_card: "Payment failed: Stolen card",
//       card_velocity_exceeded: "Payment failed: Card limit exceeded",
//     };

//     setError(errorMessages[errorCode] || "Payment failed. Please try again.");
//     setSuccess(null);
//   };

//   const handleSaveCharge = async (method) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/create-payment-intent", {
//         amount: 1000,
//         payment_method_id: method.id,
//         customer_id: customerId,
//       });

//       if (res.data.error) {
//         handlePaymentError(res.data.error);
//       } else if (res.data.success === "Success") {
//         Swal.fire({
//           title: "Payment Successful!",
//           icon: "success",
//         });
//         setSuccess("Payment successful");
//         setError("");
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       setError("Payment failed. Please try again.");
//       setSuccess(null);
//     }
//   };

//   const containerStyle = {
//     display: "flex",
//     position: "relative",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "#FAFAFA",
//     padding: "100px 0px 180px",
//   };

//   const formStyle = {
//     background: "#fff",
//     padding: "5rem 2rem",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     height: "300px",
//     maxWidth: "500px",
//     boxSizing: "border-box",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     fontSize: "1rem",
//     cursor: "pointer",
//     marginTop: "1rem",
//     transition: "background-color 0.3s ease",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#218838",
//   };

//   const disabledButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: "#c0c0c0",
//     cursor: "not-allowed",
//   };

//   const errorStyle = {
//     marginTop: "1rem",
//     color: "#dc3545",
//     display: "flex",
//     alignItems: "center",
//   };

//   const successStyle = {
//     ...errorStyle,
//     color: "#28a745",
//   };

//   const paymentMethodsStyle = {
//     width: "500px",
//   };

//   const paymentMethodCardStyle = {
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     padding: "1rem",
//     marginBottom: "1rem",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   };

//   const paymentMethodIconStyle = {
//     fontSize: "2rem",
//   };

//   const myicon = {
//     width: "100px"
//   };

//   console.log(products,prices)

//   return (
//     <div style={containerStyle}>
//       <div style={formStyle}>
//         <h1 className="font-bold mb-5 text-xl">Payment Now</h1>
//         <form onSubmit={handleSubmit}>
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#495057",
//                   "::placeholder": {
//                     color: "#6c757d",
//                   },
//                   border: "1px solid #ccc",
//                   padding: "12px",
//                   borderRadius: "4px",
//                   invalid: {
//                     color: "#dc3545",
//                   },
//                 },
//               },
//             }}
//           />
//           <div style={{ marginTop: "1rem" }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={subscription}
//                 onChange={() => setSubscription(!subscription)}
//               />
//               <span style={{ marginLeft: "0.5rem" }}>Subscribe</span>
//             </label>
//           </div>
//           {subscription && (
//             <div style={{ marginTop: "1rem" }}>
//               <label>
//                 <span style={{ marginRight: "0.5rem" }}>Select Product:</span>
//                 <select onChange={(e) => setSelectedPriceId(e.target.value)} value={selectedPriceId}>
//                   <option value="">Select a product</option>
//                   {prices.map((price) => (
//                     <option key={price.id} value={price.id}>
//                       {products.find((product) => product.id === price.product).name} - ${price.unit_amount / 100}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>
//           )}
//           <button
//             type="submit"
//             className={`w-full p-3 border-0 rounded-md text-white text-base cursor-pointer mt-4 transition-colors duration-300
//             ${stripe ? "bg-zinc-900 hover:bg-green-500 hover:text-white" : "bg-gray-500 cursor-not-allowed opacity-50"}`}
//             disabled={!stripe}
//           >
//             {subscription ? "Subscribe" : "Pay"}
//           </button>
//         </form>
//         {error && (
//           <div style={errorStyle}>
//             <FaExclamationCircle style={{ marginRight: "0.5rem" }} />
//             {error}
//           </div>
//         )}
//         {success && (
//           <div style={successStyle}>
//             <FaCheckCircle style={{ marginRight: "0.5rem" }} />
//             {success}
//           </div>
//         )}
//       </div>
//       <div style={paymentMethodsStyle}>
//         <h2 className="font-bold mb-2 text-lg">Saved Payment Methods</h2>
//         {paymentMethods.length > 0 ? (
//           paymentMethods.map((method) => (
//             <div key={method.id} style={paymentMethodCardStyle}>
//               <div style={paymentMethodIconStyle}>
//                 {/* <img src={cardTypeIcons[method.card.brand.toLowerCase()]} alt="" className="myicon" style={myicon} /> */}
//               </div>
//               <div>
//                 <p>
//                   <strong>Brand:</strong> {method.card.brand}
//                 </p>
//                 <p>
//                   <strong>Ending in:</strong> {method.card.last4}
//                 </p>
//                 <p>
//                   <strong>Expiry Date:</strong> {method.card.exp_month}/
//                   {method.card.exp_year}
//                 </p>
//                 <button onClick={() => handleSaveCharge(method)} className="border p-2 mt-2 bg-zinc-900 rounded-lg text-white hover:bg-green-500 hover:text-white">
//                   Save Pay
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No saved payment methods.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;

import React, { useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51Pvv0706O4jzx6iFcPSmE95Qk0GalZJMnsQaqzgdAZtpyHY08oIGRSxL9TvY7kAIXHZBtvY4yufndjjVTvgwC5R700EcLTlzg6"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("customerId") || ""
  );
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [subscription, setSubscription] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState(useSelector((state) => state.data));

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);
        setProducts(data.products.data);
        setPrices(data.prices.data);
      } catch (err) {
        console.error("Fetch Products Error:", err);
      }
    };

    fetchProducts();
  }, []);

  console.log(selectedPriceId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {

      // const subscription = await stripe.subscriptions.retrieve(
      //   customerId
      // );
      // console.log(subscription)
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (paymentMethod) {
        await createSubscription(paymentMethod.id);
        elements.getElement(CardElement).clear();
      }
      // await createPaymentIntent(paymentMethod.id);
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Payment failed. Please try again.");
      setSuccess(null);
    }
  };

  // const createPaymentIntent = async (paymentMethodId) => {
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/create-payment-intent", {
  //       amount: data.amount,
  //       payment_method_id: paymentMethodId,
  //       customer_id: customerId,
  //     });

  //     if (res.data.error) {
  //       handlePaymentError(res.data.error);
  //     } else if (res.data.success === "Success") {
  //       Swal.fire({
  //         title: "Payment Successful!",
  //         icon: "success",
  //       });
  //       setSuccess("Payment successful");
  //       setError("");
  //     }
  //   } catch (err) {
  //     console.error("Payment Error:", err);
  //     setError("Payment failed. Please try again.");
  //     setSuccess(null);
  //   }
  // };

  const createSubscription = async (paymentMethodId) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/create-subscription`,
        {
          payment_method_id: paymentMethodId,
          customer_id: customerId,
          price_id: "price_1PzWqf06O4jzx6iFE9wRzQIS",
          amount: 2000,
          type:"week",
          email: localStorage.getItem('email')
        }
      );

      if (res.data.error) {
        handlePaymentError(res.data.error);
      } else if (res.data.status ) {
        Swal.fire({
          title: "Subscription Created Successfully!",
          icon: "success",
        });
        setSuccess("Subscription successful");
        setError("");
      }
    } catch (err) {
      console.error("Subscription Error:", err);
      setError("Subscription failed. Please try again.");
      setSuccess(null);
    }
  };

  const fetchSavedPaymentMethods = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/list-payment-methods`,
        { customer_id: customerId }
      );
      setPaymentMethods(data.data);
    } catch (err) {
      console.error("Fetch Payment Methods Error:", err);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchSavedPaymentMethods();
    }
  }, [success]);

  const handlePaymentError = (errorCode) => {
    const errorMessages = {
      insufficient_funds: "Payment failed. Insufficient funds",
      expired_card: "Payment failed: Card expired",
      incorrect_cvc: "Payment failed: Incorrect CVC",
      lost_card: "Payment failed: Lost card",
      stolen_card: "Payment failed: Stolen card",
      card_velocity_exceeded: "Payment failed: Card limit exceeded",
    };

    setError(errorMessages[errorCode] || "Payment failed. Please try again.");
    setSuccess(null);
  };


  const handleSaveCharge = async (method) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/create-payment-intent`,
        {
          amount: 1000,
          payment_method_id: method.id,
          customer_id: customerId,
        }
      );

      if (res.data.error) {
        handlePaymentError(res.data.error);
      } else if (res.data.success === "Success") {
        Swal.fire({
          title: "Payment Successful!",
          icon: "success",
        });
        setSuccess("Payment successful");
        setError("");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Payment failed. Please try again.");
      setSuccess(null);
    }
  };

 

  const containerStyle = {
    display: "flex",
    position: "relative",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FAFAFA",
    padding: "100px 0px 180px",
  };

  const formStyle = {
    background: "#fff",
    padding: "5rem 2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "300px",
    maxWidth: "500px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#c0c0c0",
    cursor: "not-allowed",
  };

  const errorStyle = {
    marginTop: "1rem",
    color: "#dc3545",
    display: "flex",
    alignItems: "center",
  };

  const successStyle = {
    ...errorStyle,
    color: "#28a745",
  };

  const paymentMethodsStyle = {
    width: "500px",
  };

  const paymentMethodCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const paymentMethodIconStyle = {
    fontSize: "2rem",
  };

  console.log(products, prices, data);

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 className="font-bold mb-5 text-xl">Payment Now</h1>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#495057",
                  "::placeholder": {
                    color: "#6c757d",
                  },
                  border: "1px solid #ccc",
                  padding: "12px",
                  borderRadius: "4px",
                  invalid: {
                    color: "#dc3545",
                  },
                },
              },
            }}
          />
          {/* <div style={{ marginTop: "1rem" }}>
            <label>
              <input
                type="checkbox"
                checked={subscription}
                onChange={() => setSubscription(!subscription)}
              />
              <span style={{ marginLeft: "0.5rem" }}>Subscribe</span>
            </label>
          </div>
          {subscription && (
            <div style={{ marginTop: "1rem" }}>
              <div className="flex flex-wrap gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                {prices.map((price) => {
                  const product = products.find((product) => product.id === price.product);
                  return (
                    <div
                      key={price.id}
                      className="p-6 rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 flex-1 basis-1/3 max-w-xs cursor-pointer"
                      onClick={() => handleSubscriptionSelect(price.id, product)}
                    >
                      <h2 className="text-2xl font-semibold leading-6 text-white">
                        {product.name}
                      </h2>
                      <p className="mt-4 text-zinc-300">
                        {product.description || 'Description not available'}
                      </p>
                      <p className="mt-8">
                        <span className="text-5xl font-extrabold white">${price.unit_amount / 100}</span>
                        <span className="text-base font-medium text-zinc-100">
                          {price.recurring ? `/${price.recurring.interval}` : ''}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )} */}
          <button
            type="submit"
            className={`w-full p-3 border-0 rounded-md text-white text-base cursor-pointer mt-4 transition-colors duration-300 
            ${
              stripe
                ? "bg-zinc-900 hover:bg-green-500 hover:text-white"
                : "bg-gray-500 cursor-not-allowed opacity-50"
            }`}
            disabled={!stripe}
          >
            {subscription ? "Subscribe" : "Pay"}
          </button>
        </form>
        {error && (
          <div style={errorStyle}>
            <FaExclamationCircle style={{ marginRight: "0.5rem" }} />
            {error}
          </div>
        )}
        {success && (
          <div style={successStyle}>
            <FaCheckCircle style={{ marginRight: "0.5rem" }} />
            {success}
          </div>
        )}
      </div>
      <div style={paymentMethodsStyle}>
        <h2 className="font-bold mb-2 text-lg">Saved Payment Methods</h2>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} style={paymentMethodCardStyle}>
              <div style={paymentMethodIconStyle}>
                {/* <img src={cardTypeIcons[method.card.brand.toLowerCase()]} alt="" className="myicon" style={myicon} /> */}
              </div>
              <div>
                <p>
                  <strong>Brand:</strong> {method.card.brand}
                </p>
                <p>
                  <strong>Ending in:</strong> {method.card.last4}
                </p>
                <p>
                  <strong>Expiry Date:</strong> {method.card.exp_month}/
                  {method.card.exp_year}
                </p>
                <button
                  onClick={() => handleSaveCharge(method)}
                  className="border p-2 mt-2 bg-zinc-900 rounded-lg text-white hover:bg-green-500 hover:text-white"
                >
                  Save Pay
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved payment methods.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
