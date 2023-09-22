import {
  Button,
  Card,
  Image,
  List,
  message,
  Select,
  Tooltip,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants, getCart } from "../utils";
import { ItemQuantityModifier } from "./ItemQuantityModifier";
// const { Option } = Select;

const FoodList = (drawerClickedTimes, setDrawerClickedTimes) => {
  const [foodData, setFoodData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);
  // const [plusMinusButtonClickedTimes, setPlusMinusButtonClickedTimes] =
  //   useState(0);

  const getQuantityById = (orderItemId, order_items) => {
    const foundItem = order_items.find(
      (item) => item.menu_item_id === orderItemId
    );

    if (foundItem) {
      return foundItem.quantity;
    } else {
      return 0; // Return null (or any other value) if the item with the specified order_item_id is not found.
    }
  };

  // get ths shopping cart data
  useEffect(() => {
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
  }, [drawerClickedTimes]);

  const onUpdateCartSuccess = () => {
    setLoading(true);
    getCart()
      .then((data) => {
        data.order_items.sort((a, b) => a.menu_item_id - b.menu_item_id);
        setCartData(data);
        console.log("updated cart data");
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);

  return (
    <>
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}
        style={{ width: 200 }}
        onChange={() => {}}
      >
        {restaurants.map((item) => {
          return <Select value={item.id}>{item.name}</Select>;
        })}
      </Select>
      {curRest && (
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                // extra={<AddToCartButton itemId={item.id} />}
              >
                <Image
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "100%",
                    // paddingTop: "75%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                <Row align="middle" justify="space-between">
                  <Col>{`Price: ${item.price}`}</Col>
                  <Col>
                    {/* <ItemQuantityModifier
                      itemId={item.id}
                      quantity={0}
                      shape={"square"}
                    /> */}
                    <ItemQuantityModifier
                      itemId={item.id}
                      quantity={getQuantityById(item.id, cartData?.order_items)}
                      shape={"circle"}
                      // setPlusMinusButtonClickedTimes={
                      //   setPlusMinusButtonClickedTimes
                      // }
                      // plusMinusButtonClickedTimes={plusMinusButtonClickedTimes}
                      onUpdateCartSuccess={onUpdateCartSuccess}
                    />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;
