package com.kevinnunez.unittesting.orders

class OrderService(
    private val discountClient: DiscountClient,
) {
    fun calculateTotal(userId: Int, prices: List<Double>): Double {
        require(prices.isNotEmpty()) { "La orden no puede estar vacia" }

        val subtotal = prices.sum()
        val discount = discountClient.getDiscount(userId)

        require(discount in 0.0..1.0) { "Descuento invalido" }

        return subtotal * (1 - discount)
    }
}

