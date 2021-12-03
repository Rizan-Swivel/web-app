// a library to wrap and simplify api calls
import apisauce from "apisauce";
import NetworkConstants from "../Config/NetworkConstants";
import qs from "query-string";
import {getBrandsCategoriesMappingByMerchant} from "../Sagas/merchantsSaga";
// our "constructor"
const create = (baseURL = NetworkConstants.BASE_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic dG9rb21vYmlsZToxYWVhZDZjZS03MTk5LTQwODgtYTY0ZS04MTgyNDRjNWJlZmY=",
      "app-key": "qpon-otp-c2cc3496-ccf8-4068-a83c-8q8p1o4n727b",
    },
    // 10 second timeout...
    timeout: 10000,
  });

  const googleSignIn = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ACTION_GOOGLE +
        NetworkConstants.CONTROLLER_SIGNIN,
      obj
    );
  };

  const googleSignUp = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ACTION_GOOGLE +
        NetworkConstants.CONTROLLER_SIGNUP,
      obj
    );
  };

  const login = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.OAUTH +
        NetworkConstants.REFRESH_TOKEN,
      qs.stringify(obj),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + NetworkConstants.BASICTK,
        },
      }
    );
  };

  const firebaseToken = (token) => {
    return api.post(
      NetworkConstants.NOTIFICATION_SERVICE +
        NetworkConstants.API +
        NetworkConstants.NOTIFICATION +
        NetworkConstants.REFRESH_TOKEN,
      {},
      {
        headers: {
          "X-NOTIFICATION-TOKEN": token,
        },
      }
    );
  };

  const faceBookSignIn = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.FACEBOOK_CONTROLLER +
        NetworkConstants.CONTROLLER_SIGNIN,
      obj
    );
  };

  const validateToken = () => {
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.TOKEN +
        NetworkConstants.VALIDATE,
      {},
      { data: {} }
    );
  };

  const getUSERroleSummary = (obj) => {
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.ROLEUSER +
        NetworkConstants.SUMMARY +
        "/" +
        obj.page +
        "/" +
        obj.size +
        NetworkConstants.FILTER +
        obj.type +
        NetworkConstants.SEARCH +
        obj.term,
      {},
      { data: {} }
    );
  };

  const deleteRole = (key) => {
    return api.delete(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.DELETE +
        NetworkConstants.ROLE +
        "/" +
        key,
      {},
      { data: {} }
    );
  };

  const updateUserRole = (data) => {
    return api.put(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.ROLEUSER +
        NetworkConstants.UPDATE +
        "/" +
        data.userID +
        "/" +
        data.roleId
    );
  };

  const updateUserPermissions = (data, id) => {
    return api.put(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.UPDATE +
        NetworkConstants.ROLE +
        "/" +
        id,
      data
    );
  };

  const getRoleSummary = () => {
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.ROLE +
        NetworkConstants.SUMMARY,
      {},
      { data: {} }
    );
  };

  const getPermissions = () => {
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.PERMISSIONS,
      {},
      { data: {} }
    );
  };

  const getNewNotifications = (obj) => {
    api.setHeader("X-Time-Zone", NetworkConstants.TIME_ZONE);
    return api.get(
      NetworkConstants.NOTIFICATION_SERVICE +
        NetworkConstants.API +
        NetworkConstants.NOTIFICATION +
        NetworkConstants.NOTIFICATION_SUMMARY +
        "/" +
        obj.page +
        "/" +
        obj.size,
      {},
      { data: {} }
    );
  };

  const getCategories = (obj) => {
    api.setHeader("Time-Zone", NetworkConstants.TIME_ZONE);
    return api.get(
      NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.CATEGORIES +
        obj.page +
        "/" +
        obj.size +
        "/" +
        NetworkConstants.SEARCH +
        obj.searchTerm,
      {},
      { data: {} }
    );
  };

  const getAllUsers = (data) => {
    api.setHeader("Time-Zone", NetworkConstants.TIME_ZONE);
    return api.get(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
       NetworkConstants.USER_U+
        data.page +
        "/" +
        data.size +
        "/search/" +
        data.searchTerm,
        {},
        { data: {} }
    );
  };

  const getCategory = (data) =>{
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.CATEGORIES +
        data.categoryId,
        {},
        { data: {} }
    );
  }

  const getBrand = (data) =>{
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.BRANDS +
        data.brandId
        ,
        {},
        { data: {} }
    );
  }


  const getBrands = (obj) => {

    api.setHeader("Time-Zone", NetworkConstants.TIME_ZONE);
    return api.get(
      NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.BRANDS +
        obj.page +
        "/" +
        obj.size +
        "/" +
        NetworkConstants.SEARCH +
        obj.searchTerm,
      {},
      { data: {} }
    );
  };

  const generateOTP = (data) => {
    return api.post(
      NetworkConstants.OTP_SERVICE +
        NetworkConstants.API +
        NetworkConstants.OTP +
        NetworkConstants.GENERATE,
        {},
      {
        data: data,
      },
      {}
    );
  };

  const verifyOTP = (obj) => {
    return api.post(
      NetworkConstants.OTP_SERVICE +
        NetworkConstants.API +
        NetworkConstants.OTP +
        NetworkConstants.VERIFY,
      {},
      {
        data: obj,
      },
      {}
    );
  };

  const merchantSignUp = (obj) => {
    setXTimeZoneHeader()
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.MERCHANT_SIGN_UP,
      {},
      {
        data: obj,
      },
      {}
    );
  };

