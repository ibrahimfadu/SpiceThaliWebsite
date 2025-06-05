import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitContactMutation = useMutation({
    mutationFn: async (contactData: ContactFormData) => {
      return apiRequest("POST", "/api/contact", contactData);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-brown dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-warm-gray dark:text-gray-300">
            Get in touch with us for reservations, catering, or any questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="font-playfair text-2xl font-bold text-deep-brown dark:text-white mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="bg-saffron text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-deep-brown dark:text-white mb-1">Address</h3>
                  <p className="text-warm-gray dark:text-gray-300">
                    123 Spice Street, Food District<br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-saffron text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-deep-brown dark:text-white mb-1">Phone</h3>
                  <p className="text-warm-gray dark:text-gray-300">
                    +91 98765 43210<br />
                    +91 98765 43211
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-saffron text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-deep-brown dark:text-white mb-1">Email</h3>
                  <p className="text-warm-gray dark:text-gray-300">
                    info@spicethali.com<br />
                    orders@spicethali.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-saffron text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-deep-brown dark:text-white mb-1">Hours</h3>
                  <p className="text-warm-gray dark:text-gray-300">
                    Mon-Thu: 11:00 AM - 10:00 PM<br />
                    Fri-Sat: 11:00 AM - 11:00 PM<br />
                    Sunday: 12:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-deep-brown dark:text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-saffron text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-curry transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-saffron text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-curry transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-saffron text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-curry transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-saffron text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-curry transition-colors duration-200"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-stone-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-deep-brown dark:text-white">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleInputChange("subject", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reservation">Table Reservation</SelectItem>
                        <SelectItem value="catering">Catering Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-saffron text-white hover:bg-curry"
                    disabled={submitContactMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {submitContactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
