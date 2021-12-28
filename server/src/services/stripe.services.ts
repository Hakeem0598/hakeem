import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2020-08-27' });

export const createCharge = async (amount: number, source: string) => {
    return stripe.charges.create({ amount, currency: 'gbp', source });
}