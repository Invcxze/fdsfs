from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from main.models import Product, Cart, Order
from .permissions import IsClient
from .serializers import ProductSerializer, CartSerializer, OrderSerializer


# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def ProductsViewDef(request):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many=True)
    return Response({'data': serializer.data}, status=200)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def ProductAddView(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        data = serializer.data
        return Response({'data': {"id": data["id"], "message": "Product added succesffuly"}}, status=201)
    return Response({"error":
                         {"code": 422,
                          "message": "Validation error",
                          "errors": serializer.errors}})


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAdminUser])
def ProductChangeDeleteDef(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except:
        return Response({"error": {"code": 404, "message": "Not Found"}}, status=404)
    if request.method == "GET":
        serializer = ProductSerializer(product)
        return Response({"data": serializer.data}, status=200)
    elif request.method == "PATCH":
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=200)
        return Response({"error":
                             {"code": 422,
                              "message": "Validation error",
                              "errors": serializer.errors}})
    elif request.method == "DELETE":
        product.delete()
        return Response({"data": {"message": "product deleted"}}, status=200)


@api_view(["GET"])
@permission_classes([IsClient])
def CartView(request):
    cart = Cart.objects.filter(user=request.user)
    serializer = CartSerializer(cart, many=True)
    data = serializer.data
    return Response(data, status=200)


@api_view(["POST", "DELETE"])
@permission_classes([IsClient])
def AddCartView(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": {"code": 404, "message": "Не найдено"}}, status=404)
    if request.method == "POST":
        cart, c = Cart.objects.get_or_create(user=request.user)
        cart.products.add(product)
        serializer = CartSerializer(cart)
        return Response({"body": {"message": "Product add to cart"}}, status=200)
    elif request.method == "DELETE":
        cart = Cart.objects.get(user=request.user)
        cart.products.remove(product)
        return Response({"data": {"message": "Item removed from cart"}}, status=200)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def GetCreateOrderView(request):
    if request.method == "GET":
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": {"code": 422, "message": "Cart is empty"}}, status=422)
        order, _ = Order.objects.get_or_create(user=request.user)
        total = 0
        for product in cart.products.all():
            total += product.price
            order.products.add(product)
        order.order_price = total
        order.save()
        cart.delete()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=HTTP_200_OK)
