import styles from "./App.module.scss";
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Image, Input, Select } from "antd";
import MyContext from "./context/myContext";
import Loader from "./components/Loader";

function App() {
  const { loading, moneyPrice } = useContext(MyContext);
  const { Option } = Select;
  const [search, setSearch] = useState(1);
  const [convertValue, setConvertValue] = useState(0.41);
  const [convertMoneyPriceRight, setConvertMoneyPriceRight] = useState(0.41);
  const [convertMoneyPriceLeft, setConvertMoneyPriceLeft] = useState(1);

  console.log("search", search);
  console.log("convertValue", convertValue);
  console.log("moneyPrice", moneyPrice);
  console.log("convertMoneyPriceRight", convertMoneyPriceRight);

  // Calculate the conversion value
  useEffect(() => {
    const convert =
      (parseFloat(search) * parseFloat(convertMoneyPriceLeft)) /
      parseFloat(convertMoneyPriceRight);
    setConvertValue(convert.toFixed(3));
    if (!search) {
      setConvertValue(0);
    }
  }, [search, convertMoneyPriceRight, convertMoneyPriceLeft]);

  // Function to get unique currencies
  const getUniqueCurrencies = useCallback((moneyPrice) => {
    const uniqueCurrencies = new Set();
    return moneyPrice.filter((money) => {
      if (!uniqueCurrencies.has(money.currency)) {
        uniqueCurrencies.add(money.currency);
        return true;
      }
      return false;
    });
  }, []);

  const uniqueMoneyPrice = useMemo(
    () => getUniqueCurrencies(moneyPrice),
    [moneyPrice, getUniqueCurrencies]
  );

  // Handle key press to allow only numbers and dot
  const handleKeyPress = useCallback((e) => {
    if (!/[0-9.]/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  // Function to set convert price of currency to the right
  const handleChangeToRight = useCallback(
    (value) => {
      console.log(`selected ${value}`);
      const convertItem = uniqueMoneyPrice.find(
        (item) => item.currency === value
      );
      if (convertItem) {
        setConvertMoneyPriceRight(convertItem.price);
      }
    },
    [uniqueMoneyPrice]
  );

  // Function to set convert price of currency to the left
  const handleChangeToLeft = useCallback(
    (value) => {
      console.log(`selected ${value}`);
      const convertItem = uniqueMoneyPrice.find(
        (item) => item.currency === value
      );
      if (convertItem) {
        setConvertMoneyPriceLeft(convertItem.price);
      }
    },
    [uniqueMoneyPrice]
  );

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
              style={{ width: "100%" }}
              variant="borderless"
              onChange={handleChangeToLeft}
              defaultValue={["USD"]}
            >
              {uniqueMoneyPrice.map((money, index) => (
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
              ))}
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
              style={{ width: "100%" }}
              variant="borderless"
              onChange={handleChangeToRight}
              defaultValue={["LUNA"]}
            >
              {uniqueMoneyPrice.map((money, index) => (
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
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
