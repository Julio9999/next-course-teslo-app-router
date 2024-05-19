'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const {itemsInCart, subTotal, total, tax}  = useCartStore(state => state.getSummaryInformation())

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(() => true)
    }, [])

    if(!loaded) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-2">

            <span>No. Productos</span>
            <span className="text-right">{currencyFormat(itemsInCart)} artículos</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>


        </div>
    )
}