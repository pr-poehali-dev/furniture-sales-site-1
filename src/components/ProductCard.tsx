import { Card, CardContent } from '@/components/ui/card';
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

interface ProductCardProps {
  product: Product;
  index: number;
  onViewDetails: (product: Product) => void;
  onAddToCart: () => void;
}

const ProductCard = ({ product, index, onViewDetails, onAddToCart }: ProductCardProps) => {
  return (
    <Card
      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div 
        className="relative overflow-hidden aspect-[4/3]"
        onClick={() => onViewDetails(product)}
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
            onClick={onAddToCart}
            className="group-hover:scale-105 transition-transform"
          >
            <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
