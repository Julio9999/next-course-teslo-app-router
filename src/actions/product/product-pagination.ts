'use server';

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";



interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: string | null;
}

export const getPaginatedProductsWithImages = async({
    page = 1,
    take = 12,
    gender = null
}: PaginationOptions) => {


    if(isNaN(Number(page))) page = 1;

    if(page < 1) page = 1;
    


    try {
        let products;
        // 1. Obtener los productos
        if(gender){
            products = await prisma.product.findMany({
                take: take,
                skip: (page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true
                        }
                    }
                },
                where: {gender: gender as Gender}
            })
        } else{
            products = await prisma.product.findMany({
                take: take,
                skip: (page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true
                        }
                    }
                },
            })
        }


        // 2.Obtener el total de paginas
        let totalCount = await prisma.product.count({})
        let totalPages = Math.ceil(totalCount / take);
        if(gender){
            totalCount = await prisma.product.count({where: {gender: gender as Gender}})
            totalPages = Math.ceil(totalCount / take);
        }else{
            totalCount = await prisma.product.count({})
            totalPages = Math.ceil(totalCount / take);
        }

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        };


        
    } catch (error) {
        throw new Error('No se pudo cargar los productos')
    }
}