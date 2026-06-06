package com.kevinnunez.unittesting.orders

interface DiscountClient {
    fun getDiscount(userId: Int): Double
}

class DefaultDiscountClient : DiscountClient {
    override fun getDiscount(userId: Int): Double = 0.0
}

