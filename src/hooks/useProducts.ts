import { useState, useEffect } from 'react'
import { supabase, Product } from '../lib/supabase'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getProductById = (id: string) => {
    return products.find(product => product.id === id)
  }

  const getActiveProducts = () => {
    return products.filter(product => product.status === 'active')
  }

  return {
    products,
    loading,
    error,
    getProductById,
    getActiveProducts,
    refetch: fetchProducts,
  }
}