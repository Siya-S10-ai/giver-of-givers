import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, Save, User, Mail, Phone, Calendar, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: 'reporter' | 'volunteer';
  profilePicture?: string;
  joinDate?: string;
  totalContributions?: number;
  impactScore?: number;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    phone: '',
    profilePicture: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add mock data for demonstration
      const enhancedUser = {
        ...parsedUser,
        joinDate: '2023-06-15',
        totalContributions: parsedUser.role === 'volunteer' ? 12 : 8,
        impactScore: parsedUser.role === 'volunteer' ? 4.8 : 4.5,
        profilePicture: parsedUser.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.username}`
      };
      setUser(enhancedUser);
      setFormData({
        name: enhancedUser.name || '',
        surname: enhancedUser.surname || '',
        username: enhancedUser.username || '',
        email: enhancedUser.email || '',
        phone: enhancedUser.phone || '',
        profilePicture: enhancedUser.profilePicture || ''
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data in localStorage
      const updatedUser = {
        ...user,
        ...formData
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: 'Profile updated!',
        description: 'Your profile has been successfully updated.',
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'There was an error updating your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          profilePicture: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const getInitials = (name: string, surname: string) => {
    const firstName = name?.charAt(0) || 'U';
    const lastName = surname?.charAt(0) || 'N';
    return `${firstName}${lastName}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview Card */}
            <div className="lg:col-span-1">
              <Card className="card-glow">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={formData.profilePicture || user.profilePicture} />
                      <AvatarFallback className="text-xl">
                        {getInitials(user.name, user.surname)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">
                    {user.name} {user.surname}
                  </h2>
                  <p className="text-muted-foreground mb-4">@{user.username}</p>
                  
                  <Badge variant="secondary" className="mb-4">
                    {user.role === 'volunteer' ? 'Volunteer' : 'Reporter'}
                  </Badge>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined {new Date(user.joinDate || '').toLocaleDateString()}</span>
                    </div>
                    
                    {user.role === 'volunteer' && (
                      <>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Award className="w-4 h-4 text-warning" />
                          <span>{user.totalContributions} Contributions</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <span>⭐</span>
                          <span>{user.impactScore}/5.0 Impact Score</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details Card */}
            <div className="lg:col-span-2">
              <Card className="card-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        {isEditing ? 'Update your profile information' : 'View your profile details'}
                      </CardDescription>
                    </div>
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)}>
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="surname">Surname</Label>
                          <Input
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="bg-gradient-primary"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Full Name</p>
                              <p className="font-medium">{user.name} {user.surname}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{user.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{user.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Award className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Role</p>
                              <p className="font-medium capitalize">{user.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;