import { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon, Maximize } from 'lucide-react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
    uploadPreset?: string;
}

export const ImageUpload = ({ value, onChange, className = '', uploadPreset }: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check for env variables
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

        if (!cloudName) {
            setError("Cloudinary config missing. Please check your .env");
            return;
        }

        if (!uploadPreset) {
            setError("No upload preset specified for this image.");
            return;
        }

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        if (apiKey) {
            formData.append('api_key', apiKey);
        }

        try {
            const endpointType = uploadPreset === 'documents' ? 'auto' : 'image';
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/${endpointType}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to upload image');
            }

            onChange(data.secure_url);
        } catch (err: any) {
            console.error('Upload Error:', err);
            setError(err.message || 'Error uploading to Cloudinary');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset input
            }
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#09090b] w-full max-w-[280px]">
                    {uploadPreset === 'documents' && value.endsWith('.pdf') ? (
                        <div className="w-full h-[160px] flex flex-col items-center justify-center bg-gray-800 text-gray-300 gap-2">
                            <span className="font-bold text-lg">PDF Document</span>
                            <span className="text-xs truncate px-4">{value.split('/').pop()}</span>
                        </div>
                    ) : (
                        <img src={value} alt="Uploaded preview" className="w-full h-auto object-contain max-h-[160px]" />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                        <button
                            type="button"
                            onClick={() => setIsFullscreen(true)}
                            className="bg-gray-600/80 hover:bg-gray-500 text-white p-2 rounded-lg transition-colors"
                            title="View Larger"
                        >
                            <Maximize size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
                            title="Replace Image"
                        >
                            <UploadCloud size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                            title="Remove Image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-xl p-8 bg-[#09090b] text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 group"
                >
                    <div className="p-3 bg-white/5 group-hover:bg-blue-500/10 rounded-full transition-colors text-gray-400 group-hover:text-blue-400">
                        {isUploading ? <Loader2 size={24} className="animate-spin" /> : <ImageIcon size={24} />}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-300">
                            {isUploading ? 'Uploading to Cloudinary...' : 'Click to upload image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {uploadPreset === 'documents' ? 'PDF up to 10MB' : 'PNG, JPG, WEBP up to 10MB'}
                        </p>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept={uploadPreset === 'documents' ? ".pdf" : "image/*"}
                onChange={handleUpload}
                className="hidden"
            />

            {error && <p className="text-xs text-red-400">{error}</p>}

            {/* Fallback to manual URL entry just in case */}
            <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-500 shrink-0">Or paste URL:</span>
                <input
                    type="url"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded text-xs px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://..."
                />
            </div>
            {/* Fullscreen Modal Image Viewer */}
            {isFullscreen && value && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setIsFullscreen(false)}
                >
                    <button
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                        title="Close"
                    >
                        <X size={24} />
                    </button>
                    <img
                        src={value}
                        alt="Full screen preview"
                        className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};
