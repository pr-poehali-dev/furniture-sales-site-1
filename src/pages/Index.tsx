import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  style: string;
  material: string;
  size: string;
  inStock: boolean;
  description?: string;
  features?: string[];
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('catalog');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Диван Скандинавия',
      price: 89990,
      image: 'https://cdn.poehali.dev/projects/61710c2f-9d9d-4b26-b40a-04c39743b370/files/bd870107-c33f-4121-9086-5608246b1e84.jpg',
      category: 'Гостиная',
      style: 'Скандинавский',
      material: 'Ткань',
      size: '220x90x85',
      inStock: true,
      description: 'Современный диван в скандинавском стиле с удобными подушками и прочным каркасом. Идеально подходит для создания уютной атмосферы в гостиной.',
      features: ['Съемные чехлы', 'Ортопедический матрас', 'Экологичные материалы', 'Гарантия 2 года'],
    },
    {
      id: 2,
      name: 'Обеденная группа Элегант',
      price: 124990,
      image: 'https://cdn.poehali.dev/projects/61710c2f-9d9d-4b26-b40a-04c39743b370/files/f6c4ea6b-2c02-449d-8782-e65ffe01040f.jpg',
      category: 'Столовая',
      style: 'Современный',
      material: 'Дерево',
      size: '180x90x75',
      inStock: true,
      description: 'Элегантная обеденная группа из массива дуба. Стол и 6 стульев в комплекте. Надежная конструкция прослужит долгие годы.',
      features: ['Массив дуба', '6 стульев в комплекте', 'Защитное покрытие', 'Раздвижной механизм'],
    },
    {
      id: 3,
      name: 'Кровать Комфорт',
      price: 64990,
      image: 'https://cdn.poehali.dev/projects/61710c2f-9d9d-4b26-b40a-04c39743b370/files/16f09e5f-90e1-4bba-a534-af2bf8763e08.jpg',
      category: 'Спальня',
      style: 'Минимализм',
      material: 'ЛДСП',
      size: '200x160x100',
      inStock: true,
      description: 'Удобная двуспальная кровать с мягким изголовьем. Просторное спальное место и стильный дизайн для современной спальни.',
      features: ['Мягкое изголовье', 'Ортопедическое основание', 'Ящики для хранения', 'Простая сборка'],
    },
  ];

  const styles = ['Скандинавский', 'Современный', 'Минимализм', 'Классический', 'Лофт'];
  const materials = ['Ткань', 'Дерево', 'ЛДСП', 'Кожа', 'Металл'];

  const toggleFilter = (value: string, type: 'style' | 'material') => {
    if (type === 'style') {
      setSelectedStyles(prev =>
        prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
      );
    } else {
      setSelectedMaterials(prev =>
        prev.includes(value) ? prev.filter(m => m !== value) : [...prev, value]
      );
    }
  };

  const filteredProducts = products.filter(product => {
    const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(product.style);
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return styleMatch && materialMatch && priceMatch;
  });

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const sections = {
    catalog: (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 space-y-6">
              <Card className="p-6 animate-fade-in">
                <h3 className="font-heading font-bold text-xl mb-4 text-foreground">Фильтры</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Стиль</h4>
                    <div className="flex flex-wrap gap-2">
                      {styles.map(style => (
                        <Badge
                          key={style}
                          variant={selectedStyles.includes(style) ? 'default' : 'outline'}
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => toggleFilter(style, 'style')}
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Материал</h4>
                    <div className="flex flex-wrap gap-2">
                      {materials.map(material => (
                        <Badge
                          key={material}
                          variant={selectedMaterials.includes(material) ? 'default' : 'outline'}
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => toggleFilter(material, 'material')}
                        >
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200000}
                      step={5000}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedStyles([]);
                      setSelectedMaterials([]);
                      setPriceRange([0, 200000]);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              </Card>
            </aside>

            <main className="flex-1">
              <div className="mb-8 animate-slide-up">
                <h1 className="font-heading font-bold text-5xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Каталог мебели
                </h1>
                <p className="text-muted-foreground text-lg">
                  Найдено товаров: {filteredProducts.length}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className="relative overflow-hidden aspect-[4/3]"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDialogOpen(true);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-secondary">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button variant="secondary" size="sm">
                            <Icon name="Eye" className="w-4 h-4 mr-2" />
                            Быстрый просмотр
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-xl mb-2 text-foreground">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{product.style}</Badge>
                        <Badge variant="outline">{product.material}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        <Icon name="Ruler" className="inline w-4 h-4 mr-1" />
                        {product.size} см
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-2xl text-primary">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <Button
                          onClick={addToCart}
                          className="group-hover:scale-105 transition-transform"
                        >
                          <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">{selectedProduct?.name}</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="flex gap-2">
                    <Badge variant="default" className="text-sm px-3 py-1">
                      {selectedProduct.category}
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {selectedProduct.style}
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {selectedProduct.material}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading font-bold text-3xl text-primary">
                        {selectedProduct.price.toLocaleString()} ₽
                      </span>
                      {selectedProduct.inStock && (
                        <Badge variant="default" className="bg-green-500">
                          <Icon name="Check" className="w-4 h-4 mr-1" />
                          В наличии
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Ruler" className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Размеры:</span>
                        <span className="text-muted-foreground">{selectedProduct.size} см</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Package" className="w-5 h-5 text-secondary" />
                        <span className="font-semibold">Материал:</span>
                        <span className="text-muted-foreground">{selectedProduct.material}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Palette" className="w-5 h-5 text-accent" />
                        <span className="font-semibold">Стиль:</span>
                        <span className="text-muted-foreground">{selectedProduct.style}</span>
                      </div>
                    </div>

                    {selectedProduct.features && (
                      <div className="mb-6">
                        <h4 className="font-heading font-semibold text-lg mb-3">Особенности:</h4>
                        <ul className="space-y-2">
                          {selectedProduct.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="CheckCircle" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1" 
                        size="lg"
                        onClick={() => {
                          addToCart();
                          setIsDialogOpen(false);
                        }}
                      >
                        <Icon name="ShoppingCart" className="w-5 h-5 mr-2" />
                        Добавить в корзину
                      </Button>
                      <Button variant="outline" size="lg">
                        <Icon name="Heart" className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Truck" className="w-4 h-4" />
                        <span>Доставка 1-3 дня</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Shield" className="w-4 h-4" />
                        <span>Гарантия 2 года</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="RefreshCw" className="w-4 h-4" />
                        <span>Возврат 14 дней</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Wrench" className="w-4 h-4" />
                        <span>Бесплатная сборка</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    ),
    about: (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-5xl mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            О компании
          </h1>
          <Card className="p-8">
            <p className="text-lg leading-relaxed mb-6 text-foreground">
              Мы — современная мебельная компания с 15-летним опытом создания уникальных интерьеров. 
              Наша миссия — делать качественную дизайнерскую мебель доступной каждому.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">лет на рынке</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                <div className="text-4xl font-bold text-secondary mb-2">5000+</div>
                <div className="text-muted-foreground">довольных клиентов</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
                <div className="text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-muted-foreground">гарантия качества</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    ),
    delivery: (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-5xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Доставка
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="Truck" className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">По Москве</h3>
              <p className="text-muted-foreground mb-2">Бесплатно при заказе от 50 000 ₽</p>
              <p className="text-muted-foreground">Срок: 1-3 дня</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="MapPin" className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">По России</h3>
              <p className="text-muted-foreground mb-2">Расчет индивидуально</p>
              <p className="text-muted-foreground">Срок: 5-14 дней</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="Package" className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Подъем на этаж</h3>
              <p className="text-muted-foreground">500 ₽ за этаж без лифта</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="Wrench" className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Сборка</h3>
              <p className="text-muted-foreground">От 1000 ₽ в зависимости от сложности</p>
            </Card>
          </div>
        </div>
      </div>
    ),
    contacts: (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-5xl mb-8 text-center bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Контакты
          </h1>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground">Ежедневно 9:00 - 21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" className="w-6 h-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                    <p className="text-muted-foreground">info@furniture.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Напишите нам</h3>
                <div className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Телефон" />
                  <Button className="w-full">Отправить</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    ),
    blog: (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-5xl mb-8 text-center bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Блог
          </h1>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Тренды 2024', icon: 'TrendingUp' },
              { title: 'Как выбрать диван', icon: 'Sofa' },
              { title: 'Уход за мебелью', icon: 'Sparkles' },
            ].map((post, i) => (
              <Card key={i} className="p-6 hover:shadow-xl transition-all hover:-translate-y-2">
                <Icon name={post.icon as any} className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">{post.title}</h3>
                <p className="text-muted-foreground mb-4">
                  Полезные советы и рекомендации от наших экспертов
                </p>
                <Button variant="outline">Читать далее</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    ),
    warranty: (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-5xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Гарантия
          </h1>
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Icon name="Shield" className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-foreground">2 года гарантии</h3>
                  <p className="text-muted-foreground">
                    На всю мебель распространяется расширенная гарантия производителя сроком 24 месяца
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="RefreshCw" className="w-8 h-8 text-secondary flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-foreground">Обмен и возврат</h3>
                  <p className="text-muted-foreground">
                    14 дней на обмен или возврат товара надлежащего качества
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="CheckCircle" className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-foreground">Контроль качества</h3>
                  <p className="text-muted-foreground">
                    Каждое изделие проходит многоступенчатый контроль перед отправкой
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    ),
    payment: (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-5xl mb-8 text-center bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Оплата
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="CreditCard" className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Банковские карты</h3>
              <p className="text-muted-foreground">Visa, MasterCard, МИР</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="Wallet" className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Наличные</h3>
              <p className="text-muted-foreground">При получении курьеру</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="Building" className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Для юрлиц</h3>
              <p className="text-muted-foreground">Безналичный расчет по счету</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <Icon name="Calendar" className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Рассрочка</h3>
              <p className="text-muted-foreground">0% на 6 месяцев</p>
            </Card>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Icon name="Armchair" className="w-8 h-8 text-primary" />
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FurnitureShop
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {[
                { id: 'catalog', label: 'Каталог', icon: 'Store' },
                { id: 'about', label: 'О компании', icon: 'Info' },
                { id: 'delivery', label: 'Доставка', icon: 'Truck' },
                { id: 'contacts', label: 'Контакты', icon: 'Phone' },
                { id: 'blog', label: 'Блог', icon: 'BookOpen' },
                { id: 'warranty', label: 'Гарантия', icon: 'Shield' },
                { id: 'payment', label: 'Оплата', icon: 'CreditCard' },
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                    activeSection === section.id ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={section.icon as any} className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Icon name="Menu" className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-heading">Меню</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                    {[
                      { id: 'catalog', label: 'Каталог', icon: 'Store' },
                      { id: 'about', label: 'О компании', icon: 'Info' },
                      { id: 'delivery', label: 'Доставка', icon: 'Truck' },
                      { id: 'contacts', label: 'Контакты', icon: 'Phone' },
                      { id: 'blog', label: 'Блог', icon: 'BookOpen' },
                      { id: 'warranty', label: 'Гарантия', icon: 'Shield' },
                      { id: 'payment', label: 'Оплата', icon: 'CreditCard' },
                    ].map(section => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? 'default' : 'ghost'}
                        className="justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <Icon name={section.icon as any} className="w-4 h-4 mr-2" />
                        {section.label}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main>
        {sections[activeSection as keyof typeof sections]}
      </main>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Armchair" className="w-6 h-6" />
                <span className="font-heading font-bold text-xl">FurnitureShop</span>
              </div>
              <p className="text-gray-400">
                Качественная мебель для вашего дома
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Гостиная</li>
                <li>Спальня</li>
                <li>Кухня</li>
                <li>Офис</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Гарантия</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@furniture.ru</li>
                <li>г. Москва</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 FurnitureShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;