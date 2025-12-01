import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="flex gap-2">
              <Badge variant="default" className="text-sm px-3 py-1">
                {product.category}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {product.style}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {product.material}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-bold text-3xl text-primary">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.inStock && (
                  <Badge variant="default" className="bg-green-500">
                    <Icon name="Check" className="w-4 h-4 mr-1" />
                    В наличии
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Ruler" className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Размеры:</span>
                  <span className="text-muted-foreground">{product.size} см</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Package" className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">Материал:</span>
                  <span className="text-muted-foreground">{product.material}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Palette" className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Стиль:</span>
                  <span className="text-muted-foreground">{product.style}</span>
                </div>
              </div>

              {product.features && (
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-lg mb-3">Особенности:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
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
                    onAddToCart();
                    onClose();
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
