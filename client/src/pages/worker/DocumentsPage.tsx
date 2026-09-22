import React, { useState } from 'react';
import { FileText, Upload, Trash2, Eye, Download, ShieldCheck, Plus, X } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';
import API from '../../config/api';

export const DocumentsPage: React.FC = () => {
  const { language } = useUIStore();
  const [documents, setDocuments] = useState<any[]>([
    { _id: '1', type: 'aadhaar', name: 'Aadhaar Card', url: '/sample-aadhaar.pdf', isVerified: true, uploadedAt: '2026-07-01' },
    { _id: '2', type: 'resume', name: '6G Welder Resume', url: '/sample-resume.pdf', isVerified: false, uploadedAt: '2026-07-15' },
  ]);

  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [docType, setDocType] = useState('aadhaar');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('type', docType);
    formData.append('name', file.name);
    formData.append('file', file);

    try {
      const res = await API.post('/worker/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setDocuments(res.data.documents);
        setFile(null);
      }
    } catch (err) {
      // Local fallback representation
      const newDoc = {
        _id: Date.now().toString(),
        type: docType,
        name: file.name,
        url: URL.createObjectURL(file),
        isVerified: false,
        uploadedAt: new Date().toISOString().split('T')[0],
      };
      setDocuments((prev) => [...prev, newDoc]);
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'दस्तावेज़ प्रबंधक (Documents Manager)' : 'My Documents Manager'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'अपना आधार, पैन कार्ड, मेडिकल प्रमाण पत्र और रिज्यूम अपलोड करें'
              : 'Upload and manage Aadhaar, PAN, Resume, Medical, & Experience Letters'}
          </p>
        </div>

        {/* Upload New Document Box */}
        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-industrial-600" />
            <span>{language === 'hi' ? 'नया दस्तावेज़ अपलोड करें' : 'Upload New Document'}</span>
          </h3>

          <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                {language === 'hi' ? 'दस्तावेज़ का प्रकार (Type)' : 'Document Type'}
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-sm outline-none"
              >
                <option value="aadhaar">Aadhaar Card (आधार)</option>
                <option value="pan">PAN Card (पैन)</option>
                <option value="resume">Resume / CV (रिज्यूम)</option>
                <option value="medical">Medical Fitness (मेडिकल)</option>
                <option value="experience_letter">Experience Letter (अनुभव पत्र)</option>
                <option value="certificate">Trade Certificate (प्रमाण पत्र)</option>
                <option value="bank_passbook">Bank Passbook (बैंक)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                {language === 'hi' ? 'फ़ाइल चुनें (PDF/Image)' : 'Choose File'}
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-1.5 text-xs text-gray-700"
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" isLoading={uploading} disabled={!file} className="w-full">
                {language === 'hi' ? 'अपलोड करें' : 'Upload File'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Documents Table / Grid */}
        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-industrial-50 text-industrial-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 uppercase">{doc.type}</span>
                    {doc.isVerified ? (
                      <Badge variant="green">✅ Verified</Badge>
                    ) : (
                      <Badge variant="yellow">⏳ Pending Verification</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <a
                  href={doc.url}
                  download
                  className="px-3 py-1.5 bg-industrial-50 hover:bg-industrial-100 text-industrial-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Document Preview Modal */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 className="font-bold text-lg text-slate-900">{previewDoc.name}</h3>
                <button onClick={() => setPreviewDoc(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                <p className="text-sm font-medium">[PDF / Image Preview Viewport: {previewDoc.url}]</p>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setPreviewDoc(null)}>Close Preview</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
