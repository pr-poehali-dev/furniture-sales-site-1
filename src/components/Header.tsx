import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
}

const Header = ({ activeSection, setActiveSection, cartCount }: HeaderProps) => {
  const navItems = [
    { id: 'catalog', label: 'Каталог', icon: 'Store' },
    { id: 'about', label: 'О компании', icon: 'Info' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
    { id: 'blog', label: 'Блог', icon: 'BookOpen' },
    { id: 'warranty', label: 'Гарантия', icon: 'Shield' },
    { id: 'payment', label: 'Оплата', icon: 'CreditCard' },
  ];

  return (
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
            {navItems.map(section => (
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
                  {navItems.map(section => (
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
  );
};

export default Header;
