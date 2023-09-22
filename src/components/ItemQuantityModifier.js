import { Space, Button, message, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { addItemToCart } from "../utils";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

export const ItemQuantityModifier = (props) => {
  const {
    // plusMinusButtonClickedTimes,
    // setPlusMinusButtonClickedTimes,
    onUpdateCartSuccess,
  } = props;
  const [quantity, setQuantity] = useState(props.quantity);
  // useEffect(() => {
  //     setLoadingRest(true);

  //   }, []);
  const AddToCartButton = ({ itemId, quantity, icon, shape }) => {
    const [loading, setLoading] = useState(false);
    const AddToCart = () => {
      // setPlusMinusButtonClickedTimes(plusMinusButtonClickedTimes + 1);
      setLoading(true);
      console.log("FoodList.js add item" + itemId + "with quantity" + quantity);
      addItemToCart(itemId, quantity)
        .then(() => {
          message.success(
            `Successfully ${quantity === 0 ? "deleted" : "added"} item`
          );
          // setLoading(false);
          setQuantity(props.quantity);
          onUpdateCartSuccess();
        })
        .catch((err) => {
          message.error(err.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return (
      <Tooltip title="Add to shopping cart">
        <Button
          loading={loading}
          type="primary"
          shape={shape}
          icon={icon}
          onClick={AddToCart}
        />
      </Tooltip>
    );
  };
  // console.log(props.quantity);
  return (
    <Space>
      {props.quantity <= 0 ? (
        <Button
          type="primary"
          disabled
          shape={props.shape}
          icon={<MinusOutlined />}
        />
      ) : (
        <AddToCartButton
          itemId={props.itemId}
          quantity={props.quantity - 1}
          icon={props.quantity === 1 ? <DeleteOutlined /> : <MinusOutlined />}
          shape={props.shape}
        />
      )}
      {/* {curQuantity(item.quantity)} */}
      {/* {quantity} */}
      {props.quantity}
      {/* <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  size="auto"
                /> */}
      <AddToCartButton
        itemId={props.itemId}
        quantity={props.quantity + 1}
        icon={<PlusOutlined />}
        shape={props.shape}
      />
    </Space>
  );
};
