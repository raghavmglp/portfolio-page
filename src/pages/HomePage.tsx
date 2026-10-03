import {
  Box,
  CloseButton,
  Dialog,
  Portal,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuFileText, LuMail } from "react-icons/lu";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import resume from "../assets/Raghav_Mangalapalli_Resume_2026.pdf";
import TimelineComponent from "../components/Timeline";
import { ColorModeButton } from "../components/ui/color-mode";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raghav-mangalapalli/",
    icon: <FaLinkedinIn aria-hidden="true" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/raghavmglp",
    icon: <FaGithub aria-hidden="true" />,
  },
  {
    label: "Email",
    href: "mailto:raghavmtests@gmail.com",
    icon: <LuMail aria-hidden="true" />,
  },
];

function ResumeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Dialog.Header
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid var(--line)"
        px={4}
        py={3}
      >
        <Dialog.Title fontSize="sm" fontWeight="500">
          Résumé / 2026
        </Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>
      <Dialog.Body h="full" p={0} bg="var(--surface)">
        <Box ref={containerRef} overflowY="auto" h="full">
          <Document file={resume}>
            <Page pageNumber={1} width={containerWidth || undefined} />
          </Document>
        </Box>
      </Dialog.Body>
    </>
  );
}

function ResumeButton() {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (!isDesktop) {
    return (
      <a
        className="link-button"
        href={resume}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LuFileText aria-hidden="true" />
        <span>Résumé</span>
      </a>
    );
  }

  return (
    <Dialog.Root motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <button className="link-button" type="button">
          <LuFileText aria-hidden="true" />
          <span>Résumé</span>
        </button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="rgba(0, 0, 0, 0.78)" backdropFilter="blur(6px)" />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="4xl"
            h="88vh"
            bg="var(--surface)"
            color="var(--text)"
            border="1px solid var(--line)"
            borderRadius="0"
          >
            <ResumeViewer />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="site-shell">
      <header className="masthead reveal reveal--one">
        <div className="masthead__mark" aria-hidden="true">
          RM
        </div>
        <div className="masthead__identity">
          <h1>Raghav Mangalapalli</h1>
          <p>TU Eindhoven, BITS, Pilani | ASML, Amazon, Eltropy.</p>
        </div>
        <ColorModeButton className="theme-toggle" size="xs" />
        {/* <p className="masthead__location">
          <span className="status-dot" aria-hidden="true" />
          Eindhoven, NL
        </p> */}
      </header>

      <section
        className="editorial-section reveal reveal--two"
        aria-labelledby="about-title"
      >
        <div className="section-label">
          <span>01</span>
          <h2 id="about-title">About</h2>
        </div>
        <div className="section-content intro-copy">
          <p>
            Hi there, I'm Raghav, and I'm currently a master's student at the
            Technical University of Eindhoven and an intern at ASML. I
            previously completed my undergraduate studies at the Birla Institute
            of Technology and Science. I am particularly interested in
            intersection of distributed systems and machine learning. I'm always
            looking for new opportunities to learn and grow. You can contact me
            through the links below!
          </p>
        </div>
      </section>

      <section
        className="editorial-section reveal reveal--three"
        aria-labelledby="experience-title"
      >
        <div className="section-label">
          <span>02</span>
          <h2 id="experience-title">Experience & education</h2>
        </div>
        <div className="section-content">
          <TimelineComponent />
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="links-title">
        <div className="section-label">
          <span>03</span>
          <h2 id="links-title">Links</h2>
        </div>
        <div className="section-content link-buttons">
          {LINKS.map((link) => (
            <a
              className="link-button"
              href={link.href}
              key={link.label}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
          <ResumeButton />
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="outside-title">
        <div className="section-label">
          <span>04</span>
          <h2 id="outside-title">Outside work</h2>
        </div>
        <div className="section-content">
          {/* <figure className="personal-note">
            <img src={outsideWorkPhoto} alt="Raghav in Berlin, 2026" />
            <figcaption>

              <span>Berlin / 2026</span>
            </figcaption>
          </figure> */}
          <p>
            I enjoy quizzing and{" "}
            <a
              className="inline-link"
              href="https://www.goodreads.com/user/show/169594018-raghav-mangalapalli"
              target="_blank"
              rel="noreferrer"
            >
              reading
            </a>
            —especially science fiction. I was president of the BITS Pilani
            Debate Club and played on the university’s Ultimate Frisbee team.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
