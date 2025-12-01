import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const SectionContent = {
  about: () => (
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

  delivery: () => (
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

  contacts: () => (
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

  blog: () => (
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

  warranty: () => (
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

  payment: () => (
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

export default SectionContent;
