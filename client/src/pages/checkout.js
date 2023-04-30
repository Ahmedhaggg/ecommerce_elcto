import React, { useEffect, useState } from "react";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/user/checkout/CheckoutForm";
import SectionHeader from "../components/SectionHeader";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PageLoading from "../components/PageLoading";
import { env } from "../next.config";
const stripePromise = loadStripe(env.STRIPE_KEY);

export default function checkout() {
  let router = useRouter();
  let { token } = useSelector(state => state.user);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [])

  return (
    token ? 
    <Box>
      <SectionHeader 
        text="payment"  
        paddingBottom={2} 
        color="primary.main" 
      />
      <Box>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <CheckoutForm stripe={stripe} elements={elements} />
            )}
          </ElementsConsumer>
        </Elements>
      </Box>
    </Box>
      :
    <PageLoading />
  );
};