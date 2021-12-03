import { INITIAL_STATE_MERCHANTS } from "./InitialState";
import { createReducer } from "reduxsauce";
import { MERCHANTS } from "./Actions"

export const getAllMerchantsByCategory = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getAllMerchantsByCategorySuccess = ( state, { data } )=>{
    return {
        ...state,
        merchantsList: data
    }
}

export const getAllMerchantsByCategoryFailure = ( state, { data } )=>{
    return {
        ...state,
        error: data
    }
}

export const searchMerchantsForBrand= ( state, { data } )=>{
    return {
        ...state
    }
}

export const searchMerchantsForBrandSuccess = ( state, { data } )=>{
    return {
        ...state,
        merchantsList: data
    }
}

export const searchMerchantsForBrandFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}


export const getMerchant = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getMerchantSuccess = ( state, { data } )=>{
    return {
        ...state,
        merchant: data
    }
}

export const getMerchantFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const setSelectedMerchantId = ( state, { data } )=>{
    return {
        ...state
    }
}

export const setSelectedMerchantIdSuccess = ( state, { data } )=>{
    return {
        ...state,
        selectedMerchantId: data
    }
}

export const setSelectedMerchantIdFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const updateMerchant = ( state, { data } )=>{
    return {
        ...state
    }
}

export const updateMerchantSuccess = ( state, { data } )=>{
    //TODO: change merchantsList to merchant once API is connected
    return {
        ...state,
        merchantsList: data
    }
}

export const updateMerchantFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getPendingMerchantsList = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getPendingMerchantsListSuccess = ( state, { data } )=>{
    //TODO: change merchantsList to merchant once API is connected
    return {
        ...state,
        merchantsListToApprove: data
    }
}

export const getPendingMerchantsListFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getAllMerchants = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getAllMerchantsSuccess = ( state, { data } )=>({
        ...state,
        merchantsList: data
    })

export const getAllMerchantsFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const handleMerchantApproval = ( state, { data } )=>{
    return {
        ...state
    }
}

export const handleMerchantApprovalSuccess = ( state, { data } )=>({
    ...state,
    merchantsList: data
})

export const handleMerchantApprovalFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const ApproveMerchant = ( state, { data } )=>{
    return {
        ...state
    }
}

export const ApproveMerchantSuccess = ( state, { data } )=>({
    ...state,
    merchantsListToApprove: data
})

export const ApproveMerchantFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getMerchantSummery = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getMerchantSummerySuccess = ( state, { data } )=>({
    ...state,
    merchantSummery: data
})

export const getMerchantSummeryFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const searchMerchantsForCategory = ( state, { data } )=>{
    return {
        ...state
    }
}

export const searchMerchantsForCategorySuccess = ( state, { data } )=>{
    return {
        ...state,
        merchantsList: data
    }
}

export const searchMerchantsForCategoryFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const handleMerchantBlocking = ( state, { data } )=>{
    return {
        ...state
    }
}

export const handleMerchantBlockingSuccess = ( state, { data } )=>(
    {
        ...state,
        merchantsList: data
    }
)



export const handleMerchantBlockingFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}


export const getPendingBusinessInfoList = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getPendingBusinessInfoListSuccess = ( state, { data } )=>(
    {
        ...state,
        pendingBusinessInfoList: data
    }
)



export const getPendingBusinessInfoListFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}


export const getPendingContactInfoList = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getPendingContactInfoListSuccess = ( state, { data } )=>(
    {
        ...state,
        pendingContactInfoList: data
    }
)

export const getPendingContactInfoListFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const approvePendingBusinessInfo= ( state, { data } )=>{
    return {
        ...state
    }
}

export const approvePendingBusinessInfoSuccess = ( state, { data } )=>(
    {
        ...state,
        pendingBusinessInfoList: data
    }
)

export const approvePendingBusinessInfoFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const approvePendingContactInfo= ( state, { data } )=>{
    return {
        ...state
    }
}

export const approvePendingContactInfoSuccess = ( state, { data } )=>(
    {
        ...state,
        pendingContactList: data
    }
)

