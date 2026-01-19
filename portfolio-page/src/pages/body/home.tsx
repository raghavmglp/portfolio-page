import DraggablePhoto from "@/components/ui/dragablePhoto";
import { contactInfo } from "@/constants/contact";

function Home() {
  return (
    <div className="flex flex-col min-h-[90vh] leading-relaxed max-w-5xl mx-auto overflow-visible">
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start overflow-visible">
        <div className="w-full md:w-52 shrink-0 flex justify-center md:block overflow-visible">
          <DraggablePhoto />
        </div>

        <div className="flex-1 space-y-6 w-full text-center px-6 md:text-left">
          <p className="text-[20px] font-medium text-foreground tracking-tight">
            Hi! I'm Raghav.
          </p>

          <div className="space-y-5">
            <p className="text-[18px] text-foreground/90 text-left">
              I'm currently pursuing a Master's Degree in Computer Science at
              the Technical University of Eindhoven. I'm interested in the
              intersection of systems architecture and machine learning. I have
              2 years of professional experience. I was a software engineer at
              Eltropy and an intern at Amazon. My undergraduate studies were at
              the Birla Institute of Technology and Science (BITS), Pilani.
            </p>

            <p className="text-[18px] text-foreground/90 text-left">
              You can view some of my personal projects in the projects section.
              I also write from time to time - if you're interested in reading
              some of my work, check out the blog! I'm always looking for new
              opportunities. If you'd like to get in touch with me, you can find
              my contact information at the bottom of the page.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="flex justify-center items-center mt-auto pt-24 pb-12">
        <div className="flex gap-4">
          {contactInfo.map((contact) => (
            <a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 border border-border transition-all hover:bg-primary"
            >
              <span className="text-foreground group-hover:text-primary-foreground transition">
                <contact.icon size={20} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
