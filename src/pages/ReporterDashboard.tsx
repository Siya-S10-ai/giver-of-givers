import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, FileText, Users, Droplets, BookOpen, Heart, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: 'reporter' | 'volunteer';
}

const ReporterDashboard = () => {
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

  const reportCategories = [
    {
      id: 'natural-disaster',
      title: 'Natural Disaster',
      icon: AlertTriangle,
      description: 'Report floods, earthquakes, fires, and other natural disasters affecting your area.',
      color: 'destructive',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop'
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      icon: Heart,
      description: 'Report healthcare emergencies, medical supply shortages, and health facility issues.',
      color: 'success',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop'
    },
    {
      id: 'education',
      title: 'Education',
      icon: BookOpen,
      description: 'Report educational infrastructure damage, resource shortages, and access issues.',
      color: 'primary',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop'
    },
    {
      id: 'human-development',
      title: 'Human Development',
      icon: Users,
      description: 'Report community development needs, social issues, and human rights concerns.',
      color: 'secondary',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop'
    },
    {
      id: 'water-provision',
      title: 'Water Provision',
      icon: Droplets,
      description: 'Report water supply issues, contamination, and infrastructure problems.',
      color: 'info',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    },
    {
      id: 'hunger-alleviation',
      title: 'Hunger Alleviation',
      icon: Heart,
      description: 'Report food shortages, malnutrition cases, and food security issues.',
      color: 'warning',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop'
    }
  ];

  const recentReports = [
    { id: 1, title: 'Flood in Eastern Cape', status: 'Under Review', date: '2024-01-15' },
    { id: 2, title: 'Healthcare Supply Shortage', status: 'In Progress', date: '2024-01-14' },
    { id: 3, title: 'School Infrastructure Damage', status: 'Resolved', date: '2024-01-13' },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user.username}</span>
          </h1>
          <p className="text-muted-foreground">Ready to make a difference in your community?</p>
          
          <div className="mt-6">
            <Link to="/submit-report">
              <Button size="lg" className="bg-gradient-primary">
                <Plus className="w-5 h-5 mr-2" />
                Submit Your Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Report Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Report Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportCategories.map((category, index) => (
              <Card key={category.id} className={`card-glow cursor-pointer group ${index % 2 === 0 ? 'lg:mr-4' : 'lg:ml-4'}`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <category.icon className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Link to={`/submit-report?category=${category.id}`}>
                    <Button className="w-full bg-gradient-primary">
                      Submit Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Your Recent Reports</h2>
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Track the status of your submitted reports</CardDescription>
            </CardHeader>
            <CardContent>
              {recentReports.length > 0 ? (
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">Submitted on {report.date}</p>
                        </div>
                      </div>
                      <Badge variant={
                        report.status === 'Resolved' ? 'default' :
                        report.status === 'In Progress' ? 'secondary' : 'outline'
                      }>
                        {report.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports submitted yet</p>
                  <Link to="/submit-report">
                    <Button className="mt-4 bg-gradient-primary">Submit Your First Report</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReporterDashboard;