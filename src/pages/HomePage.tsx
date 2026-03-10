import { Package, Search, Plus, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { ProductService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts(search, page, 10);
      setProducts(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, page]);

  const handleCreate = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await ProductService.deleteProduct(id);
      fetchProducts();
    }
  };

  const handleSave = async (data: Partial<Product>) => {
    if (selectedProduct) {
      await ProductService.updateProduct(selectedProduct.id, data);
    } else {
      await ProductService.createProduct(data);
    }
    setIsModalOpen(false);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary-500/10">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-600 rounded-lg shadow-sm">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 italic">PROLIST</span>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Product</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            <p className="text-slate-500 font-medium">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => handleEdit(product)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))}
            </div>
            
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    page === p
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your search or create a new product.</p>
          </div>
        )}
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </div>
  );
};

export default HomePage;
