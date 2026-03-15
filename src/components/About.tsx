import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Globe } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Degree in Computer Science",
      description: "Bachelor's in Computer Science and Engineering"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Internships",
      description: "4+ internships in front-end and UI/UX roles"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Remote Experience",
      description: "Experience with remote and in-office teams"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I graduated in <span className="text-foreground font-semibold">Computer Science and Engineering</span>. 
                My journey into tech began with a deep curiosity about how design and code come together to create 
                meaningful digital experiences.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I have gained hands-on experience through <span className="text-foreground font-semibold">internships at several companies</span>, 
                where I focused on building responsive, functional, and visually appealing websites. I'm passionate about 
                creating user-centered designs that not only look great but also provide exceptional user experiences.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My technical skills span across modern front-end technologies, and I'm constantly learning and adapting 
                to new tools and frameworks to stay current in this ever-evolving field.
              </p>
            </div>

            <div className="grid gap-6 animate-fade-in-up">
              {highlights.map((item, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 p-8 bg-card rounded-2xl shadow-lg border-2 border-primary/20 animate-scale-in">
            <h3 className="text-2xl font-bold mb-4 text-center">Education</h3>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <GraduationCap className="w-12 h-12 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Bachelor's Degree</h4>
              <p className="text-lg text-muted-foreground mb-1">Computer Science and Engineering</p>
              <p className="text-lg text-muted-foreground mb-1">From Adama Science and Technology University</p>
              <p className="text-primary font-semibold">Graduated 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
