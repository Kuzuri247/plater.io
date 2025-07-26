import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Sparkles, Calendar, Type, Image } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-8 h-8 bg-accent/30 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-6 h-6 bg-secondary/40 rounded-full blur-md animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-10 h-10 bg-primary/15 rounded-full blur-lg animate-bounce"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Creator Tools</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Create <span className="bg-gradient-primary bg-clip-text text-transparent">Stunning</span>
            <br />
            Content in Seconds
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your content creation with AI-powered meme templates, stylish text integration, and smart post scheduling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:shadow-purple transition-smooth text-lg px-8 py-6">
              Start Creating Free
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 transition-smooth text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
          
          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 hover:shadow-glow transition-smooth">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meme Templates</h3>
              <p className="text-muted-foreground">Create viral memes with our extensive library of customizable templates</p>
            </Card>
            
            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 hover:shadow-glow transition-smooth">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Type className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stylish Text</h3>
              <p className="text-muted-foreground">Add beautiful typography and text effects to your images effortlessly</p>
            </Card>
            
            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 hover:shadow-glow transition-smooth">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Scheduling</h3>
              <p className="text-muted-foreground">Smart AI analyzes your audience to schedule posts at optimal times</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}