package com.kevinnunez.unittesting

import java.io.ByteArrayOutputStream
import java.io.PrintStream
import kotlin.test.Test
import kotlin.test.assertTrue

class MainTest {
    @Test
    fun `runs command line demo and prints expected output`() {
        val originalOut = System.out
        val output = ByteArrayOutputStream()

        try {
            System.setOut(PrintStream(output))
            main()
        } finally {
            System.setOut(originalOut)
        }

        val printedText = output.toString()
        assertTrue(printedText.contains("Suma: 5.0"))
        assertTrue(printedText.contains("Division: 5.0"))
        assertTrue(printedText.contains("Total sin descuento: 150.0"))
    }
}

