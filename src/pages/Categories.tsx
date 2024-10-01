import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const Categories = () => {
  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Clothing", icon: "👕" },
    { name: "Home & Garden", icon: "🏡" },
    { name: "Sports & Outdoors", icon: "⚽" },
    { name: "Beauty & Personal Care", icon: "💄" },
    { name: "Books", icon: "📚" },
    { name: "Toys & Games", icon: "🎮" },
    { name: "Automotive", icon: "🚗" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Product Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <h2 className="text-2xl flex items-center justify-center mb-4">
                  <span className="mr-2 text-4xl">{category.icon}</span>
                  {category.name}
                </h2>
                <Button className="w-full">Explore {category.name}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Categories;