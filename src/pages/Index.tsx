import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Яблочный пирог",
    description: "Нежный пирог с сочными яблоками и корицей",
    price: 850,
    image: "/img/e949ee46-b576-4ffe-8d3a-b02b7b3574d7.jpg",
    category: "Сладкие пироги",
    isPopular: true
  },
  {
    id: 2,
    name: "Пирожки с мясом",
    description: "Традиционные пирожки с сочной говяжьей начинкой",
    price: 120,
    image: "/img/4e4bb5e8-1704-414b-aeac-2e1a1c9629ba.jpg",
    category: "Пирожки",
    isPopular: true
  },
  {
    id: 3,
    name: "Вишневый пирог",
    description: "Ароматный пирог с кисло-сладкой вишней",
    price: 750,
    image: "/img/e949ee46-b576-4ffe-8d3a-b02b7b3574d7.jpg",
    category: "Сладкие пироги"
  },
  {
    id: 4,
    name: "Пирожки с капустой",
    description: "Пышные пирожки с тушеной капустой",
    price: 90,
    image: "/img/4e4bb5e8-1704-414b-aeac-2e1a1c9629ba.jpg",
    category: "Пирожки"
  }
];

const reviews = [
  {
    id: 1,
    name: "Мария Петрова",
    rating: 5,
    text: "Лучшие пироги в городе! Заказываем регулярно к семейным праздникам.",
    date: "15 января 2024"
  },
  {
    id: 2,
    name: "Андрей Волков",
    rating: 5,
    text: "Отличное качество, всегда свежие и очень вкусные. Рекомендую!",
    date: "8 января 2024"
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [cart, setCart] = useState<{id: number, quantity: number, date?: Date}[]>([]);
  const [orderDate, setOrderDate] = useState<Date>();
  const [showCart, setShowCart] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const categories = ['Все', 'Сладкие пироги', 'Пирожки'];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? {...item, quantity: item.quantity + 1, date: orderDate}
            : item
        );
      }
      return [...prev, {id: productId, quantity: 1, date: orderDate}];
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Cookie" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Домашняя Пекарня</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowCart(!showCart)}
            className="relative"
          >
            <Icon name="ShoppingCart" size={20} />
            {getCartItemsCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {getCartItemsCount()}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Свежая выпечка<br />с доставкой на дом
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Готовим пироги и пирожки по домашним рецептам. Принимаем заказы к определенной дате.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Icon name="ChefHat" size={20} className="mr-2" />
              Посмотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Icon name="Phone" size={20} className="mr-2" />
              Позвонить нам
            </Button>
          </div>
        </div>
      </section>

      {/* Order Date Section */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Выберите дату доставки</h3>
          <p className="text-muted-foreground mb-6">Мы готовим заказы к нужному вам времени</p>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <Icon name="Calendar" className="mr-2 h-4 w-4" />
                {orderDate ? format(orderDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={orderDate}
                onSelect={setOrderDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Наш каталог</h3>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isPopular && (
                    <Badge className="absolute top-2 left-2">Популярное</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                  <Button onClick={() => addToCart(product.id)} size="sm">
                    <Icon name="Plus" size={16} className="mr-1" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowCart(false)}>
          <div className="fixed right-0 top-0 h-full w-96 bg-background p-6 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">Корзина</h4>
              <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Корзина пуста</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    return product ? (
                      <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <h5 className="font-medium">{product.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × {product.price} ₽
                          </p>
                          {item.date && (
                            <p className="text-xs text-muted-foreground">
                              К {format(item.date, "d MMMM", { locale: ru })}
                            </p>
                          )}
                        </div>
                        <span className="font-bold">{product.price * item.quantity} ₽</span>
                      </div>
                    ) : null;
                  })}
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-right mb-6">
                  <span className="text-xl font-bold">Итого: {getCartTotal()} ₽</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input 
                      id="name"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Input 
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comment">Комментарий</Label>
                    <Textarea 
                      id="comment"
                      value={orderForm.comment}
                      onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                      placeholder="Особые пожелания к заказу"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">О нашей пекарне</h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Мы семейная пекарня с 15-летним опытом. Готовим по бабушкиным рецептам 
              из натуральных продуктов без консервантов и улучшителей.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Icon name="Heart" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-bold mb-2">С любовью</h4>
                <p className="text-muted-foreground">Каждый пирог готовится с душой</p>
              </div>
              <div className="text-center">
                <Icon name="Clock" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-bold mb-2">Всегда свежее</h4>
                <p className="text-muted-foreground">Выпекаем ежедневно к заказу</p>
              </div>
              <div className="text-center">
                <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-bold mb-2">Доставка</h4>
                <p className="text-muted-foreground">Привезем точно в срок</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Условия доставки</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="MapPin" size={24} className="mr-2 text-primary" />
                  Зоны доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Центр города — бесплатно</li>
                  <li>• Ближние районы — 200 ₽</li>
                  <li>• Дальние районы — 400 ₽</li>
                  <li>• За МКАД — договорная</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Clock" size={24} className="mr-2 text-primary" />
                  Время работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Ежедневно с 8:00 до 22:00</li>
                  <li>• Заказы принимаем до 21:00</li>
                  <li>• Доставка к определенному времени</li>
                  <li>• Предзаказ за 1-3 дня</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Отзывы наших клиентов</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.date}</CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">Контакты</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Icon name="Phone" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="font-bold mb-2">Телефон</h4>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
            </div>
            <div className="text-center">
              <Icon name="Mail" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="font-bold mb-2">Email</h4>
              <p className="text-muted-foreground">order@bakery.ru</p>
            </div>
            <div className="text-center">
              <Icon name="MapPin" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="font-bold mb-2">Адрес</h4>
              <p className="text-muted-foreground">ул. Пекарская, 15</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Cookie" size={24} />
            <span className="text-xl font-bold">Домашняя Пекарня</span>
          </div>
          <p className="text-primary-foreground/80">
            © 2024 Домашняя Пекарня. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}