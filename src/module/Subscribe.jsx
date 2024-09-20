import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../redux/Slice/addDataSlice";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from '../components/SubscriptionCard'; 

function Subscribe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [status, setStatus] = useState(null);
  const [email,setEmail]=useState(localStorage.getItem("email"));
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
  


    const fetchProducts = async () => {
      console.log("Fetching products...");
      try {
        const response = await axios.get(`${apiUrl}/api/products`,{
          headers: {
              'Content-Type': 'application/json',
          }
      });

        
        console.log("Response received:", response);
    
        const { products, prices } = response.data;
        setProducts(products.data);
        setPrices(prices.data);
      } catch (err) {
        console.error("Fetch Products Error:", err);
      }
    };

    const StatusDetails= async ()=>{
        try {
        const { data } = await axios.get(`${apiUrl}/api/details`,email);
        localStorage.setItem("status",data.type)
      } catch (err) {
        console.error("Fetch type Error:", err);
      }
    }

    fetchProducts();
    StatusDetails();
  }, []);

  const handleData = (name, amount, type, PriceId) => {
    dispatch(setData({ name, amount, type, PriceId }));

    navigate("/payment");
  };

  console.log("data",localStorage.getItem("status"));

  return (
    <div>
      <main id="skip" className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]">
        <section className="bg-black">
          <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                Pricing Plans
              </h1>
              <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                Start building for free, then add a site plan to go live. Account plans unlock additional features.
              </p>
            </div>
            <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
              {prices.map((price) => {
                const product = products.find((product) => product.id === price.product);
                return (
                  <SubscriptionCard
                    key={price.id}
                    price={price}
                    product={product}
                    onSelect={(priceId) => handleData(product.name, price.unit_amount / 100, price.recurring ? price.recurring.interval : 'one-time', price.id)}
                    isDisabled={price.recurring.interval == localStorage.getItem("status")} 
                  />
                );
              })}
            </div>
            <div>
              <p className="mt-24 text-xs uppercase text-zinc-400 text-center font-bold tracking-[0.3em]">
                Brought to you by
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Subscribe;
