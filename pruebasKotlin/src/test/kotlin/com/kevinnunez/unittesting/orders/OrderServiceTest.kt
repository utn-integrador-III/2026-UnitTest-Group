package com.kevinnunez.unittesting.orders

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class OrderServiceTest {
    private val discountClient = mockk<DiscountClient>()
    private val service = OrderService(discountClient)

    @Test
    fun `calculates total without discount`() {
        every { discountClient.getDiscount(1) } returns 0.0

        val result = service.calculateTotal(userId = 1, prices = listOf(100.0, 50.0))

        assertEquals(150.0, result, 0.001)
    }

    @Test
    fun `calculates total with discount`() {
        every { discountClient.getDiscount(1) } returns 0.10

        val result = service.calculateTotal(userId = 1, prices = listOf(100.0, 50.0))

        assertEquals(135.0, result, 0.001)
    }

    @Test
    fun `calls discount client with user id`() {
        every { discountClient.getDiscount(5) } returns 0.20

        service.calculateTotal(userId = 5, prices = listOf(100.0))

        verify(exactly = 1) { discountClient.getDiscount(5) }
    }

    @Test
    fun `empty order raises error`() {
        assertFailsWith<IllegalArgumentException> {
            service.calculateTotal(userId = 1, prices = emptyList())
        }

        verify(exactly = 0) { discountClient.getDiscount(any()) }
    }

    @Test
    fun `invalid discount raises error`() {
        every { discountClient.getDiscount(1) } returns 1.5

        assertFailsWith<IllegalArgumentException> {
            service.calculateTotal(userId = 1, prices = listOf(100.0))
        }
    }

    @Test
    fun `default discount client returns zero`() {
        val client = DefaultDiscountClient()

        assertEquals(0.0, client.getDiscount(1))
    }
}

