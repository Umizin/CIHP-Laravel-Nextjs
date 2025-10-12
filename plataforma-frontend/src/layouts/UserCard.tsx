// components/ProfileCard.tsx
import { Mail, MapPin, Globe } from "lucide-react";

type InfoItem = {
  icon: "mail" | "map" | "globe";
  value: string;
};

type Props = {
  name: string;
  subtitle?: string;
  avatarLetter?: string;
  infoItems: InfoItem[];
  className?: string;
  variant?: "vertical" | "horizontal";
};

export default function UserCard({
  name,
  subtitle,
  avatarLetter,
  infoItems,
  className = "",
  variant = "vertical",
}: Props) {
  const isHorizontal = variant === "horizontal";

  const renderIcon = (icon: InfoItem["icon"]) => {
    switch (icon) {
      case "mail":
        return <Mail size={16} />;
      case "map":
        return <MapPin size={16} />;
      case "globe":
        return <Globe size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-4 border border-gray-200
      ${isHorizontal ? "w-full" : "w-64 text-center"} ${className}`}
    >
      {isHorizontal ? (
        // Layout horizontal (para mobile)
        <div className="flex items-center gap-4">
          {/* Avatar + nome */}
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full text-2xl font-semibold"
              style={{ backgroundColor: "#E3E3FF", color: "#1C1C83" }}
            >
              {avatarLetter || name.charAt(0)}
            </div>
            <h2 className="font-semibold text-gray-800 leading-tight">{name}</h2>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>

          {/* Informações */}
          <div className="flex-1 text-sm text-gray-600 space-y-1">
            {infoItems.map((item, i) => (
              <p key={i} className="flex items-center gap-2">
                {renderIcon(item.icon)}
                {item.value}
              </p>
            ))}
          </div>
        </div>
      ) : (
        // Layout vertical (para desktop)
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full text-3xl font-semibold"
            style={{ backgroundColor: "#E3E3FF", color: "#1C1C83" }}
          >
            {avatarLetter || name.charAt(0)}
          </div>
          <h2 className="mt-2 font-semibold text-gray-800">{name}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

          <div className="mt-4 space-y-2 text-sm text-gray-600 text-left w-full">
            {infoItems.map((item, i) => (
              <p key={i} className="flex items-center gap-2">
                {renderIcon(item.icon)}
                {item.value}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
