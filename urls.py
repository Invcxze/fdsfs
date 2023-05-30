from django.urls import path

from main.views import list_product, post_product, detail_product, get_cart, detail_cart, list_order
from user.views import login, signup, logout

urlpatterns = [
    path("login", login),
    path("signup", signup),
    path("logout", logout),
    path("products", list_product),
    path("product", post_product),
    path("product/<int:pk>", detail_product),
    path("cart", get_cart),
    path("cart/<int:pk>", detail_cart),
    path("order", list_order)
]