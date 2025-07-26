import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Trash2, Type, Palette, Sparkles, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { MemeElement } from "@/pages/MemeEditor"

interface TextEditorProps {
  element?: MemeElement
  onUpdate: (updates: Partial<MemeElement>) => void
  onDelete: () => void
}

const fontFamilies = [
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana", 
  "Comic Sans MS", "Impact", "Trebuchet MS", "Arial Black", "Courier New"
]

const fontWeights = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "100", label: "Thin" },
  { value: "300", label: "Light" },
  { value: "500", label: "Medium" },
  { value: "700", label: "Bold" },
  { value: "900", label: "Black" }
]

const textColors = [
  "#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", 
  "#ffff00", "#ff00ff", "#00ffff", "#orange", "#purple"
]

const shadowPresets = [
  { name: "None", value: "none" },
  { name: "Light", value: "1px 1px 2px rgba(0,0,0,0.5)" },
  { name: "Medium", value: "2px 2px 4px rgba(0,0,0,0.8)" },
  { name: "Heavy", value: "3px 3px 6px rgba(0,0,0,0.9)" },
  { name: "Glow", value: "0 0 10px rgba(255,255,255,0.8)" },
  { name: "Outline", value: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }
]

export function TextEditor({ element, onUpdate, onDelete }: TextEditorProps) {
  const [text, setText] = useState(element?.content || "")
  const [fontSize, setFontSize] = useState(element?.style?.fontSize || 24)
  const [fontFamily, setFontFamily] = useState(element?.style?.fontFamily || "Arial")
  const [fontWeight, setFontWeight] = useState(element?.style?.fontWeight || "bold")
  const [color, setColor] = useState(element?.style?.color || "#ffffff")
  const [textShadow, setTextShadow] = useState(element?.style?.textShadow || "2px 2px 4px rgba(0,0,0,0.8)")
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(element?.style?.textAlign || "center")

  useEffect(() => {
    if (element) {
      setText(element.content)
      setFontSize(element.style?.fontSize || 24)
      setFontFamily(element.style?.fontFamily || "Arial")
      setFontWeight(element.style?.fontWeight || "bold")
      setColor(element.style?.color || "#ffffff")
      setTextShadow(element.style?.textShadow || "2px 2px 4px rgba(0,0,0,0.8)")
      setTextAlign(element.style?.textAlign || "center")
    }
  }, [element])

  const handleUpdate = () => {
    onUpdate({
      content: text,
      style: {
        fontSize,
        fontFamily,
        fontWeight,
        color,
        textShadow,
        textAlign
      }
    })
  }

  useEffect(() => {
    handleUpdate()
  }, [fontSize, fontFamily, fontWeight, color, textShadow, textAlign])

  if (!element || element.type !== 'text') {
    return (
      <div className="text-white/60 text-center py-4">
        Select a text element to edit
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Type className="w-4 h-4" />
          Text Editor
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="border-red-400 text-red-400 hover:bg-red-400/10"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Text Content */}
      <div>
        <Label className="text-white/80 text-sm">Text Content</Label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleUpdate}
          className="mt-2 bg-white/10 border-white/30 text-white placeholder:text-white/50"
          placeholder="Enter your text..."
        />
      </div>

      {/* Font Family */}
      <div>
        <Label className="text-white/80 text-sm">Font Family</Label>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="mt-2 bg-white/10 border-white/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div>
        <Label className="text-white/80 text-sm">Font Size: {fontSize}px</Label>
        <Slider
          value={[fontSize]}
          onValueChange={([value]) => setFontSize(value)}
          min={12}
          max={72}
          step={1}
          className="mt-2"
        />
      </div>

      {/* Font Weight */}
      <div>
        <Label className="text-white/80 text-sm">Font Weight</Label>
        <Select value={fontWeight} onValueChange={setFontWeight}>
          <SelectTrigger className="mt-2 bg-white/10 border-white/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontWeights.map((weight) => (
              <SelectItem key={weight.value} value={weight.value}>
                {weight.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text Alignment */}
      <div>
        <Label className="text-white/80 text-sm">Text Alignment</Label>
        <div className="flex gap-2 mt-2">
          <Button
            variant={textAlign === 'left' ? 'default' : 'outline'}
            size="sm"
            className="border-white/30"
            onClick={() => setTextAlign('left')}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant={textAlign === 'center' ? 'default' : 'outline'}
            size="sm"
            className="border-white/30"
            onClick={() => setTextAlign('center')}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant={textAlign === 'right' ? 'default' : 'outline'}
            size="sm"
            className="border-white/30"
            onClick={() => setTextAlign('right')}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Text Color */}
      <div>
        <Label className="text-white/80 text-sm flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Text Color
        </Label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {textColors.map((colorOption) => (
            <button
              key={colorOption}
              className={`w-8 h-8 rounded border-2 ${
                color === colorOption ? 'border-white' : 'border-white/30'
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setColor(colorOption)}
            />
          ))}
        </div>
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-2 w-full h-8 bg-white/10 border-white/30"
        />
      </div>

      {/* Text Shadow */}
      <div>
        <Label className="text-white/80 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Text Shadow
        </Label>
        <Select value={textShadow} onValueChange={setTextShadow}>
          <SelectTrigger className="mt-2 bg-white/10 border-white/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shadowPresets.map((shadow) => (
              <SelectItem key={shadow.name} value={shadow.value}>
                {shadow.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preview */}
      <div>
        <Label className="text-white/80 text-sm">Preview</Label>
        <div
          className="mt-2 p-4 bg-gray-500 rounded border text-center"
          style={{
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            color: color,
            textShadow: textShadow,
            textAlign: textAlign
          }}
        >
          {text || "Sample Text"}
        </div>
      </div>
    </div>
  )
}