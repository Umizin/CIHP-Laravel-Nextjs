import { motion, MotionValue } from "framer-motion";

interface ImagemAnimadaProps {
  src: string;
  opacity: MotionValue<number>;
}

export default function ImagemAnimada({ src, opacity }: ImagemAnimadaProps) {
  return (
    <motion.img
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      style={{ opacity }}
    />
  );
}