from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from main.models import Order, Cart, Product
from main.serializers import OrderSerializer, CartSerializer, ProductSerializer


# Create your views here.
@api_view(["GET"])
def list_product(request):
    products = Product.objects.all()
    return Response({"data": ProductSerializer(products, many=True).data})


@api_view(["POST"])
def post_product(request):
    if not request.user.is_active:
        return Response({"error": {"code": 403, "message": "Login failed"}})
    if not request.user.is_staff:
        return Response({"error": {"code": 403, "message": "Forbidden for you"}})
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'data': {"id": serializer.data["id"], "message": "Product added"}})
    return Response({"error": {"code": 422, "message": 'Validation error', "errors": serializer.errors}})


@api_view(["PATCH", "DELETE"])
def detail_product(request, **kwargs):
    if not request.user.is_active:
        return Response({"error": {"code": 403, "message": "Login failed"}})
    if not request.user.is_staff:
        return Response({"error": {"code": 403, "message": "Forbidden for you"}})
    try:
        product = Product.objects.get(pk=kwargs["pk"])
    except:
        return Response({"error": {"code": 404, "message": "Not found"}})
    if request.method == "DELETE":
        product.delete()
        return Response({"data": {"message": "Product removed"}})
    if request.method == "PATCH":
        serializer = ProductSerializer(data=request.data, instance=product, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data})
        return Response({"error": {"code": 422, "message": 'Validation error', "errors": serializer.errors}})


@api_view(["GET"])
def get_cart(request):
    if not request.user.is_active:
        return Response({"error": {"code": 403, "message": "Login failed"}})
    if request.user.is_staff:
        return Response({"error": {"code": 403, "message": "Forbidden for you"}})
    cart, c = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    count = 0
    data = []
    for item in serializer.data["products"]:
        count += 1
        data.append({
            "id": count,
            "product_id": item["id"],
            "name": item["name"],
            "description": item["description"],
            "price": item["price"]
        })
    return Response({"data": data})


@api_view(["POST", "DELETE"])
def detail_cart(request, **kwargs):
    if not request.user.is_active:
        return Response({"error": {"code": 403, "message": "Login failed"}})
    if request.user.is_staff:
        return Response({"error": {"code": 403, "message": "Forbidden for you"}})
    try:
        product = Product.objects.get(pk=kwargs["pk"])
    except:
        return Response({"error": {"code": 404, "message": "Not found"}})
    cart, c = Cart.objects.get_or_create(user=request.user)
    if request.method == "POST":
        cart.products.add(product)
        cart.save()
        return Response({"data": {"message": "Product add to card"}})
    if request.method == 'DELETE':
        cart.products.remove(product)
        return Response({"data": {"message": "Item removed from cart"}})


@api_view(["GET", "POST"])
def list_order(request):
    if not request.user.is_active:
        return Response({"error": {"code": 403, "message": "Login failed"}})
    if request.user.is_staff:
        return Response({"error": {"code": 403, "message": "Forbidden for you"}})
    if request.method == "GET":
        order = Order.objects.filter(user=request.user)
        return Response({"data": OrderSerializer(order, many=True).data})
    if request.method == 'POST':
        try:
            cart = Cart.objects.get(user=request.user)
        except:
            return Response({"error": {"code": 404, "message": "Cart is empty"}})
        order = Order()
        order.user = request.user
        price = 0
        for product in cart.products.all():
            price += product.price
        order.order_price = price
        order.save()
        for product in cart.products.all():
            order.products.add(product)
        order.save()
        cart.delete()
        return Response({'data': {"order_id": order.id, "message": "Order is processed"}})
