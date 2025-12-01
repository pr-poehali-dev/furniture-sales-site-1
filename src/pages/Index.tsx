import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import SectionContent from '@/components/SectionContent';

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

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const catalogSection = (
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
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onViewDetails={handleViewDetails}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddToCart={addToCart}
      />
    </div>
  );

  const sections: Record<string, JSX.Element> = {
    catalog: catalogSection,
    about: <SectionContent.about />,
    delivery: <SectionContent.delivery />,
    contacts: <SectionContent.contacts />,
    blog: <SectionContent.blog />,
    warranty: <SectionContent.warranty />,
    payment: <SectionContent.payment />,
  };

  return (
    <div className="min-h-screen">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartCount}
      />

      <main>
        {sections[activeSection]}
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
