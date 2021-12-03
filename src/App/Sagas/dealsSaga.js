import {call, delay, put} from "redux-saga/effects"
import DEALSACTIONS, {DEALS} from "../Stores/Deals/Actions";
import {push} from "connected-react-router";
import ERRORACTIONS  from "../Stores/Error/Actions";
import {errorType} from "../Utils/constants";
import {resetDealsStateSuccess} from "../Stores/Deals/Reducers";

export function* searchOnAllDeals(api, action){
    try {
        const response = yield call(api.searchOnAllDeals, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.searchOnAllDealsSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.searchOnAllDealsFailure(error))
    }
}

export function* getDeal(api, action){
    try {
        const response = yield call(api.getDeal, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getDealSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getDealFailure(error))
    }
}

export function* getAllDealsByMerchant(api, action){
    try {
        const response = yield call(api.getAllDealsByMerchant, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getAllDealsByMerchantSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getAllDealsByMerchantFailure(error))
    }
}

 export function* searchDealsForBrand(api, action){
    try {
        const response = yield call(api.searchDealsForBrand, action.data)
         if(response.ok){
             const respData = response.data.data
             yield put(DEALSACTIONS.searchDealsForBrandSuccess(respData))
       }
    }catch (error){
        yield put(DEALSACTIONS.searchDealsForBrandFailure(error))
     }
 }


 export function* searchDealsForCategory(api, action){
    try {
        const response = yield call(api.searchDealsForCategory, action.data)
         if(response.ok){
             const respData = response.data.data
             yield put(DEALSACTIONS.searchDealsForCategorySuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.searchDealsForCategoryFailure(error))
    }
}


export function* selectedDealId(api, action){
    try {
        yield put(DEALSACTIONS.setSelectedDealIdSuccess(action.data))
    }catch (error){
        yield put(DEALSACTIONS.setSelectedDealIdFailure(error))
    }
}

export function* createDeal(api, action){
    try {
        const response = yield call(api.createDeal, action.data)
        if(response.ok){
            const respData = response.data.data
           // yield put(push(`/deals/view/${respData.id}`));
         //   yield put(window.location.reload());
            yield put(DEALSACTIONS.createDealSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.createDealFailure(error))
    }
}

export function* handleDealApproval(api, action){
    try {
        const response = yield call(api.handleDealApproval, action.data)
        if(response.ok){
            const respData = response.data
            yield put(DEALSACTIONS.handleDealApprovalSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.handleDealApprovalFailure(error))
    }
}

export function* deleteDeal(api, action){
    try {
        const response = yield call(api.deleteDeal, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(push('/deals/list'))
            yield put(window.location.reload());
            yield put(DEALSACTIONS.deleteDealSuccess(respData))
            
        }
    }catch (error){
        yield put(DEALSACTIONS.deleteDealFailure(error))
    }
}


export function* getPendingDealsList(api, action){
    try {
        const response = yield call(api.getPendingDealsList, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getPendingDealsListSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getPendingDealsListFailure(error))
    }
}

export function* getDealByID (api, action){
    try {
        const response = yield call(api.getDealByID, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getDealByIDSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getDealByIDFailure(error))
    }
}

export function* approvePendingDeal(api, action){
    try {
        const response = yield call(api.approvePendingDeal, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.approvePendingDealSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.approvePendingDealFailure(error))
    }
}

export function* createOfferType(api, action){
    try {
        const response = yield call(api.createOfferType, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.createOfferTypeSuccess(respData))
            yield put(ERRORACTIONS.setError({
                message: response.data.message,
                show: true,
                type: errorType.SUCCESS
            }))
            delay(500)
            yield put(ERRORACTIONS.resetError(null))
        }
    }catch (error){
        yield put(DEALSACTIONS.createOfferTypeFailure(error))
    }
}


export function* getAllOfferTypes(api, action){
    try {
        const response = yield call(api.getAllOfferTypes, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getAllOfferTypesSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getAllOfferTypesFailure(error))
    }
}

export function* getCombinedDealRequestsList(api, action){
    try {
        const response = yield call(api.getCombinedDealRequestsList, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getCombinedDealRequestsListSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getCombinedDealRequestsListFailure(error))
    }
}

export function* getDealRequestsListForCombination(api, action){
    try {
        const response = yield call(api.getDealRequestsListForCombination, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getDealRequestsListForCombinationSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getDealRequestsListForCombinationFailure(error))
    }
}


export function* getSummeryForDealRequestsListForCombination(api, action){
    try {
        const response = yield call(api.getSummeryForDealRequestsListForCombination, action.data)
        if(response.ok){
            const respData = response.data.data
            yield put(DEALSACTIONS.getSummeryForDealRequestsListForCombinationSuccess(respData))
        }
    }catch (error){
        yield put(DEALSACTIONS.getSummeryForDealRequestsListForCombinationFailure(error))
    }
}

export function* resetDealsState(api, action){
    try {
        yield put(DEALSACTIONS.resetDealsStateSuccess())
    }catch (error){

    }
}