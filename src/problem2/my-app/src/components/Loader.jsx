import { Spin } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 12,
      }}
    >
      <Spin spinning={true} />
      <p style={{ color: "#fff" }}>Loading...</p>
    </div>
  );
};

export default Loader;
