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
const { Option } = Select;

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);

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
          return <Option value={item.id}>{item.name}</Option>;
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
                    <ItemQuantityModifier
                      itemId={item.id}
                      quantity={0}
                      shape={"square"}
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
