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