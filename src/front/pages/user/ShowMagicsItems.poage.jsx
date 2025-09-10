import { MagicItemCard } from "../../components/MagicItemCard"
import useGlobalReducer from "../../hooks/useGlobalReducer"

export const ShowMagicsItemsPage = () => {

    const { store } = useGlobalReducer()

    return (
        <>
        <h1 className="text-center mt-5">Aqui esta tu lista de articulos magicos</h1>

        {
            store.magicItem?.length > 0 ?
            store.magicItem?.map(magicItem => (
                <MagicItemCard key={magicItem.id} item={magicItem}/>
            ))
            :
            <h1 className="text-center mt-5">***** No tienes ningun articulo creado *****</h1>
        }

        </>
    )
}