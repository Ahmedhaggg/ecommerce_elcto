import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'
export default function CardSection() {
  return (
    <CardElement
              className="StripeElement"
              options={{
                style: {
                  base: {
                    color: '#222222',
                    fontFamily: 'Arial, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#aab7c4',
                    }
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
              }}
          />
  )
}
