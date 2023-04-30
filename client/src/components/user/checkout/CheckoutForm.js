import { useState } from "react";
import { Alert, Box } from "@mui/material";
import {
  CardElement
} from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton"
import CardSection from "./CardSection";
import { useCreateOrderMutation } from "../../../store/user/orderSlice";
import { deleteCart } from "../../../store/user/cart";
import { errorFormat } from "../../../helpers/errorFormat";
import PreviewSuccessMessage from "../../SuccessMessagePreview"
import useSuccess from "../../../customHooks/useSuccess";
import Input from "../../admin/Input";

const CheckoutForm = ({ stripe, elements }) => {
  let [ paymentError, setPaymentError ] = useState(null);
  let dispatch = useDispatch();
  let cart = useSelector(state => state.cart);
  let [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
  let [createOrder, { isSuccess, error } ] = useCreateOrderMutation();
  let { control, formState: { errors }, handleSubmit } = useForm();

  const handlePaymentError = (error) => {
    setDisabledSubmitButton(false);
    setPaymentError(error.message);
    return true;
  }
  
  const handleCreateOrder = (checkoutData) => {
    let cartProducts = cart.items.map(cartProduct => ({
      id: cartProduct._id,
      quantity: cartProduct.quantity
    }));

    createOrder({ ...checkoutData, products: cartProducts })
  }

  const submitHandler = async (values) => {
    setDisabledSubmitButton(true)
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    
    if (paymentMethod) {
      const cardElement = elements.getElement(CardElement);
      let token  = await stripe.createToken(cardElement);

      return handleCreateOrder({ paymentToken : token.token.id, ...values}) 
    }

    handlePaymentError(error);
  };
  
  const useSuccessFn = () => {
    setDisabledSubmitButton(false) 
    dispatch(deleteCart())
  }

  // handlers submit failed and success
  let { message } = error ? errorFormat(error.data) : {};
  let showSuccessMessage = useSuccess(isSuccess, "/orders", useSuccessFn);

  let checkoutAmount = cart.totalPrice + (cart.totalPrice * .15);
  return (
      <form onSubmit={handleSubmit(submitHandler)}>
        <Input
          control={control}
          type="text"
          name="location"
          error={errors.location}
          rules={{ required: true }}
        />
        <Box marginBottom={3}>
          <CardSection />
        </Box>
        { message ? <Alert severity="error" sx={{ marginBottom: 2 }}>{message}</Alert> : null }
        { paymentError ? <Alert severity="error" sx={{ marginBottom: 2 }}>{paymentError}</Alert> : null }
        <CustomButton  text={"payment " + checkoutAmount + "$"}  disabled={disabledSubmitButton} />
        { showSuccessMessage && <PreviewSuccessMessage message="order is created successfully" /> }
      </form>
  )
}

export default CheckoutForm;

