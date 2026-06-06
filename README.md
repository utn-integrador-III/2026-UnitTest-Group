# UnitTest-Group
UnitTest-React-Python-Kotlin

# Unit Testing Demo en Kotlin

Este proyecto es una demostracion practica de como implementar **unit testing en Kotlin** usando:

- Kotlin/JVM
- JUnit 5
- MockK para mocks
- JaCoCo para cobertura de codigo
- Gradle Wrapper para ejecutar sin instalar Gradle manualmente

Autor: Kevin Nunez

---

# Estructura del proyecto Kotlin

```
pruebasKotlin/
├── build.gradle.kts
├── settings.gradle.kts
├── gradlew
├── gradlew.bat
└── src/
    ├── main/kotlin/com/kevinnunez/unittesting/
    │   ├── Main.kt
    │   ├── calculator/Calculator.kt
    │   └── orders/
    │       ├── DiscountClient.kt
    │       └── OrderService.kt
    └── test/kotlin/com/kevinnunez/unittesting/
        ├── MainTest.kt
        ├── calculator/CalculatorTest.kt
        └── orders/OrderServiceTest.kt
```

---

# Instalacion Kotlin

No es necesario instalar Gradle porque el proyecto incluye Gradle Wrapper.

Solo se necesita Java 17 o superior.

Entrar a la carpeta:

```bash
cd pruebasKotlin
```

---

# Codigo del proyecto Kotlin

## Calculator.kt

```kotlin
object Calculator {
    fun add(a: Double, b: Double): Double = a + b

    fun divide(a: Double, b: Double): Double {
        require(b != 0.0) { "No se puede dividir entre cero" }
        return a / b
    }
}
```

---

## OrderService.kt

```kotlin
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
```

---

# Pruebas unitarias en Kotlin

## CalculatorTest.kt

```kotlin
@Test
fun `adds two numbers`() {
    assertEquals(5.0, Calculator.add(2.0, 3.0))
}

@Test
fun `division by zero raises error`() {
    assertFailsWith<IllegalArgumentException> {
        Calculator.divide(10.0, 0.0)
    }
}
```

---

## OrderServiceTest.kt

En estas pruebas se usa MockK para simular `DiscountClient`.

```kotlin
private val discountClient = mockk<DiscountClient>()
private val service = OrderService(discountClient)

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
```

---

# Las pruebas del proyecto Kotlin

| # | Prueba | Que verifica |
|---|--------|--------------|
| 1 | `adds two numbers` | Suma dos numeros correctamente |
| 2 | `divides two numbers` | Divide dos numeros correctamente |
| 3 | `division by zero raises error` | Lanza error si se divide entre cero |
| 4 | `calculates total without discount` | Calcula una orden sin descuento |
| 5 | `calculates total with discount` | Aplica un descuento simulado con MockK |
| 6 | `calls discount client with user id` | Verifica que el mock fue llamado con el usuario correcto |
| 7 | `empty order raises error` | Lanza error si la orden esta vacia |
| 8 | `invalid discount raises error` | Lanza error si el descuento es invalido |
| 9 | `default discount client returns zero` | Valida el cliente de descuento por defecto |
| 10 | `runs command line demo and prints expected output` | Ejecuta el demo principal y revisa la salida |

---

# Ejecutar pruebas Kotlin

En Windows:

```bash
cd pruebasKotlin
.\gradlew.bat test
```

En Mac/Linux:

```bash
cd pruebasKotlin
./gradlew test
```

Resultado esperado:

```
10 tests, 0 failures, 0 errors
```

Resultado validado localmente:

```
Tests: 10, Failures: 0, Errors: 0
Instruction coverage: 99.32%
```

---

# Cobertura de codigo Kotlin

Generar reporte de cobertura:

```bash
.\gradlew.bat jacocoTestReport
```

Verificar cobertura minima del 80%:

```bash
.\gradlew.bat jacocoTestCoverageVerification
```

Ejecutar todo junto:

```bash
.\gradlew.bat clean check
```

El reporte HTML queda en:

```
pruebasKotlin/build/reports/jacoco/test/html/index.html
```

---

# Conceptos clave en Kotlin

