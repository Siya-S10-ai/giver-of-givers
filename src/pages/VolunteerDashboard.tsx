import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, CheckCircle, Clock, Users, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: 'reporter' | 'volunteer';
}

const VolunteerDashboard = () => {
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

  const availableTasks = [
    {
      id: 1,
      name: 'Natural Disaster Response - Eastern Cape',
      category: 'Natural Disaster',
      status: 'Available',
      urgency: 'High',
      volunteers: 0,
      maxVolunteers: 10,
      description: 'Assist with flood relief efforts in Eastern Cape communities'
    },
    {
      id: 2,
      name: 'Healthcare Supply Distribution',
      category: 'Healthcare',
      status: 'In Progress',
      urgency: 'Medium',
      volunteers: 3,
      maxVolunteers: 5,
      description: 'Help distribute medical supplies to remote healthcare facilities'
    },
    {
      id: 3,
      name: 'Educational Resource Drive',
      category: 'Education',
      status: 'Available',
      urgency: 'Low',
      volunteers: 1,
      maxVolunteers: 8,
      description: 'Collect and distribute educational materials to underprivileged schools'
    },
    {
      id: 4,
      name: 'Water Infrastructure Repair',
      category: 'Water Provision',
      status: 'Planning',
      urgency: 'High',
      volunteers: 0,
      maxVolunteers: 6,
      description: 'Assist with water pump repairs in drought-affected areas'
    }
  ];

  const myContributions = [
    {
      id: 1,
      taskName: 'Food Distribution - Gauteng',
      status: 'Completed',
      owner: 'Relief Team Alpha',
      completedDate: '2024-01-10',
      hoursContributed: 8
    },
    {
      id: 2,
      taskName: 'Shelter Setup - Western Cape',
      status: 'Completed',
      owner: 'Emergency Response Unit',
      completedDate: '2024-01-08',
      hoursContributed: 12
    },
    {
      id: 3,
      taskName: 'Healthcare Supply Distribution',
      status: 'In Progress',
      owner: 'Medical Aid Team',
      hoursContributed: 4
    }
  ];

  const stats = {
    totalTasks: myContributions.length,
    completedTasks: myContributions.filter(c => c.status === 'Completed').length,
    hoursContributed: myContributions.reduce((sum, c) => sum + c.hoursContributed, 0),
    impactRating: 4.8
  };

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
          <p className="text-muted-foreground">Continue making a positive impact in communities worldwide.</p>
          
          <div className="mt-6">
            <Link to="/contributions">
              <Button size="lg" className="bg-gradient-primary mr-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                Track My Contributions
              </Button>
            </Link>
            <Link to="/volunteer-registration">
              <Button size="lg" variant="outline">
                <Users className="w-5 h-5 mr-2" />
                Browse New Tasks
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{stats.completedTasks}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.hoursContributed}</p>
                  <p className="text-sm text-muted-foreground">Hours Contributed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalTasks}</p>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{stats.impactRating}</p>
                  <p className="text-sm text-muted-foreground">Impact Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Available Tasks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableTasks.map((task) => (
              <Card key={task.id} className="card-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{task.name}</CardTitle>
                    <Badge variant={
                      task.urgency === 'High' ? 'destructive' :
                      task.urgency === 'Medium' ? 'secondary' : 'outline'
                    }>
                      {task.urgency} Priority
                    </Badge>
                  </div>
                  <CardDescription>{task.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{task.volunteers}/{task.maxVolunteers} volunteers</span>
                    </div>
                    <Badge variant={task.status === 'Available' ? 'default' : 'secondary'}>
                      {task.status}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary" 
                    disabled={task.status !== 'Available'}
                  >
                    {task.status === 'Available' ? 'Join Task' : 'Not Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Contributions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">My Contributions</h2>
          <Card>
            <CardHeader>
              <CardTitle>{user.username}'s Contributions</CardTitle>
              <CardDescription>Track your volunteer activities and impact</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myContributions.map((contribution) => (
                    <TableRow key={contribution.id}>
                      <TableCell className="font-medium">{contribution.taskName}</TableCell>
                      <TableCell>
                        <Badge variant={contribution.status === 'Completed' ? 'default' : 'secondary'}>
                          {contribution.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{contribution.owner}</TableCell>
                      <TableCell>{contribution.hoursContributed}h</TableCell>
                      <TableCell>
                        {contribution.completedDate || 'In Progress'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;