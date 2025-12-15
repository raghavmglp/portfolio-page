import { Text } from "@/components/ui/typography";

function Home() {
  return (
    <div className="space-y-4">
      <Text className="text-[18px]">
        Hi! I'm <span className="font-bold">Raghav</span>.
      </Text>
      <Text className="text-[18px]">
        I'm currently pursuing a <span className="italic">Masters Student</span>{" "}
        in Computer Science at the{" "}
        <span className="underline">Technical University of Eindhoven</span>{" "}.
        I'm interested in the intersection of systems architecture and machine learning.
        I have 2 years of professional experience in software engineering across a variety of technologies. My undergraduate studies were
        done at the Birla Institute of Technology and Science (BITS), Pilani.
      </Text>
      <Text className="text-[18px]">
        You can view some of my personal projects below. I also write from time to time: if you're interested in reading some of my work, check out the blog!
        I'm always looking for new opportunites! If you'd like to get in touch with me, you can contact find my contact information here.
      </Text>
    </div>
  );
}

export default Home;
