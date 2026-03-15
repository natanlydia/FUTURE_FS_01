import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ArrowDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-primary/20 backdrop-blur-sm text-primary-foreground rounded-full text-sm font-medium border border-primary/30">
            Computer Science & Engineering
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Hey There,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              I'm Natan Ashebir
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 font-medium">
            Software Developer, UI/UX Designer, Cvent Developer 
          </p>
          
          <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm a passionate Computer Science and Engineering graduate specializing in front-end development, web development, UI/UX design and Cvent development. 
            I love creating responsive, user-centered web experiences that bring ideas to life.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection('portfolio')}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-foreground"
            >
              Hire Me
            </Button>
          </div>
          
          <div className="flex gap-4 justify-center">
            <a 
              href="mailto:natanasnu19@gmail.com" 
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://github.com/natanlydia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://www.linkedin.com/in/natanashebir/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-8 h-8 text-white" />
      </button>
    </section>
  );
};

export default Hero;
