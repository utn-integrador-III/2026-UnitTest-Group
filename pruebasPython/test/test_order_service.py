import pytest
from unittest.mock import Mock
from app.order_service import OrderService


def test_calculate_total_without_discount():
    discount_client = Mock()
    discount_client.get_discount.return_value = 0.0

    service = OrderService(discount_client)

    total = service.calculate_total(user_id=1, prices=[100, 50])

    assert total == 150


def test_calculate_total_with_discount():
    discount_client = Mock()
    discount_client.get_discount.return_value = 0.10

    service = OrderService(discount_client)

    total = service.calculate_total(user_id=1, prices=[100, 50])

    assert total == 135


def test_calculate_total_calls_discount_client():
    discount_client = Mock()
    discount_client.get_discount.return_value = 0.20

    service = OrderService(discount_client)

    service.calculate_total(user_id=5, prices=[100])

    discount_client.get_discount.assert_called_once_with(5)

def test_discount_client_default_returns_zero():
    from app.order_service import DiscountClient

    client = DiscountClient()

    assert client.get_discount(user_id=1) == 0.0


def test_empty_order_raises_error():
    discount_client = Mock()
    service = OrderService(discount_client)

    with pytest.raises(ValueError):
        service.calculate_total(user_id=1, prices=[])


def test_invalid_discount_raises_error():
    discount_client = Mock()
    discount_client.get_discount.return_value = 1.5

    service = OrderService(discount_client)

    with pytest.raises(ValueError):
        service.calculate_total(user_id=1, prices=[100])