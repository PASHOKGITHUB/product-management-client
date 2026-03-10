import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    availability: true,
    images: ['']
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        sku: product.sku,
        availability: product.availability,
        images: product.images.length > 0 ? product.images : ['']
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        sku: '',
        availability: true,
        images: ['']
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.filter(img => img.trim() !== '')
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">
            {product ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Product Name</label>
              <input
                required
                type="text"
                placeholder="Ex: Quantum X1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none placeholder:text-slate-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">SKU (Unique Identifier)</label>
              <input
                required
                type="text"
                placeholder="Ex: PRD-001"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none placeholder:text-slate-400"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Price (USD)</label>
              <input
                required
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none placeholder:text-slate-400"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Availability</label>
              <div className="flex items-center gap-4 h-[52px]">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, availability: true })}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl border transition-all font-medium ${
                    formData.availability 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Available</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, availability: false })}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl border transition-all font-medium ${
                    !formData.availability 
                      ? 'bg-rose-50 border-rose-500 text-rose-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Out of Stock</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-600">Description</label>
              <textarea
                placeholder="Brief description of the product..."
                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none resize-none placeholder:text-slate-400"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-600">Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none placeholder:text-slate-400"
                value={formData.images[0]}
                onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Saving...' : (product ? 'Update Changes' : 'Create Product')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductModal;
