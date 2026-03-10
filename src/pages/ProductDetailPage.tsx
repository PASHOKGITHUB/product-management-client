import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Tag, Clock, CheckCircle2, AlertCircle, Package } from 'lucide-react';
import { Product } from '../types/product';
import { ProductService } from '../services/productService';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await ProductService.getProductById(id);
        if (data && (data.id || data.sku)) {
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Package className="w-12 h-12 text-primary-600" />
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
        <Link to="/" className="text-primary-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to listing
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary-500/10 pb-20">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <span className="text-xl font-bold tracking-tight text-slate-900 italic">PROLIST</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
          >
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200">
                <Package className="w-32 h-32" />
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary-100">
              <Tag className="w-3 h-3" />
              <span>Premium Hardware</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span>SKU: {product.sku}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="text-5xl font-black text-primary-600 mb-8">
              {formattedPrice}
            </div>

            <div className={`flex items-center gap-2 mb-8 p-4 rounded-2xl border ${
              product.availability 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}>
              {product.availability ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold">In Stock & Ready to Dispatch</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  <span className="font-bold">Temporarily Out of Stock</span>
                </>
              )}
            </div>

            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-bold text-slate-900">Description</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description || 'No description provided for this item.'}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-10">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]">
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