export const approvePendingContactInfoFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getPendingBusinessDetails= ( state, { data } )=>{
    return {
        ...state
    }
}

export const getPendingBusinessDetailsSuccess = ( state, { data } )=>(
    {
        ...state,
        pendingBusinessData: data
    }
)

export const getPendingBusinessDetailsFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getPendingContactDetails= ( state, { data } )=>{
    return {
        ...state
    }
}

export const getPendingContactDetailsSuccess = ( state, { data } )=>(
    {
        ...state,
        PendingContactData: data
    }
)

export const getPendingContactDetailsFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}


export const updateMerchantBusinessInfo = ( state, { data } )=>{
    return {
        ...state
    }
}

export const updateMerchantBusinessInfoSuccess = ( state, { data } )=>(
    {
        ...state,
        merchantsList: data
    }
)

export const updateMerchantBusinessInfoFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const updateMerchantBasicInfo = ( state, { data } )=>{
    return {
        ...state
    }
}

export const updateMerchantBasicInfoSuccess = ( state, { data } )=>(
    {
        ...state,
        merchantsList: data
    }
)

export const updateMerchantBasicInfoFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const updateMerchantContactInfo = ( state, { data } )=>{
    return {
        ...state
    }
}

export const updateMerchantContactInfoSuccess = ( state, { data } )=>(
    {
        ...state,
        merchant: data
    }
)

export const updateMerchantContactInfoFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getContactInfoByMerchantId = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getContactInfoByMerchantIdSuccess = ( state, { data } )=>({
        ...state,
        merchantContactInfo: data
    }
)

export const getContactInfoByMerchantIdFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}

export const getBusinessInfoByMerchantId = ( state, { data } )=>{
    return {
        ...state
    }
}

export const getBusinessInfoByMerchantIdSuccess = ( state, { data } )=>({
        ...state,
        merchantBusinessInfo: data
    }
)

export const getBusinessInfoByMerchantIdFailure = ( state, { error } )=>{
    return {
        ...state,
        error: error
    }
}


// export const updateMerchantBusinessInfo = ( state, { data } )=>{
//     return {
//         ...state
//     }
// }

// export const updateMerchantBusinessInfoSuccess = ( state, { data } )=>(
//     {
//         ...state,
//         merchantsList: data
//     }
// )

// export const updateMerchantBusinessInfoFailure = ( state, { error } )=>{
//     return {
//         ...state,
//         error: error
//     }
// }

// export const updateMerchantBasicInfo = ( state, { data } )=>{
//     return {
//         ...state
//     }
// }

// export const updateMerchantBasicInfoSuccess = ( state, { data } )=>(
//     {
//         ...state,
//         merchantsList: data
//     }
// )

// export const updateMerchantBasicInfoFailure = ( state, { error } )=>{
//     return {
//         ...state,
//         error: error
//     }
// }

// export const updateMerchantContactInfo = ( state, { data } )=>{
//     return {
//         ...state
//     }
// }

// export const updateMerchantContactInfoSuccess = ( state, { data } )=>(
//     {
//         ...state,
//         merchant: data
//     }
// )

// export const updateMerchantContactInfoFailure = ( state, { error } )=>{
//     return {
//         ...state,
//         error: error
//     }
// }

// export const getContactInfoByMerchantId = ( state, { data } )=>{
//     return {
//         ...state
//     }
// }

// export const getContactInfoByMerchantIdSuccess = ( state, { data } )=>({
//         ...state,
//         merchantContactInfo: data
//     }
// )

// export const getContactInfoByMerchantIdFailure = ( state, { error } )=>{
//     return {
//         ...state,
//         error: error
//     }
// }

// export const getBusinessInfoByMerchantId = ( state, { data } )=>{
//     return {
//         ...state
//     }
// }

// export const getBusinessInfoByMerchantIdSuccess = ( state, { data } )=>({
//         ...state,
//         merchantBusinessInfo: data
//     }
// )

// export const getBusinessInfoByMerchantIdFailure = ( state, { error } )=>{
//     return {
//         ...state,
//         error: error
//     }
// }

export const updateCategoriesAndBrandsForMerchant = (state, { data }) => ({
    ...state,
});