const ApproveMerchant = (data) => {

  setXTimeZoneHeader()
  setUserIdHeader(data.userId);
  return api.put(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.APPROVE,
      {},
      {data: {...data}}
  )
}

  const deleteNotifications = (obj, deleteSlice) => {
    const nIDs = obj.notifications.slice(...deleteSlice).map((o) => o.id);
    return api.post(
      NetworkConstants.NOTIFICATION_SERVICE +
        NetworkConstants.API +
        NetworkConstants.NOTIFICATION +
        NetworkConstants.MARK_READ,
      {},
      {
        data: {
          notificationIds: [...nIDs],
        },
      }
    );
  };

  const faceBookSignUp = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.FACEBOOK_CONTROLLER +
        NetworkConstants.CONTROLLER_SIGNUP,
      obj
    );
  };

  const registerUser = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS,
      obj
    );
  };

  const logOutUser = () => {
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.SIGN_OUT,
      {},
      { data: {} }
    );
  };

  const refreshToken = (obj) => {
    removeUserHeader();
    api.deleteHeader("Accept");
    api.deleteHeader("Cache-Control");
    removeAuthToken();
    api.setHeader("Authorization", "Basic " + NetworkConstants.BASICTK);

    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.OAUTH +
        NetworkConstants.REFRESH_TOKEN,
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: obj,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };

  api.axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  api.axiosInstance.interceptors.response.use(
    (response) => {
      const language = response.headers["Accept-Language"]
        ? response.headers["Accept-Language"]
        : null;
      if (language !== null) {
        if (localStorage.getItem("i18nextLng") !== language) {
          setLanguageHeader(language);
          localStorage.setItem("i18nextLng", language);
        }
      }
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      if (!error.response) {
        return Promise.reject("Network Error");
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshToken(JSON.parse(localStorage.getItem("refresh_token")))
          .then((data) => {
            //store new token
            localStorage.setItem("user", JSON.stringify(data.data.data));
            localStorage.setItem("refresh_token", data.data.refresh_token);

            api.deleteHeader("Content-Type");
            api.setHeader("Content-Type", "application/json");
            api.setHeader("Accept", "application/json");
            api.setHeader("Cache-Control", "no-cache");
            removeAuthToken();
            setUserIdHeader(data.data.userId);

            setAuthToken(data.data.accessToken);
            if (data.data)
              originalRequest.headers["Authorization"] =
                `Bearer ` + data.data.access_token;

            originalRequest.headers["Content-Type"] = "application/json";
            return Promise.resolve(api.axiosInstance(originalRequest));
          })
          .catch((err) => {
            Promise.reject(err);
          });
      } else {
        return error;
      }
    }
  );

  const getUserProfile = () => {
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.CONTROLLER_USER_PROFILE,
      {},
      { data: {} }
    );
  };

  const addRole = (obj) => {
    return api.post(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.ADMIN +
        NetworkConstants.ROLE,
      obj
    );
  };

  const updateUserProfile = (data) => {
    return api.put(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.CONTROLLER_USER_PROFILE,
      data
    );
  };

  const changeLanguage = (data) => {
    return api.put(
      NetworkConstants.BLOG_SERVICE +
        NetworkConstants.API +
        NetworkConstants.CHANGE_LANGUAGE +
        data.data,
      {},
      { data: {} }
    );
  };

  const getAllDealsByMerchant = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.merchantId);
    return  api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.MERCHANT +
        data.merchantId,
        {},
        {data: {}}
    )
  }

  const searchDealsForCategory = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        NetworkConstants.CATEGORY +
        data.categoryId +
        "/" +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.SEARCH +
        data.searchTerm,
        {},
        {data: {}}
    )
  }

  const searchDealsForBrand = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        NetworkConstants.BRAND +
        data.brandId +
        "/" +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.SEARCH +
        data.searchTerm,
        {},
        {data: {}}
    )
  }

  const searchMerchantsForBrand = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.MERCHANT +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.BRAND +
        data.brandId +
        "/" +
        NetworkConstants.SEARCH +
        data.searchTerm,
        {},
        {data: {}}
    )
  }

  const searchMerchantsForCategory = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.MERCHANT +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.CATEGORY +
        data.categoryId +
        "/" +
        NetworkConstants.SEARCH +
        data.searchTerm,
        {},
        {data: {}}
    )
  }

  const searchOnAllDeals = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.SEARCH +
        data.searchTerm,
        {},
        {data: {}}
    )
  }

  const getAllMerchantsByCategory = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.userId);

    return api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.MERCHANT +
        data.page + "/" +
        data.size + "/" +
        NetworkConstants.CATEGORY +
        data.categoryId,
        {},
        {data: {}}
    )
  }

  const getAllMerchants = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        data.page +
        "/" +
        data.size +
        "/search/" +
        data.searchTerm,
        {},
        { data: {} }
    );
  };

  const getPendingMerchantsList = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.PENDING_U +
        data.page +
        "/" +
        data.size +
        "/" +
        NetworkConstants.SEARCH +
        data.searchTerm,
        {},
        {data: {...data}}
    )
  }

  const handleMerchantApproval = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.APPROVE,
        {},
        {data: {...data}}
    )
  }

  const handleMerchantBlocking = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.BLOCK,
        {},
        {data: {...data}}
    )
  }

  const getMerchant = (data) => {};

  const getContactInfoByMerchantId = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.CONTACT +
        NetworkConstants.MERCHANT +
        data.merchantId,
        {},
        {data: data}
    )
  };

  const getBusinessInfoByMerchantId = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);

    return api.get(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.BUSINESS +
        NetworkConstants.MERCHANT +
        data.merchantId,
        {},
        {data: data}
    )
  };

  const updateMerchantBusinessInfo = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.BUSINESS,
        {},
        {data: {...data}}
    )
  }
  const updateMerchantBasicInfo = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS ,
        {},
        {data: data}
    )
  }
  const updateMerchantContactInfo = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        NetworkConstants.CONTACT,
        {},
        {data: {...data}}
    )
  }

  const updateUserPassword = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.metaData.userId);

    return api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.PASSWORD,
        {},
        {data: {...data.payload}}
    )
  }

  const getMerchantSummery = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MERCHANT_U +
        data.merchantId,
        {},
        {data: {...data}}
    )
  }

  const updateCategoriesAndBrandsForMerchant = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.put(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.MERCHANT,
        {},
        {data: {...data}}
    )
  }

  const getBrandsCategoriesMappingByMerchant = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.MERCHANT +
        data.userId,
        {},
        {data: {...data}}
    )
  }

  const updateMerchant = (data) => {};

  const getDeal = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        data.dealId,
      {},
      { data: {} }
    );
  };

  const getAllMobileUsers = (data) => {
    setXTimeZoneHeader();
    return api.get(
      NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        "USER/" +
        data.page +
        "/" +
        data.size +
        "/search/" +
        data.searchTerm,
      {},
      { data: {} }
    );
  };

  const createDeal = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.merchantId);

    return api.post(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS,
        {},
        {data: {...data}}
    )
  }

  const handleDealApproval = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.merchantId);
    return api.put(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        NetworkConstants.APPROVE,
        {},
        {data: {...data}}
    )
  }

  const deleteDeal = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.merchantId);
    return api.put(
        NetworkConstants.QPON_CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.DEALS +
        NetworkConstants.DELETE +
        data.dealId,
        {},
        {data: {...data}}
    )
  }

  const uploadFiles = (data) => {
    //setUserIdHeader(data.userId);
    return  api.post(
        NetworkConstants.QPON_FILE_MANAGER_SERVICE +
        NetworkConstants.API +
        NetworkConstants.FILES +
        NetworkConstants.UPLOAD,
        data.data,
        {}
    )
  }

  const updateMerchantMobileNo = (data) => {

    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return  api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.MOBILE_NO,
        {},
        {data: {...data}}
    )
  }

  const updateMerchantEmail = (data) => {
    setXTimeZoneHeader()
    setUserIdHeader(data.userId);
    return  api.put(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.USERS +
        NetworkConstants.EMAIL,
        {},
        {data: {...data}}
    )
  }

  const getPendingDealsList = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.CORE_SERVICE +
      NetworkConstants.API +
      NetworkConstants.DEALS +
      NetworkConstants.PENDING_U +
      data.page +
      "/" +
      data.size +
      "/" +
      NetworkConstants.SEARCH +
      data.searchTerm,
      {},
      {data: {...data}}
    )

  }

  const getPendingBusinessInfoList = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.BUSINESS +
      NetworkConstants.PENDING_U +
      data.page +
      "/" +
      data.size +
      "/" +
      NetworkConstants.SEARCH +
      data.searchTerm,
      {},
      {data: {...data}}

    )
  }

  const getPendingContactInfoList = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.CONTACT +
      NetworkConstants.PENDING_U +
      data.page +
      "/" +
      data.size +
      "/" +
      NetworkConstants.SEARCH +
      data.searchTerm,
      {},
      {data: {...data}}

    )

  }

  const approvePendingMerchent = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.put(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.APPROVE,
      {},
      {data: {...data}}
    )

  }

  const approvePendingDeal = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.put(
      NetworkConstants.CORE_SERVICE +
      NetworkConstants.API + 
      NetworkConstants.DEALS +
      NetworkConstants.APPROVE,
      {},
      {data: {...data}}
    )

  }

  const rejectPendingDeal = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.put(
      NetworkConstants.CORE_SERVICE +
      NetworkConstants.API + 
      NetworkConstants.DEALS +
      NetworkConstants.REJECT,
      {},
      {data: {...data}}
    )

  }

  const approvePendingBusinessInfo = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.put(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.BUSINESS +
      NetworkConstants.APPROVE,
      {},
      {data: {...data}}
    )
  }

  const approvePendingContactInfo = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.put(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.CONTACT +
      NetworkConstants.APPROVE,
      {},
      {data: {...data}}
    )
  }

  const getPendingBusinessDetails = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.BUSINESS +
      data.businessId,
      {},
      {data: {...data}}
    )

  }

  const getPendingContactDetails =( data ) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.USERS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.CONTACT +
      data.contactId,
      {},
      {data: {...data}}

    )
  }

  const getDealByID =( data ) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.CORE_SERVICE +
      NetworkConstants.API +
      NetworkConstants.DEALS +
      data.id +
      {},
      {data: {...data}}
    )
  }

  const createOfferType =( data ) => {
    console.log("createOfferType api ",data)
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.post(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REQUEST_A_DEAL +
        NetworkConstants.OFFER_TYPE,
        data,
    )
  }

  const getAllOfferTypes =( data ) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REQUEST_A_DEAL +
        NetworkConstants.OFFER_TYPE
    )
  }

  const getCombinedDealRequestsList =( data ) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REQUEST_A_DEAL +
        NetworkConstants.COMBINATIONS +
        data.page + "/" +
        data.size + "/" +
        NetworkConstants.MERCHANT +
        data.merchantId + "/" +
        NetworkConstants.SEARCH +
        data.searchTerm + "/"
    )
  }

  const getDealRequestsListForCombination =( data ) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REQUEST_A_DEAL +
        data.page + "/" +
        data.size + "/" +
        NetworkConstants.MERCHANT +
        data.merchantId + "/" +
        NetworkConstants.CATEGORY +
        data.categoryId + "/" +
        NetworkConstants.BRAND +
        data.brandId
      )
  }

  const getSummeryForDealRequestsListForCombination =( data ) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REQUEST_A_DEAL +
        NetworkConstants.COMBINATION_SUMMARY +
        NetworkConstants.MERCHANT +
        data.merchantId + "/" +
        NetworkConstants.CATEGORY +
        data.categoryId + "/" +
        NetworkConstants.BRAND +
        data.brandId
    )
  }

  const getAudienceReachSummeryReportForDeals = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.post(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REPORTS +
        NetworkConstants.DEAL +
        NetworkConstants.GROUPED_AUDIENCE_REACH +
        data.merchantId + "/" +
        data.page + "/" +
        data.size ,
        data
    )
  }

  const getAudienceReachDetailedReportForDeal = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.post(
        NetworkConstants.CORE_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REPORTS +
        NetworkConstants.DEAL +
        NetworkConstants.AUDIENCE_REACH +
        data.merchantId + "/" +
        data.page + "/" +
        data.size ,
        data
    )
  }

  const getAudienceReachDealForTopTen =(data)=>{
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.CORE_SERVICE +
      NetworkConstants.API +
      NetworkConstants.REPORTS +
      NetworkConstants.DEAL +
      NetworkConstants.AUDIENCE_REACH +
      NetworkConstants.TOP_TEN +
      data.merchantId + "/" +
      data.option     
     

    )
  }

  const getAudienceReachMerchentForTopTen =(data)=>{
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.get(
      NetworkConstants.AUTH_SERVICE +
      NetworkConstants.API +
      NetworkConstants.REPORTS +
      NetworkConstants.MERCHANT_U +
      NetworkConstants.AUDIENCE_REACH +
      NetworkConstants.TOP_TEN +
     // data.merchantId + "/" + 
      data.option 

    )
  }


  const getAudienceReachSummeryReportForMerchents = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.post(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REPORTS +
        NetworkConstants.MERCHANT_U + 
        NetworkConstants.GROUPED_AUDIENCE_REACH +
      //  data.merchantId + "/" +
        data.page + "/" +
        data.size ,
        data
    )
  }

  const getAudienceReachDetailedReportForMerchent = (data) => {
    setXTimeZoneHeader();
    setUserIdHeader(data.userId);
    return api.post(
        NetworkConstants.AUTH_SERVICE +
        NetworkConstants.API +
        NetworkConstants.REPORTS +
        NetworkConstants.MERCHANT_U +
        data.merchantId + "/" +
        NetworkConstants.AUDIENCE_REACH +      
        data.page + "/" +
        data.size ,
        data
    )
  }


  const setUserIdHeader = (userId) => api.setHeader("User-id", userId);

  const removeUserHeader = () => api.deleteHeader("User-id");

  const setAuthToken = (userAuth) => {
    return api.setHeader("Authorization", "Bearer " + userAuth);
  };
  const removeAuthToken = () => api.deleteHeader("Authorization");
  const removeNotificationToken = () =>
    api.deleteHeader("X-NOTIFICATION-TOKEN");

  const setContentTypeHeader = (value) => api.setHeader("Content-Type", value);
  const removeContentTypeHeader = () => api.deleteHeader("Content-Type");

  const setCommonHeader = () =>
    api.setHeader("Content-Type", "application/json");

  const setXAPIKeyHeader = () =>
    api.setHeader("X-API-Key", NetworkConstants.X_API_Key);

  const removeXAPIKeyHeader = () => api.deleteHeader("X-API-Key");

  const setXTimeZoneHeader = () =>
    api.setHeader("Time-Zone", NetworkConstants.X_Time_Zone);

  const removeXtimeZoneHeader = () => api.deleteHeader("Time-Zone");

  const setLanguageHeader = (language) =>
    api.setHeader("Accept-Language", language);

  const removeLanguageHeader = () => api.deleteHeader("Accept-Language");
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    googleSignIn,
    googleSignUp,
    setAuthToken,
    removeAuthToken,
    setUserIdHeader,
    logOutUser,
    removeUserHeader,
    getUserProfile,
    updateUserProfile,
    faceBookSignIn,
    faceBookSignUp,
    validateToken,
    login,
    registerUser,
    firebaseToken,
    removeNotificationToken,
    setCommonHeader,
    getRoleSummary,
    getUSERroleSummary,
    setContentTypeHeader,
    setXAPIKeyHeader,
    removeXAPIKeyHeader,
    removeContentTypeHeader,
    updateUserRole,
    deleteRole,
    getPermissions,
    addRole,
    updateUserPermissions,
    getNewNotifications,
    deleteNotifications,
    removeXtimeZoneHeader,
    setXTimeZoneHeader,
    changeLanguage,
    setLanguageHeader,
    removeLanguageHeader,
    getCategories,
    getCategory ,
    getBrands,
    getBrand,
    generateOTP,
    verifyOTP,
    merchantSignUp,
    getAllDealsByMerchant,
    searchDealsForCategory,
    searchDealsForBrand,
  //  getMerchantsByCategory,
    searchMerchantsForBrand,
    searchMerchantsForCategory,
    getDeal,
    searchOnAllDeals,
    getAllMobileUsers,
    createDeal,
    handleDealApproval,
    deleteDeal,
    uploadFiles,
    getAllMerchantsByCategory,
    getAllMerchants,
    getPendingMerchantsList,
    handleMerchantApproval,
    getMerchantSummery,
    handleMerchantBlocking,
    getAllUsers,
    ApproveMerchant,
    getPendingDealsList,
    getPendingBusinessInfoList,
    getPendingContactInfoList,
    approvePendingMerchent,
    approvePendingDeal,
    approvePendingBusinessInfo,
    approvePendingContactInfo,
    getPendingBusinessDetails,
    getPendingContactDetails,
    updateMerchantBusinessInfo,
    updateMerchantBasicInfo,
    updateMerchantContactInfo,
    getContactInfoByMerchantId,
    getBusinessInfoByMerchantId,
    updateUserPassword,
    updateCategoriesAndBrandsForMerchant,
    getBrandsCategoriesMappingByMerchant,
    updateMerchantMobileNo,
    updateMerchantEmail,
    getDealByID,
    rejectPendingDeal,
    createOfferType,
    getAllOfferTypes,
    getCombinedDealRequestsList,
    getDealRequestsListForCombination,
    getSummeryForDealRequestsListForCombination,
    getAudienceReachSummeryReportForDeals,
    getAudienceReachDetailedReportForDeal,
    getAudienceReachDealForTopTen,
    getAudienceReachMerchentForTopTen,
    getAudienceReachSummeryReportForMerchents,
    getAudienceReachDetailedReportForMerchent
      // a list of the API functions from step 2
  };
};

// let's return back our create method as the default.
export default {
  create,
};
