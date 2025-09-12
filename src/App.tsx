import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, HandHeart, Globe } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Gift of Givers
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This is a preview of your Blazor WebAssembly project structure in Lovable's React environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Blazor Components</CardTitle>
              </div>
              <CardDescription>
                Your Blazor .razor components are ready for local development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Navigation.razor</li>
                <li>✅ Home.razor</li>
                <li>✅ Login.razor</li>
                <li>✅ Register.razor</li>
                <li>✅ Profile.razor</li>
                <li>✅ Donations.razor</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <HandHeart className="h-6 w-6 text-primary" />
                <CardTitle>UI Components</CardTitle>
              </div>
              <CardDescription>
                Complete UI component library in Blazor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Button, Card, Input</li>
                <li>✅ Table, Tabs, Progress</li>
                <li>✅ Toast, Alert, Badge</li>
                <li>✅ Avatar, Checkbox, Switch</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle>Backend Ready</CardTitle>
              </div>
              <CardDescription>
                Azure SQL integration configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Entity Framework Core</li>
                <li>✅ Azure SQL Database</li>
                <li>✅ Service Layer</li>
                <li>✅ Authentication Ready</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Run Locally!</CardTitle>
              <CardDescription className="text-lg">
                Your pure Blazor WebAssembly project is ready for local development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg text-left">
                <code className="text-sm">
                  # 1. Install dependencies<br/>
                  npm install<br/><br/>
                  # 2. Build Tailwind CSS (separate terminal)<br/>
                  npx tailwindcss -i ./wwwroot/css/app.css -o ./wwwroot/css/app.min.css --watch<br/><br/>
                  # 3. Restore .NET packages<br/>
                  dotnet restore<br/><br/>
                  # 4. Run your Blazor app<br/>
                  dotnet watch run
                </code>
              </div>
              <p className="text-muted-foreground">
                <strong>Note:</strong> This React preview is only for Lovable's environment. 
                Your actual application runs as pure Blazor WebAssembly locally.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;