export const updateCategoriesAndBrandsForMerchantSuccess = (state, { data }) => ({
    ...state,
    success: data,
});

export const updateCategoriesAndBrandsForMerchantFailure = (state, { error }) => ({
    ...state,
    error: error,
});

export const getBrandsCategoriesMappingByMerchant = (state, { data }) => ({
    ...state,
});

export const getBrandsCategoriesMappingByMerchantSuccess = (state, { data }) => ({
    ...state,
    brandsCategoriesMapping: data,
});

export const getBrandsCategoriesMappingByMerchantFailure = (state, { error }) => ({
    ...state,
    error: error,
});

export const updateMerchantEmail = (state, { data }) => ({
    ...state,
});

export const updateMerchantEmailSuccess = (state, { data }) => ({
    ...state,
    success: data,
});

export const updateMerchantEmailFailure = (state, { error }) => ({
    ...state,
    error: error,
});

export const updateMerchantMobileNo = (state, { data }) => ({
    ...state,
});

export const updateMerchantMobileNoSuccess = (state, { data }) => ({
    ...state,
    success: data,
});

export const updateMerchantMobileNoFailure = (state, { error }) => ({
    ...state,
    error: error,
});

export const resetMerchantState = (state, { data }) => ({
    ...state,
});

export const resetMerchantStateSuccess = (state, { error }) => ({
    ...INITIAL_STATE_MERCHANTS
});


