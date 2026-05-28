'use client'

import { useState, useRef } from 'react'
import { Building2, Camera, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/lib/i18n/provider'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type SupplierLogoUploadProps = {
  value: string | null
  onChange: (url: string | null) => void
  companyId: string
}

export function SupplierLogoUpload({ value, onChange, companyId }: SupplierLogoUploadProps) {
  const { t } = useI18n()
  const supabase = createClient()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
      toast.error('Invalid file type. Please upload a PNG, JPG or WEBP image.')
      return
    }

    // Validate file size (1MB)
    if (file.size > 1024 * 1024) {
      toast.error('File too large. Max 1MB allowed.')
      return
    }

    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${companyId}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('supplier-logos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('supplier-logos')
        .getPublicUrl(filePath)

      onChange(publicUrl)
      toast.success('Logo uploaded successfully')
    } catch (error) {
      console.error('Error uploading logo:', error)
      toast.error('Failed to upload logo. Make sure the "supplier-logos" bucket exists.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    onChange(null)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted/30">
          {value ? (
            <img
              src={value}
              alt="Company logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
              <Building2 className="h-10 w-10" />
            </div>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-full"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="mr-2 h-3.5 w-3.5" />
              {value ? t('supplierProfile.changeLogo') : t('supplierProfile.uploadLogo')}
            </Button>
            
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                disabled={isUploading}
                onClick={handleRemove}
              >
                <X className="mr-2 h-3.5 w-3.5" />
                {t('supplierProfile.removeLogo')}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {t('supplierProfile.logoHint')}
          </p>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleUpload}
      />
    </div>
  )
}
