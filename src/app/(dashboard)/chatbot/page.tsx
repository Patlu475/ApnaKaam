"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { SiteHeader } from "@/components/dashboard/site-header";
import { MessageSquare, Smartphone, TrendingUp, AlertTriangle, Package, BarChart3, ShoppingCart, RefreshCw, CheckCircle } from 'lucide-react';

const Chatbot = () => {
  const exampleCommands = [
    {
      command: '/sold 2 rice',
      description: 'Record a sale of 2 units of rice',
      icon: ShoppingCart,
      response: 'Sale recorded! Rice stock updated.'
    },
    {
      command: '/status',
      description: 'Check current inventory status',
      icon: BarChart3,
      response: 'Rice: 15 units, Sugar: 8 units (low stock)'
    },
    {
      command: '/restock 5 sugar',
      description: 'Add 5 units to sugar inventory',
      icon: RefreshCw,
      response: 'Sugar restocked! Current: 13 units'
    },
    {
      command: '/alerts',
      description: 'View low stock alerts',
      icon: AlertTriangle,
      response: '⚠️ Low stock: Milk (2 units), Bread (1 unit)'
    }
  ];

  const features = [
    {
      icon: Package,
      title: 'Track Inventory',
      description: 'Monitor stock levels in real-time'
    },
    {
      icon: TrendingUp,
      title: 'Record Sales',
      description: 'Log transactions instantly'
    },
    {
      icon: AlertTriangle,
      title: 'Get Alerts',
      description: 'Receive low stock notifications'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with the inventory bot?',
      answer: 'Simply click on either the WhatsApp or Telegram button above to connect. Send "/start" to begin setting up your inventory.'
    },
    {
      question: 'What commands can I use?',
      answer: 'Common commands include /sold, /restock, /status, /alerts, and /help. Type /help anytime to see all available commands.'
    },
    {
      question: 'Can multiple people use the same bot?',
      answer: 'Yes! You can add multiple team members to use the same inventory bot. Each person can record sales and check stock.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. All your inventory data is encrypted and stored securely. We never share your business information with third parties.'
    },
    {
      question: 'What if I make a mistake in recording?',
      answer: 'No worries! Use commands like /undo or /correct to fix recent entries. You can also use /history to see recent transactions.'
    }
  ];

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <SiteHeader />

      <div className="@container/main flex flex-1 flex-col pt-2">
        {/* Title and Description */}
        <div className="flex flex-col gap-2 mb-6 px-4 lg:px-6">
          <h1 className="text-2xl font-bold">Chat Integration</h1>
          <p className="text-muted-foreground">Manage your inventory through WhatsApp and Telegram</p>
        </div>

        {/* Connection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 px-4 lg:px-6">
          <Card className="border shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.685"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">WhatsApp Integration</h3>
              <p className="text-muted-foreground mb-4">Connect your WhatsApp account to manage inventory on the go.</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Connect WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-.962 6.502-.378 1.83-.891 2.243-1.262 2.243-.292 0-.596-.094-.89-.334l-1.093-.8-.569-.714c-.238-.283-.414-.66-.428-1.1-.014-.44.202-.824.535-1.09l2.884-2.264c.453-.377.573-.583.474-.651-.123-.085-.372.044-.651.26l-3.566 2.205-.908-.455s-.447-.285-.447-.679c0-.394.463-.679.926-.849l3.978-1.322z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Telegram Integration</h3>
              <p className="text-muted-foreground mb-4">Use Telegram to manage your inventory with simple commands.</p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Connect Telegram
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Commands */}
          <h2 className="text-xl font-semibold mb-4">Example Commands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {exampleCommands.map((cmd, index) => (
              <Card key={index} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <cmd.icon className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {cmd.command}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-2">{cmd.description}</p>
                  <div className="bg-muted/50 rounded-md p-2 border-l-2 border-green-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">{cmd.response}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Accordion */}
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Card className="border shadow-sm mb-8">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-6">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Streamline Your Inventory?</h3>
              <p className="text-blue-100 mb-4">Start managing your stock with simple chat commands today</p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Smartphone className="w-4 h-4 mr-2" />
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