export const reducer = createReducer(INITIAL_STATE_MERCHANTS, {
        [MERCHANTS.GET_ALL_MERCHANTS_BY_CATEGORY]: getAllMerchantsByCategory,
        [MERCHANTS.GET_ALL_MERCHANTS_BY_CATEGORY_SUCCESS]: getAllMerchantsByCategorySuccess,
        [MERCHANTS.GET_ALL_MERCHANTS_BY_CATEGORY_FAILURE]: getAllMerchantsByCategoryFailure,  
        [MERCHANTS.GET_MERCHANT]: getMerchant,
        [MERCHANTS.GET_MERCHANT_SUCCESS]: getMerchantSuccess,
        [MERCHANTS.GET_MERCHANT_FAILURE]: getMerchantFailure,
        [MERCHANTS.SET_SELECTED_MERCHANT_ID]: setSelectedMerchantId,
        [MERCHANTS.SET_SELECTED_MERCHANT_ID_SUCCESS]: setSelectedMerchantIdSuccess,
        [MERCHANTS.SET_SELECTED_MERCHANT_ID_FAILURE]: setSelectedMerchantIdFailure,
        [MERCHANTS.UPDATE_MERCHANT]: updateMerchant,
        [MERCHANTS.UPDATE_MERCHANT_SUCCESS]: updateMerchantSuccess,
        [MERCHANTS.UPDATE_MERCHANT_FAILURE]: updateMerchantFailure,
        [MERCHANTS.GET_PENDING_MERCHANTS_LIST]: getPendingMerchantsList,
        [MERCHANTS.GET_PENDING_MERCHANTS_LIST_SUCCESS]: getPendingMerchantsListSuccess,
        [MERCHANTS.GET_PENDING_MERCHANTS_LIST_FAILURE]: getPendingMerchantsListFailure,
        [MERCHANTS.GET_ALL_MERCHANTS]: getAllMerchants,
        [MERCHANTS.GET_ALL_MERCHANTS_SUCCESS]: getAllMerchantsSuccess,
        [MERCHANTS.GET_ALL_MERCHANTS_FAILURE]: getAllMerchantsFailure,
        [MERCHANTS.HANDLE_MERCHANT_APPROVAL]: handleMerchantApproval,
        [MERCHANTS.HANDLE_MERCHANT_APPROVAL_SUCCESS]: handleMerchantApprovalSuccess,
        [MERCHANTS.HANDLE_MERCHANT_APPROVAL_FAILURE]: handleMerchantApprovalFailure,
        [MERCHANTS.GET_MERCHANT_SUMMERY]: getMerchantSummery,
        [MERCHANTS.GET_MERCHANT_SUMMERY_SUCCESS]: getMerchantSummerySuccess,
        [MERCHANTS.GET_MERCHANT_SUMMERY_FAILURE]: getMerchantSummeryFailure,
        [MERCHANTS.SEARCH_MERCHANTS_FOR_BRAND]: searchMerchantsForBrand,
        [MERCHANTS.SEARCH_MERCHANTS_FOR_BRAND_SUCCESS]: searchMerchantsForBrandSuccess,
        [MERCHANTS.SEARCH_MERCHANTS_FOR_BRAND_FAILURE]: searchMerchantsForBrandFailure,
        [MERCHANTS.SEARCH_MERCHANTS_FOR_CATEGORY]: searchMerchantsForCategory,
        [MERCHANTS.SEARCH_MERCHANTS_FOR_CATEGORY_SUCCESS]: searchMerchantsForCategorySuccess,
        [MERCHANTS.SEARCH_MERCHANTS_FOR_CATEGORY_FAILURE]: searchMerchantsForCategoryFailure,
        [MERCHANTS.HANDLE_MERCHANT_BLOCKING]: handleMerchantBlocking,
        [MERCHANTS.HANDLE_MERCHANT_BLOCKING_SUCCESS]: handleMerchantBlockingSuccess,
        [MERCHANTS.HANDLE_MERCHANT_BLOCKING_FAILURE]: handleMerchantBlockingFailure,
        [MERCHANTS.APPROVE_MERCHANT]: ApproveMerchant,
        [MERCHANTS.APPROVE_MERCHANT_SUCCESS]: ApproveMerchantSuccess,
        [MERCHANTS.APPROVE_MERCHANT_FAILURE]: ApproveMerchantFailure,
        [MERCHANTS.GET_PENDING_BUSINESS_INFO_LIST]:getPendingBusinessInfoList,
        [MERCHANTS.GET_PENDING_BUSINESS_INFO_LIST_SUCCESS]:getPendingBusinessInfoListSuccess,
        [MERCHANTS.GET_PENDING_BUSINESS_INFO_LIST_FAILURE]:getPendingBusinessInfoListFailure,
        [MERCHANTS.GET_PENDING_CONTACT_INFO_LIST]:getPendingContactInfoList,
        [MERCHANTS.GET_PENDING_CONTACT_INFO_LIST_SUCCESS]:getPendingContactInfoListSuccess,
        [MERCHANTS.GET_PENDING_CONTACT_INFO_LIST_FAILURE]:getPendingContactInfoListFailure,
        [MERCHANTS.APPROVE_PENDING_BUSINESS_INFO]:approvePendingBusinessInfo,
        [MERCHANTS.APPROVE_PENDING_BUSINESS_INFO_SUCCESS]:approvePendingBusinessInfoSuccess,
        [MERCHANTS.APPROVE_PENDING_BUSINESS_INFO_FAILURE]:approvePendingBusinessInfoFailure,
        [MERCHANTS.APPROVE_PENDING_CONTACT_INFO]:approvePendingContactInfo,
        [MERCHANTS.APPROVE_PENDING_CONTACT_INFO_SUCCESS]:approvePendingContactInfoSuccess,
        [MERCHANTS.APPROVE_PENDING_CONTACT_INFO_FAILURE]:approvePendingContactInfoFailure,
        [MERCHANTS.GET_PENDING_BUSINESS_DETAILS]:getPendingBusinessDetails,
        [MERCHANTS.GET_PENDING_BUSINESS_DETAILS_SUCCESS]:getPendingBusinessDetailsSuccess,
        [MERCHANTS.GET_PENDING_BUSINESS_DETAILS_FAILURE]:getPendingBusinessDetailsFailure,
        [MERCHANTS.GET_PENDING_CONTACT_DETAILS]:getPendingContactDetails,
        [MERCHANTS.GET_PENDING_CONTACT_DETAILS_SUCCESS]:getPendingContactDetailsSuccess,
        [MERCHANTS.GET_PENDING_CONTACT_DETAILS_FAILURE]:getPendingContactDetailsFailure,
        [MERCHANTS.UPDATE_MERCHANT_BUSINESS_INFO]: updateMerchantBusinessInfo,
        [MERCHANTS.UPDATE_MERCHANT_BUSINESS_INFO_SUCCESS]: updateMerchantBusinessInfoSuccess,
        [MERCHANTS.UPDATE_MERCHANT_BUSINESS_INFO_FAILURE]: updateMerchantBusinessInfoFailure,
        [MERCHANTS.UPDATE_MERCHANT_BASIC_INFO]: updateMerchantBasicInfo,
        [MERCHANTS.UPDATE_MERCHANT_BASIC_INFO_SUCCESS]: updateMerchantBasicInfoSuccess,
        [MERCHANTS.UPDATE_MERCHANT_BASIC_INFO_FAILURE]: updateMerchantBasicInfoFailure,
        [MERCHANTS.UPDATE_MERCHANT_CONTACT_INFO]: updateMerchantContactInfo,
        [MERCHANTS.UPDATE_MERCHANT_CONTACT_INFO_SUCCESS]: updateMerchantContactInfoSuccess,
        [MERCHANTS.UPDATE_MERCHANT_CONTACT_INFO_FAILURE]: updateMerchantContactInfoFailure,
        [MERCHANTS.GET_CONTACT_INFO_BY_MERCHANT_ID]: getContactInfoByMerchantId,
        [MERCHANTS.GET_CONTACT_INFO_BY_MERCHANT_ID_SUCCESS]: getContactInfoByMerchantIdSuccess,
        [MERCHANTS.GET_CONTACT_INFO_BY_MERCHANT_ID_FAILURE]: getContactInfoByMerchantIdFailure,
        [MERCHANTS.GET_BUSINESS_INFO_BY_MERCHANT_ID]: getBusinessInfoByMerchantId,
        [MERCHANTS.GET_BUSINESS_INFO_BY_MERCHANT_ID_SUCCESS]: getBusinessInfoByMerchantIdSuccess,
        [MERCHANTS.GET_BUSINESS_INFO_BY_MERCHANT_ID_FAILURE]: getBusinessInfoByMerchantIdFailure,
        [MERCHANTS.UPDATE_CATEGORIES_AND_BRANDS_FOR_MERCHANT]: updateCategoriesAndBrandsForMerchant,
        [MERCHANTS.UPDATE_CATEGORIES_AND_BRANDS_FOR_MERCHANT_SUCCESS]: updateCategoriesAndBrandsForMerchantSuccess,
        [MERCHANTS.UPDATE_CATEGORIES_AND_BRANDS_FOR_MERCHANT_FAILURE]: updateCategoriesAndBrandsForMerchantFailure,
        [MERCHANTS.GET_BRANDS_CATEGORIES_MAPPING_BY_MERCHANT]: getBrandsCategoriesMappingByMerchant,
        [MERCHANTS.GET_BRANDS_CATEGORIES_MAPPING_BY_MERCHANT_SUCCESS]: getBrandsCategoriesMappingByMerchantSuccess,
        [MERCHANTS.GET_BRANDS_CATEGORIES_MAPPING_BY_MERCHANT_FAILURE]: getBrandsCategoriesMappingByMerchantFailure,
        [MERCHANTS.UPDATE_MERCHANT_EMAIL]: updateMerchantEmail,
        [MERCHANTS.UPDATE_MERCHANT_EMAIL_SUCCESS]: updateMerchantEmailSuccess,
        [MERCHANTS.UPDATE_MERCHANT_EMAIL_FAILURE]: updateMerchantEmailFailure,
        [MERCHANTS.UPDATE_MERCHANT_MOBILE_NO]: updateMerchantMobileNo,
        [MERCHANTS.UPDATE_MERCHANT_MOBILE_NO_SUCCESS]: updateMerchantMobileNoSuccess,
        [MERCHANTS.UPDATE_MERCHANT_MOBILE_NO_FAILURE]: updateMerchantMobileNoFailure,
        [MERCHANTS.RESET_MERCHANT_STATE]: resetMerchantState,
        [MERCHANTS.RESET_MERCHANT_STATE_SUCCESS]: resetMerchantStateSuccess,
    }
)