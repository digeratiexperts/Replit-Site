import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eraser, Pen, Type, RotateCcw } from 'lucide-react';

interface SignatureCaptureProps {
  onSignatureChange: (signature: string | null, type: 'drawn' | 'typed') => void;
  signerName?: string;
  disabled?: boolean;
}

export function SignatureCapture({ onSignatureChange, signerName = '', disabled = false }: SignatureCaptureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [typedSignature, setTypedSignature] = useState(signerName);
  const [activeTab, setActiveTab] = useState<'draw' | 'type'>('draw');
  const [penSize, setPenSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [penSize]);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    setHasDrawn(true);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let x, y;
    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * scaleX;
      y = (e.touches[0].clientY - rect.top) * scaleY;
    } else {
      x = (e.clientX - rect.left) * scaleX;
      y = (e.clientY - rect.top) * scaleY;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [disabled]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let x, y;
    if ('touches' in e) {
      e.preventDefault();
      x = (e.touches[0].clientX - rect.left) * scaleX;
      y = (e.touches[0].clientY - rect.top) * scaleY;
    } else {
      x = (e.clientX - rect.left) * scaleX;
      y = (e.clientY - rect.top) * scaleY;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing, disabled]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      const signatureData = canvas.toDataURL('image/png');
      onSignatureChange(signatureData, 'drawn');
    }
  }, [isDrawing, hasDrawn, onSignatureChange]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onSignatureChange(null, 'drawn');
  }, [onSignatureChange]);

  const handleTypedSignatureChange = useCallback((value: string) => {
    setTypedSignature(value);
    if (value.trim()) {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'italic 48px "Brush Script MT", cursive, serif';
        ctx.fillStyle = '#1a1a2e';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, canvas.width / 2, canvas.height / 2);
        onSignatureChange(canvas.toDataURL('image/png'), 'typed');
      }
    } else {
      onSignatureChange(null, 'typed');
    }
  }, [onSignatureChange]);

  return (
    <div className="w-full space-y-4" data-testid="signature-capture">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'draw' | 'type')}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger 
            value="draw" 
            className="data-[state=active]:bg-[#D3126A] data-[state=active]:text-white"
            data-testid="tab-draw-signature"
          >
            <Pen className="w-4 h-4 mr-2" />
            Draw Signature
          </TabsTrigger>
          <TabsTrigger 
            value="type"
            className="data-[state=active]:bg-[#D3126A] data-[state=active]:text-white"
            data-testid="tab-type-signature"
          >
            <Type className="w-4 h-4 mr-2" />
            Type Signature
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="draw" className="mt-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className={`w-full border-2 border-dashed rounded-lg cursor-crosshair touch-none
                ${disabled ? 'opacity-50 cursor-not-allowed border-slate-600' : 'border-[#D3126A]/50 hover:border-[#D3126A]'}
                bg-white`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              data-testid="signature-canvas"
            />
            {!hasDrawn && !disabled && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-slate-400 text-sm">Sign here with your mouse or finger</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Pen Size:</span>
              <input
                type="range"
                min="1"
                max="6"
                value={penSize}
                onChange={(e) => setPenSize(Number(e.target.value))}
                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                disabled={disabled}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCanvas}
              disabled={disabled || !hasDrawn}
              className="border-slate-600 hover:bg-slate-800"
              data-testid="button-clear-signature"
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="type" className="mt-4 space-y-4">
          <Input
            type="text"
            placeholder="Type your full name"
            value={typedSignature}
            onChange={(e) => handleTypedSignatureChange(e.target.value)}
            disabled={disabled}
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            data-testid="input-typed-signature"
          />
          
          {typedSignature && (
            <div className="p-6 bg-white rounded-lg border-2 border-dashed border-[#D3126A]/50">
              <p 
                className="text-4xl text-center text-slate-800"
                style={{ fontFamily: '"Brush Script MT", cursive, serif', fontStyle: 'italic' }}
              >
                {typedSignature}
              </p>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTypedSignatureChange('')}
            disabled={disabled || !typedSignature}
            className="border-slate-600 hover:bg-slate-800"
            data-testid="button-clear-typed-signature"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SignatureCapture;
