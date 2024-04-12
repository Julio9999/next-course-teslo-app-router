export const revalidate = 60;
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound, redirect } from 'next/navigation';

const seedProducts = initialData.products;


interface Props {
  searchParams: {
    page?: string;
  },
  params: {
    gender: string;
  }
}


export default async function GenderPage({ searchParams, params }: Props) {

  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender })

  if(products.length === 0){
    redirect(`/gender/${gender}`)
  }

  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  return (
    <>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination
        totalPages={totalPages}
      />

    </>
  );
}