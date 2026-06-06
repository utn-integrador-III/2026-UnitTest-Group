package com.kevinnunez.unittesting.calculator

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class CalculatorTest {
    @Test
    fun `adds two numbers`() {
        assertEquals(5.0, Calculator.add(2.0, 3.0))
    }

    @Test
    fun `divides two numbers`() {
        assertEquals(5.0, Calculator.divide(10.0, 2.0))
    }

    @Test
    fun `division by zero raises error`() {
        assertFailsWith<IllegalArgumentException> {
            Calculator.divide(10.0, 0.0)
        }
    }
}

