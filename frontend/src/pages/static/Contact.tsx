import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Phone } from 'lucide-react'


const Contact = () => {
  return (
    <>
    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <Input placeholder="Your Name" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" />
              </div>
              <div>
                <Input placeholder="Subject" />
              </div>
              <div>
                <Textarea placeholder="Your Message" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>support@shopnow.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>123 E-commerce St, Online City, 12345</span>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
    </>
  )
}

export default Contact