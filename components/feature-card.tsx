import { Mic, Users, Zap, Settings } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  color: string
  iconColor: string
}

export default function FeatureCard({ icon, title, description, color, iconColor }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "voice-inflection":
        return <Mic className={`h-8 w-8 ${iconColor}`} />
      case "multi-voice":
        return <Users className={`h-8 w-8 ${iconColor}`} />
      case "preview-mode":
        return <Zap className={`h-8 w-8 ${iconColor}`} />
      case "custom-voice":
        return <Settings className={`h-8 w-8 ${iconColor}`} />
      default:
        return <Mic className={`h-8 w-8 ${iconColor}`} />
    }
  }

  return (
    <div className={`${color} p-6 rounded-xl hover:scale-105 transition-transform duration-300`}>
      <div className="mb-4">{getIcon()}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-black text-sm">{description}</p>
    </div>
  )
}
