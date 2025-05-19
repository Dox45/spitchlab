import { Check } from "lucide-react"

export default function FeatureList() {
  const features = [
    {
      category: "Audio Features",
      items: ["Voice Customization", "Audio Formatting", "Speech Enhancement"],
    },
    {
      category: "Content Creation",
      items: ["Batch Processing", "Translation & Dubbing", "Emotion Control"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {features.map((category, index) => (
        <div key={index} className="flex flex-col items-center md:items-start">
          <h4 className="text-sm font-medium text-black mb-3">{category.category}</h4>
          <ul className="space-y-2">
            {category.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="bg-[rgb(209,44,44)] p-1 rounded-full">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
