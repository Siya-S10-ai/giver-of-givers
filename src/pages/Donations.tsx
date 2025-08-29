import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Utensils, Shirt, Stethoscope, ExternalLink, MapPin, Target, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: 'reporter' | 'volunteer';
}

const Donations = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const donationCategories = [
    {
      id: 'food',
      title: 'Food & Nutrition',
      icon: Utensils,
      description: 'Provide essential nutrition to families in need',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'clothing',
      title: 'Clothing & Shelter',
      icon: Shirt,
      description: 'Essential clothing and shelter materials',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'medical',
      title: 'Medical Supplies',
      icon: Stethoscope,
      description: 'Critical medical equipment and supplies',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  const activeCampaigns = [
    {
      id: 1,
      title: 'Support For Flood Ravaged Pakistan',
      description: 'Millions affected by devastating floods need immediate assistance with food, shelter, and medical supplies.',
      location: 'Pakistan',
      urgency: 'Critical',
      raised: 450000,
      target: 1000000,
      supporters: 2340,
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop',
      link: '#'
    },
    {
      id: 2,
      title: 'Rebuilding Flood-Stricken Communities In Eastern Cape',
      description: 'Help rebuild homes, schools, and infrastructure destroyed by recent flooding in Eastern Cape communities.',
      location: 'Eastern Cape, South Africa',
      urgency: 'High',
      raised: 280000,
      target: 500000,
      supporters: 1580,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      link: '#'
    },
    {
      id: 3,
      title: 'Restoration Begins Amid Gaza Genocide',
      description: 'Emergency humanitarian aid for families affected by ongoing conflict, including medical supplies and food.',
      location: 'Gaza',
      urgency: 'Critical',
      raised: 750000,
      target: 1500000,
      supporters: 4200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      link: '#'
    },
    {
      id: 4,
      title: 'Floods And Fires Wreak Havoc In South Africa',
      description: 'Multi-disaster response supporting communities affected by both flooding and wildfires across multiple provinces.',
      location: 'Multiple Provinces, South Africa',
      urgency: 'High',
      raised: 320000,
      target: 800000,
      supporters: 1920,
      image: 'https://images.unsplash.com/photo-1574438731621-b8b60c3e87df?w=800&h=400&fit=crop',
      link: '#'
    },
    {
      id: 5,
      title: 'Support For Syria',
      description: 'Ongoing humanitarian support for Syrian refugees and internally displaced families needing basic necessities.',
      location: 'Syria',
      urgency: 'High',
      raised: 680000,
      target: 1200000,
      supporters: 3100,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      link: '#'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-secondary mx-auto mb-4" fill="currentColor" />
          <h1 className="text-4xl font-bold mb-4">
            Make a <span className="gradient-text">Difference</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your donation can provide life-saving assistance to communities in crisis. 
            Every contribution, no matter the size, makes a meaningful impact.
          </p>
        </div>

        {/* Donation Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How You Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donationCategories.map((category) => (
              <Card key={category.id} className="card-glow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Active Campaigns</h2>
          <div className="space-y-6">
            {activeCampaigns.map((campaign) => (
              <Card key={campaign.id} className="card-glow overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{campaign.location}</span>
                          </div>
                          <Badge variant={
                            campaign.urgency === 'Critical' ? 'destructive' :
                            campaign.urgency === 'High' ? 'secondary' : 'outline'
                          }>
                            {campaign.urgency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{campaign.description}</p>
                    
                    {/* Progress */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Raised: {formatCurrency(campaign.raised)}</span>
                        <span>Target: {formatCurrency(campaign.target)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(campaign.raised, campaign.target)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{campaign.supporters.toLocaleString()} supporters</span>
                        </div>
                        <span>{getProgressPercentage(campaign.raised, campaign.target).toFixed(1)}% funded</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-gradient-primary">
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-hero text-white text-center">
          <CardContent className="p-12">
            <Target className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Every Donation Counts</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of compassionate individuals making a real difference in the world.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold mb-2">2.5M+</div>
                <div className="opacity-90">People Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="opacity-90">Countries Reached</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="opacity-90">Emergency Response</div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Your Impact Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donations;