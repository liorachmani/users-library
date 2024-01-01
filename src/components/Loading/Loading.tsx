import { Flex, Spin } from "antd";
import { memo } from "react";

function Loading() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Flex>
        <Spin tip="Loading" size="large">
          <div>Appsforce</div>
        </Spin>
      </Flex>
    </Flex>
  );
}

export default memo(Loading);
