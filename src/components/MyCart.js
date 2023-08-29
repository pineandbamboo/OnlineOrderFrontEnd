import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";
import { ItemQuantityModifier } from "./ItemQuantityModifier";
import Item from "antd/es/list/Item";

const { Text } = Typography;

export const MyCart = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [plusMinusButtonClickedTimes, setPlusMinusButtonClickedTimes] =
    useState(0);

  // get ths shopping cart data
  useEffect(() => {
    if (!cartVisible) {
      return;
    }

    setLoading(true);
    getCart()
      .then((data) => {
        setCartData(data);
        console.log("updated cart data");
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible, refresh, plusMinusButtonClickedTimes]);

  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then(() => {
        message.success("Successfully checkout");
        setCartVisible(false);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChecking(false);
      });
  };

  const onCloseDrawer = () => {
    setCartVisible(false);
  };

  const onOpenDrawer = () => {
    setCartVisible(true);
  };

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Button type="primary" shape="round" onClick={onOpenDrawer}>
        Cart
      </Button>
      <Drawer
        title="My Shopping Cart"
        onClose={onCloseDrawer}
        open={cartVisible}
        width={520}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text
              strong={true}
            >{`Total price: $${cartData?.total_price}`}</Text>
            <div>
              <Button onClick={onRefresh}>Refresh</Button>
              <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                onClick={onCheckOut}
                type="primary"
                loading={checking}
                disabled={loading || cartData?.order_items.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={cartData?.order_items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.menu_item_name}
                description={`$${item.price}`}
              />
              <ItemQuantityModifier
                itemId={item.menu_item_id}
                quantity={item.quantity}
                shape={"circle"}
                onClick={onRefresh}
                setPlusMinusButtonClickedTimes={setPlusMinusButtonClickedTimes}
                plusMinusButtonClickedTimes={plusMinusButtonClickedTimes}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;
