import styles from "./App.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { Image, Input, Select } from "antd";
import MyContext from "./context/myContext";
import Loader from "./components/Loader";

function App() {
  const { loading, moneyPrice } = useContext(MyContext);
  const { Option } = Select;
  const [search, setSearch] = useState(1);
  const [convertValue, setConvertValue] = useState(0.41);
  const [convertMoneyPrice, setConvertMoneyPrice] = useState(0.41);

  console.log("search", search);
  console.log("convertValue", convertValue);

  console.log("moneyPrice", moneyPrice);
  console.log("convertMoneyPrice", convertMoneyPrice);

  // set convert price of money was Currency
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    const convertItem = uniqueMoneyPrice.find(
      (item) => item.currency === value
    );
    if (convertItem) {
      setConvertMoneyPrice(convertItem.price);
    }
  };

  // set convert value
  useEffect(() => {
    const convert = parseFloat(search) * parseFloat(convertMoneyPrice);
    setConvertValue(convert.toFixed(3));
    if (!search) {
      setConvertValue(0);
    }
  }, [search, convertMoneyPrice]);

  // unique money item
  const getUniqueCurrencies = (moneyPrice) => {
    const uniqueCurrencies = new Set();
    return moneyPrice.filter((money) => {
      if (!uniqueCurrencies.has(money.currency)) {
        uniqueCurrencies.add(money.currency);
        return true;
      }
      return false;
    });
  };

  const uniqueMoneyPrice = getUniqueCurrencies(moneyPrice);

  // only enter from 0 to 9 and .
  const handleKeyPress = (e) => {
    if (!/[0-9.]/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className={styles.app}>
      {loading && <Loader />}
      <h1 className={styles.title}>Currency conversion</h1>
      <div className={styles.appContainer}>
        <div className={styles.inputLayout}>
          <Input
            placeholder="Please input Money"
            className={styles.inputMoney}
            value={search}
            onChange={(e) => setSearch(e.target.value.trim())}
            onKeyPress={handleKeyPress}
          />

          <div className={styles.logoContainer}>
            <Select
              style={{
                width: "100%",
              }}
              variant="borderless"
              onChange={handleChange}
              defaultValue={["USD"]}
            >
              {uniqueMoneyPrice.map((money, index) => {
                return (
                  <Option
                    value={money.currency}
                    key={index}
                    className={styles.infoMoney}
                  >
                    <Image
                      width={24}
                      className={styles.logo}
                      src={`https://raw.githubusercontent.com/Switcheo/token-icons/7f53f49c2f0c2cabaf908d106b41f0a8d641805f/tokens/${money.currency}.svg`}
                      preview={false}
                    />
                    <span className={styles.nameMoney}>{money.currency}</span>
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <svg
          width="24"
          height="24"
          fill="currentColor"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="m16.629 11.999-1.2-1.2 3.085-3.086H2.572V5.999h15.942L15.43 2.913l1.2-1.2 4.543 4.543a.829.829 0 0 1 0 1.2l-4.543 4.543Zm-9.257-.001 1.2 1.2-3.086 3.086h15.943v1.714H5.486l3.086 3.086-1.2 1.2-4.543-4.543a.829.829 0 0 1 0-1.2l4.543-4.543Z"
            clipRule="evenodd"
          ></path>
        </svg>

        <div className={styles.inputLayout}>
          <Input className={styles.inputMoney} value={convertValue} readOnly />

          <div className={styles.logoContainer}>
            <Select
              style={{
                width: "100%",
              }}
              variant="borderless"
              onChange={handleChange}
              defaultValue={["LUNA"]}
            >
              {uniqueMoneyPrice.map((money, index) => {
                return (
                  <Option
                    value={money.currency}
                    key={index}
                    className={styles.infoMoney}
                  >
                    <Image
                      width={24}
                      className={styles.logo}
                      src={`https://raw.githubusercontent.com/Switcheo/token-icons/7f53f49c2f0c2cabaf908d106b41f0a8d641805f/tokens/${money.currency}.svg`}
                      preview={false}
                    />
                    <span className={styles.nameMoney}>{money.currency}</span>
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
