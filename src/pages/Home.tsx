import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CreditCard, ShoppingCart, Truck } from "lucide-react"

const Home= () => (
  <div>
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to ShopNow
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover amazing products at unbeatable prices. Start shopping now and transform your lifestyle!
            </p>
          </div>
          <div className="space-x-4">
            <Button>Shop Now</Button>
            <Button className="bg-white text-blue-500 border border-blue-500 hover:bg-blue-50">Learn More</Button>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((product) => (
            <Card key={product}>
              <img
                src={`https://via.placeholder.com/200x200?text=Product ${product}`}
                alt={`Product ${product}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">Product {product}</h3>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold">$99.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card>
            <div className="p-6">
              <Truck className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p>Enjoy free shipping on all orders over $50. Fast and reliable delivery to your doorstep.</p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <CreditCard className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p>Shop with confidence using our secure and encrypted payment systems.</p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ShoppingCart className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p>Our customer support team is always ready to assist you with any questions or concerns.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Shopping Today</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Join thousands of satisfied customers and experience the best in online shopping.
            </p>
          </div>
          <Button className="inline-flex items-center">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  </div>
)
export default Home