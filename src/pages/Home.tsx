import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Shield, Users, Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Heart className="w-16 h-16 text-secondary mx-auto mb-4" fill="currentColor" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">GOG</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Gift of the Givers
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connecting compassionate hearts with those in need. Join our mission to make a meaningful impact in communities worldwide.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-primary px-8">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="px-8">
                Register
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 card-glow">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Disaster Response</h3>
              <p className="text-muted-foreground">
                Report incidents and coordinate rapid response efforts in affected areas.
              </p>
            </Card>
            <Card className="p-6 card-glow">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Volunteer Network</h3>
              <p className="text-muted-foreground">
                Connect with volunteers and track contributions to maximize impact.
              </p>
            </Card>
            <Card className="p-6 card-glow">
              <Globe className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Support communities worldwide through strategic donations and aid.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">About GOG</h2>
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed mb-6">
              GOG (Gift of the Givers) is a comprehensive platform designed to connect compassionate individuals 
              with communities in need. Our mission is to streamline disaster response, volunteer coordination, 
              and donation management to maximize the impact of humanitarian efforts.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're a reporter documenting incidents in your area, a volunteer ready to make a difference, 
              or someone looking to contribute through donations, GOG provides the tools and network you need to 
              create meaningful change.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4 text-primary">For Reporters</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Submit detailed incident reports</li>
                  <li>• Track report status and updates</li>
                  <li>• Coordinate with response teams</li>
                  <li>• Upload supporting documentation</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4 text-secondary">For Volunteers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Browse available tasks and missions</li>
                  <li>• Track your contributions and impact</li>
                  <li>• Connect with other volunteers</li>
                  <li>• Receive recognition for your efforts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+27 (0) 21 638 0515</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@gog.org.za</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Cape Town, South Africa</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary hover:text-primary-light transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-primary hover:text-primary-light transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-primary hover:text-primary-light transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Emergency Hotline</h3>
              <p className="text-muted-foreground mb-4">
                For urgent incidents requiring immediate response, contact our 24/7 emergency line:
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-destructive font-bold text-lg">📞 0800 786 911</p>
                <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-6 h-6" fill="currentColor" />
            <span className="text-lg font-semibold">GOG - Gift of the Givers</span>
          </div>
          <p className="text-primary-foreground/80">
            © 2024 Gift of the Givers. Making a difference, one act of kindness at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;