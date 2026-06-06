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

# Autor

Michael Carranza Porras
Proyecto para el curso **Proyecto Integrador III**
Demo de Unit Testing en Python