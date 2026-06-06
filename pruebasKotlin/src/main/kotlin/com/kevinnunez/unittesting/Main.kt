package com.kevinnunez.unittesting

import com.kevinnunez.unittesting.calculator.Calculator
import com.kevinnunez.unittesting.orders.DefaultDiscountClient
import com.kevinnunez.unittesting.orders.OrderService

fun main() {
    val service = OrderService(DefaultDiscountClient())

    println("Suma: ${Calculator.add(2.0, 3.0)}")
    println("Division: ${Calculator.divide(10.0, 2.0)}")
    println("Total sin descuento: ${service.calculateTotal(userId = 1, prices = listOf(100.0, 50.0))}")
}

