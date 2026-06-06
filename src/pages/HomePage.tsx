import {
  Box,
  Text,
  Button,
  Image,
  Wrap,
  Dialog,
  Portal,
  CloseButton,
  useBreakpointValue,
  Flex,
  Separator,
} from "@chakra-ui/react";
import { LuArrowUpRight, LuMail } from "react-icons/lu";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import TimelineComponent from "../components/Timeline";
// import QuizModal from "../components/QuizModal";
import { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import resume from "../assets/Raghav_Mangalapalli_Resume_2026.pdf";
import berlinPhoto from "../assets/IMG20251207145446.jpg";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raghav-mangalapalli/",
    newTab: true,
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    href: "https://github.com/raghavmglp",
    newTab: true,
    icon: <FaGithub />,
  },
  {
    label: "Email",
    href: "mailto:raghavmtests@gmail.com",
    newTab: false,
    icon: <LuMail />,
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
        justifyContent="flex-end"
        mb={2}
      >
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>
      <Dialog.Body h="full" p={0}>
        <Box ref={containerRef} overflowY="auto" h="full">
          <Document file={resume}>
            <Page pageNumber={1} width={containerWidth || undefined} />
          </Document>
        </Box>
      </Dialog.Body>
    </>
  );
}

export default function HomePage() {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box pt={8}>
      <Text color="fg.muted" mb={6}>
        Hi there, I'm Raghav, and I'm currently a master's student at the
        Technical University of Eindhoven. I previously completed my
        undergraduate studies at the Birla Institute of Technology and Science.
        I am particularly interested in intersection of distributed systems and
        machine learning. I'm always looking for new opportunities to learn and
        grow. You can contact me through the links below!
      </Text>
      <Wrap gap={4} justify="center" mb={6}>
        {LINKS.map(({ label, href, newTab, icon }) => (
          <Button
            key={label}
            asChild
            variant="outline"
            size="sm"
            borderRadius={0}
            overflow="hidden"
            _dark={{ borderColor: "#434c5e" }}
            css={{
              "& .btn-label": { transition: "opacity 0.15s, transform 0.15s" },
              "& .btn-icon": {
                position: "absolute",
                opacity: 0,
                transform: "translateY(6px)",
                transition: "opacity 0.15s, transform 0.15s",
              },
              "&:hover .btn-label": {
                opacity: 0,
                transform: "translateY(-6px)",
              },
              "&:hover .btn-icon": { opacity: 1, transform: "translateY(0px)" },
            }}
          >
            <a
              href={href}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...(newTab
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="btn-label">{label}</span>
              <span className="btn-icon">{icon}</span>
            </a>
          </Button>
        ))}

        {isDesktop ? (
          <Dialog.Root motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <Button variant="solid" size="sm" borderRadius={0}>
                resume <LuArrowUpRight />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content maxW="4xl" h="85vh">
                  <ResumeViewer />
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        ) : (
          <Button asChild variant="solid" size="sm" borderRadius={0}>
            <a href={resume} target="_blank" rel="noopener noreferrer">
              resume <LuArrowUpRight />
            </a>
          </Button>
        )}
      </Wrap>
      <Separator my={6} size={"lg"} />
      <Text color="fg.muted" mb={6}>
        Below is a small timeline of what I've been up to in terms of work and
        education over the past few years.
      </Text>
      <Flex justifyContent="center">
        <TimelineComponent />
      </Flex>
      <Separator my={6} size={"lg"} />
      <Text color="fg.muted" mb={6}>
        You can view some of my personal projects in the projects tab. Outside
        of work I enjoy quizzing and reading books, particularly sci-fi. I used
        to be the president of the BITS Pilani Debate Club and part of the
        Ultimate Frisbee Team.
      </Text>
      <Flex direction="column" align="center" mt={6} mb={6}>
        <Image src={berlinPhoto} alt="Berlin, 2026" w="35%" />
        <Text fontSize="xs" color="fg.muted" mt={2}>
          Berlin, 2026
        </Text>
      </Flex>
      {/* <Flex justify="center" mb={10}>
        <QuizModal />
      </Flex> */}
    </Box>
  );
}
