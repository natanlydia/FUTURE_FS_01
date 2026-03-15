import { Mail, Github, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
                Natan Ashebir
              </h3>
              <p className="text-muted-foreground mb-4">
                Software Developer, UI/UX Designer & Cvent Developer crafting beautiful digital experiences
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Experience", "Skills", "Portfolio", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.toLowerCase());
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3 mb-4">
                <a
                  href="mailto:natanasnu19@gmail.com"
                  className="p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/natanlydia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/natanashebir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Open to opportunities and collaborations
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Natan Ashebir © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