- `@Test`: marca una funcion como prueba unitaria.
- `assertEquals`: compara el resultado esperado contra el resultado real.
- `assertFailsWith`: valida que una operacion lance una excepcion.
- `mockk`: crea una dependencia simulada.
- `every { ... } returns ...`: define el comportamiento del mock.
- `verify`: confirma que el mock fue llamado como se esperaba.
- JaCoCo: mide que porcentaje del codigo fue probado.

---

# Utilidad del codigo Kotlin

Podemos:

1. Ejecutar pruebas unitarias con JUnit 5.
2. Simular dependencias externas con MockK.
3. Verificar errores esperados.
4. Medir cobertura de codigo con JaCoCo.
5. Comparar el ejemplo de Kotlin con los demos de React y Python.

---

# Demo de Pruebas Unitarias en React 🚀

Demo sencilla para aprender pruebas unitarias (unit testing), simulaciones (mocking) y cobertura de código (code coverage) en React.

## 🛠️ Stack Tecnológico
- **React + Vite** — Framework y servidor de desarrollo
- **Vitest** — Ejecutor de pruebas (similar a Jest, pero más rápido)
- **React Testing Library** — Pruebas de componentes desde la perspectiva del usuario
- **jsdom** — Simula el navegador dentro de Node.js para las pruebas
- **@vitest/coverage-v8** — Reporte de cobertura de código

---

## 🏛️ Estructura del Proyecto (Muy Simple)

```
src/
├── App.jsx                 # Componente principal: muestra el dashboard de usuarios
├── App.test.jsx            # 4 pruebas del componente App
├── services/
│   ├── userService.js      # Lógica de API: obtiene usuarios de internet
│   └── userService.test.js # 2 pruebas unitarias del servicio
└── setupTests.js           # Configuración de pruebas
```

---

## 🎓 Conceptos Clave para la Clase

### ¿Qué es un Mock (Simulación)?
En las pruebas no queremos llamar a internet de verdad porque:
- La red puede estar caída.
- Sería lento y poco confiable.
- No podemos forzar fácilmente un error de servidor.

Un **Mock** reemplaza la llamada real con una respuesta inventada y controlada.

