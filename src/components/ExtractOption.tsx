'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"

type ExtractOptionProps = {
  setExtractColumns: (columns: string[]) => void
}

export const ExtractOption: React.FC<ExtractOptionProps> = ({ setExtractColumns }) => {
  const [inputs, setInputs] = useState<string[]>(['デッキコード'])

  const addInput = () => {
    setInputs([...inputs, ''])
  }

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index)
    setInputs(newInputs)
  }

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  useEffect(() => {
    setExtractColumns(inputs)
  }
    , [inputs])


  return (
    <div className="my-4 max-w-md mx-auto">
      <div className="text-sm text-gray-600">
        デッキコードの情報がある列の列名を入力してください<br />
        複数行ある場合は、それぞれの列名を入力してください
      </div>
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center space-x-2 my-1">
          <Input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`列名 ${index + 1}`}
            aria-label={`列名 ${index + 1}`}
          />
          {inputs.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeInput(index)}
              aria-label={`列名 ${index + 1} を削除`}
            >
              <X className="h-4 w-4 text-red-600" />
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addInput} className="mt-2 w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        入力欄を追加
      </Button>
    </div>
  )
}