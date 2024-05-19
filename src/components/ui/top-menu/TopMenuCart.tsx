import { useCartStore } from "@/store"
import Link from "next/link"
import { IoCartOutline } from "react-icons/io5"

interface Props {
    loaded: boolean;
}

export const TopMenuCart = ({loaded}:Props) => {
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

    return (
        <Link href={ (totalItemsInCart === 0 && loaded) ? "/empty" :"/cart"} 
        className="mx-2">
          <div className="relative">
            { (loaded && totalItemsInCart > 0)  && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )

            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
    )
}