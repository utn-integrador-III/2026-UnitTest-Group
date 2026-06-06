package com.kevinnunez.unittesting.calculator

object Calculator {
    fun add(a: Double, b: Double): Double = a + b

    fun divide(a: Double, b: Double): Double {
        require(b != 0.0) { "No se puede dividir entre cero" }
        return a / b
    }
}

