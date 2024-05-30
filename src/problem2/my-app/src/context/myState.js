import { useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./myContext";
const MyState = ({ children }) => {
  const [moneyPrice, setMoneyPrice] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch api price money
  const fetchMoneyPrice = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://interview.switcheo.com/prices.json"
      );
      setMoneyPrice(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMoneyPrice();
  }, []);
  return (
    <MyContext.Provider value={{ loading, moneyPrice }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