### Ejemplo de Mock — Servicio de API
En [userService.test.js](file:///c:/Users/Frank/Desktop/2026-UnitTest-Group/pruebasReact/src/services/userService.test.js) simulamos el `fetch` global del navegador:
```javascript
vi.stubGlobal('fetch', vi.fn());

fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => [{ id: 1, name: 'Alice' }]
});
```

### Ejemplo de Mock — Componente
En [App.test.jsx](file:///c:/Users/Frank/Desktop/2026-UnitTest-Group/pruebasReact/src/App.test.jsx) simulamos el módulo del servicio completo:
```javascript
vi.mock('./services/userService', () => ({
  userService: { getUsers: vi.fn() }
}));
```

---

## 📋 Las 6 Pruebas del Proyecto

### Archivo: `userService.test.js`
| # | Prueba | Qué verifica |
|---|--------|-------------|
| 1 | Éxito al obtener usuarios | `fetch` fue llamado con la URL correcta y devuelve los datos |
| 2 | Error cuando la API falla | Se lanza una excepción si `ok: false` |

### Archivo: `App.test.jsx`
| # | Prueba | Qué verifica |
|---|--------|-------------|
| 3 | Estado de carga y lista de usuarios | Muestra el spinner, luego los nombres de los usuarios |
| 4 | Filtro por nombre | Al escribir "Bob" desaparece "Alice" y queda solo "Bob" |
| 5 | Expandir y ocultar detalles | Clic muestra el email; otro clic lo oculta |
| 6 | Error y reintento | Muestra el banner de error y al reintentar carga los usuarios |

---

## 💻 Comandos para el Demo

Abre una terminal en la carpeta `pruebasReact`:

```bash
# Ver la app en el navegador
npm run dev

# Ejecutar las pruebas
npm run test

# Ver la cobertura de código
npm run coverage
```

Abre **[http://localhost:5173](http://localhost:5173)** en tu navegador.



# Unit Testing Demo en Python

Este proyecto es una demostración práctica de cómo implementar **unit testing en Python** usando:

- pytest
- unittest.mock (mocks)
- pytest-cov (cobertura de código)

---

# Estructura del proyecto

```
pruebasPython/
├── app/
│   ├── __init__.py
│   ├── calculator.py
│   └── order_service.py
├── test/
│   ├── test_calculator.py
│   └── test_order_service.py
├── venv/
├── requirements.txt
└── README.md
```

---

# Instalación

## 1. Crear entorno virtual

```bash
python -m venv venv
```

Activar:

**Windows**
```bash
venv\Scripts\activate
```

**Mac/Linux**
```bash
source venv/bin/activate
```

---

## 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

Contenido de requirements.txt:

```
pytest
pytest-cov
```

---

# Código del proyecto

## calculator.py

```python
def add(a: float, b: float) -> float:
    return a + b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("No se puede dividir entre cero")
    return a / b
```

---

## order_service.py

```python
class DiscountClient:
    def get_discount(self, user_id: int) -> float:
        return 0.0

class OrderService:
    def __init__(self, discount_client: DiscountClient):
        self.discount_client = discount_client

    def calculate_total(self, user_id: int, prices: list[float]) -> float:
        if not prices:
            raise ValueError("La orden no puede estar vacía")

        subtotal = sum(prices)
        discount = self.discount_client.get_discount(user_id)

        if discount < 0 or discount > 1:
            raise ValueError("Descuento inválido")

        return subtotal * (1 - discount)
```

---

# Pruebas unitarias

## test_calculator.py

```python
import pytest
from app.calculator import add, divide

def test_add_two_numbers():
    assert add(2, 3) == 5

def test_divide_two_numbers():
    assert divide(10, 2) == 5

def test_divide_by_zero_raises_error():
    with pytest.raises(ValueError):
        divide(10, 0)
```

---

## test_order_service.py

```python
import pytest
from unittest.mock import Mock
from app.order_service import OrderService, DiscountClient

def test_calculate_total_without_discount():
    discount_client = Mock()
    discount_client.get_discount.return_value = 0.0

    service = OrderService(discount_client)

    assert service.calculate_total(1, [100, 50]) == 150

def test_calculate_total_with_discount():
    discount_client = Mock()
    discount_client.get_discount.return_value = 0.10

    service = OrderService(discount_client)

    assert service.calculate_total(1, [100, 50]) == 135

def test_calculate_total_calls_discount_client():
    discount_client = Mock()
    discount_client.get_discount.return_value = 0.20

    service = OrderService(discount_client)

    service.calculate_total(5, [100])

    discount_client.get_discount.assert_called_once_with(5)

def test_empty_order_raises_error():
    service = OrderService(Mock())

    with pytest.raises(ValueError):
        service.calculate_total(1, [])

def test_invalid_discount_raises_error():
    discount_client = Mock()
    discount_client.get_discount.return_value = 1.5

    service = OrderService(discount_client)

    with pytest.raises(ValueError):
        service.calculate_total(1, [100])

def test_discount_client_default_returns_zero():
    client = DiscountClient()
    assert client.get_discount(1) == 0.0
```

---

# Ejecutar pruebas

```bash
python -m pytest
```

Resultado esperado:

```
9 passed
```

---

# Cobertura de código

```bash
python -m pytest --cov=app --cov-report=term-missing
```

Ejemplo:

```
Name                    Stmts   Miss  Cover
-------------------------------------------
app/calculator.py          6      0   100%
app/order_service.py      14      0   100%
-------------------------------------------
TOTAL                     20      0   100%
```

---

# Reporte visual

```bash
python -m pytest --cov=app --cov-report=html
```

Abrir:

```
htmlcov/index.html
```

---

# Conceptos clave

- Unit Testing: prueba de una unidad de código aislada
- pytest: framework de testing
- assert: valida resultados esperados
- pytest.raises: valida errores
- Mock: simula dependencias externas
- Coverage: mide qué tanto código está probado

---

# Buenas prácticas

- Probar casos normales y errores
- Usar mocks para dependencias externas
- Mantener tests simples
- Buscar alta cobertura (80%+)

---

# Utilidad del código

Podemos:

1. Ejecutar tests
2. Romper código → ver fallo
3. Arreglar → tests pasan
4. Mostrar coverage

---
