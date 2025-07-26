import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Link, Grid } from "lucide-react"
import { GridConfig } from "@/pages/MemeEditor"

interface ImageUploaderProps {
  onImageAdd: (imageUrl: string, gridIndex: number) => void
  gridConfig: GridConfig
}

export function ImageUploader({ onImageAdd, gridConfig }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [selectedGrid, setSelectedGrid] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageAdd(result, selectedGrid)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlAdd = () => {
    if (imageUrl.trim()) {
      onImageAdd(imageUrl, selectedGrid)
      setImageUrl("")
    }
  }

  const handleSampleImage = () => {
    // Add a sample placeholder image
    const sampleUrl = "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&h=300"
    onImageAdd(sampleUrl, selectedGrid)
  }

  const totalGrids = gridConfig.rows * gridConfig.cols

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Add Images
      </h3>

      {/* Grid Selection */}
      <div>
        <Label className="text-white/80 text-sm">Target Grid Cell</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {Array.from({ length: totalGrids }, (_, index) => (
            <Button
              key={index}
              variant={selectedGrid === index ? "default" : "outline"}
              size="sm"
              className={`h-8 text-xs ${
                selectedGrid === index 
                  ? "bg-primary text-primary-foreground" 
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              onClick={() => setSelectedGrid(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <Label className="text-white/80 text-sm">Upload Image</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          className="w-full mt-2 border-white/30 text-white hover:bg-white/10"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </Button>
      </div>

      {/* URL Input */}
      <div>
        <Label className="text-white/80 text-sm">Image URL</Label>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
          <Button
            variant="outline"
            size="icon"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={handleUrlAdd}
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sample Images */}
      <div>
        <Label className="text-white/80 text-sm">Quick Start</Label>
        <div className="space-y-2 mt-2">
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
            onClick={handleSampleImage}
          >
            <Grid className="w-4 h-4 mr-2" />
            Add Sample Image
          </Button>
        </div>
      </div>

      {/* Popular Meme Templates */}
      <div>
        <Label className="text-white/80 text-sm">Popular Templates</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            { name: "Drake", url: "https://i.imgflip.com/30b1gx.jpg" },
            { name: "Distracted Boyfriend", url: "https://i.imgflip.com/1ur9b0.jpg" },
            { name: "Two Buttons", url: "https://i.imgflip.com/1g8my4.jpg" },
            { name: "Change My Mind", url: "https://i.imgflip.com/24y43o.jpg" }
          ].map((template) => (
            <Button
              key={template.name}
              variant="outline"
              size="sm"
              className="text-xs border-white/30 text-white hover:bg-white/10"
              onClick={() => onImageAdd(template.url, selectedGrid)}
            >
              {template.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}