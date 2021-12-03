import {call, delay, put} from "redux-saga/effects"
import MERCHANTSACTIONS  from "../Stores/Merchants/Actions";
import ERRORACTIONS  from "../Stores/Error/Actions";

import {merchantsList, merchant,} from "../Services/mockData";
import {errorType} from "../Utils/constants";
import CATEGORYACTIONS from "../Stores/Category/Actions";

export function* getAllMerchantsByCategory(api, action){
    try {
        const response = yield call(api.getAllMerchantsByCategory, action.data)
        if(response.ok){
            const respData = response.data.data
             yield put(MERCHANTSACTIONS.getAllMerchantsByCategorySuccess(respData))
         }
     }catch (error){
         yield put(MERCHANTSACTIONS.getAllMerchantsByCategoryFailure(error))
     }
 }

export function* searchMerchantsForBrand(api, action){
     try {
        const response = yield call(api.searchMerchantsForBrand, action.data)
        if(response.ok){
            const respData = response.data.data
          yield put(MERCHANTSACTIONS.searchMerchantsForBrandSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.searchMerchantsForBrandFailure(error))
    }
}

export function* searchMerchantsForCategory(api, action){
    try {
        const response = yield call(api.searchMerchantsForCategory, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.searchMerchantsForCategorySuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.searchMerchantsForCategoryFailure(error))
    }
 }

export function* getMerchant(api, action){
    try {
        //TODO: uncomment commented lines one API is connected
        // const response = yield call(api.getMerchant, action.data)
        // if(response.ok){
        //     const respData = response.data.data
        //     yield put(MERCHANTSACTIONS.getMerchantSuccess(respData))
        // }

        yield put(MERCHANTSACTIONS.getMerchantSuccess(merchant))
    }catch (error){
        yield put(MERCHANTSACTIONS.getMerchantFailure(error))
    }
}

export function* setSelectedMerchantId(api, action){
    try {
        yield put(MERCHANTSACTIONS.setSelectedMerchantIdSuccess(action.data))
    }catch (error){
        yield put(MERCHANTSACTIONS.setSelectedMerchantIdFailure(error))
    }
}

export function* updateMerchant(api, action){
    try {
        //TODO uncomment below commented code once API is connected
        //const response = yield call(api.updateMerchant, action.data)
        //if(response.ok){
        //const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateMerchantSuccess(merchant))
        //}
    }catch (error){
        yield put(MERCHANTSACTIONS.updateMerchantFailure(error))
    }
}

export function* getPendingMerchantsList(api, action){
    try {
        const response = yield call(api.getPendingMerchantsList, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getPendingMerchantsListSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getPendingMerchantsListFailure(error))
    }
}

export function* getAllMerchants(api, action){
    try {
        const response = yield call(api.getAllMerchants, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getAllMerchantsSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getAllMerchantsFailure(error))
    }
}


export function* handleMerchantApproval(api, action){
    try {
        const response = yield call(api.handleMerchantApproval, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.handleMerchantApprovalSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.handleMerchantApprovalFailure(error))
    }
}

export function* ApproveMerchant(api, action){
    try {
        const response = yield call(api.ApproveMerchant, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.ApproveMerchantSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.ApproveMerchantFailure(error))
    }
}

export function* getMerchantSummery(api, action){
    try {
        const response = yield call(api.getMerchantSummery, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getMerchantSummerySuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getMerchantSummeryFailure(error))
    }
}

export function* handleMerchantBlocking(api, action){
    try {
        const response = yield call(api.handleMerchantBlocking, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.handleMerchantBlockingSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.handleMerchantBlockingFailure(error))
    }
}


export function* getPendingBusinessInfoList(api, action){
    try {
        const response = yield call(api.getPendingBusinessInfoList, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getPendingBusinessInfoListSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getPendingBusinessInfoListFailure(error))
    }
}

export function* getPendingContactInfoList(api, action){
    try {
        const response = yield call(api.getPendingContactInfoList, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getPendingContactInfoListSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getPendingContactInfoListFailure(error))
    }
}

export function* approvePendingBusinessInfo(api, action){
    try {
        const response = yield call(api.approvePendingBusinessInfo, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.approvePendingBusinessInfoSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.approvePendingBusinessInfoFailure(error))
    }
}

export function* approvePendingContactInfo(api, action){
    try {
        const response = yield call(api.approvePendingContactInfo, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.approvePendingContactInfoSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.approvePendingContactInfoFailure(error))
    }
}

export function* getPendingBusinessDetails(api, action){
    try {
        const response = yield call(api.getPendingBusinessDetails, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getPendingBusinessDetailsSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getPendingBusinessDetailsFailure(error))
    }
}

export function* getPendingContactDetails(api, action){
    try {
        const response = yield call(api.getPendingContactDetails, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getPendingContactDetailsSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getPendingContactDetailsFailure(error))
    }
}

export function* updateMerchantBusinessInfo(api, action){
    try {
        const response = yield call(api.updateMerchantBusinessInfo, action.data)
        if(response.ok){            
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateMerchantBusinessInfoSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
        else{         
   
        }
    }catch (error){       
        yield put(MERCHANTSACTIONS.updateMerchantBusinessInfoFailure(error))
     
    }
}

export function* updateMerchantBasicInfo(api, action){
    try {
        const response = yield call(api.updateMerchantBasicInfo, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateMerchantBasicInfoSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
        else{         
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.ERROR
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.updateMerchantBasicInfoFailure(error))
    }
}


export function* updateMerchantContactInfo(api, action){
    try {
        const response = yield call(api.updateMerchantContactInfo, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateMerchantContactInfoSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
        else{         
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.ERROR
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.updateMerchantContactInfoFailure(error))
    }
}

export function* getContactInfoByMerchantId(api, action){
    try {
        const response = yield call(api.getContactInfoByMerchantId, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getContactInfoByMerchantIdSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getContactInfoByMerchantIdFailure(error))
    }
}

export function* getBusinessInfoByMerchantId(api, action){
    try {
        const response = yield call(api.getBusinessInfoByMerchantId, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getBusinessInfoByMerchantIdSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getBusinessInfoByMerchantIdFailure(error))
    }
}

export function* updateCategoriesAndBrandsForMerchant(api, action){
    try {
        const response = yield call(api.updateCategoriesAndBrandsForMerchant, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateCategoriesAndBrandsForMerchantSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.updateCategoriesAndBrandsForMerchantFailure(error))
    }
}

export function* getBrandsCategoriesMappingByMerchant(api, action){
    try {
        const response = yield call(api.getBrandsCategoriesMappingByMerchant, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.getBrandsCategoriesMappingByMerchantSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.getBrandsCategoriesMappingByMerchantFailure(error))
    }
}

export function* updateMerchantMobileNo(api, action){
    try {
        const response = yield call(api.updateMerchantMobileNo, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateMerchantMobileNoSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.updateMerchantMobileNoFailure(error))
    }
}

export function* updateMerchantEmail(api, action){
    try {
        const response = yield call(api.updateMerchantEmail, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(MERCHANTSACTIONS.updateMerchantEmailSuccess(respData))
        }
    }catch (error){
        yield put(MERCHANTSACTIONS.updateMerchantEmailFailure(error))
    }
}

export function* resetMerchantState(api, action) {
    try {
        yield put(CATEGORYACTIONS.resetMerchantStateSuccess());
    } catch (Error) {
    }
}



