import React, {useEffect, useState} from "react";

function Pagination({totalPages,currentPage=null,nextBtnText="Next",prevBtnText="Prev",spread=2,getNextPageNumber}) {

    const [selectedPage, setSelectedPage] = useState(currentPage)
    const [itemsListToRender, setItemsListToRender] = useState([])
    const [numbersOfItemsToRender, setNumbersOfItemsToRender] = useState(null)
    const [showPrevBtn, setShowPrevBtn] = useState(false)
    const [showNextBtn, setShowNextBtn] = useState(false)

    /**request next page*/
    function nextPage(){
        if (selectedPage <= totalPages - 1){
            getNextPageNumber(currentPage+1)
        }
    }

    /**request prev page*/
    function prevPage(){
        if(selectedPage>1){
            getNextPageNumber(currentPage-1)
        }
    }

    /** generate last number to display in pagination*/
    const generateEndNumber = (spread) => {
        let normalEnd = selectedPage + spread
        let end
        if (normalEnd >= totalPages){
            end = totalPages
        }else if(normalEnd <= numbersOfItemsToRender){
            end = numbersOfItemsToRender
        }else {
            end = totalPages
        }
        return end
    }

    /** generate last number to display in pagination*/
    const generateStartNumber = (spread,end) => {
        let normalStart = selectedPage - spread
        let start;
        if (normalStart<=1){
            start = 1
        }else if(((end+1)-normalStart) >= numbersOfItemsToRender){
            start = normalStart
        }else {
            start = (end - (numbersOfItemsToRender))+1
        }

        return start;
    }

    function generateItemsToRender(spread){
        let numbersOfItemsToRender = (spread * 2)+1;

        setNumbersOfItemsToRender(numbersOfItemsToRender >= totalPages ? totalPages : numbersOfItemsToRender)
        const itemsToRender = []

        let end = generateEndNumber(spread)

        let start = generateStartNumber(spread, end)

        Array.from(Array(numbersOfItemsToRender),(e,i)=>{
            if((start+i) <= end){
                itemsToRender.push(start+i)
            }
        })
        setItemsListToRender(itemsToRender)
    }

    useEffect(()=>{
        if (selectedPage||totalPages){
            generateItemsToRender(spread)
        }

        if (currentPage!==null){
            setSelectedPage(currentPage+1)
        }

        setShowNextBtn(selectedPage < totalPages)
        setShowPrevBtn(selectedPage > 1)

    },[selectedPage,totalPages,currentPage])

    function renderItem(p){
        if (selectedPage === (p)){
            return <div className={"w-4 px-4 border-2 border-solid cursor-pointer"} onClick={()=>{getNextPageNumber(p-1)}}>{p}</div>
        }else {
            return <div className={"w-4 px-4 cursor-pointer"} onClick={()=>{getNextPageNumber(p-1)}}>{p}</div>
        }
    }

    return (
        <div className={"flex flex-row"}>
            {showPrevBtn && <div className={"cursor-pointer"} onClick={() => {prevPage()}}>{`${prevBtnText}  .. `}</div>}
            {
                itemsListToRender.map((p,i) => {
                    return <div key={i}>{renderItem(p)}</div>
                })
            }
            {showNextBtn && <div className={"cursor-pointer"} onClick={() => {nextPage()}}>{` .. ${nextBtnText}`}</div>}
        </div>
    )
}
export default Pagination;
