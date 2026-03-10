import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ShoppingCart, Tag, Clock, ExternalLink } from 'lucide-react';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all hover:shadow-xl hover:shadow-primary-500/5"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Tag className="w-12 h-12 opacity-20" />
          </div>
        )}
        
        <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
          product.availability 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
            : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          {product.availability ? 'In Stock' : 'Out of Stock'}
        </div>

        <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors flex items-center justify-center pointer-events-none">
          <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-primary-600 font-extrabold text-lg">{formattedPrice}</span>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 min-h-[40px]">
          {product.description || 'No description provided for this item.'}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 font-medium">
          <div className="flex items-center gap-1.5">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>SKU: {product.sku}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded-xl transition-all border border-slate-200 active:scale-95 font-semibold"
          >
            <Edit2 className="w-4 h-4 text-primary-500" />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center w-11 h-11 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-all border border-slate-200 hover:border-rose-200 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
